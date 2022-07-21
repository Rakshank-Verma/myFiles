<?php
require '../db_connect.php';

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
            mkdir("Data/$username");
            $sqlQueryforDBofUser = "CREATE TABLE `$username` (`Files` varchar(255))";
            if(mysqli_query($conn, $sqlQueryforDBofUser)){
                // header("Location:index.php");
                echo json_encode(array('insert' => 'success'));
            }
        }
        else{
            echo json_encode(array('insert' => 'failed'));
        }
    }
}


// echo $email;

// session_start();
// if(isset($_SESSION['username']))
// {
//     header("Location:Login.php");
// }
// $error = false;
// $isEmail=0;
// $isUsername=0;
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $email = $_POST["email"];
//     $username = $_POST["username"];
//     $password = $_POST["password"];

//     if (empty($email) || empty($username) || empty($password)) {
//         $error = true;
//     } 
//     else {

//         $checkEmail = "SELECT `email` FROM `users` WHERE `email` = '$email'";
//         $existEmail = mysqli_query($conn, $checkEmail);
//         $isEmail = mysqli_num_rows($existEmail);
        
//         $checkUname = "SELECT `username` FROM `users` WHERE `username` = '$username'";
//         $existUname = mysqli_query($conn, $checkUname);
//         $isUsername = mysqli_num_rows($existUname);

//         if ($isEmail == 0 && $isUsername == 0) {
//             $encrypPasswd = password_hash($password, PASSWORD_DEFAULT);
//             $sql = "INSERT INTO `users`(`email`, `username`, `password`, `date/time`) VALUES('$email', '$username', '$encrypPasswd', now())";

//             $result = mysqli_query($conn, $sql);
//             if ($result) {
//                 // echo "details added successfully";
//                 mkdir("Data/$username");
//                 $sqlQueryforDBofUser = "CREATE TABLE `$username` (`Files` varchar(100))";
//                 if(mysqli_query($conn, $sqlQueryforDBofUser)){
//                     header("Location:index.php");
//                 }
//             }
//         }
//     }
// }
// ?>