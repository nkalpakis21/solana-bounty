'use client';
import { Issue, Repository } from 'app/types/types';
import useSWR from 'swr';

interface RepositoryData {
  repository: Repository;
  issues: Issue[];
}

const fetcher = async (url: string): Promise<RepositoryData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useGithubRepositoryIssues = (repoOwner: string, repoName: string) => {
  // Construct URLs for repository and issues
  const repositoryUrl: string = `https://api.github.com/repos/${repoOwner}/${repoName}`;
  const issuesUrl: string = `${repositoryUrl}/issues?state=open`;

  const { data, error } = useSWR<RepositoryData>([repositoryUrl, issuesUrl], async ([repoUrl, issuesUrl]) => {
    const repoResponse = await fetch(repoUrl);
    // todo fix this type
    const issuesResponse = await fetch(issuesUrl as any);

    if (!repoResponse.ok || !issuesResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const repository = await repoResponse.json();
    const issues = await issuesResponse.json();

    return { repository, issues };
  });

  return {
    repository: data?.repository,
    issues: data?.issues,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useGithubRepositoryIssues;
