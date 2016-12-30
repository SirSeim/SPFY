$(function () {

    var colorString = '';

    // spectrum plugin must be attached to an input element
    $('#flag-custom-color').spectrum({
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

    $('#newflag-submit-button').click(function (event) {
        // var data = {
        //     name: $('#flag-name').val(),
        //     color: colorString
        // };

        var settings = {
            defaults: {
                message: $('#flag-message').val() ? $('#flag-message').val() : 'default message',
                note: $('#flag-note').val() ? $('#flag-note').val() : 'default note',
                dot: $('#defaultflag-dot').prop('checked')
            }
        };
        var data = {
            name: $('#flag-name').val() ? $('#flag-name').val() : '[flag name]',
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
                url: 'api/flags/types',
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
        
        $('#new-flag-modal').modal('toggle');

    });
});