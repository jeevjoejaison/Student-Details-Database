
/**
 * Authentication utilities for the student management system
 */

// Simple login function that checks credentials and stores userId in localStorage
export const login = (username: string, password: string): boolean => {
  // In a real app, this would be an API call
  // For now, we're using a simple check
  if (username === 'student1' && password === 'password123') {
    localStorage.setItem('userId', 'student-123');
    localStorage.setItem('userRole', 'student');
    localStorage.setItem('userName', 'John Doe');
    return true;
  }
  return false;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('userId');
};

// Get current user ID
export const getUserId = (): string | null => {
  return localStorage.getItem('userId');
};

// Get current user role
export const getUserRole = (): string | null => {
  return localStorage.getItem('userRole');
};

// Get current user name
export const getUserName = (): string | null => {
  return localStorage.getItem('userName');
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
};
