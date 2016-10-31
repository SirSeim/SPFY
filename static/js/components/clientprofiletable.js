$(function (event) {
    var status = $('.dot');
    var table = $('#clients tbody');
    $.ajax({
        url: "api/clients",
        method: "GET",
        success: function (data) {
            status.removeClass('dot-pending').addClass('dot-success');
            console.log(data);
        },
        error: function (data) {
            status.removeClass('dot-pending').addClass('dot-error');
            console.error(data);
        }
    }).done(function (data) {
        table.empty();
        data.result.forEach(function (client) {
            table.append('<tr><td data-id="' + client.id + '" data-firstname="' + client.firstName + '" data-lastname="' + client.lastName + '">' +
                '<span class="bullet"></span>' +
                client.firstName + ' ' +
                client.lastName + ' ' +
                'id: ' + client.id +
                '</td></tr>');
        });
    });

    $('#client-search').keyup(function () {
        var search = $('#client-search');
        var clients = $('#clients td');
        if (search.val() === '') {
            clients.show();
        } else {
            console.log(clients);
            clients.hide().filter(function (i, e) {
                return $(e).text().toLowerCase().indexOf(search.val().toLowerCase()) !== -1;
            }).show();
        }
    });
});
