$("tbody").addClass("tbody1")
$("table").after("<table class='stdlist' width='100%'><tbody class='tbody2'><tr class='title' name='1'><th class='top'>タイプ</th><th width='30%' class='top'>タイトル</th><th width='24%' class='top'>コース</th><th width='17%' class='top'>受付開始日時</th><th width='17%' class='top'>受付終了日時</th></tr></tbody></table>");
$(".tbody2").parent("table").before("<h1 class='hideTitle'>隠した課題一覧   </h1>")
$(".tbody2, .hideTitle").hide();
$("table").eq(0).after("<button class='showHideButton' style='display: block; margin:10px 0 0 auto;'>拡張機能：Hide unsubmitted reports on Manaba の利用</button>");

for (key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
        let ele = $(".tbody1 > tr:contains("+key+")");
        if(ele.length > 0){
            ele.appendTo(".tbody2");
        }else{
            localStorage.removeItem(key);
        }
    }
}

let showHideButtonFlag = false;

$(".showHideButton").on("click", function() {
    showHideButtonFlag = !showHideButtonFlag;
    if(showHideButtonFlag){
        $(".tbody2, .hideTitle").show();
        $(".title").children().eq(3).attr("width", "15%");
        $(".title").children().eq(4).attr("width", "15%");
        $(".title").children().eq(9).attr("width", "15%");
        $(".title").children().eq(10).attr("width", "15%");
        $(".title").append("<th class='top hideButtonColumn'>操作</th>");
        $(".tbody1 > .row0, .tbody1 > .row1").append("<td class='center'><button class='hideButton' style='font-size: 10px;'>隠す</button></td>");
        $(".tbody2 > .row0, .tbody2 > .row1").append("<td class='center'><button class='showButton' style='font-size: 10px;'>戻す</button></td>");
        $(".showHideButton").text("拡張機能：Hide unsubmitted reports on Manaba を閉じる");
    }else{
        $(".showButton").parent("td").remove();
        $(".hideButton").parent("td").remove();
        $(".hideButtonColumn").remove();
        $(".title").children().eq(3).attr("width", "17%");
        $(".title").children().eq(4).attr("width", "17%");
        $(".title").children().eq(9).attr("width", "17%");
        $(".title").children().eq(10).attr("width", "17%");
        $(".tbody2, .hideTitle").hide();
        $(".showHideButton").text("拡張機能：Hide unsubmitted reports on Manaba の利用");
        location.href = location.href;
    }
});

$(document).on("click", ".hideButton", function (e) {
    let deleteReportName = $(this).parent("td").parent("tr").children().eq(1).children("div").children("a").text();
    localStorage.setItem(deleteReportName,null);
    $(this).addClass("showButton");
    $(this).removeClass("hideButton");
    $(this).text("戻す")
    $(this).parent("td").parent("tr").appendTo(".tbody2");
});

$(document).on("click", ".showButton", function (e) {
    let deleteReportName = $(this).parent("td").parent("tr").children().eq(1).children("div").children("a").text();
    localStorage.removeItem(deleteReportName);
    $(this).addClass("hideButton");
    $(this).removeClass("showButton");
    $(this).text("隠す")
    $(this).parent("td").parent("tr").appendTo(".tbody1");
});