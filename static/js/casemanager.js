$(function (event) {

    $("#addcasenote").click(function () {
        console.log("added new case note");
        window.location.href = "casenotepage.html";
    });

    $(".tablinks").click(function (event) {
        var currentTabID = $(this).attr('href');
        $(currentTabID).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        event.preventDefault();
    });

});