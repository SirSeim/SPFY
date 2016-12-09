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
                console.log(element.program_name);
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



});