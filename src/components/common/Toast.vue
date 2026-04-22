﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast-${toast.type}`]"
          @click="removeToast(toast.id)"
        >
          <div class="toast-icon">
            <component :is="getIcon(toast.type)" />
          </div>
          <div class="toast-content">
            <div class="toast-title" v-if="toast.title">{{ toast.title }}</div>
            <div class="toast-message">{{ toast.message }}</div>
          </div>
          <button class="toast-close" @click.stop="removeToast(toast.id)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div class="toast-progress" :style="{ animationDuration: `${toast.duration}ms` }"></div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { h } from 'vue'
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()

const getIcon = (type) => {
  const icons = {
    success: {
      render() {
        return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
          h('circle', { cx: 12, cy: 12, r: 10, stroke: 'currentColor', 'stroke-width': 2 }),
          h('path', { d: 'M8 12l3 3 5-6', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
        ])
      }
    },
    error: {
      render() {
        return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
          h('circle', { cx: 12, cy: 12, r: 10, stroke: 'currentColor', 'stroke-width': 2 }),
          h('circle', { cx: 12, cy: 12, r: 3, fill: 'currentColor' })
        ])
      }
    },
    warning: {
      render() {
        return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
          h('path', { d: 'M12 2L2 22h20L12 2z', stroke: 'currentColor', 'stroke-width': 2 }),
          h('path', { d: 'M12 9v4', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
          h('circle', { cx: 12, cy: 17, r: 1, fill: 'currentColor' })
        ])
      }
    },
    info: {
      render() {
        return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
          h('circle', { cx: 12, cy: 12, r: 10, stroke: 'currentColor', 'stroke-width': 2 }),
          h('path', { d: 'M12 16v-4', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
          h('circle', { cx: 12, cy: 8, r: 1, fill: 'currentColor' })
        ])
      }
    }
  }
  return icons[type] || icons.info
}
</script>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.toast {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 320px;
  max-width: 480px;
  padding: 16px 20px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
  cursor: pointer;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
  }
  
  &.toast-success {
    border: 1px solid rgba(76, 175, 80, 0.3);
    
    &::before {
      background: linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%);
    }
    
    .toast-icon {
      color: #4CAF50;
    }
  }
  
  &.toast-error {
    border: 1px solid rgba(197, 61, 67, 0.3);
    
    &::before {
      background: linear-gradient(180deg, #B8423A 0%, #8B0000 100%);
    }
    
    .toast-icon {
      color: #B8423A;
    }
  }
  
  &.toast-warning {
    border: 1px solid rgba(255, 152, 0, 0.3);
    
    &::before {
      background: linear-gradient(180deg, #FF9800 0%, #E65100 100%);
    }
    
    .toast-icon {
      color: #FF9800;
    }
  }
  
  &.toast-info {
    border: 1px solid rgba(212, 175, 55, 0.3);
    
    &::before {
      background: linear-gradient(180deg, #C9A961 0%, #A68A3D 100%);
    }
    
    .toast-icon {
      color: #C9A961;
    }
  }
}

.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: 14px;
  font-weight: 600;
  color: #E8E4D8;
  margin-bottom: 4px;
}

.toast-message {
  font-size: 13px;
  color: rgba(232, 228, 216, 0.8);
  line-height: 1.5;
  word-wrap: break-word;
}

.toast-close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: rgba(232, 228, 216, 0.5);
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #E8E4D8;
  }
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(212, 175, 55, 0.8) 0%, rgba(197, 61, 67, 0.8) 100%);
  animation: progress linear forwards;
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

@media screen and (max-width: 768px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
  }
  
  .toast {
    min-width: auto;
    max-width: none;
  }
}
</style>
