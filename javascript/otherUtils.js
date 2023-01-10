function redirect() {
    document.querySelector('title').textContent = "myFiles | SignUp";
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
    // document.body.style.backgroundImage = "url('images/bg2.jpg')";
}

function show(count) {
    let newBtn = document.querySelectorAll('.newNameBtn');
    newBtn[count].style.display = "none";
    let newForm = document.querySelectorAll(".renameform");
    newForm[count].style.display = "block";
}

// function showMenu() {
//     let hamM = document.getElementById("Rmenu").style;
//     if (hamM.display == "block") {
//         hamM.display = "none";
//         document.getElementById("Logout").style.display = "none";
//         document.getElementById("DelA").style.display = "none";
//         // document.getElementById("Users").style.display = "none";
//     } else {
//         hamM.display = "block";
//         setTimeout(() => {
//             document.getElementById("Logout").style.display = "block";
//         }, 700);
//         setTimeout(() => {
//             document.getElementById("DelA").style.display = "block";
//         }, 1400);
//     }
// }

function ToggleMode(){
    let content = document.getElementsByClassName("content");
    let filename = document.getElementsByClassName("filename");
    let modechngicon = document.getElementById('mode-chng-icon');
    if (modechngicon.src == 'http://localhost/PHP/Files_on_cloud/myFiles/images/dark-mode.png') {
        modechngicon.src = "images/light-mode.png";
        document.body.style.backgroundColor = "#171717";
        for (let i = 0; i < content.length; i++) {
            filename[i].style.color = "white";
            content[i].style.backgroundColor = "#28282B";
            content[i].style.boxShadow = "0px 0px 6px 2px white";
        }
    }
    else {
        modechngicon.src = "images/dark-mode.png";
        document.body.style.backgroundColor = "white";
        for (let i = 0; i < content.length; i++) {
            filename[i].style.color = "black";
            content[i].style.backgroundColor = "#fbf0da";
            content[i].style.boxShadow = "0px 0px 6px 2px grey";
        }
    }
};


function openMenu() {
    let menu = document.getElementById("nav-links");
    if (menu.style.display == "block") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "block";
    }
}
