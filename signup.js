function isUserValid(){
    fetch('isUserValid.php')
    .then((response) => response.json())
    .then((data) => {
        if(data.userValid === 'False'){
            location.replace('login.html');
            // document.getElementById("login").style.display = "block";
        }
    })
}
isUserValid();


const form = document.getElementById("signupForm");
const subBtn = document.getElementById("submit");

subBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // console.log(email);
    // console.log(username);
    // console.log(password);
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
        // console.log(formData['email']);
        const jsonData = JSON.stringify(formData);
        fetch('signup.php', {
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
                location.replace('login.html');
            }
        })
    }
})
