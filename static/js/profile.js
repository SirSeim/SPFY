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
                            {
                                className: "delete",
                                orderable: false,
                                data: null,
                                defaultContent: '<a href="#" class="delete-link">Delete</a>'
                            }
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
                        location: followup.location,
                        clientID: followup.client_id
                    }).draw();

                    $(row.node()).data({
                        id: followup.id,
                        timestamp: followup.timestamp,
                        note: followup.note,
                        client: client,
                        location: followup.location,
                        clientID: followup.client_id
                    });

                    $(row.node()).data('toggle', 'modal')
                        .data('target', '#edit-followup-modal')
                        .dblclick(function (event) {
                            $('#edit-followup-modal').modal('toggle');
                            populateInput(followup);
                    });

                });

                var id;

                $('.delete-link').click(function (event) {

                    var tr = $(this).closest('tr');
                    id = $(table.row(tr).node()).children()[0].textContent;
                    var warning = $('#warning')[0];
                    var warningMessage = warning.textContent;
                    warning.textContent = warningMessage.substr(0, warningMessage.indexOf('#') + 1);
                    warning.textContent += id;
                    $('#delete-followup-modal').modal('toggle');
                    
                });

                $('#delete-followup-submit').click(function() {
                    deleteFollowUp(id);
                    $('#delete-followup-modal').modal('hide');
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
                $('#edit-followup-modal').modal('hide');
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
            url: 'api/followups/delete/' + id,
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

    var populateInput = function (followup) {
        $('#followup-id').val(followup.id);
        $('#edit-followup-date').val(moment().format("YYYY-MM-DDTHH:mm:ss"));
        $('#edit-followup-client').val(followup.client_id);
        $('#edit-followup-location').val(followup.location);
        $('#edit-followup-note').val(followup.note);
    };

    var clientDropdown = function (clients) {
        var addFollowupClientDropdown = $('#add-followup-client');
        var editFollowupClientDropdown = $('#edit-followup-client');
        addFollowupClientDropdown.empty();
        editFollowupClientDropdown.empty();
        clients.forEach(function (client) {
            clientLookup[client.id] = client.firstName + ' ' + client.lastName;
            addFollowupClientDropdown.append('<option value="' + client.id + '">' + client.firstName + ' ' + client.lastName + '</option>');
            editFollowupClientDropdown.append('<option value="' + client.id + '">' + client.firstName + ' ' + client.lastName + '</option>');
        });
    };

    var gatherInput = function (action) {
        var casemanagerID = localStorage.getItem('userID');
        var timestamp = $('#' + action + '-followup-date').val();
        var clientID = $('#' + action + '-followup-client').val();
        var location = $('#' + action + '-followup-location').val();
        var note = $('#' + action + '-followup-note').val();
        var data = {
            casemanagerID: casemanagerID,
            timestamp: timestamp,
            clientID: clientID,
            location: location,
            note: note
        };

        if (action === 'edit') {
            data.id = $('#followup-id').val();
        }

        return data;
    };

    $('#add-followup-submit').click(function() {
        var data = gatherInput('add');
        createFollowUp(data);
    });

    $('#edit-followup-submit').click(function() {
        var data = gatherInput('edit');
        editFollowUp(data);
    });

    getClients();

});