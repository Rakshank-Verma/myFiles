<?php
require 'db_connect.php';
$input = file_get_contents('php://input');
$decode = json_decode($input, true);

$username = $decode["username"];
$password = $decode["password"];

$sql = "SELECT `username`, `password` from `users` WHERE `username` = '$username'";
$result = mysqli_query($conn, $sql);


if(mysqli_num_rows($result) == 0){
    echo json_encode(array('Found' => 'False'));
}
else if(mysqli_num_rows($result) == 1){
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
?>