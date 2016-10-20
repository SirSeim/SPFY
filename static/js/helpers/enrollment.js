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
        allActivities = data.result.rows.slice();
    });

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

    var selectedActivities = [];

    $('#activities').delegate("td", "click", function (event) {
        var name = $(this)[0].innerText;
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
        var signups = [];
        var activityids = [];

        for (var i = 0; i < allActivities.length; i++) {
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
        }).done(function (data) {
            var clientString = "";
            for (var i = 0; i < selectedclients.length; i++) {
                clientString += selectedclients[i] + '<br>';
            }
            var activityString = "";
            for (var i = 0; i < selectedActivities.length; i++) {
                activityString += selectedActivities[i] + '<br>';
            }

            $('#enrollment-feedback').empty().append(
                '<div><h4>Clients Successfully Enrolled</h4>' +
                '<h4>Clients</h4>' + clientString +
                '<h4>Activities</h4>' + activityString +
                '</div>');

            $('#selected-clients').empty();
            $('#selected-activities').empty();
        });
    });

});
