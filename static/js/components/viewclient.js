$(function (event) {

    var setupClientProfile = function () {
        var clientID;
        var clientName;
        var clientBirthday;
        var clientAge;
        var clientPhone;
        var clientMail;
        var clientLastMeeting;
        var clientCaseManager;
        var flagTypes = JSON.parse(window.sessionStorage.flagTypes);
        var flags = JSON.parse(window.sessionStorage.flags);
        var client;
        var caseNoteID;

        $('#setflag-button').click(function (event) {
            $('#setflag-modal').modal('toggle');
        });

        var editClientDropdown = function (clientID) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/clients/' + clientID,
                data: clientID,
                method: 'GET',
                success: function (data) {
                    console.log(data);
                    var clientDropdown = $('#client-dropdown-edit');
                    var client = data.result.rows[0];
                    clientDropdown.empty();
                    clientDropdown.append('<option value="' + client.id +
                            '">' + client.first_name + ' ' + client.last_name +
                            '</option>');
                },
                error: function (xhr) {
                    console.log(xhr);

                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {

            });
        };

        var editAllCaseManagers = function () {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/casemanagers',
                method: 'GET',
                success: function (data) {
                    console.log(data);
                    var caseManagerDropdown = $('#edit-case-note-case-manager-dropdown');
                    caseManagerDropdown.empty();
                    data.result.rows.forEach(function (caseManager) {
                        caseManagerDropdown.append('<option value="' + caseManager.id +
                            '">' + caseManager.first_name + ' ' + caseManager.last_name +
                            '</option>');
                     });
                },
                error: function (xhr) {
                    console.log(xhr);

                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {

            });
        };

        var getNote = function (noteID) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/case_notes/notes/' + noteID,
                method: 'GET',
                data: noteID,
                success: function (data) {
                    console.log(data);
                    $('#category-edit').val(data.result[0].category);
                    $('#note-edit').val(data.result[0].note)
                    if (data.result[0].followUpNeeded) {
                        $('#followup-area-edit')
                            .empty()
                            .append('<label for="due-date-edit"'
                                + 'class="col-xs-2 col-form-label">Due Date</label>'
                                + '<div class="col-xs-">'
                                + '<input type="text" placeholder="mm/dd/yy" id="due-date-edit" value="' + data.result[0].dueDate + '">'
                                + '</div>')
                            .append('<label for="reminder-date"'
                                + 'class="col-xs-2 col-form-label">Set Reminder Date</label>'
                                + '<div class="col-xs-">'
                                + '<input type="text" placeholder="mm/dd/yy" id="reminder-date-edit" value="' + data.result[0].reminderDate + '">'
                                + '</div>');
                    } else {
                        $('#followup-area-edit').empty();
                    }
                },
                error: function (xhr) {
                    console.log(xhr);

                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {

            });
        };

        var editNote = function (data) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/case_notes/' + data.id,
                method: 'POST',
                data: data,
                success: function (data) {
                    console.log(data);
                    alert('SUCCESS! Case note has been successfully edited');
                    $('#edit-note-modal').modal('hide');
                    displayClientProfile(client);
                },
                error: function (xhr) {
                    console.log(xhr);

                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {

            });
        };

        var setupCaseNotes = function (clientID) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/case_notes/" + clientID,
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
            }).done(function (data) {
                $('#casenotes > tbody').empty();
                $("#viewcasenote-client").empty();
                $("#viewcasenote-date").empty();
                $("#viewcasenote-category").empty();
                $("#viewcasenote-casemanager").empty();
                $("#viewcasenote-note").empty();

                if (data.result) {
                    var notes = data.result;
                    var table = $('#casenotes');

                    if (!$.fn.DataTable.isDataTable('#casenotes')) {
                        table = $('#casenotes').DataTable({
                            columns: Object.keys(notes[0]).map(function (propName) {
                                return { name: propName, data: propName, title: propName };
                            }) // setting property names as column headers for now
                        });
                    } else {
                        table = $('#casenotes').DataTable();
                    }
                    
                    // manually add placeholder for search bar on checkin table
                    $('#casenotes_filter input').prop("placeholder", "Search Case Notes");

                    if (!$('#column-select').length) {
                        $('#casenotes_wrapper').find('div.row:first div.col-md-6:first')
                        .append(
                            '<div class="datatables_columns_visible col-md-6" id="datatables_columns_visible">' +
                            '<label>Show columns <select multiple="multiple" name="multiselect[]" id="column-select"></select>' +
                            '</label></div>')
                        .find('div').wrap('<div class="col-sm-6"></div>');
                    }
                    
                    var options = [];

                    Object.keys(notes[0]).forEach(function (propName, index) {
                        options.push({label: propName, title: propName, value: index});
                    });

                    $('#column-select').multiselect({
                        includeSelectAllOption: true,
                        enableHTML: false, // to protect against XSS injections
                        nonSelectedText: 'None',
                        disableIfEmpty: true,
                        numberDisplayed: 2,
                        onChange: function (option, checked) {
                            if (checked) {
                              table.column($(option).attr('title') + ':name').visible(true);
                            } else {
                              table.column($(option).attr('title') + ':name').visible(false, false); // 2nd false prevents Datatables from recalculating layout
                            }
                        },
                        onSelectAll: function () {
                            $('#column-select option:selected').each(function (index) {
                                table.column($(this).attr('title') + ':name').visible(true);
                            });
                        },
                        onDeselectAll: function () {
                            $('#column-select option').each(function (index) {
                                table.column($(this).attr('title') + ':name').visible(false, false);
                            });
                        }
                    });

                    $('#column-select').multiselect('dataprovider', options);
                    
                    // preselecting default column visibility
                    // later this data will come from local settings
                    table.columns().every(function () { // every() is built-in from Datatables
                        // the table context is automatically set to the appropriate table for each column that has been selected
                        // i.e. "this" is a column
                        if (this.visible()) {
                            $('#column-select').multiselect('select', this.index());
                        }
                    });

                    table.rows().remove().draw();

                    notes.forEach(function (note) {
                        var row = table.row.add({
                            id: note.id,
                            clientID: note.clientID,
                            caseManagerID: note.caseManagerID,
                            date: note.date,
                            category: note.category,
                            note: note.note,
                            followUpNeeded: note.followUpNeeded,
                            dueDate: note.dueDate,
                            reminderDate: note.reminderDate
                        }).draw();

                        $(row.node()).click(function(){
                            $("#viewcasenote").removeAttr('hidden');
                            $("#viewcasenote-client").empty().append("Client: " + note.clientID);
                            $("#viewcasenote-date").empty().append("Date: " + note.date);
                            $("#viewcasenote-category").empty().append("Category: " + note.category);
                            $("#viewcasenote-casemanager").empty().append("Case Manager: " + note.caseManagerID);
                            $("#viewcasenote-note").empty().append("Note: " + note.note);
                        });

                        $(row.node()).data({
                            id: note.id,
                            clientID: note.clientID,
                            caseManagerID: note.caseManagerID,
                            date: note.date,
                            category: note.category,
                            note: note.note,
                            followUpNeeded: note.followUpNeeded,
                            dueDate: note.dueDate,
                            reminderDate: note.reminderDate
                        });
                        $(row.node()).data('toggle', 'modal')
                            .data('target', '#add-note-modal')
                            .dblclick(function (event) {
                                $('#edit-note-modal').modal('toggle');
                                var clientID = $('#case-note-client-id').text();
                                caseNoteID = note.id;
                                editClientDropdown(clientID);
                                editAllCaseManagers();
                                $("#editcasenote-date").val(moment().format("YYYY-MM-DDTHH:mm:ss"));
                                getNote(caseNoteID);
                            });
                    });
                }
            });
        };

        var refreshCaseNotes = function () {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/case_notes/" + $('#client-id')['0'].textContent,
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
            }).done(function (data) {
                if (data.result) {
                    $("#viewcasenote-client").empty();
                    $("#viewcasenote-date").empty();
                    $("#viewcasenote-category").empty();
                    $("#viewcasenote-casemanager").empty();
                    $("#viewcasenote-note").empty();

                    var notes = data.result;
                    var table = $('#casenotes');

                    if (!$.fn.DataTable.isDataTable('#casenotes')) {
                        table = $('#casenotes').DataTable({
                            columns: Object.keys(notes[0]).map(function (propName) {
                                return { name: propName, data: propName, title: propName };
                            }) // setting property names as column headers for now
                        });
                    } else {
                        table = $('#casenotes').DataTable();
                    }
                    table.rows().remove().draw();

                    notes.forEach(function (note) {
                        var row = table.row.add({
                            id: note.id,
                            clientID: note.clientID,
                            caseManagerID: note.caseManagerID,
                            date: note.date,
                            category: note.category,
                            note: note.note,
                            followUpNeeded: note.followUpNeeded,
                            dueDate: note.dueDate,
                            reminderDate: note.reminderDate
                        }).draw();

                        $(row.node()).click(function(){
                            $("#viewcasenote").removeAttr('hidden');
                            $("#viewcasenote-client").empty().append("Client: " + note.clientID);
                            $("#viewcasenote-date").empty().append("Date: " + note.date);
                            $("#viewcasenote-category").empty().append("Category: " + note.category);
                            $("#viewcasenote-casemanager").empty().append("Case Manager: " + note.caseManagerID);
                            $("#viewcasenote-note").empty().append("Note: " + note.note);
                        });

                        $(row.node()).data({
                            id: note.id,
                            clientID: note.clientID,
                            caseManagerID: note.caseManagerID,
                            date: note.date,
                            category: note.category,
                            note: note.note,
                            followUpNeeded: note.followUpNeeded,
                            dueDate: note.dueDate,
                            reminderDate: note.reminderDate
                        });
                        $(row.node()).data('toggle', 'modal')
                            .data('target', '#add-note-modal')
                            .dblclick(function (event) {
                                $('#edit-note-modal').modal('toggle');
                                var clientID = $('#case-note-client-id').text();
                                caseNoteID = note.id;
                                editClientDropdown(clientID);
                                editAllCaseManagers();
                                $("#editcasenote-date").val(moment().format("YYYY-MM-DDTHH:mm:ss"));
                                getNote(caseNoteID);
                            });
                    });
                }
            });
        };

        $('#followup-checkbox-edit').click(function () {
            if ($('input[name=followup-checkbox-edit]:checked').length !== 0) {
                $('#followup-area-edit')
                    .empty()
                    .append('<label for="due-date-edit"'
                        + 'class="col-xs-2 col-form-label">Due Date</label>'
                        + '<div class="col-xs-">'
                        + '<input type="text" placeholder="mm/dd/yy" id="due-date-edit">'
                        + '</div>')
                    .append('<label for="reminder-date-edit"'
                        + 'class="col-xs-2 col-form-label">Set Reminder Date</label>'
                        + '<div class="col-xs-">'
                        + '<input type="text" placeholder="mm/dd/yy" id="reminder-date-edit">'
                        + '</div>');
            } else if ($('input[name=followup-checkbox-edit]:checked').length === 0) {
                $('#followup-area-edit').empty();
            }
        });

        $('#submit-note-edit').click(function () {
            var noteID = caseNoteID;
            var clientID = $('#client-dropdown-edit').val();
            var caseManagerID = $('#edit-case-note-case-manager-dropdown').val();
            var date = $('#editcasenote-date')['0'].value;
            date = date.substr(0, date.indexOf('T'));
            var category = $('#category-edit')['0'].value.toUpperCase();
            var note = $('#note-edit')['0'].value;
            var followUpNeeded = $('input[name=followup-checkbox-edit]:checked').length === 0 ? false : true;
            var dueDate;
            var reminderDate;
            dueDate = $('#due-date-edit')['0'] === undefined ? null : $('#due-date-edit')['0'].value;
            reminderDate = $('#reminder-date-edit')['0'] === undefined ? null : $('#reminder-date-edit')['0'].value;
            var data = {
                id: noteID,
                clientID: clientID,
                caseManagerID: caseManagerID,
                date: date,
                category: category,
                note: note,
                followUpNeeded: followUpNeeded,
                dueDate: dueDate,
                reminderDate
            };

            console.log(data);

            editNote(data);
        });
            
        var populateClientFlags = function () {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/clients/' + $('#client-id')['0'].textContent + '/flags',
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
                $('#client-flags').empty();
                data.result.rows.forEach(function (flag) {
                    var flagtype = window.getDataById(flagTypes, flag.type);
                    $('#client-flags').append(
                        '<li><button ' + window.dataString(flag) + '" class="badge-button btn btn-primary btn-sm" type="button" data-toggle="popover" title="' +  flagtype.name + '"' +
                         'data-content="' + flag.note + '">' + flagtype.name + '<span class="badge">' + flag.message + '</span>' +
                         '<a class="flag-edit" href="#">edit</a></button></li>'); // title and data-content attributes are for hover popover
                    console.log($('#client-flags li:last .badge-button'));
                    $('#client-flags li:last .badge-button').css('background-color', flagtype.color);
                });
                $('.badge-button').popover({ container: 'body' });
                $('.badge-button').mousedown(function (event) {
                    $(this).popover('toggle');
                    event.stopPropagation();
                });
                $('#client-flags li a.flag-edit').click(function (event) {
                    $('#editflag-modal').find('.modal-title').text('Edit ' + $(this).parents('button').prop("title") + ' Flag')
                    $('#editflag-modal-data').data($(this).parents('button').data());
                    var data = $('#editflag-modal-data').data();
                    $('#editflag-modal').modal('toggle');
                    $('#editflag-modal-dot').prop("checked", data.settings.dot);
                    $('[name="edit-message"]').val(data.message);
                    $('[name="edit-note"]').val(data.note);
                    event.stopPropagation();
                });
            });
        };

        /*
            <tr>
              <td>1/10/15</td>
              <td>CM</td>
              <td>Ben Perkins</td>
              <td>This is the beginning of a case note.</td>
              <td><button type="button" class="edit-note btn btn-primary btn-sm">Edit</button></td>
            </tr>
        */

        var displayClientProfile = function (client) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/clients/" + $(client).data("id"), // will find another way to get client id
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
            }).done(function (data) {
                var string = $('#view-client-tabs').attr('class');

                $('#view-client-tabs').attr('class', "col-sm-8");
                $('#client-id').text(data.result.rows[0].id);
                if (data.result.rows[0].nick_name != undefined){
                    $('#client-name').text(data.result.rows[0].nick_name + " (" + data.result.rows[0].first_name + ") " + data.result.rows[0].last_name);
                }else{
                    $('#client-name').text(data.result.rows[0].first_name + " " + data.result.rows[0].last_name);
                }
                var birthday = data.result.rows[0].date_of_birth;
                if (birthday) {
                    $('#client-birthday').text(birthday.slice(0, birthday.lastIndexOf("T")));
                } else {
                    $('#client-birthday').text(null);
                }
                if (data.result.rows[0].age) {
                    $('#client-age').text(data.result.rows[0].age.years);
                } else {
                    $('#client-age').text(null);
                }
                $('#client-phonenumber').text( data.result.rows[0].phone_number);
                $('#client-email').text(data.result.rows[0].email);

                setupCaseNotes($('#client-id')['0'].textContent);

                populateClientFlags();

                getClientFiles($(client).data("id"));

                $('#casenotes-title').text(data.result.rows[0].first_name + " " + data.result.rows[0].last_name + '\'s Case Notes');
                $('#caseplan-title').text(data.result.rows[0].first_name + " " + data.result.rows[0].last_name + '\'s Case Plan');
                $('#caseplan-text').text(data.result.rows[0].caseplan);

                $('#case-note-client-id').text($(client).data("id"));
            });

            getProfilePicture(client);
        };


        var editCasePlan = function (data){
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/clients/" + data.clientID + "/case_plan",
                method: "PUT",
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
            });
        };

        $("#submitplan").click(function(event){;
            var clientID = $('#client-id')['0'].textContent;
            console.log(clientID);
            var text = $('#caseplan-text').val();

            var data = {
                clientID: clientID,
                text: text
            }
            editCasePlan(data);
            location.reload();

        });

        var editClient = function (data) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "api/clients/" + data.id,
                method: "PUT",
                data: data,
                success: function (data) {
                    console.log(data);
                    $('#client-name-container').replaceWith('<h1 id="client-name" class="col-sm-9">' + data.result.rows[0].first_name + ' ' + data.result.rows[0].last_name + '</h1>');
                    if (data.result.rows[0].date_of_birth) {
                        $('#client-birthday').replaceWith('<td id="client-birthday">' + data.result.rows[0].date_of_birth.substr(0, data.result.rows[0].date_of_birth.indexOf('T')) + '</td>');
                    } else {
                        $('#client-birthday').replaceWith('<td id="client-birthday">null</td>');
                    }
                    if (data.result.rows[0].age) {
                        $('#client-age').replaceWith('<td id="client-age">' + data.result.rows[0].age.years + '</td>');
                    } else {
                        $('#client-age').replaceWith('<td id="client-age">null</td>');
                    }
                    $('#client-phonenumber').replaceWith('<td id="client-phonenumber">' + data.result.rows[0].phone_number + '</td>');
                    $('#client-email').replaceWith('<td id="client-email">' + data.result.rows[0].email + '</td>');
                    $('#last-meeting').replaceWith('<td id="last-meeting">' + clientLastMeeting + '</td>');
                    $('#case-manager').replaceWith('<td id="case-manager">' + data.result.rows[0].case_manager + '</td>');
                    $('#edit-client').show();
                    $('#cancel-edit').hide();
                    $('#submit-edit').hide();
                },
                error: function (xhr) {
                    console.error(xhr);

                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {

            });
        };

        $('#clients').delegate("tr", "click", function (event) {
            $('#cm-page-filler').hide();
            displayClientProfile($(this));
            client = $(this);
        });

        // *** Files ***

        var addFile = function (data) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/files',
                method: 'POST',
                data: data,
                success: function (data) {
                    console.log(data);
                    alert('SUCCESS: File has been uploaded');
                    $('#add-file-modal').modal('hide');
                    displayClientProfile(client)
                },
                error: function (xhr) {
                    console.log(xhr);
                    alert('ERROR: File failed to upload');
                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {

            });
        };

        var getProfilePicture = function (client) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/files/profile_picture/' + $(client).data("id"),
                method: 'GET',
                data: $(client).data("id"),
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr) {
                    console.log(xhr);
                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {
                var result = data.result;
                if (result.rowCount > 0) {
                    var url = result.rows['0'].base_64_string;
                    var photo = document.querySelector('img[id=client-photo]');
                    photo.src = url;
                } else {
                    var photo = document.querySelector('img[id=client-photo]');
                    photo.src = 'http://hhp.ufl.edu/wp-content/uploads/place-holder.jpg';
                }
            });
        };

        var getClientFiles = function (data) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: 'api/files/' + data,
                method: 'GET',
                data: data,
                success: function (data) {
                    console.log(data);
                    var fileList = data.result.rows;
                    var fileDiv = $('#files');
                    fileDiv.empty();
                    fileDiv.append('<div class="row">' +
                    '<h4 class="col-xs-3"> File </h4>' +
                    '<h4 class="col-xs-3"> Date </h4>' +
                    '<h4 class="col-xs-3"> Type </h4>' +
                    '<h4 class="col-xs-2"> Delete </h4></div><br /');
                    fileList.forEach(function (element) {
                        var id = element.id
                        var name = element.name.substr(element.name.lastIndexOf('\\') + 1);
                        var date = element.date.substr(0, element.date.indexOf('T'));
                        var type = element.type;
                        var row = '<div class="row"><p class="col-xs-1" hidden>' + id + '</p><a class="col-xs-3" href="' + element.base_64_string + '">' + name + '</a><p class="col-xs-3">' + date + '</p><p class="col-xs-3">' + type + '</p>';
                        row += '<a class="col-xs-1" onclick=deleteFile(this)><span class="glyphicon glyphicon-remove"></span></a></div><br />';
                        fileDiv.append(row);
                    });
                },
                error: function (xhr) {
                    console.log(xhr);
                    if (xhr.status === 401) {
                        localStorage.removeItem("authorization");
                    }
                }
            }).done(function (data) {

            });
        };

        var getBase64 = function (file, callback) {
            var reader = new FileReader();
            reader.onload = callback;
            reader.readAsDataURL(file);
        };

        $('#file').change(function () {
            var file = this.files[0];
            var base64;

            if (file) {
                getBase64(file, function (e) {
                    base64 = e.target.result;
                    $('#base64').text(base64);
                });
            }
        });

        $('#submit-file').click(function () {
            var clientID = $('#client-id')['0'].textContent
            var name = $('#file').val();
            var type = $('#file-type').val();
            var fileString = $('#base64').text();
            var d = new Date();
            var month = d.getMonth()+1;
            var day = d.getDate();

            var date = ((''+month).length<2 ? '0' : '') + month + '/' +
                ((''+day).length<2 ? '0' : '') + day +
                '/' + d.getFullYear();

            var data = {
                clientID: clientID,
                name: name,
                type: type,
                date: date,
                fileString: fileString
            }

            addFile(data);
        });

        $('#cancel-file').click(function () {
            $('#add-file-modal').modal('hide');
        });

        // *** *** ***

        $('#edit-client').click(function () {
            clientID = $('#client-id')['0'].textContent;
            clientName = $('#client-name')['0'].textContent;
            clientBirthday = $('#client-birthday')['0'].textContent;
            clientAge = $('#client-age')['0'].textContent;
            clientPhone = $('#client-phonenumber')['0'].textContent;
            clientMail = $('#client-email')['0'].textContent;
            clientLastMeeting = $('#last-meeting')['0'].textContent;
            clientCaseManager = $('#case-manager')['0'].textContent;
            $('#client-name').replaceWith('<div id="client-name-container" class="col-sm-8"><input type="text" id="client-name" class="form-control" value="' + clientName + '" /></div>');
            $('#edit-client').hide();
            $('#cancel-edit').show();
            $('#submit-edit').show();

            $('#client-birthday').replaceWith('<input type="text" id="client-birthday" class="form-control" value="' + clientBirthday + '" />');
            // $('#client-age').replaceWith('<input type="number" id="client-age" class="form-control" min="1" step="1" value="' + clientAge + '" />');
            $('#client-phonenumber').replaceWith('<input type="text" id="client-phonenumber" class="form-control" value="' + clientPhone + '" />');
            $('#client-email').replaceWith('<input type="text" id="client-email" class="form-control" value="' + clientMail + '" />');
            $('#last-meeting').replaceWith('<input type="text" id="last-meeting" class="form-control" value="' + clientLastMeeting + '" />');
            $('#case-manager').replaceWith('<input type="text" id="case-manager" class="form-control" value="' + clientCaseManager + '" />');

            $('.dropdown-menu li a').click(function (event) {
                $(this).parents('.dropdown').find('.btn').data("id", $(this).parent().data("id"));
                $(this).parents('.dropdown').find('.btn').html($(this).text() + ' <span class="caret"></span>');
                $(this).parents('.dropdown').dropdown('toggle');
            });
        });

        $('#cancel-edit').click(function () {

            $('#client-name-container').replaceWith('<h1 id="client-name" class="col-sm-9">' + clientName + '</h1>');
            $('#edit-client').show();
            $('#cancel-edit').hide();
            $('#submit-edit').hide();

            $('#client-birthday').replaceWith('<td id="client-birthday">' + clientBirthday + '</td>');
            // $('#client-age').replaceWith('<td id="client-age">' + clientAge + '</td>');
            $('#client-phonenumber').replaceWith('<td id="client-phonenumber">' + clientPhone + '</td>');
            $('#client-email').replaceWith('<td id="client-email">' + clientMail + '</td>');
            $('#last-meeting').replaceWith('<td id="last-meeting">' + clientLastMeeting + '</td>');
            $('#case-manager').replaceWith('<td id="case-manager">' + clientCaseManager + '</td>');
        });

        $('#submit-edit').click(function () {

            var id = clientID;
            var name = $('#client-name')['0'].value;
            var firstName = name.substr(0,name.indexOf(' '));
            //var nickname = name.match(/'([^']+)'/)[1];
            var lastName = name.substr(name.lastIndexOf(' ') + 1);
            var birthday = $('#client-birthday')['0'].value;
            // var age = $('#client-age')['0'].value;
            var phoneNumber = $('#client-phonenumber')['0'].value;
            var email = $('#client-email')['0'].value;
            var lastMeeting = $('#last-meeting')['0'].value;
            var caseManager = $('#case-manager')['0'].value;

            var data = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                //nickname: nickname,
                birthday: birthday,
                // age: age,
                phoneNumber: phoneNumber,
                email: email,
                lastMeeting: lastMeeting,
                caseManager: caseManager
            };

            editClient(data);

        });

        // $('#shower').hover( function () {
        //     $('#shower').popover('toggle');
        // });
        window.viewClientRefresh = window.viewClientRefresh || [];
        window.viewClientRefresh.push(populateClientFlags);
        window.viewClientRefresh.push(refreshCaseNotes);
    };

    

    var globalData = [];
    globalData.push(window.sessionStorage.flagTypes);
    globalData.push(window.sessionStorage.flags);
    // globalData.push(window.sessionStorage.flags);

    if (globalData.every((array) => array)) {
        console.log("call arrived");
        setupClientProfile();
    } else {
        console.log("waiting for call");
        window.sessionStorageListeners.push({
            ready: setupClientProfile
        });
    }


});
