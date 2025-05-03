$("#loginButton").click(function () {
    var idReg = /^([A-Za-z0-9]){6,15}$/g;
    var passwordReg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g;

    if($("#ID").val() == "") {   // 아이디를 입력하지 않으면
        alert("아이디를 입력해주세요.");
        return false;
    }
    else if($("#PASSWORD").val() == "") {  // 비밀번호를 입력하지 않으면
        alert("비밀번호를 입력해주세요.");
        return false;
    }
    else if(!idReg.test($("#ID").val()) || !passwordReg.test($("#PASSWORD").val())) {
        alert("아이디 또는 패스워드의 입력양식을 체크해주세요.");
        return;
    }
    else {
        let isLogin = false;
        $.getJSON("TP_members.php", function(data) {
            $.each(data, function(i, item) {
                if( ($("#ID").val() == item.id) && ($("#PASSWORD").val() == item.password) ) {
                    localStorage.setItem("id", item.id);  // localStorage에 아이디 저장
                    alert("로그인이 성공하였습니다.");
                    window.open('TP_info.html', "_self");  // 미용실 정보로 페이지 이동
                    isLogin = true;
                }
            });
            if(!isLogin) {
                alert("로그인이 실패하였습니다.\n아이디 혹은 비밀번호를 확인해주세요.");
            }
        });
         
    }
});

$("#signupButton").click(function () {
    $("#popUp").css("display", "block");
});

$("#cancelButton").click(function () {
    $("#popUp").css("display", "none");
});
