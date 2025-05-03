<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php // 회원 정보 json 파일에 저장

function test_input($data) {
    $data = ltrim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$memberArray;

$mstr1 = test_input($_POST['idInput']);
$mstr2 = test_input($_POST['passwordInput']);
$mstr3 = test_input($_POST['nameInput']);
$mstr4 = test_input($_POST['telInput']);
$mstr5 = test_input($_POST['emailInput']);

if(isset($_POST['idInput'])) {
    $memberFile = fopen("data/members.json", "a");

    $memberArray = array("id" => $mstr1, "password" => $mstr2, "name" => $mstr3, "tel" => $mstr4, "email" => $mstr5);
    
    fwrite($memberFile, json_encode($memberArray, JSON_UNESCAPED_UNICODE));
    fwrite($memberFile, "\n");

}
    
fclose($memberFile);

?>

<script> // 회원가입 후 로그안 페이지로 이동
    alert("회원가입이 완료되었습니다.");
    window.open('TP_login.html', "_self");
</script>
    
</body>
</html>


