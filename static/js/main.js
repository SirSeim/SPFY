$(function () {

    // functions and requests to cache data globally
    // to be accessed from anywhere in the app
    
    window.parseDate = function (dateString) {
        return dateString.replace(dateString.match(/T(\S+)/)[0], '');
    };

    window.getDataById = function (arrayOfObjects, id) {
        return arrayOfObjects.filter(function (obj) { 
            if (obj.id === id) {
                return obj;
            } 
        })[0];
    };

    // data - data to be stored in <tr> with data()
    // display - array of content (strings) to display in each <td> 
    window.buildRow = function (data, display) {
        var dataString = "";
        var tdString = "";
        for (var property in data) {
            dataString += 'data-' + property.toLowerCase() + '="' + data[property] + '" ';
        }
        display.forEach(function (column) {
            tdString += '<td>' + column + '</td>';
        });
        return '<tr ' + dataString + '>' + tdString + '</tr>';
    };

    window.sessionStorageListeners = [];

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: "api/notifications/types",
        method: "GET",
        success: function (data) {
            console.log(data);
            window.sessionStorage.notificationTypes = JSON.stringify(data.result);
            window.sessionStorageListeners.forEach(function (listener) {
                listener.ready();
            });
        },
        error: function (xhr) {
            console.error(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
            }
        }
    });

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
            window.sessionStorageListeners.forEach(function (listener) {
                listener.ready();
            });
        },
        error: function (xhr) {
            console.error(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
            }
        },
    });

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: "api/flags",
        method: "GET",
        success: function (data) {
            console.log(data);
            window.sessionStorage.flags = JSON.stringify(data.result);
            window.sessionStorageListeners.forEach(function (listener) {
                listener.ready();
            });
        },
        error: function (xhr) {
            console.error(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
            }
        },
    });

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: "api/clients",
        method: "GET",
        success: function (data) {
            console.log(data);
            window.sessionStorage.clients = JSON.stringify(data.result);
            window.sessionStorageListeners.forEach(function (listener) {
                listener.ready();
            });
        },
        error: function (xhr) {
            console.error(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
            }
        }
    });
})