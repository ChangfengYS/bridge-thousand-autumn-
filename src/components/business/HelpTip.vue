<template>
  <div class="tip-container" ref="containerRef">
    <div class="tip-icon" @mouseenter="showTip" @mouseleave="hideTip">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    </div>
    <Teleport to="body">
      <transition name="tip-fade">
        <div 
          class="tip-content" 
          v-show="visible" 
          ref="tipRef"
          :style="tipStyle"
          @mouseenter="cancelHide"
          @mouseleave="hideTip"
        >
          <div class="tip-title">{{ title }}</div>
          <div class="tip-text">{{ content }}</div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onUnmounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '提示'
  },
  content: {
    type: String,
    default: ''
  }
})

const visible = ref(false)
const containerRef = ref(null)
const tipRef = ref(null)
const tipPosition = ref({ top: 0, left: 0 })
let hideTimer = null

const tipStyle = computed(() => ({
  top: `${tipPosition.value.top}px`,
  left: `${tipPosition.value.left}px`
}))

const calculatePosition = () => {
  if (!containerRef.value || !tipRef.value) return
  
  const containerRect = containerRef.value.getBoundingClientRect()
  const tipRect = tipRef.value.getBoundingClientRect()
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  
  const tipWidth = tipRect.width
  const tipHeight = tipRect.height
  
  let top = containerRect.top + containerRect.height / 2 - tipHeight / 2
  let left = containerRect.right + 10
  
  if (left + tipWidth > windowWidth - 20) {
    left = containerRect.left - tipWidth - 10
  }
  
  if (left < 20) {
    left = 20
  }
  
  if (top < 20) {
    top = 20
  }
  
  if (top + tipHeight > windowHeight - 20) {
    top = windowHeight - tipHeight - 20
  }
  
  tipPosition.value = { top, left }
}

const showTip = async () => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  visible.value = true
  await nextTick()
  calculatePosition()
}

const cancelHide = () => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

const hideTip = () => {
  hideTimer = setTimeout(() => {
    visible.value = false
  }, 100)
}

onUnmounted(() => {
  if (hideTimer) {
    clearTimeout(hideTimer)
  }
})
</script>

<style scoped lang="scss">
.tip-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
}

.tip-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.2);
  color: #C9A961;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.4);
    color: #FFD700;
    transform: scale(1.1);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}

.tip-content {
  position: fixed;
  min-width: 200px;
  max-width: 320px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(45, 90, 90, 0.98) 0%, rgba(26, 26, 26, 0.98) 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .tip-title {
    font-size: 14px;
    font-weight: 600;
    color: #C9A961;
    margin-bottom: 6px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  }

  .tip-text {
    font-size: 12px;
    color: #E8E4D8;
    line-height: 1.6;
  }
}

.tip-fade-enter-active,
.tip-fade-leave-active {
  transition: opacity 0.3s ease;
}

.tip-fade-enter-from,
.tip-fade-leave-to {
  opacity: 0;
}
</style>
