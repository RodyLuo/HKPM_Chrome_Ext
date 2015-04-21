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

    private string isMonitor;
    public string IsMonitor
    {
        get { return isMonitor; }
        set { isMonitor = value; }
    }

    private string isWithOrder;
    public string IsWithOrder
    {
        get { return isWithOrder; }
        set { isWithOrder = value; }
    }

    private string raceType;

    public string RaceType
    {
        get { return raceType; }
        set { raceType = value; }
    }

    private string raceDate;

    public string RaceDate
    {
        get { return raceDate; }
        set { raceDate = value; }
    }

    private string sml;

    public string Sml
    {
        get { return sml; }
        set { sml = value; }
    }

    private string siteType;

    public string SiteType
    {
        get { return siteType; }
        set { siteType = value; }
    }

    private string _date;

    public string date
    {
        get { return _date; }
        set { _date = value; }
    }
}