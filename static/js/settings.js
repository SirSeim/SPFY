$(function () {

    // ** will clean and optimize code **

    var setupSettingsPage = function () {
        var statuses = JSON.parse(window.sessionStorage.statuses);
        var flags = JSON.parse(window.sessionStorage.flags);
        var types = JSON.parse(window.sessionStorage.notificationTypes);

        var editButton = '<button type="button" class="btn btn-default edit">Edit</button>';
        var colorString = '';

        // *****************
        // looking for a plugin to handle editing in place
        // until then, hardcoding everything
        // *****************

        var cancel = function (element) {
            console.log($(element).children('td.col'));
            var dotcol = $(element).children('.dot-column');
            var namecol = $(element).children('.name-column');

            var colorcol = $(element).children('.color-column');
            var typecol = $(element).children('.type-column');
            var messagecol = $(element).children('.message-column');
            var notecol = $(element).children('.note-column');
            console.log(colorcol);
            console.log(dotcol);
            if (dotcol.length !== 0 || namecol.length !== 0) {
                $(dotcol).empty().html('<span class="dot"></span>');
                $(dotcol).children('.dot').css("background-color", $(dotcol).data("color"));
                $(namecol).empty().html($(namecol).data("name"));
                $(element).find('#submit-status').parent().replaceWith('<td>' + editButton + '</td>');
            }

            if (colorcol.length !== 0 || typecol.length !== 0 || messagecol.length !== 0 || notecol.length !== 0) {
                console.log("inside flag cancel");
                $(colorcol).empty().html('<button type="button" class="btn btn-primary flag"><span class="badge"></span></button>');
                $(colorcol).children('.btn.btn-primary.flag').css("background-image", 'none');
                $(colorcol).children('.btn.btn-primary.flag').css("background-color", $(colorcol).data("color"));
                $(typecol).empty().html($(typecol).data("type"));
                $(messagecol).empty().html($(messagecol).data("message"));
                $(notecol).empty().html($(notecol).data("note"));
                $(element).find('#submit-flag').parent().replaceWith('<td>' + editButton + '</td>');
            }
        };

        $('#options').delegate('li', 'click', function (event) {
            $('#options li.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#options li').get().forEach(function (link) {
                if ($(link).hasClass('selected')) {
                    $($(link).find('a').attr('href')).removeClass('hidden');
                } else {
                    $($(link).find('a').attr('href')).addClass('hidden');
                }
            });
        });

        // ---------------------- Account ------------------------------


        $('#update-button').click(function (event) {
            event.preventDefault();
            var status = $('#status');
            console.log($('#current-password').val());
            console.log($('#new-password').val());
            console.log($('#confirm-new-password').val());

            var data = {
                password: $('#current-password').val(),
                newPassword: $('#confirm-new-password').val()
            }

            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                },
                url: "/api/users/self/password",
                method: "PUT",
                data: data
            }).done(function (data, textStatus, xhr) {
                status.text("Success!");
                console.log(data);
                console.log(textStatus);
                console.log(xhr);

                if (typeof(Storage) !== "undefined") {
                    // Code for localStorage/sessionStorage.
                    console.log(xhr.getResponseHeader("authorization"));
                    localStorage.setItem("authorization", xhr.getResponseHeader("authorization"));
                    // window.location.href = "/";
                } else {
                    // Sorry! No Web Storage support..
                    status.text("No LocalStorage support");
                }
            }).fail(function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);
                console.log(xhr);

                var json = xhr.responseJSON;
                var code = xhr.status;
                if (code === 400) {
                    if (json.validation.keys[0] === "password") {
                        status.text("Missing current password");
                    } else if (json.validation.keys[0] === "newPassword") {
                        status.text("Missing new password");
                    }
                } else if (code === 401) {
                    status.text("Bad Username or Password");
                }
            });
            event.stopPropagation();
        });
        
        // --------------------- Notifications --------------------------
        
        types.forEach(function (type) { 
            $('#flag-notifications-table tbody').append(
                            '<tr><td>' + type.name + '</td>' + 
                            '<td><input type="checkbox" name="settings-checkbox" checked></td>' +
                            '</tr>');
        });

        $('[name="settings-checkbox"]').get().forEach(function (checkbox) {
            $(checkbox).bootstrapSwitch();
        });

        // ---------------------- Client Profiles ----------------------------

        // ==== statuses ====

        
        statuses.forEach(function (status) {
            $('#statuses-table tbody').append(
                '<tr data-id="' + status.id + '">' +
                '<td class="dot-column col" data-color="' + status.color + '" data-newcolor=""><span class="dot"></span></td>' +
                '<td class="name-column col" data-name="' + status.name + '">' + status.name + '</td>' +
                '<td class="col-sm-3">' + editButton + '</td></tr>');
            $('#statuses-table tbody .dot:last').css("background-color", status.color);
        });

        // according to stackoverflow, use delegate for elements that change frequently
            
        $('#statuses-table tbody').delegate('td button.edit', 'click', function (event) {

            // cancel any other active edits before opening the edit options for the current status
            $(event.target).parents('tbody').children('tr').get().forEach(function (element) {
                cancel(element);
            });

            var columns = $(event.target).parent().siblings();
            var dotcol = $(columns).parent().find('.dot-column');
            var namecol = $(columns).parent().find('.name-column');

            $(dotcol).empty().html('<input type="text" id="edit-color" />');
            $('#edit-color').spectrum({
                    color: $('#edit-color').parent().data('color'),
                    change: function(color) {
                        console.log("change called: " + color.toHexString());
                        $(dotcol).data("newcolor", color.toHexString());
                    },
                    allowEmpty: true,
                    chooseText: 'Select',
                    showPalette: true,
                    showSelectionPalette: true,
                    selectionPalette: [],
                    palette: [['#02AEF0']],
                    localStorageKey: 'spectrum.colors'
                });
            $(namecol).html('<input type="text" id="edit-status-name" />');
            $('#edit-status-name').val($(namecol).data("name"));

            $(event.target).replaceWith(
                '<button id="submit-status" type="button" class="col-sm-2 btn btn-primary btn-sm">Submit</button>' +
                '<button id="cancel-status" type="button" class="col-sm-2 btn btn-primary btn-sm">Cancel</button>');

            $('#submit-status').click(function (event) {
                // when editing, send all of the properties through
                // even if they haven't changed
                // because right now the sql UPDATE queries are updating
                // all fields (columns), still trying to figure out how to only
                // update arbitrary selected columns if it is possible

                console.log($(event.target).parents('tr').find('.dot-column').data("newcolor"));
                var newColor = $(event.target).parents('tr').find('.dot-column').data("newcolor");

                var data = {
                    name: $('#edit-status-name').val() ? $('#edit-status-name').val() : $('#edit-status-name').parent().data("name"),
                    color: newColor ? newColor : $(event.target).parents('tr').find('.dot-column').data("color") 
                };

                if (data.name && data.color) {
                    console.log("inside");
                    $.ajax({
                        xhrFields: {
                            withCredentials: true
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                        },
                        url: 'api/statuses/' + $(event.target).parents('tr').data("id"),
                        method: 'PUT',
                        data: data,
                        success: function (data) {
                            console.log(data);
                            var name = data.result[0].name;
                            var color = data.result[0].color;

                            var columns = $(event.target).parent().siblings();
                            var dotcol = $(columns).parent().find('.dot-column');
                            var namecol = $(columns).parent().find('.name-column');

                            
                            // using $.data() to set the data will work, but it
                            // does not reflect those changes in the DOM, JQuery stores
                            // it internally, if you want to see it reflected in the DOM
                            // use $.attr() to set the data- attribute, however stackoverflow
                            // warns of mixing .data() and .attr() calls on the same data attribute
                            // for the same element
                            // perhaps React will solve this in the future since it does update the DOM
                            $(event.target).parents('tr').data("id", data.result[0].id);
                            $(dotcol).data("color", color);
                            $(namecol).data("name", name);
                            console.log($(dotcol).data("color"));
                            console.log($(namecol).data("name"));

                            $(dotcol).empty().html('<span class="dot"></span>');
                            $(dotcol).children('.dot').css("background-color", color);
                            $(namecol).empty().html(name);
                            $(event.target).parent().replaceWith('<td>' + editButton + '</td>');
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

            $('#cancel-status').click(function (event) {
                cancel($(event.target).parents('tr')); // function defined above
            });
        });

        // ==== flags ====

        // var data = {
        //     type:'Showers', 
        //     message: 'Tier 2', 
        //     color: 'blue', 
        //     note: '(name) is Tier 2 for showers this week. Will reset on a weekly basis.'
        // };

        flags.forEach(function (flag) {
            $('#flags-table tbody').append(
                '<tr data-id="' + flag.id + '">' +
                '<td class="color-column col" data-color="' + flag.color + '" data-newcolor=""><button type="button" class="btn btn-primary flag"><span class="badge"></span></button></td>' +
                '<td class="type-column col" data-type="' + flag.type + '">' + flag.type + '</td>' +
                '<td class="message-column col" data-message="' + flag.message + '">' + flag.message + '</td>' +
                '<td class="note-column col" data-note="' + flag.note + '">' + flag.note + '</td>' +
                '<td class="col-sm-3">' + editButton + '</td></tr>');
            $('#flags-table tbody .btn.btn-primary.flag:last').css("background-image", 'none');
            $('#flags-table tbody .btn.btn-primary.flag:last').css("background-color", flag.color);
        });
            
        // according to stackoverflow, use delegate for elements that change frequently
        
        $('#flags-table tbody').delegate('td button.edit', 'click', function (event) {

            // cancel any other active edits before opening the edit options for the current status
            $(event.target).parents('tbody').children('tr').get().forEach(function (element) {
                cancel(element);
            });

            var columns = $(event.target).parent().siblings();
            var colorcol = $(columns).parent().find('.color-column');
            var typecol = $(columns).parent().find('.type-column');
            var messagecol = $(columns).parent().find('.message-column');
            var notecol = $(columns).parent().find('.note-column');

            $(colorcol).empty().html('<input type="text" id="edit-color" />');
            $('#edit-color').spectrum({
                    color: $('#edit-color').parent().data('color'),
                    change: function(color) {
                        console.log("change called: " + color.toHexString());
                        $(colorcol).data("newcolor", color.toHexString());
                    }
                });
            $(typecol).html('<input type="text" id="edit-type" />');
            $(messagecol).html('<input type="text" id="edit-message" />');
            $(notecol).html('<input type="text" id="edit-note" size="45" />');

            $('#edit-type').val($(typecol).data("type"));
            $('#edit-message').val($(messagecol).data("message"));
            $('#edit-note').val($(notecol).data("note"));
            
            $(event.target).replaceWith(
                '<button id="submit-flag" type="button" class="col-sm-2 btn btn-primary btn-sm">Submit</button>' +
                '<button id="cancel-flag" type="button" class="col-sm-2 btn btn-primary btn-sm">Cancel</button>');

            $('#submit-flag').click(function (event) {
                // when editing, send all of the properties through
                // even if they haven't changed
                // because right now the sql UPDATE queries are updating
                // all fields (columns), still trying to figure out how to only
                // update arbitrary selected columns if it is possible

                console.log($(event.target).parents('tr').find('.color-column').data("newcolor"));
                var newColor = $(event.target).parents('tr').find('.color-column').data("newcolor");
                console.log(newColor);
                var data = {
                    color: newColor ? newColor : $(event.target).parents('tr').find('.color-column').data("color"),
                    type: $('#edit-type').val() ? $('#edit-type').val() : $('#edit-type').parent().data("type"),
                    message: $('#edit-message').val() ? $('#edit-message').val() : $('#edit-message').parent().data("message"),
                    note: $('#edit-note').val() ? $('#edit-note').val() : $('#edit-note').parent().data("note")
                };

                if (data.color && data.type && data.message && data.note) {
                    console.log("inside");
                    $.ajax({
                        xhrFields: {
                            withCredentials: true
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                        },
                        url: 'api/flags/' + $(event.target).parents('tr').data("id"),
                        method: 'PUT',
                        data: data,
                        success: function (data) {
                            console.log(data);
                            var color = data.result[0].color;
                            var type = data.result[0].type;
                            var message = data.result[0].message;
                            var note = data.result[0].note;

                            var columns = $(event.target).parent().siblings();
                            var colorcol = $(columns).parent().find('.color-column');
                            var typecol = $(columns).parent().find('.type-column');
                            var messagecol = $(columns).parent().find('.message-column');
                            var notecol = $(columns).parent().find('.note-column');

                            
                            // using $.data() to set the data will work, but it
                            // does not reflect those changes in the DOM, JQuery stores
                            // it internally, if you want to see it reflected in the DOM
                            // use $.attr() to set the data- attribute, however stackoverflow
                            // warns of mixing .data() and .attr() calls on the same data attribute
                            // for the same element
                            // perhaps React will solve this in the future since it does update the DOM
                            $(event.target).parents('tr').data("id", data.result[0].id);
                            $(colorcol).data("color", color);
                            $(typecol).data("type", type);
                            $(messagecol).data("message", message);
                            $(notecol).data("note", note);

                            $(colorcol).empty().html('<button type="button" class="btn btn-primary flag"><span class="badge"></span></button>');
                            $(colorcol).children('.btn.btn-primary.flag').css("background-image", 'none');
                            $(colorcol).children('.btn.btn-primary.flag').css("background-color", color);
                            $(typecol).empty().html(type);
                            $(messagecol).empty().html(message);
                            $(notecol).empty().html(note);
                            $(event.target).parent().replaceWith('<td>' + editButton + '</td>');
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

            $('#cancel-flag').click(function (event) {
                cancel($(event.target).parents('tr')); // function defined above
            });
        });
    };

    var globalData = []
    globalData.push(window.sessionStorage.statuses);
    globalData.push(window.sessionStorage.flags);

    if (globalData.every((array) => array)) {
        console.log("call arrived");
        setupSettingsPage();
    } else {
        console.log("waiting for call");
        window.sessionStorageListeners.push({
            ready: setupSettingsPage
        });
    }

});

// var ListItem = React.createClass({
//     getInitialState: function () {
//         return {
//             isSelected: false
//         };
//     },
//     handleClick: function () {
//         this.setState({
//             isSelected: true
//         });
//     },
//     render: function () {
//         var isSelected = this.state.isSelected;
//         if (isSelected) {
//             return (
//                 <li className="selected" onClick={this.handleClick}><a href="#">{this.props.content}</a></li>
//                 // getting this from whenever a ListItem is created <ListItem content="Notifications" />
//             );
//         } else {
//             return (
//                 <li onClick={this.handleClick}><a href="#">{this.props.content}</a></li>
//                 // getting this from whenever a ListItem is created <ListItem content="Notifications" />
//             );
//         }
//     }
// })

// var Navs = React.createClass({
//     handleClick: function () {
//         $('#options li.selected').removeClass('selected');
//     },
//     render: function () {
//         return (
            // <div className="row">
            //   <div id="navigation" className="col-sm-3 col-lg-2">
//              <nav className="side-nav">
//                 <ul id="options" onClick={this.handleClick}>
//                     <ListItem content="One Thing" />
//                     <ListItem content="Another Thing" />
//                 </ul>
//             </nav>
            //    </div>
            //    <div class="col-sm-9 col-lg-10">
            //     <!-- your page content -->
            //     </div>
            // </div>
//         )
//     }
// });

// ReactDOM.render(
//   <Navs />,
//   document.getElementById('react-content')
// );
