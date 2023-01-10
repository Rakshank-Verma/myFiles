<?php
require 'db_connect.php';
session_start();

$countfiles = count($_FILES['userfile']['name']);
for($i=0; $i<$countfiles; $i++){
        $nameofFile = $_FILES['userfile']['name'][$i];
        $tmp_name = $_FILES['userfile']['tmp_name'][$i];
        
        $upload_dir = "../Data/{$_SESSION['username']}";
        
        $result1 = move_uploaded_file($tmp_name, "$upload_dir/$nameofFile");
        
            // Adding to Database
        $sql = "INSERT INTO `{$_SESSION['username']}`(`Files`) VALUES('$nameofFile')";
        $result2 = mysqli_query($conn, $sql);
}