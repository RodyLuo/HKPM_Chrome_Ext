<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        string type = context.Request["type"];
        switch (type)
        {
            case "get":
                {
                    string status = XMLData.CreateConfigJson(XMLData.GetConfigEntity());
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(status);
                    break;
                }
            case "update":
                {
                    ConfigEntity entity = new ConfigEntity();
                    bool result = XMLData.UpdateConfig(entity);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result ? "1" : "0");
                    break;
                }
            default:
                context.Response.Write("");
                break;
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}