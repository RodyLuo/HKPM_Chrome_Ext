$(window).load(function() {
	var htmlContent = "<div class='extenionMain' style='display:none'>";
    htmlContent+= "<div id='ExentionHead'>";
    htmlContent+= "	<h3 >	当前用户:<font id='popuserName' style='color: red;'>"+$.trim($("#username").text())+"</font></h3>"
	htmlContent+= "</div>"
	htmlContent+= "<div class='ExentionContent'>"
	htmlContent+= "<div class='whereCondition'>"
	htmlContent+= "折头:<input style='width:50px' type='number' min='0' max='100' id='minPrecent' value='80' />--<input style='width:50px' type='number' min='0' max='100' value='90'  id='maxPrecent'/><br/>"
	htmlContent+= "极限:<input type='number' style='width:50px' type='number' min='0' max='10000' value='110'  id='minLimit' />--<input type='number' size='5' style='width:50px' id='maxLimit' value='700' type='number' min='0' max='10000'/><br/>"
	htmlContent+= "限注:<input type='number' style='width:50px' type='number' value='2' min='0' max='10000' id='limitCount' />条<br/>"
	htmlContent+= "<div><input style='display:inline-block' type='button' id='startSearch' value='开始'/><br/><div id='countQ'></div></div>"
	htmlContent+= "</div>"
	htmlContent+="<div id='extenionContent'></div>";
	htmlContent+= "</div>";
	$("body").append(htmlContent);
	this.ContentScript.onInit();
	
	$(".extenionMain").show(1000);
});

ContentScript ={
	onInit:function(){
		$("#startSearch").bind('click',function(){
			ContentScript.onButtonClick();
		});
	},
	onButtonClick:function(){
		if(this.checkCondition()){
			//如果是Q 
			var currentUrl = window.location.href;
			if(currentUrl.indexOf("Q.jsp?")>=0){
				$("#extenionContent").empty();
				var result1 = ContentScript.GetQData("1");
				var result2 = ContentScript.GetQData("2");
				var result3 = ContentScript.GetQData("3");
				var result4 = ContentScript.GetQData("4");
				$("#countQ").empty();
				var chi= (result1.length+result3.length);
				var du = (result2.length+result4.length);
				$("#countQ").append("吃:(<font color='red'>"+chi+"</font>) 赌(<font color='green'>"+du+"</font>)");
				//Area1
				if( result1!=null && result1!=undefined && result1.length >0) {
					$("#extenionContent").append(ContentScript.buildHtml(result1));
				}
				//Area2
				if( result2!=null && result2!=undefined && result2.length >0) {
					$("#extenionContent").append(ContentScript.buildHtml(result2));
				}
				//Area3
				if( result3!=null && result3!=undefined && result3.length >0) {
					$("#extenionContent").append(ContentScript.buildHtml(result3));
				}
				//Area4
				if( result4!=null && result4!=undefined && result4.length >0) {
					$("#extenionContent").append(ContentScript.buildHtml(result4));
				}
				
				ContentScript.EventOnInit();
			}else{
				alert("目前外挂只支持Q功能，更多功能请期待后续更新( ⊙o⊙ )")
				$(".extenionMain").hide(1000);
			}
		}
	},
	EventOnInit:function(){
		//绑定删除事件
		$("a[name='deleteLine']").bind("click",function(){
			ContentScript.DelteLine(this);
		});
		//绑定交易事件
		$("input[name='transactionButton']").bind("click",function(){
			ContentScript.TranactionEvent(this);
		})
	},
	DelteLine:function(obj){
		$(obj).parent().parent().hide();
		$(obj).parent().parent().empty();
	},
	TranactionEvent:function(obj){
		var jsonText = $(obj).parent().parent().find("input[name='jsonValue']").val();
		var jsonValue = $.parseJSON(jsonText);
		
		//添加后续提交交易的方法		
		if(ContentScript.checkTransactionValidation(obj,jsonValue)){
			ContentScript.TranactionSubmit(obj,jsonValue);
		}else{
			$(obj).parent().parent().find("input[name='groupLimit']:first").get(0).focus();
		}
	},
	checkTransactionValidation:function(obj,jsonValue){
		var tixObj = $(obj).parent().parent().find("input[name='groupLimit']:first")
		if(tixObj){
			var tix = parseInt(tixObj.val());
			if(isNaN(tix)){alert("票数不合法，请输入数字");return false;}
			if(tix<=0){alert("票数必须大于零");return false;}
			if(tix>parseInt(jsonValue.tickets)){alert("票数必须小于等于现有数量");return false;}
			return true;
		}
	},
	TranactionSubmit:function(obj,jsonValue){
		var tix = $(obj).parent().parent().find("input[name='groupLimit']").val()
		var f;
		var index = jsonValue.area;
		//area1
		if(parseInt(index)==1){
			f = $("#boxFcBET").get(0);			
		}
		//area2
		if(parseInt(index)==2){
			f = $("#boxFcEAT").get(0);
		}
		//area3
		if(parseInt(index)==3){
			f = $("#boxPfcBET").get(0);
		}
		//area4
		if(parseInt(index)==4){
			f = $("#boxPfcEAT").get(0);
		}
		f.Tix.value = tix;
		//如果含有括号特殊处理一下
		if(jsonValue.complex.indexOf("(")<0){
			f.Hs1.value = jsonValue.complex.split("-")[0];
			f.Hs2.value = jsonValue.complex.split("-")[1];
		}else{
			f.Hs1.value = jsonValue.complex.replace(/\(/g,"").replace(/\)/g,"").split("-")[0];
			f.Hs2.value = jsonValue.complex.replace(/\(/g,"").replace(/\)/g,"").split("-")[1];
		}			
		f.Race.value = jsonValue.matches;
		f.amount.value = jsonValue.tickets;
		f.fclmt.value = jsonValue.limit;
		ContentScript.TransactionPost('http://'+window.location.host+'/forecast?flag='+f.flag.value+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hs1=' + f.Hs1.value + '&Hs2=' + f.Hs2.value + '&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
		
		$(obj).parent().html("<font color='green'>已交易</font>");
	},
	TransactionPost:function(url){
		var view1=document.getElementById("view1");
		var vrtPOST = window.frames["vrtPOST"];
		if(view1) {
			var y = view1.options[view1.selectedIndex].value;
			if(vrtPOST) {
				vrtPOST.location = url  + "&show="+y+ "&rd=" + Math.random();
			}
		}
	},
	GetQData:function(index){
		var QdataResult = [];
		var urlConfig = window.frames["vrtFC_"+index].location.href.split("&");
		var mode = "";
		var cur_slot ="";
		$(urlConfig).each(function(index){
			if(urlConfig[index].indexOf("m=")>=0){
				mode = urlConfig[index].split("=")[1];
			}
			if(urlConfig[index].indexOf("c=")==0){
				cur_slot = urlConfig[index].split("=")[1];
			}
		})
		$.ajax(
				{
		             type: "GET",
		             url: "http://"+window.location.host+"/qdata",		             
		             data: {'q':index,'race_date':$("input[name='race_date']:first").val(),'race_type':$("input[name='race_type']:first").val(),'rc':$("#view1").val(),m:mode,'c':cur_slot},
		             dataType: "text",
		             async:false,
		             success: function(da)
		             {
		                  var result = PAOMAHelper.TexToJson(da,index);
		                  QdataResult = result;
		             },
		             error:function (da, status, e){   
	     				 QdataResult = [] ;
	   				 }   
	   				 
	             });	
	    return QdataResult;
	},
	buildHtml:function(result){
		var area = "";
		try	{ area = $($("ul a span~span")[parseInt(result[0].area)-1]).text();}catch(e){} 
		var html='<p><h4>区域 '+result[0].area+'<font color="green">('+ area +')</font></h3></p><table class="bettable">'
		html += '<tr>'
		html += '<th>删</th>'
		html += '<th width="16%">场</th>'
		html += '<th width="20%">马</th>'
		html += '<th width="34%">票数$</th>'
		html += '<th width="12%">%</th>'
		html += '<th width="18%">限额</th>'
		html += '<th>条</th>'
		html += '<th>操作</th>'
		html += '</tr>'
		//{"area":area,"matches":tempArray[0],"complex":"'"+tempArray[1]+"'","tickets":tempArray[2],"precent":tempArray[3],"limit":tempArray[4]});
		$(result).each(function(index){
			html += '<tr>'
			html += '<td><a href="javasript:void(0)" name="deleteLine">☒</a></td>'
			html += '<td>'+result[index].matches+'</td>'
			html += '<td>'+result[index].complex+'</td>'
			html += '<td>'+result[index].tickets+'</td>'
			html += '<td>'+result[index].precent+'</td>'
			html += '<td>'+result[index].limit+'</td>'
			html += "<td><input type='number' name='groupLimit' style='width:50px' type='number' value='"+$("#limitCount").val()+"' min='0' max='10000' /></td>"
			
			html += "<td><input type='button' name='transactionButton' value='交易'/><input type='hidden' name='jsonValue' value='"+JSON.stringify(result[index])+"'/></td>"
			html += '</tr>'
		})
		
		html += '</table><br/>'
		
		return html;
	},
	checkCondition:function(){
		var minPrecent = $("#minPrecent")
		var maxPrecent = $("#maxPrecent")
		var minLimit = $("#minLimit")
		var maxLimit = $("#maxLimit")
		var limitCount = $("#limitCount")
		
		if(minPrecent.val().length==0&&maxPrecent.val().length==0){ alert("请输入折头！");return false;}
		if(parseInt(minPrecent.val())>parseInt(maxPrecent.val())){
			alert("折头范围错误！");
			return false;
		}
		if(minLimit.val().length==0&&maxLimit.val().length==0){ alert("请输入极限！");return false;}
		if(parseInt(minLimit.val())>parseInt(maxLimit.val())){
			alert("极限范围错误！");
			return false;
		}
		if(limitCount.val().length==0){ alert("请输入限注！");return false;}
		return true;
	}
};
/*帮助类 对数据进行格式化*/
PAOMAHelper ={
	TexToJson:function(data,area){
		var resultData = $(data).text().replace(/top.getFC_EAT\(\);/g,"").replace(/document.domain = 'ctb988.com';/g,"").replace(/top.getFC\(\);/g,"")
		var AllArray = resultData.replace(/\t/g,",").replace(/\n/g,";").split(";");
		var result =[];
		for(var item in AllArray) {
			var tempArray = AllArray[item].split(",");
			if(parseFloat($("#minPrecent").val())<= parseFloat(tempArray[3] )
				&& parseFloat($("#maxPrecent").val())>=parseFloat(tempArray[3])
				&& parseFloat($("#minLimit").val())<= parseFloat(tempArray[4] )
				&& parseFloat($("#maxLimit").val())>=parseFloat(tempArray[4])){
				result.push({"area":area,"matches":tempArray[0],"complex":tempArray[1],"tickets":tempArray[2],"precent":tempArray[3],"limit":tempArray[4]});
			}
			tempArray = [];
		}
		return result;
	}
};
DBHelper={
	ConfigAdd:function(key,val){
		var db = openDatabase('Rody.PaoMaDB', '1.0', 'Rody.PaoMaDB', 2 * 1024 * 1024);
		db.transaction(function (tx) {
	    	tx.executeSql('CREATE TABLE IF NOT EXISTS Config (id INTEGER PRIMARY KEY, key,value)');
	   		tx.executeSql('INSERT INTO Config(key, value) VALUES ("'+key+'", "' +val+'")');
 		});
	},
	SelectConfigValue:function(key){
		var re = "";
		var db = openDatabase('Rody.PaoMaDB', '1.0', 'Rody.PaoMaDB', 2 * 1024 * 1024);
		db.transaction(function (tx) {
    	tx.executeSql('SELECT * FROM Config WHERE key=?', [key], function (tx, results) {
   				results.rows.item(0).value;
			}, null);
		});
		return re;
	}
}
