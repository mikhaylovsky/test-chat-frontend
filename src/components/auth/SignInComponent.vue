<script lang="ts" setup>
import { auth } from '@/auth'
import {
  authError,
  setAuthError,
  username,
  fillUsernameInput,
  AuthMode,
  changeAuthMode
} from './useAuth'
import { ref } from 'vue'
import Api from '@/api'
import type { User } from '@/types/user.type'

const loading = ref<boolean>(false)

const signIn = async () => {
  if (!username.value) {
    return
  }

  loading.value = true

  try {
    const user: User = await Api.signIn(username.value)

    if (user) {
      auth.login(user)
    }
  } catch (error: any) {
    setAuthError(error.message ?? 'Some error occurred, please try again later')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-component sign-in">
    <div class="heading mb-2">
      <h1>Sign In</h1>
      <div v-if="loading" class="lds-dual-ring"></div>
    </div>

    <div class="error" v-if="authError">{{ authError }}</div>
    <div class="form">
      <input
        type="text"
        @input="fillUsernameInput"
        @keyup.enter="signIn()"
        placeholder="Enter your name..."
        autofocus
      />
      <button @click="signIn()" class="green" :class="{ loading }" :disabled="!username || loading">
        Sign In
      </button>
    </div>
    <p class="action">
      Have no account?
      <a href="javascript:void(0)" @click="changeAuthMode(AuthMode.SIGN_UP)">Sign Up</a>
    </p>
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  justify-content: start;
  place-items: center;
}
.heading h1 {
  margin-right: 1rem;
}
.form {
  text-align: center;
  margin-bottom: 1rem;
}
.action {
  margin: 0.5rem 0;
}
</style>
