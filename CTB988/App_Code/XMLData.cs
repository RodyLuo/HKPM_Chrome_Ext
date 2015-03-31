﻿using System;
using System.Collections.Generic;
using System.Web;
using System.Collections;
using System.Xml;
using System.Text;
using System.Reflection;

/// <summary>
/// Summary description for XMLData
/// </summary>
public class XMLData
{
    public string VirtualPath = AppDomain.CurrentDomain.BaseDirectory;
    public static string STATUSPATH = AppDomain.CurrentDomain.BaseDirectory + "AppData\\Status.xml";
    public static string DATAPATH = AppDomain.CurrentDomain.BaseDirectory + "AppData\\Data.xml";
    public static string CONFIGPATH = AppDomain.CurrentDomain.BaseDirectory + "AppData\\Config.xml";
    public static XmlHelper xml = new XmlHelper();
    public XMLData()
    {
        //
        // TODO: Add constructor logic here
        //
    }


    public static ConfigEntity GetConfigEntity()
    {
        try
        {
            ConfigEntity entity = new ConfigEntity();
            XmlNodeList node = xml.GetXmlNodeByXpath(CONFIGPATH, "Config").ChildNodes;

            PropertyInfo[] pInfos = entity.GetType().GetProperties();
            string pValue = string.Empty;
            foreach (PropertyInfo item in pInfos)
            {
                pValue = GetNodeListByName(node, item.Name);
                item.SetValue(entity, pValue, null);
            }

            //entity.Direction = int.Parse(node.Item(3).InnerText);
            //entity.Discount = int.Parse(node.Item(2).InnerText);
            //entity.EatMode = node.Item(6).InnerText;
            //entity.Mode = int.Parse(node.Item(0).InnerText);
            //entity.Monitor = int.Parse(node.Item(4).InnerText);
            //entity.Proportion = int.Parse(node.Item(1).InnerText);
            //entity.WithOrder = int.Parse(node.Item(5).InnerText);

            //entity.EatQDiscount = int.Parse(node.Item(7).InnerText);
            //entity.EatQLimitStart = int.Parse(node.Item(8).InnerText);
            //entity.EatWPDiscount = int.Parse(node.Item(9).InnerText);
            //entity.EatWPLimitStart = int.Parse(node.Item(10).InnerText);
            //entity.EatWPLimitEnd = int.Parse(node.Item(11).InnerText);
            //entity.EatQPDiscount = int.Parse(node.Item(12).InnerText);
            //entity.EatQPLimitStart = int.Parse(node.Item(13).InnerText);

            //entity.BetQDiscount = int.Parse(node.Item(14).InnerText);
            //entity.BetQLimitStart = int.Parse(node.Item(15).InnerText);
            //entity.BetWPDiscount = int.Parse(node.Item(16).InnerText);
            //entity.BetWPLimitStart = int.Parse(node.Item(17).InnerText);
            //entity.BetWPLimitEnd = int.Parse(node.Item(18).InnerText);
            //entity.BetQPDiscount = int.Parse(node.Item(19).InnerText);
            //entity.BetQPLimitStart = int.Parse(node.Item(20).InnerText);

            return entity;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static string CreateConfigJson(ConfigEntity entity)
    {

        try
        {
            return EntityToJson(entity);
        }
        catch (Exception)
        {
            return "";
        }
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="obj">要转换的实体对象</param>
    /// <returns></returns>
    public static string EntityToJson(object obj)
    {
        StringBuilder jsonStr = new StringBuilder();
        PropertyInfo[] pInfos = obj.GetType().GetProperties();
        string pValue = string.Empty;
        jsonStr.Append("{");
        foreach (PropertyInfo p in pInfos)
        {
            if (!(p.GetValue(obj, null) == null))
            {
                //转义掉Json格式特殊字符 ‘\’,‘"’
                pValue = p.GetValue(obj, null).ToString().Replace("\\", "\\\\").Replace("\"", "\\\"");
            }
            else
            {
                pValue = string.Empty;
            }
            jsonStr.Append(string.Format("\"{0}\":\"{1}\",", p.Name, pValue));

        }
        jsonStr.Remove(jsonStr.Length - 1, 1);
        jsonStr.Append("}");
        return jsonStr.ToString();
    }

    public static bool UpdateConfig(ConfigEntity entity)
    {
        try
        {
            Hashtable hstable = new Hashtable();
            Hashtable first = new Hashtable();
            Hashtable second = new Hashtable();

            hstable.Add("Direction", entity.Direction);
            hstable.Add("Discount", entity.Discount);
            hstable.Add("EatMode", entity.EatMode);
            hstable.Add("Mode", entity.Mode);
            hstable.Add("Monitor", entity.Monitor);
            hstable.Add("Proportion", entity.Proportion);
            hstable.Add("WithOrder", entity.WithOrder);

            hstable.Add("EatQDiscount", entity.EatQDiscount);
            hstable.Add("EatQLimitStart", entity.EatQLimitStart);
            hstable.Add("EatQPDiscount", entity.EatQPDiscount);
            hstable.Add("EatQPLimitStart", entity.EatQPLimitStart);
            hstable.Add("EatWPDiscount", entity.EatWPDiscount);
            hstable.Add("EatWPLimitEnd", entity.EatWPLimitEnd);
            hstable.Add("EatWPLimitStart", entity.EatWPLimitStart);

            hstable.Add("BetQDiscount", entity.BetQDiscount);
            hstable.Add("BetQLimitStart", entity.BetQLimitStart);
            hstable.Add("BetQPDiscount", entity.BetQPDiscount);
            hstable.Add("BetQPLimitStart", entity.BetQPLimitStart);
            hstable.Add("BetWPDiscount", entity.BetWPDiscount);
            hstable.Add("BetWPLimitEnd", entity.BetWPLimitEnd);
            hstable.Add("BetWPLimitStart", entity.BetWPLimitStart);

            bool node = xml.UpdateNode(CONFIGPATH, "Config",null, hstable);
            return node;
        }
        catch (Exception)
        {
            return false;
        }

    }

    /// <summary>
    /// 获取当前状态 
    /// </summary>
    /// <returns></returns>
    public static string GetStatus()
    {
        try
        {

            XmlNode node = xml.GetXmlNodeByXpath(STATUSPATH, "Status");

            if (node != null && node.HasChildNodes && node.ChildNodes.Count > 0)
            {
                XmlNodeList nodeList = node.ChildNodes;
                if (!string.IsNullOrEmpty(nodeList.Item(1).InnerText))
                {
                    DateTime lasterTime = Convert.ToDateTime(nodeList.Item(1).InnerText);
                    if (nodeList.Item(0).InnerText == "1" && (DateTime.Now - lasterTime).Hours <= 2)
                    {
                        return "1";
                    }
                }
            }
        }
        catch (Exception)
        {
            return "-1";
        }

        return "0";
    }

    /// <summary>
    /// 更新状态
    /// </summary>
    /// <param name="Status"></param>
    /// <returns></returns>
    public static string UpdateStatus(string Status)
    {
        try
        {
            Hashtable hstable = new Hashtable();
            hstable.Add("Statue", Status);
            hstable.Add("StatueTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            bool node = xml.UpdateNode(STATUSPATH, "Status",null, hstable);
            if (node)
            {
                return "1";
            }
            else
            {
                return "0";
            }
        }
        catch (Exception)
        {
            return "-1";
        }
    }

    /// <summary>
    /// 新增数据
    /// </summary>
    /// <param name="Status"></param>
    /// <returns></returns>
    public static string AddPushData(PustDataEntity entity)
    {
        try
        {
            entity.Id = Guid.NewGuid().ToString();
            entity.Status = "0";
            Hashtable hashTable = new Hashtable();
            PropertyInfo[] pInfos = entity.GetType().GetProperties();
            string pValue = string.Empty;
            foreach (PropertyInfo item in pInfos)
            {
                if (!(item.GetValue(entity, null) == null))
                {
                    pValue = item.GetValue(entity, null).ToString();
                }
                else
                {
                    pValue = string.Empty;
                }
                hashTable.Add(item.Name, string.IsNullOrEmpty(pValue) ? string.Empty : pValue);
            }
            bool node = xml.InsertNode(DATAPATH, "PushData", false, "PushDataList", null, hashTable);
            if (node)
            {
                return "1";
            }
            else
            {
                return "0";
            }
        }
        catch (Exception)
        {
            return "-1";
        }
    }

    public static string UpdatePushDataStatusById(string status,string Id) {
        try
        {
            Hashtable update = new Hashtable();
            update.Add("Status", status);

            Hashtable where = new Hashtable();
            where.Add("Id", Id);
            bool result = xml.UpdateNodeByWhere(DATAPATH, "PushDataList", null, update, where);

            return result ? "1" : "0";
        }
        catch (Exception)
        {
            return "-1";
        }
        
    }

    public static string DeletePushDataById(string Id)
    {
        try
        {
            Hashtable where = new Hashtable();
            where.Add("Id", Id);
            bool result = xml.DeleteXmlByWhere(DATAPATH, "PushDataList", where);
            return result?"1":"0";
        }
        catch (Exception)
        {
            return "-1";
        }
        
    }

    public static string GetNodeListByName(XmlNodeList nodeList, string Name)
    {
        foreach (XmlNode item in nodeList)
        {
            if (item.Name == Name) {
                return item.InnerText;
            }
        }
        return "";
    }

    public static List<PustDataEntity> GetPushDataByWhere(PushDataQueryEntity query)
    {
        try
        {
            List<PustDataEntity> result = new List<PustDataEntity>();

            XmlNodeList nodeList = xml.GetXmlNodeListByXpath(DATAPATH, "PushDataList/PushData");

            foreach (XmlNode node in nodeList) {
                PustDataEntity entity = new PustDataEntity();
                XmlElement nodeElement = (XmlElement)node;
                XmlNodeList itemList = nodeElement.ChildNodes;

                PropertyInfo[] pInfos = entity.GetType().GetProperties();
                string pValue = string.Empty;
                foreach (PropertyInfo item in pInfos)
                {
                    pValue = GetNodeListByName(itemList,item.Name);
                    item.SetValue(entity, pValue,null);
                }

                if (!string.IsNullOrEmpty(query.BuyMode)) {
                    if (query.BuyMode != entity.BuyMode) {
                        continue;
                    }
                }
                if (!string.IsNullOrEmpty(query.Id))
                {
                    if (query.Id != entity.Id)
                    {
                        continue;
                    }
                }
                if (!string.IsNullOrEmpty(query.ModeType))
                {
                    if (query.ModeType != entity.ModeType)
                    {
                        continue;
                    }
                }
                if (!string.IsNullOrEmpty(query.Status))
                {
                    if (query.Status != entity.Status)
                    {
                        continue;
                    }
                }

                result.Add(entity);
            }

            return result;
        }
        catch (Exception)
        {
            return null;
        }
    }
}