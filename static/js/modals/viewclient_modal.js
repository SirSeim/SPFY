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
                    alert("clicked");
                    $('#editstatus-modal').find('.modal-title').text('Edit ' + $(this).parents('button').data("type") + ' Status');
                    $('#editstatus-modal').modal('toggle');
                    event.stopPropagation();
                });
                $('#editstatus-modal .close').click(function (event) {
                    // need to manually set this to override modal's close event
                    // that way it only closes this modal and not other modals
                    $('#editstatus-modal').modal('hide');
                    event.stopPropagation();
                });
                $('#editstatus-modal .btn.cancel').click(function (event) {
                    // need to manually set this to override modal's close event
                    // that way it only closes this modal and not other modals
                    $('#editstatus-modal').modal('hide');
                    event.stopPropagation();
                });
                // $(document).on('show.bs.modal', '#editstatus-modal', function () {
                //     alert("here")
                //     var zIndex = Math.max.apply(null, Array.prototype.map.call(document.querySelectorAll('*'), function(el) {
                //       return + el.style.zIndex;
                //     })) + 10;
                //     $(this).css('z-index', zIndex);
                //     setTimeout(function() {
                //         $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
                //     }, 0);
                // });

            });

            // ** enrollment

            $('#checkin-checkbox').prop('checked', true);
            
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
            var jThis = $(this);
            jThis.prop('disabled', true);

            if (jThis.is(':checked')) {
                // alert("checked");
                // var data = [{
                //     dropinID: 2, // hard-coded
                //     clientID: $('#client-modal-data').data("id"),
                //     date: moment().format("YYYY-MM-DD")
                // }];
                var dropinID = window.sessionStorage.frontdeskDropinId;

                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                    },
                    url: "api/dropins/" + dropinID + "/checkin",
                    method: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        clients: [
                            $('#client-modal-data').data("id")
                        ]
                    }),
                    success: function (data) {
                        console.log(data);
                        jThis.prop('disabled', false);
                    },
                    error: function (xhr) {
                        console.error(xhr);
                        jThis.prop('disabled', false).prop('checked', false);

                        if (xhr.status === 401) {
                            localStorage.removeItem("authorization");
                        }
                    }
                });
            } else {
                // alert("unchecked");
                // var data = [{
                //     dropinID: 2, // hard-coded
                //     clientID: $('#client-modal-data').data("id")
                // }];
                var dropinID = window.sessionStorage.frontdeskDropinId;

                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                    },
                    url: "api/dropins/" + dropinID + "/checkin",
                    method: "DELETE",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        clients: [
                            $('#client-modal-data').data("id")
                        ]
                    }),
                    success: function (data) {
                        console.log(data);
                        jThis.prop('disabled', false);
                    },
                    error: function (xhr) {
                        console.error(xhr);
                        jThis.prop('disabled', false).prop('checked', true);

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