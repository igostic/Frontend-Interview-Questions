import "./styles.css";

document.getElementById("app").innerHTML = `

`;

function convertTo24hours(time12) {
  const [time, period] = time12.split(' ');
  const [hours, minutes] = time.split(":");
  console.log({time, period, hours, minutes});
  let hours24 = parseInt(hours, 10);

  if (period.toLowerCase() === 'pm' && hours24 !== 12) {
    hours24 += 12;
  }
  // Ensure two-digit formatting for hours and minutes
  const hours24Str = hours24 < 10 ? '0' + hours24 : hours24;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${hours24Str}:${minutesStr}`;

}

const time12 = "00:59 PM";
const time24 = convertTo24hours(time12);
console.log(time24);
