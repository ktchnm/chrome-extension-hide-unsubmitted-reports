$(".title, .row0, .row1").each(function(i){
    $(this).attr("no",i+1);
});

$("tbody").addClass("tbody1")
$("table").after("<table class='stdlist' width='100%'><tbody class='tbody2'><tr class='title' no='0'><th class='top'>タイプ</th><th width='30%' class='top'>タイトル</th><th width='24%' class='top'>コース</th><th width='17%' class='top'>受付開始日時</th><th width='17%' class='top'>受付終了日時</th></tr></tbody></table>");
$(".tbody2").parent("table").before("<h1 class='hideTitle'>隠した課題一覧   </h1>")
$(".tbody2, .hideTitle").hide();
$("table").eq(0).after("<button class='openExtentionButton' style='display: block; margin:10px 0 0 auto;'>拡張機能：Hide unsubmitted reports on Manaba を開く</button>");

for (key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
        let ele = $(".tbody1 > tr:contains("+key+")");
        if(ele.length > 0){
            let trList = $(".tbody2 > .title, .tbody2 > .row0, .tbody2 > .row1");
            insert(trList, ele);
        }else{
            localStorage.removeItem(key);
        }
    }
}
changeClass($(".tbody1 > .title, .tbody1 > .row0, .tbody1 > .row1"));

let openExtentionFlag = false;
$(".openExtentionButton").on("click", function() {
    openExtentionFlag = !openExtentionFlag;
    if(openExtentionFlag){
        $(".tbody2, .hideTitle").show();
        $("th[width='17%']").attr("width", "15%");
        $(".title").append("<th class='top hideButtonColumn'>操作</th>");
        $(".tbody1 > .row0, .tbody1 > .row1").append("<td class='center'><button class='hideButton' style='font-size: 10px;'>隠す</button></td>");
        $(".tbody2 > .row0, .tbody2 > .row1").append("<td class='center'><button class='showButton' style='font-size: 10px;'>戻す</button></td>");
        $(".openExtentionButton").text("拡張機能：Hide unsubmitted reports on Manaba を閉じる");
    }else{
        $(".showButton").parent("td").remove();
        $(".hideButton").parent("td").remove();
        $(".hideButtonColumn").remove();
        $("th[width='15%']").attr("width", "17%");
        $(".tbody2, .hideTitle").hide();
        $(".openExtentionButton").text("拡張機能：Hide unsubmitted reports on Manaba を開く");
    }
});

$(document).on("click", ".hideButton", function (e) {
    let deleteReportName = $(this).parent("td").parent("tr").children().eq(1).children("div").children("a").text();
    localStorage.setItem(deleteReportName,null);
    $(this).addClass("showButton");
    $(this).removeClass("hideButton");
    $(this).text("戻す")
    let trList = $(".tbody2 > .title, .tbody2 > .row0, .tbody2 > .row1");
    let trItem = $(this).parent("td").parent("tr");
    insert(trList, trItem);
    changeClass(trList);
});

$(document).on("click", ".showButton", function (e) {
    let deleteReportName = $(this).parent("td").parent("tr").children().eq(1).children("div").children("a").text();
    localStorage.removeItem(deleteReportName);
    $(this).addClass("hideButton");
    $(this).removeClass("showButton");
    $(this).text("隠す")
    let trList = $(".tbody1 > .title, .tbody1 > .row0, .tbody1 > .row1");
    let trItem = $(this).parent("td").parent("tr");
    insert(trList, trItem);
    changeClass(trList);
});


function insert(trList, trItem){
    let trItemNo = Number(trItem.attr("no"));
    let i = 0;
    trList.each(function(){
        let tmp =  Number($(this).attr("no"));
        // 消すと動かなくなる（笑） （隠した課題を全て戻した後に追加で隠せなくなる）
        // 移動させた要素が見えないのになぜかtbody2に残ってて今ある場所に再挿入されてしまう
        if(tmp == trItemNo){
            i = 0;
            return false;
        }
        if(tmp > trItemNo){
            return false;
        }
        console.log(tmp);
        i = tmp;
    });
    trItem.insertAfter("tr[no=" + i + "]");
}

function changeClass(trList){
    trList.each(function(i){
        if(i == 0 || i == 1) return true;
        $(this).addClass( i % 2 ? "row0" : "row1");
        $(this).removeClass( i % 2 ? "row1" : "row0");
    });
}