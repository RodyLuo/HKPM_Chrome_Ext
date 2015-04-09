using System;
using System.Collections.Generic;
using System.Web;

/// <summary>
/// Summary description for SignInEntity
/// </summary>
public class SignInEntity
{
    public SignInEntity()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    private string id;

    public string Id
    {
        get { return id; }
        set { id = value; }
    }

    private string url;

    public string Url
    {
        get { return url; }
        set { url = value; }
    }

    private string loginUser;

    public string LoginUser
    {
        get { return loginUser; }
        set { loginUser = value; }
    }
}