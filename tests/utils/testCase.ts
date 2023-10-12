import { IReleaseInfo } from '../../src/types/index';

const getReleaseTagInfo = (date: Date, iter: number): IReleaseInfo => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {
    year,
    month,
    day,
    iter,
  };
};

const getReleaseTag = (tagInfo: IReleaseInfo) => {
  let tagName = `${tagInfo.year}${tagInfo.month}${tagInfo.day}`;
  if (tagInfo.iter > 1) {
    tagName = `${tagName}-${tagInfo.iter}`;
  }
  return tagName;
};

export const getTestCase = ({
  oldDate = new Date(),
  newDate = new Date(),
  oldIter,
  newIter = 1,
  prefix = '',
}: {
  oldDate?: Date;
  newDate?: Date;
  oldIter: number;
  newIter?: number;
  prefix?: string;
}) => {
  const oldTagInfo = getReleaseTagInfo(oldDate, oldIter);
  const newTagInfo = getReleaseTagInfo(newDate, newIter);
  return {
    oldTagInfo,
    newTagInfo,
    oldTag: `${prefix}${getReleaseTag(oldTagInfo)}`,
    newTag: `${prefix}${getReleaseTag(newTagInfo)}`,
  };
};
