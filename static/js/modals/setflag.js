$(function () {
    
    var setupSetFlagModal = function () {
        var statusTypes = JSON.parse(window.sessionStorage.statusTypes);

        // TODO 
        // give users ability to customize notifications when setting a flag
        // basically creating the notification after deciding they want to set one
        // option for who will receive the notification

        // default will be to set the notification for the current user
        // but will also have option to set for other users or everyone

        // that said, there should be a panel listing the alerts
        // that are already associated with that particular flag

        

        statusTypes.forEach(function (statustype, index) {
            console.log(statustype);
            $('#flag-select').append('<option ' + window.dataString(statustype) + ' value="' + index + '">' + 
                                        statustype.name + '</option>');
        });

        var firstOption = function () {
            var defaults = $('#flag-select option:selected').data("settings").defaults;
            $('[name="set-message"]').val(defaults.message);
            $('[name="set-note"]').val(defaults.note);
            if (defaults.dot) {
                $('#setflag-modal-dot').prop('checked', true);
            }
        };

        firstOption();

        $('#flag-select').change(function (event) {
            var defaults = $('#flag-select option:selected').data("settings").defaults; // .data() auto-converts stringified JSON to an object
            $('[name="set-message"]').val(defaults.message);
            $('[name="set-note"]').val(defaults.note);
            if (defaults.dot) {
                $('#setflag-modal-dot').prop('checked', true);
            } else {
                $('#setflag-modal-dot').prop('checked', false);
            }
        });

        $('#setflag-submit-button').click(function (event) {
            var statustype = $('#flag-select option:selected');
            var settings = {};

            if ($('#setflag-modal-dot').is(':checked')) {
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
                $('#setflag-modal').modal('toggle');
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
        setupSetFlagModal();
    } else {
        console.log("waiting for call");
        window.sessionStorageListeners.push({
            ready: setupSetFlagModal
        });
    }

});