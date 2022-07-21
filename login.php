<?php
require '../db_connect.php';
$input = file_get_contents('php://input');
$decode = json_decode($input, true);

$username = $decode["username"];
$password = $decode["password"];

// $sql = "SELECT `username`, `password` from `users` WHERE `username` = '$username' AND `password` = '$password'";
$sql = "SELECT `username`, `password` from `users` WHERE `username` = '$username'";
$result = mysqli_query($conn, $sql);


if(mysqli_num_rows($result) == 0){
    echo json_encode(array('Found' => 'False'));
}
else{
    while($row = mysqli_fetch_assoc($result)){
        if(password_verify($password, $row['password'])){
            session_start();
            $_SESSION['username'] = $username;
            echo json_encode(array('Found' => 'True') ); 
        }
        else{
            echo json_encode(array('Found' => 'False'));
        }
    }
}





// $isUsername = true;
// $isPassword = true;
// session_start();
// if (isset($_SESSION['username'])) {
//     header("Location:index.php");
// }
// if (isset($_POST['Login'])) {
//     require 'db_connect.php';
//     $Username = $_POST['username'];
//     $Password = $_POST['password'];
//     $sqlDBcheck = "SELECT * FROM `users` WHERE `username` = '$Username'";
//     $isExist = mysqli_query($conn, $sqlDBcheck);
//     if (mysqli_num_rows($isExist) > 0) {
//         while ($row = mysqli_fetch_assoc($isExist)) {
//             if (password_verify($Password, $row['password'])) {
//                 session_start();
//                 $_SESSION['username'] = $row['username'];
//                 $_SESSION['email'] = $row['email'];
//                 $_SESSION['password'] = $row['password'];
//                 header("Location: index.php");
//             } else {
//                 $isPassword = false;
//             }
//         }
//     } else {
//         $isUsername = false;
//     }
// }
?>