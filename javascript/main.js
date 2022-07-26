function isUserValid(){
    fetch('php/session.php')
    .then((response) => response.json())
    .then((data) => {
        if(data.logged == 'False'){
            document.body.style.backgroundImage = "url('images/bg2.jpg')";
            document.querySelector('title').textContent = "myFiles | Login";
            document.getElementById("login").style.display = "block";
            document.getElementById("signup").style.display = "none";
            document.getElementById("main").style.display = "none";
        }
        if(data.logged == 'True'){
            document.body.style.backgroundImage = "url('images/bg.png')";
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
    let usernameInNav = document.getElementById("usernameInNav");
    fetch('php/main.php')
        .then((response) => response.json())
        .then((data) => {
            let content = "";
            uname = data[0];
            usernameInNav.innerText = uname;
            username.innerText = uname;
            for (var i in data[1]) {
                let fileName = data[1][i].Files;

                content += `<div id="content-container">
                        <a id='filename' class='contitem' href='Data/${uname}/${fileName}'>${fileName}</a>
                        <a id='Download' class='contitem' href='Data/${uname}/${fileName}' download>Download</a>
                        <a id='Delete' class='delbtn' onclick="deleteFile('${fileName}')">Delete</a>
                        <div id='NewName' class='rename'>
                            <input type='button' value='Rename' class='newNameBtn' onclick='show(${i})'>
                            <form class='renameform'>
                                <input  type='text' class="newName" placeholder='New Name'>
                                <input type='hidden' class="oldName" value='${fileName}'>
                                <input class="rename-btn" onclick="rename(${i})" type='button' value='Rename'>
                            </form>
                        </div>
                        </div>`;
            }
            document.getElementById("content").innerHTML = content;

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
            document.body.style.backgroundImage = "url('images/bg.png')"
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


function rename(count) {
    let newN = document.querySelectorAll(".newName")[count].value;
    let oldN = document.querySelectorAll(".oldName")[count].value;

    if(newN.includes("<script>") || newN.includes("print")){
        alert("Rename operation failed.\n Don't use silly tricks here.");
        newN = "";
    }
    else{
        if (newN == "") {
            let newBtn = document.querySelectorAll('.newNameBtn');
            newBtn[count].style.display = "block";
            let newForm = document.querySelectorAll(".renameform");
            newForm[count].style.display = "none";
        }
        else{
            let fileData = {
                'newName': newN,
                'oldName': oldN,
                'uname' : uname
            }
            let jsonData = JSON.stringify(fileData);
            fetch('php/reName.php', {
                method: 'post',
                body: jsonData,
                headers: {
                    'Content-type':'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.renaming == 'True') {
                    loadContent();
                }
            })
        }
    }
}

function submitfile(){

    let inpFile = document.getElementById("inpFile");
    let totalfiles = document.getElementById("inpFile").files.length;
    // console.log(inpFile.files[0]);
    // let xhr = new XMLHttpRequest();
    let formData = new FormData();
    for(var i=0; i<totalfiles; i++){
        formData.append('userfile[]', inpFile.files[i]);
    }
    // xhr.open("post", 'getfiles.php');
    // xhr.send(formData);


    fetch('php/getfiles.php',{
        method : 'post',
        body : formData
    })
    .then((response) => response.text())
    .then((data) =>{
        document.querySelector("#fileForm").reset();
        loadContent();
    })
}