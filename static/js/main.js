$(function () {

    // functions and requests to cache data globally
    // to be accessed from anywhere in the app
    
    window.parseDate = function (dateString) {
        return dateString.replace(dateString.match(/T(\S+)/)[0], '');
    };

        
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
            window.localStorage.statuses = JSON.stringify(data.result);
        },
        error: function (xhr) {
            console.error(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
            }
        },
        async: false // now ajax call is synchronous and can block the page load
    });

})