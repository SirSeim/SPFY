$(function () {

        $("#add-new-dropin").click(function (event) {
             $("#newDropInModal").modal("toggle");
        });

        $("#dropin-date-input").val(moment().format("YYYY-MM-DD"));

        $.ajax({
          xhrFields: {
            withCredentials: true
          },
          beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
          },
          url: "/api/dropins?latest=5",
          method: "GET"
        }).done(function (data, textStatus, xhr) {
          console.log(data);
          window.sessionStorage.frontdeskDropinId = data.result[0].id;
          window.sessionStorageListeners.forEach(function (listener) {
              listener.ready();
          });
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
            console.log("clicked");
            $.ajax({
              xhrFields: {
                withCredentials: true
              },
              beforeSend: function (xhr) {
                  xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
              },
              url: "/api/dropins",
              method: "POST",
              data: {
                  date: moment($("#dropin-date-input").val()).toISOString()
              }
            }).done(function (data, textStatus, xhr) {
              console.log(data);
              //refresh check-in
              //refresh activities & their enrollment

            }).fail(function (xhr, textStatus, errorThrown) {
              console.log(xhr);
            });
        });

});