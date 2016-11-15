$(function () {

    // functions and requests to cache data globally
    // to be accessed from anywhere in the app
    
    window.parseDate = function (dateString) {
        return dateString.replace(dateString.match(/T(\S+)/)[0], '');
    };

    
    window.setTimeout(function () {  
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "api/statuses",
            method: "GET",
            success: function (data) {
                console.log(data);
                window.sessionStorage.statuses = JSON.stringify(data.result);
            },
            error: function (xhr) {
                console.error(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            },
        });
    }, 0); // found this trick on a js conference video
           // from what I could gather this setTimeout reprioritizes
           // this callback in javascript's callback queue and event loop
           // allowing it to be run on the call stack earlier

})