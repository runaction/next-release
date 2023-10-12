import { getInput, setFailed, setOutput } from '@actions/core';
import { fetchLatestReleaseTag } from './services/githubService';
import { getNewRelease } from './services/releaseService';

const generateNextReleaseTag = async (): Promise<void> => {
  try {
    const tagPrefix = getInput('tag_prefix');
    const oldReleaseTag = await fetchLatestReleaseTag();
    const newRelease = getNewRelease(
      tagPrefix,
      oldReleaseTag
    );

    console.log(`Previous Release Tag: ${oldReleaseTag}`);
    console.log(`New Release Tag: ${newRelease.tag_name}`);

    setOutput('prev_release_tag', oldReleaseTag);
    setOutput('next_release_tag', newRelease.tag_name);
    setOutput('next_release_date', newRelease.date_info);
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
};

generateNextReleaseTag();
