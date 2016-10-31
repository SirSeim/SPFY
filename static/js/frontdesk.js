$(function () {
    // var createClients = function (checkin) {
    //     return '<tr><td class="col-xs-2">' + moment(clients.date).format('M/D/YY') +
    //             '</td><td class="col-xs-2">50</td><td class="col-xs-2">5</td>' +
    //             '<td class="col-xs-2">';
    // };

    // var populateClients = function () {
    //     var table = $('#clients tbody');

    //     $.ajax({
    //         url: "/api/clients",
    //         method: "GET",
    //         success: function (data) {
    //             table.empty();
    //             data.result.forEach(function (element) {
    //                 table.append(createClients(element));
    //             });
    //             console.log(data);
    //         },
    //         error: function (data) {
    //             console.error(data);
    //         }
    //     });
    // };

    // populateClients();


    $.ajax({
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
                            '<tr><td>' + checkin.date + '</td>' +
                            '<td>' + $(td).data("firstname") + '</td>' +
                            '<td>' + $(td).data("lastname") + '</td>' +
                            '<td>09/02/94</td>' + 
                            '<th>Activities Today</th>' +
                            '<td>notes <img width=10 height=10 src="http://media1.s-nbcnews.com/j/newscms/2016_14/1038581/red-dot-puzzle-before-today-160406_7042d4e863c03b4a32720f424d48501b.today-inline-large.jpg"></td>' +
                            '</tr>');
                    }
                });
            });
            
        },
        error: function (data) {
            console.error(data);
        }
    });


//     $(".tablinks").click(function (event) {
//         var currentTabID = $(this).attr('href');
//         $(currentTabID).show().siblings().hide();
//         $(this).parent('li').addClass('active').siblings().removeClass('active');
//         event.preventDefault();
//     });

//     var createPastDropIn = function (dropin) {
//         return '<tr><td class="col-xs-2">' + moment(dropin.date).format('M/D/YY') +
//                 '</td><td class="col-xs-2">50</td><td class="col-xs-2">5</td>' +
//                 '<td class="col-xs-2">';
//     };

//     var populateViewDropIn = function () {
//         var table = $('#pastdropins tbody');

//         $.ajax({
//             url: "api/dropins",
//             method: "GET",
//             success: function (data) {
//                 table.empty();
//                 data.result.forEach(function (element) {
//                     table.append(createPastDropIn(element));
//                 });
//                 console.log(data);
//             },
//             error: function (data) {
//                 console.error(data);
//             }
//         });
//     };

//     populateViewDropIn();
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


});
