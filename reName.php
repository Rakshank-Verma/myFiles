<?php
require '../db_connect.php';
$input = file_get_contents('php://input');
$decode = json_decode($input, true);

$username = $decode['uname'];
$oldName = $decode['oldName'];
$newName = $decode['newName'];

$sql = "UPDATE `$username` SET `Files`='$newName' WHERE `Files`='$oldName'";
$result = mysqli_query($conn, $sql);
if($result){
    rename("Data/$username/$oldName", "Data/$username/$newName");
    echo json_encode(array('renaming' => 'True'));
}

?>