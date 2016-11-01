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
            var string = $('#view-client-tabs').attr('class');

            $('#view-client-tabs').attr('class', "col-sm-8");        
            if (data.result.rows[0].nick_name != undefined){
                $('#client-name').text(data.result.rows[0].nick_name + " (" + data.result.rows[0].first_name + ") " + data.result.rows[0].last_name);
            }else{
                $('#client-name').text(data.result.rows[0].first_name +" "+ data.result.rows[0].last_name);
            }
            var birthday = data.result.rows[0].date_of_birth;
            $('#client-birthday').text(birthday.slice(0, birthday.lastIndexOf("T")));    
            $('#client-age').text(data.result.rows[0].age.years);
            $('#client-phonenumber').text( data.result.rows[0].phone_number);
            $('#client-email').text(data.result.rows[0].email);
        });
    }

    var editClient = function (data) {
        $.ajax({
            url: "api/clients/" + data.id,
            method: "POST",
            data: data,
            success: function (data) {
                console.log(data);
                console.log(data.result.rows[0]);
                
                $('#client-name-container').replaceWith('<h1 id="client-name" class="col-sm-9">' + data.result.rows[0].first_name + ' ' + data.result.rows[0].last_name + '</h1>');
                $('#client-birthday').replaceWith('<td id="client-birthday">' + data.result.rows[0].date_of_birth.substr(0, data.result.rows[0].date_of_birth.indexOf('T')) + '</td>');
                $('#client-age').replaceWith('<td id="client-age">' + data.result.rows[0].intake_age + '</td>');
                $('#client-phonenumber').replaceWith('<td id="client-phonenumber">' + data.result.rows[0].phone_number + '</td>');
                $('#client-email').replaceWith('<td id="client-email">' + data.result.rows[0].email + '</td>');
                $('#last-meeting').replaceWith('<td id="last-meeting">' + clientLastMeeting + '</td>');
                $('#case-manager').replaceWith('<td id="case-manager">' + data.result.rows[0].case_manager + '</td>');
                $('#edit-client').show();
                $('#cancel-edit').hide();
                $('#submit-edit').hide();
            },
            error: function (data) {
                console.error(data);
            }
        }).done(function (data) {
            //displayClientProfile('id: ' + data.id);
        });
    }

    $('#clients').delegate("td", "click", function () {
        displayClientProfile($(this)[0].innerText);
    });

    var clientID;
    var clientName;
    var clientBirthday;
    var clientAge;
    var clientPhone;
    var clientMail;
    var clientLastMeeting;
    var clientCaseManager;

    $('#edit-client').click(function () {
        clientID = $('#client-id')['0'].textContent;
        clientName = $('#client-name')['0'].textContent;
        clientBirthday = $('#client-birthday')['0'].textContent;
        clientAge = $('#client-age')['0'].textContent;
        clientPhone = $('#client-phonenumber')['0'].textContent;
        clientMail = $('#client-email')['0'].textContent;
        clientLastMeeting = $('#last-meeting')['0'].textContent;
        clientCaseManager = $('#case-manager')['0'].textContent;

        $('#client-name').replaceWith('<div id="client-name-container" class="col-sm-8"><input type="text" id="client-name" class="form-control" value="' + clientName + '" /></div>');
        $('#edit-client').hide();
        $('#cancel-edit').show();
        $('#submit-edit').show();

        $('#client-birthday').replaceWith('<input type="text" id="client-birthday" class="form-control" value="' + clientBirthday + '" />');
        $('#client-age').replaceWith('<input type="number" id="client-age" class="form-control" min="1" step="1" value="' + clientAge + '" />');
        $('#client-phonenumber').replaceWith('<input type="text" id="client-phonenumber" class="form-control" value="' + clientPhone + '" />');
        $('#client-email').replaceWith('<input type="text" id="client-email" class="form-control" value="' + clientMail + '" />');
        $('#last-meeting').replaceWith('<input type="text" id="last-meeting" class="form-control" value="' + clientLastMeeting + '" />');
        $('#case-manager').replaceWith('<input type="text" id="case-manager" class="form-control" value="' + clientCaseManager + '" />');
    });

    $('#cancel-edit').click(function () {

        $('#client-name-container').replaceWith('<h1 id="client-name" class="col-sm-9">' + clientName + '</h1>');
        $('#edit-client').show();
        $('#cancel-edit').hide();
        $('#submit-edit').hide();

        $('#client-birthday').replaceWith('<td id="client-birthday">' + clientBirthday + '</td>');
        $('#client-age').replaceWith('<td id="client-age">' + clientAge + '</td>');
        $('#client-phonenumber').replaceWith('<td id="client-phonenumber">' + clientPhone + '</td>');
        $('#client-email').replaceWith('<td id="client-email">' + clientMail + '</td>');
        $('#last-meeting').replaceWith('<td id="last-meeting">' + clientLastMeeting + '</td>');
        $('#case-manager').replaceWith('<td id="case-manager">' + clientCaseManager + '</td>');
    });

    $('#submit-edit').click(function () {

        var id = clientID;
        var name = $('#client-name')['0'].value;
        var firstName = name.substr(0,name.indexOf(' '));
        //var nickname = name.match(/'([^']+)'/)[1];
        var lastName = name.substr(name.lastIndexOf(' ') + 1);
        var birthday = $('#client-birthday')['0'].value;
        var age = $('#client-age')['0'].value;
        var phoneNumber = $('#client-phonenumber')['0'].value;
        var email = $('#client-email')['0'].value;
        var lastMeeting = $('#last-meeting')['0'].value;
        var caseManager = $('#case-manager')['0'].value;

        var data = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            //nickname: nickname,
            birthday: birthday,
            age: age,
            phoneNumber: phoneNumber,
            email: email,
            lastMeeting: lastMeeting,
            caseManager: caseManager
        };

        console.log(data);

        editClient(data);
        
    });


});
