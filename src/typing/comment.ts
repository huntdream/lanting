import { IUser } from './user'

export interface IComment {
  id: number,
  articleId: number
  text: string
  replier: IUser
  interlocutorId: number
  interlocutor: IUser
  createdAt: string
}

export type IComments = Data<IComment>;