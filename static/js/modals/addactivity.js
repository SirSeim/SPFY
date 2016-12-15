$(function () {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: "/api/activities",
        method: "GET",
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.error(data);
        }
    }).done(function (data) {
        data.result.forEach(function (activity) {
            if (activity.programId === 2) {
                $("#health-well").append('<button type="button" class="list-group-item list-group-item-action add-activity-possibility" data-id="' + activity.id + '" data-program-id="' + activity.programId + '">' + activity.name + '</button>');
            } else if (activity.programId === 3) {
                $("#art-well").append('<button type="button" class="list-group-item list-group-item-action add-activity-possibility" data-id="' + activity.id + '" data-program-id="' + activity.programId + '">' + activity.name + '</button>');
            } else if (activity.programId === 4) {
                //need to fix the 4 well issue
                $("#art-well").append('<button type="button" class="list-group-item list-group-item-action add-activity-possibility" data-id="' + activity.id + '" data-program-id="' + activity.programId + '">' + activity.name + '</button>');
            } else {
                $("#other-well").append('<button type="button" class="list-group-item list-group-item-action add-activity-possibility" data-id="' + activity.id + '" data-program-id="' + activity.programId + '">' + activity.name + '</button>');
            }
        });

        $('.activities-add button').click(function (event) {
            if ($(this).hasClass("active") ) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }   
        });
    });

  

});