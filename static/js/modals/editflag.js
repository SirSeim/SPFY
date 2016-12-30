$(function () {

    $('#editflag-submit-button').click(function (event) {
        var settings = $('#editflag-modal-data').data("settings");

        if ($('#editflag-modal-dot').is(':checked')) {
            settings.dot = true;
        } else {
            settings.dot = false;
        }

        var data = {
            flagID: $('#editflag-modal-data').data("id"),
            message: $('[name="edit-message"]').val(),
            note: $('[name="edit-note"]').val(),
            settings: JSON.stringify(settings)
        };

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/flags",
            method: "PUT",
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
        }).done(function (data) {
            $('#editflag-modal').modal('toggle');
        });
    });
});