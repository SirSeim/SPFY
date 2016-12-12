
// var ActivityTable = React.createClass({
//     render: function () {
//         return (
//             <div className="text"></div>
//         )
//     }
// });

// ReactDOM.render(
//   <ActivityTable />,
//   document.getElementById('react-test')
// );

$(function () {

  window.clickHandlers = window.clickHandlers || {};

  $.ajax({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: "api/dropins",
        method: "GET",
        success: function (data) {
          console.log("drop-ins");
          console.log(data);
        },
        error: function (data) {
          console.error(data);
        }
  }).done(function (data) {
    // window.sessionStorage.frontdeskDropinId = data.result[0].id;
    // window.frontdeskRefreshListeners.forEach(function (listener) {
    //     listener.refresh();
    // });
  });

    

    var setupFrontDesk = function () {

        var statuses = JSON.parse(window.sessionStorage.statuses);
        var clients = JSON.parse(window.sessionStorage.clients);
        var checkinTable;

        // modify the clientprofiletable once it comes onto the page
        // to include 'select' button specific to checkin process
        $('#clients tbody tr').get().forEach(function (row) {
            console.log($(row));
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
            $(row).find('td').append(' <button name="select-button" type="button" class="btn btn-default">Select</button>');
            event.stopPropagation();
        });

          var currentDropIn = {};

          // once "Create Drop-In" feature is done, dropin session will
          // be created beforehand and will be stored in the frontend,
          // will be able to retrieve without ajax calls
          $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/dropins",
                method: "GET",
                success: function (data) {
                  console.log("drop-ins");
                  console.log(data);
                },
                error: function (data) {
                  console.error(data);
                }
          }).then(function (data) {
              var dropins = data.result;
              currentDropIn = dropins[dropins.length - 1];
          }).then(function () {
              return $.ajax({
                xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
                  url: "api/dropins/" + currentDropIn.id,
                  method: "GET",
                  success: function (data) {
                      console.log(data);
                  },
                  error: function (data) {
                      console.error(data);
                  }
              });
          });

          var selectedclients = [];

          $('[name="select-button"]').click(function (event) {
              var client = $(event.target).parents('tr').data();
              console.log(client);
              if (!selectedclients.includes(client)) {
                  selectedclients.push(client);
              }
              $('#selected-clients').empty();
              for (var i = 0; i < selectedclients.length; i++) {
                  $('#selected-clients').append('<li class="list-group-item client">' +
                          selectedclients[i].firstname + ' ' + selectedclients[i].lastname +
                          '</li>');

              }
              event.stopPropagation();
          });

          $('#checkin-button').click(function (event) {
              var signups = [];

              for (var i = 0; i < selectedclients.length; i++) {
                  signups.push(selectedclients[i].id);
              }

              // make sure to clear selectedclients after using data
              selectedclients = [];
              
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
                      console.log(data);
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
                  },
                  error: function (data) {
                      console.error(data);
                      $('#checkin-feedback').empty().append(
                          '<div><h4>Check In failed</h4>');
                  }
              });
          });
        

          $('#viewclient-modal-save-button').click(function (event) {
              // TODO
              // ajax call here to save any changes to the client profile
              $('#viewclient-modal').modal('toggle');
          });

          $('#clients tbody').css("height", 100);

          // $('#checked-in').DataTable();

          /*
              If headers not showing up, need to specify them manually.
              DataTables documentation doesn't mention this

              data = this.SearchController.resultSet;
              this.$tableContainer.dataTable({
                  data:    data,
                  columns: [
                  {
                      data: "H",
                      title: "Thickness"
                  },
                  {
                      data: "InstanceId",
                      title: "Instance ID"
                  }]
              });

          */

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
                checkinTable = $('#checked-in').DataTable({
                    // data: dataset,
                    columns: Object.keys(clients[0]).map(function (propName) {
                              return { name: propName, data: propName, title: propName };
                            }) // setting property names as column headers for now
                });
                
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
                            var currentStatus = window.getDataById(statuses, $(row.node()).data("status"));
                            $(row.node()).find('td span.dot').css('background-color', currentStatus.color);
                            // according to stackoverflow, need to manually reattach event handlers
                            // to dynamically added elements, even for modals
                            $(row.node()).data('toggle', 'modal')
                                         .data('target', '#viewclient-modal')
                                         .on('click', function (event) {
                                              $('#viewclient-modal').find('#client-name')
                                                                    .text($(this).data("firstName") + ' ' + $(this).data("lastName"));
                                              $('#viewclient-modal').modal('toggle');
                                         });
                        }
                    });
                });
            });
        }

        $('#checkin-button').click(function (event) {
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
                    if (data.result.clients) {
                        checkinTable.clear();
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
                                  var currentStatus = window.getDataById(statuses, $(row.node()).data("status"));
                                  $(row.node()).find('td span.dot').css('background-color', currentStatus.color);
                                  // according to stackoverflow, need to manually reattach event handlers
                                  // to dynamically added elements, even for modals
                                  $(row.node()).data('toggle', 'modal')
                                               .data('target', '#viewclient-modal')
                                               .on('click', function (event) {
                                                    $('#viewclient-modal').find('#client-name')
                                                                          .text($(this).data("firstName") + ' ' + $(this).data("lastName"));
                                                    $('#viewclient-modal').modal('toggle');
                                               });
                              }
                          });
                        });
                      }
                });
            }
        });

        var setupActivitiesForDropin = function () {
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
                console.log(data);
                data.result.forEach(function (activity) {
                    $('#activities-bar').append('<div class="thumbnail" data-id="' + activity.id + '" data-program-id="' +
                                            activity.programId + '"><div class="caption"><span class="' +
                                            activity.programName + '"><p>' + activity.name + 
                                            '<button type="button" class="thumbnail-dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button></p></span></div></div>');
                });

                $(".thumbnail").click(window.clickHandlers.enrollmentThumbnail);
                // data.result.forEach(function (activity) {
                //     if (activity.programId === 2) {
                //         $("#health-well").append('<button type="button" class="list-group-item list-group-item-action" data-id="' + activity.id + '">' + activity.name + '</button>');
                //     } else if (activity.programId === 3) {
                //         $("#art-well").append('<button type="button" class="list-group-item list-group-item-action" data-id="' + activity.id + '">' + activity.name + '</button>');
                //     } else if (activity.programId === 4) {
                //         //need to fix the 4 well issue
                //         $("#art-well").append('<button type="button" class="list-group-item list-group-item-action" data-id="' + activity.id + '">' + activity.name + '</button>');
                //     } else {
                //         $("#other-well").append('<button type="button" class="list-group-item list-group-item-action" data-id="' + activity.id + '">' + activity.name + '</button>');
                //     }

                // });

                // $('.activities-add button').click(function (event) {
                //     if ($(this).hasClass("active") ) {
                //         $(this).removeClass("active");
                //     } else {
                //         $(this).addClass("active");
                //     }
                        
                // });
            });
        };

        if (window.sessionStorage.frontdeskDropinId) {
            setupCheckin();
            setupActivitiesForDropin();
            window.sessionStorageListeners.push({
                ready: setupCheckin
            });
            window.sessionStorageListeners.push({
                ready: setupActivitiesForDropin
            });
        } else {
            window.sessionStorageListeners.push({
                ready: setupCheckin
            });
            window.sessionStorageListeners.push({
                ready: setupActivitiesForDropin
            });
        }

        $(".tablinks").click(function (event) {
            var currentTabID = $(this).attr('href');
            $(currentTabID).show().siblings().hide();
            $(this).parent('li').addClass('active').siblings().removeClass('active');
            event.preventDefault();
        });

        var updateAddActivities = function () {
            $('#activities-bar').each(function (element) {
                console.log("BITHCINDFGDF");
                var jElement = $(element);
                var programId = jElement.data('program-id');
                var activityId = jElement.data('id');

                if (programId === 2) {
                    $("#health-well").children().filter(function (i, e) {
                        return $(e).data('id') === activityId;
                    }).addClass('active');
                } else if (programId === 3) {
                    $("#art-well").children().filter(function (i, e) {
                        return $(e).data('id') === activityId;
                    }).addClass('active');
                } else if (programId === 4) {
                    // Needs to actually use a 4th well
                    $("#art-well").children().filter(function (i, e) {
                        return $(e).data('id') === activityId;
                    }).addClass('active');
                } else {
                    $("#other-well").children().filter(function (i, e) {
                        return $(e).data('id') === activityId;
                    }).addClass('active');
                }
            })
        };

        $("#add-new-activity").click(function (event) {
          console.log('click!');
            updateAddActivities();
            console.log('CLICKED');
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
        //                 var status = window.getDataById(statuses, client.status);
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

    var globalData = []
    globalData.push(window.sessionStorage.statuses);
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


// ==========================================

// // From:http://bootsnipp.com/snippets/featured/checked-list-group

//     var createPastCheckIn = function (checkin) {
//         return '<tr><td class="col-xs-2">' + moment(checkin.date).format('M/D/YY') +
//                 '</td><td class="col-xs-2">50</td><td class="col-xs-2">5</td>' +
//                 '<td class="col-xs-2">' +
//                 '<button id="editcheck-inbutton" type="button" class="btn btn-secondary btn-sm">Edit</button></td></tr>';
//     };

//     var populateCheckIn = function () {
//         var table = $('#checked-in tbody');

//         $.ajax({
//             url: "/api/checkin",
//             method: "GET",
//             success: function (data) {
//                 table.empty();
//                 data.result.forEach(function (element) {
//                     table.append(createPastCheckIn(element));
//                 });
//                 console.log(data);
//             },
//             error: function (data) {
//                 console.error(data);
//             }
//         });
//     };

//     populateCheckIn();

//     $(function () {
//         $('.list-group.checked-list-box .list-group-item').each(function () {

//             // Settings
//             var $widget = $(this),
//                 $checkbox = $('<input type="checkbox" class="hidden" />'),
//                 color = ($widget.data('color') ? $widget.data('color') : "primary"),
//                 style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
//                 settings = {
//                     on: {
//                         icon: 'fa fa-check'
//                     },
//                     off: {
//                         icon: 'fa fa-unchecked'
//                     }
//                 };

//             $widget.css('cursor', 'pointer')
//             $widget.append($checkbox);

//             // Event Handlers
//             $widget.on('click', function () {
//                 $checkbox.prop('checked', !$checkbox.is(':checked'));
//                 $checkbox.triggerHandler('change');
//                 updateDisplay();
//             });
//             $checkbox.on('change', function () {
//                 updateDisplay();
//             });


//             // Actions
//             function updateDisplay() {
//                 var isChecked = $checkbox.is(':checked');

//                 // Set the button's state
//                 $widget.data('state', (isChecked) ? "on" : "off");

//                 // Set the button's icon
//                 $widget.find('.state-icon')
//                     .removeClass()
//                     .addClass('state-icon ' + settings[$widget.data('state')].icon);

//                 // Update the button's color
//                 if (isChecked) {
//                     $widget.addClass(style + color + ' active');
//                 } else {
//                     $widget.removeClass(style + color + ' active');
//                 }
//             }

//             // Initialization
//             function init() {

//                 if ($widget.data('checked') == true) {
//                     $checkbox.prop('checked', !$checkbox.is(':checked'));
//                 }

//                 updateDisplay();

//                 // Inject the icon if applicable
//                 if ($widget.find('.state-icon').length == 0) {
//                     $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
//                 }
//             }
//             init();
//         });

//         $('#get-checked-data').on('click', function(event) {
//             event.preventDefault();
//             var checkedItems = {}, counter = 0;
//             $("#check-list-box li.active").each(function(idx, li) {
//                 checkedItems[counter] = $(li).text();
//                 counter++;
//             });
//             $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
//         });
//     });

//     $("input[name='idProvided']").on("click", function (event) {
//         var selected = $("input[name='idProvided']:checked").val();
//         if (selected === "idYes" && $(".newID").hasClass("hidden")) {
//             $(".newID").removeClass("hidden");
//         } else if (selected === "idNo" && !$(".newID").hasClass("hidden")) {
//             $(".newID").addClass("hidden");
//         }
//     });


// });
