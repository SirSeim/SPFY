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
        $("#createActivityPrograms").append(function () {
            var tableRows = [];
            data.result.rows.forEach(function (element) {
                console.log(element.program_name);
                tableRows.push(
                    "<option value=\'" + element.program_name + "\'>" + element.program_name + "</option>"
                );
            });
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