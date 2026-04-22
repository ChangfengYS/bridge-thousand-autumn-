<template>
  <slot v-if="!hasError" />
  <div v-else class="error-boundary">
    <div class="bg-pattern"></div>
    
    <div class="error-content">
      <div class="error-animation">
        <div class="bridge-broken">
          <div class="bridge-left">
            <div class="pillar"></div>
            <div class="deck"></div>
          </div>
          <div class="bridge-gap">
            <div class="crack-line"></div>
            <div class="crack-line delay-1"></div>
            <div class="crack-line delay-2"></div>
          </div>
          <div class="bridge-right">
            <div class="deck"></div>
            <div class="pillar"></div>
          </div>
        </div>
        <div class="floating-particles">
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
        </div>
      </div>
      
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
          <path d="M12 7v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="16" r="1" fill="currentColor"/>
        </svg>
      </div>
      
      <h3 class="error-title">页面加载出错</h3>
      <p class="error-message">{{ errorMessage }}</p>
      
      <div class="error-actions">
        <button class="retry-btn" @click="resetError">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.463 4.43301C7.27756 2.86067 9.59899 1.99666 12 2.00001C17.523 2.00001 22 6.47701 22 12C22 14.136 21.33 16.116 20.19 17.74L17 12H20C20.0001 10.4316 19.5392 8.89781 18.6747 7.58927C17.8101 6.28072 16.5799 5.25517 15.1372 4.64013C13.6944 4.0251 12.1027 3.84771 10.56 4.13019C9.0172 4.41267 7.59445 5.14238 6.474 6.22901L5.463 4.43301ZM18.537 19.567C16.7224 21.1394 14.401 22.0034 12 22C6.477 22 2 17.523 2 12C2 9.86401 2.67 7.88401 3.81 6.26001L7 12H4C3.99987 13.5684 4.46075 15.1022 5.32534 16.4108C6.18992 17.7193 7.42007 18.7449 8.86282 19.3599C10.3056 19.9749 11.8973 20.1523 13.44 19.8698C14.9828 19.5874 16.4055 18.8576 17.526 17.771L18.537 19.567Z" fill="currentColor"/>
          </svg>
          <span>重新加载</span>
        </button>
        <button class="home-btn" @click="goHome">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor"/>
          </svg>
          <span>返回首页</span>
        </button>
      </div>
      
      <div class="error-tips">
        <p class="tip-title">您可以尝试：</p>
        <ul class="tip-list">
          <li>刷新页面重新加载</li>
          <li>检查网络连接是否正常</li>
          <li>清除浏览器缓存后重试</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((error, instance, info) => {
  hasError.value = true
  errorMessage.value = error.message || '发生了未知错误'
  console.error('Error captured by ErrorBoundary:', error)
  console.error('Component:', instance)
  console.error('Info:', info)
  return false
})

const resetError = () => {
  hasError.value = false
  errorMessage.value = ''
}

const goHome = () => {
  hasError.value = false
  errorMessage.value = ''
  router.push('/')
}
</script>

<style lang="scss" scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  overflow: hidden;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(197, 61, 67, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%);
  pointer-events: none;
}

.error-content {
  text-align: center;
  max-width: 500px;
  position: relative;
  z-index: 1;
}

.error-animation {
  position: relative;
  width: 200px;
  height: 80px;
  margin: 0 auto 30px;
  
  .bridge-broken {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    gap: 20px;
  }
  
  .bridge-left, .bridge-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .pillar {
      width: 12px;
      height: 40px;
      background: linear-gradient(180deg, #6B4423 0%, #4A3520 100%);
      border-radius: 2px;
    }
    
    .deck {
      width: 60px;
      height: 8px;
      background: linear-gradient(180deg, #B8423A 0%, #8C2E28 100%);
      border-radius: 2px;
      margin-bottom: -2px;
      
      &::before {
        content: '';
        position: absolute;
        top: -4px;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(180deg, #C9A961 0%, #A68A3D 100%);
        border-radius: 2px 2px 0 0;
      }
    }
  }
  
  .bridge-left {
    animation: bridgeShake 2s ease-in-out infinite;
    
    .deck {
      transform-origin: right center;
      transform: rotate(8deg);
    }
  }
  
  .bridge-right {
    animation: bridgeShake 2s ease-in-out infinite 0.1s;
    
    .deck {
      transform-origin: left center;
      transform: rotate(-8deg);
    }
  }
  
  .bridge-gap {
    position: relative;
    width: 20px;
    height: 50px;
    
    .crack-line {
      position: absolute;
      width: 2px;
      height: 20px;
      background: linear-gradient(180deg, rgba(197, 61, 67, 0.8), transparent);
      left: 50%;
      transform: translateX(-50%);
      animation: crackGlow 1.5s ease-in-out infinite;
      
      &.delay-1 {
        animation-delay: 0.3s;
        height: 15px;
        left: 30%;
      }
      
      &.delay-2 {
        animation-delay: 0.6s;
        height: 12px;
        left: 70%;
      }
    }
  }
  
  .floating-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(212, 175, 55, 0.6);
      border-radius: 50%;
      animation: particleFloat 3s ease-in-out infinite;
      
      &:nth-child(1) { left: 20%; animation-delay: 0s; }
      &:nth-child(2) { left: 40%; animation-delay: 0.5s; }
      &:nth-child(3) { left: 50%; animation-delay: 1s; }
      &:nth-child(4) { left: 60%; animation-delay: 1.5s; }
      &:nth-child(5) { left: 80%; animation-delay: 2s; }
    }
  }
}

@keyframes bridgeShake {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-3px); }
  75% { transform: translateY(3px); }
}

@keyframes crackGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    transform: translateY(-20px) scale(1.5);
    opacity: 1;
  }
}

.error-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 24px;
  color: #B8423A;
  animation: iconPulse 2s ease-in-out infinite;
  
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 15px rgba(197, 61, 67, 0.5));
  }
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.error-title {
  font-size: 28px;
  font-weight: 600;
  font-family: 'Noto Serif SC', serif;
  color: #E8E4D8;
  margin-bottom: 12px;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(232, 228, 216, 0.3);
}

.error-message {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  line-height: 1.8;
  padding: 12px 20px;
  background: rgba(197, 61, 67, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(197, 61, 67, 0.2);
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 30px;
}

.retry-btn,
.home-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  
  svg {
    width: 20px;
    height: 20px;
  }
}

.retry-btn {
  background: linear-gradient(135deg, rgba(91, 140, 133, 0.6) 0%, rgba(91, 140, 133, 0.4) 100%);
  border: 1px solid rgba(201, 169, 97, 0.4);
  color: #E8E4D8;
  box-shadow: 0 4px 15px rgba(91, 140, 133, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, rgba(91, 140, 133, 0.8) 0%, rgba(91, 140, 133, 0.5) 100%);
    border-color: #C9A961;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(91, 140, 133, 0.3);
  }
}

.home-btn {
  background: linear-gradient(135deg, #B8423A 0%, #8C2E28 100%);
  border: 1px solid rgba(197, 61, 67, 0.5);
  color: white;
  box-shadow: 0 4px 15px rgba(197, 61, 67, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #C53D43 0%, #B8423A 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(197, 61, 67, 0.4);
  }
}

.error-tips {
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  
  .tip-title {
    font-size: 13px;
    color: rgba(201, 169, 97, 0.8);
    margin: 0 0 12px 0;
    font-weight: 500;
  }
  
  .tip-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
      padding: 6px 0;
      position: relative;
      padding-left: 16px;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        background: rgba(201, 169, 97, 0.5);
        border-radius: 50%;
      }
    }
  }
}

@media (max-width: 768px) {
  .error-boundary {
    padding: 30px 15px;
  }
  
  .error-animation {
    width: 150px;
    height: 60px;
  }
  
  .error-title {
    font-size: 22px;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
    
    .retry-btn, .home-btn {
      width: 180px;
      justify-content: center;
    }
  }
}
</style>
