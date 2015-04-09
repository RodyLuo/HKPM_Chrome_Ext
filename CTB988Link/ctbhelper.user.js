// ==UserScript==
// @name       Rody WaiGua Programming
// @version    20150104
// @match http://*.ctb988.com/*  
// @match http://*.ctb988.net/*  
// @copyright  2014+, CH3CHO <luotingkk@163.com>
// @grant      none
// ==/UserScript==

ContentScript={
	hostName:'http://localhost:55664/CTB988/',
	signInId:"";
	pageConfig:{},
	onInit:function(){
		var host =window.location.href;
		if(host.indexOf("playerhk.jsp")>=0 || host.indexOf("Q.jsp")>=0){
			//创建用户界面
			ContentScript.CreateHtmlElement();
			ContentScript.HtmlAddDragEvent();
			
			//页面签到功能
			ContentScript.bindOnLoadEvent();
			ContentScript.bindUnLoadEvent();
			
			//创建定时监控吃票事件
			//创建定时定时跟单事件
		}
	},
	bindOnLoadEvent:function(){
		//调用签到接口签到
		var url= window.location.href;
		var loginuser = $.trim($("#username").text());
		$.ajax({
	              type: "get",
	              url: "SignIn.ashx",
	              data: "type=add&url="+url+"&loginuser="+loginuser,
	              success: function (msg) {
	                    if(msg!="0"){
	                    	 	ContentScript.signInId = msg;
	                    }
	               }
	             });
		//页面离开事件 刷新也会加载这个事件
		$("boay").bind("onload",function(){
			//调用签到接口签到
			var url= window.location.href;
			var loginuser = $.trim($("#username").text());
			$.ajax({
	                    type: "get",
	                    url: "SignIn.ashx",
	                    data: "type=add&url="+url+"&loginuser="+loginuser,
	                    success: function (msg) {
	                    	 if(msg!="0"){
	                    	 	ContentScript.signInId = msg;
	                    	 }
	                    }
	                });
		});
	},
	bindUnLoadEvent:function(){
		//页面离开事件 刷新也会加载这个事件
		$("boay").bind("onunload",function(){
			if(ContentScript.signInId.length>0){
				$.ajax({
                    type: "get",
                    url: "SignIn.ashx",
                    data: "type=delete&Id="+ContentScript.signInId,
                    success: function (msg) {
                    	 
                    }
                });
			}
		});
	},
	OpenConfigPage:function(){
		window.open(ContentScript.hostName+'Drag.htm','newwindow','height=400,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
	},
	CreateHtmlElement:function(){
		var htmlList = '<div id="drag" style="width: 200px; height: 100px; cursor: move; position: absolute; border: solid 1px #ccc; float: right; z-index: 100;right: 0;top: 0;min-height: 250px;overflow-y: auto;max-height: 600px;">';
        htmlList += '<h3 style="color: #fff; background: none repeat scroll 0 0 rgba(16, 90, 31, 0.7); color: #FFFFFF; height: 30px; line-height: 30px; margin: 0;">长城帮助程序客户端</h3>';
        htmlList += '<div style="font-size: 12px;">';	
        htmlList += '<textarea style="width: 90%; height: 80px; font-size: 10px;" id="txtLogs"></textarea>';
        htmlList += '</div></div>';
        
        $("body").append(htmlList);
        AddLogs()
	},
	AddLogs:function(log){
		$("#txtLogs").val($("#txtLogs").val()+"\r\n"+log+ (new Date()).toLocaleTimeString());
	},
	HtmlAddDragEvent:function(){
		// 模块拖拽  
        $(function () {
            var _move = false; //移动标记  
            var _x, _y; //鼠标离控件左上角的相对位置  
            $("#drag").click(function () {
                //alert("click");//点击（松开后触发）  
            }).mousedown(function (e) {
                _move = true;
                _x = e.pageX - parseInt($("#drag").css("left"));
                _y = e.pageY - parseInt($("#drag").css("top"));
            });
            $(document).mousemove(function (e) {
                if (_move) {
                    var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置  
                    var y = e.pageY - _y;
                    $("#drag").css({ top: y, left: x }); //控件新位置  
                }
            }).mouseup(function () {
                _move = false;
            });
        });  
	}
}
