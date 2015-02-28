$(window).load(function() {
	chrome.runtime.onMessage.addListener(//监听扩展程序进程或内容脚本发送的请求
	    function (request, sender, sendResponse) {
	        if (request.action == "GetUserName") {
	            sendResponse({ UserName : $.trim($("#username").text()) });
	        }
	    }
	); 
	
	var htmlContent = "<div class='extenionMain'>";
    htmlContent+= "<div id='ExentionHead'>";
    htmlContent+= "<span class='currentUserName'>"
    htmlContent+= "		当前用户:<font id='popuserName' style='color: red;'>"+$.trim($("#username").text())+"</font>"
	htmlContent+= "</span>"
	htmlContent+= "</div>"
	htmlContent+= "<div class='ExentionContent'>"
	htmlContent+= "<div class='whereCondition'>"
	htmlContent+= "</div>"
	htmlContent+= "</div>";
	$("body").append(htmlContent);
	
});