//To prevent a bug in IE where the global use of the 'viz' variable
//  interferes with the div id 'viz' (in the html), the following line is needed:
//  Note: this line does not appear in the tutorial videos but should still be used
//    and is in all of the included js files. 
var viz, workbook;

window.onload= function() {
	var vizDiv = document.getElementById('TableauDiv');
	var vizURL = "https://public.tableausoftware.com/views/NSSAPI/NationwideOverview";
	var options = {
		width: '100%',
		height: '1000px',
		hideToolbar: true,
		hideTabs: true,
        onFirstInteractive: function () {
			workbook = viz.getWorkbook();
            document.getElementById('sheetName').innerHTML = viz.getWorkbook().getActiveSheet().getName();
		}
	};
	viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
    viz.addEventListener('tabswitch', function(event) {
		document.getElementById('sheetName').innerHTML = event.getNewSheetName();
	});
};


//    Switch View function; Passes in sheetName from the onClick event in the Html

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




//    Filter Add function

function alsoShow(filterName, values) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.applyFilterAsync(filterName, values, 'ADD');
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].applyFilterAsync(filterName, values, 'ADD');
		}
	}
}



function dontShow(filterName, values) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.applyFilterAsync(filterName, values, 'REMOVE');
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].applyFilterAsync(filterName, values, 'REMOVE');
		}
	}
}

function clearFilter(filterName) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.clearFilterAsync(filterName);
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].clearFilterAsync(filterName);
		}
	}
}


function clearSelection(filterName) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.clearSelectedMarksAsync(filterName);
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].clearSelectedMarksAsync(filterName);
		}
	}
}


function selectMarks(filterName, values) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.selectMarksAsync(filterName, values, 'REPLACE');
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].selectMarksAsync(filterName, values, 'REPLACE');
		}
	}
}


function addMarks(filterName, values) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.selectMarksAsync(filterName, values, 'ADD');
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].selectMarksAsync(filterName, values, 'ADD');
		}
	}
}



function clearSelection(filterName) {
	sheet = viz.getWorkbook().getActiveSheet();
	if(sheet.getSheetType() === 'worksheet') {
		sheet.clearSelectedMarksAsync(filterName);
	} else {
		worksheetArray = sheet.getWorksheets();
		for(var i = 0; i < worksheetArray.length; i++) {
			worksheetArray[i].clearSelectedMarksAsync(filterName);
		}
	}
}

function showRange(filter, minVal, maxVal) {
	sheet = workbook.getActiveSheet();
	sheet.applyRangeFilterAsync(filter, {
		min: minVal,
		max: maxVal
	});
}

function showDateRange(filter, minDate, maxDate) {
	sheet = workbook.getActiveSheet();
	sheet.applyRangeFilterAsync(filter, {
		min: new Date(minDate),
		max: new Date(maxDate)
	});
}

function showLastNYears(filter, years, anchor) {
	sheet = workbook.getActiveSheet();
	var dateObj;
	if(anchor) {
		dateObj = new Date(anchor);
	} else {
		dateObj = new Date();
	}
	sheet.applyRelativeDateFilterAsync(filter, {
		periodType: 'year',
		rangeType: 'lastn',
		rangeN: years,
		anchorDate: dateObj
	});
}


