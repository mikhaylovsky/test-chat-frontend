<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import ChatComponent from '@/components/ChatComponent.vue'
import AuthComponent from '@/components/AuthComponent.vue'
import { authState } from '@/auth'
</script>

<template>
  <main>
    <HeaderComponent />

    <section class="main-section">
      <ChatComponent v-if="authState.loggedIn" />
      <AuthComponent v-else />
    </section>
  </main>
</template>
