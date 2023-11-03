import { IReleaseInfo } from '../types/index';

const addZero = (val: number): string =>
  val < 10 ? `0${val}` : val.toString();
const hasItemChanged = (old: string, cur: string) => old !== cur;

export const getOldReleaseInfo = (
  tagPrefix: string,
  oldReleaseTag: string | null | undefined
): IReleaseInfo => {
  if (!oldReleaseTag) {
    return {
      year: '0',
      month: '0',
      day: '0',
      iter: 0,
    };
  }
  if (!oldReleaseTag.startsWith(tagPrefix)) {
    throw new Error('Old release tag does not start with the tag prefix');
  }
  const oldReleaseTagDate = oldReleaseTag.slice(tagPrefix.length);
  const oldReleaseDate: IReleaseInfo = {
    year: oldReleaseTagDate.slice(0, 4),
    month: oldReleaseTagDate.slice(4, 6),
    day: oldReleaseTagDate.slice(6, 8),
    iter: parseInt(oldReleaseTagDate.slice(8).replace('-', '') || '1', 10),
  };
  return oldReleaseDate;
};

export const getNewReleaseInfo = (
  oldReleaseInfo: IReleaseInfo
): IReleaseInfo => {
  const curDate = new Date();
  const curYear = curDate.getFullYear().toString();
  const curMonth = addZero(curDate.getMonth() + 1);
  const curDay = addZero(curDate.getDate());
  let newIter = oldReleaseInfo.iter + 1;
  if (
    hasItemChanged(oldReleaseInfo.year, curYear) ||
    hasItemChanged(oldReleaseInfo.month, curMonth) ||
    hasItemChanged(oldReleaseInfo.day, curDay)
  ) {
    newIter = 1;
  }
  return {
    year: curYear,
    month: curMonth,
    day: curDay,
    iter: newIter,
  };
};

export const generateNewTag = (
  tagPrefix: string,
  newReleaseInfo: IReleaseInfo
): string => {
  let releaseTag = `${tagPrefix}${newReleaseInfo.year}${newReleaseInfo.month}${newReleaseInfo.day}`;
  // Append iteration only if it's the second or later one
  if (newReleaseInfo.iter > 1) {
    releaseTag = `${releaseTag}-${newReleaseInfo.iter}`;
  }
  return releaseTag;
};

export const getNewRelease = (
  tagPrefix: string,
  oldReleaseTag: string | null | undefined
): { tagName: string; dateInfo: string } => {
  const oldReleaseInfo = getOldReleaseInfo(tagPrefix, oldReleaseTag);
  const newReleaseInfo = getNewReleaseInfo(oldReleaseInfo);
  const tagName = generateNewTag(tagPrefix, newReleaseInfo);
  let dateInfo = `${newReleaseInfo.year}-${newReleaseInfo.month}-${newReleaseInfo.day}`;
  if (newReleaseInfo.iter > 1) {
    dateInfo = `${dateInfo} (${newReleaseInfo.iter})`;
  }
  return { tagName, dateInfo };
};
