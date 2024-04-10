<script setup lang="ts">
import { auth, authState } from '@/auth'

const logout = () => auth.logout()
</script>

<template>
  <div v-if="authState.loggedIn" class="logout">
    <button @click="logout()" class="gray">Log out</button>
  </div>
</template>
