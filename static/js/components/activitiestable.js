$(function (event) {
    // var table = $('#activities-table');

    // $.ajax({
    //   xhrFields: {
    //       withCredentials: true
    //   },
    //   beforeSend: function (xhr) {
    //       xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
    //   },
    //   url: "/api/dropins/" + dropinId + "/activities/" + activityId,
    //   method: "PUT",
    //   data: {
    //       checked: true
    //   }
    // }).done(function (data, textStatus, xhr) {
    //   console.log(data);
    //   jThis.prop('disabled', false);
    //   updateAlertsbadge();
    // }).fail(function (xhr, textStatus, errorThrown) {
    //   console.log(xhr);
    //   jThis.prop('disabled', false);
    //   jThis.prop('checked', false);
    //   updateAlertsbadge();
    // });

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
    // }).then(function (dropins) {
    //     var currentDropIn = dropins.result[dropins.result.length - 1];
    //     return $.ajax({
    //         url: "api/dropins/" + currentDropIn.id + "/activities",
    //         method: "GET",
    //         success: function (data) {
    //             console.log("inside activities success");
    //             console.log(data);
    //             table.empty();
    //             if (data.result) {
    //                 data.result.forEach(function (activity) {
    //                     table.append('<tr><td>' +
    //                         activity.name +
    //                         '</td></tr>');
    //                 });
    //             } else {
    //                 table.append('<tr><td>Medi-Cal Registration</td></tr>');
    //                 // hardcoding at least one activity into each drop-in to avoid "no activities" errors
    //                 // hardcoded to 3rd insert fro match_drop_in_activity in db.sql
    //             }
    //         },
    //         error: function (data) {
    //             console.error(data);
    //         }
    //     });
    // });


    // $('#activity-search').keyup(function () {
    //     var search = $('#activity-search');
    //     var activities = $('#activities td');
    //     if (search.val() === '') {
    //         activities.show();
    //     } else {
    //         console.log(activities);
    //         activities.hide().filter(function (i, e) {
    //             return $(e).text().toLowerCase().indexOf(search.val().toLowerCase()) !== -1;
    //         }).show();
    //     }
    // });
});
