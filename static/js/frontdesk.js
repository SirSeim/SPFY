$(function () {

    window.clickHandlers = window.clickHandlers || {};

    var setupFrontDesk = function () {

        var flags = JSON.parse(window.sessionStorage.flags);
        var clients = JSON.parse(window.sessionStorage.clients);
        var checkinTable = $('#checked-in').DataTable({
            // data: dataset,
            columns: Object.keys(clients[0]).map(function (propName) {
                      return { name: propName, data: propName, title: propName };
                    }) // setting property names as column headers for now
        });
        
        // manually add placeholder for search bar on checkin table      
        $('#checked-in_filter input').prop("placeholder", "Search Check-Ins");

        // modify the clientprofiletable once it comes onto the page
        // to include 'select' button specific to checkin process
        $('#clients tbody tr').get().forEach(function (row) {
            // console.log($(row));
            $(row).addClass("clickable-row")
            .data("toggle", "modal") // for some reason modal isn't working
            .data("target", "#viewclient-modal")
            // according to stackoverflow, need to manually reattach event handlers
            // to dynamically added elements, even for modals
            .on('click', function (event) {
                $('#viewclient-modal').find('#client-name')
                .text($(this).data("firstname") + ' ' + $(this).data("lastname"));
                $('#viewclient-modal').modal('toggle');
            });
            $(row).find('td').append('<button name="select-button" type="button" class="btn btn-outline-primary btn-sm">Select</button>');
            console.log($(row));
            event.stopPropagation();
        });

        var selectedclients = []; // probably should change this implementation since it uses a global array

        // Add people from Client Profiles to Selected Clients
        $('[name="select-button"]').click(function (event) {
            var client = $(event.target).parents('tr').data();
            if (!selectedclients.includes(client)) {
                selectedclients.push(client);
            }
            $('#selected-clients').empty();
            for (var i = 0; i < selectedclients.length; i++) {
                $('#selected-clients').append('<li class="list-group-item client">' +
                        selectedclients[i].firstname + ' ' + selectedclients[i].lastname +
                        '<button class="fa fa-times btn btn-danger btn-sm" name="deselect-client" value="' + i + '"</button>' +
                        '</li>');

            }

            // Remove people from Selected Clients
            $('[name="deselect-client"]').click(function (event) {
                selectedclients.splice($(this).val(), 1);
                $(this).parent().remove();
                event.stopPropagation();
            }); // can only add this event handler once the deselect button exists

            event.stopPropagation();
        });



        var sendUpClientsForCheckin = function (callback) {
            var signups = [];

            for (var i = 0; i < selectedclients.length; i++) {
                signups.push(selectedclients[i].id);
            }

            // make sure to clear selectedclients after using data
            selectedclients = [];
            
            if (signups.length === 0) {
                $('#checkin-feedback').empty().append(
                            '<div><h4>Please select clients to check in</h4>' +
                            '</div>');
            } else {
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                    },
                    url: "/api/dropins/" + window.sessionStorage.frontdeskDropinId + "/checkin",
                    method: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        clients: signups
                    }),
                    success: function (data) {
                        var clientString = "";
                        var checkedInClients = data.result;

                        for (var i = 0; i < checkedInClients.length; i++) {
                            var client = window.getDataById(clients, checkedInClients[i].client_id);
                            clientString += client.firstName + ' ' + client.lastName + '<br>';
                        }

                        $('#checkin-feedback').empty().append(
                            '<div><h4>Clients Successfully Checked In</h4>' +
                             clientString +
                            '</div>');

                        $('#selected-clients').empty();
                        return callback();
                    },
                    error: function (data) {
                        $('#checkin-feedback').empty().append(
                            '<div><h4>Check In failed</h4>');
                        return callback();
                    }
                });
            }
        };

        var refreshCheckinTable = function () {
            if (checkinTable) {
                // alert("table still here!");
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                    },
                    url: "/api/dropins/" + window.sessionStorage.frontdeskDropinId + "/checkin",
                    method: "GET",
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr) {
                        console.error(xhr);

                        if (xhr.status === 401) {
                            localStorage.removeItem("authorization");
                        }
                    }
                }).done(function (data) {
                    checkinTable.clear();
                    if (data.result.clients) {
                        var checkins = data.result.clients;
                        clients.forEach(function (client) {
                            checkins.forEach(function (checkin) {
                                if (checkin === client.id) {
                                    // dataset.push(client);
                                    var row = checkinTable.row.add({
                                        // moment(checkin.date).format('MM-DD-YY'),
                                        id: client.id,
                                        firstName: client.firstName,
                                        lastName: client.lastName,
                                        dob: moment(client.dob).format('MM-DD-YY'),
                                        status: '<span class="dot"></span>',
                                        phone: client.phone,
                                        email: client.email,
                                        checkedin: true
                                    }).draw();
                                    $(row.node()).data({ // node() returns the actual html tag
                                        // moment(checkin.date).format('MM-DD-YY'),
                                        id: client.id,
                                        firstName: client.firstName,
                                        lastName: client.lastName,
                                        dob: moment(client.dob).format('MM-DD-YY'),
                                        status: client.status 
                                    }); 
                                    // var currentStatus = window.getDataById(flags, $(row.node()).data("status"));
                                    // $(row.node()).find('td span.dot').css('background-color', currentStatus.color);
                                    // according to stackoverflow, need to manually reattach event handlers
                                    // to dynamically added elements, even for modals
                                    $(row.node()).data('toggle', 'modal')
                                    .data('target', '#viewclient-modal')
                                    .on('click', function (event) {
                                        $('#viewclient-modal').find('#client-name')
                                        .text($(this).data("firstName") + ' ' + $(this).data("lastName"));
                                        $('#client-modal-data').data('id', $(this).data('id'));
                                        $('#viewclient-modal').modal('toggle');
                                    });
                              }
                          });
                        });
                      }
                });
            }
        };

        $('#checkin-button').click(function (event) {
            sendUpClientsForCheckin(refreshCheckinTable);
        });
        

        $('#viewclient-modal-save-button').click(function (event) {
            // TODO
            // ajax call here to save any changes to the client profile
            refreshCheckinTable();
            $('#viewclient-modal').modal('toggle');
        });

        $('#clients tbody').css("height", 100);

        var setupCheckin = function () {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "/api/dropins/" + window.sessionStorage.frontdeskDropinId + "/checkin",
                method: "GET",
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr) {
                    console.error(xhr);
    
                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {
                var dataset = [];
                var checkins = data.result.clients;
                $('#checked-in tbody').empty();
               
                // manually setting these for testing
                // will probably have these in a local "check-in table settings"
                // button attached to the table later on
                checkinTable.column(5).visible(false);
                checkinTable.column(6).visible(false);
    
                // initial solution for parametrizing tables
                // add button for toggling column visibility
                $('#checked-in_wrapper').find('div.row:first div.col-sm-6:first')
                    .append(
                    '<div class="datatables_columns_visible" id="datatables_columns_visible">' +
                    '<label>Show columns <select multiple="multiple" name="multiselect[]" id="column-select"></select>' +
                    '</label></div>')
                    .find('div').wrap('<div class="col-sm-6"></div>');
    
                var options = [];
    
                Object.keys(clients[0]).forEach(function (propName, index) {
                    options.push({label: propName, title: propName, value: index});
                });
                
                $('#column-select').multiselect({
                    includeSelectAllOption: true,
                    enableHTML: false, // to protect against XSS injections
                    nonSelectedText: 'None',
                    disableIfEmpty: true,
                    numberDisplayed: 2,
                    onChange: function (option, checked) {
                        if (checked) {
                          checkinTable.column($(option).attr('title') + ':name').visible(true);
                        } else {
                          checkinTable.column($(option).attr('title') + ':name').visible(false, false); // 2nd false prevents Datatables from recalculating layout
                        }
                    },
                    onSelectAll: function () {
                        $('#column-select option:selected').each(function (index) {
                            checkinTable.column($(this).attr('title') + ':name').visible(true);
                        });
                    },
                    onDeselectAll: function () {
                        $('#column-select option').each(function (index) {
                            checkinTable.column($(this).attr('title') + ':name').visible(false, false);
                        });
                    }
                });
                $('#column-select').multiselect('dataprovider', options); // this must follow configurations
    
                // preselecting default column visibility
                // later this data will come from local settings
                checkinTable.columns().every(function () { // every() is built-in from Datatables
                    // the checkinTable context is automatically set to the appropriate checkinTable for each column that has been selected
                    // i.e. "this" is a column
                    if (this.visible()) {
                        $('#column-select').multiselect('select', this.index());
                    }
                });
                clients.forEach(function (client) {
                    checkins.forEach(function (checkin) {
                        if (checkin === client.id) {
                            // dataset.push(client);
                            var row = checkinTable.row.add({
                                // moment(checkin.date).format('MM-DD-YY'),
                                id: client.id,
                                firstName: client.firstName,
                                lastName: client.lastName,
                                dob: moment(client.dob).format('MM-DD-YY'),
                                status: '<span class="dot"></span>',
                                phone: client.phone,
                                email: client.email,
                                checkedin: true
                            }).draw();
                            $(row.node()).data({ // node() returns the actual html tag
                                // moment(checkin.date).format('MM-DD-YY'),
                                id: client.id,
                                firstName: client.firstName,
                                lastName: client.lastName,
                                dob: moment(client.dob).format('MM-DD-YY'),
                                status: client.status 
                            }); 
                            // var currentStatus = window.getDataById(flags, $(row.node()).data("status"));
                            // $(row.node()).find('td span.dot').css('background-color', currentStatus.color);
                            // according to stackoverflow, need to manually reattach event handlers
                            // to dynamically added elements, even for modals
                            $(row.node()).data('toggle', 'modal')
                            .data('target', '#viewclient-modal')
                            .on('click', function (event) {
                                $('#viewclient-modal').find('#client-name')
                                .text($(this).data("firstName") + ' ' + $(this).data("lastName"));
                                $('#client-modal-data').data('id', $(this).data('id'));
                                $('#viewclient-modal').modal('toggle');
                            });
                        }
                    });
                });
            });
        };

        var showActivityEnrollment = function (show) {
            var help = $("#activity-enrollment-help");
            var view = $("#activity-enrollment-view");
            if (show) {
                help.hide();
                view.show();
            } else {
                help.show();
                view.hide();
            }
        };

        var populateActivitiesForDropin = function () {
            showActivityEnrollment(false);

            $.ajax({
                xhrFields: {
                withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "/api/dropins/" + window.sessionStorage.frontdeskDropinId + "/activities",
                method: "GET",
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    console.error(data);
                }
            }).done(function (data) {
                $('#activities-bar').empty();
                data.result.forEach(function (activity) {
                    $('#activities-bar').append('<div class="card card-inverse text-xs-center activity-card ' +
                                            activity.programName + '" style="width: 13rem;display:inline-block;*display:inline;" data-id="' + activity.id + '" data-program-id="' +
                                            activity.programId + '"><div class="card-block"><blockquote class="card-blockquote"><p>'+ activity.name + 
                                            '</p><footer><button type="button" class="btn btn-secondary btn-sm thumbnail-dismiss">Remove</button></footer></blockquote></div></div>');
                });

                $(".activity-card").unbind("click").click(window.clickHandlers.enrollmentThumbnail);
                $(".thumbnail-dismiss").unbind("click").click(window.clickHandlers.removeThumbnail);
            });
        };

        if (window.sessionStorage.frontdeskDropinId) {
            setupCheckin();
            populateActivitiesForDropin();
        } else {
            window.sessionStorageListeners.push({
                ready: setupCheckin
            });
            window.sessionStorageListeners.push({
                ready: populateActivitiesForDropin
            });
        }

        window.frontDeskRefresh = window.frontDeskRefresh || [];
        window.frontDeskRefresh.push(populateActivitiesForDropin);
        window.frontDeskRefresh.push(refreshCheckinTable);

        $(".tablinks").click(function (event) {
            var currentTabID = $(this).attr('href');
            $(currentTabID).show().siblings().hide();
            $(this).parent('li').addClass('active').siblings().removeClass('active');
            event.preventDefault();
        });


        // Updates the activities in the modal for adding activities
        // so that activities already added are selected

        var updateAddActivities = function () {
            $(".add-activity-possibility").removeClass('active').prop('disabled', false);
            $('#activities-bar').children().each(function (i, e) {
                var jElement = $(e);
                var programId = jElement.data('program-id');
                var activityId = jElement.data('id');

                $(".add-activity-possibility").filter(function (i, e) {
                    return $(e).data('id') === activityId;
                }).prop('disabled', true).addClass("list-group-item disabled");

                // if (programId === 2) {
                //     $("#health-well").children().filter(function (i, e) {
                //         return $(e).data('id') === activityId;
                //     }).prop('disabled', true);
                // } else if (programId === 3) {
                //     $("#art-well").children().filter(function (i, e) {
                //         return $(e).data('id') === activityId;
                //     }).prop('disabled', true);
                // } else if (programId === 4) {
                //     // Needs to actually use a 4th well
                //     $("#art-well").children().filter(function (i, e) {
                //         return $(e).data('id') === activityId;
                //     }).prop('disabled', true);
                // } else {
                //     $("#other-well").children().filter(function (i, e) {
                //         return $(e).data('id') === activityId;
                //     }).prop('disabled', true);
                // }
            })
        };

        $("#add-new-activity").click(function (event) {
            updateAddActivities();
            $("#newActivityModal").modal("toggle");
        });

        // $.ajax({
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     beforeSend: function (xhr) {
        //         xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        //     },
        //     url: "api/dropins",
        //     method: "GET",
        //     success: function (data) {
        //         console.log("drop-ins");
        //         console.log(data);
        //     },
        //     error: function (xhr) {
        //         console.error(xhr);

        //         if (xhr.status === 401) {
        //             localStorage.removeItem("authorization);
        //         }
        //     }
        // }).then(function (data) {
        //     // get today's dropin session
        //     var dropins = data.result;
        //     var currentDropIn = dropins[dropins.length - 1];
        //     $('#dropin-date').text(moment(currentDropIn.date).format('MMM Do YYYY'));
        //     console.log(currentDropIn);
        //     $('#dropin-date').data("id", currentDropIn.id);
        // }).then(function () {
        //     // get activities associated in today's dropin
        //     return $.ajax({
        //         xhrFields: {
        //             withCredentials: true
        //         },
        //         beforeSend: function (xhr) {
        //             xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        //         },
        //         url: "api/dropins/" + $('#dropin-date').data("id") + "/activities",
        //         method: "GET",
        //         success: function (data) {
        //             console.log(data);
        //         },
        //         error: function (xhr) {
        //             console.error(xhr);

        //             if (xhr.status === 401) {
        //                 localStorage.removeItem("authorization");
        //             }
        //         }
        //     });
        // }).then(function (data) {
        //     // makes a table for each activity
        //     var activities = data.result;
        //     console.log(activities);
        //     $('#activities').append('<div id="activity-tables" class="row"></div>');
        //     activities.forEach(function (activity) {
        //         var idName = activity.name.toLowerCase().replace(/[\s]/, '-');
        //         $('#activity-tables').append(
        //             '<div class="col-sm-4">' + 
        //             '<div class="panel panel-default enrollment-panel"><div class="panel-heading">' +
        //             '<h4>' + activity.name + '</h4><input id="activity-search" type="text" class="form-control input-sm" maxlength="128" placeholder="Search" /></div>' +
        //             '<table id="' + idName + '-table" data-id="' + activity.id + '" class="table table-hover activity">' +
        //             '<thead><tr><th name="participants"></th></tr></thead>' + 
        //             '<tbody></tbody></table></div></div>');
        //     });
        // }).then(function () {
        //     // get the clients enrolled in each activity in today's dropin
        //     return $.ajax({
        //         xhrFields: {
        //             withCredentials: true
        //         },
        //         beforeSend: function (xhr) {
        //             xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        //         },
        //         url: "api/dropins/" + $('#dropin-date').data("id") + "/enrollment",
        //         method: "GET",
        //         success: function (data) {
        //             console.log(data);
        //         },
        //         error: function (xhr) {
        //             console.error(xhr);

        //             if (xhr.status === 401) {
        //                 localStorage.removeItem("authorization");
        //             }
        //         }
        //     });
        // }).done(function (data) {
        //     var enrollment = data.result.rows;
        //     // get clientprofiles from profiles listed in clientprofiletable.html
        //     var profiles = $('#clients').find('tr');
        //     // for each activity table, add a client profile if that client is enrolled
        //     $('.table.activity').get().forEach(function (table) {
        //         enrollment.forEach(function (enroll) {
        //             if (enroll.activity_id === $(table).data("id")) {
        //                 var client = window.getDataById(clients, enroll.client_id);
        //                 var status = window.getDataById(flags, client.status);
        //                 var display = ['<span class="dot"></span>' + client.firstName + ' ' + client.lastName];
        //                 var trAttributes = [
        //                     'class="clickable-row"',
        //                     'data-toggle="modal"',
        //                     'data-target="#viewclient-modal"'
        //                 ];
        //                 $(table).append(window.buildRow(client, display, trAttributes));
        //                 $(table).find('tr').last().find('span.dot').css('background-color', status.color);
        //             }
        //         });
        //     });
        //     // count number of youth enrolled in each activity
        //     $('.enrollment-panel').find('[name="participants"]').get().forEach(function (header) {
        //         header.innerText = "Participants: " + $(header).parents('.enrollment-panel').find('tbody').find('td').length;
        //     });
        // });
    };

    var globalData = [];
    globalData.push(window.sessionStorage.flags);
    globalData.push(window.sessionStorage.clients);

    if (globalData.every((array) => array)) {
        console.log("call arrived");
        setupFrontDesk();
    } else {
        console.log("waiting for call");
        window.sessionStorageListeners.push({
            ready: setupFrontDesk
        });
    }
});
