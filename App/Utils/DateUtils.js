export function convertDateTimeToTime(date) {
  const endDate = new Date(date);
  const h = endDate.getHours();
  const m = (endDate.getMinutes()<10?'0':'') + endDate.getMinutes();
  const time = `${h}:${m}`;

  return time;
}
