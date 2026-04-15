<template>
  <slot v-if="!hasError" />
  <div v-else class="error-boundary">
    <div class="error-content">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor"/>
        </svg>
      </div>
      <h3 class="error-title">页面加载出错</h3>
      <p class="error-message">{{ errorMessage }}</p>
      <div class="error-actions">
        <button class="retry-btn" @click="resetError">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.463 4.43301C7.27756 2.86067 9.59899 1.99666 12 2.00001C17.523 2.00001 22 6.47701 22 12C22 14.136 21.33 16.116 20.19 17.74L17 12H20C20.0001 10.4316 19.5392 8.89781 18.6747 7.58927C17.8101 6.28072 16.5799 5.25517 15.1372 4.64013C13.6944 4.0251 12.1027 3.84771 10.56 4.13019C9.0172 4.41267 7.59445 5.14238 6.474 6.22901L5.463 4.43301ZM18.537 19.567C16.7224 21.1394 14.401 22.0034 12 22C6.477 22 2 17.523 2 12C2 9.86401 2.67 7.88401 3.81 6.26001L7 12H4C3.99987 13.5684 4.46075 15.1022 5.32534 16.4108C6.18992 17.7193 7.42007 18.7449 8.86282 19.3599C10.3056 19.9749 11.8973 20.1523 13.44 19.8698C14.9828 19.5874 16.4055 18.8576 17.526 17.771L18.537 19.567Z" fill="currentColor"/>
          </svg>
          重试
        </button>
        <button class="home-btn" @click="goHome">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor"/>
          </svg>
          返回首页
        </button>
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
  min-height: 400px;
  padding: 40px;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.95) 100%);
  border-radius: 16px;
  border: 1px solid rgba(197, 61, 67, 0.3);
}

.error-content {
  text-align: center;
  max-width: 400px;
}

.error-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  color: #c53d43;
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.error-title {
  font-size: 24px;
  font-weight: 600;
  color: #E8E4D8;
  margin-bottom: 12px;
}

.error-message {
  font-size: 14px;
  color: #8B8B8B;
  margin-bottom: 32px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.retry-btn,
.home-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
  }
}

.retry-btn {
  background: linear-gradient(135deg, rgba(45, 90, 90, 0.6) 0%, rgba(45, 90, 90, 0.4) 100%);
  border: 1px solid rgba(201, 169, 97, 0.4);
  color: #E8E4D8;
  
  &:hover {
    background: linear-gradient(135deg, rgba(45, 90, 90, 0.8) 0%, rgba(45, 90, 90, 0.5) 100%);
    border-color: #C9A961;
    transform: translateY(-2px);
  }
}

.home-btn {
  background: linear-gradient(135deg, rgba(197, 61, 67, 0.5) 0%, rgba(197, 61, 67, 0.3) 100%);
  border: 1px solid rgba(197, 61, 67, 0.4);
  color: #E8E4D8;
  
  &:hover {
    background: linear-gradient(135deg, rgba(197, 61, 67, 0.7) 0%, rgba(197, 61, 67, 0.4) 100%);
    border-color: #B8423A;
    transform: translateY(-2px);
  }
}
</style>
