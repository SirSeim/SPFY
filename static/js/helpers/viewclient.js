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
        });
    }

    $('#clients').delegate("td", "click", function () {
        displayClientProfile($(this)[0].innerText);
    });

    $('#edit-client').click(function () {
        var clientName = $('#client-name')['0'].textContent;
        var clientBirthday = $('#client-birthday')['0'].textContent;
        var clientAge = $('#client-age')['0'].textContent;
        var clientPhone = $('#client-phonenumber')['0'].textContent;
        var clientMail = $('#client-email')['0'].textContent;
        var lastMeeting = $('#last-meeting')['0'].textContent;
        var caseManager = $('#case-manager')['0'].textContent;

        $('#client-name').replaceWith('<div class="col-sm-8"><input type="text" id="client-name" class="form-control" value="' + clientName + '" /></div>');
        $('#edit-client').replaceWith('<button id="submit-edit" type="button" class="col-sm-2 btn btn-primary btn-sm">Submit Edit</button><button id="cancel-edit" type="button" class="col-sm-2 btn btn-danger btn-sm">Cancel Edit</button>');

        $('#client-birthday').replaceWith('<input type="text" id="client-birthday" class="form-control" value="' + clientBirthday + '" />');
        $('#client-age').replaceWith('<input type="number" id="client-age" class="form-control" min="1" step="1" value="' + clientAge + '" />');
        $('#client-phonenumber').replaceWith('<input type="text" id="client-phonenumber" class="form-control" value="' + clientPhone + '" />');
        $('#client-email').replaceWith('<input type="text" id="client-email" class="form-control" value="' + clientMail + '" />');
        $('#last-meeting').replaceWith('<input type="text" id="last-meeting" class="form-control" value="' + lastMeeting + '" />');
        $('#case-manager').replaceWith('<input type="text" id="case-manager" class="form-control" value="' + caseManager + '" />');
    });

    $('#cancel-edit').click(function () {
        
    });

    $('#submit-edit').click(function () {

    });


});