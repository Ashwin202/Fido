function logOut () {
    fetch(`/api/logout/`, {
       method: "POST",
       headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
       },
    })
       .then((response) => response.json())
       .then((response) => {
        alert(JSON.stringify(response))
           demo.showNotification("left", "bottom", response.message)
           if(!response.error){
                sessionStorage.removeItem('token')
                setTimeout(()=>{
                    window.location.href = "/login"
                }, 500)
           }
        return;
       });
}


