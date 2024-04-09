<script setup lang="ts">
import { auth, authState } from '@/auth'

const logout = () => auth.logout()
</script>

<template>
  <div class="header">
    <div class="welcome">
      <p v-if="authState.loggedIn">Welcome, {{ authState.username }}!</p>
      <p v-else>Welcome to the chat! Please, register or log in!</p>
    </div>
    <div v-if="authState.loggedIn" class="logout">
      <button @click="logout()">Log out</button>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 2rem;
  background: #750000;
  display: flex;
  justify-content: space-between;
  place-items: center;
}
</style>
