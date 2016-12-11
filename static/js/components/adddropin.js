$(function () {

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

        $("#create-dropin").click( function (event) {
            url:"/api/dropins"
            method: 'POST',
            data: {
                date: $("#dropin-date-input").attr("value")
            }
        });

});