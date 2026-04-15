import { ref } from 'vue'

const showShortcutHelp = ref(false)

export const useShortcutHelp = () => {
  const openHelp = () => {
    showShortcutHelp.value = true
  }

  const closeHelp = () => {
    showShortcutHelp.value = false
  }

  const toggleHelp = () => {
    showShortcutHelp.value = !showShortcutHelp.value
  }

  return {
    showShortcutHelp,
    openHelp,
    closeHelp,
    toggleHelp
  }
}
