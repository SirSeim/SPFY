$(function () {

    $('#dropdownMenuButton').click(function () {
        console.log("dropdown button clicked");
        console.log(this.data);
    });

    $(document).click(function () {
    if ($('input[name=followup-checkbox]:checked').length !== 0) {
        $('#followup-area')
            .empty()
            .append('<label for="example-text-input"'
                + 'class="col-xs-2 col-form-label">Due Date</label>'
                + '<div class="col-xs-">'
                + '<input type="text" placeholder="mm/dd/yy" id="example-text-input">'
                + '</div>')
            .append('<label for="example-text-input"'
                + 'class="col-xs-2 col-form-label">Set Reminder Date</label>'
                + '<div class="col-xs-">'
                + '<input type="text" placeholder="mm/dd/yy" id="example-text-input">'
                + '</div>');
    } else if ($('input[name=followup-checkbox]:checked').length === 0) {
        $('#followup-area').empty();
    }
    });
});