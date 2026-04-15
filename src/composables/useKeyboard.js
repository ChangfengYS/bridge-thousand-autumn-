import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from './useToast'
import { useShortcutHelp } from './useShortcutHelp'

export const useKeyboard = () => {
  const router = useRouter()
  const { info, success } = useToast()
  const { toggleHelp } = useShortcutHelp()

  const shortcuts = new Map()

  const defaultShortcuts = {
    'ctrl+home': {
      action: () => router.push('/main/dashboard'),
      description: '返回首页'
    },
    'ctrl+1': {
      action: () => router.push('/main/dashboard'),
      description: '桥影流光'
    },
    'ctrl+2': {
      action: () => router.push('/main/wordcloud-only'),
      description: '词云分析'
    },
    'ctrl+3': {
      action: () => router.push('/main/height'),
      description: '跨度传奇'
    },
    'ctrl+4': {
      action: () => router.push('/main/culture'),
      description: '文化图谱'
    },
    'ctrl+5': {
      action: () => router.push('/main/assistant'),
      description: '桥灵'
    },
    'ctrl+h': {
      action: () => toggleHelp(),
      description: '显示快捷键帮助'
    },
    'escape': {
      action: () => closeModal(),
      description: '关闭弹窗'
    }
  }

  const closeModal = () => {
    const modal = document.querySelector('.modal-overlay, .dialog-overlay, .shortcut-help-overlay')
    if (modal) {
      modal.click()
    }
  }

  const registerShortcut = (key, action, description = '') => {
    shortcuts.set(key.toLowerCase(), { action, description })
  }

  const unregisterShortcut = (key) => {
    shortcuts.delete(key.toLowerCase())
  }

  const handleKeyDown = (event) => {
    const key = []

    if (event.ctrlKey || event.metaKey) {
      key.push('ctrl')
    }
    if (event.shiftKey) {
      key.push('shift')
    }
    if (event.altKey) {
      key.push('alt')
    }

    key.push(event.key.toLowerCase())
    const shortcutKey = key.join('+')

    const shortcut = shortcuts.get(shortcutKey) || defaultShortcuts[shortcutKey]

    if (shortcut) {
      event.preventDefault()
      shortcut.action()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    registerShortcut,
    unregisterShortcut
  }
}
