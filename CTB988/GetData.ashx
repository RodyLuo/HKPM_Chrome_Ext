<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.Collections.Generic;

public class Handler : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        string type = string.IsNullOrEmpty(context.Request["type"]) ? "" : context.Request["type"];
        switch (type.ToLower())
        {
            case "get":
                {
                    string Id = string.IsNullOrEmpty(context.Request["Id"]) ? "" : context.Request["Id"];
                    string BuyMode = string.IsNullOrEmpty(context.Request["BuyMode"]) ? "" : context.Request["BuyMode"];
                    string ModeType = string.IsNullOrEmpty(context.Request["ModeType"]) ? "" : context.Request["ModeType"];
                    string Status = string.IsNullOrEmpty(context.Request["Status"]) ? "" : context.Request["Status"];
                    PushDataQueryEntity query = new PushDataQueryEntity();
                    query.Id=Id;
                    query.BuyMode = BuyMode;
                    query.ModeType = ModeType;
                    query.Status = Status;
                    
                    List<PustDataEntity> entity  = XMLData.GetPushDataByWhere(query);
                    string result = "[";
                    if (entity != null && entity.Count > 0) {
                        foreach (PustDataEntity item in entity) {
                           result += XMLData.EntityToJson(item)+",";
                        }
                    }
                    if (result.EndsWith(",")) {
                        result = result.Substring(0, result.Length - 1);
                    }
                    result += "]";
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
                    break;
                }
            case "add":
                {
                    string Id = string.IsNullOrEmpty(context.Request["Id"]) ? "" : context.Request["Id"];
                    string BuyMode = string.IsNullOrEmpty(context.Request["BuyMode"]) ? "" : context.Request["BuyMode"];
                    string ModeType = string.IsNullOrEmpty(context.Request["ModeType"]) ? "" : context.Request["ModeType"];
                    string Status = string.IsNullOrEmpty(context.Request["Status"]) ? "" : context.Request["Status"];
                    string Discount = string.IsNullOrEmpty(context.Request["Discount"]) ? "" : context.Request["Discount"];
                    string Hourse1 = string.IsNullOrEmpty(context.Request["Hourse1"]) ? "" : context.Request["Hourse1"];
                    string Hourse2 = string.IsNullOrEmpty(context.Request["Hourse2"]) ? "" : context.Request["Hourse2"];
                    string LimitEnd = string.IsNullOrEmpty(context.Request["LimitEnd"]) ? "" : context.Request["LimitEnd"];
                    string LimitStart = string.IsNullOrEmpty(context.Request["LimitStart"]) ? "" : context.Request["LimitStart"];
                    string P = string.IsNullOrEmpty(context.Request["P"]) ? "" : context.Request["P"];
                    string W = string.IsNullOrEmpty(context.Request["W"]) ? "" : context.Request["W"];
                    string Ticket = string.IsNullOrEmpty(context.Request["Ticket"]) ? "" : context.Request["Ticket"];
                    PustDataEntity entity = new PustDataEntity();
                    entity.BuyMode = BuyMode;
                    entity.Discount = Discount;
                    entity.Hourse1 = Hourse1;
                    entity.Hourse2 = Hourse2;
                    entity.LimitEnd = LimitEnd;
                    entity.LimitStart = LimitStart;
                    entity.ModeType = ModeType;
                    entity.P = P;
                    entity.Ticket = Ticket;
                    entity.W = W;
                    entity.Id = Id;
                    entity.Status = Status;
                    string result = XMLData.AddPushData(entity);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
                    break;
                }
            case "delete":
                {
                    string Id = string.IsNullOrEmpty(context.Request["Id"]) ? "" : context.Request["Id"];
                    
                    string result = XMLData.DeletePushDataById(Id);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
                    break;
                }
            case "update":
                {
                    string Id = string.IsNullOrEmpty(context.Request["Id"]) ? "" : context.Request["Id"];
                    string Status = string.IsNullOrEmpty(context.Request["Status"]) ? "" : context.Request["Status"];

                    string result = XMLData.UpdatePushDataStatusById(Status,Id);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
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