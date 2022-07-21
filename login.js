const form = document.getElementById("loginForm");

function redirect() {
    location.replace('signup.html');
}

document.getElementById("loginBtn").addEventListener('click', (e)=>{
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const formData = {
        'username' : username,
        'password' : password
    }
    const jsonData = JSON.stringify(formData);
    fetch('login.php',{
        method : 'POST',
        body : jsonData,
        headers : {
            'Content-type' : 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) =>{
        if(data.Found === 'False'){
            document.getElementById("alert").style.display = "flex";
            setTimeout(() => {
                document.getElementById("alert").style.animationName = "alert2";
                document.getElementById("alert").style.animationDuration = 2000;
                document.getElementById("alert").style.animationTimingFunction = "ease";
            }, 3000);
    
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 4000);
        }

        if(data.Found === 'True'){
            location.replace('main.html');
            // document.getElementById("username").innerHTML = `${username}`;
        }
    })
})