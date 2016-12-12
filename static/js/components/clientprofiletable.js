// $ only ensures that code does not run until the page is finished loading
// ajax call runs concurrent with page loading
$(function (event) {
    
    
    var setupClientProfileTable = function () {
        var status = $('.dot');
        var table = $('#clients tbody');
        var statuses = JSON.parse(window.sessionStorage.statuses); // if getting Uncaught SyntaxError: Unexpected token u in JSON at position 0
        var flags = JSON.parse(window.sessionStorage.flags);        // means value is probably undefined
        var clients = JSON.parse(window.sessionStorage.clients);


        table.empty();
        clients.forEach(function (client) {
            var display = ['<span class="dot"></span>' + client.firstName + ' ' +
            client.lastName];
            console.log(client);
            table.append(window.buildRow(client, display));
        });
        // what if profiles don't come through?
        // need code for edge case
        $(table).children('tr').get().forEach(function (clientRow) {
            var currentStatus = window.getDataById(statuses, $(clientRow).data("status"));
            $(clientRow).find('.dot').css('background-color', currentStatus.color);
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
    };
    /*
    
        can insert and retrieve using jQuery's data function
        
        <td class="submit" data-id="1">John Doe</td>
        var id = $(this).data("id");

        // $.data() knows to grab any attribute with "data-"
        // $.data("id", 1) will insert into the "data-id" attribute
    */

    // never make assumptions about when calls will show up
    if (window.sessionStorage.statuses) {
        // executes if the call has already arrived
        // statuses already exists
        // means setup function is okay to run
        console.log("call arrived");
        setupClientProfileTable();
    } else {
        console.log("call has not arrived, listen for call");
        // the call hasn't arrived yet, register a listener
        // to tell page when it shows up
        // main.js will tell clientprofiletable.js when it shows up

        // this is where "loading" animation shows up
        // "please wait"
        window.sessionStorageListeners.push({
            ready: setupClientProfileTable
        });
    }
});
