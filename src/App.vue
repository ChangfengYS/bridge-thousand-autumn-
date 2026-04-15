﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="app-container">
    <ErrorBoundary>
      <router-view></router-view>
    </ErrorBoundary>
    <Toast />
    <GlobalLoading />
  </div>
</template>

<script setup>
import Toast from '@/components/Toast.vue'
import GlobalLoading from '@/components/GlobalLoading.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import { useKeyboard } from '@/composables/useKeyboard'
import { onMounted, onUnmounted } from 'vue'

useKeyboard()

const handleGlobalError = (event) => {
  console.error('Global error:', event.error)
}

const handleUnhandledRejection = (event) => {
  console.error('Unhandled promise rejection:', event.reason)
}

onMounted(() => {
  window.addEventListener('error', handleGlobalError)
  window.addEventListener('unhandledrejection', handleUnhandledRejection)
})

onUnmounted(() => {
  window.removeEventListener('error', handleGlobalError)
  window.removeEventListener('unhandledrejection', handleUnhandledRejection)
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}

.app-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  background-image: url("@/assets/image/background.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.6) 0%, rgba(45, 45, 45, 0.65) 50%, rgba(26, 26, 26, 0.6) 100%);
    pointer-events: none;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #C9A961 0%, #B8423A 100%);
  border-radius: 3px;
  
  &:hover {
    background: linear-gradient(180deg, #E8C547 0%, #D54D53 100%);
  }
}

::selection {
  background: rgba(212, 175, 55, 0.3);
  color: #fff;
}
</style>
