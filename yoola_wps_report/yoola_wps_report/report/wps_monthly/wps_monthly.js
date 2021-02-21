// Copyright (c) 2016, Craft and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["WPS MONTHLY"] = {
	"filters": [
		{
			"fieldname":"from_date",
			"label": __("From"),
			"fieldtype": "Date",
			"default": frappe.datetime.add_months(frappe.datetime.get_today(),-1),
			"reqd": 1
		},
		{
			"fieldname":"to_date",
			"label": __("To"),
			"fieldtype": "Date",
			"default": frappe.datetime.get_today(),
			"reqd": 1
		},
		{
			"fieldname":"docstatus",
			"label":__("Document Status"),
			"fieldtype":"Select",
			"options":["Draft", "Submitted", "Cancelled"],
			"default":"Submitted"
		}
	],

	"onload": function(reportview) {
        debugger;
//	    frappe.query_report.page.add_inner_button(__("Export SIF FILE"), function() {
	    reportview.page.add_inner_button(__("Export SIF FILE"), function() {
	        debugger
            reportview.make_access_log('Export','SIF')
            const column_row = reportview.columns.reduce((acc, col) => {
                if (!col.hidden) {
                    acc.push(col.label);
                }
                return acc;
            }, []);
            const data = reportview.get_data_for_csv(1);
            const out = [column_row].concat(data);

            wps_report.tools.downloadify(out,null, reportview.report_name);
	    });
	}
};