$(function () {
    $('#custom-color').spectrum({
        color: '#127000',
        change: function(color) {
            console.log("change called: " + color.toHexString());
        }
    });
});