<?php
require 'db_connect.php';

$input = file_get_contents('php://input');
$decode = json_decode($input, true);


$email = $decode["email"];
$username = $decode["username"];
$password = $decode["password"];
$encrypPasswd = password_hash($password, PASSWORD_DEFAULT);

$isEmail = "SELECT `email` from `users` WHERE `email` = '$email'";
$result = mysqli_query($conn, $isEmail);

if(mysqli_num_rows($result) > 0){
    echo json_encode(array('email' => 'exist'));
}
else{
    $isUsername = "SELECT `username` from `users` WHERE `username` = '$username'";
    $result = mysqli_query($conn, $isUsername);
    
    if(mysqli_num_rows($result) > 0){
        echo json_encode(array('username' => 'exist'));
    }
    else{
        $sql = "INSERT INTO `users`(`email`, `username`, `password`, `date/time`) VALUES('$email', '$username', '$encrypPasswd', now())";
        $result = mysqli_query($conn, $sql);
        
        if ($result) {
            mkdir("../Data/$username");
            $sqlQueryforDBofUser = "CREATE TABLE `$username` (`Files` varchar(255))";
            if(mysqli_query($conn, $sqlQueryforDBofUser)){
                echo json_encode(array('insert' => 'success'));
            }
        }
        else{
            echo json_encode(array('insert' => 'failed'));
        }
    }
}
?>