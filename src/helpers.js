// Date format YYYY-MM-DD
function dateStamp() {
	const date = new Date();
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [ year, month, day ].join('-');
}

function inToCm(inches) {
	return inches * 2.54;
}

function cmToIn(cm) {
	return cm * 0.393701;
}

export { dateStamp, inToCm, cmToIn };