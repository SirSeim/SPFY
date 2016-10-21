$(function (event) {

    var displayClientProfile = function (client) {

        $.ajax({
            url: "api/clients/" + client.match(/[0-9]+/), // will find another way to get client id
            method: "GET",
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.error(data);
            }
        }).done(function (data) {
            console.log(data);
        });
    }

    $('#clients').delegate("td", "click", function () {
        displayClientProfile($(this)[0].innerText);
    });


});