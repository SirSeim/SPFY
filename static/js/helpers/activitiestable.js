$(function (event) {
    var createActivity = function (activity) {
        return '<tr><td><span class="bullet"></span>' 
            + activity.activity_name 
            + '</td></tr>';
    };


    var populateActivities = function (dropins) {
        var status = $('.dot');
        var table = $('#activities tbody');

        status.removeClass('dot-success').addClass('dot-pending');
        
        console.log("inside populateActivities");
        console.log(dropins);

        var currentDropIn = dropins.result[dropins.result.length - 1];
        console.log(currentDropIn.id);

        $.ajax({
            url: "api/dropins/" + currentDropIn.id + "/activities",
            method: "GET",
            success: function (data) {
                table.empty()
                status.removeClass('dot-pending').addClass('dot-success');

                console.log("inside activities success");
                console.log(data);
                data.result.rows.forEach(function (element) {
                    table.append(createActivity(element));
                });
                console.log(data);
            },
            error: function (data) {
                status.removeClass('dot-pending').addClass('dot-error');
                console.error(data);
            }
        });
    };

    var getDropins = function () {
        $.ajax({
            url: "api/dropins",
            method: "GET",
            success: function (data) {
                populateActivities(data);
                console.log("drop-ins");
                console.log(data);
            },
            error: function (data) {
                console.error(data);
            }
        })
    };

    getDropins();

    $('#activity-search').keyup(function () {
        var search = $('#activity-search');
        var activities = $('#activities td');
        if (search.val() === '') {
            activities.show();
        } else {
            console.log(activities);
            activities.hide().filter(function (i, e) {
                return $(e).text().toLowerCase().indexOf(search.val().toLowerCase()) !== -1;
            }).show();
        }
    });
});