"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import useGithubRepositoryIssues from 'app/hooks/useGithubRepositoryIssues';
import RepositoryIssues from 'app/components/RepositoryIssues';




const RepositoryPage = () => {
  const { repoName, repoOwner }: {repoName: string, repoOwner: string} = useParams();
  const { repository, issues, isLoading, isError } = useGithubRepositoryIssues(repoName || '', repoOwner || '');

  return (
    <RepositoryIssues repo={repository} issues={issues} />
  );
};

export default RepositoryPage;
