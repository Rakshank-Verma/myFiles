<?php
require 'db_connect.php';

session_start();
$username = $_SESSION['username'];

$output=[];

$FetchData = "SELECT `Files` from `$username`";
$result = mysqli_query($conn, $FetchData);

while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
}

echo json_encode(array($username, $output));

?>