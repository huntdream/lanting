import { IArticle } from './article'
import { IUser } from './user'

export interface IComment {
  id: number,
  articleId: number
  text: string
  replier: IUser
  interlocutorId: number
  interlocutor: IUser
  createdAt: string
  article: IArticle
}

export type IComments = Data<IComment>;