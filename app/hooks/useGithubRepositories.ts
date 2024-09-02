'use client';

import useSWR from 'swr';

interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    open_issues_count: number;
    full_name: string;
}

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

// Basic fetcher for GitHub API
const fetcher = async (url: string): Promise<any> => {
    const response = await fetch(url, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'SWR'
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

const useGithubRepositories = (
    query: string, 
    page: number = 1, 
    perPage: number = 30
) => {
    // Fetch repositories based on the search query
    const { data: repoData, error: repoError } = useSWR<{ items: Repository[]; total_count: number }>(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
        fetcher
    );

    // Fetch open issue counts for each repository once repos are available
    const { data: reposWithIssues, error: issuesError } = useSWR<Repository[]>(
        repoData ? `/api/reposWithIssues?repos=${repoData.items.map(repo => repo.full_name).join(',')}` : null,
        async () => {
            if (!repoData) return [];

            // Map over all repositories and fetch their issue count
            const issues = await Promise.all(
                repoData.items.map(async (repo) => {
                    const repoDetails = await fetcher(
                        `https://api.github.com/repos/${repo.full_name}`
                    );
                    return {
                        ...repo,
                        open_issues_count: repoDetails.open_issues_count || 0,
                    };
                })
            );

            return issues;
        },
        { revalidateOnFocus: false }
    );

    return {
        repositories: reposWithIssues,
        totalCount: repoData?.total_count,
        isLoading: !reposWithIssues && !repoError && !issuesError,
        isError: repoError || issuesError,
    };
};

export default useGithubRepositories;
