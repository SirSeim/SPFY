$(function (event) {
    
    var currentDate = moment().format("YYYY-MM-DD");

    $('#createdropin').click( function (event) {
        var data = {
            date: currentDate
        }

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/dropins",
            method: "POST",
            data: { expression: JSON.stringify(data) },
            success: function (data) {
                console.log(data);

                //clean up the date
                $('#dropin-feedback').empty().text(
                  'New Drop-In for ' + data.result.rows[0].date + ' created.');
            },
            error: function (xhr) {
                console.error(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        });

        var selectedActivities = [];

        $('#activities1').delegate("li", "click", function (event) {
            var name = $(this)[0].innerText;
            if (!selectedActivities.includes(name)) {
                selectedActivities.push(name);
            }
        });

        $('#activities2').delegate("li", "click", function (event) {
            var name = $(this)[0].innerText;
            if (!selectedActivities.includes(name)) {
                selectedActivities.push(name);
            }
        });

        $('#activities3').delegate("li", "click", function (event) {
            var name = $(this)[0].innerText;
            if (!selectedActivities.includes(name)) {
                selectedActivities.push(name);
            }
        });

        console.log(selectedActivities);

        var activityData = {

        };

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/activities',
            method: 'POST',
            data: { expression: JSON.stringify(activityData) },
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.error(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        });

    });

});