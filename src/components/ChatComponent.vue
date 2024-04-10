<script lang="ts" setup>
import MessagesSocket from '@/messages-socket'
import { ref, watch } from 'vue'
import { authState } from '@/auth'

const socket = new MessagesSocket(authState.userId!)
socket.connect()

const messageText = ref<string | null>(null)
const messageBox = ref<HTMLElement>()

watch(
  socket.messages,
  () => {
    setTimeout(() => {
      if (!messageBox.value) {
        return
      }

      messageBox.value.scrollTo({
        top: messageBox.value.scrollHeight,
        behavior: 'smooth'
      })
    }, 0)
  },
  { deep: true }
)

const connect = () => socket.connect()
const send = () => {
  if (!messageText.value) {
    return
  }

  socket.emit('message-sent', {
    userId: authState.userId,
    text: messageText.value
  })

  messageText.value = null
}

const fillMessage = (event: Event) => {
  if (event && event.target) {
    const inputTarget = event.target as HTMLInputElement
    messageText.value = inputTarget.value
  }
}
</script>

<template>
  <div class="chat-box">
    <div class="header">
      <div v-if="socket.connected.value" class="connection-state connected">
        <p>Connected to chat. Users online: {{ socket.onlineUsers.value }}</p>
      </div>
      <div v-else class="connection-state disconnected">
        <p class="error">An error occurred, please try to connect manually</p>
        <button class="connection-button connect" @click="connect()">Connect</button>
      </div>
    </div>
    <div class="message-box" ref="messageBox">
      <div v-for="message in socket.messages.value" :key="message.id" class="message-box-message">
        <div v-if="message.type && message.type === 'event'" class="event-message">
          {{ message.text }}
        </div>
        <div
          v-else
          class="message-content"
          :class="{ 'own-message': message.user.id === authState.userId }"
        >
          <p class="message-author">
            {{ message.user.username }} at {{ new Date(message.createdAt).toLocaleTimeString() }}
          </p>
          <p class="message-text">{{ message.text }}</p>
        </div>
      </div>
    </div>
    <div class="input-box">
      <textarea
        :value="messageText"
        @input="fillMessage"
        @keydown.enter="(event) => event.preventDefault()"
        @keyup.enter="send()"
        placeholder="Enter your message..."
        autofocus
      />
      <button :disabled="!messageText || !socket.connected.value" @click="send()">send</button>
    </div>
  </div>
</template>

<style scoped>
.chat-box {
  width: 100%;
  max-width: 100rem;
  background: #3e3e3e;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-self: normal;
  max-height: calc(100vh - 10rem);
  padding-bottom: 1rem;
}

.chat-box .header .connection-state {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  place-items: center;
}

.chat-box .message-box {
  padding: 1rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.chat-box .header .connection-state .connection-button {
  background: transparent;
  color: #fff;
  outline: none;
  border: none;
  padding: 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bolder;
  border-radius: 0.3rem;
}

.chat-box .header .connection-state .connection-button.connect {
  background: #3480c7;
}

.chat-box .message-box .message-box-message {
  margin-bottom: 1rem;
}

.chat-box .message-box .event-message {
  font-size: 0.75rem;
}

.chat-box .message-box .message-content {
  padding: 0.5rem;
  background: var(--color-background);
  display: inline-block;
  border-radius: 0.5rem;
}

.chat-box .message-box .message-content.own-message {
  background: #3480c7;
}

.chat-box .message-box .message-box-message .message-author {
  font-size: 0.75rem;
}

.chat-box .input-box {
  position: relative;
  height: 4rem;
}

.chat-box .input-box textarea {
  width: 100%;
  padding: 0.5rem 6.5rem 0.5rem 2rem;
  background: transparent;
  border: none;
  outline: none;
  height: 4rem;
  color: #ccc;
  resize: none !important;
  line-height: 3rem;
}

.chat-box .input-box textarea::placeholder {
  line-height: 3rem;
}

.chat-box .input-box button {
  position: absolute;
  height: 3rem;
  padding: 1rem 1.5rem;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: #00b300;
}

.chat-box .input-box button:disabled {
  background: #ccc;
}
</style>
