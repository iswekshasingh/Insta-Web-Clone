export const USERS = [
  { id: 1, username: 'doggo.lover', avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150', note: 'Walk time! 🐾' },
  { id: 2, username: 'nature.scapes', avatar: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150', note: 'Feeling fresh 🍃' },
  { id: 3, username: 'tech.guru', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150', note: 'Coding late ☕' },
  { id: 4, username: 'foodie_adventures', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 5, username: 'travel_bug', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150', note: 'Wanderlust ✨' },
  { id: 6, username: 'art.vibes', avatar: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=150', note: 'New piece! 🎨' },
  { id: 7, username: 'fitness.freak', avatar: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=150' },
  { id: 8, username: 'bookworm_99', avatar: 'https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?w=150', note: 'Chapter 1 📖' },
  { id: 9, username: 'music.junkie', avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150', note: 'New beat 🎧' },
  { id: 10, username: 'photography_hub', avatar: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150', note: 'Golden hour 🌅' },
];

export const STORIES = USERS.map(user => ({
  ...user,
  viewed: false
}));

export const POSTS = [
  {
    id: 1,
    user: USERS[0],
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
    caption: 'Best friend forever! 🐾 #dogs #love',
    likes: 124,
    comments: 12,
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    user: USERS[1],
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800',
    caption: 'Morning hikes clears the mind. 🌲⛰️',
    likes: 856,
    comments: 45,
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    user: USERS[3],
    image: 'https://images.unsplash.com/photo-1498837167922-41c46b3af320?w=800',
    caption: 'Homemade pasta from scratch! 🍝',
    likes: 342,
    comments: 28,
    timestamp: '8 hours ago'
  }
];

export const SUGGESTIONS = USERS.slice(1, 4);

export const CURRENT_USER_PROFILE = {
  username: 'sweksha_codes',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  bio: 'Frontend Developer 💻\nReact Enthusiast 🚀\nBuilding cool things on the web ✨',
  followers: 1245,
  following: 850,
  postsCount: 12,
  posts: [
    { id: 1, image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800', likes: 120, comments: 14 },
    { id: 2, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', likes: 89, comments: 5 },
    { id: 3, image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800', likes: 230, comments: 34 },
    { id: 4, image: 'https://images.unsplash.com/photo-1618477247222-acbad0ea449a?w=800', likes: 56, comments: 2 },
    { id: 5, image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800', likes: 412, comments: 67 },
    { id: 6, image: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=800', likes: 110, comments: 9 }
  ]
};
