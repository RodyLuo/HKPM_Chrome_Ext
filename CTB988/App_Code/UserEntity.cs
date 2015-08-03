using System;
using System.Collections.Generic;
using System.Web;

/// <summary>
///UserEntity 的摘要说明
/// </summary>
public class UserEntity
{
	public UserEntity()
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//
	}

    //<Status>Y</Status>
    //<DueTime>2015-08-30</DueTime> 
    //<PassWord>123456</PassWord>
    //<UserName>sr002a</UserName>
    //<Version>V1</Version>

    private string status;

    public string Status
    {
        get { return status; }
        set { status = value; }
    }

    private string dueTime;

    public string DueTime
    {
        get { return dueTime; }
        set { dueTime = value; }
    }

    private string passWord;

    public string PassWord
    {
        get { return passWord; }
        set { passWord = value; }
    }

    private string userName;

    public string UserName
    {
        get { return userName; }
        set { userName = value; }
    }

    private string version;

    public string Version
    {
        get { return version; }
        set { version = value; }
    }
}