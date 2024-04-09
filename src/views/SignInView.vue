<script setup lang="ts">
import { SignIn } from 'vue-clerk'
</script>

<template>
  <main class="sign-in">
    <SignIn signUpUrl="/sign-up" />
  </main>
</template>

<style scoped>
.sign-in {
  display: flex;
  min-height: 100vh;
  place-items: center;
  justify-content: center;
}
</style>
