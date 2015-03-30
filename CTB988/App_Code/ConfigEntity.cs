using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ConfigEntity
/// </summary>
public class ConfigEntity
{
	public ConfigEntity()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public int Mode { get; set; }
    public int Proportion { get; set; }
    public int Discount { get; set; }
    public int Direction { get; set; }
    public int Monitor { get; set; }
    public int WithOrder { get; set; }
    public string EatMode { get; set; }

    public DiscountEntity Eat { get; set; }
    public DiscountEntity Bet { get; set; }
}