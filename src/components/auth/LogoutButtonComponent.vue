<script setup lang="ts">
import { auth, authState } from '@/auth'
import { AuthMode, changeAuthMode } from '@/components/auth/useAuth'
import eventBus from '@/event-bus'

const logout = () => {
  eventBus.$emit('logout')
  changeAuthMode(AuthMode.SIGN_IN)
  auth.logout()
}
</script>

<template>
  <div v-if="authState.loggedIn" class="logout">
    <button @click="logout()" class="gray">Log out</button>
  </div>
</template>
