<template>
  <Teleport to="body">
    <Transition name="shortcut-fade">
      <div v-if="visible" class="shortcut-overlay" @click="close">
        <div class="shortcut-modal" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h8M6 16h.01M18 16h.01"/>
              </svg>
              键盘快捷键
            </h3>
            <button class="close-btn" @click="close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="shortcut-group" v-for="group in shortcutGroups" :key="group.title">
              <h4 class="group-title">{{ group.title }}</h4>
              <div class="shortcut-list">
                <div class="shortcut-item" v-for="item in group.items" :key="item.key">
                  <div class="shortcut-keys">
                    <kbd v-for="key in item.keys" :key="key">{{ key }}</kbd>
                  </div>
                  <span class="shortcut-desc">{{ item.description }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <span class="tip">按 <kbd>?</kbd> 可随时打开此帮助</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'update:visible'])

const shortcutGroups = computed(() => [
  {
    title: '导航',
    items: [
      { keys: ['Home'], description: '返回首页' },
      { keys: ['Esc'], description: '返回/关闭弹窗' },
      { keys: ['←'], description: '上一张图片' },
      { keys: ['→'], description: '下一张图片' }
    ]
  },
  {
    title: '页面',
    items: [
      { keys: ['1'], description: '首页' },
      { keys: ['2'], description: '桥型分析' },
      { keys: ['3'], description: '全景概览' },
      { keys: ['4'], description: '时间轴' },
      { keys: ['5'], description: '地域分布' },
      { keys: ['6'], description: '对比分析' },
      { keys: ['7'], description: '典型案例' },
      { keys: ['8'], description: '结构解析' },
      { keys: ['9'], description: '工艺演变' },
      { keys: ['0'], description: '桥灵助手' }
    ]
  },
  {
    title: '图片预览',
    items: [
      { keys: ['+'], description: '放大图片' },
      { keys: ['-'], description: '缩小图片' },
      { keys: ['R'], description: '旋转图片' }
    ]
  },
  {
    title: '其他',
    items: [
      { keys: ['?'], description: '显示快捷键帮助' },
      { keys: ['F'], description: '全屏切换' },
      { keys: ['M'], description: '音乐开关' }
    ]
  }
])

const close = () => {
  emit('close')
  emit('update:visible', false)
}
</script>

<style lang="scss" scoped>
.shortcut-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 10003;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shortcut-modal {
  width: 90%;
  max-width: 520px;
  max-height: 80vh;
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.98) 0%, rgba(40, 40, 40, 0.95) 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #C9A961;
  margin: 0;
  font-family: 'Noto Serif SC', serif;
  
  svg {
    width: 24px;
    height: 24px;
  }
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
    color: #C9A961;
  }
  
  &:hover {
    background: rgba(184, 66, 58, 0.2);
    border-color: rgba(184, 66, 58, 0.4);
    
    svg {
      color: #B8423A;
    }
  }
}

.modal-body {
  padding: 20px 24px;
  max-height: 50vh;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(212, 175, 55, 0.3);
    border-radius: 2px;
  }
}

.shortcut-group {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.group-title {
  font-size: 12px;
  font-weight: 600;
  color: rgba(201, 169, 97, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 12px;
}

.shortcut-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(212, 175, 55, 0.05);
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
  }
}

.shortcut-keys {
  display: flex;
  gap: 4px;
  
  kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 26px;
    padding: 0 8px;
    background: linear-gradient(180deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.9) 100%);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 6px;
    font-family: 'DIN Alternate', monospace;
    font-size: 12px;
    font-weight: 600;
    color: #C9A961;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
}

.shortcut-desc {
  font-size: 13px;
  color: rgba(232, 228, 216, 0.8);
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid rgba(212, 175, 55, 0.15);
  text-align: center;
  
  .tip {
    font-size: 12px;
    color: rgba(232, 228, 216, 0.5);
    
    kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 22px;
      height: 22px;
      padding: 0 6px;
      background: rgba(60, 60, 60, 0.8);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 4px;
      font-family: 'DIN Alternate', monospace;
      font-size: 11px;
      color: #C9A961;
      margin: 0 4px;
    }
  }
}

.shortcut-fade-enter-active,
.shortcut-fade-leave-active {
  transition: all 0.3s ease;
}

.shortcut-fade-enter-from,
.shortcut-fade-leave-to {
  opacity: 0;
  
  .shortcut-modal {
    transform: scale(0.95) translateY(20px);
  }
}
</style>
