// ==UserScript==
// @name       Rody WaiGua Programming
// @version    20150104
// @match http://*.ctb988.com/*  
// @match http://*.ctb988.net/*  
// @copyright  2014+, CH3CHO <luotingkk@163.com>
// @grant      none
// ==/UserScript==

Array.prototype.contains = function(item){
    return RegExp(item).test(this);
};

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
	successPushData:[],
	allPushData:[],
	urlX: "http://"+window.location.host,
	currentUrl:window.location.href,
	hadSendAjaxToCTB:[],
	successSendAjaxToCTB:[],
	needPingCangData:[],
	allTransactionData:ContentScript.GetAllTransactionData(),
	allEatDataList:ContentScript.GetAllEatTransactionData(),
	allBetDataList:ContentScript.GetAllBetTransactionData(),
	GetAllEatTransactionData:function(){
		var result = [] ;
		$(allTransactionData).each(function(i){
			if($(this)[0].type.indexOf("E")>=0){
				result.push($(this));
			}
		});
		return result;
	},
	GetAllBetTransactionData:function(){
		var result = [] ;
		$(allTransactionData).each(function(i){
			if($(this)[0].type.indexOf("E")>=0){
				result.push($(this));
			}
		});
		return result;
	},
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
	pushDataToServer:function(item){
	    item.Otype="add";
		$.ajax({
		              type: "get",
		              url: "GetData.ashx",
		              data: item,
		              success: function (msg) {
		                    if(msg!="0"){
		                    		if(!ContentScript.successPushData.contains(msg)){
		                    			ContentScript.successPushData.push(msg);
		                    		}
		                    }
		               }
		});
	},
	ticketByFloat:function(item,type){
		var result = 0;
		if(type="Q"){
			if(item%2 !=0){
				result = item+1;
			}
		}else{
			if(item%5 !=0){
				result = item + (5 - item%5);
			}
		}
		return result
	}
	onWithOrderInit:function(){
		if( ContentScript.pageStatus!=null && ContentScript.pageStatus!=undefined
			&& ContentScript.pageStatus == "1" && ContentScript.isWithOrder){
			if(ContentScript.allPushData!=null && ContentScript.allPushData !=undefined
			   && ContentScript.allPushData.length>0
			){
				//真实的跟单操作
				$(ContentScript.allPushData).each(function(i){
					if(ContentScript.pageConfig.MaxCount>ContentScript.hadSendAjaxToCTB.length){
						var item = $(this)[0];
						if(!ContentScript.hadSendAjaxToCTB.contains(item.id)){
						var signInfo = ContentScript.GetSignInInfo();
						if(signInfo.url.indexOf("Q.jsp")>=0 && ['FCB','FCE','PFTB','PFTE','QB','QE','QPB','QPE'].contains($(this)[0].type)){
							var postData = {};
							ContentScript.hadSendAjaxToCTB.push(item.Id)
							postData.task = "betBox";
							postData.combo =0;
							//<td>6</td>
							//<td class="RD F_B">FC</td>
							//<td class="F_B ">4-5</td>
							//<td id="FCE_6_4-5_100_700x">2</td>
							//<td id="FCE_6_4-5_100_700y">100</td>
							//<td id="FCE_6_4-5_100_700t" colspan="1" class="">700</td>
							//<td class="">吃</td>
							postData.Tix =  ContentScript.ticketByFloat(parseInt(item.x)*Proportion,"Q");
							postData.Race = parseInt(item.matches);
							var hourse1,hourse2;
							//如果含有括号特殊处理一下
							if(item.fb.indexOf("(")<0){
								hourse1 = item.fb.split("-")[0];
								hourse2 = item.fb.split("-")[1];
							}else{
								hourse1 = item.fb.replace(/\(/g,"").replace(/\)/g,"").split("-")[0];
								hourse2 = item.fb.replace(/\(/g,"").replace(/\)/g,"").split("-")[1];
							}			
							postData.Hs1 = hourse1;
							postData.Hs2 = hourse2;
							postData.Hs3 = "";
							postData.Hs4 = "";
							postData.Hs5 = "";
							postData.Hs6 = "";
							postData.Hs7 = "";
							postData.Hs8 = "";
							postData.fctype = 0;
							postData.Q = "Q";
							//反向跟单
							if(ContentScript.pageConfig.Direction =="1"){
								postData.type = "BET";
								//QP模式
								if(item.type.indexOf("Q")>=0 && item.type.indexOf("P")>=0){
									postData.amount = ContentScript.pageConfig.BetQPDiscount;
									postData.fclmt = ContentScript.pageConfig.BetQPLimitStart;
								}
								//Q模式
								if(item.type.indexOf("Q")>=0 && item.type.indexOf("P") < 0){
									postData.amount = ContentScript.pageConfig.BetQDiscount;
									postData.fclmt = ContentScript.pageConfig.BetQLimitStart;
								}
							}
							if(ContentScript.pageConfig.Direction =="0"){
								postData.type = "EAT";
								//QP模式
								if(item.type.indexOf("Q")>=0 && item.type.indexOf("P")>=0){
									postData.amount = ContentScript.pageConfig.BetQPDiscount;
									postData.fclmt = ContentScript.pageConfig.EatQPLimitStart;
								}
								//Q模式
								if(item.type.indexOf("Q")>=0 && item.type.indexOf("P") < 0){
									postData.amount = ContentScript.pageConfig.EatQDiscount;
									postData.fclmt = ContentScript.pageConfig.EatQLimitStart;
								}
							}
							
							postData.overflow = "1";
							postData.amount = "90";
							postData.race_type = signInfo.RaceType;
							postData.race_date = signInfo.RaceDate;
							postData.show = parseInt(item.matches);
							///forecast?task=betBox&combo=0&Tix=2&Race=6&Hs1=1&Hs2=2&Hs3=&Hs4=&Hs5=&Hs6=&Hs7=&Hs8=&fctype=0&Q=Q&type=EAT&overflow=1&amount=90&fclmt=700&race_type=330E&race_date=12-04-2015&show=6&rd=0.05655713961459696
							$.ajax({
							              type: "get",
							              url: ContentScript.urlX +"/transactions",
							              data: postData,
							              success: function (msg) {
							              	  if(msg.indexOf("交易已所有被证实")>=0){
							              	  		ContentScript.successSendAjaxToCTB(item.id);
							              	  }
							              	  if(msg.indexOf("#要求")>=0){
							              	  		ContentScript.needPingCangData(item.id);
							              	  }
							              }
							});
						}
						if(signInfo.url.indexOf("playerhk.jsp")>=0 && ['WPB','WPE','WB','WE','PB','PE'].contains($(this)[0].type)){
							//吃http://ksifvch.ctb988.com/bets?t=frm&race=8&horse=2&win=5&place=0&amount=76&limit=110/0&type=bet&race_type=34J&race_date=16-04-2015&show=8&post=1&rd=0.6326403634157032
							//赌http://ksifvch.ctb988.com/bookings?t=frm&race=8&horse=1&win=5&place=0&amount=84&limit=300/0&type=book&race_type=34J&race_date=16-04-2015&show=8&post=1&rd=0.5024963289033622
							//<td>8</td
							//<td class="F_B">2</td>
							//<td id="WE_8_2_76_110/0_0x">5</td>
							//<td id="WE_8_2_76_110/0_0y">0</td>
							//<td id="WE_8_2_76_110/0_0z">76</td>
							//<td id="WE_8_2_76_110/0_0t" colspan="1" class="">110/0</td>
							//<td class="">吃</td>
							
							//<td>6</td>
							//<td class="RD F_B">FC</td>
							//<td class="F_B ">4-5</td>
							//<td id="FCE_6_4-5_100_700x">2</td>
							//<td id="FCE_6_4-5_100_700y">100</td>
							//<td id="FCE_6_4-5_100_700t" colspan="1" class="">700</td>
							//<td class="">吃</td>
							
							var postURL = "";
							
							var postData = {};
							ContentScript.hadSendAjaxToCTB.push(item.Id)
							postData.t = "frm";
							postData.race = item.matches;
							postData.horse = item.rdfb;
							postData.win = ContentScript.ticketByFloat(parseInt(item.fb)*Proportion,"WP");
							postData.place = item.x;
							//反向跟单
							if(ContentScript.pageConfig.Direction =="1"){
								postURL ="/bookings";
								postData.type = "book";   
								postData.amount = ContentScript.pageConfig.BetWPDiscount;
								postData.limit = BetWPLimitStart+"/"+ BetWPLimitEnd;
							}
							if(ContentScript.pageConfig.Direction =="0"){
								postData.type = "bet";
								postURL ="/bets";
								postData.amount = ContentScript.pageConfig.EatWPDiscount;
								postData.limit = EatWPLimitStart+"/"+ EatWPLimitEnd;
							}
							postData.race_type = signInfo.RaceType;
							postData.race_date = signInfo.RaceDate;
							postData.show = parseInt(item.matches);
							postData.post = "1";
							$.ajax({
							              type: "get",
							              url: ContentScript.urlX + postURL,
							              data: postData,
							              success: function (msg) {
							              	  if(msg.indexOf("交易已所有被证实")>=0){
							              	  		ContentScript.successSendAjaxToCTB(item.id);
							              	  }
							              	  if(msg.indexOf("#要求")>=0){
							              	  		ContentScript.needPingCangData(item.id);
							              	  }
							              }
							});
						}
					}
					}else{
						alert("已经超过限制注的数量了，不再跟单！")
					}
				});
			}
		}
	},
	onMonitorInit:function(){
		if( ContentScript.pageStatus!=null && ContentScript.pageStatus!=undefined
			&& ContentScript.pageStatus == "1" && ContentScript.isMonitor){
			$(ContentScript.allEatDataList).each(function(i){
				if(!ContentScript.successPushData.contains($(this)[0].id)){
					ContentScript.pushDataToServer($(this)[0]);
				}
			});
		}
	},
	GetWithOrderList:function(thisPageList,AllPushData){
		var result = [];
		return result;
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
			var type = $(this);
			$(window.frames["frmTRANS"].document).find("tbody[id^='"+type+"'] tr").each(function(){
				var temp = "";
				$(this).find("td").each(function(item){
					temp += $(this).text()+"$";
				})
				if(temp.length>0){
					var tempArray = temp.split("$");
					var id = ContentScript.GetPushDataId(tempArray,type,result);
					item={"id":id,"type":type,"matches":tempArray[0],"rdfb":tempArray[1],"fb":tempArray[2],"x":tempArray[3],"y":tempArray[4],"t":tempArray[5]}
					result.push(item);
				}
			});
		});
		
		return result;
	},
	GetPushDataId:function(item,type,result){
		var signInfo = ContentScript.GetSignInInfo();
		var id = type+item[0]+item[1]+item[2]+item[3]+item[4]+item[5];
		var count = 0;
		$(result).each(function(i){
			if($(this)[0].id.indexOf(id)>=0){
				count=count+1;
			}
		});
		if(count>0){
			id=id+ (count+1);
		}
		return id;
	},
	GetAllPushData:function(){
		$.ajax({
		              type: "get",
		              url: "GetData.ashx",
		              data: "Otype=get",
		              success: function (msg) {
		                  ContentScript.allPushData = $.parseJSON(msg);;
		              }
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


