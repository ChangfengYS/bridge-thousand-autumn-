<template>
  <div class="not-found-container">
    <div class="bg-pattern"></div>
    
    <div class="content-wrapper">
      <div class="bridge-animation">
        <div class="bridge">
          <div class="bridge-layer layer-1"></div>
          <div class="bridge-layer layer-2"></div>
          <div class="bridge-layer layer-3"></div>
          <div class="bridge-layer layer-4"></div>
          <div class="bridge-base"></div>
        </div>
        <div class="mist mist-1"></div>
        <div class="mist mist-2"></div>
      </div>
      
      <div class="error-code">
        <span class="digit">4</span>
        <span class="digit pagoda">
          <span class="pagoda-icon"><component :is="getIcon('bridge')" /></span>
        </span>
        <span class="digit">4</span>
      </div>
      
      <h1 class="title">页面迷失了方向</h1>
      <p class="description">抱歉，您访问的页面似乎消失在古桥的云雾之中</p>
      
      <div class="actions">
        <router-link to="/" class="btn btn-primary">
          <span class="btn-icon"><component :is="getIcon('home')" /></span>
          <span>返回首页</span>
        </router-link>
        <router-link to="/main/dashboard" class="btn btn-secondary">
          <span class="btn-icon"><component :is="getIcon('bridge')" /></span>
          <span>古桥概览</span>
        </router-link>
      </div>
      
      <div class="quick-nav">
        <p class="nav-title">或者探索以下内容</p>
        <div class="nav-links">
          <router-link to="/main/type" class="nav-link">
            <span class="nav-icon"><component :is="getIcon('build')" /></span>
            <span class="nav-text">形制探析</span>
          </router-link>
          <router-link to="/main/wordcloud" class="nav-link">
            <span class="nav-icon"><component :is="getIcon('book')" /></span>
            <span class="nav-text">文化探析</span>
          </router-link>
          <router-link to="/main/height" class="nav-link">
            <span class="nav-icon"><component :is="getIcon('ruler')" /></span>
            <span class="nav-text">跨度之最</span>
          </router-link>
          <router-link to="/main/culture" class="nav-link">
            <span class="nav-icon"><component :is="getIcon('game')" /></span>
            <span class="nav-text">文化图谱</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

const IconHome = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M9 22V12h6v10', stroke: 'currentColor', 'stroke-width': 1.5 })
    ])
  }
}

const IconBridge = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M12 1L11 3h2L12 1z', fill: 'currentColor' }),
      h('path', { d: 'M12 3v1', stroke: 'currentColor', 'stroke-width': 1 }),
      h('path', { d: 'M10 4h4l1 2H9l1-2z', stroke: 'currentColor', 'stroke-width': 1, fill: 'currentColor', fillOpacity: 0.3 }),
      h('path', { d: 'M8 6h8l1 2H7l1-2z', stroke: 'currentColor', 'stroke-width': 1, fill: 'currentColor', fillOpacity: 0.25 }),
      h('rect', { x: 9, y: 8, width: 6, height: 3, stroke: 'currentColor', 'stroke-width': 1, fill: 'currentColor', fillOpacity: 0.2 }),
      h('path', { d: 'M7 11h10l1 2H6l1-2z', stroke: 'currentColor', 'stroke-width': 1, fill: 'currentColor', fillOpacity: 0.25 }),
      h('rect', { x: 8, y: 13, width: 8, height: 3, stroke: 'currentColor', 'stroke-width': 1, fill: 'currentColor', fillOpacity: 0.2 }),
      h('path', { d: 'M6 16h12l1 2H5l1-2z', stroke: 'currentColor', 'stroke-width': 1, fill: 'currentColor', fillOpacity: 0.25 }),
      h('rect', { x: 7, y: 18, width: 10, height: 4, stroke: 'currentColor', 'stroke-width': 1, fill: 'currentColor', fillOpacity: 0.2 }),
      h('rect', { x: 11, y: 19, width: 2, height: 3, fill: 'currentColor', opacity: 0.5 }),
      h('path', { d: 'M5 22h14', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
    ])
  }
}

const IconBuild = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('rect', { x: 3, y: 10, width: 18, height: 11, rx: 1, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M12 3L3 10h18L12 3z', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.2 }),
      h('rect', { x: 7, y: 14, width: 3, height: 4, stroke: 'currentColor', 'stroke-width': 1 }),
      h('rect', { x: 14, y: 14, width: 3, height: 4, stroke: 'currentColor', 'stroke-width': 1 })
    ])
  }
}

const IconBook = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.1 })
    ])
  }
}

const IconRuler = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M4 4h16v16H4z', stroke: 'currentColor', 'stroke-width': 1.5, rx: 2 }),
      h('path', { d: 'M4 9h4M4 14h4M16 9h4M16 14h4M9 4v4M14 4v4M9 16v4M14 16v4', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', opacity: 0.5 })
    ])
  }
}

const IconGame = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('rect', { x: 2, y: 6, width: 20, height: 12, rx: 4, stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.1 }),
      h('circle', { cx: 8, cy: 12, r: 2, stroke: 'currentColor', 'stroke-width': 1 }),
      h('circle', { cx: 16, cy: 10, r: 1, fill: 'currentColor' }),
      h('circle', { cx: 18, cy: 12, r: 1, fill: 'currentColor' })
    ])
  }
}

const iconMap = {
  home: IconHome,
  bridge: IconBridge,
  build: IconBuild,
  book: IconBook,
  ruler: IconRuler,
  game: IconGame
}

const getIcon = (name) => iconMap[name] || IconBridge
</script>

<style scoped lang="scss">
.not-found-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  font-family: 'Noto Sans SC', sans-serif;
  overflow: hidden;
  position: relative;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(197, 61, 67, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%);
  pointer-events: none;
}

.content-wrapper {
  text-align: center;
  z-index: 1;
  padding: 20px;
}

.bridge-animation {
  position: relative;
  width: 120px;
  height: 200px;
  margin: 0 auto 30px;
  
  .bridge {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    
    .bridge-layer {
      position: relative;
      margin: 0 auto;
      background: linear-gradient(180deg, #B8423A 0%, #8C2E28 100%);
      border-radius: 4px 4px 0 0;
      
      &::before {
        content: '';
        position: absolute;
        top: -8px;
        left: -5px;
        right: -5px;
        height: 8px;
        background: linear-gradient(180deg, #C9A961 0%, #A68A3D 100%);
        border-radius: 2px 2px 0 0;
      }
      
      &.layer-1 {
        width: 20px;
        height: 30px;
        animation: bridgeFloat 3s ease-in-out infinite;
      }
      
      &.layer-2 {
        width: 30px;
        height: 35px;
        margin-top: -5px;
        animation: bridgeFloat 3s ease-in-out infinite 0.1s;
      }
      
      &.layer-3 {
        width: 40px;
        height: 40px;
        margin-top: -5px;
        animation: bridgeFloat 3s ease-in-out infinite 0.2s;
      }
      
      &.layer-4 {
        width: 50px;
        height: 45px;
        margin-top: -5px;
        animation: bridgeFloat 3s ease-in-out infinite 0.3s;
      }
    }
    
    .bridge-base {
      width: 60px;
      height: 20px;
      background: linear-gradient(180deg, #6B4423 0%, #4A3520 100%);
      border-radius: 0 0 4px 4px;
      margin: 0 auto;
    }
  }
  
  .mist {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 40px;
    background: radial-gradient(ellipse, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    animation: mistFloat 4s ease-in-out infinite;
    
    &.mist-2 {
      bottom: 40px;
      width: 100px;
      animation-delay: 1s;
    }
  }
}

@keyframes bridgeFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes mistFloat {
  0%, 100% {
    opacity: 0.3;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translateX(-50%) scale(1.1);
  }
}

.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  
  .digit {
    font-family: 'Noto Serif SC', serif;
    font-size: 100px;
    font-weight: 700;
    background: linear-gradient(135deg, #C9A961 0%, #F4D03F 50%, #B8423A 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    animation: digitPulse 2s ease-in-out infinite;
    
    &.pagoda {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      -webkit-text-fill-color: initial;
      
      .pagoda-icon {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.5));
        animation: pagodaSway 3s ease-in-out infinite;
        
        .svg-icon {
          width: 100%;
          height: 100%;
          color: #C9A961;
        }
      }
    }
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.2s;
    }
  }
}

@keyframes digitPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

@keyframes pagodaSway {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

.title {
  font-family: 'Noto Serif SC', serif;
  font-size: 32px;
  color: #C9A961;
  margin: 0 0 15px 0;
  letter-spacing: 4px;
  text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
}

.description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 35px 0;
  letter-spacing: 1px;
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
  
  .btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    border-radius: 30px;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    border: none;
    
    .btn-icon {
      width: 22px;
      height: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      
      .svg-icon {
        width: 100%;
        height: 100%;
        color: currentColor;
      }
    }
    
    &:hover {
      transform: translateY(-3px);
    }
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #C9A961 0%, #B8423A 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
    
    &:hover {
      box-shadow: 0 12px 35px rgba(212, 175, 55, 0.4);
    }
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #C9A961;
    border: 1px solid rgba(212, 175, 55, 0.3);
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(212, 175, 55, 0.15);
      border-color: #C9A961;
    }
  }
}

.quick-nav {
  .nav-title {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0 20px 0;
  }
  
  .nav-links {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    
    .nav-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 15px 20px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
      
      &:hover {
        background: rgba(212, 175, 55, 0.1);
        border-color: rgba(212, 175, 55, 0.3);
        transform: translateY(-5px);
        
        .nav-icon {
          transform: scale(1.2);
        }
      }
      
      .nav-icon {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
        
        .svg-icon {
          width: 100%;
          height: 100%;
          color: #C9A961;
        }
      }
      
      .nav-text {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.8);
        letter-spacing: 1px;
      }
    }
  }
}

@media (max-width: 768px) {
  .error-code .digit {
    font-size: 70px;
    
    &.pagoda .pagoda-icon {
      font-size: 60px;
    }
  }
  
  .title {
    font-size: 24px;
  }
  
  .description {
    font-size: 14px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
    
    .btn {
      width: 200px;
      justify-content: center;
    }
  }
  
  .quick-nav .nav-links {
    .nav-link {
      padding: 12px 15px;
      
      .nav-icon {
        font-size: 24px;
      }
      
      .nav-text {
        font-size: 12px;
      }
    }
  }
}
</style>

