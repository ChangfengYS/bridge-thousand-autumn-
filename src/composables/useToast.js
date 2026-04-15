import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

export const useToast = () => {
  const addToast = (options) => {
    const id = ++toastId
    const toast = {
      id,
      type: options.type || 'info',
      title: options.title || '',
      message: options.message || '',
      duration: options.duration || 3000
    }

    toasts.value.push(toast)

    if (toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }

    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearAllToasts = () => {
    toasts.value = []
  }

  const success = (message, title = '成功') => {
    return addToast({ type: 'success', message, title })
  }

  const error = (message, title = '错误') => {
    return addToast({ type: 'error', message, title })
  }

  const warning = (message, title = '警告') => {
    return addToast({ type: 'warning', message, title })
  }

  const info = (message, title = '提示') => {
    return addToast({ type: 'info', message, title })
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  }
}
