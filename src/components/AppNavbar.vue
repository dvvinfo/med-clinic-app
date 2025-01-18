<script lang="ts" setup>
import { RouterLink } from 'vue-router'
const menuItems = [
  { title: 'Врачи', url: '/doctors' },
  { title: 'Медсестры', url: '/nurses' },
]
</script>

<template>
  <nav>
    <ul class="flex space-x-4">
      <li v-for="item in menuItems" :key="item.url">
        <router-link :to="item.url" class="hover:text-blue-500">{{ item.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style></style>
