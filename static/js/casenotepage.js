$(function (event) {

    var clientDropdown = $('#client-dropdown');
    var caseManagerDropdown = $('#case-manager-dropdown');

    var createCaseNote = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/case_notes',
            method: 'POST',
            data: data,
            success: function (data) {
                console.log(data);
                alert('SUCCESS! Case note has been successfully added');
                $('#add-note-modal').modal('hide');
            },
            error: function (xhr) {
                console.log(xhr);
                alert('ERROR! Could not create case note');

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {
            if (window.viewClientRefresh) {
                window.viewClientRefresh.forEach(function (f) {
                    f();
                });
            }
        });
    };

    var getClientDropdown = function (clientID) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/clients/' + clientID,
            data: clientID,
            method: 'GET',
            success: function (data) {
                console.log(data);
                var clientDropdown = $('#client-dropdown');
                var client = data.result.rows[0];
                clientDropdown.empty();
                clientDropdown.append('<option value="' + client.id +
                        '">' + client.first_name + ' ' + client.last_name +
                        '</option>');
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    };

    var getAllCaseManagers = function () {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/casemanagers',
            method: 'GET',
            success: function (data) {
                console.log(data);
                var caseManagerDropdown = $('#case-note-case-manager-dropdown');
                caseManagerDropdown.empty();
                data.result.rows.forEach(function (caseManager) {
                    caseManagerDropdown.append('<option value="' + caseManager.id +
                        '">' + caseManager.first_name + ' ' + caseManager.last_name +
                        '</option>');
                 });
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    };

    $('#addcasenote').click(function () {
        var clientID = $('#case-note-client-id').text();
        getClientDropdown(clientID);
        getAllCaseManagers();
    });

    $("#addcasenote-date").val(moment().format("YYYY-MM-DDTHH:mm:ss"));

    $('#dropdownMenuButton').click(function () {
        console.log("dropdown button clicked");
        console.log(this.data);
    });

    $('#followup-checkbox').click(function () {
        if ($('input[name=followup-checkbox]:checked').length !== 0) {
            $('#followup-area')
                .empty()
                .append('<label for="due-date"'
                    + 'class="col-xs-2 col-form-label">Due Date</label>'
                    + '<div class="col-xs-">'
                    + '<input type="text" placeholder="mm/dd/yy" id="due-date">'
                    + '</div>')
                .append('<label for="reminder-date"'
                    + 'class="col-xs-2 col-form-label">Set Reminder Date</label>'
                    + '<div class="col-xs-">'
                    + '<input type="text" placeholder="mm/dd/yy" id="reminder-date">'
                    + '</div>');
        } else if ($('input[name=followup-checkbox]:checked').length === 0) {
            $('#followup-area').empty();
        }
    });

    $('#addcaseplan-date').val(moment().format("YYYY-MM-DD"));

    $('#submit').click(function () {
        var clientID = $('#client-dropdown').val();
        var caseManagerID = $('#case-manager-dropdown').val();
        var date = $('#addcasenote-date')['0'].value;
        var category = $('#category')['0'].value.toUpperCase();
        var note = $('#note')['0'].value;
        var followUpNeeded = $('input[name=followup-checkbox]:checked').length === 0 ? false : true;
        var dueDate;
        var reminderDate;
        dueDate = $('#due-date')['0'] === undefined ? null : $('#due-date')['0'].value;
        reminderDate = $('#reminder-date')['0'] === undefined ? null : $('#reminder-date')['0'].value;

        var data = {
            clientID: clientID,
            caseManagerID: caseManagerID,
            date: date,
            category: category,
            note: note,
            followUpNeeded: followUpNeeded,
            dueDate: dueDate,
            reminderDate
        };

        createCaseNote(data);
    });
});
