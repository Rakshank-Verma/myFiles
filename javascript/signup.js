
const form = document.getElementById("signupForm");
const subBtn = document.getElementById("submit");

subBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if(username.includes("<script>") && password.includes("<script>")){
        alert("Do not use this tricks here");
    }
    else{
        if (email == "" || username == "" || password == "") {
            document.getElementById("alert1").style.display = "flex";
            setTimeout(() => {
                document.getElementById("alert1").style.animationName = "alert1";
                document.getElementById("alert1").style.animationDuration = 2000;
                document.getElementById("alert1").style.animationTimingFunction = "ease";
            }, 3000);
    
            setTimeout(() => {
                document.getElementById("alert1").style.display = "none";
            }, 4000);
        }
        else {
    
            form.reset();
            const formData = {
                'email': email,
                'username': username,
                'password': password
            }
        
            const jsonData = JSON.stringify(formData);
    
            fetch('php/signup.php', {
                method: 'POST',
                body: jsonData,
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.email == 'exist') {
                    document.getElementById("alert2").style.display = "flex";
                    setTimeout(() => {
                        document.getElementById("alert2").style.animationName = "alert2";
                        document.getElementById("alert2").style.animationDuration = 2000;
                        document.getElementById("alert2").style.animationTimingFunction = "ease";
                    }, 3000);
    
                    setTimeout(() => {
                        document.getElementById("alert2").style.display = "none";
                    }, 4000);
                }
    
                else if (data.username == 'exist') {
                    document.getElementById("alert3").style.display = "flex";
                    setTimeout(() => {
                        document.getElementById("alert3").style.animationName = "alert3";
                        document.getElementById("alert3").style.animationDuration = 2000;
                        document.getElementById("alert3").style.animationTimingFunction = "ease";
                    }, 3000);
                    setTimeout(() => {
                        document.getElementById("alert3").style.display = "none";
                    }, 4000);
                }
                
                else {
                    document.body.style.backgroundImage = "../images/bg.png"
                    document.querySelector('title').textContent = "myFiles | Login";
                    document.getElementById("login").style.display = "block";
                    document.getElementById("signup").style.display = "none";
                    document.body.style.backgroundImage = "url('images/bg2.jpg')";     
                }
            })
        }
    }
})
