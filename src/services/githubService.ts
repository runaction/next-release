import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';

export const fetchLatestReleaseTag = async () => {
  try {
    const githubToken = getInput('github_token', { required: true });
    const octokit = getOctokit(githubToken);
    const { owner, repo } = context.repo;
    // Fetch only latest tag
    const latestRelease = await octokit.rest.repos.getLatestRelease({
      owner,
      repo,
    });
    return latestRelease.data?.tag_name;
  } catch (e) {
    console.error('Error while fetching latest release', e);
    throw e;
  }
};
