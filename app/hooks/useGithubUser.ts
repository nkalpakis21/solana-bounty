import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useGitHubUser = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Use next/navigation for Next.js 13

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/github/user');

                if (!response.ok) {
                    console.error('Failed to fetch GitHub user data');
                    router.push('/login'); // Client-side navigation
                } else {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error: any) {
                console.error('Error fetching GitHub user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]); // Include router in the dependency array

    return { userData, loading, error };
};
