<script setup lang="ts">
import { SignUp } from 'vue-clerk'
</script>

<template>
  <main class="sign-up">
    <SignUp signInUrl="/sign-in" />
  </main>
</template>

<style scoped>
.sign-up {
  display: flex;
  min-height: 100vh;
  place-items: center;
  justify-content: center;
}
</style>
