import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getNewRelease,
  getOldReleaseInfo,
} from '../src/services/releaseService';
import { getTestCase } from './utils/testCase';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.resetAllMocks();
});

describe('test valid cases without prefix', () => {
  it('should return changed iter for the same date', () => {
    const { oldTag, newTag } = getTestCase({
      oldIter: 4,
      newIter: 5,
    });
    const newRelease = getNewRelease('', oldTag);
    expect(newRelease.tagName).toBe(newTag);
  });
  it('should reset iter for changed day', () => {
    vi.setSystemTime(new Date('2023-01-02'));
    const { oldTag, newTag } = getTestCase({
      oldDate: new Date('2023-01-01'),
      newDate: new Date('2023-01-02'),
      oldIter: 4,
      newIter: 1,
    });
    const newRelease = getNewRelease('', oldTag);
    expect(newRelease.tagName).toBe(newTag);
  });
  it('should reset iter for changed month', () => {
    vi.setSystemTime(new Date('2023-02-01'));
    const { oldTag, newTag } = getTestCase({
      oldDate: new Date('2023-01-01'),
      newDate: new Date('2023-02-01'),
      oldIter: 4,
      newIter: 1,
    });
    const newRelease = getNewRelease('', oldTag);
    expect(newRelease.tagName).toBe(newTag);
  });
  it('should reset iter for changed year', () => {
    vi.setSystemTime(new Date('2024-01-01'));
    const { oldTag, newTag } = getTestCase({
      oldDate: new Date('2023-01-01'),
      newDate: new Date('2024-01-01'),
      oldIter: 4,
      newIter: 1,
    });
    const newRelease = getNewRelease('', oldTag);
    expect(newRelease.tagName).toBe(newTag);
  });
});

describe('test valid cases with prefix', () => {
  it('should return changed iter for the same date', () => {
    const { oldTag, newTag } = getTestCase({
      oldIter: 4,
      newIter: 5,
      prefix: 'v',
    });
    const newRelease = getNewRelease('v', oldTag);
    expect(newRelease.tagName).toBe(newTag);
  });
  it('should reset iter for changed day', () => {
    vi.setSystemTime(new Date('2023-01-02'));
    const { oldTag, newTag } = getTestCase({
      oldDate: new Date('2023-01-01'),
      newDate: new Date('2023-01-02'),
      oldIter: 4,
      newIter: 1,
      prefix: 'v',
    });
    const newRelease = getNewRelease('v', oldTag);
    expect(newRelease.tagName).toBe(newTag);
  });
  it('should reset iter for changed month', () => {
    vi.setSystemTime(new Date('2023-02-01'));
    const { oldTag, newTag } = getTestCase({
      oldDate: new Date('2023-01-01'),
      newDate: new Date('2023-02-01'),
      oldIter: 4,
      newIter: 1,
      prefix: 'v',
    });
    const newRelease = getNewRelease('v', oldTag);
    expect(newRelease.tagName).toBe(newTag);
  });
  it('should reset iter for changed year', () => {
    vi.setSystemTime(new Date('2024-01-01'));
    const { oldTag, newTag } = getTestCase({
      oldDate: new Date('2023-01-01'),
      newDate: new Date('2024-01-01'),
      oldIter: 4,
      newIter: 1,
      prefix: 'v',
    });
    const newRelease = getNewRelease('v', oldTag);
    expect(newRelease.tagName).toBe(newTag);
  });
});

describe('test invalid cases with a missing prefix', () => {
  it('should throw error when old release doesnt start with prefix', () => {
    expect(() => getOldReleaseInfo('v', '1.0')).toThrowError(
      'Old release tag does not start with the tag prefix'
    );
  });
});
