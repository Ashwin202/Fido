color= ["#121212", "#3498db;", "teal", "f1c40f", "#e74c3c"]
demo = {
    showNotification(from, align, message, selcolor = Math.floor((Math.random() * 4) + 1)) {
        Toastify({
            text: message,
            backgroundColor: color[selcolor],
            position: from, //left,right
            gravity: align, //bottom,top
            duration: 1500,
            ariaLive: "polite",
            offset: {
                x: 30, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 5 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },style:{
                width:"18%"
            },
        }).showToast();
    }
}