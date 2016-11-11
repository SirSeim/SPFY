$(function () {

    // ** will clean and optimize code **

    var editButton = '<button type="button" class="btn btn-default edit">Edit</button>';
    var colorString = '';

    var cancel = function (element) {
        var dotcol = $(element).children('.dot-column');
        var namecol = $(element).children('.name-column');

        $(dotcol).empty().html('<span class="dot"></span>');
        $(dotcol).children('.dot').css("background-color", $(dotcol).data("color"));
        $(namecol).empty().html($(namecol).data("name"));
        $(element).find('#submit-status').parent().replaceWith('<td>' + editButton + '</td>');
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


    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: 'api/statuses',
        method: 'GET',
        success: function (data) {
            console.log(data);
            console.log(data.result[0].name);
            data.result.forEach(function (status) {
                $('#statuses-table tbody').append(
                    '<tr data-id="' + status.id + '"><td class="dot-column" data-color="' + status.color + '" data-newcolor=""><span class="dot"></span></td>' +
                    '<td class="name-column" data-name="' + status.name + '">' + status.name + '</td><td>' + editButton + '</td></tr>');
                $('#statuses-table tbody .dot:last').css("background-color", status.color);
            });
        },
        error: function (xhr) {
            console.error(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
            }
        }   
    }).done(function (data) {
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
                    }
                });
            $(namecol).html('<input type="text" id="edit-status-name" placeholder="' + $(namecol).data("name") + '"/>');

            $(event.target).replaceWith(
                '<button id="submit-status" type="button" class="col-sm-2 btn btn-primary btn-sm">Submit</button>' +
                '<button id="cancel-status" type="button" class="col-sm-2 btn btn-primary btn-sm">Cancel</button>');

            $('#submit-status').click(function (event) {
                // when editing, send all of the properties through
                // even if they haven't changed
                // because right now UPDATE queries are updating
                // all fields (columns), still trying to figure out how to only
                // update arbitrary selected columns if it is possible

                console.log($(event.target).parents('tr').find('.dot-column').data("newcolor"));
                var data = {
                    name: $('#edit-status-name').val() ? $('#edit-status-name').val() : $('#edit-status-name').parent().data("name"),
                    color: $(event.target).parents('tr').find('.dot-column').data("newcolor")
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
                            var newName = data.result[0].name;
                            var newColor = data.result[0].color;

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
                            $(dotcol).data("color", newColor);
                            $(namecol).data("name", newName);
                            console.log($(dotcol).data("color"));
                            console.log($(namecol).data("name"));

                            $(dotcol).empty().html('<span class="dot"></span>');
                            $(dotcol).children('.dot').css("background-color", newColor);
                            $(namecol).empty().html(newName);
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
        

    });


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
