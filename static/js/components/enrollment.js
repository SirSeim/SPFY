$(function (event) {

    //thumbnailClickHandler enables each activity thumbnail to act as a button that
    //populates activities table with: 
    // -- activity title
    // -- who is currently enrolled
    // -- columns for.. (tbd)
    var activityID;

    window.clickHandlers = window.clickHandlers || {};

    window.clickHandlers.enrollmentThumbnail = function (event) {
        var jThis = $(this);

        $("#activity-title").empty();
        $("#activity-title").append(jThis.find('p').text());

        activityID = jThis.data('id');
        populateEnrollmentTable();
    };

    // .delegate adds event listeners to each element with designated class
    // (in this case, every "td" element)
    // adding a "click" event listener with the function that should execute
    // when the event is detected
    

    $("#create-thumbnail").click(function (event) {
        $('#activities-bar').empty();
        selectedActivities = [];
        $('.activities-add button.active').each(function (index, element) {
            var jThis = $(this);
            selectedActivities.push(jThis.text());
            $('#activities-bar').append('<div class="card card-inverse text-xs-center activity-card ' +
                                        jThis.parent().data('category') + '" style="width: 13rem;display:inline-block;*display:inline;" data-id="' + jThis.data("id") + '" data-program-id="' +
                                        jThis.parent().data('category') + '"><div class="card-block"><blockquote class="card-blockquote"><p>'+ jThis.text() + 
                                        '</p><footer><button type="button" class="btn btn-secondary btn-sm thumbnail-dismiss">Remove</button></footer></blockquote></div></div>');
        });
        $(".thumbnail-dismiss").click(function (event) {
            $(this).parent().parent().parent().parent().remove();
        });

        $(".activity-card").click(window.clickHandlers.enrollmentThumbnail);

    });

    $(".thumbnail-dismiss").click(function (event) {
        $(this).parent().parent().parent().parent().parent().remove();
    });

    $(".activity-card").click(window.clickHandlers.enrollmentThumbnail);

    //AUTO-

    var selectedclients = [];

    $('#clients').delegate("td", "click", function () {
        var client = $(this)[0].innerText;
        if (!selectedclients.includes(client)) {
            selectedclients.push(client);
        }
        $('#selected-clients').empty();
        for (var i = 0; i < selectedclients.length; i++) {
            $('#selected-clients').append('<li class="list-group-item client">'
                    + selectedclients[i]
                    + '</li>');

        }
    });

    // $('#enroll-button').click(function (event) {
    //     var signups = [];
    //     var activityids = [];
 
    //     for (var i = 0; i < allActivities.length; i++) {
    //         if (selectedActivities.includes(allActivities[i].name)) {
    //             activityids.push(allActivities[i].id);
    //         }
    //     }

    //     for (var i = 0; i < selectedclients.length; i++) {
    //         for (var j = 0; j < activityids.length; j++) {
    //             signups.push({
    //                 dropinID: currentDropIn.id,
    //                 clientID: selectedclients[i].match(/[0-9]+/), // TODO: find more effective implementation
    //                 activityID: activityids[j]
    //             });
    //         }
    //     }

    //     $.ajax({
    //         url: "api/enroll",
    //         method: "POST",
    //         data: { expression: JSON.stringify(signups) },
    //         success: function (data) {
    //             console.log(data);
    //             var clientString = "";
    //             for (var i = 0; i < selectedclients.length; i++) {
    //                 clientString += selectedclients[i] + '<br>';
    //             }
    //             var activityString = "";
    //             for (var i = 0; i < selectedActivities.length; i++) {
    //                 activityString += selectedActivities[i] + '<br>';
    //             }

    //             $('#checkin-enrollment-feedback').empty().append(
    //                 '<div><h4>Clients Successfully Enrolled</h4>' +
    //                 '<h4>Clients</h4>' + clientString +
    //                 '<h4>Activities</h4>' + activityString +
    //                 '</div>');

    //             $('#selected-clients').empty();
    //             $('#selected-activities').empty();
    //         },
    //         error: function (data) {
    //             console.error(data);
    //             $('#enrollment-feedback').empty().append(
    //                 '<div><h4>Enrollment failed</h4>');
    //         }
    //     });
    // });

    var populateEnrollmentTable = function () {
        var dropinID = window.sessionStorage.frontdeskDropinId;

        var createEnrolledClientItem = function (client) {
            return '<tr><td class="enrolled-name">' + client.firstName + ' ' + client.lastName +
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
                    console.log(data);
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
                console.log(data);
                var jEnrolled = $('#activities-table-body');
                jEnrolled.empty();

                if (data.result) {
                    data.result.forEach(function (client) {
                        console.log(client);
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
            return '<tr><td class="add-enroll-name">' + client.firstName + ' ' + client.lastName + '</td>' +
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
                    console.log(data);
                    jThis.parent().parent().remove();
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
        // if ($('#activity-client-search').val() === '') {
        //     $(".add-enroll-client").parent().parent().hide();
        // }

    };

    //onSearch activities table functionality
    $('#activity-client-search').keyup(function (event) {

        // $("#activities-onSearch-table-body").append('<tr><td>' + ED INSERTS SEARCH STUFF HERE - BUTTON BELOW + '</td>'
        //                                             +'<td><button type="button" class="btn btn-success btn-sm">'
        //                                             +'<i class="fa fa-plus"></i></button></td></tr>');

       $('#enroll').click(function (event) {
        //enroll the selected client into the activity
       });


        if ( !$('#activity-client-search').val()) {
            $("#activities-onSearch-table-body").empty();
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
