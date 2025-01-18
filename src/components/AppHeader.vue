<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <div class="py-4">
    <div class="flex items-center space-x-4">
      <router-link to="/"><LogoIcon class="h-8" /></router-link>
      <AppNavbar />
    </div>
  </div>
</template>

<style></style>
