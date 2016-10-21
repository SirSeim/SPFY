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

        $('#client-name').replaceWith('<div id="client-name-container" class="col-sm-8"><input type="text" id="client-name" class="form-control" value="' + clientName + '" /></div>');
        $('#edit-client').hide();
        $('#cancel-edit').show();
        $('#submit-edit').show();

        $('#client-birthday').replaceWith('<input type="text" id="client-birthday" class="form-control" value="' + clientBirthday + '" />');
        $('#client-age').replaceWith('<input type="number" id="client-age" class="form-control" min="1" step="1" value="' + clientAge + '" />');
        $('#client-phonenumber').replaceWith('<input type="text" id="client-phonenumber" class="form-control" value="' + clientPhone + '" />');
        $('#client-email').replaceWith('<input type="text" id="client-email" class="form-control" value="' + clientMail + '" />');
        $('#last-meeting').replaceWith('<input type="text" id="last-meeting" class="form-control" value="' + lastMeeting + '" />');
        $('#case-manager').replaceWith('<input type="text" id="case-manager" class="form-control" value="' + caseManager + '" />');
    });

    $('#cancel-edit').click(function () {
        var clientName = $('#client-name')['0'].value;
        var clientBirthday = $('#client-birthday')['0'].value;
        var clientAge = $('#client-age')['0'].value;
        var clientPhone = $('#client-phonenumber')['0'].value;
        var clientMail = $('#client-email')['0'].value;
        var lastMeeting = $('#last-meeting')['0'].value;
        var caseManager = $('#case-manager')['0'].value;

        $('#client-name-container').replaceWith('<h1 id="client-name" class="col-sm-9">' + clientName + '</h1>');
        $('#edit-client').show();
        $('#cancel-edit').hide();
        $('#submit-edit').hide();

        $('#client-birthday').replaceWith('<td id="client-birthday">' + clientBirthday + '</td>');
        $('#client-age').replaceWith('<td id="client-age">' + clientAge + '</td>');
        $('#client-phonenumber').replaceWith('<td id="client-phonenumber">' + clientPhone + '</td>');
        $('#client-email').replaceWith('<td id="client-email">' + clientPhone + '</td>');
        $('#last-meeting').replaceWith('<td id="last-meeting">' + lastMeeting + '</td>');
        $('#case-manager').replaceWith('<td id="case-manager">' + caseManager + '</td>');
    });

    $('#submit-edit').click(function () {
        console.log('')
    });


});