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
	timerEatClock:null,
	timerBetClock:null,
	timerGetConfig:null,
	timerGetStatus:null,
	currentUrl:window.location.href,
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
			
			//页面是否跟单状态
			ContentScript.timerGetStatus = self.setInterval(function(){
			  ContentScript.getPageStatus();
			},1000);
			
			//获取页面配置
			ContentScript.timerGetConfig = self.setInterval(function(){
			  ContentScript.getPageConfig();
			},1000);
			//创建定时监控吃票事件
			ContentScript.timerEatClock = self.setInterval(function(){
			  ContentScript.onEatInit();
			},1000);
			//创建定时定时跟单事件
			ContentScript.timerEatClock = self.setInterval(function(){
			  ContentScript.onBetInit();
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
	onEatInit:function(){
		
	},
	onBetInit:function(){
		
	},
	GetQData:function(){
		var QdataResult = [];
		var item = {};
		var type = 0;
		$(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="删"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				$(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr .del_ch").length
				var tempArray = temp.split("$");
				if(tempArray[2].indexOf("(")>=0){
					type=2
				}else{
					type=1;
				}
				item={"type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
		$(window.frames["frmTRANS"].document).find("tbody[id^='DEmr'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="删"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				var tempArray = temp.split("$");
				if(tempArray[2].indexOf("(")>=0){
					type=4
				}else{
					type=3;
				}
				item={"type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
	    return QdataResult;
	},
	GetQCJData:function(){
		var QdataResult = [];
		var item = {};
		var type = 0;
		$(window.frames["frmTRANS"].document).find("tbody[id^='FCB'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="赌"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				type=1;
				var tempArray = temp.split("$");
				var x = tempArray[2].split('-')[0];
				var y = tempArray[2].split('-')[1];
				item={"PL":ContentScript.getBSData(x,y), "type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
		$(window.frames["frmTRANS"].document).find("tbody[id^='PFTB'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="赌"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				var tempArray = temp.split("$");
				type = 2;
				var x = tempArray[2].split('-')[0].replace(/\(/g,"");
				var y = tempArray[2].split('-')[1].replace(/\)/g,"");
				item={"PL":ContentScript.getBSData(x,y), "type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
		$(window.frames["frmTRANS"].document).find("tbody[id^='FCE'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="吃"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				var tempArray = temp.split("$");
				type = 3;
				var x = tempArray[2].split('-')[0];
				var y = tempArray[2].split('-')[1];
				item={"PL":ContentScript.getBSData(x,y), "type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
		$(window.frames["frmTRANS"].document).find("tbody[id^='PFTE'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="吃"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				var tempArray = temp.split("$");
				type = 4;
				var x = tempArray[2].split('-')[0].replace(/\(/g,"");
				var y = tempArray[2].split('-')[1].replace(/\)/g,"");
				item={"PL":ContentScript.getBSData(x,y), "type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
		
		$(window.frames["frmTRANS"].document).find("tbody[id^='QB'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="赌"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				type=1;
				var tempArray = temp.split("$");
				var x = tempArray[2].split('-')[0];
				var y = tempArray[2].split('-')[1];
				item={"PL":ContentScript.getBSData(x,y), "type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
		$(window.frames["frmTRANS"].document).find("tbody[id^='QPB'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="赌"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				var tempArray = temp.split("$");
				type = 2;
				var x = tempArray[2].split('-')[0].replace(/\(/g,"");
				var y = tempArray[2].split('-')[1].replace(/\)/g,"");
				item={"PL":ContentScript.getBSData(x,y), "type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
		$(window.frames["frmTRANS"].document).find("tbody[id^='QE'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="吃"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				var tempArray = temp.split("$");
				type = 3;
				var x = tempArray[2].split('-')[0];
				var y = tempArray[2].split('-')[1];
				item={"PL":ContentScript.getBSData(x,y), "type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
		$(window.frames["frmTRANS"].document).find("tbody[id^='QPE'] tr").each(function(index){
			var temp = "";
			$(this).find("td").each(function(item){
				if($(this).text()!="吃"){
					temp += $(this).text()+"$";
				}
			})
			if(temp.length>0){
				var tempArray = temp.split("$");
				type = 4;
				var x = tempArray[2].split('-')[0].replace(/\(/g,"");
				var y = tempArray[2].split('-')[1].replace(/\)/g,"");
				item={"PL":ContentScript.getBSData(x,y), "type":type,"matches":tempArray[0],"rdfb":tempArray[1],"complex":tempArray[2],"tickets":tempArray[3],"precent":tempArray[4],"limit":tempArray[5]}
				QdataResult.push(item);
			}
		});
		
	    return QdataResult;
	},
	GetWPData:function(){
		var result = {},
		return result;
	},
	GetWPCJData:function(){
		var result = {},
		return result;
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


