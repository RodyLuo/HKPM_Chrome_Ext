function MM_preloadImages() {
    // loaded = true;
    var d = document;
    if (d.images) {
        if (!d.MM_p)
            d.MM_p = new Array();
        var i,
        j = d.MM_p.length,
        a = MM_preloadImages.arguments;
        for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) {
            d.MM_p[j] = new Image;
            d.MM_p[j++].src = a[i];
        }
    }
}

function shwMain2( i, n, card,width,height ) {
	var w,h;	
	if(!width) w=1010;else w=width;
	if(!height) h=680;else h=height;
	var rzable="no";
	if((en_sml && !isIE678))rzable="yes";
	if(en_sml){
		h=browser_height;
		w=browser_width;
		if(browser_size=='L'){
			if(h<700) h = 700;
		}else if(browser_size == 'M'){
			if(h<650) h = 650;
		}else{
			if(h<600) h = 600;
		}		
	}
	
	var m = "width="+w+",height="+h+",top=2,left=2,toolbar=no,menubar=no,resizable="+rzable+",scrollbars=no,status=no,location=no,directories=no";
	if( !winOTHER[i] || winOTHER[i].closed ){
		var querystr=n.substring(n.indexOf('?'));  
		top.post(urlX+"/datastore"+querystr+"&card_tab=del");
		if(en_sml){
			n+=("&sml="+browser_size.toLowerCase());		  
		}
		
		winOTHER[i] = window.open(urlX+n, card, m, true);
	}  
	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {winOTHER[i].parent.blur();}
	winOTHER[i].focus();
}



function chgRace(x) {
	for(var i=0;i<4;i++){
		var target=document.getElementById('frmFC_'+(i+1));
		if(target!=null && target.contentWindow.is_dynamic_rendering)
			target.contentWindow.exit_initBar=false;		   		
	}
	isFirstForFrmTRANS=true;
	updateRadio();
	
	var isSelBetFC=true;
	var isSelEatFC=true;
	if(PageConfig.ENABLE_LOCK_LIMIT_Q){
		isSelBetFC=document.getElementById('fcfrm1').fctype.value=='0';
		isSelEatFC=document.getElementById('fcfrm2').fctype.value=='0';
	}
	LockLimitQHandler.permitRunFixValues(false);
	Forecast.toggleQ(  (isSelBetFC?0:1) );
	Forecast.toggleQP( (isSelEatFC?0:1) );
	LockLimitQHandler.permitRunFixValues(true);
	
	if(tmrBRDCST) clearInterval(tmrBRDCST);
	document.getElementById("view1").selectedIndex= x.selectedIndex;
	//var y = x.options[x.selectedIndex].value;
	recall_new();
	tmrBRDCST = setBroadcast();
	setRc(x);
	reset_txn_init();
	set_panel(false);
	LockLimitQHandler.fixBatEatValues();
}

function setRc(x) {
	var view1=document.getElementById("view1");
	var fcfrm1=document.getElementById("fcfrm1");
	var fcfrm2=document.getElementById("fcfrm2");
	
	view1.selectedIndex= x.selectedIndex;
	var y = x.options[x.selectedIndex].value;
	
	var tempFcType1=fcfrm1.fctype.value;
	var tempFcType2=fcfrm2.fctype.value;
	
	fcfrm1.Clear.click();fcfrm2.Clear.click();//click will change fcfrm1-2 value in IE 6,7,8

	if(PageConfig.ENABLE_LOCK_LIMIT_Q){		
			if(tempFcType1=='1')document.getElementById('zQ_tab2').click();
			if(tempFcType2=='1')document.getElementById('zQ_tab4').click();		
	}	
	
	if(y != 0)  {
		fcfrm1.Race.value =y;
		fcfrm2.Race.value = y;
	}

	if (fcfrm1.Hs1 != null && fcfrm1.Hs1.type!='hidden') {
		if(y==0)fcfrm1.Race.focus(); else fcfrm1.Hs1.focus();
	}	else if(fcfrm1.Hs1.type=='hidden'){
		if(y==0)fcfrm1.Race.focus(); else fcfrm1.Hss.focus();
	}
}

function chkClear(f_id) {
	var f=null;
	if(f_id=='fcfrm1'){
		f=document.getElementById("fcfrm1");
		updateRadio1();
	}else if(f_id=='fcfrm2'){
		f=document.getElementById("fcfrm2");
		updateRadio2();
	}
	var view1 = document.getElementById("view1");
	x = view1.options[view1.selectedIndex].value;
	if(x < 1) {
		f.Race.value = '';
		f.Race.focus();
	}
	
	if(!(x<1))	setTimeout("document.getElementById('"+f_id+"').Race.value="+x , 1);
	if(f_id == 'fcfrm1'){
		var fcButton = document.getElementById("zQ_tab2");
		if(fcButton!=null){
			if(fcButton.checked == true){
				setTimeout(f_id + ".fctype.value=" + 1, 1);
				setTimeout(f_id + ".amount.value=" + PageConfig.pft_amount, 2);
				setTimeout(f_id + ".fclmt.value=" + PageConfig.pft_limit, 3);
				
			}
		}
	} else if (f_id == 'fcfrm2'){
		var fcButton = document.getElementById("zQ_tab4");
		if(fcButton!=null){
			if(fcButton.checked == true){
				setTimeout(f_id + ".fctype.value=" + 1, 1);
				setTimeout(f_id + ".amount.value=" + PageConfig.pft_amount, 2);
				setTimeout(f_id + ".fclmt.value=" + PageConfig.pft_limit, 3);
			}
		}
	}
	
	if(f_id=='fcfrm1'){
		setTimeout('LockLimitQHandler.fixValues(true);',4);
	}else if(f_id=='fcfrm2'){
		setTimeout('LockLimitQHandler.fixValues(false);',4);
	}
	
	if(!(x<1)){
		if(f.Horse!=null){
			f.Horse.focus();
		}else if (f.Hs1 != null && f.Hs1.type!='hidden') {
			f.Hs1.focus();
		}else if(f.Hs1.type=='hidden'){
			f.Hss.value='';
			f.Tix.value='';
			f.Hss.focus();
		}
	}
	return;
}


function setBroadcast() { 
	return setInterval("recall();", 30000);
}

var timer_1=0,timer_2=0,timer_3=0,timer_4=0,toteTimer=0,transTimer=0;
function recall(){
	var date = new Date();
	var view1 = document.getElementById("view1");
	var y = view1.options[view1.selectedIndex].value;
	if((date.getTime()-transTimer)>10000){
		vrtTRANS.location = "/datastore?l=x&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&q=q&x=" + Math.random()+"&tnum="+tnum+"&txnrnd="+txnrnd;
	}
	if((date.getTime()-timer_1)>10000){
		vrtFC_1.location = urlY+"/qdata?q=1&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
		vrtFC_2.location = urlY+"/qdata?q=2&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
		vrtFC_3.location = urlY+"/qdata?q=3&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
		vrtFC_4.location = urlY+"/qdata?q=4&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
	}
	if(view1.options.length>1){//fix race 99 (all races) JS error, ethan, 2014/11/21
	vrtTOTE.location = "/totedata?race_date="+ PageConfig.race_date +"&qMode=QQ&race_type="+ PageConfig.race_type +"&rc=" + y  + "&x=" + Math.random() + "&rcs="+view1.options[1].value;
}
}

function recall_new(){
	
	var view1 = document.getElementById("view1");
	var y = view1.options[view1.selectedIndex].value;
	vrtTRANS.location = urlX+"/datastore?race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&q=q&x=" + Math.random()+"&tnum="+tnum+"&txnrnd="+txnrnd;
	
	vrtFC_1.location = urlY+"/qdata?q=1&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
	vrtFC_2.location = urlY+"/qdata?q=2&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
	vrtFC_3.location = urlY+"/qdata?q=3&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
	vrtFC_4.location = urlY+"/qdata?q=4&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
	
	vrtTOTE.location = urlX+"/totedata?race_date="+ PageConfig.race_date +"&qMode=QQ&race_type="+ PageConfig.race_type +"&rc=" + y  + "&x=" + Math.random() + "&rcs="+view1.options[1].value;
}
function recall3(){
	
	var view1 = document.getElementById("view1");
	var y = view1.options[view1.selectedIndex].value;
	vrtTRANS.location = urlX+"/datastore?l=x&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&d=p&rc=" + y  + "&q=q&x=" + Math.random()+"&tnum="+tnum+"&txnrnd="+txnrnd;
	//var date = new Date();
	vrtFC_1.location = urlY+"/qdata?q=1&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
	vrtFC_2.location = urlY+"/qdata?q=2&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
	vrtFC_3.location = urlY+"/qdata?q=3&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
	vrtFC_4.location = urlY+"/qdata?q=4&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y  + "&m="+ PageConfig.mode +"&c="+ PageConfig.cur_slot +"";
	
	vrtTOTE.location = urlX+"/totedata?race_date="+ PageConfig.race_date +"&qMode=QQ&race_type="+ PageConfig.race_type +"&rc=" + y  + "&x=" + Math.random() + "&rcs="+view1.options[1].value;
}
function blinkIt() {
	if (!document.all) return;
	else {
		for(var i=0;i<document.all.tags('blink').length;i++){
			s=document.all.tags('blink')[i];
			s.style.visibility=(s.style.visibility=='visible')  ?'hidden':'visible';
		}
	}
}


function emc2() {
	var view1=document.getElementById("view1");
    var y = view1.options[view1.selectedIndex].value;
	vrtTRANS.location = urlX+"/datastore?race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y+ "&q=q&x=" + Math.random()+"&tnum="+tnum+"&txnrnd="+txnrnd;
}
function emc3() {
	var view1=document.getElementById("view1");
	var y = view1.options[view1.selectedIndex].value;
	vrtTRANS.location =urlX+"/datastore?l=x&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&rc=" + y+ "&q=q&x=" + Math.random()+"&tnum="+tnum+"&txnrnd="+txnrnd;

	if(tmrBRDCST) clearInterval(tmrBRDCST);
	tmrBRDCST = setBroadcast();
}

function emc4() {
	var view1=document.getElementById("view1");
	var y = view1.options[view1.selectedIndex].value;
	vrtTRANS.location =urlX+"/datastore?l=x&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&c=1&rc=" + y+ "&q=q&x=" + Math.random()+"&tnum="+tnum+"&txnrnd="+txnrnd;
}
function reset_txn_init() {//for txn_switch_click use
	var view1=document.getElementById("view1");
	var y = view1.options[view1.selectedIndex].value;
	tnum=0;
	vrtTRANS.location =urlX+"/datastore?l=x&d=p&race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"&c=1&rc=" + y+ "&q=q&x=" + Math.random()+"&tnum=0&txnrnd="+txnrnd;
}
function SCR() {
	 var panel=window.open(urlX+"/scr.jsp?race_date="+ PageConfig.race_date +"&type=" + PageConfig.location,PageConfig.card_uid+"_winSCRHS","width=660,height=510,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}

function sgTote() {
	var panel=window.open(urlX+"/sg_div_fc.jsp?race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type +"","sgTote","width=690,height=670,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}


function Live(loc)  {
	
	var liveCardName = PageConfig.card_uid + "_winLIVEVIDEO";
	
	openLiveWindow(loc, liveCardName);
	//set channel number in the cookie
	set_live_channel_num_cookie(PageConfig.username, PageConfig.location, 1);
	//force to reload LiveNewsController(4 sec meta refresh), 
	//where it finds the Channel mapping there
	//to reduce the latency of switching channel
	try{
		//console.log("force reload");
		winOTHER[liveCardName].document.getElementById('flash_iframe').contentWindow.force_get_channel();
		winOTHER[liveCardName].focus();
	}catch(err){
		//switch channel not successful
	}
	
}

function results() {
	var panel=window.open(urlX + "/results.jsp?d="+ PageConfig.race_date +"&queryloc=" + PageConfig.location +"#"+PageConfig.location+"down",PageConfig.card_uid + "_winRESULTS","width=890,height=680,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}

function openCardSchedule() {		
	var panel=window.open(urlX+"/member/openCardSchedule.jsp?" + Math.random(),PageConfig.card_uid+"_winOPENCARDSCHEDULE","width=980,height=650,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
};

function treeview() {
	var panel=window.open(urlX+"/member_tree_fin.jsp?" + Math.random(),PageConfig.card_uid + "_fintreeview","width=1010,height=655,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}


function users() {
	var usersfile=urlX+"/acc_tree.jsp?";
	var w= (browser.isFF ? 1027 : 1010);
	var panel=window.open(usersfile + Math.random(),PageConfig.card_uid + "_winUSERS","width="+w+",height=640,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}

function profile() {
	var panel=window.open(urlX+"/profile.jsp?" + Math.random(),PageConfig.card_uid + "_winPROFILE","width=761,height=640,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}

function card() {
	var panel=window.open(urlX+"/carddetails.jsp",PageConfig.card_uid + "_winCARDINFO",
    "width=1010,height=680,top=5,left=5,toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}

var snd = 0;
function post(url) {
//	console.debug("start post");
//	console.debug(url  + "&show="+y+ "&rd=" + Math.random());
	var view1=document.getElementById("view1");
	if(view1) {
		var y = view1.options[view1.selectedIndex].value;
		if(vrtPOST) {
			vrtPOST.location = url  + "&show="+y+ "&rd=" + Math.random();
		}
	}
}
function post2(url) {
	var view1=document.getElementById("view1");
	var y = view1.options[view1.selectedIndex].value;
	vrtPOST2.location = url  + "&show="+y+ "&rd=" + Math.random();
}

function post3(url) {
	var view1=document.getElementById("view1");
	var y = view1.options[view1.selectedIndex].value;
	vrtPOST3.location = url  + "&show="+y+ "&rd=" + Math.random();
}

function post4(url) {
	var view1=document.getElementById("view1");
	var y = view1.options[view1.selectedIndex].value;
	vrtPOST4.location = url  + "&show="+y+ "&rd=" + Math.random();
}

function toggleMenu(){

	var m1=document.getElementById('m1');
	var m2=document.getElementById('m2');
	if (m1.style.display == "none") {
		m1.style.display = "";
		m2.style.display = "none";
	} else {
		m2.style.display = "";
		m1.style.display = "none";
	}
}

function hideSelectPanel(){
	Forecast.hideSelectPanel();
}

function updateRadio() {
	updateRadio1();
	updateRadio2();
}

function updateRadio1() {
	document.getElementById('banker1').checked=false;
	f1radio();
}

function updateRadio2() {
	if(document.getElementById('banker2').type!='hidden'){
		document.getElementById('banker2').options[0].selected=true;
	}else{
		document.getElementById('banker2').value='0';
	}
	f2radio();
}

function f1radio(){
	var ib=document.getElementById('ib2118');
	if(ib){
		var img=document.getElementById('img2118');
		if(document.getElementById('banker1').checked){
			ib.className='input_box3x';
			img.style.display='';
			
		}else{
			ib.className='input_box3';
			img.style.display='none';
		}
	}
	
}

function f2radio(){
	var ch,ch2,readonly,readonly2;
	var ban2=document.getElementById('banker2').value;
	var ib=document.getElementById('ib2119');
	if(ib){
		var img=document.getElementById('img2119');
		
		if(ban2=='1' ||ban2=='2'){
			ib.className='input_box3x';
			img.style.display="";
		}else if(ban2=='0' ||ban2=='3'){
			ib.className='input_box3';
			img.style.display="none";
		}
	}
	
	if(ban2=='0' || ban2=='1'){
		ch='';readonly=false;
		ch2='';readonly2=false;
	}else if(ban2=='2'){
		ch='*';readonly=true;
		ch2='';readonly2=false;
	}else if(ban2=='3'){
		ch='*';readonly=true;
		ch2='*';readonly2=true;
		
	}
	var fcfrm2=document.getElementById('fcfrm2');
	fcfrm2.Hs1.value=ch2;
	fcfrm2.Hs1.readOnly=readonly2;
	fcfrm2.Hs2.value=ch;
	fcfrm2.Hs2.readOnly=readonly;
	fcfrm2.Hs3.value=ch;
	fcfrm2.Hs3.readOnly=readonly;
	fcfrm2.Hs4.value=ch;
	fcfrm2.Hs4.readOnly=readonly;
	fcfrm2.Hs5.value=ch;
	fcfrm2.Hs5.readOnly=readonly;
	fcfrm2.Hs6.value=ch;
	fcfrm2.Hs6.readOnly=readonly;
	fcfrm2.Hs7.value=ch;
	fcfrm2.Hs7.readOnly=readonly;
	fcfrm2.Hs8.value=ch;
	fcfrm2.Hs8.readOnly=readonly;
}

function openLiveWindow(loc, liveCardName) {
	if(browser.isIE) {
		if(typeof(winOTHER[liveCardName]) != 'undefined' && winOTHER[liveCardName] != null && !winOTHER[liveCardName].closed ){
			return;
		}
	}
	
	var addinfo="";
	if(loc != undefined) {
		addinfo = "?loc_id="  + PageConfig.location + "&windowname=" + window.name;
	}
	var livePanel=window.open(urlX+"/new_player/live3_v2.jsp"+addinfo,liveCardName,"width=810,height=510,top=5,left=5,toolbar=no,menubar=no,resizable=no,scrollbars=no,status=no,location=no,directories=no");
	if(livePanel) {
		livePanel.focus();
	}
}


function banking()  {
	var panel=window.open("/jsp/transfer_request.jsp?x="+Math.random(), PageConfig.username + "_banking","width=1007,height=672," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}

function History()  {
	var panel=window.open(urlX+"/new_history_live.jsp?uid=" + PageConfig.username, PageConfig.card_uid + "_winTRNSHST","width=1010,height=600,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}
function Guide()    {
	var panel=window.open(urlX+"/guide.jsp?mode="+PageConfig.mode+"&lang="+PageConfig.lang+"&" + Math.random(), PageConfig.card_uid + "_winGUIDE","width=980,height=650,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();

}

function payreport() {
	var panel=window.open(urlX+"/newPayReport.jsp?uid=" + PageConfig.username, PageConfig.card_uid + "_winPAYRPT","width=980,height=600,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}

function xrate() {
	var fileName = "xrate.htm";
	if(PageConfig.lang == "CH") {
		fileName = "xrate_cn.htm";
	}
	if(PageConfig.lang == "KR") {
		fileName = "xrate_kr.htm";
	}
	var panel=window.open(urlX+"/"+fileName+"?" + Math.random(),PageConfig.card_uid + "_winXRATE","width=900,height=480,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}

function cust() {
	var panel=window.open(urlX+"/cust_svc_new.jsp",PageConfig.card_uid + "_winCUSTSVC","width=400,height=415,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}


function moreQ(){
	var panel=window.open(urlX+"/HKOQ.jsp?race_date="+ PageConfig.race_date +"&race_type="+ PageConfig.race_type,PageConfig.card_uid + "_winMOREQ","width=800,height=600,top=5,left=5," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=yes,status=no,location=no,directories=no");
	if(panel)panel.focus();
}


var HDR_TOTE_2 = '<table class="Dvdnd FX" style="font:11px" cellspacing=0 width=100% height=100%>' +
  '<col><col width=37><col width=54><col><col width=37><col width=55>';


var HDR_WINPLA = '<table class="List FX" cellspacing=0 width=100%>' +
  '<col width=22 align=center><col width=22 align=center style="font:bold"><col width=50 align=center>' +
  '<col width=50 align=center><col width=28 align=center><col width=54 align=right><col>';

var HDR_EO = '<table class="List FX" cellspacing=0 width=100%>' +
  '<col width=30 align=center><col width=140 align=center style="font:bold"><col>';

var HDR_TRANS  = '<table class="List FX" cellspacing=0 width=100%>' +
	//Sam:14-Feb-09
  //'<col width=26 align=center><col width=19 align=center><col width=19 align=center style="font:bold">' +
  '<col width=26 align=center><col width=19 align=center><col width=45 align=center>' +
	//Sam:14-Feb-09
  //'<col width=49 align=center><col width=49 align=center><col width=25 align=center><col width=46 align=right><col>';
  '<col width=45 align=center><col width=32 align=center><col width=42 align=center><col width=25 align=right><col>';
if(PageConfig.race_type == "9U") {
	var HDR_FC = '<table class="List FX" cellspacing=0 width=100%>' +
	  '<col width=30 align=center><col width=30 align=center style="font:bold"><col width=30 style="font:bold" align=center>' +
	  '<col width=50 align=center><col width=30 align=center><col width=45 align=center><col>';	
} else {
	var HDR_FC = '<table class="List FX" cellspacing=0 width=100%>' +
	  '<col width=40 align=center><col width=40 align=center style="font:bold"><col width=40 style="font:bold" align=center>' +
	  '<col width=55 align=center><col width=40 align=center><col>';	
}

function ZZ_mr(id, x) {
	 top.post(urlX+'/transactions?type=del&bid='+id+'&x='+x);
}

function rows(xTableId){
	var rows = document.getElementById(xTableId).getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		var link = rows[i].getElementsByTagName("a");
		if(link.length == 1){
			rows[i].onmouseover = new Function("this.className='highlight'");
			rows[i].onmouseout = new Function("this.className=''");
		}
		
	}
}

function chkRc(rc_val) {
	var view1=document.getElementById("view1");
	var index = view1.selectedIndex;
	if(index != 0) {
		var rc = view1.options[index].value;
		if(rc != rc_val) {
			var msg = I18N.get("currently_viewing_Race");
			msg = msg.replace(/\{0\}/g, rc);
			msg = msg.replace(/\{1\}/g, rc_val);
			shwAlert('ERROR', msg, 20, 120, 400);
			return false;
		}
	}
	return true;
}


function sort(a,b) {
	return a - b;
}

function chkActRule(f){ //f umst be fcfrm1,fcfrm2
	
	if( !(f==fcfrm1||f==fcfrm2) ) {
		return false;
	}
	
	var i=0;
	var empty='';
	var info=new Array();
	
	if(f.Race.value!=empty) {
		if( !existRace(f.Race.value)){
			info[i]=I18N.get("no_race") + f.Race.value;
			i++;
		}else{
			if( f==fcfrm1 ||( f==fcfrm2 &&( fcfrm2.banker2.value=='0' || fcfrm2.banker2.value=='1'|| fcfrm2.banker2.value=='2'))){
				var horses=[f.Hs1.value,f.Hs2.value,f.Hs3.value,f.Hs4.value,f.Hs5.value,f.Hs6.value,f.Hs7.value,f.Hs8.value];
				
				if(f==fcfrm2 && fcfrm2.banker2.value=='2')  {
					horses=[f.Hs1.value];
				}
				//
				//when user input '0' or '00',data as '';
				for(var j=0;j<horses.length;j++){
					if(j==0 &&  ( f==fcfrm2 &&(  fcfrm2.banker2.value=='1'))  ) {
						continue;
					}
					if(horses[j]=='00' ||horses[j]=='0') {
						horses[j]='';
					}
				}
				
				//01->1,...,09->9
				for(var j=0;j<horses.length;j++){
					if(horses[j].length>1 &&  horses[j].indexOf('0')==0){
						horses[j]=horses[j].substring(1);
					}
				}
				
				var invalidHorse=new Array();
				var invalidIndex=0;
				
				
				outerloop:
				for(var j=0;j<horses.length;j++){
					if(horses[j]!=empty && !existHorse(f.Race.value,horses[j])){
						
						for(var k=0;k<invalidHorse.length;k++){
							if(invalidHorse[k]==horses[j])
								continue outerloop;
						}
						invalidHorse[invalidIndex]=horses[j];invalidIndex++;
					}
					
				}
				
				if(invalidHorse.length>0){
					invalidHorse.sort(sort);
					var nohorse=null;
					for(var k=0;k<invalidHorse.length;k++){
						if(k==0) {
							nohorse=I18N.get("Bets.horse_not_found") + ': <strong>' + invalidHorse[k] + '</strong>';
						} else {
							nohorse+=(',<strong>'+invalidHorse[k]+'</strong>');
						}
					}
					if(nohorse!=null){
						info[i]=nohorse;
						i++;
					}
				}
			}
		}
	}else{
		//Race is empty
		info[i]=I18N.get("hint_info_race");
		i++;
	}
	
	if( f==fcfrm1 ||( f==fcfrm2 &&( fcfrm2.banker2.value=='0' || fcfrm2.banker2.value=='1'))) {
		
		var horses=[f.Hs1.value,f.Hs2.value,f.Hs3.value,f.Hs4.value,f.Hs5.value,f.Hs6.value,f.Hs7.value,f.Hs8.value];
		//
		//when user input '0' or '00',data as '';
		for(var j=0;j<horses.length;j++){
			if(j==0 &&  ( f==fcfrm2 &&(  fcfrm2.banker2.value=='1'))  ) {
				continue;
			}
			if(horses[j]=='00' ||horses[j]=='0') {
				horses[j]='';
			}
		}
		
		//01->1,...,09->9
		for(var j=0;j<horses.length;j++){
			if(horses[j].length>1 &&  horses[j].indexOf('0')==0){
				horses[j]=horses[j].substring(1);
			}
		}
		//
		var count=0;
		for(var j=0;j<horses.length;j++){
			if(horses[j]==empty) {
				count++;
			}
		}
		
		if(count>=8){
			info[i]=I18N.get("hint_info_input_horse");
			i++;
		}else{
			var infoOrCheck=true;
			if( (f==fcfrm1 && fcfrm1.banker1.checked)  ||  (f==fcfrm2&&(fcfrm2.banker2.value=='1'))){
				//check 1st as Banker
				count=0;
				for(var j=1;j<horses.length;j++){
					if(horses[j]==empty)  {
						count++;
					} else{
						if(horses[0]!=empty && horses[j]==horses[0]) {
							count++;infoOrCheck=false;
						}
					}
				}
				if(count>=7){
					if(infoOrCheck){
						info[i]=I18N.get("hint_info_input_horse");
						i++;
					}else{
						info[i]=I18N.get("hint_info_check_horse");
						i++;
					}
				}else if(f.Hs1.value==empty) {
					info[i]= I18N.get("hint_info_1");
					i++;
				}
			}else if((f==fcfrm1 && (!fcfrm1.banker1.checked)) ||  (f==fcfrm2&&(fcfrm2.banker2.value=='0'))){
				// check Box
				count=0;
				for(var j=0;j<horses.length;j++){
					if(horses[j]==empty)  count++;
					else{
						for(var k=0;k<j;k++){
							if(horses[k]!=empty && horses[k]==horses[j])    {count++;infoOrCheck=false;break;}
						}
					}
				}
				if(count>=7){
					if(infoOrCheck){
						info[i]=I18N.get("hint_info_input_horse");
						i++;
					}else{
						info[i]=I18N.get("hint_info_check_horse");
						i++;
					}
				}
			}
		}
	}
	
	if( f==fcfrm2 && fcfrm2.banker2.value=='2'){
		if(f.Hs1.value==empty ||f.Hs1.value=='00'|f.Hs1.value=='0') {
			info[i]=I18N.get("hint_info_1");
			i++;
		}
		
	}
	//
	if(f.Tix.value==empty) {
		info[i]=I18N.get("hint_info_3");
		i++;
	} else {
		if(f.Tix.value < PageConfig.MIN_TIX) {
			info[i]=I18N.get("MIN_TIX_INFO");
			i++;
		}
		if(f.Tix.value > PageConfig.MAX_TIX) {
			info[i]=I18N.get("MAX_TIX_INFO");
			i++;
		}
	}
	if(f.amount.value==empty) {
		info[i]=I18N.get("hint_info_4");
		i++;
	}
	if(f==fcfrm1){
		if(f.fclmt.value==empty) {
			info[i]=I18N.get("hint_info_5");
			i++;
		}
	}
	
	var temp=empty;
	for (i=0;i<info.length;i++) {
		temp+="<li>"+info[i]+"</li>";
	}
	
	var betq=I18N.get("betq");
	var betqp=I18N.get("betqp");
	var eatq=I18N.get("eatq");
	var eatqp=I18N.get("eatqp");
	
	if(info.length==0) {
		return true;
	} else{
		if(f==fcfrm1 && fcfrm1.fctype.value == 0) {
			shwErrotAlert(betq.replace('uuuu',temp));
		} else if(f==fcfrm2 && fcfrm2.fctype.value == 0) {
			shwErrotAlert(eatq.replace('uuuu',temp));
		} else if(f==fcfrm1 && fcfrm1.fctype.value == 1) {
			shwErrotAlert(betqp.replace('uuuu',temp));
		} else if(f==fcfrm2 && fcfrm2.fctype.value == 1) {
			shwErrotAlert(eatqp.replace('uuuu',temp));
		}
		return false;
	}
}

function shwErrotAlert(msg){
	shwAlert('ERROR', msg, 20, 190, 405);
}

function shwInfoAlert(msg){
	shwAlert('INFO', msg, 20, 190, 405);
	
}
//public
function chkActBet(f){
	f = fcfrm1;
	var combo;
	if(f.banker1.checked) {
		combo=1;
	} else {
		combo=0;
	}
	if(chkActRule(f)){
		f.Order.disabled = true;
		post(urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hs1=' + f.Hs1.value + '&Hs2=' + f.Hs2.value + '&Hs3=' + f.Hs3.value+ '&Hs4=' + f.Hs4.value+ '&Hs5=' + f.Hs5.value+ '&Hs6=' + f.Hs6.value+ '&Hs7=' + f.Hs7.value+ '&Hs8=' + f.Hs8.value +'&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
	}
}
//public
function chkActEat(f){
	f = fcfrm2;
	var combo=f.banker2.value;
	if(chkActRule(f)){
		f.Order.disabled = true;
		post(urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hs1=' + f.Hs1.value + '&Hs2=' + f.Hs2.value + '&Hs3=' + f.Hs3.value+ '&Hs4=' + f.Hs4.value+ '&Hs5=' + f.Hs5.value + '&Hs6=' + f.Hs6.value+ '&Hs7=' + f.Hs7.value+ '&Hs8=' + f.Hs8.value+'&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
	}
}


//public
function chkAct5(f){
	f=document.getElementById('boxFcBET');
	f.style.display = "none";
	post(urlX+'/forecast?flag='+f.flag.value+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hs1=' + f.Hs1.value + '&Hs2=' + f.Hs2.value + '&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
}

function chkAct6(f){
	f=document.getElementById('boxFcEAT');
	f.style.display = "none";
	post(urlX+'/forecast?flag='+f.flag.value+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hs1=' + f.Hs1.value + '&Hs2=' + f.Hs2.value + '&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
}

function chkAct7(f){
	f=document.getElementById('boxPfcBET');
	f.style.display = "none";
	post(urlX+'/forecast?flag='+f.flag.value+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hs1=' + f.Hs1.value + '&Hs2=' + f.Hs2.value + '&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
}

function chkAct8(f){
	f=document.getElementById('boxPfcEAT');
	f.style.display = "none";
	post(urlX+'/forecast?flag='+f.flag.value+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hs1=' + f.Hs1.value + '&Hs2=' + f.Hs2.value + '&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
}


function chkKBBet(f){
	f = fcfrm1;
	if(f.fctype.value == 0){
		chkKB1(f);
	} else if(f.fctype.value == 1){
		chkKB3(f);
	}
}

function chkKBEat(f){
	f = fcfrm2;
	if(f.fctype.value == 0){
		chkKB2(f);
	} else if(f.fctype.value == 1){
		chkKB4(f);
	}
}

function chkKB1(f){
	f=fcfrm1;
	var combo;
	if(f.Hss.value.indexOf('>')>-1) {
		combo=1;
	} else {
		combo=0;
	}
	if(chkKBRule(f)){
		f.Order.disabled = true;
		post(urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hss=' + f.Hss.value.replace(/\+/g,'_')+'&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
	}
}

function chkKB2(f){
	f=fcfrm2;
	var combo=f.banker2.value;
	if(chkKBRule(f)){
		f.Order.disabled = true;
		post(urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hss=' + f.Hss.value.replace(/\+/g,'_')+'&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
	}
}

function chkKB3(f){
	f=fcfrm1;
	var combo;
	if(f.Hss.value.indexOf('>')>-1) {
		combo=1;
	} else {
		combo=0;
	}
	if(chkKBRule(f)){
		f.Order.disabled = true;
		post(urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hss=' + f.Hss.value.replace(/\+/g,'_')+'&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
	}
}

function chkKB4(f){
	f=fcfrm2;
	var combo=f.banker2.value;
	if(chkKBRule(f)){
		f.Order.disabled = true;
		post(urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hss=' + f.Hss.value.replace(/\+/g,'_')+'&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
	}
}
function about() {
	//use Flash for show OS & browser verion, ethan, 2011/12/28
	var panel=window.open("/about.jsp",PageConfig.card_uid + "_winABOUT","width=400,height=150," +
    "toolbar=no,menubar=no,resizable=no,scrollbars=no,status=no,location=no,directories=no");
	if(panel)panel.focus();
}

function chkKBRule(f){ //f umst be fcfrm
	var i=0;
	var empty='';
	var info=new Array();
	var fcfrm=f;//document.getElementById("fcfrm");
	if(f.Race.value!=empty) {
		if( !existRace(f.Race.value)){
			info[i]= I18N.get("no_race") + f.Race.value;
			i++;
		}else{
			
			if(f==fcfrm){
				var horses=f.Hss.value.replace(">","+").split("+");
				//when user input '0' or '00',data as '';
				for(var j=0;j<horses.length;j++){
					if(j==0) continue;
					if(horses[j]=='00' ||horses[j]=='0') horses[j]='';
				}
				
				//01->1,...,09->9
				for(var j=0;j<horses.length;j++){
					if(horses[j].length>1 &&  horses[j].indexOf('0')==0){
						horses[j]=horses[j].substring(1);
					}
				}
				
				var invalidHorse=new Array();
				var invalidIndex=0;
				
				outerloop:
				for(var j=0;j<horses.length;j++){
					if(horses[j]!=empty && !existHorse(f.Race.value,horses[j])){
						for(var k=0;k<invalidHorse.length;k++) {
							if(invalidHorse[k]==horses[j])
								continue outerloop;
						}
						invalidHorse[invalidIndex]=horses[j];invalidIndex++;
					}
					
				}
				
				if(invalidHorse.length>0){
					invalidHorse.sort(sort);
					var nohorse=null;
					
					for(var k=0;k<invalidHorse.length;k++){
						if(k==0) {
							nohorse=(I18N.get("Bets.horse_not_found") + ': <strong>'+invalidHorse[k]+'</strong>');
						} else {
							nohorse+=(',<strong>'+invalidHorse[k]+'</strong>');
						}
					}
					if(nohorse!=null){
						info[i]=nohorse;
						i++;
					}
				}
			}
		}
	}else{//Race is empty
		info[i]=I18N.get("hint_info_race");
		i++;
	}
	
	if( f==fcfrm){
		var horses=f.Hss.value.replace(">","+").split("+");
		//when user input '0' or '00',data as '';
		for(var j=0;j<horses.length;j++){
			if(j==0) {
				continue;
			}
			if(horses[j]=='00' ||horses[j]=='0') {
				horses[j]='';
			}
		}
		
		//01->1,...,09->9
		for(var j=0;j<horses.length;j++){
			if(horses[j].length>1 &&  horses[j].indexOf('0')==0){
				horses[j]=horses[j].substring(1);
			}
		}
		
		if(f.Hss.value.length==0){
			info[i]=I18N.get("hint_info_input_horse");
			i++;
		}else if (horses.length==1 && horses[0]!='*'){
			info[i]=I18N.get("hint_info_2");
			i++;
		}
	}
	
	
	if(f.Tix.value==empty) {
		info[i]=I18N.get("hint_info_3");
		i++;
	} else {
		if(f.Tix.value < PageConfig.MIN_TIX) {
			info[i]=I18N.get("MIN_TIX_INFO");
			i++;
		}
		if(f.Tix.value> PageConfig.MAX_TIX) {
			info[i]=I18N.get("MAX_TIX_INFO");
			i++;
		}
	}
	
	if(f.amount.value==empty) {
		info[i]=I18N.get("hint_info_4");
		i++;
	}
	
	if(f==fcfrm){
		if(f.fclmt.value==empty) {
			info[i]=I18N.get("hint_info_5");
			i++;
		}
	}
	
	if(info.length==0){
		return true;//check pass
	}
	
	var temp=empty;
	for (i=0;i<info.length;i++)	{
		temp+="<li>"+info[i]+"</li>";
	}
	if(f==fcfrm && fcfrm.fctype.value == 0) {
		var betq=I18N.get("betq");
		shwErrotAlert(betq.replace('uuuu',temp));
	} else if(f==fcfrm && fcfrm.fctype.value == 1) {
		var betqp=I18N.get("betqp");		
		shwErrotAlert(betqp.replace('uuuu',temp));
	}
	return false;
}

function betHorses(frm, evt){
	if (evt.which==null) {
		//IE
		evt.returnValue = false;   //event.returnValue=false 效果相同.
	} else {
		//Firefox
		evt.preventDefault();
	}
	var obj = frm.Hss;//document.getElementById("Hss");
	//this field need to process keybaord enter event, ethan,2012/5/12
	if( evt.keyCode == 13 ) { 
		frm.submit();return;
	}
	if(evt.keyCode == 8 ){
		//backspace
		var pos = 0;
		for(var i=(obj.value.length-1); i>-1; i--){
			//+ -> 43 , > -> 62
			if( obj.value.charCodeAt(i)==43 || obj.value.charCodeAt(i)==62){
				if(obj.value.charCodeAt(i)==62 && frm.banker2) frm.banker2.value='0';
				pos = i;
				break;
			}
		}
		obj.value = obj.value.substring(0, pos);
	}
	
	if(obj.value.indexOf("*")>-1)
		return;
	
	if(PageConfig.race_type == "9U") {
		//1~8 .
		if((evt.keyCode >= 49 && evt.keyCode <= 56)||(evt.keyCode >= 97 && evt.keyCode <= 104) || (evt.keyCode == 190 )){
			var code = evt.keyCode;
			if(evt.keyCode >= 96 && evt.keyCode <= 105)
				code = evt.keyCode - 48;
			var char= String.fromCharCode(code);
			if(obj.value.length>0){
				var append = true;
				var arr = obj.value.replace(">","+").split("+");
				for(var i=0; i<arr.length; i++){
					if(arr[i]==char){
						append=false;
						break;
					}
				}
				if( append ){
					if(obj.value.indexOf("+")==-1 && obj.value.indexOf(">")==-1 && evt.keyCode==190){
						if(frm.banker2) frm.banker2.value='1';
						obj.value += ">";
					}
					else if (obj.value.indexOf(">")==(obj.value.length-1))
						obj.value += char;
					else if (evt.keyCode!=190)
						obj.value += "+" + char;
				}
			}else if (obj.value.length==0 && evt.keyCode!=190){
				obj.value = char;
			}
		}
	} else {
		//0~9 .
		if((evt.keyCode >= 48 && evt.keyCode <= 57)||(evt.keyCode >= 96 && evt.keyCode <= 105) ||(evt.keyCode >= 37 && evt.keyCode <= 40) || (evt.keyCode == 190 )){
			var code = evt.keyCode;
			if(evt.keyCode >= 96 && evt.keyCode <= 105)
				code = evt.keyCode - 48;
			var char= String.fromCharCode(code);
			if(char=="0")
				char="10";
			else if(char=="&")
				char="11";
			else if(char=="%")
				char="12";
			else if(char=="(")
				char="13";
			else if(char=="'")
				char="14";
			
			if(obj.value.length>0){
				var append = true;
				var arr = obj.value.replace(">","+").split("+");
				for(var i=0; i<arr.length; i++){
					if(arr[i]==char){
						append=false;
						break;
					}
				}
				
				if( append ){
					if(obj.value.indexOf("+")==-1 && obj.value.indexOf(">")==-1 && evt.keyCode==190){
						if(frm.banker2) frm.banker2.value='1';
						obj.value += ">";
					}
					else if (obj.value.indexOf(">")==(obj.value.length-1))
						obj.value += char;
					else if (evt.keyCode!=190)
						obj.value += "+" + char;
				}
			}else if (obj.value.length==0 && evt.keyCode!=190){
				obj.value = char;
			}
		}
	}
	
	
	//cursor struck at the end
	var objT=obj.createTextRange();
	objT.moveStart("character",obj.value.length);
	objT.moveEnd("character",0);
	objT.select();
}

function clkBetHorses(frm, char){
	var obj = frm.Hss;//document.getElementById("Hss");
	if(obj.value.indexOf("*")>-1)
		return;
	
	if(obj.value.length>0){
		var append = true;
		var arr = obj.value.replace(">","+").split("+");
		for(var i=0; i<arr.length; i++){
			if(arr[i]==char){
				append=false;
				break;
			}
		}
		if(append){
			if (obj.value.indexOf(">")==(obj.value.length-1))
				obj.value += char;
			else
				obj.value += "+" + char;
		}
	}
	else if (obj.value.length==0)
		obj.value = char;
	
	//cursor struck at the end
	var objT=obj.createTextRange();
	objT.moveStart("character",obj.value.length);
	objT.moveEnd("character",0);
	objT.select();
}

function clkFieldHorses(frm){
	var obj = frm.Hss;//document.getElementById("Hss");
	if(obj.value.indexOf("+")==-1 && obj.value.indexOf(">")==-1 && obj.value.indexOf("*")==-1 && obj.value.length>0){
		obj.value += ">";
		obj.focus();
		return true;
	}
	return false;
}


function clkALLComboHorses(frm){
	var obj = frm.Hss;//document.getElementById("Hss");
	if(obj.value.length==0){
		obj.value += "*";
		return true;
	}
	return false;
}

function clkFirstComboHorses(frm){
	var obj = frm.Hss;//document.getElementById("Hss");
	if(obj.value.length>0 && obj.value.indexOf("*")==-1  && obj.value.indexOf("+")==-1  && obj.value.indexOf(">")==-1 ){
		obj.value += ">*";
		return true;
	}
	return false;
}

if (typeof (Dog9U) == 'undefined') {
	Dog9U = {};
}

( function() {
	var getPFTDIV = function() {
		return document.getElementById('div_fclmt_9U_pft');
	};
	var getFCForm1 = function() {
		return document.getElementById('fcfrm1');
	};
	Dog9U.hiddenForm = function(limit, fontSize) {
		var form1 = getFCForm1();
		var div = getPFTDIV();
		div.style.visibility='hidden';
		form1.fclmt.value = limit;
		form1.Order.disabled=false;
		if(!PageConfig.isSGMode) {
			form1.fclmt.style.fontSize=parseInt($('#fontSizeTemplate').css('font-size').replace(/px/ig,'') * fontSize / 100, 10) + 'px';
		}
	};
	
})();

if(typeof (Forecast) == 'undefined'){
	Forecast = {};
}

(function(){
	Forecast.init = function(){
		fcfrm1 = document.getElementById("fcfrm1");
		fcfrm2 = document.getElementById("fcfrm2");

		div_fclmt_fc0 = document.getElementById("div_fclmt_fc0");
		if(PageConfig.isFollowQLimit){
			div_fclmt_pft0 = document.getElementById("div_fclmt_pft0");		
		}else if(PageConfig.isDog9U){
			div_fclmt_9U_pft = document.getElementById("div_fclmt_9U_pft");
		}else{
			div_fclmt_pft0 = document.getElementById("div_fclmt_pft0");
		}

		div_amount = document.getElementById("div_amount");
		div_amount2 = document.getElementById("div_amount2");

		Forecast.setAmountPanel(fcfrm1);
		Forecast.setAmountPanel(fcfrm2);
		Forecast.toggleQ(0);	
	};
	
	Forecast.setAmountPanel = function(frm){
		var amt=frm.amount.value;
		var divFclmt=null;
		
		var amountsData = PageConfig.fcAmounts;
		var amountsDiv;
		if(frm==fcfrm1){
			amountsDiv = $('#div_amount');
		}else{
			amountsDiv = $('#div_amount2');
		}
		
		amountsDiv.css('height', amountsData.length * 18 + 'px');
		var newTrs = new Array();
		var newTrTemplate = amountsDiv.children(0).children(0).children(0);//defined from tr
		amountsDiv.children(0).children(0).empty();//clean all tr
		for(var j=0;j<amountsData.length;j++){
			var newTr = newTrTemplate.clone();//clone isolated tr
			newTr.children(0).attr('amt', amountsData[j]);
			newTr.children(0).click(function() {
				var isFC=frm.fctype.value=='0';
				if(frm==fcfrm1){
					if(PageConfig.ENABLE_LOCK_LIMIT_Q){
						var values=LockLimitQHandler.getValue(true,isFC);
						if(values[0]){
							var limit=parseFloat(values[2]);
							var isValid= Forecast.isValidFcPftLimit(fcfrm1, this.getAttribute('amt'),limit);
							if(!isValid){
								var info=I18N.get('bet'+(isFC?'q':'qp'));
								info=info.substring(0,info.indexOf('<br/>')+5)+info.substring(info.indexOf('<ul'),info.indexOf('</ul>')+5);
								shwErrotAlert(info.replace('uuuu','<li>'+I18N.get("Q.LockLimit.error1")+'</li>'));								
								return;
							}
							Forecast.setFcPftAmountLimit(fcfrm1, this.getAttribute('amt'),values[2]);
						}else{
					Forecast.setFcPftAmount(fcfrm1, this.getAttribute('amt'));	
						}
					}else{
							Forecast.setFcPftAmount(fcfrm1, this.getAttribute('amt'));
					}					
					LockLimitQHandler.updateAmountLimit(true);
				}else{
					if(PageConfig.ENABLE_LOCK_LIMIT_Q){
						var values=LockLimitQHandler.getValue(false,isFC);
						if(values[0]){
							var limit=parseFloat(values[2]);
							var isValid= Forecast.isValidFcPftLimit(fcfrm2,this.getAttribute('amt'),limit);
							if(!isValid){
								 var info=I18N.get('eat'+(isFC?'q':'qp'));
								 info=info.substring(0,info.indexOf('<br/>')+5)+info.substring(info.indexOf('<ul'),info.indexOf('</ul>')+5);
								 shwErrotAlert(info.replace('uuuu','<li>'+I18N.get("Q.LockLimit.error1")+'</li>'));
								 return;
							}								   
						    Forecast.setFcPftAmountLimit(fcfrm2, this.getAttribute('amt'),values[2]);	   
				}else{
					Forecast.setFcPftAmount(fcfrm2, this.getAttribute('amt'));
				}
				}else{
					Forecast.setFcPftAmount(fcfrm2, this.getAttribute('amt'));
				}
					LockLimitQHandler.updateAmountLimit(false);					
				}				
			});
			newTr.children(0).html('&nbsp;'+amountsData[j]);//set value to td
			newTrs.push(newTr[0]);//keep array value
		}
		for(var i=0;i<newTrs.length;i++){
			amountsDiv[0].children[0].children[0].appendChild(newTrs[i]);	
		}
	};
	
	Forecast.setInput = function(isBet){
		if(isBet){
			var tix = $('#betInput .tix input');
			var price = $('#betInput .price input');
			
		}else{
			var tix = $('#eatInput .tix input');
			var price = $('#eatInput .price input');
		}
	};
	
	Forecast.toggleQ = function(x) {
		hideSelectPanel();
		var fcfrm1=document.getElementById("fcfrm1");
		if(x==0){
			fcfrm1.fctype.value = "0";
			fcfrm1.amount.value = PageConfig.fc_amount;
			fcfrm1.fclmt.value = PageConfig.fc_limit;
			
			document.getElementById("zQ_tab1").checked=true;
			document.getElementById("Q_tab1").className='selectitem';
			document.getElementById("Q_tab2").className='';
		}else if(x==1){
			fcfrm1.fctype.value = "1";
			fcfrm1.amount.value = PageConfig.pft_amount;
			fcfrm1.fclmt.value = PageConfig.pft_limit;
			
			document.getElementById("zQ_tab2").checked=true;
			document.getElementById("Q_tab1").className='';
			document.getElementById("Q_tab2").className='selectitem';
		}
		
		if(PageConfig.isDog9U) {
			if(x == 0) {
				document.getElementById("arrow1").style.display='';
			} else if(x==1){
				document.getElementById("arrow1").style.display='none';
			}
		}
		LockLimitQHandler.fixValues(true);
	};
	
	Forecast.toggleQP = function(x) {
		hideSelectPanel();
		var fcfrm2=document.getElementById("fcfrm2");
		if(x==0){
			fcfrm2.fctype.value = "0";
			fcfrm2.amount.value = PageConfig.fc_amount;
			fcfrm2.fclmt.value = PageConfig.fc_limit;
			
			document.getElementById("zQ_tab3").checked=true;
			document.getElementById("Q_tab3").className='selectitem';
			document.getElementById("Q_tab4").className='';
		}else if(x==1){
			fcfrm2.fctype.value = "1";
			fcfrm2.amount.value = PageConfig.pft_amount;
			fcfrm2.fclmt.value = PageConfig.pft_limit;
			
			document.getElementById("zQ_tab4").checked=true;
			document.getElementById("Q_tab3").className='';
			document.getElementById("Q_tab4").className='selectitem';
		}
		
		if(PageConfig.isDog9U) {
			if(x == 0) {
				document.getElementById("arrow3").style.display='';
				document.getElementById("arrow4").style.display='';
			} else if(x==1){
				fcfrm2.fclmt.value = PageConfig.pft_limit;
				document.getElementById("arrow3").style.display='none';
				document.getElementById("arrow4").style.display='none';
			}
		}
		LockLimitQHandler.fixValues(false);
	};

	Forecast.isValidFcPftLimit = function(frm, amt,limit){
		var values;
		if(0 == amt % 1){
			amt = amt + '.0';
		}
		if(frm.fctype.value=="0"){
			if(frm == fcfrm1){
				values = PageConfig.betFcLegalData[amt];
			}else{
				values = PageConfig.eatFcLegalData[amt];	
			}
		}else{
			if(frm == fcfrm1){
				values = PageConfig.betPftLegalData[amt];	
			}else{
				values = PageConfig.eatPftLegalData[amt];
			}
		}
		var isValid=false;
		for(var i=0;i<values.length;i++){
			if(limit==parseFloat(values[i])){
				isValid=true;
				break;
			}			
		}
		return isValid;
	};
	Forecast.setFcPftAmountLimit = function(frm, amt,limit){
		hideSelectPanel();
		frm.amount.value=amt;		
		frm.fclmt.value = limit;
		frm.Order.disabled=false;
	};

	Forecast.setFcPftAmount = function(frm, amt){
		hideSelectPanel();
		frm.amount.value=amt;
		if(0 == amt % 1){
			amt = amt + '.0';
		}
		if(frm.fctype.value=="0"){
			if(frm == fcfrm1){
			frm.fclmt.value = PageConfig.betFcLegalData[amt][PageConfig.betFcLegalData[amt].length-1];
		}else{
				frm.fclmt.value = PageConfig.eatFcLegalData[amt][PageConfig.eatFcLegalData[amt].length-1];	
			}
		}else{
			if(frm == fcfrm1){
			frm.fclmt.value = PageConfig.betPftLegalData[amt][PageConfig.betPftLegalData[amt].length-1];
			}else{
				frm.fclmt.value = PageConfig.eatPftLegalData[amt][PageConfig.eatPftLegalData[amt].length-1];
			}
		}
		frm.Order.disabled=false;
	};
	
	Forecast.showFclmtPanel = function(frm){
	    var amt=frm.amount.value;
	    if(0 == amt % 1){
			amt += '.0';
		}
		var divFclmt=null;
		if(frm.fctype.value=="0"){
			var limitsData;
			var limitsDiv;
			if(frm==fcfrm1){
				limitsData = PageConfig.betFcLegalData[amt];
				limitsDiv = $('#div_fclmt_fc0');
			}else{
				limitsData = PageConfig.eatFcLegalData[amt];
				limitsDiv = $('#div_fclmt_fc0r');
			}
			
			limitsDiv.css('height', limitsData.length * 18 + 'px');
			var newTrs = new Array();
//			var newTrTemplate = limitsDiv.children(0).children(0).children(0);//defined from tr
			var newTrTemplate = $('#tableTemplate').children(0).children(0).children(0);
			limitsDiv.children(0).children(0).empty();//clean all tr
			for(var j=0;j<limitsData.length;j++){
				var newTr = newTrTemplate.clone();//clone isolated tr
				newTr.children(0).attr('lmt', limitsData[j]);
				newTr.children(0).click(function() {
					if(frm==fcfrm1){
						document.getElementById('div_fclmt_fc0').style.visibility='hidden';
						document.getElementById('fcfrm1').fclmt.value = this.getAttribute('lmt');
						document.getElementById('fcfrm1').Order.disabled=false;	
						LockLimitQHandler.updateAmountLimit(true);
					}else{
						document.getElementById('div_fclmt_fc0r').style.visibility='hidden';
						document.getElementById('fcfrm2').fclmt.value = this.getAttribute('lmt');
						document.getElementById('fcfrm2').Order.disabled=false;
						LockLimitQHandler.updateAmountLimit(false);
					}
					
				});
				newTr.children(0).html('&nbsp;'+limitsData[j]);//set value to td
				newTrs.push(newTr[0]);//keep array value
			}
			for(var i=0;i<newTrs.length;i++){
				limitsDiv[0].children[0].children[0].appendChild(newTrs[i]);	
			}
			divFclmt = 'div_fclmt_fc0';
		}else{
			if(PageConfig.isDog9U) {
				var limitsData = PageConfig.betPftLegalData[amt];
				var limitsDiv = $('#div_fclmt_9U_pft');
				limitsDiv.css('height', limitsData.length * 18 + 'px');
				var newTrs = new Array();
//				var newTrTemplate = limitsDiv.children(0).children(0).children(0);//defined from tr
				var newTrTemplate = $('#tableTemplate').children(0).children(0).children(0);
				limitsDiv.children(0).children(0).empty();//clean all tr
				for(var j=limitsData.length-1;j>=0;j--){
					var newTr = newTrTemplate.clone();//clone isolated tr
					newTr.children(0).attr('lmt', limitsData[j]);
					newTr.children(0).attr('size', (0 == j % 2 ? 100 : 95));
					newTr.children(0).click(function() {
						Dog9U.hiddenForm(this.getAttribute('lmt'), this.getAttribute('size'));
					    LockLimitQHandler.updateAmountLimit(frm==fcfrm1);
					});
					newTr.children(0).html('&nbsp;'+limitsData[j]);//set value to td
					newTrs.push(newTr[0]);//keep array value
				}
				for(var i=0;i<newTrs.length;i++){
					limitsDiv[0].children[0].children[0].appendChild(newTrs[i]);	
				}
				divFclmt = 'div_fclmt_9U_pft';
			}else{
				var limitsData;
				var limitsDiv;
				if(frm==fcfrm1){
					limitsData = PageConfig.betPftLegalData[amt];
					limitsDiv = $('#div_fclmt_pft0');
				}else{
					limitsData = PageConfig.eatPftLegalData[amt];
					limitsDiv = $('#div_fclmt_pft0r');
				}
				
				limitsDiv.css('height', limitsData.length * 18 + 'px');
				var newTrs = new Array();
//				var newTrTemplate = limitsDiv.children(0).children(0).children(0);//defined from tr
				var newTrTemplate = $('#tableTemplate').children(0).children(0).children(0);
				limitsDiv.children(0).children(0).empty();//clean all tr
				for(var j=0;j<limitsData.length;j++){
					var newTr = newTrTemplate.clone();//clone isolated tr
					newTr.children(0).attr('lmt', limitsData[j]);
					newTr.children(0).click(function() {
						if(frm==fcfrm1){
							document.getElementById('div_fclmt_pft0').style.visibility='hidden';
							document.getElementById('fcfrm1').fclmt.value = this.getAttribute('lmt');
							document.getElementById('fcfrm1').Order.disabled=false;	
							LockLimitQHandler.updateAmountLimit(true);
						}else{
							document.getElementById('div_fclmt_pft0r').style.visibility='hidden';
							document.getElementById('fcfrm2').fclmt.value = this.getAttribute('lmt');
							document.getElementById('fcfrm2').Order.disabled=false;
							LockLimitQHandler.updateAmountLimit(false);
						}
						
					});
					newTr.children(0).html('&nbsp;'+limitsData[j]);//set value to td
					newTrs.push(newTr[0]);//keep array value
				}
				for(var i=0;i<newTrs.length;i++){
					limitsDiv[0].children[0].children[0].appendChild(newTrs[i]);	
				}
				divFclmt = 'div_fclmt_pft0';
			}
		}
		
		if(divFclmt!=null){
			if(frm==fcfrm2) divFclmt=divFclmt+'r';
			hideSelectPanel();
			document.getElementById(divFclmt).style.visibility='visible';
			frm.Order.disabled = true;
		}
	};
	
	Forecast.arrowaclick = function(pForm, pAmount){
		hideSelectPanel();
		pAmount.style.visibility='visible';
		pForm.Order.disabled = true;	
	};
	
	Forecast.arrowbclick = function(pForm){
		Forecast.showFclmtPanel(pForm);
	};
	
	Forecast.hideSelectPanel = function(){
		document.getElementById("div_amount").style.visibility='hidden';
		document.getElementById("div_amount2").style.visibility='hidden';
		
		document.getElementById("div_fclmt_fc0").style.visibility='hidden';
		document.getElementById("div_fclmt_fc0r").style.visibility='hidden';
		
		if(PageConfig.isFollowQLimit){
			document.getElementById("div_fclmt_pft0").style.visibility='hidden';
			document.getElementById("div_fclmt_pft0r").style.visibility='hidden';
		}else if(PageConfig.isDog9U) {
			document.getElementById("div_fclmt_9U_pft").style.visibility='hidden';
		}else{
			document.getElementById("div_fclmt_pft0").style.visibility='hidden';
			document.getElementById("div_fclmt_pft0r").style.visibility='hidden';
		}
		
		document.getElementById("fcfrm1").Order.disabled = false;
		document.getElementById("fcfrm2").Order.disabled = false;
	};

})();

if (typeof (LockLimitQHandler) == 'undefined') {
	LockLimitQHandler = {};
}

( function() {
	var items=['amount','fclmt'];
	var key= 'LMTlockQ_'+PageConfig.username+'_'+PageConfig.mode+PageConfig.race_type+PageConfig.race_date;
	var expiredays=7;
	var storeToCookie=function(key,value){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=key+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
	};	
	var lockValues={  betFC:[false,'0','0']
                    ,betPFT:[false,'0','0'] 
	                , eatFC:[false,'0','0']
	                ,eatPFT:[false,'0','0']
    };
	LockLimitQHandler.getValue=function(isBet,isFC){
		return lockValues[getIndexName(isBet,isFC)];		
	};
	LockLimitQHandler.watch=function(){
		var s1='betFC 	'+lockValues['betFC']+'\n';
		var s2='betPFT 	'+lockValues['betPFT']+'\n';
		var s3='eatFC 	'+lockValues['eatFC']+'\n';
		var s4='eatPFT 	'+lockValues['eatPFT']+'\n';
		
		alert(s1+s2+s3+s4);
	};
	LockLimitQHandler.updateAmountLimit= function(isBet) {
		if(!PageConfig.ENABLE_LOCK_LIMIT_Q)return;		
		var isFC=isSelectFC(isBet);
		var indexName=getIndexName(isBet,isFC);
		lockValues[indexName][0]=!lockValues[indexName][0];		
		LockLimitQHandler.trigger(isBet);
	};
	var getIndexName=function(isBet,isFC){	
		return (isBet?(isFC?'betFC':'betPFT'):(isFC?'eatFC':'eatPFT'));	
	};
	LockLimitQHandler.trigger= function (isBet) {
		if(!PageConfig.ENABLE_LOCK_LIMIT_Q)return;		
		var box=getBox(isBet);
		var isFC=isSelectFC(isBet);			
		var indexName=getIndexName(isBet,isFC);
		var lock=!lockValues[indexName][0];
		var values=[lock,'0','0'];
		
		for(var i=0;i<items.length;i++){			
			var input=box.find("input[name='"+items[i]+"']");
			if(lock){ 
				values[i+1]=input.val();
			}				
		}		
		
		lockValues[indexName]=values;
		var values=lockValues[getIndexName(true,true)].join()+','
		     +lockValues[getIndexName(true,false)].join()+','
			 +lockValues[getIndexName(false,true)].join()+','
			 +lockValues[getIndexName(false,false)].join();
		storeToCookie(key,values);
		
		setClass(true);		
		setClass(false);
	};

    var isSelectFC=function(isBet){	
		var isFC=document.getElementById((isBet?'fcfrm1':'fcfrm2')).fctype.value=='0';
		return isFC;
    };
    var fixLockValues=function(isBet) {        
		var isFC=isSelectFC(isBet);		
		var indexName=getIndexName(isBet,isFC);
		var values=lockValues[indexName];
    	var isLock=values[0];
    	if(isLock){
    		var box=getBox(isBet);
    		for(var i=0;i<items.length;i++) 
    		{ 
    			var input=box.find("table input[name='"+items[i]+"']");		
    			input.val(values[i+1]);
    		}
    	}
    	setClass(isBet);
	};
	var canRunFixValues=true;
	LockLimitQHandler.permitRunFixValues= function(permit){
		if(!PageConfig.ENABLE_LOCK_LIMIT_Q)return;
		canRunFixValues=permit;
	};
	
	LockLimitQHandler.fixValues= function(isBet){
		if(!PageConfig.ENABLE_LOCK_LIMIT_Q)return;
		if(!canRunFixValues)return;
		fixLockValues(isBet);
	};
	LockLimitQHandler.fixBatEatValues= function(){
		if(!PageConfig.ENABLE_LOCK_LIMIT_Q)return;        
		fixLockValues(true);
		fixLockValues(false);
	};

	var fcform1=null;
	var fcform2=null;
    var getBox=function(isBet){
    	if(isBet){
    		if(fcform1==null){
    			fcform1=$('#fcfrm1');
    		}
    		return fcform1;
    	}else{
    		if(fcform2==null){
    			fcform2=$('#fcfrm2');
    		}
    		return fcform2;
    	}	
    };
    
	var setClass=function(isBet){
		
	    var isFC=isSelectFC(isBet);			
		var indexName=getIndexName(isBet,isFC);
		var lock=lockValues[indexName][0];
		var box=getBox(isBet);
		var th4=box.find('table tr th:eq(3)');
		var th5=box.find('table tr th:eq(4)');
		var type=(isBet?"B":"E")+(isFC?"":"P");
		var typeInverse=(isBet?"B":"E")+(isFC?"P":"");
		
		th4.removeClass(type+'_lockOn')
		.removeClass(type+'_lockOff')
		.removeClass(typeInverse+'_lockOn')
		.removeClass(typeInverse+'_lockOff');
		
		th5.removeClass(type+'_lockOn_icon')
		.removeClass(type+'_lockOff_icon')
		.removeClass(typeInverse+'_lockOn_icon')
		.removeClass(typeInverse+'_lockOff_icon');
		
		if(lock){			
			th4.addClass(type+'_lockOn');
			th5.addClass(type+'_lockOn_icon');									
		}else{			
			th4.addClass(type+'_lockOff');
			th5.addClass(type+'_lockOff_icon');
		}
		
		for(var i=0;i<items.length;i++){		
			var input=box.find("table tr td input[name='"+items[i]+"']");
			if(lock)input.addClass('lockOn');
			else    input.removeClass('lockOn');
		}
		
	};
	var initLmtLock=function(){
		
		var cookie = getCookie(key);
    	if(cookie!=null){
    		var list=cookie.split('\,');
    		if(list.length==12){
    			var isBet=false;
    			var isFC=false;
    			for(var i=0;i<2;i++){
    				isBet=(i==0);
    				var box=getBox(isBet);    				
    				var isSelFC=isSelectFC(isBet);
    				
    				for(var j=0;j<2;j++){
    					isFC=(j==0);    					
    					var indexName=getIndexName(isBet,isFC);
    					var index=i*6+j*3;
    					var values=[list[index]=='true',list[index+1],list[index+2]];    					
    					if((isSelFC==isFC) && values[0]){
    						for(var k=0;k<items.length;k++){    							
        	    				var input=box.find("table input[name='"+items[k]+"']");
        	    				input.val(values[k+1]);
        	    			}
    					}    					
    					lockValues[indexName]=values;
    				}    				
    			}
    		}
    	}
    	setClass(true);
    	setClass(false);
	};
    LockLimitQHandler.init= function () {
    		if(!PageConfig.ENABLE_LOCK_LIMIT_Q)return;
    		initLmtLock();   	
	};	
})();




var key = $($(obj).parent().parent().find("td")[1]).text();
			if(parseInt(jsonValue.type)<3){
				$(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr").each(function(){
					if($($(this).find("td")[2]).text()==key){
						$(this).find(".del_ch").click();
					}
				});
			}
			
			if(parseInt(jsonValue.type)>2){
				$(window.frames["frmTRANS"].document).find("tbody[id^='DEmr'] tr").each(function(){
					if($($(this).find("td")[2]).text()==key){
						$(this).find(".del2_ch").click();
					}
				});
			}