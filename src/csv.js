export function exportCSV(records) {
  // Connect to firebase
  const csvOutput = 'Date,Measurement (cm)\n';
  for (item in records) {
    csvOutput += `${item.date},${item.cm}\n`;
  }
}
