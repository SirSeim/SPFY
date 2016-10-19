$(function (event) {

    // Should we consider storing the information relevant
    // for that paricular day within the frontend?
    // i.e. each time the system starts a new drop-in (or Michelle
    // creates a new drop-in day, information such as the drop-in ID
    // and the ID's for each activity during that drop-in are stored
    // in the frontend somwhere) - reduces ajax calls to retrieve information
    // var selecteditems = [];

    // var getDropins = function () {
    //     $.ajax({
    //         url: "api/dropins",
    //         method: "GET",
    //         success: function (data) {
    //             console.log("drop-ins");
    //             console.log(data);
    //         },
    //         error: function (data) {
    //             console.error(data);
    //         }
    //     });
    // };

    // getDropins();
    
    var selectedclients = [];
    var currentDropIn = {};

    $('#clients').delegate("td", "click", function () {
        // alert("client selected here");
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

    var selectedActivities = [];

    $('#activities').delegate("td", "click", function (event) {
        var name = $(this)[0].innerText;
        console.log(name);
        if (!selectedActivities.includes(name)) {
            selectedActivities.push(name);
        }
        // refreshSelectedActivities();
        $('#selected-activities').empty();
        for (var i = 0; i < selectedActivities.length; i++) {
            $('#selected-activities').append('<li class="list-group-item activity">' 
                    + selectedActivities[i]
                    + '</li>');
        }
    });

    $('#enroll-button').click(function (event) {
        alert("enroll button clicked");
        // var signups = [];
        // var activityids = [];

        // for (var i = 0; i < allActivities.length; i++) {
        //     console.log(allActivities[i]);
        //     if (selectedActivities.includes(allActivities[i].activity_name)) {
        //         activityids.push(allActivities[i].id);
        //     }
        // }
        // console.log("activityids");
        // console.log(activityids);
        // for (var i = 0; i < selectedclients.length; i++) {
        //     for (var j = 0; j < activityids; j++) {
        //         signups.push({
        //             dropinID: currentDropIn.id,
        //             clientID: selectedclients[i],
        //             activityID: activityids[j]
        //         });
        //     }
        // }

        // $.ajax({
        //     url: "api/enroll",
        //     method: "POST",
        //     data: { expression: JSON.stringify(signups) },
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     error: function (data) {
        //         console.error(data);
        //     }
        // });
    });

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
    // });

    // $.ajax({
    //     url: "api/dropins/" + currentDropIn.id + "/activities",
    //     method: "GET",
    //     success: function (data) {
    //         console.log("inside activities success");
    //         console.log(data);
    //     },
    //     error: function (data) {
    //         console.error(data);
    //     }
    // });
    
    // $(".list-group-item.activity").click(function (event) {
    //     alert("clicked");
    //     selecteditems.push(this);
    //     console.log(selecteditems);
    // });

});