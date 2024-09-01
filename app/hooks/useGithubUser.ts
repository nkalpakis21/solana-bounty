import { useState, useEffect } from 'react';

export const useGitHubUser = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/github/user');

                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub user data');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error: any) {
                // TODO determine type for error
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { userData, loading, error };
};
