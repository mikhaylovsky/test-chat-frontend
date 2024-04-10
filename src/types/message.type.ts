import type { User } from '@/types/user.type'

export type Message = {
  id: string
  user: User
  text: string
  type?: string
  createdAt: Date
}

export type EventMessage = {
  id: string
  user: User
  type: string
  createdAt: Date
  onlineUsers: number
}
