<?php  // 디자이너 정보 json 파일에 저장

function test_input($data) {
    $data = ltrim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$designerArray;

$dstr1 = test_input($_POST['designerNameVal']);
$dstr2 = $_POST['designsArrVal'];
$dstr3 = $_POST['costsArrVal'];
$dstr4 = $_POST['explainsArrVal'];
$dstr5 = $_POST['timesArrVal'];

if(isset($_POST['designerNameVal'])) {
    $designerFile = fopen("data/designers.json", "a");

    for($i=0 ; $i<count($dstr2) ; $i++) {
        $designerArray = array("name" => $dstr1, "design" => $dstr2[$i], "cost" => $dstr3[$i], "explain" => $dstr4[$i], "time" => $dstr5[$i]);
    
        fwrite($designerFile, json_encode($designerArray, JSON_UNESCAPED_UNICODE));
        fwrite($designerFile, "\n");
    }
    
    fclose($designerFile);
}

?>
