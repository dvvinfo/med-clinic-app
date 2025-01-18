<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class=" container mx-auto">
    <AppHeader/>
  <RouterView />
</div>
</template>

<style scoped></style>
