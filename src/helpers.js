const GOLDEN_RATIO = 1.618;
const MALE_WAIST_TO_HEIGHT_RATIO = 0.447;
const FEMALE_SHOULDER_TO_HEIGHT_RATIO = 0.62;
const FEMALE_WAIST_TO_HEIGHT_RATIO = 0.38;
const FEMALE_WAIST_TO_HIP_RATIO = 0.7;
const INCHES_TO_CM = 2.54;
const CM_TO_INCHES = 1 / 2.54;

// Date format YYYY-MM-DD
export function dateStamp(date) {
  date = date || new Date();
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [ year, month, day ].join('-');
}

export function inToCm(inches) {
  return Math.round(inches * INCHES_TO_CM);
}

export function cmToIn(cm) {
  return Math.round(cm * CM_TO_INCHES);
}

export function adonisIndex(height) {
  const idealWaist = Math.round(height * MALE_WAIST_TO_HEIGHT_RATIO);
  const idealShoulders = Math.round(idealWaist * GOLDEN_RATIO);
  return { idealWaist, idealShoulders };
}

export function venusIndex(height) {
  const fWaist = Math.round(height * FEMALE_WAIST_TO_HEIGHT_RATIO);
  const fShoulders = Math.round(height * FEMALE_SHOULDER_TO_HEIGHT_RATIO);
  const fHips = Math.round(fWaist / FEMALE_WAIST_TO_HIP_RATIO);
  return { fHips, fShoulders, fWaist };
}
