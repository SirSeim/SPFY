$(function (event) {
    var status = $('.dot');
    var table = $('#clients tbody');


    var statuses = {
        '1': 'okay-dot',
        '2': 'missing-dot',
        '3': 'sick-dot',
        '4': 'vulnerable-dot',
        '5': 'dangerous-dot'
    } // in future, will be able to pull from list of statuses stored in a "Settings" page
    // or an ajax call that retrieves statuses and their colors

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
            var dataString = "";
            for (var property in client) {
                dataString += 'data-' + property.toLowerCase() + '="' + client[property] + '" ';
            }
            console.log('<td' + dataString + '>');
            table.append('<tr><td ' + dataString + '>' +
                '<span class="' + statuses[client.status] + ' bullet"></span>' +
                client.firstName + ' ' +
                client.lastName + ' ' +
                '</td></tr>');
        });
    });

    $('#client-search').keyup(function () {
        var search = $('#client-search');
        var clients = $('#clients td');
        if (search.val() === '') {
            clients.show();
        } else {
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
