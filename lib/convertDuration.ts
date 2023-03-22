export default function convertDuration(time: Date): string {
  let seconds: number | string = time.getSeconds();
  let minutes: number | string = time.getMinutes();

  if (seconds > 10) {
    seconds = seconds.toString();
  } else {
    seconds = `0${seconds}`;
  }
  if (time.getMinutes() > 10) {
    return time.toLocaleTimeString(undefined, { minute: 'numeric', second: '2-digit' });
  } else {
    minutes = minutes.toString();

    minutes = minutes.split('0')[0];
    return `${minutes}:${seconds}`;
  }
}
