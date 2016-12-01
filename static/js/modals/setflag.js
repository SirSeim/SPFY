$(function () {
    
    var setupSetFlagModal = function () {
        var flags = JSON.parse(window.sessionStorage.flags);

        // TODO 
        // give users ability to customize notifications when setting a flag
        // basically creating the notification after deciding they want to set one
        // option for who will receive the notification

        // default will be to set the notification for the current user
        // but will also have option to set for other users or everyone

        // that said, there should be a panel listing the alerts
        // that are already associated with that particular flag

        flags.forEach(function (flag, index) {
            $('#flag-select').append('<option ' + window.dataString + ' value="' + index + '">' + 
                                        flag.type + '</option>');
        });

        $('#flag-select').change(function (event) {
            alert("changed!");
        });

        $('#setflag-submit-button').click(function (event) {

            // hardcoding notification for now
            // see db.sql for notification id = 4
            var data = {
                notificationId: 4
                // in future will have multiple user id's here
                // if current user sets notification for others
            };

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/notifications/1/set", // hardcoding current user for now
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
                $('#setflag-modal').modal('toggle');
            });
        });
    };

    var globalData = []
    globalData.push(window.sessionStorage.flags);

    if (globalData.every((array) => array)) {
        console.log("call arrived");
        setupSetFlagModal();
    } else {
        console.log("waiting for call");
        window.sessionStorageListeners.push({
            ready: setupSetFlagModal
        });
    }

});