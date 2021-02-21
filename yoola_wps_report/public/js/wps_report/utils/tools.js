// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt

import showdown from 'showdown';

frappe.provide("wps_report.tools");

wps_report.tools.filename = ''
wps_report.tools.emp_id = ''
wps_report.tools.downloadify = function(data, roles, title) {
	if(roles && roles.length && !has_common(roles, roles)) {
		frappe.msgprint(__("Export not allowed. You need {0} role to export.", [frappe.utils.comma_or(roles)]));
		return;
	}

	// var filename = title + ".SIF";
	var csv_data = wps_report.tools.to_csv(data);
	var filename = getFileName() + ".SIF";
	var a = document.createElement('a');
	if ("download" in a) {
		// Used Blob object, because it can handle large files
		var blob_object = new Blob([csv_data], { type: 'text/SIF;charset=UTF-8' });
		a.href = URL.createObjectURL(blob_object);
		a.download = filename;

	} else {
		// use old method
		a.href = 'data:attachment/SIF,' + encodeURIComponent(csv_data);
		a.download = filename;
		a.target = "_blank";
	}

	document.body.appendChild(a);
	a.click();

	document.body.removeChild(a);
};

wps_report.markdown = function(txt) {
	if(!wps_report.md2html) {
		wps_report.md2html = new showdown.Converter();
	}

	while(txt.substr(0,1)==="\n") {
		txt = txt.substr(1);
	}

	// remove leading tab (if they exist in the first line)
	var whitespace_len = 0,
		first_line = txt.split("\n")[0];

	while(["\n", "\t"].indexOf(first_line.substr(0,1))!== -1) {
		whitespace_len++;
		first_line = first_line.substr(1);
	}

	if(whitespace_len && whitespace_len != first_line.length) {
		var txt1 = [];
		$.each(txt.split("\n"), function(i, t) {
			txt1.push(t.substr(whitespace_len));
		});
		txt = txt1.join("\n");
	}

	return wps_report.md2html.makeHtml(txt);
};

wps_report.tools.to_csv = function(data) {
	var res = [];
	$.each(data, function(i, row) {
        if(i != 0){
          row = $.map(row, function(col, idx) {
                if(idx == 1){
                	if(i == (data.length - 1)){
						wps_report.tools.emp_id = col;
                        col = pad(col, 13)
		        	}else{
                        col = pad(col, 14)
		        	}


                }else if(idx == 2){
                    col = pad(col, 9)
                }else if(idx == 3){
                	if(i!= (data.length - 1)){
                   	col = pad(col, 16)
                	}
                }else if(idx == 7){
                	if(col == '' || col == null)
                			col = 0
                	col = col.toFixed(2);
                }else if(idx == 8){
             	if(i!= (data.length - 1)){
                		if(col == '' || col == null)
                			col = 0
                		col = col.toFixed(2);
                	}
             }else if(idx == 9){
					if(i!= (data.length - 1)){
                		col = pad(col, 2)
                	}
                }

                if (col === null || col === undefined) col = '';
                return typeof col === "string" ? ($('<i>').html(col.replace(/"/g, '""')).text()) : col;

            });
            res.push(row.join(","));
        }

	});
	return res.join("\n");
};

function pad(n, len){
    if(n.length >= len){
        return n
    }else{
        len = len - n.length
        for(let i=0;i<len;i++){
            n = "0"+String(n)
        }

        return n
    }
}

function getFileName(){
        let year = new Date().getFullYear()-2000
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let hours = new Date().getHours()
        let mins = new Date().getMinutes()
        let secs = new Date().getSeconds()

        wps_report.tools.filename = wps_report.tools.emp_id+year+pad(month.toString(),2)+pad(day.toString(),2)+pad(hours.toString(),2)+pad(mins.toString(),2)+pad(secs.toString(),2)

return wps_report.tools.filename

}

