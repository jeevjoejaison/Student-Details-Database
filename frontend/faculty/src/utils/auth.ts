
// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("userId") !== null;
};

// Get user ID from localStorage
export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};

// Set user ID in localStorage
export const setUserId = (userId: string): void => {
  localStorage.setItem("userId", userId);
};

// Clear user data from localStorage
export const clearUserData = (): void => {
  localStorage.removeItem("userId");
};

// Simple role extraction from our userId format (e.g., "student-123" => "student")
export const getUserRole = (): string | null => {
  const userId = getUserId();
  if (!userId) return null;
  
  return userId.split("-")[0];
};

// Check if user has a specific role
export const hasRole = (role: "student" | "faculty" | "admin"): boolean => {
  const userRole = getUserRole();
  return userRole === role;
};

