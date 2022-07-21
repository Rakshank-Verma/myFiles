function isUserValid(){
    fetch('isUserValid.php')
    .then((response) => response.json())
    .then((data) => {
        if(data.userValid === 'False'){
            location.replace('login.html');
        }
        if(data.userValid === 'Admin'){
            document.getElementById("userAdmin").style.display = "block";
        }
    })
}
isUserValid();
let uname = "";
function loadContent() {
    let username = document.getElementById("username");
    fetch('main.php')
        .then((response) => response.json())
        .then((data) => {
            let content = "";
            uname = data[0];
            username.innerText = uname;
            // console.log(data['username']);
            // console.log(data['name']);
            // console.log(data[0]);
            // console.log(data[1]);
            // let count=0;
            for (var i in data[1]) {
                let fileName = data[1][i].Files;
                // console.log(data[1][i].Files);
                content += `
                        <a id='filename' class='contitem' href='Data/${uname}/${fileName}'>${fileName}</a>
                        <a id='Download' class='contitem' href='Data/${uname}/${fileName}' download>Download</a>
                        <a id='Delete' class='delbtn' onclick="deleteFile('${fileName}')">Delete</a>
                        <div id='NewName' class='rename'>
                            <input type='button' value='Rename' class='newNameBtn' onclick='show(${i})'>
                            <form class='renameform'>
                                <input  type='text' id="newName" placeholder='New Name'>
                                <input type='hidden' id="oldName" value='${fileName}'>
                                <input onclick="rename(${i})" type='button' value='Rename'>
                            </form>
                        </div>
                        `;
            }
            document.getElementById("content").innerHTML = content;
            // document.body.innerHTML += content;

        })
}
loadContent();

function deleteFile(filename) {
    if (confirm('Are you sure you want to delete this file: ' + filename)) {
        const delData = {
            'username': uname,
            'file': filename
        }
        let jsonData = JSON.stringify(delData);
        // console.log(filename);
        fetch('deleteFile.php', {
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

// For Responsive Design
function showMenu() {
    let hamM = document.getElementById("Rmenu").style;
    if (hamM.display == "none") {
        hamM.display = "block";
        setTimeout(() => {
            document.getElementById("Logout").style.display = "block";
        }, 700);
        setTimeout(() => {
            document.getElementById("DelA").style.display = "block";
        }, 1400);
        // setTimeout(() => {
        //     document.getElementById("Users").style.display = "block";
        // }, 1900);
    } else {
        hamM.display = "none";
        document.getElementById("Logout").style.display = "none";
        document.getElementById("DelA").style.display = "none";
        document.getElementById("Users").style.display = "none";
    }

}

function rename(count) {
    let newN = document.querySelectorAll("#newName")[count].value;
    let oldN = document.querySelectorAll("#oldName")[count].value;
    // console.log(newN);
    // console.log(oldN);
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
        fetch('reName.php', {
            method: 'POST',
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
function show(count) {
    // console.log("hello");
    let newBtn = document.querySelectorAll('.newNameBtn');
    newBtn[count].style.display = "none";
    let newForm = document.querySelectorAll(".renameform");
    newForm[count].style.display = "block";
}


function submitfile(){

    // let file = document.getElementById("files").files;
    // let myForm = document.querySelector("#fileForm");
    let inpFile = document.getElementById("inpFile");
    // console.log(inpFile.files[0]);
    // let xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append('userfile', inpFile.files[0]);
    // xhr.open("post", 'getfiles.php');
    // xhr.send(formData);


    fetch('getfiles.php',{
        method : 'post',
        body : formData
    })
    .then((response) => response.text())
    .then((data) =>{
        loadContent();
    })
}

function logout(){
    if(confirm("Are you sure you want to logout?")){
        fetch('logout.php')
        .then((response) => response.json())
        .then((data) => {
            if(data.logout === 'True'){
                location.replace('login.html');
            }
        })
    }
}

function DelAccount(){
    if(confirm("Are you sure you want to delete your Account?\nAll files will be deleted permanently!"))
    {
        fetch('delAccount.php')
        .then((response) => response.json())
        .then((data) => {
            if(data.DAccount === 'True'){
                location.replace('signup.html');
            }
        }) 
    }
}