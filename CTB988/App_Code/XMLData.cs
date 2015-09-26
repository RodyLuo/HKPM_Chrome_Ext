using System;
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
    public static string JSFILEPATH = AppDomain.CurrentDomain.BaseDirectory + "AppData\\JSFile.xml";
    public static string USERPATH = AppDomain.CurrentDomain.BaseDirectory + "AppData\\User.xml";
    public static string CONFIGPATH = AppDomain.CurrentDomain.BaseDirectory + "AppData\\Config.xml";
    public static string SIGNINPATH = AppDomain.CurrentDomain.BaseDirectory + "AppData\\SignIn.xml";

    public static object statusObj = new object();
    public static object dataObj = new object();
    public static object configObj = new object();
    public static object signObj = new object();

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
            hstable.Add("MaxCount", entity.MaxCount);
            bool node = false;
            lock (configObj)
            {
                node = xml.UpdateNode(CONFIGPATH, "Config", null, hstable);
            }
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
            bool node = false;
            lock (statusObj)
            {
                xml.UpdateNode(STATUSPATH, "Status", null, hstable);
            }
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
            bool node = false;
            lock (dataObj)
            {
                node = xml.InsertNode(DATAPATH, "PushData", false, "PushDataList", null, hashTable);
            }
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
    public static string AddSignInData(SignInEntity entity)
    {
        try
        {
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
            bool node = false;
            lock (signObj)
            {
                node = xml.InsertNode(SIGNINPATH, "SignIn", false, "SignInDataList", null, hashTable);
            }
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

    public static string DeleteSignInById(string Id)
    {
        try
        {
            Hashtable where = new Hashtable();
            where.Add("Id", Id);
            bool result = false;
            lock (signObj)
            {
                result = xml.DeleteXmlByWhere(SIGNINPATH, "SignInDataList", where);
            }
            return result ? "1" : "0";
        }
        catch (Exception)
        {
            return "-1";
        }

    }

    public static string UpdatePushDataStatusById(string status, string Id)
    {
        try
        {
            Hashtable update = new Hashtable();
            update.Add("Status", status);

            Hashtable where = new Hashtable();
            where.Add("Id", Id);
            bool result = false;
            lock (dataObj)
            {
                result = xml.UpdateNodeByWhere(DATAPATH, "PushDataList", null, update, where);
            }
            return result ? "1" : "0";
        }
        catch (Exception)
        {
            return "-1";
        }
    }

    public static string UpdateSignInSetMonitorById(string Id, string IsMonitor)
    {
        try
        {
            Hashtable update = new Hashtable();
            update.Add("IsMonitor", IsMonitor);
            if (IsMonitor == "1")
            {
                Hashtable updateA = new Hashtable();
                updateA.Add("IsMonitor", "0");
                updateA.Add("IsWithOrder", "0");
                xml.UpdateNodeByWhere(SIGNINPATH, "SignInDataList", null, updateA, null);
            }
            Hashtable where = new Hashtable();
            where.Add("Id", Id);
            bool result = false;
            lock (signObj)
            {
                result = xml.UpdateNodeByWhere(SIGNINPATH, "SignInDataList", null, update, where);
            }

            return result ? "1" : "0";
        }
        catch (Exception)
        {
            return "-1";
        }

    }

    public static string UpdateSignInSetWithOrderById(string Id, string isWithOrder)
    {
        try
        {
            Hashtable update = new Hashtable();
            update.Add("IsWithOrder", isWithOrder);

            Hashtable where = new Hashtable();
            where.Add("Id", Id);
            bool result = false;
            lock (signObj)
            {
                result = xml.UpdateNodeByWhere(SIGNINPATH, "SignInDataList", null, update, where);
            }
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
            bool result = false;
            lock (dataObj)
            {
                result = xml.DeleteXmlByWhere(DATAPATH, "PushDataList", where);
            }

            return result ? "1" : "0";
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
            if (item.Name == Name)
            {
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

            foreach (XmlNode node in nodeList)
            {
                PustDataEntity entity = new PustDataEntity();
                XmlElement nodeElement = (XmlElement)node;
                XmlNodeList itemList = nodeElement.ChildNodes;

                PropertyInfo[] pInfos = entity.GetType().GetProperties();
                string pValue = string.Empty;
                foreach (PropertyInfo item in pInfos)
                {
                    pValue = GetNodeListByName(itemList, item.Name);
                    item.SetValue(entity, pValue, null);
                }

                if (!string.IsNullOrEmpty(query.Id))
                {
                    if (query.Id != entity.Id)
                    {
                        continue;
                    }
                }
                if (!string.IsNullOrEmpty(query.type))
                {
                    if (query.type != entity.type)
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

    public static string GetJSFileListByVersion(string version)
    {
        try
        {
            string result = string.Empty;

            XmlNodeList nodeList = xml.GetXmlNodeListByXpath(JSFILEPATH, "JSFileList/JSFile");

            foreach (XmlNode node in nodeList)
            {
                XmlElement nodeElement = (XmlElement)node;
                XmlNodeList itemList = nodeElement.ChildNodes;


                string pValue = GetNodeListByName(itemList, "version");

                if (!string.IsNullOrEmpty(pValue))
                {
                    if (pValue == version)
                    {
                        result = GetNodeListByName(itemList, "JSCode");
                    }
                }
            }

            return result;
        }
        catch (Exception)
        {
            return string.Empty;
        }
    }

    public static UserEntity GetUser(string userName, string password)
    {
        try
        {
            UserEntity result = new UserEntity();

            XmlNodeList nodeList = xml.GetXmlNodeListByXpath(USERPATH, "UserList/User");

            foreach (XmlNode node in nodeList)
            {
                UserEntity entity = new UserEntity();
                XmlElement nodeElement = (XmlElement)node;
                XmlNodeList itemList = nodeElement.ChildNodes;

                PropertyInfo[] pInfos = entity.GetType().GetProperties();
                string pValue = string.Empty;
                foreach (PropertyInfo item in pInfos)
                {
                    pValue = GetNodeListByName(itemList, item.Name);
                    item.SetValue(entity, pValue, null);
                }

                if (userName == entity.UserName
                    && password == entity.PassWord && entity.Status != "D")
                {
                    result = entity;
                }
            }

            return result;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static List<UserEntity> GetAllUserList(UserEntity query)
    {
        try
        {
            List<UserEntity> list = new List<UserEntity>();
            UserEntity result = new UserEntity();
            XmlNodeList nodeList = xml.GetXmlNodeListByXpath(USERPATH, "UserList/User");

            foreach (XmlNode node in nodeList)
            {
                UserEntity entity = new UserEntity();
                XmlElement nodeElement = (XmlElement)node;
                XmlNodeList itemList = nodeElement.ChildNodes;

                PropertyInfo[] pInfos = entity.GetType().GetProperties();
                string pValue = string.Empty;
                foreach (PropertyInfo item in pInfos)
                {
                    pValue = GetNodeListByName(itemList, item.Name);
                    item.SetValue(entity, pValue, null);
                }
                if (!string.IsNullOrEmpty(query.UserName))
                {

                    if (entity.UserName != query.UserName)
                    {
                        continue;
                    }
                }
                if (!string.IsNullOrEmpty(query.PassWord))
                {
                    if (entity.PassWord != query.PassWord)
                    {
                        continue;
                    }
                }
                //代表已经删除了
                if (entity.Status != "D")
                {
                    list.Add(entity);
                }
            }

            return list;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static List<UserEntity> GetSystemUserList(UserEntity query)
    {
        try
        {
            List<UserEntity> list = new List<UserEntity>();
            UserEntity result = new UserEntity();
            XmlNodeList nodeList = xml.GetXmlNodeListByXpath(USERPATH, "UserList/User");

            foreach (XmlNode node in nodeList)
            {
                UserEntity entity = new UserEntity();
                XmlElement nodeElement = (XmlElement)node;
                XmlNodeList itemList = nodeElement.ChildNodes;

                PropertyInfo[] pInfos = entity.GetType().GetProperties();
                string pValue = string.Empty;
                foreach (PropertyInfo item in pInfos)
                {
                    pValue = GetNodeListByName(itemList, item.Name);
                    item.SetValue(entity, pValue, null);
                }
                if (!string.IsNullOrEmpty(query.UserName))
                {
                    if (entity.UserName.ToUpper() != query.UserName.ToUpper())
                    {
                        continue;
                    }
                    if (entity.UserName.ToUpper() != "SYSTEM" && entity.UserName.ToUpper() != "ADMIN")
                    {
                        continue;
                    }
                    list.Add(entity);
                }
            }

            return list;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static List<SignInEntity> GetAllSignIn()
    {
        try
        {
            List<SignInEntity> result = new List<SignInEntity>();

            XmlNodeList nodeList = xml.GetXmlNodeListByXpath(SIGNINPATH, "SignInDataList/SignIn");

            foreach (XmlNode node in nodeList)
            {
                SignInEntity entity = new SignInEntity();
                XmlElement nodeElement = (XmlElement)node;
                XmlNodeList itemList = nodeElement.ChildNodes;

                PropertyInfo[] pInfos = entity.GetType().GetProperties();
                string pValue = string.Empty;
                foreach (PropertyInfo item in pInfos)
                {
                    pValue = GetNodeListByName(itemList, item.Name);
                    item.SetValue(entity, pValue, null);
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

    public static bool AddUser(UserEntity entity)
    {
        try
        {
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
            bool node = false;
            lock (dataObj)
            {
                node = xml.InsertNode(USERPATH, "User", false, "UserList", null, hashTable);
            }
            if (node)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (Exception)
        {
            return false;
        }
    }

    public static bool UpdateUser(UserEntity entity)
    {
        try
        {
            Hashtable update = new Hashtable();
            update.Add("Status", entity.Status);
            update.Add("Version", entity.Version);
            update.Add("PassWord", entity.PassWord);
            update.Add("DueTime", entity.DueTime);


            Hashtable where = new Hashtable();
            where.Add("UserName", entity.UserName);
            where.Add("PassWord", entity.PassWord);
            bool result = false;
            lock (dataObj)
            {
                result = xml.UpdateNodeByWhere(USERPATH, "UserList", null, update, where);
            }
            return result;
        }
        catch (Exception)
        {
            return false;
        }
    }
}