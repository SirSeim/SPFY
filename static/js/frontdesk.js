$(function () {

    // $("#").click(function () {
    //     console.log("You are still on the homepage");
    //     window.location.href = "frondeskhomepage.html";
    // });

    /** /
    $.ajax({
        url: "api/casemanagers",
        method: "GET",
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
    /**/

    /**/
    $.ajax({
        url: "api/getclients",
        method: "GET",
        success: function (data) {
            console.log(data);
            console.log("result");
            console.log(data.result);
        },
        error: function (data) {
            console.log(data);
        }
    });
    /**/

    $(".tablinks").click(function (event) {
        var currentTabID = $(this).attr('href');
        $(currentTabID).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        event.preventDefault();
    });


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
                        icon: 'glyphicon glyphicon-check'
                    },
                    off: {
                        icon: 'glyphicon glyphicon-unchecked'
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
