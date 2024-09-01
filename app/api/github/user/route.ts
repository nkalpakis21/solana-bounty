import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');

  // Ensure we have the token from the cookie
  const userData = userCookie ? JSON.parse(userCookie.value) : null;
  const token = userData?.token;

  if (!token) {
    return NextResponse.redirect('/login');
  }

  try {
    // Prepare headers for GitHub API requests
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    // Fetch user data and other information in parallel
    const [userResponse, reposResponse, orgsResponse, eventsResponse] = await Promise.all([
      fetch('https://api.github.com/user', { headers }),
      fetch('https://api.github.com/user/repos', { headers }),
      fetch('https://api.github.com/users/nkalpakis21/orgs', { headers }),
      fetch('https://api.github.com/users/nkalpakis21/events/public', { headers }),
      // fetch('https://api.github.com/issues?filter=all', { headers }), // Fetch user issues (PRs included)
    ]);

    // Check if all responses are OK
    if (!userResponse.ok || !reposResponse.ok || !orgsResponse.ok || !eventsResponse.ok) {
      throw new Error('Failed to fetch data from GitHub');
    }

    // Parse the JSON responses
    const [userData, reposData, orgsData, eventsData] = await Promise.all([
      userResponse.json(),
      reposResponse.json(),
      orgsResponse.json(),
      eventsResponse.json(),
    ]);

    return NextResponse.json({
      user: userData,
      // repos: reposData,
      orgs: orgsData,
      events: eventsData,
    });
  } catch (error: any) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
