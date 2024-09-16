export const logout = (): void => {
    // Clear the token from localStorage
  localStorage.removeItem('authToken');
  
    // Redirect to the login page
    window.location.href = '/auth/signin';
  };
  