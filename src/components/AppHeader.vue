<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import { Button } from '@/components/ui/button'

// Состояние текущей темы
const isDarkMode = ref(false)

// Инициализация темы
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  isDarkMode.value = savedTheme === 'dark'

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Переключение темы
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  const newTheme = isDarkMode.value ? 'dark' : 'light'

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  localStorage.setItem('theme', newTheme)
}

onMounted(() => {
  initializeTheme()
})
</script>

<template>
  <div class="py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <router-link to="/"><LogoIcon class="h-8" /></router-link>
        <AppNavbar />
      </div>
      <!-- Переключатель темы -->
      <Button @click="toggleTheme">
        {{ isDarkMode ? '🌙 ' : '☀️ ' }}
      </Button>
    </div>
  </div>
</template>
