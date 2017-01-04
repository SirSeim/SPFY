// $ only ensures that code does not run until the page is finished loading
// ajax call runs concurrent with page loading
$(function (event) {
    
    
    var setupClientProfileTable = function () {
        var status = $('.dot');
        var table = $('#clients tbody');
        var flagTypes = JSON.parse(window.sessionStorage.flagTypes);
        var flags = JSON.parse(window.sessionStorage.flags); // if getting Uncaught SyntaxError: Unexpected token u in JSON at position 0
        // var flags = JSON.parse(window.sessionStorage.flags);        // means value is probably undefined
        var clients = JSON.parse(window.sessionStorage.clients);
        var spanLimit = 3;

        table.empty();
        clients.forEach(function (client) {
            var spans = [];
            client.checkinalerts = [];
            flags.forEach(function (flag) {
                if (client.id === flag.clientID) {
                    if (flag.settings) { // check setflag, editflag files to see which settings are present
                        if (flag.settings.dot) {
                            var color = window.getDataById(flagTypes, flag.type).color;
                            spans.push('<span class="dot" data-flag="' + flag.id + '" data-color="' + color + '"></span>');
                        }
                        if (flag.settings.checkinalert) {
                            // make sure it doesn't overwrite previous alerts
                            client.checkinalerts.push(flag.settings.checkinalert);
                        }
                    }
                }
            });
            client.checkinalerts = JSON.stringify(client.checkinalerts);

            // color dots display logic
            var display = [];
            if (spans.length > spanLimit) {
                var shortSpans = [];
                for (var i = 0; i < spanLimit; i++) {
                    shortSpans.push(spans[i]);
                }
                shortSpans.push('&#x2026;');
                display.push(client.firstName + ' ' + client.lastName + ' ' +
                             '<label class="client-dots" title="Flags" data-content=\'' + spans + '\'>' + 
                             shortSpans.join('') + '</label>');
            } else {
                display.push(client.firstName + ' ' + client.lastName + ' ' +
                             '<label class="client-dots">' + 
                             spans.join('') + '</label>');
            }
            table.append(window.buildRow(client, display));
        });
        // what if profiles don't come through?
        // need code for edge case
        $(table).children('tr').get().forEach(function (clientRow) {
            $(clientRow).find('.dot').get().forEach(function (dot) {
                $(dot).css('background-color', $(dot).data("color"));
            });
        });
        
        $('.client-dots')//.popover({
        //     container: 'body',
        //     html: true, // does this make it vulnerable to xss attacks? - yes
        //     content: function () {
        //         return $(this).data('content');
        //     }
        // })
            .click(function (event) {
                alert("clicked!");
            event.preventDefault();
            event.stopPropagation();
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

    var globalData = []
    globalData.push(window.sessionStorage.flagTypes);
    globalData.push(window.sessionStorage.flags);
    // globalData.push(window.sessionStorage.flags);

    // never make assumptions about when calls will show up
    if (globalData.every((array) => array)) {
        // executes if the call has already arrived
        // statuses already exists
        // means setup function is okay to run
        console.log("call arrived");
        setupClientProfileTable();
    } else {
        console.log("waiting for call");
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
