var timerClock=null;

$(window).load(function() {
	var currentUrl = window.location.href;
	if(currentUrl.indexOf("Q.jsp?")>=0){
		var htmlContent = "<div style='display:none,position:absolute;width:350px;height:100%;border:1px solid red;float:right;z-index:100;right:0;top:0;min-height:250px;overflow-y:auto;max-height:600px;background-color: #F2F2F2;'>";
	    htmlContent+= "<div id='ExentionHead'>";
	    htmlContent+= "	<h3 >	当前用户:<font id='popuserName' style='color: red;'>"+$.trim($("#username").text())+"</font></h3>"
		htmlContent+= "</div>"
		htmlContent+= "<div class='ExentionContent'>"
		htmlContent+= "<div><input style='display:none' type='button' id='startSearch' value='全部交易'/><br/><div id='countQ'></div></div>"
		htmlContent+="<div id='extenionContent' style='padding: 5px,5px,5px,5px;'></div>";
		htmlContent+= "</div>";
		$("body").append(htmlContent);
		ContentScript.timeClock();
		$(".extenionMain").show(1000);
	}
});

ContentScript ={
	timeClock:function(){
		timerClock = setInterval(ContentScript.onInit(),1000); 
	},
	onInit:function(){
		var result = ContentScript.GetQData();
		if(result!=null&&result!=undefined&&result.length>0){
			ContentScript.buildHtml(result);
			ContentScript.EventOnInit();
		}
	},	
	EventOnInit:function(){
		//绑定交易事件
		$("input[name='transactionButton']").bind("click",function(){
			clearInterval(timerClock);
			ContentScript.TranactionEvent(this);
			ContentScript.timeClock();
		})
	},
	TranactionEvent:function(obj){
		var jsonText = $(obj).parent().parent().find("input[name='jsonValue']").val();
		var jsonValue = $.parseJSON(jsonText);
		
		//添加后续提交交易的方法
		ContentScript.TranactionSubmit(obj,jsonValue,false);
	},
	TranactionSubmit:function(obj,jsonValue,isAll){
		if(isAll){
			//点击全部删除
			$(window.frames["frmTRANS"].document).find("tbody[id^='DAmr'] tr").find(".del_ch").click();
		}else{
			var key = $(obj).parent().parent("td :gt(1)").tex();
			$(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr td :eq(2)").each(function(){
				if($(this).text()==key){
					$(this).parent().parent().find(".del_ch").click();
				}
			});
		}
	},
	GetQData:function(){
		var QdataResult = [];
		var item = {};
		var type = 0;
		$(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr").each(function(index){
			var temp = "";
			$(this).find("td :lt(6)").each(function(item){
				//<tr onclick="mr('47021643,3,0,04-03-2015,3H,1')" class=""><td>1</td><td class="RD F_B"></td>
				//<td class="F_B ">4-5</td><td id="DBmr('47021643_3_0_04-03-2015_3H_1')B">2</td><td>80</td>
				//<td class="RD ">700</td><td><span class="del_ch">删</span></td></tr> 
				temp += $(this).text()+"$";
			})
			if(temp.length>0){
				$(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr .del_ch").length
				var arrayList = temp.split("$");
				if(tempArray[2].indexOf(/\(/g)>=0){
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
			$(this).find("td :lt(6)").each(function(item){
				//<tr onclick="mr('47021643,3,0,04-03-2015,3H,1')" class=""><td>1</td><td class="RD F_B"></td>
				//<td class="F_B ">4-5</td><td id="DBmr('47021643_3_0_04-03-2015_3H_1')B">2</td><td>80</td>
				//<td class="RD ">700</td><td><span class="del_ch">删</span></td></tr> 
				temp += $(this).text()+"$";
			})
			if(temp.length>0){
				var arrayList = temp.split("$");
				if(tempArray[2].indexOf(/\(/g)>=0){
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
	buildHtml:function(result){
		var doResult = [] ;
		var keyList = [];
		result.each(function(index){
			if(keyList.indexOf(result[index].complex+result[index].type)>=0){
				doResult[keyList.indexOf(result[index].complex)].count+=1;
				doResult[keyList.indexOf(result[index].complex)].tickets+=result[index].tickets;
				doResult[keyList.indexOf(result[index].complex)].collectionData.push(result[index]);				
			}else{
				keyList.push(result[index].complex+result[index].type);
				doResult.push({"key":result[index].complex,"matches":result[index].matches,"tickets":result[index].tickets,"count":1,"collectionData":[result[index]]});
			}
		});
		
		var html='<p><h4>待操作统计</h4></p><table class="bettable">'
		html += '<tr>'
		html += '<th width="16%">场</th>'
		html += '<th width="20%">马</th>'
		html += '<th width="34%">票数$</th>'
		html += '<th>总</th>'
		html += '<th>操作</th>'
		html += '</tr>'
		$(result).each(function(index){
			html += '<tr>'
			html += '<td>'+result[index].matches+'</td>'
			html += '<td>'+result[index].complex+'</td>'
			html += '<td>'+result[index].tickets+'</td>'
			html += '<td>'+result[index].count+'</td>'
			if(result)
			html += "<td><input type='button' style='back-ground:#f18200' name='transactionButton' value='交易'/><input type='hidden' name='jsonValue' value='"+JSON.stringify(result[index])+"'/></td>"
			html += '</tr>'
		})
		
		html += '</table><br/>'
		
		return html;
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
