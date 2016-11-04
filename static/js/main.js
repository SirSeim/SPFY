$(function () {

    console.log("hello world");
    $(".menuButton").on("click", function (event) {
        $(".sideBar").toggleClass("hidden");
    })

    window.parseDate = function (dateString) {
        return dateString.replace(dateString.match(/T(\S+)/)[0], '');
    };
})