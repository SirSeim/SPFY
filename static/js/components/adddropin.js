$(function () {

        $("#add-new-dropin").click(function (event) {
             $("#newDropInModal").modal("toggle");
        });

        $("#dropin-date-input").val(moment().format("YYYY-MM-DD"));

        var createDropInDateItem = function (dropinItem) {
          return '<a class="dropdown-item dropin-date-item" data-id="' + dropinItem.id + '">' +
                  moment(dropinItem.date).format('dddd L') + 
                  '</a>';
        };

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
          
          $("#drop-in-date").append(moment(data.result[0].date).format('MMM Do, YYYY'));

          var jDropInDropdown = $("#drop-in-dropdown");
          data.result.forEach(function(dropinItem) {
            jDropInDropdown.append(createDropInDateItem(dropinItem));
          });

          $(".dropin-date-item").click(function (event) {
            jThis = $(this);
            $("#drop-in-date").text(moment(jThis.text()).format('MMM Do YYYY'));
            window.sessionStorage.frontdeskDropinId = jThis.data("id");
            if (window.frontDeskRefresh) {
              window.frontDeskRefresh.forEach(function (f) {
                console.log("refreshing");
                f();
              });
            }
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