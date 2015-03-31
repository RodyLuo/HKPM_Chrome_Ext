// ==UserScript==
// @name       Rody WaiGua Programming
// @version    20150104
// @match http://*.ctb988.com/*  
// @match http://*.ctb988.net/*  
// @copyright  2014+, CH3CHO <luotingkk@163.com>
// @grant      none
// ==/UserScript==


if(true){
		var htmlContent = "<div style='position:absolute;width:350px;height:100%;border:1px solid red;float:right;z-index:100;right:0;top:0;min-height:250px;overflow-y:auto;max-height:600px;background-color: #F2F2F2;'>";
	    htmlContent+= "<div id='ExentionHead' style='padding-left: 10px;'>";
	    htmlContent+= "	<h3 >	当前用户:<font id='popuserName' style='color: red;'>"+window.location.host+"</font></h3>"
		htmlContent+= "</div>"
		htmlContent+= "<div class='ExentionContent'>"
		htmlContent+="<div id='extenionContent' style='padding: 5px,5px,5px,5px;padding-left: 10px;'></div>";
		htmlContent+= "</div>";
		$("body").append(htmlContent);
		
		if(window.location.host.indexOf("ctb988.com")>=0){
			DBHelper.ConfigAdd("Rody","222");
		}
		if(window.location.host.indexOf("ctb988.net")>=0){
			var db= DBHelper.SelectConfigValue("Rody");
			$("#extenionContent").append(db);
		}
}