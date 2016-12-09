$(function () {
    
    var setupSetStatusModal = function () {
        var statuses = JSON.parse(window.sessionStorage.statuses);

        // TODO 
        // give users ability to customize notifications when setting a status
        // basically creating the notification after deciding they want to set one
        // option for who will receive the notification

        // default will be to set the notification for the current user
        // but will also have option to set for other users or everyone

        // that said, there should be a panel listing the alerts
        // that are already associated with that particular status

        statuses.forEach(function (status, index) {
            $('#status-select').append('<option ' + window.dataString(status) + ' value="' + index + '">' + 
                                        status.type + '</option>');
        });

        $('#status-select').change(function (event) {
            // ajax call here maybe?
        });

        $('#setstatus-submit-button').click(function (event) {

            // hardcoding this for now
            var data = {
                type: 4,
                comment: 'Test notification for set statuses modal',
                link: '/index',
                checked: 'FALSE'
            };

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/users/1/notifications", // hardcoding current user for now
                method: "POST",
                data: data,
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr) {
                    console.error(xhr);

                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {
                $('#setstatus-modal').modal('toggle');
            });
        });
    };

    var globalData = []
    globalData.push(window.sessionStorage.statuses);

    if (globalData.every((array) => array)) {
        console.log("call arrived");
        setupSetStatusModal();
    } else {
        console.log("waiting for call");
        window.sessionStorageListeners.push({
            ready: setupSetStatusModal
        });
    }

});