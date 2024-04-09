import { reactive } from 'vue'
import { io } from 'socket.io-client'

interface Message {
  id: string
  user: string
  message: string
  date: Date
}

interface SocketState {
  connected: boolean
  messages: Message[]
}

export const state = reactive<SocketState>({
  connected: false,
  messages: []
})

export const socket = io(import.meta.env.VITE_BACKEND_APP_URL, {
  autoConnect: false
})

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('test-socket-receive', (data: Message) => {
  state.messages.push(data)
})
