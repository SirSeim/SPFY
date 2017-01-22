$(function (event) {
	
	var table = $('#followups');
	var tableBody = $('#followups > tbody');

    console.log('TEST');

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
                tableBody.empty();

                var followups = data.result.rows;

                followups.forEach(function (followup) {
                	tableBody.append('<tr>' +
      									'<td>' + followup.id + '</td>' +
							            '<td>' + followup.timestamp + '</td>' +
								        '<td>' + followup.note + '</td>' +
								        '<td>' + followup.client_id + '</td>' +
								        '<td>' + followup.location + '</td>' +
								     '</tr>')
                });

                table = table.DataTable();

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
            url: 'api/followups/',
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

    getCaseManagerFollowUps(localStorage.getItem("userID"));

});