function isUserValid(){
    fetch('php/session.php')
    .then((response) => response.json())
    .then((data) => {
        if(data.logged == 'False'){
            // document.body.style.backgroundImage = "url('images/bg2.jpg')";
            document.querySelector('title').textContent = "myFiles | Login";
            document.getElementById("login").style.display = "block";
            document.getElementById("signup").style.display = "none";
            document.getElementById("main").style.display = "none";
        }
        if(data.logged == 'True'){
            // document.body.style.backgroundImage = "url('images/bg.png')";
            document.getElementById("login").style.display = "none";
            document.getElementById("signup").style.display = "none";
            document.getElementById("main").style.display = "block";
            loadContent();
        }
    })
}
isUserValid();

let uname = "";
function loadContent() {
    let username = document.getElementById("username");
    let usernameInNav = document.getElementById("mob-nav-username");

    fetch('php/main.php')
        .then((response) => response.json())
        .then((data) => {
            let content = "";
            uname = data[0];
            usernameInNav.innerText = uname;
            username.innerText = uname;
        
            for (var i in data[1]) {
                let fileName = data[1][i].Files;

                content += `<div class="content">
                                <img class="content-item" src="images/file.png" alt="">
                                <a class="content-item filename" href='Data/${uname}/${fileName}'>${fileName}</a>
                                <a class="content-item Download" href='Data/${uname}/${fileName}' download>Download</a>
                                <a class="content-item Delete" onclick="deleteFile('${fileName}')">Delete</a>
                            </div>`;
            }
            document.getElementById("container").innerHTML = content;

        })
}

function LogIN(){

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const formData = {
        'username' : username,
        'password' : password
    }
    const jsonData = JSON.stringify(formData);
    fetch('php/login.php',{
        method : 'post',
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
            // document.body.style.backgroundImage = "url('images/bg.png')";
            document.getElementById("signup").style.display = "none";
            document.getElementById("main").style.display = "block";
            document.getElementById("login").style.display = "none";
            document.querySelector('title').textContent = "myFiles";
            document.querySelector("#loginForm").reset();
            loadContent();
        }
    })
}


function deleteFile(filename) {
    if (confirm('Are you sure you want to delete this file: ' + filename)) {
        const delData = {
            'username': uname,
            'file': filename
        }
        let jsonData = JSON.stringify(delData);
        fetch('php/deleteFile.php', {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.isDelete == 'True') {
                    loadContent();
                }
            })
    }
}


// function rename(count) {
//     let reg = /[<>.]/g;
//     let newN = document.querySelectorAll(".newName")[count].value;
//     let oldN = document.querySelectorAll(".oldName")[count].value;

//     if(reg.test(newN)){
//         alert("Characters used in this new name is not valid.");
//         newN = "";
//     }
//     else{
//         if (newN == "") {
//             let newBtn = document.querySelectorAll('.newNameBtn');
//             newBtn[count].style.display = "block";
//             let newForm = document.querySelectorAll(".renameform");
//             newForm[count].style.display = "none";
//         }
//         else{
//             let fileData = {
//                 'newName': newN,
//                 'oldName': oldN,
//                 'uname' : uname
//             }
//             let jsonData = JSON.stringify(fileData);
//             fetch('php/reName.php', {
//                 method: 'post',
//                 body: jsonData,
//                 headers: {
//                     'Content-type':'application/json',
//                 }
//             })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.renaming == 'True') {
//                     loadContent();
//                 }
//             })
//         }
//     }
// }

function submitfile(){

    let inpFile = document.getElementById("inpFile");
    let totalfiles = document.getElementById("inpFile").files.length;
    // console.log(inpFile.files[0]);
    let formData = new FormData();
    for(var i=0; i<totalfiles; i++){
        if(inpFile.files[i].size > 10000000){
            alert(inpFile.files[i].name + "'s size exceeds 30MB.\nUnable to upload this file.");
        }
        else{
            formData.append('userfile[]', inpFile.files[i]);
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.open("post", 'php/getfiles.php');

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("progress-Bar").style.display = "none";
            document.querySelector("#fileForm").reset();
            loadContent();
        }
    }
    xhr.upload.addEventListener("progress", ({total, loaded}) => {
        let uploadPercentage = Math.floor((loaded/total)*100);
        let totalSize = (total/(1024*1024)).toFixed(2);
        document.getElementById("progress-Bar").style.display = "block";
        document.getElementById("progress").style.width = uploadPercentage + "%";
        document.getElementById("upload-progress").innerText = uploadPercentage + "%";
        document.getElementById("totalSize").innerText = totalSize + "MB";
    });
    xhr.send(formData);
    

    // fetch('php/getfiles.php',{
    //     method : 'post',
    //     body : formData
    // })
    // .then((response) => response.text())
    // .then((data) =>{
    //     document.querySelector("#fileForm").reset();
    //     loadContent();
    // })
}