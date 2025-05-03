const popUp = document.getElementById("popUp");
const design = document.getElementsByName("design");
const time = document.getElementsByName("time");
const endButton = document.getElementById("endButton");

$(document).ready(function () {
    $("#designer").html(localStorage.getItem("designer") + " 디자이너-시간&시술 선택");  // 디자이너 이름 가져오기
    $("#day").html(localStorage.getItem("day")+"일 "+localStorage.getItem("dayOfWeek")+"요일");  // 선택 요일과 일수 가져오기
    showDesigns();
    showBar();
});

function showDesigns() {
    let idx = 1;
    $.getJSON("TP_designers.php", function(data) {  // 디자이너 시술 종류 가져오기
        $.each(data, function(i, item) {
            if(localStorage.getItem("designer") == item.name) {
                $("#designs").append("<ul><li><input type=radio id=design"+idx+" name=design value="+item.design+">"+item.design+"</li><li>"+item.cost+"원</li><li>"+item.explain+"</li><li id="+item.design+">약 "+item.time+" 분 소요</li></ul>");
                idx++;
            }
        });
    });
}

function showBar() {  // 예약된 시간과 소요 시간 보여주기
    const listItems = document.querySelectorAll('td');
    const listItems2 = document.querySelectorAll('th');

    let designer = localStorage.getItem("designer");  // localStorage에서 가져오기
    let day = localStorage.getItem("day");
    let dayOfWeek = localStorage.getItem("dayOfWeek");
    $.getJSON("TP_reserveFile.php", function(data) {
        $.each(data, function(i, item) {
            if((designer == item.designer) && (day == item.day) && (dayOfWeek == item.dayOfWeek)) {
            // 디자이너, 요일, 일수가 모두 같으면
                for(let i = 0 ; i < listItems.length ; i++) {  // 예약 표시 블럭 만들기
                        if(listItems[i].id == item.reserveTime) {
                            let div = document.createElement("div");
                            div.style.backgroundColor = "red";
                            div.style.height = "10px";
                            div.addEventListener("click", showDetail);  // 클릭 시 팝업 띄우기
                            listItems[i+j].appendChild(div);
                        }
                    }
                }

            for(let i = 0 ; i < listItems2.length ; i++) {
                if(listItems2[i].textContent == item.reserveTime) {
                    listItems2[i].style.color = "gainsboro";
                }
            }
        });
        addEvent();  // th에 클릭 이벤트 추가(예약된 시간 제외)
    });
}

function showDetail() {  // 팝업 띄우기
    popUp.style.display = "block";
}

function hideDetail() {  // 팝업 지우기 
    popUp.style.display = "none";
}

function addEvent() {  // th에 클릭 이벤트 추가(예약된 시간 제외)
    const listItems = document.querySelectorAll('th');
    for(let i = 0 ; i < listItems.length ; i++) {
        if(listItems[i].style.color != "gainsboro") {  // 예약된 시간이 아니면
            listItems[i].addEventListener("click", click);
        }
    }
}

const click = (event) => {  // 클릭한 target 노란색으로 변경하기
    const target = event.target;
    const listItems = document.querySelectorAll('th');
    for(let i = 0 ; i < listItems.length ; i++) {  // 모두 하얀색으로 초기화
        if(listItems[i].style.backgroundColor == "yellow") {  // 다시 누를 경우, 전에 바뀐 노란색을 다시 흰색으로 바꿈
            listItems[i].style.backgroundColor = "white";
        }
    }
    target.style.backgroundColor = "yellow";
}

function reserve() {
    let id = localStorage.getItem("id");
    let designer = localStorage.getItem("designer");
    let day = localStorage.getItem("day");
    let dayOfWeek = localStorage.getItem("dayOfWeek");
    let reserveTime;
    let designName = $("input:radio[name=design]:checked").val();
    let designTime = $("#"+designName).text().split(" ")[1];

    const listItems = document.querySelectorAll('th');
    for(let i = 0 ; i < listItems.length ; i++) {
        if(listItems[i].style.backgroundColor == "yellow") {
            reserveTime = listItems[i].textContent;
        }
    }
    
    $.ajax({  // 회원 예약 정보 값 보내기
        url: 'TP_reserve.php',
        type: 'POST',
        data: {
            idVal: id,
            designerVal: designer,
            dayVal: day,
            dayOfWeekVal: dayOfWeek,
            reserveTimeVal: reserveTime,
            designNameVal: designName,
            designTimeVal: designTime,
        },
        success: function (data) {
            alert("예약 정보 저장을 성공하였습니다.");
        },
        error: function (e) {
            alert(e.reponseText);
        }

    });
}

function end() {
    const listItems = document.querySelectorAll('th');
    let isClicked = false;
    let isChecked = false;
    for(let i = 0 ; i < listItems.length ; i++) {   // 시간이 하나라도 클릭되었으면 true
        if(listItems[i].style.backgroundColor == "yellow") {
            isClicked = true;
        }
    }
    for(let i = 0 ; i < design.length ; i++) {   // 라디오 버튼(시술)이 하나라도 체크되었으면 true
        if(design[i].checked) {
            isChecked = true;
        }
    }
    if(!isClicked) {  // 시간이 클릭되어있지 않으면
        alert("시간를 선택해주세요.");
        return false;
    }
    if(!isChecked) {  //  라디오 버튼(시술)이 하나라도 체크되어있지 않으면
        alert("시술를 선택해주세요.");
        return false;
    }
    else {  // 예약 완료
        reserve();
        alert("예약이 완료되었습니다.");
    }
}

popUp.addEventListener("click", hideDetail);
endButton.addEventListener("click", end);

