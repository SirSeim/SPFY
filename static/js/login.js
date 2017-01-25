$(function () {
    $("#login").submit(function () {
        var status = $('#status');
        var data = {
            username: $('#username').val(),
            password: $('#password').val()
        };

        status.text("Sending");
        console.log(data);
        $.ajax({
            url: "/api/sessions",
            method: "POST",
            data: data
        }).done(function (data, textStatus, xhr) {
            status.text("Success!");
            localStorage.setItem("userID", data.result);
            console.log(data);
            console.log(textStatus);
            console.log(xhr);

            if (typeof(Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
                console.log(xhr.getResponseHeader("authorization"));
                localStorage.setItem("authorization", xhr.getResponseHeader("authorization"));
                window.location.href = "/";
            } else {
                // Sorry! No Web Storage support..
                status.text("No LocalStorage support");
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
            console.log(textStatus);
            console.log(xhr);

            var json = xhr.responseJSON;
            var code = xhr.status;
            if (code === 400) {
                if (json.validation.keys[0] === "username") {
                    status.text("Missing username");
                } else if (json.validation.keys[0] === "password") {
                    status.text("Missing password");
                }
            } else if (code === 401) {
                status.text("Bad Username or Password");
            }
        });

        return false;
    });
});
