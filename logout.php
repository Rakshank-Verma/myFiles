<?php
session_start();
if(isset($_SESSION['username'])){
    session_unset();
    session_destroy();
    echo json_encode(array('logout'=>'True'));
}
?>