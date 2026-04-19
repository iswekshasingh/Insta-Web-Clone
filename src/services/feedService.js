const CAPTIONS = [
  "Enjoying the beautiful day! ☀️",
  "Living my best life right now.",
  "Coffee and code. ☕💻",
  "Nature is just so breathtaking. 🌲",
  "Weekends are for adventures! 🚗",
  "Chasing sunsets. 🌇"
];

const getRandomCaption = () => CAPTIONS[Math.floor(Math.random() * CAPTIONS.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const feedService = {
  fetchPosts: async (limit = 10, page = 1) => {
    try {
      // Fetch random images from another API (SlingAcademy Sample Photos)
      // We offset randomly to get "diff pictures" over time if needed, but here we just grab the limit limit=offset
      const randomOffset = getRandomInt(0, 50);
      const imgRes = await fetch(`https://api.slingacademy.com/v1/sample-data/photos?limit=${limit}&offset=${randomOffset}`);
      const imagesData = await imgRes.json();
      const images = imagesData.photos || [];

      // Fetch random users
      const usersRes = await fetch(`https://randomuser.me/api/?results=${limit}`);
      const usersData = await usersRes.json();
      const users = usersData.results;

      // Combine them into post objects
      const posts = images.map((img, index) => {
        const user = users[index];
        return {
          id: img.id.toString() + user.login.uuid,
          user: {
            username: user.login.username,
            avatar: user.picture.medium
          },
          image: img.url,
          caption: getRandomCaption(),
          likes: getRandomInt(10, 1000),
          comments: getRandomInt(0, 150),
          timestamp: `${getRandomInt(1, 23)} hours ago`
        };
      });

      return posts;
    } catch (error) {
      console.error("Error fetching feed:", error);
      return [];
    }
  }
};
