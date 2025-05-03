const designer = document.getElementsByName("designer");

$(document).ready(function () {
    $.getJSON("TP_info.php", function(data) {  // 미용실 정보 가져오기
        $.each(data, function(i, item) {
            let addressText = "주소 : " + item.address;
            let telText = "전화 : " + item.tel;
            $("#info").html(addressText + "<br>" + telText);
        });
    });
    $.getJSON("TP_designers.php", function(data) {  // 디자이너 정보 가져오기
        let name = "";
        $.each(data, function(i, item) {
            if(name != item.name) {
                $("#designers").append("<input type=radio id=designer"+(i+1)+" name=designer value="+item.name+">"+item.name+" 디자이너<br>");
                name = item.name;
            }
        });
    });
});

$("#reserveButton").click(function () {
    let isChecked = false;
    for(let i = 0 ; i < designer.length ; i++) {  // 라디오 버튼(디자이너)이 하나라도 체크되었으면 true
        if(designer[i].checked) {
            isChecked = true;
        }
    }
    if(!isChecked) {  // 라디오 버튼(디자이너)이 체크되어있지 않으면
        alert("디자이너를 선택해주세요.");
        return false;
    }
    else {
        let designer = $("input:radio[name=designer]:checked").val();
        localStorage.setItem("designer", designer);
        window.open('TP_reserve.html', "_self"); // 미용실 예약으로 페이지 이동
    }
});
