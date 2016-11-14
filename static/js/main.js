$(function () {

    console.log("hello world");
    $(".menuButton").on("click", function (event) {
        $(".sideBar").toggleClass("hidden");
    })

    window.parseDate = function (dateString) {
        return dateString.replace(dateString.match(/T(\S+)/)[0], '');
    };

    // to make things available globablly
    // put them inside a function in localStorage that can
    // be used as a callback
})