// src/services/authService.js

const USERS_KEY = 'insta_clone_users';
const CURRENT_USER_KEY = 'insta_clone_current_user';

export const authService = {
  // Helper to fetch all users from localStorage
  getUsers: () => {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  },

  // Helper to fetch the currently logged-in user
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
  },

  // Signup functionality
  signup: (email, password) => {
    const users = authService.getUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create a new user object
    const newUser = { id: Date.now().toString(), email, password };
    users.push(newUser);
    
    // Update local storage
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return newUser;
  },

  // Login functionality
  login: (email, password) => {
    const users = authService.getUsers();
    
    // Verify credentials
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Omit password before storing the active session user
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  // Logout functionality
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
