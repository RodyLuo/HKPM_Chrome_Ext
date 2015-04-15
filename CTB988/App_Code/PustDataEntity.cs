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
    private string _type;

    public string type
    {
        get { return _type; }
        set { _type = value; }
    }

    private string _matches;

    public string matches
    {
        get { return _matches; }
        set { _matches = value; }
    }

    private string _rdfb;

    public string rdfb
    {
        get { return _rdfb; }
        set { _rdfb = value; }
    }

    private string _fb;

    public string fb
    {
        get { return _fb; }
        set { _fb = value; }
    }

    private string _x;

    public string x
    {
        get { return _x; }
        set { _x = value; }
    }

    private string _y;

    public string y
    {
        get { return _y; }
        set { _y = value; }
    }

    private string _t;

    public string t
    {
        get { return _t; }
        set { _t = value; }
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

    private string _type;

    public string type
    {
        get { return _type; }
        set { _type = value; }
    }
}