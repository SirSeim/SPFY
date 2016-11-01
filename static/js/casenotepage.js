$(function () {

    var clientDropdown = $('#client-id');
    var caseManagerDropdown = $('#case-manager-id');

    var createCaseNote = function (data) {
        $.ajax({
            url: 'api/case_notes',
            method: 'POST',
            data: data,
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        }).done(function (data) {

        });
    };

    var getClients = function () {
        $.ajax({
            url: 'api/clients',
            method: 'GET',
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        }).done(function (data) {
            data.result.forEach(function (client) {
                clientDropdown.append('<option value="' + client.id +
                    '">' + client.firstName + ' ' + client.lastName +
                    '</option>');
            });
        });
    };

    var getAllCaseManagers = function () {
        $.ajax({
            url: 'api/casemanagers',
            method: 'GET',
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        }).done(function (data) {
            data.result.rows.forEach(function (caseManager) {
                caseManagerDropdown.append('<option value="' + caseManager.id +
                    '">' + caseManager.first_name + ' ' + caseManager.last_name +
                    '</option>');
            });
        });
    };

    getClients();
    getAllCaseManagers();

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

    $('#submit').click(function () {
        var clientID = $('#client-id').val();
        var caseManagerID = $('#case-manager-id').val();
        var date = $('#date')['0'].value;
        var category = $('#category')['0'].value;
        var note = $('#note')['0'].value;
        var followUpNeeded = $('input[name=followup-checkbox]:checked').length === 0 ? false : true;
        var dueDate;
        var reminderDate;
        dueDate = $('#due-date')['0'] === undefined ? null : $('#due-date')['0'].value;
        reminderDate = $('#due-date')['0'] === undefined ? null : $('#reminder-date')['0'].value;

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