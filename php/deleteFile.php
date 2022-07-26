<?php
require 'db_connect.php';
$input = file_get_contents('php://input');
$decode = json_decode($input, true);

$username = $decode['username'];
$filename = $decode['file'];

$delQuery = "DELETE FROM `$username` WHERE `Files` = '$filename'";
$result = mysqli_query($conn, $delQuery);
if($result){
    unlink("../Data/$username/$filename");
    echo json_encode(array('isDelete' => 'True'));
}
else{
    echo json_encode(array('isDelete' => 'False'));
}

?>