//To prevent a bug in IE where the global use of the 'viz' variable
//  interferes with the div id 'viz' (in the html), the following line is needed:
//  Note: this line does not appear in the tutorial videos but should still be used
//    and is in all of the included js files. 
var viz, workbook;

window.onload=function() {
	var vizDiv = document.getElementById('viz');
	var vizURL = "https://public.tableausoftware.com/views/NSSAPI/NationwideOverview";
	var options = {
		width: '1200px',
		height: '900px',
		hideToolbar: true,
		hideTabs: true,
		onFirstInteractive: function () {
			workbook = viz.getWorkbook();
            document.getElementById('dashTitle').innerHTML = viz.getWorkbook().getActiveSheet().getName();
		}
	};
	viz = new tableauSoftware.Viz (vizDiv, vizURL, options);
	viz.addEventListener('tabswitch', function(event) {
		document.getElementById('dashTitle').innerHTML = event.getNewSheetName();
	});
};


function switchView(sheetName) {

	workbook.activateSheetAsync(sheetName);
}

//    Filter replace function

function showOnly(filterName, values) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.applyFilterAsync(filterName, values, 'REPLACE');
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].applyFilterAsync(filterName, values, 'REPLACE');
		}
	}
}