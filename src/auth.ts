import { reactive } from 'vue'
import type { User } from '@/types/user.type'

export interface AuthState {
  loggedIn: boolean
  userId: string | null
  username: string | null
}

export const authState = reactive<AuthState>({
  loggedIn: !!localStorage.getItem('test-chat-user-id'),
  userId: localStorage.getItem('test-chat-user-id'),
  username: localStorage.getItem('test-chat-user-name')
})

export const auth = {
  login: (user: User) => {
    localStorage.setItem('test-chat-user-id', user.id)
    localStorage.setItem('test-chat-user-name', user.username)
    authState.loggedIn = true
    authState.userId = user.id
    authState.username = user.username
  },

  logout: () => {
    localStorage.removeItem('test-chat-user-id')
    localStorage.removeItem('test-chat-user-name')
    authState.loggedIn = false
    authState.userId = null
    authState.username = null
  }
}
