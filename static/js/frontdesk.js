
var ActivityTable = React.createClass({
    render: function () {
        return (
            <div className="text">
                <h4>There is text here</h4>
            </div>
        )
    }
});

ReactDOM.render(
  <ActivityTable />,
  document.getElementById('react-test') // html has a div with id='content'
);

$(function () {


    $(".tablinks").click(function (event) {
        var currentTabID = $(this).attr('href');
        $(currentTabID).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        event.preventDefault();
    });


    var statuses = {
        '1': 'okay-dot',
        '2': 'missing-dot',
        '3': 'sick-dot',
        '4': 'vulnerable-dot',
        '5': 'dangerous-dot'
    } // in future, will be able to pull from list of statuses stored in a "Settings" page
    // or an ajax call that retrieves statuses and their colors

    var clientNames = {
        '2': 'John Nite id: 2',
        '3': 'Cari Johnson id: 3',
        '4': 'Michael Green id: 4'
    }
    var idNames = [];
    $.ajax({
        url: "api/dropins",
        method: "GET",
        success: function (data) {
            console.log("drop-ins");
            console.log(data);
        },
        error: function (data) {
            console.error(data);
        }
    }).then(function (data) {
        var dropins = data.result;
        var currentDropIn = dropins[dropins.length - 1];
        $('#dropin-date').text(currentDropIn.date);
        console.log(currentDropIn);
        $('#dropin-date').data("id", currentDropIn.id);
    }).then(function () {
        return $.ajax({
            url: "api/dropins/" + $('#dropin-date').data("id") + "/activities",
            method: "GET",
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.error(data);
            }
        });
    }).then(function (data) {
        var activities = data.result;
        console.log(activities);
        $('#activities').append('<div id="activity-tables" class="row"></div>');
        activities.forEach(function (activity) {
            var idName = activity.name.toLowerCase().replace(/[\s]/, '-');
            idNames.push(idName);
            $('#activity-tables').append(
                '<div class="col-sm-4">' + 
                '<div class="panel panel-default enrollment-panel"><div class="panel-heading">' +
                '<h4>' + activity.name + '</h4><input id="activity-search" type="text" class="form-control input-sm" maxlength="128" placeholder="Search" /></div>' +
                '<table id="' + idName + '-table" data-id="' + activity.id + '" class="table table-hover activity">' +
                '<thead><tr><th>Participants</th></tr></thead>' + 
                '<tbody></tbody></table></div></div>');
        });
    }).then(function () {

        return $.ajax({
            url: "api/dropins/" + $('#dropin-date').data("id") + "/enrollment",
            method: "GET",
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.error(data);
            }
        });
    }).done(function (data) {
        var clients = data.result.rows;
        console.log(idNames);
        console.log(clientNames);
        $('.table.activity').get().forEach(function (table) {
            clients.forEach(function (client) {
                if (client.activity_id === $(table).data("id")) {
                    $(table).append('<tr><td><span class="bullet"></span>' + clientNames[client.client_id] + '</td></tr>');
                }
            });
        });
    });
    

// table.append('<tr><td>' +
    //                         activity.name +
    //                         '</td></tr>');
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

/* 
think this was all for selecting the activities back when the create drop-in
tables were here
*/

// From:http://bootsnipp.com/snippets/featured/checked-list-group
    $(function () {
        $('.list-group.checked-list-box .list-group-item').each(function () {

            // Settings
            var $widget = $(this),
                $checkbox = $('<input type="checkbox" class="hidden" />'),
                color = ($widget.data('color') ? $widget.data('color') : "primary"),
                style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
                settings = {
                    on: {
                        icon: 'fa fa-check'
                    },
                    off: {
                        icon: 'fa fa-unchecked'
                    }
                };

            $widget.css('cursor', 'pointer')
            $widget.append($checkbox);

            // Event Handlers
            $widget.on('click', function () {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
                $checkbox.triggerHandler('change');
                updateDisplay();
            });
            $checkbox.on('change', function () {
                updateDisplay();
            });


            // Actions
            function updateDisplay() {
                var isChecked = $checkbox.is(':checked');

                // Set the button's state
                $widget.data('state', (isChecked) ? "on" : "off");

                // Set the button's icon
                $widget.find('.state-icon')
                    .removeClass()
                    .addClass('state-icon ' + settings[$widget.data('state')].icon);

                // Update the button's color
                if (isChecked) {
                    $widget.addClass(style + color + ' active');
                } else {
                    $widget.removeClass(style + color + ' active');
                }
            }

            // Initialization
            function init() {

                if ($widget.data('checked') == true) {
                    $checkbox.prop('checked', !$checkbox.is(':checked'));
                }

                updateDisplay();

                // Inject the icon if applicable
                if ($widget.find('.state-icon').length == 0) {
                    $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
                }
            }
            init();
        });

        $('#get-checked-data').on('click', function(event) {
            event.preventDefault();
            var checkedItems = {}, counter = 0;
            $("#check-list-box li.active").each(function(idx, li) {
                checkedItems[counter] = $(li).text();
                counter++;
            });
            $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
        });
    });

    $("input[name='idProvided']").on("click", function (event) {
        var selected = $("input[name='idProvided']:checked").val();
        if (selected === "idYes" && $(".newID").hasClass("hidden")) {
            $(".newID").removeClass("hidden");
        } else if (selected === "idNo" && !$(".newID").hasClass("hidden")) {
            $(".newID").addClass("hidden");
        }
    });

    
});
