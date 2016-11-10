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
                    '<tr><td data-id="' + status.id + '"><span class="dot"></span></td>' +
                    '<td>' + status.name + '</td></tr>');
                console.log($('#statuses-table tbody .dot').last().css("background-color", status.color));
            });
        },
        error: function (xhr) {
            console.error(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
            }
        }   
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
