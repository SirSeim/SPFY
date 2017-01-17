$(function (event) {
	
	var table = $('#followups');
	var tableBody = $('#followups > tbody');

	var getCaseManagerFollowUps = function (casemanagerID) {
		$.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/followups/' + casemanagerID,
            data: casemanagerID,
            method: 'GET',
            success: function (data) {
                console.log(data);
                tableBody.empty();

                var followups = data.result.rows;

                table = table.DataTable();

                followups.forEach(function (followup) {
                	tableBody.append('<tr>
      									<td>' + followup.id + '</td>
							            <td>' + followup.timestamp + '</td>
								        <td>' + followup.note + '</td>
								        <td>' + followup.client_id + '</td>
								        <td>' + followup.location + '</td>
								     </tr>')
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

});