$(function (event) {
    var status = $('.dot');
    var table = $('#clients tbody');

    // ** ajax call that retrieves statuses and their colors

    var statuses = {
        '1': 'okay-dot',
        '2': 'missing-dot',
        '3': 'sick-dot',
        '4': 'vulnerable-dot',
        '5': 'dangerous-dot'
    }

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
            console.log('<tr><td><span class="' + statuses[client.status] + '"></span>');
            table.append('<tr><td><span class="' + statuses[client.status] + '"></span>' +
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

    /*
    
        can insert and retrieve using jQuery's data function
        
        <td class="submit" data-id="1">John Doe</td>
        var id = $(this).data("id");

        // $.data() knows to grab any attribute with "data-"
        // $.data("id", 1) will insert into the "data-id" attribute
    */
});
