$(function () {
  var setupNavbar = function () {

      var types = JSON.parse(window.sessionStorage.notificationTypes);

      $('a').each(function(){
          if ($(this).prop('href') == window.location.href) {
              $(this).parents('li').addClass('active');
          }
      });

      var alertType = function (typeId) {
          var label = '<span class="tag tag-';
          var type = window.getDataById(types, typeId);
          if (!type || typeId === 1) {
            label += 'default';
            type.name = 'general';
          } else {
            label += type.name.toLowerCase();
          }
          label += '">' + type.name + '</span> ';
          return label;
      };

      var alertsBadge = function (number) {
          return ' <span class="tag tag-danger" id="alerts-badge">' + number + '</span>';
      };

      var newAlertItem = function (alert) {
          return '<a class="dropdown-item" href="' + alert.link + '"data-id="' + alert.id +
                  '"><input type="checkbox"> ' + alertType(alert.type) + // a typeId
                  alert.comment + '</a>';
      };

      var updateAlertsbadge = function () {
          var list = $('#alerts').children('div.dropdown-menu')
          var total = list.find('input').length;
          var checked = list.find('input:checked').length;
          $('#alerts-badge').text(total - checked);
      }

      var checkboxChange = function () {
          var jThis = $(this);
          var id = jThis.parent().data('id');
          jThis.prop('disabled', true);
          if (this.checked) {
              console.log("checked");
              $.ajax({
                  xhrFields: {
                      withCredentials: true
                  },
                  beforeSend: function (xhr) {
                      xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                  },
                  url: "/api/users/self/notifications/" + id,
                  method: "PUT",
                  data: {
                      checked: true
                  }
              }).done(function (data, textStatus, xhr) {
                  console.log(data);
                  jThis.prop('disabled', false);
                  updateAlertsbadge();
              }).fail(function (xhr, textStatus, errorThrown) {
                  console.log(xhr);
                  jThis.prop('disabled', false);
                  jThis.prop('checked', false);
                  updateAlertsbadge();
              });
          } else {
              console.log("unchecked");
              $.ajax({
                  xhrFields: {
                      withCredentials: true
                  },
                  beforeSend: function (xhr) {
                      xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                  },
                  url: "/api/users/self/notifications/" + id,
                  method: "PUT",
                  data: {
                      checked: false
                  }
              }).done(function (data, textStatus, xhr) {
                  console.log(data);
                  jThis.prop('disabled', false);
                  updateAlertsbadge();
              }).fail(function (xhr, textStatus, errorThrown) {
                  console.log(xhr);
                  jThis.prop('disabled', false);
                  jThis.prop('checked', true);
                  updateAlertsbadge();
              });
          }
      };

      var login = $('ul.nav a[href="login"]').parent();
      var alert = $('#alerts');
      var alertList = alert.children('div.dropdown-menu');
      var profile = $('#profile');
      if (typeof(Storage) !== "undefined" && localStorage.getItem("authorization")) {
          console.log("We have authorization");

          login.hide();
          alert.show();
          alertList.empty();
          profile.show();

          $.ajax({
              xhrFields: {
                  withCredentials: true
              },
              beforeSend: function (xhr) {
                  xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
              },
              url: "/api/users/self/notifications",
              method: "GET"
          }).done(function (data, textStatus, xhr) {
              console.log(data);
              var local = alert.find('a');
              local.empty();
              local.append('Alerts');
              if (data.result.length) {
                  local.append(alertsBadge(data.result.length));
              }
              alert.children('div.dropdown-menu').empty();
              for (var i = 0; i < data.result.length; i++) {
                  alertList.append(newAlertItem(data.result[i]))
              }
              alertList.find('input[type="checkbox"]').change(checkboxChange);
          }).fail(function (xhr, textStatus, errorThrown) {
              console.log(xhr);

              if (xhr.status === 401) {
                  localStorage.removeItem("authorization");
                  login.show();
                  alert.hide();
                  profile.hide();
              }
          });
      } else {
          console.log("We not special");

          login.show();
          alert.hide();
          alertList.empty();
          profile.hide();
      }

      $('#logout').click(function () {
          localStorage.removeItem("authorization");
          var rawWords = window.location.href.split("/");
          window.location = rawWords[0] + "//" + rawWords[2] + "/";
      });
  };

  if (window.sessionStorage.notificationTypes) {
      setupNavbar();
  } else {
      window.sessionStorageListeners.push({
          ready: setupNavbar
      });
  }
// this is a test for getUsersNotificationsById
  //   $.ajax({
  //     xhrFields: {
  //         withCredentials: true
  //     },
  //     beforeSend: function (xhr) {
  //         xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
  //     },
  //     url: "/api/users/" + 1 + "/notifications",
  //     method: "GET"
  // }).done(function (data, textStatus, xhr) {
  //     console.log(data);
  //     var local = alert.find('h5');
  //     local.empty();
  //     local.append('Alerts');
  //     if (data.result.length) {
  //         local.append(alertsBadge(data.result.length));
  //     }
  //     local.append(' <span class="fa fa-sort-down drop-arrow"></span>');
  //
  //     for (var i = 0; i < data.result.length; i++) {
  //         alertList.append(newAlertItem(data.result[i]))
  //     }
  // }).fail(function (xhr, textStatus, errorThrown) {
  //     console.log(xhr);
  //
  //     if (xhr.status === 401) {
  //         localStorage.removeItem("authorization");
  //         login.show();
  //         alert.hide();
  //     }
  //   });

// this is a test for createUsersNotificationsById
  //   var data = {
  //       type: 'general',
  //       comment: 'Test notification for createUsersNotificationsById',
  //       link: '/frontdesk',
  //       checked: false
  //   }
  //   $.ajax({
  //     xhrFields: {
  //         withCredentials: true
  //     },
  //     beforeSend: function (xhr) {
  //         xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
  //     },
  //     url: "/api/users/" + 1 + "/notifications",
  //     method: "POST",
  //     data: data,
  // }).done(function (data, textStatus, xhr) {
  //     console.log(data);
  //     var local = alert.find('h5');
  //     local.empty();
  //     local.append('Alerts');
  //     if (data.result.length) {
  //         local.append(alertsBadge(data.result.length));
  //     }
  //     local.append(' <span class="fa fa-sort-down drop-arrow"></span>');

  //     for (var i = 0; i < data.result.length; i++) {
  //         alertList.append(newAlertItem(data.result[i]))
  //     }
  // }).fail(function (xhr, textStatus, errorThrown) {
  //     console.log(xhr);

  //     if (xhr.status === 401) {
  //         localStorage.removeItem("authorization");
  //         login.show();
  //         alert.hide();
  //     }
  //   });
});
