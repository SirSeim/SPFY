$(function (event) {

    // // Should we consider storing the information relevant
    // // for that paricular day within the frontend?
    // // i.e. each time the system starts a new drop-in (or Michelle
    // // creates a new drop-in day, information such as the drop-in ID
    // // and the ID's for each activity during that drop-in could be stored
    // // in the frontend somwhere) - reduces ajax calls to retrieve information

    // var allActivities = [];
    // var currentDropIn = {};

    // // ajax chaining to ensure that asynchronous calls run smoothly
    // // .then and .done only run after the initial request goes through
    // $.ajax({
    //     url: "api/dropins",
    //     method: "GET",
    //     success: function (data) {
    //         console.log("drop-ins");
    //         console.log(data);
    //     },
    //     error: function (data) {
    //         console.error(data);
    //     }
    // }).then(function (data) {
    //     var dropins = data.result;
    //     currentDropIn = dropins[dropins.length - 1];
    // }).then(function () {
    //     return $.ajax({
    //         url: "api/dropins/" + currentDropIn.id + "/activities",
    //         method: "GET",
    //         success: function (data) {
    //             console.log(data);
    //         },
    //         error: function (data) {
    //             console.error(data);
    //         }
    //     });
    // }).done(function (data) {
    //     allActivities = data.result ? data.result.slice() : 
    //             [{   id: 2,
    //                 name: 'Medi-Cal Registration',
    //                 room: 'Clinic',
    //                 comments: '',
    //                 startTime: '12:30:00',
    //                 endTime: '13:30:00'
    //             }];
    //     // hardcoding at least one activity into each drop-in to avoid "no activities" errors
    //     // hardcoded to 3rd insert fro match_drop_in_activity in db.sql
    // });

    $('.activities-add button').click(function (event) {
        if ($(this).hasClass("active") ) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
            
    });

    var selectedActivities = [];

    // .delegate adds event listeners to each element with designated class
    // (in this case, every "td" element)
    // adding a "click" event listener with the function that should execute
    // when the event is detected
    $("#create-thumbnail").click(function (event) {
        selectedActivities = [];
        $('.activities-add button.active').each(function (index, element) {
           selectedActivities.push($(this).text());
           $('#activities-bar').append('<div class="thumbnail"><div class="caption"><span class="' +
                                        $(this).parent().data('category') + '"><p>'+ $(this).text() + 
                                        '<button type="button" class="thumbnail-dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button></p></span></div></div>');
        });

        $(".thumbnail-dismiss").click(function (event) {
            $(this).parent().parent().parent().parent().remove();
        });

    });

    $(".thumbnail-dismiss").click(function (event) {
        $(this).parent().parent().parent().parent().parent().remove();
    });
    

    // $('#activities').delegate("button", "click", function (event) {
    //     var name = $(this)[0].innerText;
    //     if (!selectedActivities.includes(name)) {
    //         selectedActivities.push(name);
    //     }
    //     // refreshSelectedActivities();
    //     $('#selected-activities').empty();
    //     for (var i = 0; i < selectedActivities.length; i++) {
    //         $('#selected-activities').append('<li class="list-group-item activity">'
    //                 + selectedActivities[i]
    //                 + '</li>');
    //     }
    // });

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

    $('#enroll-button').click(function (event) {
        var signups = [];
        var activityids = [];
 
        for (var i = 0; i < allActivities.length; i++) {
            if (selectedActivities.includes(allActivities[i].name)) {
                activityids.push(allActivities[i].id);
            }
        }

        for (var i = 0; i < selectedclients.length; i++) {
            for (var j = 0; j < activityids.length; j++) {
                signups.push({
                    dropinID: currentDropIn.id,
                    clientID: selectedclients[i].match(/[0-9]+/), // TODO: find more effective implementation
                    activityID: activityids[j]
                });
            }
        }

        $.ajax({
            url: "api/enroll",
            method: "POST",
            data: { expression: JSON.stringify(signups) },
            success: function (data) {
                console.log(data);
                var clientString = "";
                for (var i = 0; i < selectedclients.length; i++) {
                    clientString += selectedclients[i] + '<br>';
                }
                var activityString = "";
                for (var i = 0; i < selectedActivities.length; i++) {
                    activityString += selectedActivities[i] + '<br>';
                }

                $('#checkin-enrollment-feedback').empty().append(
                    '<div><h4>Clients Successfully Enrolled</h4>' +
                    '<h4>Clients</h4>' + clientString +
                    '<h4>Activities</h4>' + activityString +
                    '</div>');

                $('#selected-clients').empty();
                $('#selected-activities').empty();
            },
            error: function (data) {
                console.error(data);
                $('#enrollment-feedback').empty().append(
                    '<div><h4>Enrollment failed</h4>');
            }
        });
    });
    
    // var activityData = {
    //     activityName: "Medical Care",
    //     ongoing: false,
    //     startDate: '2016-10-20',
    //     endDate: '2016-10-22'
    // };

    // $.ajax({
    //     url: "api/activity",
    //     method: "POST",
    //     data: { expression: JSON.stringify(activityData) },
    //     success: function (data) {
    //         console.log()
    //         console.log(data);
    //     },
    //     error: function (data) {
    //         console.error(data);
    //     }
    // });
});
