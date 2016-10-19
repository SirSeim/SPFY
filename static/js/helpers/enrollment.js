$(function (event) {

    // Should we consider storing the information relevant
    // for that paricular day within the frontend?
    // i.e. each time the system starts a new drop-in (or Michelle
    // creates a new drop-in day, information such as the drop-in ID
    // and the ID's for each activity during that drop-in could be stored
    // in the frontend somwhere) - reduces ajax calls to retrieve information
    
    var allActivities = [];
    var currentDropIn = {};

    $.ajax({
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
            url: "api/dropins/" + currentDropIn.id + "/activities",
            method: "GET",
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.error(data);
            }
        });
    }).done(function (data) {
        console.log("done");
        console.log(data);
        allActivities = data.result.rows.slice();
    });

    var selectedclients = [];

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
        var signups = [];
        var activityids = [];

        for (var i = 0; i < allActivities.length; i++) {
            console.log(allActivities[i]);
            if (selectedActivities.includes(allActivities[i].activity_name)) {
                activityids.push(allActivities[i].id);
            }
        }

        for (var i = 0; i < selectedclients.length; i++) {
            for (var j = 0; j < activityids.length; j++) {
                signups.push({
                    dropinID: currentDropIn.id,
                    clientID: selectedclients[i].match(/[0-9]+/),
                    activityID: activityids[j]
                });
            }
        }

        console.log("signups");
        console.log(signups);

        $.ajax({
            url: "api/enroll",
            method: "POST",
            data: { expression: JSON.stringify(signups) },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.error(data);
            }
        });
    });

});