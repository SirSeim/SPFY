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

    $('#status-submit-button').click(function (event) {
        // var data = {
        //     name: $('#status-name').val(),
        //     color: colorString
        // };

        var data = {
            color: colorString,
            type: $('#status-type').val() ? $('#status-type').val() : '[status type]',
            message: $('#status-message').val() ? $('#status-message').val() : '[status message]',
            note: $('#status-note').val() ? $('#status-note').val() : '[status note]'
        };

        // if (data.name && data.color) {
        if (data.color && data.type && data.message && data.note) {
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
        }
        
        $('#new-status-modal').modal('toggle');

    });
});