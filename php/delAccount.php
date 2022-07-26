<?php
require 'db_connect.php';
session_start();
$username = $_SESSION['username'];
$fetchFiles = "SELECT * FROM `$username`";
$result = mysqli_query($conn, $fetchFiles);
while($files = mysqli_fetch_assoc($result)){
    unlink("../Data/$username/{$files['Files']}");
}
rmdir("../Data/$username");
$delQuery = "DROP TABLE `$username`";
mysqli_query($conn, $delQuery);
$delQuery1 = "DELETE FROM `users` WHERE `username` = '$username'";
mysqli_query($conn, $delQuery1);
session_unset();
session_destroy();
echo json_encode(array('DAccount' => 'True'));
?>