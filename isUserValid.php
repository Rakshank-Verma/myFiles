<?php
session_start();
if(!isset($_SESSION['username'])){
    echo json_encode(array('userValid' => 'False'));
}
else{
    if($_SESSION['username'] == "rakshank_verma"){
        echo json_encode(array('userValid' => 'Admin'));
    }
    else{
        echo json_encode(array('userValid' => 'notAdmin'));
    }
}

?>