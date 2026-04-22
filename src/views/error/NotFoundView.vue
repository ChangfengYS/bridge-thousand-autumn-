<template>
  <div class="not-found-container">
    <div class="bg-pattern"></div>
    <div class="stars-container">
      <span class="star" v-for="i in 50" :key="i" :style="getStarStyle(i)"></span>
    </div>
    
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
        <div class="water-reflection"></div>
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
      
      <div class="scroll-hint">
        <span class="hint-text">向下滚动</span>
        <span class="hint-arrow"></span>
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

const getStarStyle = (index) => {
  const top = Math.random() * 100
  const left = Math.random() * 100
  const size = Math.random() * 2 + 1
  const delay = Math.random() * 3
  return {
    top: `${top}%`,
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`
  }
}
</script>

<style scoped lang="scss">
.not-found-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a14 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%);
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
    radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(197, 61, 67, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%);
  pointer-events: none;
}

.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  .star {
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: twinkle 3s ease-in-out infinite;
  }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.content-wrapper {
  text-align: center;
  z-index: 1;
  padding: 20px;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bridge-animation {
  position: relative;
  width: 140px;
  height: 220px;
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
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      
      &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -6px;
        right: -6px;
        height: 10px;
        background: linear-gradient(180deg, #C9A961 0%, #A68A3D 100%);
        border-radius: 3px 3px 0 0;
        box-shadow: 0 -2px 10px rgba(201, 169, 97, 0.3);
      }
      
      &.layer-1 {
        width: 24px;
        height: 35px;
        animation: bridgeFloat 3s ease-in-out infinite;
      }
      
      &.layer-2 {
        width: 36px;
        height: 40px;
        margin-top: -6px;
        animation: bridgeFloat 3s ease-in-out infinite 0.1s;
      }
      
      &.layer-3 {
        width: 48px;
        height: 45px;
        margin-top: -6px;
        animation: bridgeFloat 3s ease-in-out infinite 0.2s;
      }
      
      &.layer-4 {
        width: 60px;
        height: 50px;
        margin-top: -6px;
        animation: bridgeFloat 3s ease-in-out infinite 0.3s;
      }
    }
    
    .bridge-base {
      width: 72px;
      height: 24px;
      background: linear-gradient(180deg, #6B4423 0%, #4A3520 100%);
      border-radius: 0 0 6px 6px;
      margin: 0 auto;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    }
  }
  
  .mist {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 50px;
    background: radial-gradient(ellipse, rgba(255, 255, 255, 0.12) 0%, transparent 70%);
    border-radius: 50%;
    animation: mistFloat 4s ease-in-out infinite;
    
    &.mist-2 {
      bottom: 50px;
      width: 120px;
      animation-delay: 1.5s;
    }
  }
  
  .water-reflection {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 30px;
    background: radial-gradient(ellipse, rgba(201, 169, 97, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: reflectionWave 3s ease-in-out infinite;
  }
}

@keyframes bridgeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes mistFloat {
  0%, 100% {
    opacity: 0.4;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translateX(-50%) scale(1.15);
  }
}

@keyframes reflectionWave {
  0%, 100% { transform: translateX(-50%) scaleX(1); opacity: 0.5; }
  50% { transform: translateX(-50%) scaleX(1.1); opacity: 0.8; }
}

.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 24px;
  
  .digit {
    font-family: 'Noto Serif SC', serif;
    font-size: 110px;
    font-weight: 700;
    background: linear-gradient(135deg, #C9A961 0%, #FFD700 40%, #F4D03F 60%, #B8423A 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    animation: digitPulse 2s ease-in-out infinite;
    text-shadow: none;
    filter: drop-shadow(0 0 30px rgba(201, 169, 97, 0.3));
    
    &.pagoda {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      -webkit-text-fill-color: initial;
      
      .pagoda-icon {
        width: 90px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.6));
        animation: pagodaSway 3s ease-in-out infinite;
        
        .svg-icon {
          width: 100%;
          height: 100%;
          color: #C9A961;
        }
      }
    }
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(3) { animation-delay: 0.2s; }
  }
}

@keyframes digitPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    filter: drop-shadow(0 0 30px rgba(201, 169, 97, 0.3));
  }
  50% {
    opacity: 0.9;
    transform: scale(1.03);
    filter: drop-shadow(0 0 40px rgba(201, 169, 97, 0.5));
  }
}

@keyframes pagodaSway {
  0%, 100% { transform: rotate(-4deg) scale(1); }
  50% { transform: rotate(4deg) scale(1.05); }
}

.title {
  font-family: 'Noto Serif SC', serif;
  font-size: 36px;
  color: #C9A961;
  margin: 0 0 16px 0;
  letter-spacing: 6px;
  text-shadow: 0 0 40px rgba(212, 175, 55, 0.4);
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% { text-shadow: 0 0 40px rgba(212, 175, 55, 0.4); }
  50% { text-shadow: 0 0 60px rgba(212, 175, 55, 0.6); }
}

.description {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.65);
  margin: 0 0 40px 0;
  letter-spacing: 2px;
  line-height: 1.8;
}

.actions {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 45px;
  
  .btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 36px;
    border-radius: 35px;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    border: none;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
      transition: left 0.6s ease;
    }
    
    .btn-icon {
      width: 24px;
      height: 24px;
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
      transform: translateY(-4px);
      
      &::before {
        left: 100%;
      }
    }
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #C9A961 0%, #B8423A 100%);
    color: white;
    box-shadow: 0 8px 30px rgba(212, 175, 55, 0.35);
    
    &:hover {
      box-shadow: 0 14px 40px rgba(212, 175, 55, 0.5);
    }
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.08);
    color: #C9A961;
    border: 1px solid rgba(212, 175, 55, 0.35);
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(212, 175, 55, 0.15);
      border-color: #C9A961;
      box-shadow: 0 8px 30px rgba(212, 175, 55, 0.2);
    }
  }
}

.quick-nav {
  .nav-title {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.45);
    margin: 0 0 22px 0;
    letter-spacing: 1px;
  }
  
  .nav-links {
    display: flex;
    gap: 18px;
    justify-content: center;
    flex-wrap: wrap;
    
    .nav-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 18px 24px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      text-decoration: none;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      backdrop-filter: blur(8px);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #C9A961, transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:hover {
        background: rgba(212, 175, 55, 0.1);
        border-color: rgba(212, 175, 55, 0.35);
        transform: translateY(-6px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        
        &::before {
          opacity: 1;
        }
        
        .nav-icon {
          transform: scale(1.2) rotate(5deg);
        }
        
        .nav-text {
          color: #C9A961;
        }
      }
      
      .nav-icon {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        
        .svg-icon {
          width: 100%;
          height: 100%;
          color: #C9A961;
        }
      }
      
      .nav-text {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.75);
        letter-spacing: 1px;
        transition: color 0.3s ease;
      }
    }
  }
}

.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.5;
  animation: hintBounce 2s ease-in-out infinite;
  
  .hint-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 1px;
  }
  
  .hint-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid rgba(255, 255, 255, 0.6);
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    transform: rotate(45deg);
  }
}

@keyframes hintBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
}

@media (max-width: 768px) {
  .error-code .digit {
    font-size: 75px;
    
    &.pagoda .pagoda-icon {
      width: 65px;
      height: 65px;
    }
  }
  
  .title {
    font-size: 26px;
    letter-spacing: 4px;
  }
  
  .description {
    font-size: 14px;
    padding: 0 20px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    
    .btn {
      width: 220px;
      justify-content: center;
    }
  }
  
  .quick-nav .nav-links {
    gap: 12px;
    
    .nav-link {
      padding: 14px 18px;
      
      .nav-icon {
        width: 26px;
        height: 26px;
      }
      
      .nav-text {
        font-size: 12px;
      }
    }
  }
  
  .bridge-animation {
    width: 100px;
    height: 160px;
    
    .bridge {
      .bridge-layer {
        &.layer-1 { width: 18px; height: 25px; }
        &.layer-2 { width: 26px; height: 30px; }
        &.layer-3 { width: 36px; height: 35px; }
        &.layer-4 { width: 45px; height: 38px; }
      }
      
      .bridge-base {
        width: 54px;
        height: 18px;
      }
    }
  }
  
  .scroll-hint {
    display: none;
  }
}
</style>
