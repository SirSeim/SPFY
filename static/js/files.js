$(function (event) {

	var arrayBufferToBase64 = function (buffer, reader) {
		var base64 = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;

		for (var i = 0; i < len; i++) {
    		base64 += String.fromCharCode( bytes[ i ] );
		}

		return base64;
	}

	//TODO: Get this working
	// var base64ToFile = function (base64) {
	// 	var img_b64 = canvas.toDataURL(base64);
	// 	var png = img_b64.split(',')[1];

	// 	var the_file = new Blob([window.atob(png)],  {type: 'image/png', encoding: 'utf-8'});

	// 	var fr = new FileReader();
	// 	fr.onload = function ( oFREvent ) {
	// 	    var v = oFREvent.target.result.split(',')[1]; // encoding is messed up here, so we fix it
	// 	    v = atob(v);
	// 	    var good_b64 = btoa(decodeURIComponent(escape(v)));
	// 	    document.getElementById("uploadPreview").src = "data:image/png;base64," + good_b64;
	// 	};
	// 	fr.readAsDataURL(the_file);
	// }

	$('#file').change(function () {
		var reader = new FileReader();
		var file = this.files[0];
		var base64;

		reader.onload = function() {

			var preview = document.querySelector('img[id=preview]');
			preview.src = reader.result;

			var base64 = arrayBufferToBase64(reader.result);
    		console.log(base64);
    		console.log('DONE');
		}

		if (file) {
			reader.readAsArrayBuffer(file);
		}
		//reader.readAsDataURL(file);
	});

});
