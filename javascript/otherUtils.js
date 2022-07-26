function redirect() {
    document.querySelector('title').textContent = "myFiles | SignUp";
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.body.style.backgroundImage = "url('images/bg2.jpg')";
}

function show(count) {
    let newBtn = document.querySelectorAll('.newNameBtn');
    newBtn[count].style.display = "none";
    let newForm = document.querySelectorAll(".renameform");
    newForm[count].style.display = "block";
}

function showMenu() {
    let hamM = document.getElementById("Rmenu").style;
    if (hamM.display == "block") {
        hamM.display = "none";
        document.getElementById("Logout").style.display = "none";
        document.getElementById("DelA").style.display = "none";
        // document.getElementById("Users").style.display = "none";
    } else {
        hamM.display = "block";
        setTimeout(() => {
            document.getElementById("Logout").style.display = "block";
        }, 700);
        setTimeout(() => {
            document.getElementById("DelA").style.display = "block";
        }, 1400);
    }
}