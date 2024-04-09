import { reactive } from 'vue'

export const authState = reactive({
  loggedIn: !!localStorage.getItem('chat-user'),
  username: localStorage.getItem('chat-user')
})

export interface User {
  id: number;
  username: string;
}

export const auth = {
  login: (user: User) => {
    localStorage.setItem('chat-user', user.username)
    authState.loggedIn = true
    authState.username = user.username
  },

  logout: () => {
    localStorage.removeItem('chat-user')
    authState.loggedIn = false
    authState.username = null
  }
}
