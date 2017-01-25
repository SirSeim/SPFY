$(function (event) {
	
	var table = $('#followups');
    var clientLookup = {};

	var getCaseManagerFollowUps = function (casemanagerID) {
		$.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/followups/' + casemanagerID,
            method: 'GET',
            success: function (data) {
                console.log(data);

                var followups = data.result.rows;


                if (!$.fn.DataTable.isDataTable('#followups')) {
                    table = $('#followups').DataTable({
                        columns: [
                            { data: "id", title: "id" },
                            { data: "timestamp", title: "timestamp" },
                            { data: "note", title: "note" },
                            { data: "client", title: "client" },
                            { data: "location", title: "location" },
                        ]
                    });
                }

                table.rows().remove().draw();

                followups.forEach(function (followup) {
                    var client = clientLookup[followup.client_id];
                    var row = table.row.add({
                        id: followup.id,
                        timestamp: followup.timestamp,
                        note: followup.note,
                        client: client,
                        location: followup.location
                    }).draw();

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

    var createFollowUp = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/followups',
            method: 'POST',
            data: data,
            success: function (data) {
                console.log(data);
                getCaseManagerFollowUps(localStorage.getItem("userID"));
                $('#add-followup-modal').modal('hide');
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

    var editFollowUp = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/followups/' + data.id,
            method: 'POST',
            data: data,
            success: function (data) {
                console.log(data);
                getCaseManagerFollowUps(localStorage.getItem("userID"));
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

    var deleteFollowUp = function (id) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/followups/' + id,
            method: 'POST',
            success: function (data) {
                console.log(data);
                getCaseManagerFollowUps(localStorage.getItem("userID"));
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

    var getClients = function () {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/clients',
            method: 'GET',
            success: function (data) {
                console.log(data);
                var clients = data.result;
                clientDropdown(clients);
                getCaseManagerFollowUps(localStorage.getItem("userID"));
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

    var clientDropdown = function (clients) {
        var clientDropdown = $('#add-followup-client');
        clientDropdown.empty();
        clients.forEach(function (client) {
            clientLookup[client.id] = client.firstName + ' ' + client.lastName;
            clientDropdown.append('<option value="' + client.id + '">' + client.firstName + ' ' + client.lastName + '</option>');
        });
    };

    var gatherInput = function () {
        var casemanagerID = localStorage.getItem('userID');
        var timestamp = $('#add-followup-date').val();
        var clientID = $('#add-followup-client').val();
        var location = $('#add-followup-location').val();
        var note = $('#add-followup-note').val();
        var data = {
            casemanagerID: casemanagerID,
            timestamp: timestamp,
            clientID: clientID,
            location: location,
            note: note
        };

        return data;
    };

    $('#add-followup-submit').click(function() {
        var data = gatherInput();
        createFollowUp(data);
    });

    getClients();

});