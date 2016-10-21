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

    var postClientEdit = function (client) {
        $.ajax({
            url: "api/clients/" + client.match(/[0-9]+/),
            method: "POST",
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

    var clientName;
    var clientBirthday;
    var clientAge;
    var clientPhone;
    var clientMail;
    var lastMeeting;
    var caseManager;

    $('#edit-client').click(function () {
        clientName = $('#client-name')['0'].textContent;
        clientBirthday = $('#client-birthday')['0'].textContent;
        clientAge = $('#client-age')['0'].textContent;
        clientPhone = $('#client-phonenumber')['0'].textContent;
        clientMail = $('#client-email')['0'].textContent;
        lastMeeting = $('#last-meeting')['0'].textContent;
        caseManager = $('#case-manager')['0'].textContent;

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

        var name = $('#client-name')['0'].value;
        var firstName = name.substr(0,name.indexOf(' '));
        var nickname = name.match(/'([^']+)'/)[1];
        var lastName = name.substr(name.lastIndexOf(' ') + 1);
        var birthday = $('#client-birthday')['0'].value;
        var age = $('#client-age')['0'].value;
        var phoneNumber = $('#client-phonenumber')['0'].value;
        var email = $('#client-email')['0'].value;
        var lastMeeting = $('#last-meeting')['0'].value;
        var caseManager = $('#case-manager')['0'].value;

        var data = {
            firstName: firstName,
            lastName: lastName,
            nickname: nickname,
            birthday: birthday,
            age: age,
            phoneNumber: phoneNumber,
            email: email,
            lastMeeting: lastMeeting,
            caseManager: caseManager
        };

        console.log(data);

        $('#edit-client').show();
        $('#cancel-edit').hide();
        $('#submit-edit').hide();
    });


});