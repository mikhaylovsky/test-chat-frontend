<script setup lang="ts">
import { UserButton, useUser } from 'vue-clerk'

const { user } = useUser()
</script>

<template>
  <div class="header">
    <div class="welcome">
      <p>Welcome, {{ user.username }}!</p>
    </div>
    <UserButton afterSignOutUrl="/sign-in" />
  </div>
</template>

<style scoped>
.header {
  padding: 2rem;
  background: #750000;
  display: flex;
  justify-content: space-between;
  place-items: center;
  -webkit-box-shadow: 0 8px 16px -4px #750000;
  -moz-box-shadow: 0 8px 16px -4px #750000;
  box-shadow: 0 8px 16px -4px #750000;
}
</style>
