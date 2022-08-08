type = ['primary', 'info', 'success', 'warning', 'danger'];
demo={ showNotification: function (from, align, message, color = Math.floor((Math.random() * 4) + 1)) {

    $.notify({
      icon: "tim-icons icon-bell-55",
      message
    
    }, {
      type: type[color],
      timer: 1000,
      placement: {
        from: from,
        align: align
      },
      z_index: 2147483648,
    });
    }
    }