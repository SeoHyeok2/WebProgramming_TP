<?php  // 미용실 정보 json 파일에 저장

function test_input($data) {
    $data = ltrim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$infoArray;

$infoFile = fopen("data/info.json", "a");

$istr1 = test_input($_POST['addressVal']);
$istr2 = test_input($_POST['telVal']);

$infoArray = array("address" => $istr1, "tel" => $istr2);

fwrite($infoFile, json_encode($infoArray, JSON_UNESCAPED_UNICODE));
fwrite($infoFile, "\n");

fclose($infoFile);

?>
