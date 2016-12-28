$(function () {

    // var colorString = '';

    // // spectrum plugin must be attached to an input element
    // $('#flag-custom-color').spectrum({
    //     color: '#127000',
    //     change: function(color) {
    //         console.log("change called: " + color.toHexString());
    //         colorString = color.toHexString();
    //     }
    // });

    // $('#flag-submit-button').click(function (event) {
    //     var data = {
    //         color: colorString,
    //         type: $('#flag-type').val() ? $('#flag-type').val() : '[flag type]',
    //         message: $('#flag-message').val() ? $('#flag-message').val() : '[flag message]',
    //         note: $('#flag-note').val() ? $('#flag-note').val() : '[flag note]'
    //     };

    //     if (data.color && data.type && data.message && data.note) {
    //         $.ajax({
    //             xhrFields: {
    //                 withCredentials: true
    //             },
    //             beforeSend: function (xhr) {
    //                 xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
    //             },
    //             url: 'api/flags',
    //             method: 'POST',
    //             data: data,
    //             success: function (data) {
    //                 console.log(data);
    //             },
    //             error: function (xhr) {
    //                 console.error(xhr);

    //                 if (xhr.status === 401) {
    //                     localStorage.removeItem("authorization");
    //                 }
    //             }   
    //         });
    //     }
    //     $('#new-flag-modal').modal('toggle');

    // });
});