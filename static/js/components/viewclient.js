
$(function (event) {

    var clientID;
    var clientName;
    var clientBirthday;
    var clientAge;
    var clientPhone;
    var clientMail;
    var clientLastMeeting;
    var clientCaseManager;
    var caseNotesTable = $('#casenotes tbody');

    var getCaseNotes = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/case_notes/" + data,
            method: "GET",
            data: data.clientID,
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
            caseNotesTable.empty();
            data.result.forEach(function (note) {
                caseNotesTable.append('<tr>' +
                    '<td>' + note.date.slice(0, note.date.lastIndexOf('T')) + '</td>' +
                    '<td>' + note.category + '</td>' + 
                    '<td>' + note.caseManager + '</td>' + 
                    '<td>' + note.note +  '</td>' + 
                    '<td><button type="button" class="edit-note btn btn-default btn-sm">Edit</button></td>' + 
                    '</tr>');
            });
        });
    }

    var statusNames = {
        '1':'Okay',
        '2':'Missing',
        '3':'Sick',
        '4':'Vulnerable',
        '5':'Dangerous'
    } // in future, will be able to pull from list of statuses stored in a "Settings" page

    $('#casenotes').DataTable();
    
    var displayClientProfile = function (client) {

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/clients/" + $(client).data("id"), // will find another way to get client id
            method: "GET",
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
            var string = $('#view-client-tabs').attr('class');

            $('#client-id').text(data.result.rows[0].id);
            $('#view-client-tabs').attr('class', "col-sm-8");
            if (data.result.rows[0].nick_name != undefined){
                $('#client-name').text(data.result.rows[0].nick_name + " (" + data.result.rows[0].first_name + ") " + data.result.rows[0].last_name);
            }else{
                $('#client-name').text(data.result.rows[0].first_name + " " + data.result.rows[0].last_name);
            }
            var birthday = data.result.rows[0].date_of_birth;
            $('#client-birthday').text(birthday.slice(0, birthday.lastIndexOf("T")));
            $('#client-age').text(data.result.rows[0].age.years);
            $('#client-phonenumber').text( data.result.rows[0].phone_number);
            $('#client-email').text(data.result.rows[0].email);

            // getCaseNotes(client.match(/[0-9]+/)['0']);

            console.log(data.result.rows[0].status);
            console.log(statusNames[data.result.rows[0].status]);
            $('#client-status').text(statusNames[data.result.rows[0].status]);

            $('#casenotes-title').text(data.result.rows[0].first_name + " " + data.result.rows[0].last_name + '\'s Case Notes');
        });

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/files/profile_picture/' + $(client).data("id"),
            method: 'GET',
            data: $(client).data("id"),
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.log(xhr);
                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {
            var result = data.result;
            if (result.rowCount > 0) {
                var url = result.rows['0'].base_64_string;
                var photo = document.querySelector('img[id=client-photo]');
                photo.src = url;
            } else {
                var photo = document.querySelector('img[id=client-photo]');
                photo.src = 'http://hhp.ufl.edu/wp-content/uploads/place-holder.jpg';
            }
        });

    }

    var editClient = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/clients/" + data.id,
            method: "POST",
            data: data,
            success: function (data) {
                console.log(data);
                
                $('#client-name-container').replaceWith('<h1 id="client-name" class="col-sm-9">' + data.result.rows[0].first_name + ' ' + data.result.rows[0].last_name + '</h1>');
                $('#client-birthday').replaceWith('<td id="client-birthday">' + data.result.rows[0].date_of_birth.substr(0, data.result.rows[0].date_of_birth.indexOf('T')) + '</td>');
                $('#client-age').replaceWith('<td id="client-age">' + data.result.rows[0].intake_age + '</td>');
                $('#client-phonenumber').replaceWith('<td id="client-phonenumber">' + data.result.rows[0].phone_number + '</td>');
                $('#client-email').replaceWith('<td id="client-email">' + data.result.rows[0].email + '</td>');
                $('#last-meeting').replaceWith('<td id="last-meeting">' + clientLastMeeting + '</td>');
                $('#case-manager').replaceWith('<td id="case-manager">' + data.result.rows[0].case_manager + '</td>');
                $('#client-status').replaceWith('<td id="client-status">' + statusNames[data.result.rows[0].status] + '</td>');
                $('#edit-client').show();
                $('#cancel-edit').hide();
                $('#submit-edit').hide();
            },
            error: function (xhr) {
                console.error(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    var addFile = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/files',
            method: 'POST',
            data: data,
            success: function (data) {
                console.log(data);
                alert('SUCCESS: File has been uploaded');
                $('#add-file-modal').modal('hide');
            },
            error: function (xhr) {
                console.log(xhr);
                alert('ERROR: File failed to upload');
                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    $('#clients').delegate("td", "click", function (event) {
        $('#cm-page-filler').hide();
        displayClientProfile($(this));
    });


    var clientID;
    var clientName;
    var clientBirthday;
    var clientAge;
    var clientPhone;
    var clientMail;
    var clientLastMeeting;
    var clientCaseManager;
    var clientStatus;

    $('#edit-client').click(function () {
        clientID = $('#client-id')['0'].textContent;
        clientName = $('#client-name')['0'].textContent;
        clientBirthday = $('#client-birthday')['0'].textContent;
        clientAge = $('#client-age')['0'].textContent;
        clientPhone = $('#client-phonenumber')['0'].textContent;
        clientMail = $('#client-email')['0'].textContent;
        clientLastMeeting = $('#last-meeting')['0'].textContent;
        clientCaseManager = $('#case-manager')['0'].textContent;
        clientStatus = $('#client-status')['0'].textContent;
        console.log("client status pulled");
        console.log(clientStatus);
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
        $('#client-status').replaceWith(
            '<div class="dropdown"><button id="client-status" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                clientStatus + '<span class="caret"></span></button>' +
                '<ul class="dropdown-menu" aria-labelledby="client-status">' +
                '<li><a href="#">' + statusNames[1] + '</a></li>' +
                '<li><a href="#">' + statusNames[2] + '</a></li>' +
                '<li><a href="#">' + statusNames[3] + '</a></li>' +
                '<li><a href="#">' + statusNames[4] + '</a></li>' +
                '<li><a href="#">' + statusNames[5] + '</a></li>' + 
                '<li role="separator" class="divider"></li>' +
                '<li><a href="#">Separated link</a></li></ul></div>');

        $('.dropdown-menu li a').click(function (event) {
            $(this).parents('.dropdown').find('.btn').html($(this).text() + ' <span class="caret"></span>');
            $(this).parents('.dropdown').dropdown('toggle');
        });
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
        $('#client-status').replaceWith('<td id="client-status">' + clientStatus + '</td>');
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
        var status = $('#client-status')['0'].innerText;

        console.log($('#client-status'));
        console.log(status.trim());
        // temporary implementation, use name of a status
        // to find its corresponding key, use the key to submit new status to
        // client profile in db
        var key = function (statusNames) {
            return Object.keys(statusNames).filter(function (key) {
                return statusNames[key].trim() === status.trim() ? key : '';
            })[0];
        };
        
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
            caseManager: caseManager,
            status: key(statusNames) // currently, statuses are stored in db with their own id's
        };

        editClient(data);
        
    });

    var getBase64 = function (file, callback) {
        var reader = new FileReader();
        reader.onload = callback;
        reader.readAsDataURL(file);
    };

    $('#file').change(function () {
        var file = this.files[0];
        var base64;

        if (file) {
            getBase64(file, function (e) {
                base64 = e.target.result;
                $('#base64').text(base64);
            });
        }
    });

    $('#submit-file').click(function () {
        var clientID = $('#client-id')['0'].textContent
        var name = $('#file').val();
        var type = $('#file-type').val();
        var fileString = $('#base64').text();

        var data = {
            clientID: clientID,
            name: name,
            type: type,
            fileString: fileString
        }

        addFile(data);
    });
    
    var popOnHover = function (id) {
        id = '#' + id;
        $(id).hover( function () {
            $(id).popover('toggle');
        });
    };
    var popOnClick = function (id) {
        id = '#' + id;
        $(id).click( function () {
            $(id).popover('toggle');
        });
    };

    popOnClick('follow-up');
    popOnClick('housing');
    popOnClick('shower');
    popOnClick('legal');

    // $('#shower').hover( function () {
    //     $('#shower').popover('toggle');
    // });




});
