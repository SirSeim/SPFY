$(function () {

    console.log("hello world");
    $(".menuButton").on("click", function (event) {
        $(".sideBar").toggleClass("hidden");
    })

})