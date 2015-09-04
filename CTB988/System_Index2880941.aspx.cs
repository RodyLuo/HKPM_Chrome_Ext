using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class System_Index2880941 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            UserEntity systemitem = new UserEntity();
            systemitem.UserName = "system";
            string adminPassword = XMLData.GetSystemUserList(systemitem)[0].PassWord;
            if (HttpContext.Current.Request.QueryString["AuthID"] == adminPassword)
            {

            }
            else
            {
                HttpContext.Current.Response.Redirect("~/index.html");
            }
        }
        catch (Exception)
        {
            HttpContext.Current.Response.Redirect("~/index.html");
        }
    }
}