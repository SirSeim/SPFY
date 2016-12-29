$(function (event) {

    //thumbnailClickHandler enables each activity thumbnail to act as a button that
    //populates activities table with: 
    // -- activity title
    // -- who is currently enrolled
    // -- columns for.. (tbd)
    var activityID;
    var activityObj = {};

    window.clickHandlers = window.clickHandlers || {};

    window.clickHandlers.enrollmentThumbnail = function (event) {
        var jThis = $(this);

        $("#activity-title").empty();
        $("#activity-title").append(jThis.find('p').text());

        activityID = parseInt(jThis.data('id'));
        populateEnrollmentTable();
        showActivityEnrollment(true);
    };

    window.clickHandlers.removeThumbnail = function (event) {
        event.stopPropagation();
        activityObj.jCard = $(this).parent().parent().parent().parent();
        activityObj.jCardButton = $(this);

        $("#confirm-remove-activity-name").text(activityObj.jCard.find("p").text());
        $("#confirm-remove-activity-modal").modal('toggle');
    };

    window.clickHandlers.removeActivityFromDropin = function (event) {
        activityObj.jCardButton.prop('disabled', true);

        var dropinID = window.sessionStorage.frontdeskDropinId;
        var localActivityID = parseInt(activityObj.jCard.data('id'));

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/dropins/" + dropinID + "/activities",
            method: "DELETE",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                activities: [
                    localActivityID
                ]
            }),
            success: function (data) {
                console.log(data);
                activityObj.jCard.remove();
                if(localActivityID === activityID) {
                    showActivityEnrollment(false);
                }
            },
            error: function (xhr) {
                console.error(xhr);
                console.log(activityObj.jCard.data('id'));
                activityObj.jCardButton.prop('disabled', false);
            }
        });
    };

    $("#remove-activity-from-dropin").click(window.clickHandlers.removeActivityFromDropin);

    var addHandlersToActivityCards = function () {
        $(".thumbnail-dismiss").unbind("click").click(window.clickHandlers.removeThumbnail);
        $(".activity-card").unbind("click").click(window.clickHandlers.enrollmentThumbnail);
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

    // .delegate adds event listeners to each element with designated class
    // (in this case, every "td" element)
    // adding a "click" event listener with the function that should execute
    // when the event is detected
    var addActivitiesHandler = function (event) {
        var dropinID = window.sessionStorage.frontdeskDropinId;

        // $('#activities-bar').empty();
        activitiesIDs = [];
        selectedActivities = [];
        $('.activities-add button.active').each(function (index, element) {
            var jThis = $(this);
            activitiesIDs.push({
                id: jThis.data("id")
            });
            selectedActivities.push({
                id: jThis.data("id"),
                category: jThis.parent().data('category'),
                programId: jThis.data('program-id'),
                text: jThis.text()
            });
        });

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/dropins/" + dropinID + "/activities",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                activities: activitiesIDs
            }),
            success: function (data) {
                var jActivitiesBar = $('#activities-bar');
                selectedActivities.forEach(function (activity) {
                    jActivitiesBar.append('<div class="card card-inverse text-xs-center activity-card ' +
                                        activity.category + '" style="width: 13rem;display:inline-block;*display:inline;" data-id="' + activity.id + '" data-program-id="' +
                                        activity.programId + '"><div class="card-block"><blockquote class="card-blockquote"><p>'+ activity.text + 
                                        '</p><footer><button type="button" class="btn btn-secondary btn-sm thumbnail-dismiss">Remove</button></footer></blockquote></div></div>');
                });
                addHandlersToActivityCards();
            },
            error: function (xhr) {
                console.error(xhr);
            }
        });
    };

    $("#create-thumbnail").click(addActivitiesHandler);

    addHandlersToActivityCards();


    var populateEnrollmentTable = function () {
        var dropinID = window.sessionStorage.frontdeskDropinId;

        var createEnrolledClientItem = function (client) {
            return '<tr><td class="enroll-name">' + client.firstName + ' ' + client.lastName +
                    '</td><td><button class="fa fa-times btn btn-danger btn-sm enrolled-client" data-id="' +
                    client.id + '"></button></td></tr>';
        };

        var unEnrollClient = function (event) {
            var jThis = $(this);
            jThis.prop('disabled', true);

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/dropins/" + dropinID + "/activities/" + activityID + "/enrollment",
                method: "DELETE",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    clients: [
                        jThis.data("id")
                    ]
                }),
                success: function (data) {
                    jThis.parent().parent().remove();
                    populateAddEnrollTable();
                },
                error: function (xhr) {
                    console.error(xhr);
                    jThis.prop('disabled', false);
                }
            });
        };

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/dropins/" + dropinID + "/activities/" + activityID + "/enrollment",
            method: "GET",
            success: function (data) {
                var jEnrolled = $('#activities-table-body');
                jEnrolled.empty();

                if (data.result) {
                    data.result.forEach(function (client) {
                        jEnrolled.append(createEnrolledClientItem(client));
                    });
                    $('.enrolled-client').click(unEnrollClient);
                }
            },
            error: function (xhr) {
                console.error(xhr);
            }
        });
    };

    var populateAddEnrollTable = function () {
        var clients = JSON.parse(window.sessionStorage.clients);
        var dropinID = window.sessionStorage.frontdeskDropinId;

        var createAddEnrollClientItem = function (client) {
            return '<tr><td class="enroll-name">' + client.firstName + ' ' + client.lastName + '</td>' +
                    '<td><button type="button" class="btn btn-success btn-sm add-enroll-client" data-id="' + client.id + '">' +
                    '<i class="fa fa-plus"></i></button></td></tr>';
        };

        var enrollClient = function (event) {
            var jThis = $(this);
            jThis.prop('disabled', true);

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/dropins/" + dropinID + "/activities/" + activityID + "/enrollment",
                method: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    clients: [
                        jThis.data("id")
                    ]
                }),
                success: function (data) {
                    jThis.parent().parent().hide();
                    jThis.prop('disabled', false);
                    populateEnrollmentTable();
                },
                error: function (xhr) {
                    console.error(xhr);
                    jThis.prop('disabled', false);
                }
            });
        };

        var jAddEnrollTable = $("#activities-onSearch-table-body");
        jAddEnrollTable.empty();
        clients.forEach(function (client) {
            jAddEnrollTable.append(createAddEnrollClientItem(client));
        });
        $(".add-enroll-client").click(enrollClient);
        if ($('#activity-client-search').val() === '') {
            $(".add-enroll-client").parent().parent().hide();
        }

    };

    //onSearch activities table functionality
    $('#activity-client-search').keyup(function (event) {
        var search = $('#activity-client-search');
        var enrolled = $('.enrolled-client').parent().parent();
        var toAdd = $(".add-enroll-client").parent().parent();

        var clientInEnrolled = function (name) {
            var result = false;
            enrolled.each(function (i, e) {
                if ($(e).find('.enroll-name').text().toLowerCase() === name.toLowerCase()) {
                    result = true;
                }
            });
            return result;
        };

        if (search.val() === '') {
            enrolled.show();
            toAdd.hide();
        } else {
            enrolled.hide().filter(function  (i, e) {
                return $(e).find('.enroll-name').text().toLowerCase().indexOf(search.val().toLowerCase()) !== -1;
            }).show();

            var shown = 5;
            var i = 0;
            toAdd.hide().filter(function (i, e) {
                if (clientInEnrolled($(e).find('.enroll-name').text())) {
                    return false;
                }
                var toShow = $(e).find('.enroll-name').text().toLowerCase().indexOf(search.val().toLowerCase()) !== -1;

                // TRYING to make it limit the number of add possibilities
                // if (toShow) {
                //     if (shown < i) {
                //         return false;
                //     }
                //     i++;
                //     return true;
                // }
                // return false;

                return toShow;
            }).show()
        }
    });
        
    if (window.sessionStorage.clients) {
        populateAddEnrollTable();
    } else {
        window.sessionStorageListeners.push({
            ready: populateAddEnrollTable
        });
    }
    

});
