$("#saveButton").click(function () {
    let address = $("#address").val();
    let tel  = $("#tel").val();
    if(address == "") {   // 미용실 주소를 입력하지 않으면
        alert("미용실 주소를 입력해주세요.");
        return false;
    }
    else if(tel == "") {  // 미용실 전화번호를 입력하지 않으면
        alert("미용실 전화번호를 입력해주세요.");
        return false;
    }
    $.ajax({  // php로 미용실 소개 정보 값 전달
        url: 'TP_admin.php',
        type: 'POST',
        data: {
            addressVal: address,
            telVal: tel,
        },
        success: function (data) {
            alert("미용실 소개 정보 저장을 성공하였습니다.");
        },
        error: function (e) {
            alert(e.reponseText);
        }
    });
});

$("#nextButton").click(function () {  // 미용실 관리자 다음 페이지 이동
    window.open('TP_admin2.html', "_self");
});