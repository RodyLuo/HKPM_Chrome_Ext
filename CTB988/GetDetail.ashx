<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.Collections.Generic;

public class Handler : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        string UserName = string.IsNullOrEmpty(context.Request["UserName"]) ? "" : context.Request["UserName"];
        string PassWord = string.IsNullOrEmpty(context.Request["PassWord"]) ? "" : context.Request["PassWord"];
        UserEntity entity = XMLData.GetUser(UserName, PassWord);
        if (entity != null
            && !string.IsNullOrEmpty(entity.DueTime)
            && !string.IsNullOrEmpty(entity.Status)
            && Convert.ToDateTime(entity.DueTime)>=DateTime.Now 
            && entity.Status == "Y")
        {
            context.Response.ContentType = "text/plain";
            string plugIn = XMLData.GetJSFileListByVersion(string.IsNullOrEmpty(entity.Version) ? "V1" : entity.Version);
            context.Response.Write(plugIn);
        }
        else {
            context.Response.Write("alert(\"请检查密码是否错误或者账号是否过期\")");
        }

        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}