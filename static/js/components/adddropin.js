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
          url: "/api/dropins?latest=6",
          method: "GET"
        }).done(function (data, textStatus, xhr) {
          console.log("TTTTTTT");
          console.log(data);
          window.sessionStorage.frontdeskDropinId = data.result[0].id;
          window.sessionStorageListeners.forEach(function (listener) {
              listener.ready();
          });
          $("#drop-in-date").append(moment(data.result[0].date).format('MMM Do YYYY'));
          for (var i = 0; i < data.result.length; i++) {
              $("#drop-in-dropdown").append('<a class="dropdown-item dropin-date-item" data-id="' + window.sessionStorage.frontdeskDropinId + '">' +
                                            moment(data.result[i].date).format('dddd L') + 
                                            '</a>');
          }

          $(".dropin-date-item").click(function (event) {
            jThis = $(this);
            $("#drop-in-date").text(moment(jThis.text()).format('MMM Do YYYY'));
            window.sessionStorage.frontdeskDropinId = jThis.data("id");
            window.sessionStorageListeners.forEach(function (listener) {
                listener.ready();
            });
          });
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