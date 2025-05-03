let designCount = 2;

$("#addButton").on("click", function () {  // 시술 추가 버튼
    let design = ("<input type=text name=design id=design" + designCount + ">");
    let cost = ("<input type=text name=cost id=cost" + designCount + ">");
    let explain = ("<input type=text name=explain id=explain" + designCount + ">");
    let time = ("<input type=number name=time id=time" + designCount + "value=0 min=0 step=30>");

    $("#li").before($("<li><span>시술명</span>"+design+"<span>시술 비용</span>"+cost+"<span>시술 설명</span>"+explain+"<span>시술 소요 시간(30분 간격)</span>"+time+"</li><br>"));
    designCount++;
});

$("#saveButton").on("click", function () {  // 디자이너 정보 저장 버튼
    let designerName = $("#designerName").val();
    let designsArr = [];
    $("input[name=design]").each(function () {
        designsArr.push($(this).val());
    });
    let costsArr = [];
    $("input[name=cost]").each(function () {
        costsArr.push($(this).val());
    });
    let explainsArr = [];
    $("input[name=explain]").each(function () {
        explainsArr.push($(this).val());
    });
    let timesArr = [];
    $("input[name=time]").each(function () {
        timesArr.push($(this).val());
    });

    $.ajax({  // php로 디자이너 정보 값 전달
        url: 'TP_admin2.php',
        type: 'POST',
        data: {
            designerNameVal: designerName,
            designsArrVal: designsArr,
            costsArrVal: costsArr,
            explainsArrVal: explainsArr,
            timesArrVal: timesArr,
        },
        success: function (data) {
            alert("디자이너 정보 저장을 성공하였습니다.");
        },
        error: function (e) {
            alert(e.reponseText);
        }

    });
});

