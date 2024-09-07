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

interface Contributor {
    login: string;
    avatar_url: string;
    contributions: number;
}

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

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
    const { data: repoData, error: repoError } = useSWR<{ items: Repository[]; total_count: number }>(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
        fetcher
    );

    const { data: reposWithIssuesAndContributors, error: detailsError } = useSWR<(Repository & { contributors: Contributor[] })[]>(
        repoData ? `/api/reposWithDetails?repos=${repoData.items.map(repo => repo.full_name).join(',')}` : null,
        async () => {
            if (!repoData) return [];

            const reposWithDetails = await Promise.all(
                repoData.items.map(async (repo) => {
                    const [repoDetails, contributors] = await Promise.all([
                        fetcher(`https://api.github.com/repos/${repo.full_name}`),
                        fetcher(`https://api.github.com/repos/${repo.full_name}/contributors?per_page=5`)
                    ]);

                    return {
                        ...repo,
                        open_issues_count: repoDetails.open_issues_count || 0,
                        contributors: contributors.slice(0, 5)
                    };
                })
            );

            return reposWithDetails;
        },
        { revalidateOnFocus: false }
    );

    return {
        repositories: reposWithIssuesAndContributors,
        totalCount: repoData?.total_count,
        isLoading: !reposWithIssuesAndContributors && !repoError && !detailsError,
        isError: repoError || detailsError,
    };
};

export default useGithubRepositories;