using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using System.Xml;

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
  //<Mode>0</Mode> 0
  //<Proportion>1</Proportion> 1
  //<Discount>0</Discount>2
  //<Direction>0</Direction>3
  //<Monitor>0</Monitor>4
  //<WithOrder>0</WithOrder>5
  //<EatMode>Q</EatMode>6
  //<Eat>
  //  <QDiscount>76</QDiscount> 0
  //  <QLimitStart>300</QLimitStart>1
  //  <WPDiscount>76</WPDiscount>2
  //  <WPLimitStart>300</WPLimitStart>3
  //  <WPLimitEnd>100</WPLimitEnd>4
  //  <QPDiscount>76</QPDiscount>5
  //  <QPLimitStart>300</QPLimitStart>6
  //</Eat>
  //<Bet>
  //  <QDiscount>76</QDiscount>
  //  <QLimitStart>300</QLimitStart>
  //  <WPDiscount>76</WPDiscount>
  //  <WPLimitStart>300</WPLimitStart>
  //  <WPLimitEnd>100</WPLimitEnd>
  //  <QPDiscount>76</QPDiscount>
  //  <QPLimitStart>300</QPLimitStart>
  //</Bet>

    public static ConfigEntity GetConfigEntity() {
        try
        {
            ConfigEntity entity = new ConfigEntity();
            XmlNodeList node = xml.GetXmlNodeListByXpath(CONFIGPATH, "Config");
            entity.Direction = int.Parse(node.Item(3).InnerText);
            entity.Discount = int.Parse(node.Item(2).InnerText);
            entity.EatMode = node.Item(6).InnerText;
            entity.Mode = int.Parse(node.Item(0).InnerText);
            entity.Monitor = int.Parse(node.Item(4).InnerText);
            entity.Proportion = int.Parse(node.Item(1).InnerText);
            entity.WithOrder = int.Parse(node.Item(5).InnerText);
            foreach (XmlNode xn in node)
            {
                if (xn.HasChildNodes)
                {
                    if (xn.Name == "Eat" || xn.Name == "Bet")
                    {
                        DiscountEntity eat = new DiscountEntity();
                        XmlNodeList nodeC = xn.ChildNodes;
                        eat.QDiscount = int.Parse(nodeC.Item(0).InnerText);
                        eat.QLimitStart = int.Parse(nodeC.Item(1).InnerText);
                        eat.QPDiscount = int.Parse(nodeC.Item(5).InnerText);
                        eat.QPLimitStart = int.Parse(nodeC.Item(6).InnerText);
                        eat.WPDiscount = int.Parse(nodeC.Item(2).InnerText);
                        eat.WPLimitEnd = int.Parse(nodeC.Item(4).InnerText);
                        eat.WPLimitStart = int.Parse(nodeC.Item(3).InnerText);
                        if (xn.Name == "Eat")
                        {
                            entity.Eat = eat;
                        }
                        else
                        {
                            entity.Bet = eat;
                        }
                    }
                }
            }
            return entity;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static string CreateConfigJson(ConfigEntity entity) {
        

        
        return "";
    }

    public static bool UpdateConfig(ConfigEntity entity) {
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

            first.Add("QDiscount", entity.Eat.QDiscount);
            first.Add("QLimitStart", entity.Eat.QLimitStart);
            first.Add("QPDiscount", entity.Eat.QPDiscount);
            first.Add("QPLimitStart", entity.Eat.QPLimitStart);
            first.Add("WPDiscount", entity.Eat.WPDiscount);
            first.Add("WPLimitEnd", entity.Eat.WPLimitEnd);
            first.Add("WPLimitStart", entity.Eat.WPLimitStart);

            second.Add("QDiscount", entity.Bet.QDiscount);
            second.Add("QLimitStart", entity.Bet.QLimitStart);
            second.Add("QPDiscount", entity.Bet.QPDiscount);
            second.Add("QPLimitStart", entity.Bet.QPLimitStart);
            second.Add("WPDiscount", entity.Bet.WPDiscount);
            second.Add("WPLimitEnd", entity.Bet.WPLimitEnd);
            second.Add("WPLimitStart", entity.Bet.WPLimitStart);

            var node = xml.UpdateNode(CONFIGPATH, "Config", hstable, first, second);
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
    public static string GetStatus() {
        try
        {
            
            var node = xml.GetXmlNodeByXpath(STATUSPATH, "Status");

            if (node != null && node.HasChildNodes && node.ChildNodes.Count > 0) {
                var nodeList = node.ChildNodes;
                if (!string.IsNullOrWhiteSpace(nodeList.Item(1).InnerText))
                {
                    var lasterTime = Convert.ToDateTime(nodeList.Item(1).InnerText);
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
    public static string UpdateStatus(string Status) {
        try
        {
            Hashtable hstable = new Hashtable();
            hstable.Add("Statue", Status);
            hstable.Add("StatueTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            var node = xml.UpdateNode(STATUSPATH, "Status", hstable,null,null);
            if(node){
                return "1";
            }else
            {
                return "0";
            }
        }
        catch (Exception)
        {
            return "-1";
        }
    }
}