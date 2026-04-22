<template>
  <Transition name="back-top-fade">
    <div 
      v-show="visible" 
      class="back-to-top"
      @click="scrollToTop"
      :title="'返回顶部'"
    >
      <div class="back-top-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </div>
      <div class="back-top-ripple"></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  visibilityHeight: {
    type: Number,
    default: 300
  },
  scrollDuration: {
    type: Number,
    default: 500
  }
})

const visible = ref(false)

const handleScroll = () => {
  visible.value = window.scrollY > props.visibilityHeight || 
                   document.documentElement.scrollTop > props.visibilityHeight
}

const scrollToTop = () => {
  const start = window.scrollY || document.documentElement.scrollTop
  const startTime = performance.now()
  
  const easeOutQuad = (t) => t * (2 - t)
  
  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.scrollDuration, 1)
    const easeProgress = easeOutQuad(progress)
    
    const position = start * (1 - easeProgress)
    
    window.scrollTo(0, position)
    document.documentElement.scrollTop = position
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }
  
  requestAnimationFrame(animateScroll)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  right: 30px;
  bottom: 80px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 1000;
  
  &:hover {
    .back-top-inner {
      background: linear-gradient(135deg, #C9A961 0%, #B8423A 100%);
      transform: scale(1.1);
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
    }
    
    .back-top-ripple {
      animation: ripple 0.6s ease-out;
    }
  }
  
  &:active {
    .back-top-inner {
      transform: scale(0.95);
    }
  }
}

.back-top-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(184, 66, 58, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  
  svg {
    width: 24px;
    height: 24px;
    color: #fff;
  }
}

.back-top-ripple {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 2px solid rgba(212, 175, 55, 0.5);
  pointer-events: none;
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.back-top-fade-enter-active,
.back-top-fade-leave-active {
  transition: all 0.3s ease;
}

.back-top-fade-enter-from,
.back-top-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>
