﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="shortcut-help-overlay" @click="close">
        <div class="shortcut-help-modal" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">键盘快捷键</h2>
            <button class="close-btn" @click="close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="shortcut-group">
              <h3 class="group-title">页面导航</h3>
              <div class="shortcut-list">
                <div class="shortcut-item" v-for="shortcut in navigationShortcuts" :key="shortcut.key">
                  <div class="shortcut-keys">
                    <kbd v-for="key in shortcut.key.split('+')" :key="key">{{ key.toUpperCase() }}</kbd>
                  </div>
                  <div class="shortcut-desc">{{ shortcut.description }}</div>
                </div>
              </div>
            </div>
            <div class="shortcut-group">
              <h3 class="group-title">其他操作</h3>
              <div class="shortcut-list">
                <div class="shortcut-item" v-for="shortcut in otherShortcuts" :key="shortcut.key">
                  <div class="shortcut-keys">
                    <kbd v-for="key in shortcut.key.split('+')" :key="key">{{ key.toUpperCase() }}</kbd>
                  </div>
                  <div class="shortcut-desc">{{ shortcut.description }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <p class="hint">按 <kbd>ESC</kbd> 或点击背景关闭</p>
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

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const navigationShortcuts = computed(() => [
  { key: 'ctrl+home', description: '返回首页' },
  { key: 'ctrl+1', description: '桥影流光' },
  { key: 'ctrl+2', description: '词云分析' },
  { key: 'ctrl+3', description: '跨度传奇' },
  { key: 'ctrl+4', description: '文化图谱' },
  { key: 'ctrl+5', description: '桥灵' }
])

const otherShortcuts = computed(() => [
  { key: 'ctrl+h', description: '显示快捷键帮助' },
  { key: 'escape', description: '关闭弹窗' }
])
</script>

<style scoped lang="scss">
.shortcut-help-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10002;
}

.shortcut-help-modal {
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(35, 35, 35, 0.95) 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  
  .modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #C9A961;
    letter-spacing: 2px;
  }
  
  .close-btn {
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background: transparent;
    color: rgba(232, 228, 216, 0.6);
    cursor: pointer;
    transition: color 0.2s;
    
    &:hover {
      color: #E8E4D8;
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.shortcut-group {
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .group-title {
    font-size: 14px;
    font-weight: 600;
    color: #B8423A;
    margin-bottom: 16px;
    letter-spacing: 1px;
  }
}

.shortcut-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(212, 175, 55, 0.05);
  border-radius: 8px;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
  }
}

.shortcut-keys {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 120px;
  
  kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 28px;
    padding: 0 8px;
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 4px;
    font-family: 'DIN Alternate', monospace;
    font-size: 12px;
    font-weight: 600;
    color: #C9A961;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.shortcut-desc {
  flex: 1;
  font-size: 14px;
  color: #E8E4D8;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  text-align: center;
  
  .hint {
    font-size: 12px;
    color: rgba(232, 228, 216, 0.5);
    
    kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 20px;
      padding: 0 6px;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 3px;
      font-family: 'DIN Alternate', monospace;
      font-size: 11px;
      font-weight: 600;
      color: #C9A961;
      margin: 0 4px;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
  
  .shortcut-help-modal {
    transition: transform 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  
  .shortcut-help-modal {
    transform: scale(0.9);
  }
}
</style>
