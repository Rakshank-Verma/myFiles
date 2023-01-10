function DelAccount(){
    if(confirm("Are you sure you want to delete your Account?\nAll files will be deleted permanently!"))
    {
        fetch('php/delAccount.php')
        .then((response) => response.json())
        .then((data) => {
            if(data.DAccount === 'True'){
                document.querySelector('title').textContent = "myFiles | SignUp";
                document.getElementById("main").style.display = "none";
                document.getElementById("signup").style.display = "block";
                // document.body.style.backgroundImage = url('images/bg2.jpg');
            }
        }) 
    }
}