$(function (event) {

    // Should we consider storing the information relevant
    // for that paricular day within the frontend?
    // i.e. each time the system starts a new drop-in (or Michelle
    // creates a new drop-in day, information such as the drop-in ID
    // and the ID's for each activity during that drop-in are stored
    // in the frontend somwhere) - reduces ajax calls to retrieve information
    // var selecteditems = [];
    
    var selectedclients = [];

    var getClientsByID = function (clients) {
        var ids = [];
        for (var i = 0; i < selectedclients.length; i++) {
            ids.push(parseInt(selectedclients[i][0]));
        }
        console.log("ids");
        console.log(ids);
        console.log("clients");
        console.log(clients);
        for (var i = 0; i < clients.length; i++) {
            if (ids.indexOf(clients[i].id) !== -1) {
                $('#selected-clients').append('<li class="list-group-item client">' 
                        + clients[i].firstName + ' ' 
                        + clients[i].lastName + ' '
                        + 'id: ' + clients[i].id 
                        + '</li>');
            }
        }
    };

    var refreshSelectedClients = function () {
        console.log("inside refreshSelected");
        console.log(selectedclients);
        $.ajax({
            url: "api/clients",
            method: "GET",
            success: function (data) {
                console.log(data);
                $('#selected-clients').empty();
                getClientsByID(data.result);
            },
            error: function (data) {
                console.error(data);
            }
        });
    };

    $('#clients').delegate("td", "click", function () {
        // alert("client selected here");
        console.log($(this)[0].innerText.match(/[0-9]+/));
        // need a better way of doing this
        // How will we know which client id this name corresponds
        // to without making another request and building a separate query?
        selectedclients.push($(this)[0].innerText.match(/[0-9]+/));
        refreshSelectedClients();
    });

    // $.ajax({
    //     url: "api/dropins",
    //     method: "GET",
    //     success: function (data) {
    //         console.log("drop-ins");
    //         console.log(data);
    //     },
    //     error: function (data) {
    //         console.error(data);
    //     }
    // });

    // $.ajax({
    //     url: "api/dropins/" + currentDropIn.id + "/activities",
    //     method: "GET",
    //     success: function (data) {
    //         console.log("inside activities success");
    //         console.log(data);
    //     },
    //     error: function (data) {
    //         console.error(data);
    //     }
    // });
    
    // $(".list-group-item.activity").click(function (event) {
    //     alert("clicked");
    //     selecteditems.push(this);
    //     console.log(selecteditems);
    // });

});