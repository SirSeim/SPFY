$(function () {

    $('#editflag-modal-checkin-alert').change(function (event) {
        if ($('#editflag-modal-checkin-alert').is(':checked')) {
            $('#editflag-text-inputs').append('<textarea class="form-control" rows="5" name="edit-checkin-alert-message"' + 
                                     'placeholder="Checkin Alert Message"></textarea>');
        } else {
            $('[name="edit-checkin-alert-message"]').remove();
        }
    });

    $('#editflag-submit-button').click(function (event) {
        var settings = $('#editflag-modal-data').data("settings");

        if ($('#editflag-modal-dot').is(':checked')) {
            settings.dot = true;
        } else {
            settings.dot = false;
        }

        if ($('#editflag-modal-checkin-alert').is(':checked')) {
            settings.checkinalert = $('[name="edit-checkin-alert-message"]').val();
        } else {
            settings.checkinalert = false;
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