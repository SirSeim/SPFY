$(function () {
    var alertType = function (type) {
        var label = '<span class="label label-';
        var types = [
            "default",
            "primary",
            "success",
            "info",
            "warning",
            "danger"
        ];
        if (types.indexOf(type.toLowerCase()) !== -1) {
            label += type.toLowerCase();
        } else {
            label += types[0];
        }
        label += '">' + type + '</span> ';
        return label;
    };

    var alertsBadge = function (number) {
        return ' <span class="tag-pill">' + number + '</span>';
    };

    var newAlertItem = function (alert) {
        return '<li><a href="' + alert.link + '">' + alertType(alert.type) +
                alert.comment + '</a></li>';
    }


    var login = $('ul.nav a[href="login"]').parent();
    var alert = $('#alerts');
    var alertList = alert.children('ul.dropdown-menu');
    if (typeof(Storage) !== "undefined" && localStorage.getItem("authorization")) {
        console.log("We have authorization");

        login.hide();
        alert.show();
        alertList.empty();

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: "/api/users/notifications",
            method: "GET"
        }).done(function (data, textStatus, xhr) {
            var local = alert.find('h5');
            local.empty();
            local.append('Alerts');
            if (data.result.length) {
                local.append(alertsBadge(data.result.length));
            }
            // local.append(' <span class="fa fa-sort-down drop-arrow"></span>');

            for (var i = 0; i < data.result.length; i++) {
                alertList.append(newAlertItem(data.result[i]))
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            console.log(xhr);

            if (xhr.status === 401) {
                localStorage.removeItem("authorization");
                login.show();
                alert.hide();
            }
        });
    } else {
        console.log("We not special");

        login.show();
        alert.hide();
        alertList.empty();
    }
});