<?php
session_start();
if(isset($_SESSION['username'])){
    echo json_encode(array('logged'=>'True'));
}
else{
    echo json_encode(array('logged'=>'False'));
}


?>