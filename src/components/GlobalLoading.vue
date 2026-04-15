﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isLoading" class="global-loading-overlay">
        <div class="loading-content">
          <div class="loading-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="bridge-icon">
              <svg viewBox="0 0 100 100" fill="none">
                <path 
                  d="M10 70 Q 30 30, 50 30 Q 70 30, 90 70" 
                  stroke="currentColor" 
                  stroke-width="3"
                  fill="none"
                />
                <path 
                  d="M10 70 L 90 70" 
                  stroke="currentColor" 
                  stroke-width="2"
                />
                <path 
                  d="M20 70 L 20 85 M40 70 L 40 85 M60 70 L 60 85 M80 70 L 80 85" 
                  stroke="currentColor" 
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
          <div class="loading-text">{{ loadingText }}</div>
          <div v-if="showProgress" class="loading-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${loadingProgress}%` }"></div>
            </div>
            <div class="progress-text">{{ loadingProgress }}%</div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useLoading } from '@/composables/useLoading'

const { isLoading, loadingText, loadingProgress, showProgress } = useLoading()
</script>

<style scoped lang="scss">
.global-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.loading-spinner {
  position: relative;
  width: 120px;
  height: 120px;
  
  .spinner-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid transparent;
    
    &:nth-child(1) {
      border-top-color: #C9A961;
      animation: spin 1.5s linear infinite;
    }
    
    &:nth-child(2) {
      border-right-color: #B8423A;
      animation: spin 2s linear infinite reverse;
    }
    
    &:nth-child(3) {
      border-bottom-color: #5B8C85;
      animation: spin 2.5s linear infinite;
    }
  }
  
  .bridge-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    color: #C9A961;
    animation: pulse 2s ease-in-out infinite;
    
    svg {
      width: 100%;
      height: 100%;
    }
  }
}

.loading-text {
  font-size: 16px;
  font-weight: 500;
  color: #E8E4D8;
  letter-spacing: 2px;
  animation: fadeInOut 2s ease-in-out infinite;
}

.loading-progress {
  width: 200px;
  
  .progress-bar {
    height: 4px;
    background: rgba(212, 175, 55, 0.2);
    border-radius: 2px;
    overflow: hidden;
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #C9A961 0%, #B8423A 100%);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }
  
  .progress-text {
    text-align: center;
    font-size: 12px;
    color: rgba(232, 228, 216, 0.6);
    margin-top: 8px;
    font-family: 'DIN Alternate', monospace;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(0.9);
  }
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
