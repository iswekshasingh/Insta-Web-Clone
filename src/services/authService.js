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

  // Check if username is taken
  checkUsername: (username) => {
    const users = authService.getUsers();
    return users.some(u => u.username === username);
  },

  // Signup functionality
  signup: (email, password, username) => {
    const users = authService.getUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    if (username) {
      const existingUsername = users.find(u => u.username === username);
      if (existingUsername) {
        throw new Error('Username already taken');
      }
    }

    // Create a new user object
    const newUser = { 
      id: Date.now().toString(), 
      email, 
      password,
      username: username || email.split('@')[0],
      following: [],
      savedPosts: [],
      likedPosts: []
    };
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

    // Backfill username if missing (for users registered before this field was added)
    if (!userWithoutPassword.username) {
      userWithoutPassword.username = user.email.split('@')[0];
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  // Logout functionality
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Update Profile functionality
  updateProfile: (updatedData) => {
    const users = authService.getUsers();
    let currentUser = authService.getCurrentUser();
    
    if (!currentUser) throw new Error('No user logged in');

    // Check if new username is taken by another user
    if (updatedData.username && updatedData.username !== currentUser.username) {
      const usernameExists = users.some(u => u.username === updatedData.username && u.id !== currentUser.id);
      if (usernameExists) {
        throw new Error('Username already exists');
      }
    }

    // Update in USERS array
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        return { ...u, ...updatedData };
      }
      return u;
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    // Update in CURRENT_USER
    currentUser = { ...currentUser, ...updatedData };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    
    return currentUser;
  },

  // Interactive Actions
  toggleFollow: (targetUsername) => {
    let currentUser = authService.getCurrentUser();
    if (!currentUser) return;
    
    const following = currentUser.following || [];
    const isFollowing = following.includes(targetUsername);
    const updatedFollowing = isFollowing 
      ? following.filter(uname => uname !== targetUsername)
      : [...following, targetUsername];
      
    return authService.updateProfile({ following: updatedFollowing });
  },

  toggleSavePost: (post) => {
    let currentUser = authService.getCurrentUser();
    if (!currentUser) return;
    
    const savedPosts = currentUser.savedPosts || [];
    const isSaved = savedPosts.some(p => p.id === post.id);
    const updatedSaved = isSaved 
      ? savedPosts.filter(p => p.id !== post.id)
      : [...savedPosts, post];
      
    return authService.updateProfile({ savedPosts: updatedSaved });
  },

  toggleLikePost: (post) => {
    let currentUser = authService.getCurrentUser();
    if (!currentUser) return;
    
    const likedPosts = currentUser.likedPosts || [];
    const isLiked = likedPosts.some(p => typeof p === 'string' ? p === post.id : p.id === post.id);
    const updatedLiked = isLiked 
      ? likedPosts.filter(p => typeof p === 'string' ? p !== post.id : p.id !== post.id)
      : [...likedPosts, post];
      
    return authService.updateProfile({ likedPosts: updatedLiked });
  }
};
