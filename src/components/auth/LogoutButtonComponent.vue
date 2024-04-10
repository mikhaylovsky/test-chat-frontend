<script setup lang="ts">
import { auth, authState } from '@/auth'
import { AuthMode, changeAuthMode } from '@/components/auth/useAuth'

const logout = () => {
  changeAuthMode(AuthMode.SIGN_IN)
  auth.logout()
}
</script>

<template>
  <div v-if="authState.loggedIn" class="logout">
    <button @click="logout()" class="gray">Log out</button>
  </div>
</template>
