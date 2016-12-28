$(function () {

    var colorString = '';

    // spectrum plugin must be attached to an input element
    $('#status-custom-color').spectrum({
        color: '#127000',
        change: function(color) {
            console.log("change called: " + color.toHexString());
            colorString = color.toHexString();
        },
        allowEmpty: true,
        chooseText: 'Select',
        showPalette: true,
        showSelectionPalette: true,
        selectionPalette: [],
        palette: [['#02AEF0']],
        localStorageKey: 'spectrum.colors'
    });

    $('#newstatus-submit-button').click(function (event) {
        // var data = {
        //     name: $('#status-name').val(),
        //     color: colorString
        // };

        var settings = {
            defaults: {
                message: $('#status-message').val() ? $('#status-message').val() : 'default message',
                note: $('#status-note').val() ? $('#status-note').val() : 'default note',
                dot: $('#defaultstatus-dot').prop('checked')
            }
        };
        var data = {
            name: $('#status-name').val() ? $('#status-name').val() : '[status name]',
            color: colorString,
            settings: JSON.stringify(settings)
        };

        // if (data.name && data.color) {
        if (data.name && data.color && data.settings) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/statuses/types',
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
        }
        
        $('#new-status-modal').modal('toggle');

    });
});