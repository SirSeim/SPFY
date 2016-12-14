 $(function (event) {

    var caseManagerDropdown = $('#case-manager-dropdown');

    var createCasePlan = function (data) {
        console.log('createCasePlan called');
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/clients/1/case_plan',
            method: 'POST',
            data: data,
            success: function (data) {
                console.log(data);
                alert('SUCCESS! Case plan has been successfully added');
            },
            error: function (xhr) {
                console.log(xhr);
                alert('ERROR! Could not create case note');

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    };

    var getCasePlan = function () {
        
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/clients/1/case_plan',
            method: 'GET',
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

    getCasePlan();
    getAllCaseManagers();

    $('#dropdownMenuButton').click(function () {
        console.log("dropdown button clicked");
        console.log(this.data);
    });

    $('#submitplan').click(function () {
        console.log('clicked');
        var caseManagerID = $('#case-manager-dropdown').val();
        var date = $('#date')['0'].value;
        var note = $('#note')['0'].value;

        var data = {
            caseManagerID: caseManagerID,
            date: date,
            note: note
        };

        createCasePlan(data);
    });

});
