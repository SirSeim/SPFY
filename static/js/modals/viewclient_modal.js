$(function () {

    var setupViewClientModal = function () {
        console.log($('#dropin-date').data('id'));
        console.log($('#client-modal-data').data());
        var clients = JSON.parse(window.sessionStorage.clients);

        var populateModal = function () {
            // will work to reduce ajax calls

            // ** statuses
            console.log($('#viewclient-modal').css("z-index"));
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/statuses/1',
                method: 'GET',
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
                $('#client-badges').empty();
                data.result.rows.forEach(function (status) {
                    $('#client-badges').append(
                        '<button ' + window.dataString(status) + '" class="badge-button btn btn-primary btn-xs" type="button" data-toggle="popover" title="' +  status.type + '"' +
                         'data-content="' + status.note + '">' + status.type + '<span class="badge">' + status.message + '</span>' +
                         '<a class="status-edit" href="#">edit</a></button>'); // title and data-content attributes are for hover popover
                });
                $('.badge-button').popover({ container: 'body' });
                $('.badge-button').click(function (event) {
                    $(this).popover('toggle');
                    event.stopPropagation();
                });
                $('#client-badges a.status-edit').click(function (event) {
                    // $('#editstatus-modal').css("z-index", $('#viewclient-modal').css("z-index") * 30);
                    // console.log($('#editstatus-modal').css("z-index"));
                    $('#editstatus-modal').find('.modal-title').text('Edit ' + $(this).parents('button').data("type") + ' Status');
                    $('#editstatus-modal').modal('toggle');
                });
            });

            // ** enrollment

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/dropins?latest=1",
                method: "GET",
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr) {
                    console.error(xhr);

                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (latest) {
                console.log(latest.result[0]);
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                    },
                    url: "api/dropins/" + latest.result[0].id + "/activities",
                    method: "GET",
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr) {
                        console.error(xhr);

                        if (xhr.status === 401) {
                            localStorage.removeItem("authorization");
                        }
                    }
                }).done(function (activityData) {
                    $.ajax({
                        xhrFields: {
                            withCredentials: true
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                        },
                        url: "api/dropins/" + latest.result[0].id + "/enrollment",
                        method: "GET",
                        success: function (data) {
                            console.log(data);
                        },
                        error: function (xhr) {
                            console.error(xhr);

                            if (xhr.status === 401) {
                                localStorage.removeItem("authorization");
                            }
                        }
                    }).done(function (enrollmentData) {
                        var enrollment = enrollmentData.result.rows;
                        var activities = activityData.result;
                        console.log(activities);
                        $('#participation-modal tbody').empty();
                        enrollment.forEach(function (enroll) {
                            console.log(enroll.client_id === $('#client-modal-data').data("id"));
                            if (enroll.client_id === $('#client-modal-data').data("id")) {
                                console.log(window.getDataById(activities, enroll.activity_id).name);
                                $('#participation-modal tbody').append('<tr><td>' + window.getDataById(activities, enroll.activity_id).name + '</td></tr>');
                            }
                        });
                    });
                });
            });
        }

        $('#viewclient-modal').on('shown.bs.modal', populateModal);

    }

    

    var globalData = []
    globalData.push(window.sessionStorage.statuses);
    globalData.push(window.sessionStorage.clients);

    if (globalData.every((array) => array)) {
        console.log("call arrived");
        setupViewClientModal();
    } else {
        console.log("waiting for call");
        window.sessionStorageListeners.push({
            ready: setupViewClientModal
        });
    }
})