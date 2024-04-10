<script setup lang="ts">
import { authState } from '@/auth'
import LogoutButtonComponent from '@/components/auth/LogoutButtonComponent.vue'
</script>

<template>
  <div class="header">
    <div class="welcome">
      <p v-if="authState.loggedIn">Welcome, {{ authState.username }}!</p>
      <p v-else>Welcome to the chat! Please, register or log in!</p>
    </div>
    <LogoutButtonComponent />
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
