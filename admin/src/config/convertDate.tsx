import { parse, format, differenceInSeconds } from 'date-fns';

export function convertFromNowToSeconds(dateString: string): number {
  const currentTime = new Date();
  const targetTime = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
  
  const seconds = differenceInSeconds(targetTime, currentTime);
  return seconds;
}

export function convertFromSecondsToNow(seconds: number): string {
  const currentTime = new Date();
  const targetTime = new Date(currentTime.getTime() + (seconds * 1000));
  
  const outputFormat = 'yyyy-MM-dd HH:mm:ss';
  const formattedDate = format(targetTime, outputFormat);
  return formattedDate;
}