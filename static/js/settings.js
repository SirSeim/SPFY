$(function () {
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
                    '<tr><td class="dot-column" data-id="' + status.id + '" data-color="' + status.color + '"><span class="dot"></span></td>' +
                    '<td data-name="' + status.name + '" class="name-column">' + status.name + '</td><td><button type="button" class="btn btn-default edit">Edit</button></td></tr>');
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
            var columns = $(event.target).parent().siblings();
            var dotcol = $(columns).parent().find('.dot-column');
            var namecol = $(columns).parent().find('.name-column');

            $(dotcol).empty().html('<input type="text" id="edit-color" />');
            $('#edit-color').spectrum({
                    color: $('#edit-color').parent().data('color'),
                    change: function(color) {
                        console.log("change called: " + color.toHexString());
                        colorString = color.toHexString();
                    }
                });
            $(namecol).html('<input type="text" id="edit-status-name" placeholder="' + $(namecol).data("name") + '"/>');
        })
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
