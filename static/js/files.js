$(function (event) {

	var getBase64 = function (file, callback) {
		var reader = new FileReader();
		reader.onload = callback;
		reader.readAsDataURL(file);
	};

	var uploadFile = function (data) {
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
                alert('SUCCESS! File has been successfully added');
            },
            error: function (xhr) {
                console.log(xhr);
                alert('ERROR! Could not upload file');

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
	};

	$('#file').change(function () {
		var file = this.files[0];
		var base64;

		if (file) {
			getBase64(file, function (e) {
				var preview = document.querySelector('img[id=preview]');
				preview.src = e.target.result;
				base64 = e.target.result;
				$('#base64').text(base64);
			});
		}
	});

	$('#submit').click(function () {
		var fileString = $('#base64').text();
		uploadFile(fileString);
	});

});
