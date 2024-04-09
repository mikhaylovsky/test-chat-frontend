<script setup lang="ts">
import { SignedIn, useUser } from 'vue-clerk'
import HeaderComponent from '../components/HeaderComponent.vue'
import router from '@/router'
import { watch } from 'vue'

const { isSignedIn } = useUser()

watch(isSignedIn, (value) => {
  if (!value) {
    router.replace('sign-in')
  }
})
</script>

<template>
  <main>
    <SignedIn>
      <HeaderComponent />
    </SignedIn>
  </main>
</template>
