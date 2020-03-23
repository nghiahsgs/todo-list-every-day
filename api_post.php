<?php
$json=$_POST['data'];
// echo $json;
file_put_contents('./todo.json',$json);
?>