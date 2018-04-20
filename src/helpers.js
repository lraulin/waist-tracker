const GOLDEN_RATIO = 1.618;
const IDEAL_WAIST_TO_HEIGHT_RATIO = 0.447;
const FEMALE_SHOULDER_TO_HEIGHT_RATIO = 0.62;
const FEMALE_WAIST_TO_HEIGHT_RATIO = 0.38;
const INCHES_TO_CM = 2.54;
const CM_TO_INCHES = 1 / 2.54;

// Date format YYYY-MM-DD
export function dateStamp() {
  const date = new Date();
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [ year, month, day ].join('-');
}

export function inToCm(inches) {
  return inches * INCHES_TO_CM;
}

export function cmToIn(cm) {
  return cm * CM_TO_INCHES;
}

export function adonisIndex(height) {
  const idealWaist = Math.round(height * IDEAL_WAIST_TO_HEIGHT_RATIO);
  const idealShoulders = Math.round(idealWaist * GOLDEN_RATIO);
  return { idealWaist, idealShoulders };
}

export function venusIndex(height) {
  const idealWaist = Math.round(height * FEMALE_WAIST_TO_HEIGHT_RATIO);
  const idealShoulders = Math.round(height * FEMALE_SHOULDER_TO_HEIGHT_RATIO);
  const idealHips = Math.round(idealWaist * GOLDEN_RATIO);
  return { idealHips, idealShoulders, idealWaist };
}
