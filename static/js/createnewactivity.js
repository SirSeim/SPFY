$(function () {

    $('#createActivityStart').combodate();
    $('#createActivityEnd').combodate();

    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
      },
      url: 'api/programs',
      method: "GET",
      success: function (data) {
            console.log("Adding!");
            console.log(data.result.rows);
            var counter = 1;
            data.result.rows.forEach(function (element) {
                $("#createActivityPrograms").append("<option value=\'" + counter + "\'>" + element.program_name + "</option>");
                counter++;
            });
      },
      error: function (xhr) {
        console.error(xhr);

        if (xhr.status === 401) {
          localStorage.removeItem("authorization");
        }
      }
    });

    $("#createactivity-modal-save-button").on('click', function () {
        var name = $("#createActivityName").val().trim();
        var location = $("#createActivityLocation").val().trim();
        var startTime = $('#createActivityStart').combodate('getValue', 'HH:mm');
        var endTime = $('#createActivityEnd').combodate('getValue', 'HH:mm');
        var program = $("#createActivityPrograms").val();
        if (name === "" || location === "" || program === 0) {
            $(".activityWarning").removeClass("hidden");
        } else {
            if (!$(".activityWarning").hasClass("hidden")) {
                $(".activityWarning").addClass("hidden");
            };
            $.ajax({
              xhrFields: {
                withCredentials: true
              },
              beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
              },
              url: 'api/activity',
              method: "POST",
              data: { 
                programid: program,
                activityname: name,
                location: location, 
                ongoing: true,
                starttime: startTime,
                endtime: endTime
              },
              success: function (data) {
                    console.log("Activity added!");
              },
              error: function (xhr) {
                console.error(xhr);

                if (xhr.status === 401) {
                  localStorage.removeItem("authorization");
                }
              }
            });
        }
    })

});