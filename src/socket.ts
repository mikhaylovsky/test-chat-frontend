import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  connectionEvents: [],
  disconnectionEvents: [],
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

socket.on('test-socket-receive', (data) => {
  console.log('RECEIVED', data)
  state.messages.push(data)
})
