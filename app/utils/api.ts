export async function logoutUser(): Promise<void> {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error; // Rethrow the error to be handled by the caller if necessary
    }
  }
  