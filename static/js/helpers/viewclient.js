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
            if (data.result.rows[0].nick_name != undefined){
                $('#client-name').text(data.result.rows[0].nick_name + " (" + data.result.rows[0].first_name + ") " + data.result.rows[0].last_name);
            }else{
                $('#client-name').text(data.result.rows[0].first_name +" "+ data.result.rows[0].last_name);
            }
            var birthday = data.result.rows[0].date_of_birth;
            $('#client-birthday').text(birthday.slice(0, birthday.lastIndexOf("T")));    
            $('#client-age').text(data.result.rows[0].age.years);
            $('#client-phonenumber').text( data.result.rows[0].phone_number);
            $('#client-email').text(data.result.rows[0].email);
        });
    }

    $('#clients').delegate("td", "click", function () {
        displayClientProfile($(this)[0].innerText);
    });


});

if (true) {};