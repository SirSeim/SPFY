$(function (event) {
    var createClient = function (client) {
        return '<tr><td><span class="bullet"></span>' +
                client.firstName + ' ' + client.lastName +
                '</td></tr>';
    };


    var populateClients = function () {
        var status = $('.dot');
        var table = $('#clients tbody');

        status.removeClass('dot-success').addClass('dot-pending');
        $.ajax({
            url: "api/clients",
            method: "GET",
            success: function (data) {
                table.empty();
                status.removeClass('dot-pending').addClass('dot-success');
                data.result.forEach(function (element) {
                    table.append(createClient(element));
                });
                console.log(data);
            },
            error: function (data) {
                status.removeClass('dot-pending').addClass('dot-error');
                console.error(data);
            }
        });
    };

    populateClients();

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