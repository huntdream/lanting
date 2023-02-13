import { IUser } from './user';

export interface IArticle {
  id: number;
  title: string;
  authorId: string;
  content: string;
  excerpt: string;
  createdAt?: string;
  canEdit: boolean;
  visibility: number;
  author: IUser;
}

export type IFeed = Data<IArticle>;
