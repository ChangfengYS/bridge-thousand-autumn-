import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const HISTORY_KEY = 'bridge_history'
const MAX_HISTORY = 20

const history = ref([])

export function useHistory() {
  const router = useRouter()

  const loadHistory = () => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      if (saved) {
        history.value = JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load history:', e)
      history.value = []
    }
  }

  const saveHistory = () => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value))
    } catch (e) {
      console.error('Failed to save history:', e)
    }
  }

  const addToHistory = (item) => {
    const existingIndex = history.value.findIndex(h => h.path === item.path)
    
    if (existingIndex > -1) {
      history.value.splice(existingIndex, 1)
    }
    
    history.value.unshift({
      ...item,
      timestamp: Date.now()
    })
    
    if (history.value.length > MAX_HISTORY) {
      history.value = history.value.slice(0, MAX_HISTORY)
    }
    
    saveHistory()
  }

  const clearHistory = () => {
    history.value = []
    saveHistory()
  }

  const removeFromHistory = (path) => {
    const index = history.value.findIndex(h => h.path === path)
    if (index > -1) {
      history.value.splice(index, 1)
      saveHistory()
    }
  }

  const getRecentHistory = (count = 5) => {
    return history.value.slice(0, count)
  }

  const navigateToHistory = (path) => {
    router.push(path)
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    if (diff < 60000) {
      return '刚刚'
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}分钟前`
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}小时前`
    } else if (diff < 604800000) {
      return `${Math.floor(diff / 86400000)}天前`
    } else {
      return date.toLocaleDateString('zh-CN')
    }
  }

  loadHistory()

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    getRecentHistory,
    navigateToHistory,
    formatTimestamp
  }
}

export function useHistoryTracker() {
  const router = useRouter()
  const { addToHistory } = useHistory()

  const pageNames = {
    '/': '首页',
    '/type': '桥型分析',
    '/panorama': '全景概览',
    '/timeline': '时间轴',
    '/province': '地域分布',
    '/comparison': '对比分析',
    '/cases': '典型案例',
    '/structure': '结构解析',
    '/craft': '工艺演变',
    '/assistant': '桥灵助手',
    '/wordcloud': '词云分析',
    '/graph': '文化图谱',
    '/height': '高度分析'
  }

  const trackPage = (to) => {
    if (to.path === '/') return
    
    addToHistory({
      path: to.path,
      name: to.meta?.title || pageNames[to.path] || to.path,
      query: to.query
    })
  }

  watch(
    () => router.currentRoute.value,
    (to) => {
      trackPage(to)
    },
    { immediate: true }
  )

  return {
    trackPage
  }
}
