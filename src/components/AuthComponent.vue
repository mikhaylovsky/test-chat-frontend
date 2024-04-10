<script setup lang="ts">
import SignInComponent from '@/components/auth/SignInComponent.vue'
import SignUpComponent from '@/components/auth/SignUpComponent.vue'
import { AuthMode, authMode } from '@/components/auth/useAuth'
</script>

<template>
  <div class="auth">
    <SignInComponent v-if="authMode === AuthMode.SIGN_IN" />
    <SignUpComponent v-else-if="authMode === AuthMode.SIGN_UP" />
  </div>
</template>

<style scoped></style>
