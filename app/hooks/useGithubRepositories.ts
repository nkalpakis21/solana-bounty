'use client';

import useSWR from 'swr';
import { useState } from 'react';

interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
}

const GITHUB_TOKEN = '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';

const fetcher = async (url: string): Promise<{ items: Repository[]; total_count: number }> => {
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

    const data = await response.json();
    return data;  // Return the complete data object
};

const useGithubRepositories = (query: string, page: number = 1, perPage: number = 30) => {
    const { data, error } = useSWR<{ items: Repository[]; total_count: number }>(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
        fetcher
    );

    return {
        repositories: data?.items,
        totalCount: data?.total_count,
        isLoading: !error && !data,
        isError: error
    };
};

export default useGithubRepositories;
