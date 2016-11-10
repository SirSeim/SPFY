$(function (event) {

	var getBase64 = function (file) {
		var reader = new FileReader();
		var base64;
		reader.onload = function () {
			console.log(reader.result);
			var preview = document.querySelector('img[id=preview]');
			preview.src = reader.result;
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
		reader.readAsDataURL(file);
	}

	$('#file').change(function () {
		var reader = new FileReader();
		var file = this.files[0];
		var base64;
		if (file) {
			getBase64(file);
		}
	});

});