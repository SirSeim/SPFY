$(function () {
    
    var setupSetStatusModal = function () {
        var statusTypes = JSON.parse(window.sessionStorage.statusTypes);

        // TODO 
        // give users ability to customize notifications when setting a status
        // basically creating the notification after deciding they want to set one
        // option for who will receive the notification

        // default will be to set the notification for the current user
        // but will also have option to set for other users or everyone

        // that said, there should be a panel listing the alerts
        // that are already associated with that particular status

        

        statusTypes.forEach(function (statustype, index) {
            console.log(statustype);
            $('#status-select').append('<option ' + window.dataString(statustype) + ' value="' + index + '">' + 
                                        statustype.name + '</option>');
        });

        var firstOption = function () {
            var defaults = $('#status-select option:selected').data("settings").defaults;
            $('[name="set-message"]').val(defaults.message);
            $('[name="set-note"]').val(defaults.note);
            if (defaults.dot) {
                $('#setstatus-modal-dot').prop('checked', true);
            }
        };

        firstOption();

        $('#status-select').change(function (event) {
            var defaults = $('#status-select option:selected').data("settings").defaults; // .data() auto-converts stringified JSON to an object
            $('[name="set-message"]').val(defaults.message);
            $('[name="set-note"]').val(defaults.note);
            if (defaults.dot) {
                $('#setstatus-modal-dot').prop('checked', true);
            } else {
                $('#setstatus-modal-dot').prop('checked', false);
            }
        });

        $('#setstatus-submit-button').click(function (event) {
            var statustype = $('#status-select option:selected');
            var settings = {};

            if ($('#setstatus-modal-dot').is(':checked')) {
                settings.dot = true;
            } else {
                settings.dot = false;
            }

            var data = {
                typeID: statustype.data("id"),
                message: $('[name="set-message"]').val(),
                note: $('[name="set-note"]').val(),
                settings: JSON.stringify(settings)
            };

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/clients/" +  $('#client-id')['0'].textContent + "/statuses",
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

            // hardcoding this for now
            // var data = {
            //     type: 4,
            //     comment: 'Test notification for set statuses modal',
            //     link: '/index',
            //     checked: 'FALSE'
            // };

            // $.ajax({
            //     xhrFields: {
            //         withCredentials: true
            //     },
            //     beforeSend: function (xhr) {
            //         xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            //     },
            //     url: "api/users/1/notifications", // hardcoding current user for now
            //     method: "POST",
            //     data: data,
            //     success: function (data) {
            //         console.log(data);
            //     },
            //     error: function (xhr) {
            //         console.error(xhr);

            //         if (xhr.status === 401) {
            //             localStorage.removeItem("authorization");
            //         }
            //     }
            // }).done(function (data) {
            //     $('#setstatus-modal').modal('toggle');
            // });
        });
    };

    var globalData = []
    globalData.push(window.sessionStorage.statusTypes);

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