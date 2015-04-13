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
	pageStatus:"",
	txn_mode_check_item:new Array('WPB','WPE','WB','WE','PB','PE','FCB','FCE','PFTB','PFTE','QB','QE','QPB','QPE','DEmr','DBmr'),  
	timerEatClock:null,
	timerBetClock:null,
	timerGetConfig:null,
	timerGetStatus:null,
	timerGetSignInList:null,
	currentUrl:window.location.href,
	Request:function(paras){ 
        var url = location.href; 
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
        var paraObj = {} 
        for (i=0; j=paraString[i]; i++){ 
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
        } 
        var returnValue = paraObj[paras.toLowerCase()]; 
        if(typeof(returnValue)=="undefined"){ 
        return ""; 
        }else{ 
        return returnValue; 
        } 
    },
	GetSignInInfo:function(){
			var url= window.location.href;
			var siteType = ""
			if(url.indexOf("ctb988.com")>=0){
				siteType = "com";
			}else{
				siteType = "net"
			}
			var urlValue = window.location.pathname;
			var paramList = window.location.search.split("?")[1];
			var paramArray = paramList.split("&");
			var RaceType = $("input[name='race_type']").val();
			var RaceDate = $("input[name='race_date']").val();
			var Sml = "s";
			var loginuser = $.trim($("#username").text());
			var result = {"url":urlValue,"loginuser":loginuser,"RaceType":RaceType,"RaceDate":RaceDate,"Sml":Sml,"SiteType":SiteType};
			return result;
	},
	signInList: [],
	isMonitor:false,
	isWithOrder:false,
	oldSignInList:[],
	pageConfig:{},
	getSignInList: function () {
                $.ajax({
                    type: "get",
                    url: ContentScript.hostName + "SignIn.ashx",
                    data: "type=get",
                    success: function (msg) {
                        ContentScript.oldSignInList = ContentScript.signInList;
                        ContentScript.signInList = $.parseJSON(msg);
                    }
                });
    },
	checkPageSignInInfo:function(){
		$(ContentScript.signInList).each(function(i){
					var result = ContentScript.GetSignInInfo();
			  		if($(this)[0].SiteType == result.SiteType 
			  	       && $(this)[0].RaceDate == result.RaceDate
			  	       && $(this)[0].RaceType == result.RaceType
			  	       && $(this)[0].LoginUser == result.loginuser
			  		){
			  			var monitor = ($(this)[0].isMonitor =="1");
			  			var withorder = ($(this)[0].isWithOrder =="1");
			  			ContentScript.isMonitor = monitor;
			  			ContentScript.isWithOrder = withorder;
			  		}
			  })
	},
	onInit:function(){
		var host =window.location.href;
		if(host.indexOf("playerhk.jsp")>=0 || host.indexOf("Q.jsp")>=0){
			//创建用户界面
			ContentScript.CreateHtmlElement();
			ContentScript.HtmlAddDragEvent();
			
			//页面签到功能
			ContentScript.bindOnLoadEvent();
			ContentScript.bindUnLoadEvent();
			
			//页面是否跟单状态
			ContentScript.timerGetStatus = self.setInterval(function(){
			  ContentScript.getSignInList();
			  ContentScript.checkPageSignInInfo();
			},1000);
			//获取签到页面的配置信息
			ContentScript.timerGetSignInList = self.setInterval(function(){
			  ContentScript.getPageConfig();
			},1000);
			//获取页面配置
			ContentScript.timerGetConfig = self.setInterval(function(){
			  ContentScript.getPageConfig();
			},1000);
			//创建定时监控吃票事件
			ContentScript.timerEatClock = self.setInterval(function(){
			  ContentScript.onMonitorInit();
			},1000);
			//创建定时定时跟单事件
			ContentScript.timerEatClock = self.setInterval(function(){
			  ContentScript.onWithOrderInit();
			},1000);
		}
	},
	getPageConfig:function(){
		$.ajax({
                    type: "get",
                    url: hostName+ "Config.ashx",
                    data: "type=get",
                    success: function (msg) {
                        ContentScript.pageConfig = $.parseJSON(msg);
                    }
             });
	},
	getPageStatus:function(){
		$.ajax({
                    type: "get",
                    url: hostName+ "GetStatus.ashx",
                    data: "type=get",
                    success: function (msg) {
                        ContentScript.pageStatus = $.parseJSON(msg);
                    }
             });
	},
	onMonitorInit:function(){
		ContentScript.pageConfig
		if(ContentScript.pageStatus == "1" && ContentScript.isMonitor){
			
		}
	},
	pushDataToServer:function(item){
		$.ajax({
		              type: "get",
		              url: "SignIn.ashx",
		              data: result,
		              success: function (msg) {
		                    if(msg!="0"){
		                    	 	ContentScript.signInId = msg;
		                    }
		               }
		});
	},
	onWithOrderInit:function(){
		if(ContentScript.pageStatus == "1" ContentScript.isWithOrder){
			
		}
	},
	GetAllTransactionData:function(){
		var result = [];
		//<td>6</td>
		//<td class="RD F_B">FC</td>
		//<td class="F_B ">4-5</td>
		//<td id="FCE_6_4-5_100_700x">2</td>
		//<td id="FCE_6_4-5_100_700y">100</td>
		//<td id="FCE_6_4-5_100_700t" colspan="1" class="">700</td>
		//<td class="">吃</td>
		$(ContentScript.txn_mode_check_item).each(function(i){
			var type = $(this)
			$(window.frames["frmTRANS"].document).find("tbody[id^='"+type+"'] tr").each(function(){
				var temp = "";
				$(this).find("td").each(function(item){
					temp += $(this).text()+"$";
				})
				if(temp.length>0){
					var tempArray = temp.split("$");
					var id = temp;
					item={"id":temp,"type":type,"matches":tempArray[0],"rdfb":tempArray[1],"fb":tempArray[2],"x":tempArray[3],"y":tempArray[4],"t":tempArray[5]}
					result.push(item);
				}
			});
		});
	},
	bindOnLoadEvent:function(){
		if(window.location.href.indexOf("?")>=0
		   && window.location.href.indexOf("&")>=0  
		){
			var result = ConfigScript.GetSignInInfo();
			result.type="add";
			$.ajax({
		              type: "get",
		              url: "SignIn.ashx",
		              data: result,
		              success: function (msg) {
		                    if(msg!="0"){
		                    	 	ContentScript.signInId = msg;
		                    }
		               }
		             });
			//页面离开事件 刷新也会加载这个事件
			$("boay").bind("onload",function(){
				var result = ConfigScript.GetSignInInfo();
				result.type="add";
				$.ajax({
		                    type: "get",
		                    url: "SignIn.ashx",
		                    data: result,
		                    success: function (msg) {
		                    	 if(msg!="0"){
		                    	 	ContentScript.signInId = msg;
		                    	 }
		                    }
		                });
			});
		}
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

PostHelp={
	urlX: "http://"+window.location.host,
	fcfrm1 :  $("#fcfrm1"),
	fcfrm2 :  $("#fcfrm2"),
	postData:function(url){
		var view1 = $("#view1");
		if(view1) {
				var y = $("#view1").val();
				var postion = url  + "&show="+y+ "&rd=" + Math.random();
				var postionArray = postion.split("?");
				var postUrl = postionArray[0];
				var dataUrl = postionArray[1];
				var dataArray = dataUrl.split('&');
				var postString ='{';
				for(var i=0;i< dataArray.length;i++){
					var itemArray = dataArray[i].split('=');
					postString +='"'+itemArray[0]+'": "'+itemArray[1]+'",';
				}
				postString = postString.substr(0,postString.length-1);
				postString+='}';
				var dataJson = $.parseJSON(postString);
				$.ajax(
				{
		             type: "GET",
		             url: postUrl,		             
		             data: dataJson,
		             dataType: "text",
		             success: function(da)
		             {
		             },
		             error:function (da, status, e){   
	   				 }
	     		});
		}
	},
	PostDeleteData:function(info){
		var id,x,type,date,race_type,race
		var li=info.split(",");
		id=li[0];x=li[1];type=li[2];date=li[3];race_type=li[4];race=li[5];
		document.getElementById('boxFcBET').style.display = "none";
		document.getElementById('boxFcEAT').style.display = "none";
		document.getElementById('boxPfcBET').style.display = "none";
		document.getElementById('boxPfcEAT').style.display = "none";
		PostHelp.postData(PostHelp.urlX + '/transactions?type=del&bid='+id+'&x='+x+'&betType='+type+'&race_date='+date+'&race_type='+race_type+'&q=q&race='+race);
	},
	AjaxDeleteData:function(info){
		var id,x,type,date,race_type,race
		var li=info.split(",");
		var y = view1.options[view1.selectedIndex].value;
		id=li[0];x=li[1];type=li[2];date=li[3];race_type=li[4];race=li[5];
		document.getElementById('boxFcBET').style.display = "none";
		document.getElementById('boxFcEAT').style.display = "none";
		document.getElementById('boxPfcBET').style.display = "none";
		document.getElementById('boxPfcEAT').style.display = "none";		
		$.ajax(
				{
		             type: "GET",
		             url: PostHelp.urlX +"/transactions",		             
		             data: {
		             	"type":"del",
		             	"bid":id,
		             	"x":x,
		             	"betType":type,
		             	"race_date":date,
		             	"race_type":race_type,
		             	"q":"q",
						"race":race,
						"show":y,
						"rd":Math.random()
		             },
		             dataType: "text",
		             success: function(da)
		             {
		             },
		             error:function (da, status, e){   
	   				 }   
	   				 
	     });
	}
}


