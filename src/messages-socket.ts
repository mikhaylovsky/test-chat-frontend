import { ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import Api from '@/api'
import type { Message, EventMessage } from '@/types/message.type'

class MessagesSocket {
  private readonly userId: string

  private socket?: Socket

  public connected = ref<boolean>(false)

  public messages = ref<Message[]>([])

  public onlineUsers = ref<number>(0)

  constructor(userId: string) {
    this.userId = userId
    this.socket = undefined
  }

  public connect(): void {
    if (this.socket || this.connected.value) {
      return
    }

    this.socket = io(import.meta.env.VITE_BACKEND_APP_URL, {
      auth: {
        userId: this.userId
      }
    })

    this.listen()
  }

  private listen() {
    if (!this.socket) {
      return
    }

    this.socket.on('connect', async (): Promise<void> => {
      this.connected.value = true
      const lastMessages: Message[] = await Api.fetchLastMessages(10)
      this.messages.value = [...this.messages.value, ...lastMessages]
    })

    this.socket.on('disconnect', (): void => {
      this.connected.value = false
    })

    this.socket.on('message-added', (data: Message): void => {
      this.messages.value.push(data)
    })

    this.socket.on('client-connected', (data: EventMessage): void => {
      const message: Message = {
        id: data.id,
        text: `${data.user.username} enters the chat`,
        user: data.user,
        type: 'event',
        createdAt: data.createdAt
      }

      this.messages.value.push(message)

      this.onlineUsers.value = data.onlineUsers
    })

    this.socket.on('client-disconnected', (data: EventMessage): void => {
      const message: Message = {
        id: data.id,
        text: `${data.user.username} enters the chat`,
        user: data.user,
        type: 'event',
        createdAt: data.createdAt
      }

      this.messages.value.push(message)

      this.onlineUsers.value = data.onlineUsers
    })
  }

  public emit(event: string, payload: any) {
    return this.socket?.emit(event, payload)
  }
}

export default MessagesSocket
