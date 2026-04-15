import { ref } from 'vue'

const isLoading = ref(false)
const loadingText = ref('加载中...')
const loadingProgress = ref(0)
const showProgress = ref(false)

export const useLoading = () => {
  const startLoading = (text = '加载中...', progress = false) => {
    isLoading.value = true
    loadingText.value = text
    showProgress.value = progress
    loadingProgress.value = 0
  }

  const stopLoading = () => {
    isLoading.value = false
    loadingText.value = '加载中...'
    loadingProgress.value = 0
    showProgress.value = false
  }

  const setLoadingText = (text) => {
    loadingText.value = text
  }

  const setLoadingProgress = (progress) => {
    loadingProgress.value = Math.min(100, Math.max(0, progress))
  }

  const updateProgress = (progress, text) => {
    setLoadingProgress(progress)
    if (text) {
      setLoadingText(text)
    }
  }

  return {
    isLoading,
    loadingText,
    loadingProgress,
    showProgress,
    startLoading,
    stopLoading,
    setLoadingText,
    setLoadingProgress,
    updateProgress
  }
}
