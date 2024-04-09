<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '@/auth'

enum AuthMode {
  SIGN_IN = 'signin',
  SIGNUP = 'signup'
}

const username = ref<string | null>(null)
const fillUsername = (event: Event) => {
  if (event && event.target) {
    const inputTarget = event.target as HTMLInputElement
    username.value = inputTarget.value
  }
}

const mode = ref<AuthMode>(AuthMode.SIGN_IN)
const changeMode = (value: AuthMode) => (mode.value = value)

const error = ref<string | null>(null)
const setError = (message: string) => {
  error.value = message
  setTimeout(() => (error.value = null), 5000)
}

const signIn = () => {
  if (!username.value) {
    return
  }

  fetch(`${import.meta.env.VITE_BACKEND_APP_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username.value })
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json()
        return setError(error.message)
      }

      const user = await response.json()

      if (user && user.username) {
        auth.login(user)
      }
    })
    .catch((error) => {
      console.log('catched an error')
      console.log(error.message)
    })
}

const signUp = () => {
  if (!username.value) {
    return
  }

  fetch(`${import.meta.env.VITE_BACKEND_APP_URL}/users/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username.value })
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json()
        return setError(error.message)
      }

      const user = await response.json()

      if (user && user.username) {
        auth.login(user)
      }
    })
    .catch((error) => {
      console.log('catched an error')
      console.log(error.message)
    })
}
</script>

<template>
  <div class="auth">
    <div v-if="mode === AuthMode.SIGN_IN" class="sign-in">
      <div class="error" v-if="error">{{ error }}</div>
      <input
        type="text"
        @input="fillUsername"
        @keyup.enter="signIn()"
        placeholder="Enter your name..."
        autofocus
      />
      <button @click="signIn()" :disabled="!username">Sign In</button>
      <p>Have no account? <a href="javascript:void(0)" @click="changeMode(AuthMode.SIGNUP)">Sign Up</a></p>
    </div>
    <div v-else-if="mode === AuthMode.SIGNUP" class="sign-up">
      <div class="error" v-if="error">{{ error }}</div>
      <input
        type="text"
        @input="fillUsername"
        @keyup.enter="signUp()"
        placeholder="Enter your name..."
        autofocus
      />
      <button @click="signUp()" :disabled="!username">Sign Up</button>
      <p>
        Already have an account?
        <a href="javascript:void(0)" @click="changeMode(AuthMode.SIGN_IN)">Sign in</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.sign-in {
  display: flex;
  place-items: center;
  justify-content: center;
}
</style>
