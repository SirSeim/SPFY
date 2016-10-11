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
                table.empty()
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

    $("#searchbutton").click(function (){
        console.log("Searching for clients... Please wait.")
        $.ajax({
            url: "api/searchClient",
            method: "GET",
            success: function () {

            }
            error: function () {
                
            }
        });
    })

    $("#addcasenote").click(function () {
        console.log("added new case note");
        window.location.href = "casenotepage.html";
    });

    $(".tablinks").click(function (event) {
        var currentTabID = $(this).attr('href');
        $(currentTabID).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        event.preventDefault();
    });

    populateClients();

});
