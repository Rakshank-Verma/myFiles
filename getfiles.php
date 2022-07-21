<?php
require '../db_connect.php';
session_start();

$nameofFile = $_FILES['userfile']['name'];
$tmp_name = $_FILES['userfile']['tmp_name'];

// echo $File;
// echo $tmp_name;


$upload_dir = "Data/{$_SESSION['username']}";
// $upload_dir = "Data/rakshank_verma85";
$result1 = move_uploaded_file($tmp_name, "$upload_dir/$nameofFile");

    // Adding to Database
$sql = "INSERT INTO `{$_SESSION['username']}`(`Files`) VALUES('$nameofFile')";
$result2 = mysqli_query($conn, $sql);

// if($result1 && $result2){
//     // header("Location: index.php");
//     // echo json_encode(array('submit' => 'success'));
//     echo "success";
// }
// else{
//     echo json_encode(array('submit' => 'failed'));
// }
