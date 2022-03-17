export interface IArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  createdAt?: string;
}

export type IFeed = Data<IArticle>;
