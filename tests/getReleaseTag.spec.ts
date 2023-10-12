import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { generateNewTag, getOldReleaseInfo } from '../src/services/releaseService';
import { getTestCase } from './utils/testCase';
import { IReleaseInfo } from '../src/types';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.resetAllMocks();
});

const fakeTagInfo: IReleaseInfo = {
  year: 2023,
  month: 1,
  day: 1,
  iter: 1,
}

describe('test valid cases without prefix', () => {
  it('should return changed iter for same date', () => {
      const { oldTagInfo, newTag } = getTestCase({
        oldIter: 4,
        newIter: 5,
      });
      const actualTag = generateNewTag('', oldTagInfo);
      expect(actualTag).toBe(newTag);
    }
  );
  it('should reset iter for changed day', () => {
      const { oldTagInfo, newTag } = getTestCase({
        oldDate: new Date('2023-01-01'),
        newDate: new Date('2023-01-02'),
        oldIter: 4,
        newIter: 1,
      });
      const actualTag = generateNewTag('', oldTagInfo);
      expect(actualTag).toBe(newTag);
    }
  );
  it('should reset iter for changed month', () => {
      const { oldTagInfo, newTag } = getTestCase({
        oldDate: new Date('2023-01-01'),
        newDate: new Date('2023-02-01'),
        oldIter: 4,
        newIter: 1,
      });
      const actualTag = generateNewTag('', oldTagInfo);
      expect(actualTag).toBe(newTag);
    }
  );
  it('should reset iter for changed year', () => {
      const { oldTagInfo, newTag } = getTestCase({
        oldDate: new Date('2023-01-01'),
        newDate: new Date('2024-01-01'),
        oldIter: 4,
        newIter: 1,
      });
      const actualTag = generateNewTag('', oldTagInfo);
      expect(actualTag).toBe(newTag);
    }
  );
});

describe('test valid cases with prefix', () => {
  it('should return changed iter for same date', () => {
      const { oldTagInfo, newTag } = getTestCase({
        oldIter: 4,
        newIter: 5,
        prefix: 'v',
      });
      const actualTag = generateNewTag('v', oldTagInfo);
      expect(actualTag).toBe(newTag);
    }
  );
  it('should reset iter for changed day', () => {
      const { oldTagInfo, newTag } = getTestCase({
        oldDate: new Date('2023-01-01'),
        newDate: new Date('2023-01-02'),
        oldIter: 4,
        newIter: 1,
        prefix: 'v',
      });
      const actualTag = generateNewTag('v', oldTagInfo);
      expect(actualTag).toBe(newTag);
    }
  );
  it('should reset iter for changed month', () => {
      const { oldTagInfo, newTag } = getTestCase({
        oldDate: new Date('2023-01-01'),
        newDate: new Date('2023-02-01'),
        oldIter: 4,
        newIter: 1,
        prefix: 'v',
      });
      const actualTag = generateNewTag('v', oldTagInfo);
      expect(actualTag).toBe(newTag);
    }
  );
  it('should reset iter for changed year', () => {
      const { oldTagInfo, newTag } = getTestCase({
        oldDate: new Date('2023-01-01'),
        newDate: new Date('2024-01-01'),
        oldIter: 4,
        newIter: 1,
        prefix: 'v',
      });
      const actualTag = generateNewTag('v', oldTagInfo);
      expect(actualTag).toBe(newTag);
    }
  );
});

describe('test invalid cases with a missing prefix', () => {
  it('should throw error when old release doesnt start with prefix', () => {
    expect(() => getOldReleaseInfo('v', '1.0')).toThrowError(
      'Old release tag does not start with the tag prefix'
    );
  });
});
