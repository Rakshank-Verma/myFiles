function logout(){
    if(confirm("Are you sure you want to logout?")){
        fetch('php/logout.php')
        .then((response) => response.json())
        .then((data) => {
            if(data.logout === 'True'){
                document.querySelector('title').textContent = "myFiles | Login";
                document.getElementById("login").style.display = "block";
                document.getElementById("main").style.display = "none";
                document.body.style.backgroundImage = "url('images/bg2.jpg')";
            }
        })
    }
}