$(function () {

    var colorString = '';

    $('#custom-color').spectrum({
        color: '#127000',
        change: function(color) {
            console.log("change called: " + color.toHexString());
            colorString = color.toHexString();
        }
    });

    $('#status-submit-button').click(function (event) {
        var data = {
            name: $('#status-name').val(),
            color: colorString
        };
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/statuses',
            method: 'POST',
            data: data,
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.error(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }   
        });
    });
});