using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Unnamed1_Click(object sender, EventArgs e)
    {
        string userName = UserName.Value.Trim();
        string password = Password.Value.Trim();
        UserEntity insert = new UserEntity();
        insert.UserName = userName;
        List<UserEntity> systemEntity = XMLData.GetSystemUserList(insert);
        UserEntity entity = systemEntity[0];

        if (entity.PassWord == password) {
            UserEntity systemitem = new UserEntity();
            systemitem.UserName = "system";
            string adminPassword = XMLData.GetSystemUserList(systemitem)[0].PassWord;

            HttpContext.Current.Response.Redirect("~/System_Index2880941.aspx?AuthID=" + adminPassword);
        }
    }
}