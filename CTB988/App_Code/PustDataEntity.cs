using System;
using System.Collections.Generic;
using System.Web;

/// <summary>
/// Summary description for PustDataEntity
/// </summary>
public class PustDataEntity
{
    public PustDataEntity()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    //<ID></ID>
    //<ModeType>Q</ModeType>
    //<Hourse1>1</Hourse1>
    //<Hourse2>2</Hourse2>
    //<Ticket>2</Ticket>
    //<Discount>80</Discount>
    //<LimitStart>300</LimitStart>
    //<LimitEnd></LimitEnd>
    //<W></W>
    //<P></P>

    private string id;

    public string Id
    {
        get { return id; }
        set { id = value; }
    }

    private string modeType;

    public string ModeType
    {
        get { return modeType; }
        set { modeType = value; }
    }

    private string buyMode;

    public string BuyMode
    {
        get { return buyMode; }
        set { buyMode = value; }
    }

    private string hourse1;

    public string Hourse1
    {
        get { return hourse1; }
        set { hourse1 = value; }
    }

    private string hourse2;

    public string Hourse2
    {
        get { return hourse2; }
        set { hourse2 = value; }
    }

    private string ticket;

    public string Ticket
    {
        get { return ticket; }
        set { ticket = value; }
    }

    private string discount;

    public string Discount
    {
        get { return discount; }
        set { discount = value; }
    }

    private string limitStart;

    public string LimitStart
    {
        get { return limitStart; }
        set { limitStart = value; }
    }

    private string limitEnd;

    public string LimitEnd
    {
        get { return limitEnd; }
        set { limitEnd = value; }
    }

    private string w;

    public string W
    {
        get { return w; }
        set { w = value; }
    }

    private string p;

    public string P
    {
        get { return p; }
        set { p = value; }
    }

    private string status;

    public string Status
    {
        get { return status; }
        set { status = value; }
    }
}


public class PushDataQueryEntity     {

    public PushDataQueryEntity() { 
    
    }

    private string id;

    public string Id
    {
        get { return id; }
        set { id = value; }
    }

    private string modeType;

    public string ModeType
    {
        get { return modeType; }
        set { modeType = value; }
    }

    private string buyMode;

    public string BuyMode
    {
        get { return buyMode; }
        set { buyMode = value; }
    }

    private string status;
    public string Status
    {
        get { return status; }
        set { status = value; }
    }
}