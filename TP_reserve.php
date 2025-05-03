<?php  // 회원 예약 정보 json 파일에 저장

function test_input($data) {
    $data = ltrim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$reserveArray;

$rstr1 = test_input($_POST['idVal']);
$rstr2 = test_input($_POST['designerVal']);
$rstr3 = test_input($_POST['dayVal']);
$rstr4 = test_input($_POST['dayOfWeekVal']);
$rstr5 = test_input($_POST['reserveTimeVal']);
$rstr6 = test_input($_POST['designNameVal']);
$rstr7 = test_input($_POST['designTimeVal']);

if(isset($_POST['idVal'])) {
    $reserveFile = fopen("data/reserve.json", "a");

    $reserveArray = array("id" => $rstr1, "designer" => $rstr2, "day" => $rstr3, "dayOfWeek" => $rstr4, "reserveTime" => $rstr5, "designName" => $rstr6, "designTime" => $rstr7);
    
    fwrite($reserveFile, json_encode($reserveArray, JSON_UNESCAPED_UNICODE));
    fwrite($reserveFile, "\n");

}
    
fclose($reserveFile);

?>