<script lang="ts" setup>
import { socket, state } from '@/socket'
import { ref, watch } from 'vue'
import { useUser } from 'vue-clerk'

const { user } = useUser()

const messageText = ref(null)
const messageBox = ref(null)

watch(state.messages, () => {
  setTimeout(() => {
    messageBox.value.scrollTo({
      top: messageBox.value.scrollHeight,
      behavior: 'smooth'
    })
  }, 0)
})

const connect = () => socket.connect()
const disconnect = () => socket.disconnect()
const send = () => {
  if (!messageText.value) {
    return
  }

  socket.emit('test-socket-emit', { user: user.value.username, message: messageText.value })

  messageText.value = null
}
</script>

<template>
  <div class="wrapper">
    <div class="chat-box">
      <div class="header">
        <div v-if="state.connected" class="connection-state connected">
          <p>Connected to chat</p>
          <button class="connection-button disconnect" @click="disconnect()">Disconnect</button>
        </div>
        <div v-else class="connection-state disconnected">
          <p>Disconnected</p>
          <button class="connection-button connect" @click="connect()">Connect</button>
        </div>
      </div>
      <div class="message-box" ref="messageBox">
        <div v-for="message in state.messages" :key="message.id" class="message-box-message">
          <div class="message-content">
            <p class="message-author">{{ message.user }} at {{ message.date }}</p>
            <p class="message-text">{{ message.message }}</p>
          </div>
        </div>
      </div>
      <div class="input-box">
        <input
          type="text"
          :value="messageText"
          @input="(event) => (messageText = event.target.value)"
          @keyup.enter="send()"
          placeholder="Enter your message..."
          autofocus
        />
        <button :disabled="!messageText || !state.connected" @click="send()">send</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 15rem 1rem;
  display: flex;
  justify-content: center;
  height: calc(100vh - 6rem);
}
.chat-box {
  width: calc(100vw / 2);
  background: #3e3e3e;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}
.chat-box .header .connection-state {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  place-items: center;
}
.chat-box .message-box {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.connection-button {
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
.connection-button.connect {
  background: #3480c7;
}
.connection-button.disconnect {
  background: #750000;
}
.message-box .message-box-message {
  margin-bottom: 1rem;
}
.message-content {
  padding: 0.5rem;
  background: var(--color-background);
  display: inline-block;
  border-radius: 0.5rem;
}
.message-box-message .message-author {
  font-size: 0.75rem;
}
.input-box {
  position: relative;
  height: 3rem;
}
.input-box input {
  width: 100%;
  padding: 0 1rem;
  background: transparent;
  border: none;
  outline: none;
  height: 3rem;
  font-size: 1rem;
  color: #ccc;
}
.input-box button {
  position: absolute;
  height: 2rem;
  padding: 0 0.5rem;
  right: 1rem;
  top: 0.5rem;
  background: #00b300;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  color: #fff;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: bolder;
  cursor: pointer;
}
.input-box button:disabled {
  pointer-events: none;
  background: #ccc;
}
</style>
