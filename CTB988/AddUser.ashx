<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.Collections.Generic;

public class Handler : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        string UserName = string.IsNullOrEmpty(context.Request["UserName"]) ? "" : context.Request["UserName"];
        string PassWord = string.IsNullOrEmpty(context.Request["PassWord"]) ? "" : context.Request["PassWord"];
        UserEntity entity = new UserEntity();
        entity.DueTime = "2015-08-31";
        entity.PassWord = "qazwsx";
        entity.Status = "Y";
        entity.UserName = UserName;
        entity.Version = "V2";
        

        if (PassWord == "luo879195") {
            bool checkSuccess = XMLData.AddUser(entity);
            context.Response.Write(checkSuccess.ToString());
        }
        context.Response.Write(false);
        //context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}