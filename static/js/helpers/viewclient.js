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
            $('#clients').click( function (event) {
                if (data.result.rows[0].nick_name != undefined){
                    $('#client-name').text(data.result.rows[0].nick_name + " (" + data.result.rows[0].first_name + ") " + data.result.rows[0].last_name);
                }else{
                    $('#client-name').text(data.result.rows[0].first_name +" "+ data.result.rows[0].last_name);
                }
            });
            
        });
    }

    $('#clients').delegate("td", "click", function () {
        displayClientProfile($(this)[0].innerText);
    });


});

if (true) {};