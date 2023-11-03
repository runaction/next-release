export interface IReleaseInfo {
  // string is used to keep initial zero for dates and months below 10
  year: string;
  month: string;
  day: string;
  iter: number;
}
