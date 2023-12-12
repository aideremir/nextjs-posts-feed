import { faker } from "@faker-js/faker";
import { IPost, TPostsPage } from "@/types";

const posts: IPost[] = generateMockData(100);

const TIMEOUT = 1000;

function generateMockData(count: number): IPost[] {
  const mockData = [];
  for (let i = 1; i <= count; i++) {
    mockData.push({
      id: i,
      content: faker.lorem.paragraph(5),
      createdAt: faker.date.past(),
      author: faker.person.fullName(),
    });
  }
  return mockData.sort((a, b) => b.createdAt - a.createdAt);
}

function getPosts(
  page: number = 1,
  pageSize: number = 10,
): Promise<TPostsPage> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPosts = posts.slice(startIndex, endIndex);
      resolve({ nextPage: page + 1, data: [...paginatedPosts] });
    }, TIMEOUT);
  });
}

function addPost(newPost: IPost): Promise<IPost> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const id = posts.length + 1;
      const post = { id, ...newPost };
      posts.push(post);

      const random = Math.random();
      if (random > 0.5) {
        resolve({ ...post });
      } else {
        reject(new Error("Something went wrong. Please try again."));
      }
    }, TIMEOUT);
  });
}

function deletePost(postId: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = posts.findIndex((post) => post.id === postId);
      if (index !== -1) {
        posts.splice(index, 1);
      }
      resolve();
    }, TIMEOUT);
  });
}

export { getPosts, addPost, deletePost };
