<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {

        string type = string.IsNullOrEmpty(context.Request["type"]) ? "" : context.Request["type"];
        switch (type.ToLower())
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
                    string Direction = string.IsNullOrEmpty(context.Request["Direction"]) ? "0" : context.Request["Direction"];
                    string Discount = string.IsNullOrEmpty(context.Request["Direction"]) ? "0" : context.Request["Discount"];
                    string EatMode = string.IsNullOrEmpty(context.Request["Direction"]) ? "Q" : context.Request["EatMode"];
                    string Mode = string.IsNullOrEmpty(context.Request["Direction"]) ? "0" : context.Request["Mode"];
                    string Monitor = string.IsNullOrEmpty(context.Request["Direction"]) ? "0" : context.Request["Monitor"];
                    string Proportion = string.IsNullOrEmpty(context.Request["Direction"]) ? "0" : context.Request["Proportion"];
                    string WithOrder = string.IsNullOrEmpty(context.Request["Direction"]) ? "0" : context.Request["WithOrder"];

                    string BetQDiscount = string.IsNullOrEmpty(context.Request["Direction"]) ? "99" : context.Request["BetQDiscount"];
                    string BetQLimitStart = string.IsNullOrEmpty(context.Request["Direction"]) ? "700" : context.Request["BetQLimitStart"];
                    string BetQPDiscount = string.IsNullOrEmpty(context.Request["Direction"]) ? "99" : context.Request["BetQPDiscount"];
                    string BetQPLimitStart = string.IsNullOrEmpty(context.Request["Direction"]) ? "400" : context.Request["BetQPLimitStart"];
                    string BetWPDiscount = string.IsNullOrEmpty(context.Request["Direction"]) ? "99" : context.Request["BetWPDiscount"];
                    string BetWPLimitEnd = string.IsNullOrEmpty(context.Request["Direction"]) ? "100" : context.Request["BetWPLimitEnd"];
                    string BetWPLimitStart = string.IsNullOrEmpty(context.Request["Direction"]) ? "300" : context.Request["BetWPLimitStart"];

                    string EatQDiscount = string.IsNullOrEmpty(context.Request["Direction"]) ? "80" : context.Request["EatQDiscount"];
                    string EatQLimitStart = string.IsNullOrEmpty(context.Request["Direction"]) ? "700" : context.Request["EatQLimitStart"];
                    string EatQPDiscount = string.IsNullOrEmpty(context.Request["Direction"]) ? "80" : context.Request["EatQPDiscount"];
                    string EatQPLimitStart = string.IsNullOrEmpty(context.Request["Direction"]) ? "400" : context.Request["EatQPLimitStart"];
                    string EatWPDiscount = string.IsNullOrEmpty(context.Request["Direction"]) ? "76" : context.Request["EatWPDiscount"];
                    string EatWPLimitEnd = string.IsNullOrEmpty(context.Request["Direction"]) ? "100" : context.Request["EatWPLimitEnd"];
                    string EatWPLimitStart = string.IsNullOrEmpty(context.Request["Direction"]) ? "300" : context.Request["EatWPLimitStart"];
                    
                    ConfigEntity entity = new ConfigEntity();
                    entity.Direction = Direction;
                    entity.Discount = Discount;
                    entity.EatMode = EatMode;
                    entity.Mode = Mode;
                    entity.Monitor = Monitor;
                    entity.Proportion = Proportion;
                    entity.WithOrder = WithOrder;

                    entity.BetQDiscount = BetQDiscount;
                    entity.BetQLimitStart = BetQLimitStart;
                    entity.BetQPDiscount = BetQPDiscount;
                    entity.BetQPLimitStart = BetQPLimitStart;
                    entity.BetWPDiscount = BetWPDiscount;
                    entity.BetWPLimitEnd =  BetWPLimitEnd;
                    entity.BetWPLimitStart =  BetWPLimitStart;

                    entity.EatQDiscount =  EatQDiscount;
                    entity.EatQLimitStart =  EatQLimitStart;
                    entity.EatQPDiscount =  EatQPDiscount;
                    entity.EatQPLimitStart =  EatQPLimitStart;
                    entity.EatWPDiscount =  EatWPDiscount;
                    entity.EatWPLimitEnd =  EatWPLimitEnd;
                    entity.EatWPLimitStart =  EatWPLimitStart;
                    
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