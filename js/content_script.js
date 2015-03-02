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
	htmlContent+= "<div><input style='display:in-line' type='button' id='startSearch' value='开始'/><br/><div id='countQ'></div></div>"
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
				$("#countQ").append("吃:(<font color='red'>"+(result1.length+result3.length)+"</font>) 赌(<font color='red'>"+(result2.length+result4.length)+"</font>)");
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
		$("input[name='delete']").bind("click",function(){
			ContentScript.DelteLine(this);
		});
		//绑定交易事件
		$("input[name='transactionButton']").bind("click",function(){
			ContentScript.TranactionEvent();
		})
	},
	DelteLine:function(obj){
		$(obj).parent().parent().hide();
	},
	TranactionEvent:function(obj){
		var jsonText = $(obj).parent().parent().find("input[name='jsonValue']").val();
		var jsonValue = $.JSON(jsonText);
		
		//添加后续提交交易的方法
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
		try	{ area = $($("ul a span~span")[parseInt(result[0].area)]).text();}catch(e){} 
		var html='<p><h4>区域 <font color="green">('+ area +')</font></h3></p><table class="bettable">'
		html += '<tr>'
		html += '<th>批</th>'
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
			html += '<td><input type="checkbox" name="chkLine"/></td>'
			html += '<td>'+result[index].matches+'</td>'
			html += '<td>'+result[index].complex+'</td>'
			html += '<td>'+result[index].tickets+'</td>'
			html += '<td>'+result[index].precent+'</td>'
			html += '<td>'+result[index].limit+'</td>'
			html += "<td><input type='number' name='groupLimit' style='width:50px' type='number' value='"+$("#limitCount").val()+"' min='0' max='10000' /></td>"
			
			html += "<td><input type='button' name='transactionButton' value='交易'/><input type='button' name='delete' value='删'/></td><input type='hidden' name='jsonValue' value='"+JSON.stringify(result[index])+"'/>"
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
