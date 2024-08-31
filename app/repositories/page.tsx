'use client';

import React, { useState } from 'react';
import useGithubRepositories from '../hooks/useGithubRepositories';

const RepositoriesPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const perPage = 30;
    const { repositories, totalCount, isLoading, isError } = useGithubRepositories('open source', page, perPage);

    if (isLoading) return <div className='text-center text-lg text-gray-400'>Loading...</div>;
    if (isError) return <div className='text-center text-lg text-red-500'>Error loading repositories.</div>;

    const totalPages = Math.ceil((totalCount || 0) / perPage);

    return (
        <div className='max-w-4xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-lg shadow-lg'>
            <h1 className='text-4xl font-bold mb-6'>Top Open Source Repositories</h1>
            <ul className='space-y-6'>
                {repositories?.map(repo => (
                    <li key={repo.id} className='bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                        <a href={repo.html_url} className='text-blue-400 hover:underline' target='_blank' rel='noopener noreferrer'>
                            <h2 className='text-2xl font-semibold'>{repo.name}</h2>
                        </a>
                        <p className='mt-2'>{repo.description || 'No description available.'}</p>
                        <div className='mt-2 flex items-center text-gray-400'>
                            <svg className='w-5 h-5 text-yellow-400 mr-1' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/>
                            </svg>
                            <span>{repo.stargazers_count}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='mt-6 flex justify-between'>
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className='px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 disabled:bg-gray-700'
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className='px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 disabled:bg-gray-700'
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RepositoriesPage;
