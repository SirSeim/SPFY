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

        var selectedActivities = [];

        var thumbnailClickHandler = function (event) {
            var jThis = $(this);

            $("#activity-title").empty();
            $("#activity-title").append(jThis.find('p').text());

            $.ajax({
                xhrFields: {
                  withCredentials: true
                },
                beforeSend: function (xhr) {
                  xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "/api/dropins/" + window.sessionStorage.frontdeskDropinId + "/activities/" + jThis.data("id") + "/enrollment",
                method: "GET",
                success: function (data) {
                    console.log("/api/dropins/" + window.sessionStorage.frontdeskDropinId + "/activities/" + jThis.data("id") + "/enrollment");
                    console.log(data);
                },
                error: function (data) {
                    console.error(data);
                }
            }).done(function (data, textStatus, xhr) {
                $('#activities-table').empty();
                var table = $('#activities-table').DataTable({
                    // data: dataset,
                    columns: Object.keys(data.results[0]).map(function (propName) {
                              return { name: propName, data: propName, title: propName };
                            }) // setting property names as column headers for now
                });
                
                // manually setting these for testing
                // will probably have these in a local "check-in table settings"
                // button attached to the table later on
                table.column(5).visible(false);
                table.column(6).visible(false);
            }).fail(function (xhr, textStatus, errorThrown) {

            });
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

            $(".activity-card").click(thumbnailClickHandler);

        });

        $(".thumbnail-dismiss").click(function (event) {
            $(this).parent().parent().parent().parent().parent().remove();
        });

        $(".activity-card").click(thumbnailClickHandler);
        

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
