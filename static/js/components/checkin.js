$(function (event) {

  // var currentDropIn = {};

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
  // }).then(function (data) {
  //     var dropins = data.result;
  //     currentDropIn = dropins[dropins.length - 1];
  // }).then(function () {
  //     return $.ajax({
  //         url: "api/dropins/" + currentDropIn.id,
  //         method: "GET",
  //         success: function (data) {
  //             console.log(data);
  //         },
  //         error: function (data) {
  //             console.error(data);
  //         }
  //     });
  // });

  // var selectedclients = [];

  // $('#clients').delegate("td", "click", function () {
  //     var client = $(this)[0].innerText;
  //     if (!selectedclients.includes(client)) {
  //         selectedclients.push(client);
  //     }
  //     $('#selected-clients').empty();
  //     for (var i = 0; i < selectedclients.length; i++) {
  //         $('#selected-clients').append('<li class="list-group-item client">'
  //                 + selectedclients[i]
  //                 + '</li>');

  //     }
  // });

  // $('#checkin-button').click(function (event) {
  //     var signups = [];

  //     for (var i = 0; i < selectedclients.length; i++) {
  //         signups.push({
  //             dropinID: currentDropIn.id,
  //             clientID: selectedclients[i].match(/[0-9]+/), // TODO: find more effective implementation
  //             date: moment().format("YYYY-MM-DD")
  //         });
  //     }

  //     $.ajax({
  //         url: "/api/checkin",
  //         method: "POST",
  //         contentType: "application/json",
  //         dataType: "json",
  //         data: JSON.stringify(signups),
  //         success: function (data) {
  //             console.log(data);
  //             var clientString = "";
  //             for (var i = 0; i < selectedclients.length; i++) {
  //                 clientString += selectedclients[i] + '<br>';
  //             }

  //             $('#checkin-checkin-feedback').empty().append(
  //                 '<div><h4>Clients Successfully Checked In</h4>' +
  //                  clientString +
  //                 '</div>');

  //             $('#selected-clients').empty();
  //         },
  //         error: function (data) {
  //             console.error(data);
  //             $('#checkin-feedback').empty().append(
  //                 '<div><h4>Check In failed</h4>');
  //         }
  //     });
  // });
});
