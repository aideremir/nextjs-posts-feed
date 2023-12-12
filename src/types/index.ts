export interface IPost {
  id: number;
  content: string;
  author: string;
  createdAt: Date;
}

export type TPostsPage = {
  data: IPost[];
  nextPage: number;
};
