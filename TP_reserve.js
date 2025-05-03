const goPrevious = document.getElementById("goPrevious");
const goNext = document.getElementById("goNext");

const nextButton = document.getElementById("nextButton");

$(document).ready(function () {
    $("#designer").html(localStorage.getItem("designer") + " 디자이너-날짜 선택");  // 디자이너 이름 가져오기
    addToday();
});

let date1 = new Date();
date1.setDate(date1.getDate() + 7);  // 오늘에서 일주일 뒤로 초기화

let date2 = new Date();
date2.setDate(date2.getDate() - 1);  // 오늘에서 하루 뒤로 초기화

function showDate() {  // 오늘부터 한 주의 날짜 보여주기
    let date = new Date();  // 오늘 날짜

    for(let i = 0 ; i < 7 ; i++) {
        const td = document.getElementById(i.toString());  // 테이블 id로 받아오기

        let day = date.getDate();
        let dayOfWeek = getDayOfWeek(date);

        td.appendChild(document.createTextNode(dayOfWeek));  // 요일 추가
        td.appendChild(document.createElement("br"));
        td.appendChild(document.createTextNode(day));  // 일 수 추가

        td.addEventListener("click", click); // 클릭 이벤트 추가

        date.setDate(day + 1);  // 다음 날로 넘어가기
    }
}

function getDayOfWeek(date) {  // 날짜를 요일로 반환하기
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[date.getDay()];
    return dayOfWeek;
}

function goPreviousDay() { 
    const listItems = document.querySelectorAll('td');

    for(let i = listItems.length - 1 ; i >= 1 ; i--) {  // 테이블 한 칸씩 오른쪽으로 이동
        // 테이블의 인덱스 i번째 일 수를 인덱스 i-1번째 일 수로 교체
        listItems[i].replaceChild(listItems[i-1].cloneNode(true).childNodes[2], listItems[i].childNodes[2]);
        // 테이블의 인덱스 i번째 요일을 인덱스 i-1번째 요일로 교체
        listItems[i].replaceChild(listItems[i-1].cloneNode(true).childNodes[0], listItems[i].childNodes[0]);
    }

    let day = date2.getDate();
    let dayOfWeek = getDayOfWeek(date2);

    // 테이블의 첫번째 인덱스 일 수를 오늘에서 일주일 뒤의 일 수로 교체
    listItems[0].replaceChild(document.createTextNode(day), listItems[0].childNodes[2]);
    // 테이블의 첫번째 인덱스 요일을 오늘에서 일주일 뒤의 요일로 교체(오늘과 일주일 뒤는 동일함)
    listItems[0].replaceChild(document.createTextNode(dayOfWeek), listItems[0].childNodes[0]);

    date1.setDate(date1.getDate() - 1);  // 전 날로 넘어가기
    date2.setDate(date2.getDate() - 1);  // 전 날로 넘어가기
    
    deleteToday();  // 버튼 누를 때마다 Today 삭제 후 추가
    addToday();
    reset();  // 노란색 초기화
}

function goNextDay() {
    const listItems = document.querySelectorAll('td');

    for(let i = 0 ; i < listItems.length - 1 ; i++) {  // 테이블 한 칸씩 왼쪽으로 이동
        // 테이블의 인덱스 i번째 일 수를 인덱스 i+1번째 일 수로 교체
        listItems[i].replaceChild(listItems[i+1].cloneNode(true).childNodes[2], listItems[i].childNodes[2]);
        // 테이블의 인덱스 i번째 요일을 인덱스 i+1번째 요일로 교체
        listItems[i].replaceChild(listItems[i+1].cloneNode(true).childNodes[0], listItems[i].childNodes[0]);
    }
    
    let day = date1.getDate();
    let dayOfWeek = getDayOfWeek(date1);

    // 테이블의 마지막 인덱스 일 수를 오늘에서 일주일 뒤의 일 수로 교체
    listItems[6].replaceChild(document.createTextNode(day), listItems[6].childNodes[2]);
    // 테이블의 마지막 인덱스 요일을 오늘에서 일주일 뒤의 요일로 교체(오늘과 일주일 뒤는 동일함)
    listItems[6].replaceChild(document.createTextNode(dayOfWeek), listItems[6].childNodes[0]);

    date1.setDate(date1.getDate() + 1);  // 다음 날로 넘어가기
    date2.setDate(date2.getDate() + 1);  // 다음 날로 넘어가기

    deleteToday();  // 버튼 누를 때마다 Today 삭제 후 추가
    addToday();
    reset();  // 노란색 초기화
}

function addToday() {  // Today 글자 추가하기
    const listItems = document.querySelectorAll('td');
    const today = new Date();
    let day = today.getDate();
    let dayOfWeek = getDayOfWeek(today);

    for(let i = 0 ; i < listItems.length ; i++) {
        if(listItems[i].childNodes[2].textContent == day.toString()  // 오늘의 요일과 일수가 같으면
            && listItems[i].childNodes[0].textContent == dayOfWeek) {
                listItems[i].appendChild(document.createElement("br"));
                listItems[i].appendChild(document.createTextNode("Today"));
            }
    }
}

function deleteToday() {  // Today 글자 삭제하기
    const listItems = document.querySelectorAll('td');

    for(let i = 0 ; i < listItems.length ; i++) {  // 자식 개수가 2개면(Today를 추가했으면), Today 삭제
        if(listItems[i].childElementCount == 2) {
            listItems[i].removeChild(listItems[i].lastChild);
            listItems[i].removeChild(listItems[i].lastChild);
        }
    }
}

function reset() {
    const listItems = document.querySelectorAll('td');
    for(let i = 0 ; i < listItems.length ; i++) {  // 모두 하얀색으로 초기화
        if(listItems[i].style.backgroundColor == "yellow") {  // 다시 누를 경우, 전에 바뀐 노란색을 다시 흰색으로 바꿈
            listItems[i].style.backgroundColor = "white";
        }
    }
}

const click = (event) => {  // 클릭한 target 노란색으로 변경하기
    const target = event.target;
    reset();
    target.style.backgroundColor = "yellow";

    localStorage.setItem("dayOfWeek", target.childNodes[0].textContent);  // localStorage에 요일과 일수 저장
    localStorage.setItem("day", target.childNodes[2].textContent);
}

function next() {
    let isClicked = false; 
    const listItems = document.querySelectorAll('td');
    for(let i = 0 ; i < listItems.length ; i++) {  // 날짜가 하나라도 클릭되었으면 true
        if(listItems[i].style.backgroundColor == "yellow") {
            isClicked = true;
        }
    }
    if(!isClicked) {  // 날짜가 클릭되어있지 않으면
        alert("날짜를 선택해주세요.");
        return false;
    }
    else {
        window.open('TP_reserve2.html', "_self");  // 미용실 예약2으로 페이지 이동 
    }
}

goPrevious.addEventListener("click", goPreviousDay);
goNext.addEventListener("click", goNextDay);

nextButton.addEventListener("click", next);

