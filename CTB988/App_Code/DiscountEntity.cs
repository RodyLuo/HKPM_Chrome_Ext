using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for DiscountEntity
/// </summary>
public class DiscountEntity
{
	public DiscountEntity()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public int QDiscount { get; set; }

    public int QLimitStart { get; set; }

    public int WPDiscount { get; set; }

    public int WPLimitStart { get; set; }

    public int WPLimitEnd { get; set; }

    public int QPDiscount { get; set; }

    public int QPLimitStart { get; set; }
}