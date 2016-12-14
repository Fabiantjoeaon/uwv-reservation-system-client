export function convertDateTimeToTime(date) {
  const endDate = new Date(date);
  const h = endDate.getHours();
  const m = (endDate.getMinutes()<10?'0':'') + endDate.getMinutes();
  const time = `${h}:${m}`;

  return time;
}

/**
 * Returns time as hours:minutes
 */
export function makeHoursAndMinutes(time) {
  const timeObj = new Date(time);
  const minutesWithoutZero = timeObj.getMinutes();
  const minutes = minutesWithoutZero < 10 ? `0${minutesWithoutZero}` : minutesWithoutZero;
  const hours = timeObj.getHours();
  const string = `${hours}:${minutes}`;

  return string;
}

// Date.prototype.yyyymmdd = function() {
//   const mm = this.getMonth() + 1;
//   const dd = this.getDate();
//
//   return [this.getFullYear(),
//           (mm>9 ? '' : '0') + mm,
//           (dd>9 ? '' : '0') + dd
//         ].join('-');
// };
//
// Date.prototype.addDays = function(days) {
//     const date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }
//
// module.exports = Date;
