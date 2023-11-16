import { IArticle } from './article'
import { IUser } from './user'

export interface IComment {
  id: number,
  articleId: number
  text: string
  replierId: number
  parentId: number
  replier: IUser
  interlocutorId: number
  interlocutor: IUser
  createdAt: string
  article: IArticle
  canDelete: boolean
  comments: IComment[]
}

export type IComments = Data<IComment>;