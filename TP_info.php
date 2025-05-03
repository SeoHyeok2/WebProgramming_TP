<?php

$file = fopen("data/info.json", "r");
$data = array();
while(!feof($file)) {
    $line = fgets($file);
    if($line != null) {
        $json = json_decode($line, true);
        array_push($data, $json);
    }
}
fclose($file);
header('Content-type: application/json');
echo json_encode($data);

?>