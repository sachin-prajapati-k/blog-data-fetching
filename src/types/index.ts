export interface IPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  posts?: IPost[];
}

export interface IComment {
  id: number;
  content: string;
  postId: number;
  author?: IUser;
  authorId: number;
  post?: IPost;
  createdAt: string;
}

export interface IParams {
  params: { id: string };
}
