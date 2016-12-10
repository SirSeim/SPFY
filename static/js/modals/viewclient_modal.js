$(function () {

    var setupViewClientModal = function () {
        console.log($('#dropin-date').data('id'));
        console.log($('#client-modal-data').data());
        var clients = JSON.parse(window.sessionStorage.clients);

        var populateModal = function () {
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

        $('#checkin-checkbox').change(function (event) {
            if ($(this).is(':checked')) {
                alert("checked");
                var data = [{
                  dropinID: 2, // hard-coded
                  clientID: $('#client-modal-data').data("id"),
                  date: moment().format("YYYY-MM-DD")
                }];
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                    },
                    url: "api/checkin",
                    method: "POST",
                    data: { expression: JSON.stringify(data) }, // Hapi doesn't parse arrays by default, need to stringify it
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr) {
                        console.error(xhr);

                        if (xhr.status === 401) {
                            localStorage.removeItem("authorization");
                        }
                    }
                });
            } else {
               alert("unchecked");
               var data = [{
                  dropinID: 2, // hard-coded
                  clientID: $('#client-modal-data').data("id")
                }];
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                    },
                    url: "api/checkin",
                    method: "DELETE",
                    data: { expression: JSON.stringify(data) }, // Hapi doesn't parse arrays by default, need to stringify it
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr) {
                        console.error(xhr);

                        if (xhr.status === 401) {
                            localStorage.removeItem("authorization");
                        }
                    }
                });
            }
        });
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