<?php
require '../db_connect.php';
$sql = "SELECT * from `users`";
$result = mysqli_query($conn, $sql);
$data = [];
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
        // echo "{$row['username']}" . "  " . "{$row['email']}<br>";
    }
}
// $marks = count($data);
// for ($i = 0; $i < $marks; ++$i) {
//     echo $data[$i]['username'] . ' ' . $data[$i]['email'] . "\n";
// }
echo json_encode($data);
?>