﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="main-wrapper">
    <header class="top-header">
      <div class="header-left">
        <div class="logo">
          <img src="@/assets/image/logo.png" alt="桥载千秋" class="logo-icon" />
          <div class="logo-text">
            <h1>桥载千秋 形映山河</h1>
            <p>中国古桥形制演变与地域特征的数据可视化设计</p>
          </div>
        </div>
      </div>
      <div class="header-center">
        <nav class="nav-menu">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: $route.path === item.path }"
          >
            <span class="nav-text">{{ item.title }}</span>
          </router-link>
        </nav>
      </div>
      <div class="header-right">
        <div class="header-actions">
          <button class="music-btn" :class="{ playing: isMusicPlaying }" @click="toggleMusic" :title="isMusicPlaying ? '暂停音乐' : '播放音乐'">
            <div class="disc-container">
              <div class="disc" ref="discRef">
                <div class="disc-cover">
                  <div class="disc-label">
                    <svg viewBox="0 0 24 24" class="music-note">
                      <circle cx="6" cy="18" r="4" fill="currentColor"/>
                      <path d="M10 18V4l10-2v14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="20" cy="16" r="4" fill="currentColor"/>
                      <path d="M10 4c0-1 4-2 8-3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button class="fullscreen-btn" @click="toggleFullscreen" :title="isFullscreen ? '退出全屏' : '全屏显示'">
            <svg v-if="!isFullscreen" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
          </button>
          <div class="current-time">
            <div class="date-part">{{ currentDate }}</div>
            <div class="time-part">{{ currentTimeOnly }}</div>
          </div>
        </div>
      </div>
    </header>
    
    <main class="content-area">
      <router-view v-slot="{Component, route}">
        <transition name="page-transition" mode="out-in">
          <component :is="Component" :key="route.path"/>
        </transition>
      </router-view>
    </main>
    <audio 
      ref="audioRef" 
      :src="musicSrc" 
      loop 
      @play="onMusicPlay" 
      @pause="onMusicPause"
    ></audio>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const currentDate = ref('')
const currentTimeOnly = ref('')
const contentArea = ref(null)
const isFullscreen = ref(false)
const isMusicPlaying = ref(false)
const audioRef = ref(null)
const discRef = ref(null)
const discRotation = ref(0)
let animationFrameId = null

const musicSrc = '/bgm.mp3'

const animateDisc = () => {
  if (!isMusicPlaying.value) return
  discRotation.value = (discRotation.value + 2) % 360
  if (discRef.value) {
    discRef.value.style.transform = `rotate(${discRotation.value}deg)`
  }
  animationFrameId = requestAnimationFrame(animateDisc)
}

const toggleMusic = () => {
  if (!audioRef.value) return
  
  if (isMusicPlaying.value) {
    audioRef.value.pause()
    isMusicPlaying.value = false
    localStorage.setItem('bridgeMusicPlaying', 'false')
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  } else {
    audioRef.value.play().then(() => {
      isMusicPlaying.value = true
      localStorage.setItem('bridgeMusicPlaying', 'true')
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      animationFrameId = requestAnimationFrame(animateDisc)
    }).catch(err => {
      console.warn('音乐播放失败:', err)
      isMusicPlaying.value = false
      localStorage.setItem('bridgeMusicPlaying', 'false')
    })
  }
}

const onMusicPlay = () => {
}

const onMusicPause = () => {
}

const IconCloud = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'nav-svg-icon' }, [
      h('path', { d: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M12 12v4', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', opacity: 0.6 }),
      h('path', { d: 'M9 14l3-2 3 2', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.6 })
    ])
  }
}

const IconGraph = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'nav-svg-icon' }, [
      h('circle', { cx: 6, cy: 6, r: 3, stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', 'fill-opacity': 0.2 }),
      h('circle', { cx: 18, cy: 6, r: 3, stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', 'fill-opacity': 0.2 }),
      h('circle', { cx: 12, cy: 18, r: 3, stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', 'fill-opacity': 0.2 }),
      h('path', { d: 'M8.5 7.5L10.5 15.5', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.6 }),
      h('path', { d: 'M15.5 7.5L13.5 15.5', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.6 }),
      h('path', { d: 'M9 6h6', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.4 })
    ])
  }
}

const IconDashboard = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'nav-svg-icon' }, [
      h('circle', { cx: 12, cy: 12, r: 10, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M12 2v4M12 18v4M2 12h4M18 12h4', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M12 6l-1.5 4.5L6 12l4.5 1.5L12 18l1.5-4.5L18 12l-4.5-1.5L12 6z', fill: 'currentColor', opacity: 0.6 }),
      h('circle', { cx: 12, cy: 12, r: 2, fill: 'currentColor' })
    ])
  }
}

const IconCulture = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'nav-svg-icon' }, [
      h('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M8 7h8M8 11h8M8 15h5', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', opacity: 0.6 }),
      h('circle', { cx: 17, cy: 15, r: 3, fill: 'currentColor', opacity: 0.3 }),
      h('path', { d: 'M16 15l1 1 2-2', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  }
}

const IconHeight = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'nav-svg-icon' }, [
      h('path', { d: 'M3 20h18', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('rect', { x: 5, y: 12, width: 4, height: 8, rx: 1, fill: 'currentColor', opacity: 0.3, stroke: 'currentColor', 'stroke-width': 1 }),
      h('rect', { x: 10, y: 8, width: 4, height: 12, rx: 1, fill: 'currentColor', opacity: 0.4, stroke: 'currentColor', 'stroke-width': 1 }),
      h('rect', { x: 15, y: 4, width: 4, height: 16, rx: 1, fill: 'currentColor', opacity: 0.5, stroke: 'currentColor', 'stroke-width': 1 }),
      h('path', { d: 'M17 4l1-2M17 4l2 1', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
    ])
  }
}

const Icon3D = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'nav-svg-icon' }, [
      h('path', { d: 'M12 2L2 7l10 5 10-5-10-5z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M2 17l10 5 10-5', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M2 12l10 5 10-5', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.6 }),
      h('path', { d: 'M12 7v15', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.4 }),
      h('circle', { cx: 12, cy: 12, r: 2, fill: 'currentColor', opacity: 0.5 })
    ])
  }
}

const IconBackground = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'nav-svg-icon' }, [
      h('path', { d: 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M14 2v6h6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M8 13h8M8 17h5', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', opacity: 0.6 }),
      h('path', { d: 'M8 9h2', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
      h('circle', { cx: 16, cy: 16, r: 3, fill: 'currentColor', opacity: 0.3 }),
      h('path', { d: 'M15 16l1 1 2-2', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  }
}

const IconAssistant = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'nav-svg-icon' }, [
      h('path', { d: 'M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M19 10c0 3.5-2.5 6-5 6.5V19h2v2H8v-2h2v-2.5C7.5 16 5 13.5 5 10', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('circle', { cx: 10, cy: 9, r: 1, fill: 'currentColor' }),
      h('circle', { cx: 14, cy: 9, r: 1, fill: 'currentColor' }),
      h('path', { d: 'M10 12c0 0 1 1 2 1s2-1 2-1', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
      h('path', { d: 'M17 5l2-2M19 7l2-1', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', opacity: 0.6 })
    ])
  }
}

const iconMap = {
  dashboard: IconDashboard,
  culture: IconCulture,
  cloud: IconCloud,
  graph: IconGraph,
  height: IconHeight,
  model3d: Icon3D,
  background: IconBackground,
  assistant: IconAssistant
}

const getIconComponent = (iconName) => {
  return iconMap[iconName] || IconDashboard
}

const navItems = [
  { path: '/main/dashboard', title: '桥影流光', icon: 'dashboard' },
  { path: '/main/wordcloud-only', title: '词云分析', icon: 'cloud' },
  { path: '/main/height', title: '跨度传奇', icon: 'height' },
  { path: '/main/culture', title: '文化图谱', icon: 'graph' },
  { path: '/main/assistant', title: '桥灵', icon: 'assistant' }
]

let timer = null

const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentDate.value = `${year}年${month}月${day}日`
  currentTimeOnly.value = `${hours}:${minutes}:${seconds}`
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      isFullscreen.value = true
    }).catch(err => {
      console.error('全屏请求失败:', err)
    })
  } else {
    document.exitFullscreen().then(() => {
      isFullscreen.value = false
    }).catch(err => {
      console.error('退出全屏失败:', err)
    })
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

watch(() => route.path, () => {
  nextTick(() => {
    const contentEl = document.querySelector('.content-area')
    if (contentEl) {
      contentEl.scrollTop = 0
    }
  })
})

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  
  if (route.path !== '/' && route.path !== '/welcome') {
    const savedState = localStorage.getItem('bridgeMusicPlaying')
    if (savedState !== 'false' && audioRef.value) {
      audioRef.value.play().then(() => {
        isMusicPlaying.value = true
        localStorage.setItem('bridgeMusicPlaying', 'true')
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
        animationFrameId = requestAnimationFrame(animateDisc)
      }).catch(() => {
        isMusicPlaying.value = false
        localStorage.setItem('bridgeMusicPlaying', 'false')
      })
    }
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500;600&family=Orbitron:wght@400;500;700&display=swap");

.main-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Noto Sans SC', sans-serif;
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 30%, #1F1F1F 50%, #1A1A1A 70%, #0D0D0D 100%);
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at 20% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(197, 61, 67, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(91, 140, 133, 0.02) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }
}

.top-header {
  height: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background: linear-gradient(135deg, rgba(13, 13, 13, 0.98) 0%, rgba(26, 26, 26, 0.95) 100%);
  border-bottom: 2px solid rgba(212, 175, 55, 0.4);
  position: relative;
  z-index: 100;
  backdrop-filter: blur(10px);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.7), transparent);
  }
}

.header-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 15px;
  
  .logo {
    display: flex;
    align-items: center;
    gap: 14px;
    
    .logo-icon {
      width: 130px;
      height: 130px;
      object-fit: contain;
      filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.5));
    }
    
    .logo-text {
      display: flex;
      flex-direction: column;
      position: relative;
      
      h1 {
        font-family: 'Noto Serif SC', serif;
        font-size: 26px;
        font-weight: 700;
        margin: 0;
        letter-spacing: 6px;
        background: linear-gradient(135deg, #E8D5A3 0%, #D4AF37 25%, #F5E6C8 50%, #C9A961 75%, #B8860B 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.4));
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
        }
      }
      
      p {
        font-family: 'Noto Serif SC', serif;
        font-size: 11px;
        color: rgba(200, 190, 170, 0.8);
        margin: 8px 0 0 0;
        letter-spacing: 1px;
        line-height: 1.5;
        position: relative;
        padding-left: 2px;
        
        &::before {
          content: '『';
          color: rgba(212, 175, 55, 0.4);
          margin-right: 4px;
        }
        
        &::after {
          content: '』';
          color: rgba(212, 175, 55, 0.4);
          margin-left: 4px;
        }
      }
    }
  }
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  min-width: 0;
  
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0;
    border-radius: 0;
    border: none;
    justify-content: center;
    backdrop-filter: none;
    background: transparent;
    box-shadow: none;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    text-decoration: none;
    color: rgba(201, 169, 97, 0.85);
    border-radius: 12px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 17px;
    font-weight: 600;
    font-family: 'Noto Serif SC', 'STKaiti', 'KaiTi', serif;
    white-space: nowrap;
    position: relative;
    border: 1px solid rgba(201, 169, 97, 0.2);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    letter-spacing: 3px;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.6) 0%, rgba(40, 40, 40, 0.4) 100%);
    backdrop-filter: blur(8px);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #C9A961, transparent);
      transition: width 0.4s ease;
    }
    
    &:hover {
      color: #fff;
      background: linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(184, 66, 58, 0.1) 100%);
      border-color: rgba(201, 169, 97, 0.5);
      transform: translateY(-3px);
      box-shadow: 
        0 8px 25px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(201, 169, 97, 0.15);
      
      &::after {
        width: 60%;
      }
    }
    
    &.active {
      color: #fff;
      border-color: transparent;
      letter-spacing: 4px;
      background: linear-gradient(-45deg, #C9A961 0%, #B8423A 25%, #C9A961 50%, #8B7355 75%, #C9A961 100%);
      background-size: 400% 400%;
      animation: shinyGradient 8s ease infinite;
      box-shadow: 
        0 5px 18px rgba(212, 175, 55, 0.35),
        0 0 30px rgba(201, 169, 97, 0.2);
      
      &::after {
        display: none;
      }
    }
  }
}

@keyframes shinyGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
}

.header-right {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  
  .music-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(197, 61, 67, 0.15) 100%);
    border: 1px solid rgba(212, 175, 55, 0.4);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    padding: 0;
    
    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, rgba(197, 61, 67, 0.25) 100%);
      border-color: rgba(212, 175, 55, 0.6);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
      transform: scale(1.08);
    }
    
    &.playing {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, rgba(197, 61, 67, 0.25) 100%);
      border-color: rgba(212, 175, 55, 0.6);
      box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
    }
    
    .disc-container {
      width: 36px;
      height: 36px;
    }
    
    .disc {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, 
        rgba(30, 25, 20, 0.9) 0%, 
        rgba(40, 35, 28, 0.95) 50%, 
        rgba(25, 22, 18, 0.9) 100%
      );
      box-shadow: 
        0 2px 6px rgba(0, 0, 0, 0.4),
        inset 0 1px 3px rgba(255, 255, 255, 0.08);
      position: relative;
      overflow: hidden;
    }
    
    &.playing .disc {
    }
    
    .disc-cover {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: linear-gradient(135deg, 
        rgba(212, 175, 55, 0.9) 0%, 
        rgba(255, 215, 0, 0.85) 50%, 
        rgba(201, 169, 97, 0.9) 100%
      );
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.3),
        inset 0 1px 2px rgba(255, 255, 255, 0.4);
    }
    
    .disc-label {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .music-note {
      width: 12px;
      height: 12px;
      color: rgba(30, 25, 20, 0.9);
    }
  }
  
  .fullscreen-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(197, 61, 67, 0.18) 100%);
    border: 1px solid rgba(212, 175, 55, 0.45);
    border-radius: 14px;
    color: #C9A961;
    cursor: pointer;
    transition: all 0.3s ease;
    
    svg {
      width: 20px;
      height: 20px;
    }
    
    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, rgba(197, 61, 67, 0.28) 100%);
      border-color: #C9A961;
      box-shadow: 0 0 18px rgba(212, 175, 55, 0.35);
      transform: scale(1.05);
    }
  }
  
  .current-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    color: #C9A961;
    font-family: 'Orbitron', 'Courier New', monospace;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(197, 61, 67, 0.12) 100%);
    padding: 8px 14px;
    border-radius: 14px;
    border: 1px solid rgba(212, 175, 55, 0.45);
    text-shadow: 0 0 12px rgba(212, 175, 55, 0.5);
    box-shadow: 0 0 18px rgba(212, 175, 55, 0.2), inset 0 0 12px rgba(212, 175, 55, 0.1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
      animation: timeShine 3s infinite;
    }
    
    .date-part {
      font-size: 11px;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    
    .time-part {
      font-size: 15px;
      letter-spacing: 1px;
      font-weight: 500;
      white-space: nowrap;
    }
    
    @keyframes timeShine {
      0% { left: -100%; }
      50%, 100% { left: 100%; }
    }
  }
}

.content-area {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #C9A961 0%, #B8423A 100%);
    border-radius: 4px;
    
    &:hover {
      background: linear-gradient(180deg, #E8C547 0%, #D54D53 100%);
    }
  }
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.3s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
}

@media screen and (max-width: 1400px) {
  .header-center {
    .nav-item {
      padding: 7px 13px;
      font-size: 15px;
      
      .nav-icon {
        width: 16px;
        height: 16px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .header-center {
    .nav-menu {
      gap: 6px;
      padding: 6px 10px;
    }
    
    .nav-item {
      padding: 6px 12px;
      font-size: 14px;
      letter-spacing: 1px;
    }
  }
  
  .header-left {
    .logo {
      .logo-text {
        h1 {
          font-size: 21px;
        }
        
        p {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .top-header {
    height: 60px;
    min-height: 60px;
    padding: 0 15px;
  }
  
  .header-left {
    .logo {
      .logo-icon {
        width: 70px;
        height: 70px;
      }
      
      .logo-text {
        h1 {
          font-size: 18px;
        }
      }
    }
  }
  
  .header-center {
    overflow-x: auto;
    
    &::-webkit-scrollbar {
      height: 2px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(212, 175, 55, 0.5);
      border-radius: 2px;
    }
    
    .nav-menu {
      border-radius: 22px;
      padding: 4px 6px;
      gap: 4px;
    }
    
    .nav-item {
      padding: 5px 8px;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
  }
  
  .header-right {
    .current-time {
      font-size: 11px;
      padding: 5px 12px;
    }
  }
}
</style>

