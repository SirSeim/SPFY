// $(function (event) {
//     var status = $('.dot');
//     var table = $('#clients tbody');
//     $.ajax({
//         url: "api/clients",
//         method: "GET",
//         success: function (data) {
//             status.removeClass('dot-pending').addClass('dot-success');
//             console.log(data);
//         },
//         error: function (data) {
//             status.removeClass('dot-pending').addClass('dot-error');
//             console.error(data);
//         }
//     }).done(function (data) {
//         table.empty();
//         data.result.forEach(function (client) {
//             table.append('<tr><td><span class="bullet"></span>' +
//                 client.firstName + ' ' +
//                 client.lastName + ' ' +
//                 'id: ' + client.id +
//                 '</td></tr>');
//         });
//     });
// });
// var createClients = function (checkin) {
//     return '<tr><td class="col-xs-2">' + moment(clients.date).format('M/D/YY') +
//             '</td><td class="col-xs-2">50</td><td class="col-xs-2">5</td>' +
//             '<td class="col-xs-2">';
// };
