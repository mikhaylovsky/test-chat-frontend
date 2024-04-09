<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import ChatComponent from '@/components/ChatComponent.vue'
import SignInComponent from '@/components/SignInComponent.vue'
import { authState } from '@/auth'
</script>

<template>
  <main>
    <HeaderComponent />

    <ChatComponent v-if="authState.loggedIn" />
    <SignInComponent v-else />
  </main>
</template>
