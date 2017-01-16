$(function () {

    var setupViewClientModal = function () {
        console.log($('#dropin-date').data('id'));
        var flagTypes = JSON.parse(window.sessionStorage.flagTypes);
        var flags = JSON.parse(window.sessionStorage.flags);
        var clients = JSON.parse(window.sessionStorage.clients);

        var populateModal = function () {
            // will work to reduce ajax calls
            console.log($('#client-modal-data').data());

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/files/profile_picture/' + $('#client-modal-data').data("id"),
                method: 'GET',
                data: $('#client-modal-data').data("id"),
                success: function (data) {
                    console.log(data);
                    var result = data.result;
                    if (result.rowCount > 0) {
                        var url = result.rows['0'].base_64_string;
                        var photo = document.querySelector('img[id=client-modal-photo]');
                        photo.src = url;
                    } else {
                        var photo = document.querySelector('img[id=client-modal-photo]');
                        photo.src = 'http://hhp.ufl.edu/wp-content/uploads/place-holder.jpg';
                    }
                },
                error: function (xhr) {
                    console.log(xhr);
                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            });

            // ** statuses
            // console.log($('#viewclient-modal').css("z-index"));
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/clients/' + $('#client-modal-data').data("id") + '/flags',
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

                data.result.rows.forEach(function (flag) {
                    var flagtype = window.getDataById(flagTypes, flag.type);
                    $('#client-badges').append(
                        '<button ' + window.dataString(flag) + ' class="badge-button btn btn-primary btn-xs" type="button" data-toggle="popover" title="' +  flagtype.name + '"' +
                         'data-content="' + flag.note + '">' + flagtype.name + '<span class="badge">' + flag.message + '</span>' +
                         '<a class="flag-edit" href="#">edit</a></button>'); // title and data-content attributes are for hover popover
                    $('#client-badges button:last').css('background-color', flagtype.color);
                });

                // frontdesk modals will be without popover for now
                // $('.badge-button').mousedown(function (event) {
                //                       $(this).popover('toggle');
                //                       event.stopPropagation();
                //                   });
                $('#client-badges a.flag-edit').click(function (event) {
                    // $('#editstatus-modal').css("z-index", $('#viewclient-modal').css("z-index") * 30);
                    // console.log($('#editstatus-modal').css("z-index"));
                    console.log($(this).parents('button.badge-button').prop("title"));
                    $('#editflag-modal').find('.modal-title').text('Edit ' + $(this).parent().prop('title') + ' Flag');
                    $('#editflag-modal-data').data($(this).parents('button').data());
                    var data = $('#editflag-modal-data').data();
                    $('#editflag-modal').modal('toggle');
                    $('#editflag-modal-dot').prop("checked", data.settings.dot);
                    $('[name="edit-message"]').val(data.message);
                    $('[name="edit-note"]').val(data.note);
                    event.stopPropagation();
                });

                $('#editflag-modal .close').click(function (event) {
                    // need to manually set this to override modal's close event
                    // that way it only closes this modal and not other modals
                    $('#editflag-modal').modal('hide');
                    event.stopPropagation();
                });

                $('#editflag-modal .btn.cancel').click(function (event) {
                    // need to manually set this to override modal's close event
                    // that way it only closes this modal and not other modals
                    $('#editflag-modal').modal('hide');
                    event.stopPropagation();
                });
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
                // $.ajax({
                //     xhrFields: {
                //         withCredentials: true
                //     },
                //     beforeSend: function (xhr) {
                //         xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                //     },
                //     url: "api/dropins/" + latest.result[0].id + "/activities",
                //     method: "GET",
                //     success: function (data) {
                //         console.log(data);
                //     },
                //     error: function (xhr) {
                //         console.error(xhr);

                //         if (xhr.status === 401) {
                //             localStorage.removeItem("authorization");
                //         }
                //     }
                // }).done(function (activityData) {
                //     $.ajax({
                //         xhrFields: {
                //             withCredentials: true
                //         },
                //         beforeSend: function (xhr) {
                //             xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                //         },
                //         url: "api/dropins/" + latest.result[0].id + "/enrollment",
                //         method: "GET",
                //         success: function (data) {
                //             console.log(data);
                //         },
                //         error: function (xhr) {
                //             console.error(xhr);

                //             if (xhr.status === 401) {
                //                 localStorage.removeItem("authorization");
                //             }
                //         }
                //     }).done(function (enrollmentData) {
                //         var enrollment = enrollmentData.result.rows;
                //         var activities = activityData.result;
                //         console.log(activities);
                //         $('#participation-modal tbody').empty();
                //         enrollment.forEach(function (enroll) {
                //             console.log(enroll.client_id === $('#client-modal-data').data("id"));
                //             if (enroll.client_id === $('#client-modal-data').data("id")) {
                //                 console.log(window.getDataById(activities, enroll.activity_id).name);
                //                 $('#participation-modal tbody').append('<tr><td>' + window.getDataById(activities, enroll.activity_id).name + '</td></tr>');
                //             }
                //         });
                //     });
                // });
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
    globalData.push(window.sessionStorage.flagTypes);
    globalData.push(window.sessionStorage.flags);
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