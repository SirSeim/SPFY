$(function (event) {

	var arrayBufferToBase64 = function (buffer) {
		var base64 = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;

		for (var i = 0; i < len; i++) {
    		base64 += String.fromCharCode( bytes[ i ] );
		}

		return base64;
	}

	$('#file').change(function () {
		var reader = new FileReader();

		reader.onload = function() {

			var base64 = arrayBufferToBase64(this.result);
    		console.log(base64);
    		console.log('DONE');
		}

		reader.readAsArrayBuffer(this.files[0]);
	});

});