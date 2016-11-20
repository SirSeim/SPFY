
// var ActivityTable = React.createClass({
//     render: function () {
//         return (
//             <div className="text"></div>
//         )
//     }
// });

// ReactDOM.render(
//   <ActivityTable />,
//   document.getElementById('react-test')
// );

$(function () {


    // hard-coding sample data for now
    var statuses = {
        '1': 'okay-dot',
        '2': 'missing-dot',
        '3': 'sick-dot',
        '4': 'vulnerable-dot',
        '5': 'dangerous-dot'
    } // in future, will be able to pull from list of statuses stored in a "Settings" page
    // or an ajax call that retrieves statuses and their colors

    $('#viewclient-modal-save-button').click(function (event) {

        // ajax call here to save any changes to the client profile
        
        $('#viewclient-modal').modal('toggle');

    });

    $('#clients tbody').css("height", 100);

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: "/api/checkin",
        method: "GET",
        success: function (data) {
            console.log(data);
            var checkins = data.result;
            $('#checked-in tbody').empty();
            console.log($('#clients td').get());
            $('#clients td').get().forEach(function (td) {
                checkins.forEach(function (checkin) {

                    if (checkin.id === $(td).data("id")) {
                        $('#checked-in tbody').append(
                            '<tr class="clickable-row" data-toggle="modal" data-target="#viewclient-modal" data-id="' + $(td).data("id") + '">' +
                            '<td>' + moment(checkin.date).format('MM-DD-YY') + '</td>' + // implemented parseDate in main.js, added to DOM in _basescript.html
                            '<td>' + $(td).data("firstname") + ' ' + $(td).data("lastname") + '</td>' +
                            '<td></td>' +
                            '<td>' + moment($(td).data("dob")).format('MM-DD-YY') + '</td>' +
                            '<th>Activities Today</th>' +
                            '<td>notes</td>' +
                            '<td><span class="' + statuses[$(td).data("status")] + ' bullet"></span></td>' +
                            '</tr>');
                    }
                });
            });
        },
        error: function (xhr) {
            console.error(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
            }
        }
    }).done(function (data) {
        $('.clickable-row').click(function (event) {
            var $client = $(this); // renaming for readability
            console.log($client);
            console.log($('#viewclient-modal').find('#client-name').get());
            console.log($client.data("firstname") + ' ' + $client.data("lastname"));
            var idName = $client.data("id");
            console.log(idName);
            var $profile = $('#clients tbody').find('td[data-id="' + idName + '"]');
            console.log($profile.data("firstname"));
            $('#viewclient-modal').find('#client-name').text($profile.data("firstname") + ' ' + $profile.data("lastname"));
        });
    });

    $(".tablinks").click(function (event) {
        var currentTabID = $(this).attr('href');
        $(currentTabID).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        event.preventDefault();
    });


    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: "api/dropins",
        method: "GET",
        success: function (data) {
            console.log("drop-ins");
            console.log(data);
        },
        error: function (xhr) {
            console.error(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
            }
        }
    }).then(function (data) {
        // get today's dropin session
        var dropins = data.result;
        var currentDropIn = dropins[dropins.length - 1];
        $('#dropin-date').text(moment(currentDropIn.date).format('MMM Do YYYY'));
        console.log(currentDropIn);
        $('#dropin-date').data("id", currentDropIn.id);
    }).then(function () {
        // get activities associated in today's dropin
        return $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/dropins/" + $('#dropin-date').data("id") + "/activities",
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
        });
    }).then(function (data) {
        // makes a table for each activity
        var activities = data.result;
        console.log(activities);
        $('#activities').append('<div id="activity-tables" class="row"></div>');
        activities.forEach(function (activity) {
            var idName = activity.name.toLowerCase().replace(/[\s]/, '-');
            $('#activity-tables').append(
                '<div class="col-sm-4">' + 
                '<div class="panel panel-default enrollment-panel"><div class="panel-heading">' +
                '<h4>' + activity.name + '</h4><input id="activity-search" type="text" class="form-control input-sm" maxlength="128" placeholder="Search" /></div>' +
                '<table id="' + idName + '-table" data-id="' + activity.id + '" class="table table-hover activity">' +
                '<thead><tr><th name="participants"></th></tr></thead>' + 
                '<tbody></tbody></table></div></div>');
        });
    }).then(function () {
        // get the clients enrolled in each activity in today's dropin
        return $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/dropins/" + $('#dropin-date').data("id") + "/enrollment",
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
        });
    }).done(function (data) {
        var clients = data.result.rows;
        // get clientprofiles from profiles listed in clientprofiletable.html
        var profiles = $('#clients').find('tr');
        // for each activity table, add a client profile if that client is enrolled
        $('.table.activity').get().forEach(function (table) {
            clients.forEach(function (client) {
                if (client.activity_id === $(table).data("id")) {
                    // find the matching client profile and append it, 
                    // careful, append will actually move the element completely to its new location
                    // need to clone the element
                    $(table).append($('#clients').find('[data-id="' + client.client_id + '"]').parent().clone());
                }
            });
        });
        // count number of youth enrolled in each activity
        $('.enrollment-panel').find('[name="participants"]').get().forEach(function (header) {
            header.innerText = "Participants: " + $(header).parents('.enrollment-panel').find('tbody').find('td').length;
        });
    });
  
});

/*
    <tr>
      <td>3D-Printing</td>
    </tr>
    <tr>
      <td>Garden Workshop</td>
    </tr>
    <tr>
      <td>Dental</td>
    </tr>
*/

// ==========================================

// // From:http://bootsnipp.com/snippets/featured/checked-list-group

//     var createPastCheckIn = function (checkin) {
//         return '<tr><td class="col-xs-2">' + moment(checkin.date).format('M/D/YY') +
//                 '</td><td class="col-xs-2">50</td><td class="col-xs-2">5</td>' +
//                 '<td class="col-xs-2">' +
//                 '<button id="editcheck-inbutton" type="button" class="btn btn-default">Edit</button></td></tr>';
//     };

//     var populateCheckIn = function () {
//         var table = $('#checked-in tbody');

//         $.ajax({
//             url: "/api/checkin",
//             method: "GET",
//             success: function (data) {
//                 table.empty();
//                 data.result.forEach(function (element) {
//                     table.append(createPastCheckIn(element));
//                 });
//                 console.log(data);
//             },
//             error: function (data) {
//                 console.error(data);
//             }
//         });
//     };

//     populateCheckIn();

//     $(function () {
//         $('.list-group.checked-list-box .list-group-item').each(function () {

//             // Settings
//             var $widget = $(this),
//                 $checkbox = $('<input type="checkbox" class="hidden" />'),
//                 color = ($widget.data('color') ? $widget.data('color') : "primary"),
//                 style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
//                 settings = {
//                     on: {
//                         icon: 'fa fa-check'
//                     },
//                     off: {
//                         icon: 'fa fa-unchecked'
//                     }
//                 };

//             $widget.css('cursor', 'pointer')
//             $widget.append($checkbox);

//             // Event Handlers
//             $widget.on('click', function () {
//                 $checkbox.prop('checked', !$checkbox.is(':checked'));
//                 $checkbox.triggerHandler('change');
//                 updateDisplay();
//             });
//             $checkbox.on('change', function () {
//                 updateDisplay();
//             });


//             // Actions
//             function updateDisplay() {
//                 var isChecked = $checkbox.is(':checked');

//                 // Set the button's state
//                 $widget.data('state', (isChecked) ? "on" : "off");

//                 // Set the button's icon
//                 $widget.find('.state-icon')
//                     .removeClass()
//                     .addClass('state-icon ' + settings[$widget.data('state')].icon);

//                 // Update the button's color
//                 if (isChecked) {
//                     $widget.addClass(style + color + ' active');
//                 } else {
//                     $widget.removeClass(style + color + ' active');
//                 }
//             }

//             // Initialization
//             function init() {

//                 if ($widget.data('checked') == true) {
//                     $checkbox.prop('checked', !$checkbox.is(':checked'));
//                 }

//                 updateDisplay();

//                 // Inject the icon if applicable
//                 if ($widget.find('.state-icon').length == 0) {
//                     $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
//                 }
//             }
//             init();
//         });

//         $('#get-checked-data').on('click', function(event) {
//             event.preventDefault();
//             var checkedItems = {}, counter = 0;
//             $("#check-list-box li.active").each(function(idx, li) {
//                 checkedItems[counter] = $(li).text();
//                 counter++;
//             });
//             $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
//         });
//     });

//     $("input[name='idProvided']").on("click", function (event) {
//         var selected = $("input[name='idProvided']:checked").val();
//         if (selected === "idYes" && $(".newID").hasClass("hidden")) {
//             $(".newID").removeClass("hidden");
//         } else if (selected === "idNo" && !$(".newID").hasClass("hidden")) {
//             $(".newID").addClass("hidden");
//         }
//     });


// });
