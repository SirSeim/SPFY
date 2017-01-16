$(function () {

    // ** will clean and optimize code **

    var setupSettingsPage = function () {
        var flagTypes = JSON.parse(window.sessionStorage.flagTypes);
        var flags = JSON.parse(window.sessionStorage.flags);
        // var flags = JSON.parse(window.sessionStorage.flags);
        var notificationTypes = JSON.parse(window.sessionStorage.notificationTypes);

        var editButton = '<button type="button" class="btn btn-secondary edit">Edit</button>';
        var colorString = '';

        // *****************
        // looking for a plugin to handle editing in place
        // until then, hardcoding everything
        // *****************

        var cancel = function (element) {
            console.log($(element).children('td.col'));
            // var dotcol = $(element).children('.dot-column');
            // var namecol = $(element).children('.name-column');

            var colorcol = $(element).children('.color-column');
            var typecol = $(element).children('.type-column');
            var messagecol = $(element).children('.message-column');
            var notecol = $(element).children('.note-column');
            // console.log(colorcol);
            // console.log(dotcol);
            // if (dotcol.length !== 0 || namecol.length !== 0) {
            //     $(dotcol).empty().html('<span class="dot"></span>');
            //     $(dotcol).children('.dot').css("background-color", $(dotcol).data("color"));
            //     $(namecol).empty().html($(namecol).data("name"));
            //     $(element).find('#submit-status').parent().replaceWith('<td>' + editButton + '</td>');
            // }

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
        
        notificationTypes.forEach(function (type) { 
            $('#flag-notifications-table tbody').append(
                            '<tr><td>' + type.name + '</td>' + 
                            '<td><input data-name="' + type.name + '" type="checkbox" name="settings-checkbox" checked></td>' +
                            '</tr>');
        });

        // $('[name="settings-checkbox"]').get().forEach(function (checkbox) {
        //     $(checkbox).bootstrapSwitch();
        // });

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "/api/users/1/settings",
            method: "GET",
            success: function (data) {
                console.log(data);
                var settings = data.result[0].settingsData;
                $('[name="settings-checkbox"]').get().forEach(function (checkbox) {
                    $(checkbox).prop('checked', settings[$(checkbox).data("name")]);
                });
            },
            error: function (xhr) {
                console.error(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        });

        // ---------------------- Client Profiles ----------------------------

        // ==== statuses ====

        
        // statuses.forEach(function (status) {
        //     $('#statuses-table tbody').append(
        //         '<tr data-id="' + status.id + '">' +
        //         '<td class="dot-column col" data-color="' + status.color + '" data-newcolor=""><span class="dot"></span></td>' +
        //         '<td class="name-column col" data-name="' + status.name + '">' + status.name + '</td>' +
        //         '<td class="col-sm-3">' + editButton + '</td></tr>');
        //     $('#statuses-table tbody .dot:last').css("background-color", status.color);
        // });

        // // according to stackoverflow, use delegate for elements that change frequently
            
        // $('#statuses-table tbody').delegate('td button.edit', 'click', function (event) {

        //     // cancel any other active edits before opening the edit options for the current status
        //     $(event.target).parents('tbody').children('tr').get().forEach(function (element) {
        //         cancel(element);
        //     });

        //     var columns = $(event.target).parent().siblings();
        //     var dotcol = $(columns).parent().find('.dot-column');
        //     var namecol = $(columns).parent().find('.name-column');

        //     $(dotcol).empty().html('<input type="text" id="edit-color" />');
        //     $('#edit-color').spectrum({
        //             color: $('#edit-color').parent().data('color'),
        //             change: function(color) {
        //                 console.log("change called: " + color.toHexString());
        //                 $(dotcol).data("newcolor", color.toHexString());
        //             },
        //             allowEmpty: true,
        //             chooseText: 'Select',
        //             showPalette: true,
        //             showSelectionPalette: true,
        //             selectionPalette: [],
        //             palette: [['#02AEF0']],
        //             localStorageKey: 'spectrum.colors'
        //         });
        //     $(namecol).html('<input type="text" id="edit-status-name" />');
        //     $('#edit-status-name').val($(namecol).data("name"));

        //     $(event.target).replaceWith(
        //         '<button id="submit-status" type="button" class="col-sm-2 btn btn-primary btn-sm">Submit</button>' +
        //         '<button id="cancel-status" type="button" class="col-sm-2 btn btn-primary btn-sm">Cancel</button>');

        //     $('#submit-status').click(function (event) {
        //         // when editing, send all of the properties through
        //         // even if they haven't changed
        //         // because right now the sql UPDATE queries are updating
        //         // all fields (columns), still trying to figure out how to only
        //         // update arbitrary selected columns if it is possible

        //         console.log($(event.target).parents('tr').find('.dot-column').data("newcolor"));
        //         var newColor = $(event.target).parents('tr').find('.dot-column').data("newcolor");

        //         var data = {
        //             name: $('#edit-status-name').val() ? $('#edit-status-name').val() : $('#edit-status-name').parent().data("name"),
        //             color: newColor ? newColor : $(event.target).parents('tr').find('.dot-column').data("color") 
        //         };

        //         if (data.name && data.color) {
        //             console.log("inside");
        //             $.ajax({j
        //                 xhrFields: {
        //                     withCredentials: true
        //                 },
        //                 beforeSend: function (xhr) {
        //                     xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        //                 },
        //                 url: 'api/statuses/' + $(event.target).parents('tr').data("id"),
        //                 method: 'PUT',
        //                 data: data,
        //                 success: function (data) {
        //                     console.log(data);
        //                     var name = data.result[0].name;
        //                     var color = data.result[0].color;

        //                     var columns = $(event.target).parent().siblings();
        //                     var dotcol = $(columns).parent().find('.dot-column');
        //                     var namecol = $(columns).parent().find('.name-column');

                            
        //                     // using $.data() to set the data will work, but it
        //                     // does not reflect those changes in the DOM, JQuery stores
        //                     // it internally, if you want to see it reflected in the DOM
        //                     // use $.attr() to set the data- attribute, however stackoverflow
        //                     // warns of mixing .data() and .attr() calls on the same data attribute
        //                     // for the same element
        //                     // perhaps React will solve this in the future since it does update the DOM
        //                     $(event.target).parents('tr').data("id", data.result[0].id);
        //                     $(dotcol).data("color", color);
        //                     $(namecol).data("name", name);
        //                     console.log($(dotcol).data("color"));
        //                     console.log($(namecol).data("name"));

        //                     $(dotcol).empty().html('<span class="dot"></span>');
        //                     $(dotcol).children('.dot').css("background-color", color);
        //                     $(namecol).empty().html(name);
        //                     $(event.target).parent().replaceWith('<td>' + editButton + '</td>');
        //                 },
        //                 error: function (xhr) {
        //                     console.error(xhr);

        //                     if (xhr.status === 401) {
        //                         localStorage.removeItem("authorization");
        //                     }
        //                 }   
        //             });
        //         }
        //     });

        //     $('#cancel-status').click(function (event) {
        //         cancel($(event.target).parents('tr')); // function defined above
        //     });
        // });

        // ==== flags ====

        // var data = {
        //     type:'Showers', 
        //     message: 'Tier 2', 
        //     color: 'blue', 
        //     note: '(name) is Tier 2 for showers this week. Will reset on a weekly basis.'
        // };

        /*
            TODO:
            -edit
            -cancel edit
            -submit
        */

        flagTypes.forEach(function (statustype) {
            var message = statustype.settings.defaults.message;
            var note = statustype.settings.defaults.note;
            $('#flags-table tbody').append(
                '<tr data-id="' + statustype.id + '">' +
                '<td class="color-column col" data-color="' + statustype.color + '" data-newcolor=""><button type="button" class="btn btn-primary statustype"><span class="badge"></span></button></td>' +
                '<td class="type-column col" data-type="' + statustype.name + '">' + statustype.name + '</td>' +
                '<td class="message-column col" data-message="' + message + '">' + message + '</td>' + // change these to defaults
                '<td class="note-column col" data-note="' + note + '">' + note + '</td>' +
                '<td class="col-sm-3">' + editButton + '</td></tr>');
            $('#flags-table tbody .btn.btn-primary.statustype:last').css("background-image", 'none');
            $('#flags-table tbody .btn.btn-primary.statustype:last').css("background-color", statustype.color);
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
                '<button id="submit-flag" type="button" class="btn btn-primary btn-sm">Submit</button>' +
                '<button id="cancel-flag" type="button" class="btn btn-primary btn-sm">Cancel</button>');

            $('#submit-flag').click(function (event) {
                // when editing, send all of the properties through
                // even if they haven't changed
                // because right now the sql UPDATE queries are updating
                // all fields (columns), still trying to figure out how to only
                // update arbitrary selected columns if it is possible

                var newColor = $(event.target).parents('tr').find('.color-column').data("newcolor");
                var data = {
                    color: newColor ? newColor : $(event.target).parents('tr').find('.color-column').data("color"),
                    typeName: $('#edit-type').val() ? $('#edit-type').val() : $('#edit-type').parent().data("type"),
                    message: $('#edit-message').val() ? $('#edit-message').val() : $('#edit-message').parent().data("message"),
                    note: $('#edit-note').val() ? $('#edit-note').val() : $('#edit-note').parent().data("note")
                };

                if (data.color && data.typeName && data.message && data.note) {
                    $.ajax({
                        xhrFields: {
                            withCredentials: true
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                        },
                        url: 'api/flags/types/' + $(event.target).parents('tr').data("id"),
                        method: 'PUT',
                        data: data,
                        success: function (data) {
                            console.log(data);
                            var color = data.result[0].color;
                            var typeName = data.result[0].name;
                            var typeSettings = data.result[0].settings;
                            var message = typeSettings.defaults.message;
                            var note = typeSettings.defaults.note;

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
                            $(typecol).data("type", typeName);
                            $(messagecol).data("message", message);
                            $(notecol).data("note", note);

                            $(colorcol).empty().html('<button type="button" class="btn btn-primary flag"><span class="badge"></span></button>');
                            $(colorcol).children('.btn.btn-primary.flag').css("background-image", 'none');
                            $(colorcol).children('.btn.btn-primary.flag').css("background-color", color);
                            $(typecol).empty().html(typeName);
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
        
        // ----- File Upload -----
        var formData = undefined;
        var filename = "";

        $("#uploadSpreadsheet").on("change", function () {
            var file = this.files[0];
            if (file === undefined) {
                formData = undefined;
            } else {
                if (file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    console.log("BAD!");
                } else {
                    formData = new FormData();
                    formData.set("file", file);
                    formData.set("type", $("#uploadSpreadsheetSelect").val());
                    filename = file.name;
                }
            }
        });

        $("#uploadSpreadsheetSelect").on("change", function (event) {
            if (formData !== undefined) {
                formData.set("type", $(this).val());
            }
        })

        $('#submitSpreadsheet').on('click', function (event) {
            if (formData === undefined) {
                console.log("Error message here.");
            } else if (formData.get("type") === "0") {
                console.log("Also an error.");
            } else {
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                    },
                    url: 'api/uploadSpreadsheet',
                    method: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        console.log("WOO!");
                    },
                    error: function (xhr) {
                        console.error(xhr);

                        if (xhr.status === 401) {
                            localStorage.removeItem("authorization");
                        }
                    }   
                });
            };
        });

    };

    var globalData = []
    globalData.push(window.sessionStorage.flagTypes);
    globalData.push(window.sessionStorage.flags);
    // globalData.push(window.sessionStorage.flags);

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
//     render: function () {
//         var classNames = this.props.selected ? "selected" : "";
//         return (
//             <li className={classNames} onClick={this.props.click}><a href="#">{this.props.content}</a></li>
//             // getting this from whenever a ListItem is created <ListItem content="Notifications" />
//         );
//     }
// });

// var Navs = React.createClass({
//     getInitialState: function () {
//         return {
//             nav1Selected: false,
//             nav2Selected: false
//         };
//     },
//     deselectAll: function () {
//         this.setState({
//             nav1Selected: false,
//             nav2Selected: false
//         });
//     },
//     select1: function () {
//         this.setState({
//             nav1Selected: true
//         });
//     },
//     select2: function () {
//         this.setState({
//             nav2Selected: true
//         });
//     },
//     handleClick1: function () {
//         this.deselectAll();
//         this.select1();
//     },
//     handleClick2: function () {
//         this.deselectAll();
//         this.select2();
//     },
//     render: function () {
//         console.log(this.props.statuses); // passed in as a property from ReactDOM render
//         return (
//             <div className="row">
//               <div id="navigation" className="col-sm-3 col-lg-2">
//                  <nav className="side-nav">
//                     <ul id="options">
//                         <ListItem selected={this.state.nav1Selected}
//                                   content="One Thing" 
//                                   click={this.handleClick1} />
//                         <ListItem selected={this.state.nav2Selected}
//                                   content="Another Thing" 
//                                   click={this.handleClick2} />
//                     </ul>
//                 </nav>
//                </div>
//                <div className="col-sm-9 col-lg-10">

//             </div>
//             </div>
//         )
//     }
// });

// ** passing in global data
// var statuses = JSON.parse(window.sessionStorage.statuses);

// ReactDOM.render(
//   <Navs statuses={statuses} />, // see Nav's render function to verify it went through
//   document.getElementById('react-content')
// );

/* wait to render components until call arrives

1. Move the Ajax request into the parent and conditionally render the component:

var Parent = React.createClass({
  getInitialState: function() {
    return { data: null };
  },

  componentDidMount: function() {
    $.get('http://foobar.io/api/v1/listings/categories/').done(function(data) {
      this.setState({data: data});
    }.bind(this));
  },

  render: function() {
    if (this.state.data) {
      return <CategoriesSetup data={this.state.data} />;
    }

    return <div>Loading...</div>;
  }
});

2. Keep the Ajax request in the component and render something else conditionally while it's loading:

var CategoriesSetup = React.createClass({
  getInitialState: function() {
    return { data: null };
  },

  componentDidMount: function() {
    $.get('http://foobar.io/api/v1/listings/categories/').done(function(data) {
      this.setState({data: data});
    }.bind(this));
  },

  render: function() {
    if (this.state.data) {
      return <Input type="select">{this.state.data.map(this.renderRow)}</Input>;
    }

    return <div>Loading...</div>;
  },

  renderRow: function(row) {
    return <OptionRow obj={row} />;
  }
});

*/
