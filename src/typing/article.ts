export interface IArticle {
  id: number;
  title: string;
  authorId: string;
  content: string;
  excerpt: string;
  createdAt?: string;
  canEdit: boolean;
  visibility: number;
}

export type IFeed = Data<IArticle>;
