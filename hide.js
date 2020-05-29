$(".title").children().eq(3).attr("width", "15%");
$(".title").children().eq(4).attr("width", "15%");
$(".title").append("<th class='top'>隠す</th>");
$(".row0").append("<td class='center'><button class='hideButton'>❌</button></td>");
$(".row1").append("<td class='center'><button class='hideButton'>❌</button></td>");
$("table").after("<button class='resetButton' style='display: block; margin:10px 0 0 auto;'>隠した未提出課題を再表示</button>");

for (key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
        $("a:contains("+key+")").parent("div").parent("td").parent("tr").hide();
    }
}

$(".hideButton").on("click", function(e) {
    let deleteReportName = $(this).parent("td").parent("tr").children().eq(1).children("div").children("a").text();
    localStorage.setItem(deleteReportName,null)
    $(this).parent("td").parent("tr").hide()
});

$(".resetButton").on("click", function(e) {
    localStorage.clear();
    location.href = location.href;
});