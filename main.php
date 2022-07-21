<?php
require '../db_connect.php';
// $name = "rakshank verma";
session_start();
$username = $_SESSION['username'];

$output=[];

$FetchData = "SELECT `Files` from `$username`";
$result = mysqli_query($conn, $FetchData);
// if($result){echo "Success";}
while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
}
// echo $username;
// echo json_encode(array('username'=>$username, 'name'=>$name));
echo json_encode(array($username, $output));
// echo json_encode($output);

?>