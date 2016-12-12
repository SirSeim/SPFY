var deleteFile = function (glyphicon) {
	var row = $(glyphicon).parent();
	var fileID = row.children()[0];
	fileID = $(fileID).text();
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: 'api/files/delete/' + fileID,
        method: 'POST',
        data: fileID,
        success: function (data) {
            alert("SUCCESS: File has been successfully delete!");
            row.remove();
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