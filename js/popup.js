/**
 * Code for the popup UI.
 */
Popup = {

  onLoad: function() {
    var me = this;
    // Close if the X is clicked.
    $(".close-x").click(function() {
      window.close();
    });
    var userName = this.getPageUserName();
    $("#popuserName").text(userName);
    this.setExpandedUi(true);
  },
  
  setExpandedUi: function(is_expanded) {
    if (this.is_external) {
      window.resizeTo(
          410,
          (is_expanded ? 310 + 10 + 129 : 310 + 10)
              + 24);
    }
  },
  
  getPageUserName :function(){
  	try{
  		chrome.tabs.getSelected(null, function (tab) {//获取当前tab
        //向tab发送请求
        chrome.runtime.sendRequest(tab.id, { action: "GetUserName" }, function (response) {
            return response.UserName;});
  		});
     }catch(e){
  		return "";
  	}
  }
  

};

$(window).load(function() {
  Popup.onLoad();
});
