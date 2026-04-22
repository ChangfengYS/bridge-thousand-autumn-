﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="app-container">
    <ErrorBoundary>
      <router-view v-slot="{ Component }">
        <transition name="page-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </ErrorBoundary>
    <Toast />
    <GlobalLoading />
    <BackToTop />
    <ShortcutHelp v-model:visible="showShortcutHelp" />
  </div>
</template>

<script setup>
import Toast from '@/components/common/Toast.vue'
import GlobalLoading from '@/components/common/GlobalLoading.vue'
import ErrorBoundary from '@/components/common/ErrorBoundary.vue'
import BackToTop from '@/components/common/BackToTop.vue'
import ShortcutHelp from '@/components/business/ShortcutHelp.vue'
import { useKeyboard } from '@/composables/useKeyboard'
import { useHistoryTracker } from '@/composables/useHistory'
import { onMounted, onUnmounted, ref } from 'vue'

useKeyboard()
useHistoryTracker()

const showShortcutHelp = ref(false)

const handleGlobalError = (event) => {
  console.error('Global error:', event.error)
}

const handleUnhandledRejection = (event) => {
  console.error('Unhandled promise rejection:', event.reason)
}

const handleShortcutKey = (e) => {
  if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
    const activeElement = document.activeElement
    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
      return
    }
    showShortcutHelp.value = !showShortcutHelp.value
  }
}

onMounted(() => {
  window.addEventListener('error', handleGlobalError)
  window.addEventListener('unhandledrejection', handleUnhandledRejection)
  window.addEventListener('keydown', handleShortcutKey)
})

onUnmounted(() => {
  window.removeEventListener('error', handleGlobalError)
  window.removeEventListener('unhandledrejection', handleUnhandledRejection)
  window.removeEventListener('keydown', handleShortcutKey)
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
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 30%, #1F1F1F 50%, #1A1A1A 70%, #0D0D0D 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at 20% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(197, 61, 67, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(91, 140, 133, 0.02) 0%, transparent 60%);
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

.page-fade-enter-active {
  animation: page-fade-in 0.25s ease-out;
}

.page-fade-leave-active {
  animation: page-fade-out 0.25s ease-in;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

@keyframes page-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes page-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
