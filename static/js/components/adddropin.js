$(function () {
    

    // $('#createdropin').click( function (event) {
    //     var data = {
    //         date: currentDate
    //     }

    //     $.ajax({
    //         xhrFields: {
    //             withCredentials: true
    //         },
    //         beforeSend: function (xhr) {
    //             xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
    //         },
    //         url: "api/dropins",
    //         method: "POST",
    //         data: { expression: JSON.stringify(data) },
    //         success: function (data) {
    //             console.log(data);

    //             //clean up the date
    //             $('#dropin-feedback').empty().text(
    //               'New Drop-In for ' + data.result.rows[0].date + ' created.');
    //         },
    //         error: function (xhr) {
    //             console.error(xhr);

    //             if (xhr.status === 401) {
    //                 localStorage.removeItem("authorization");
    //             }
    //         }
    //     });

        $("#add-new-dropin").click(function (event) {
             $("#newDropInModal").modal("toggle");
        });

        $("#dropin-date-input").attr("value", moment().format("YYYY-MM-DD"));

        $.ajax({
          xhrFields: {
            withCredentials: true
          },
          beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
          },
          url: "/api/dropins?lastest=5",
          method: "GET",
          data: {
              checked: true
          }
        }).done(function (data, textStatus, xhr) {
          console.log(data);
          $("#drop-in-date").append(moment(data.result[0].date).format('MMM Do YYYY'));
          $("#drop-in-dropdown").append('<a class="dropdown-item" href="#">' +
                                        moment(data.result[1].date).format('dddd L') + 
                                        '</a>')
                                .append('<a class="dropdown-item" href="#">' +
                                        moment(data.result[2].date).format('dddd L') + 
                                        '</a>')
                                .append('<a class="dropdown-item" href="#">' +
                                        moment(data.result[3].date).format('dddd L') + 
                                        '</a>')
                                .append('<a class="dropdown-item" href="#">' +
                                        moment(data.result[4].date).format('dddd L') + 
                                        '</a>')
                                .append('<a class="dropdown-item" href="#">' +
                                        moment(data.result[5].date).format('dddd L') + 
                                        '</a>');
        }).fail(function (xhr, textStatus, errorThrown) {
          console.log(xhr);
        });

        // $.ajax({
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     beforeSend: function (xhr) {
        //         xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        //     },
        //     url: 'api/activities',
        //     method: 'POST',
        //     data: { expression: JSON.stringify(activityData) },
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     error: function (xhr) {
        //         console.error(xhr);

        //         if (xhr.status === 401) {
        //             localStorage.removeItem("authorization");
        //         }
        //     }
        // });

    // });

});