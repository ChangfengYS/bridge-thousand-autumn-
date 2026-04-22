<template>
  <div class="welcome-container" :class="{ 'leaving': isLeaving }">
    <div class="ink-bg">
      <div class="bg-noise"></div>
      <div class="ink-wash-texture"></div>
      <div class="mountain-layer mountain-far"></div>
      <div class="mountain-layer mountain-mid"></div>
      <div class="mountain-layer mountain-near"></div>
      <div class="bridge-silhouette"></div>
      <div class="water-ripple">
        <div class="ripple-line" v-for="i in 5" :key="i" :style="{ animationDelay: `${i * 0.5}s` }"></div>
      </div>
      <div class="mist-layer"></div>
      <div class="cloud-layer">
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
      </div>
      <div class="ink-particles" ref="particleContainer"></div>
      <div class="firefly-container" ref="fireflyContainer"></div>
      <div class="petal-container" ref="petalContainer"></div>
      <div class="star-container" ref="starContainer"></div>
    </div>
    
    <div class="welcome-content">
      <header class="welcome-header">
        <div class="title-row">
          <div class="logo-wrapper">
            <div class="logo-glow"></div>
            <div class="logo-ring"></div>
            <img src="@/assets/images/logo/logo.png" alt="桥载千秋" class="logo-img" />
          </div>
          <div class="title-wrapper">
            <div class="title-decor-top">
              <span class="decor-line"></span>
              <span class="decor-diamond"></span>
              <span class="decor-dot"></span>
              <span class="decor-diamond"></span>
              <span class="decor-line"></span>
            </div>
            <div class="title-glow"></div>
            <h1 class="main-title">
              <span class="title-char" v-for="(char, index) in titleChars" :key="index" :style="{ animationDelay: `${index * 0.1}s` }" :class="{ 'space-char': char === ' ' }">
                {{ char === ' ' ? '\u00A0' : char }}
              </span>
            </h1>
            <div class="title-decor-bottom">
              <span class="decor-line"></span>
              <span class="decor-line"></span>
            </div>
            <p class="subtitle animate-fade-in" style="animation-delay: 0.9s;">
              <span class="subtitle-decor">『</span>
              中国古桥形制演变与地域特征的数据可视化设计
              <span class="subtitle-decor">』</span>
            </p>
            <p class="description animate-fade-in" style="animation-delay: 1.1s;">
              探索千年古桥的建筑智慧，领略中华文明的璀璨瑰宝
            </p>
            <div class="title-underline"></div>
          </div>
        </div>
      </header>

      <div class="enter-section animate-fade-in" style="animation-delay: 1.5s;">
        <div class="enter-hint">
          <span class="hint-text">轻触此处</span>
          <span class="hint-arrow">→</span>
          <span class="hint-text">开启古桥之旅</span>
        </div>
        <button class="enter-btn" @click="navigateTo('/main/dashboard')">
          <span class="btn-text">踏入桥境</span>
          <span class="btn-arrow">
            <span class="arrow-line"></span>
            <span class="arrow-head"></span>
          </span>
        </button>
        <div class="enter-poem">
          <span>千载古桥横碧水</span>
          <span class="poem-dot">·</span>
          <span>一脉文脉贯长虹</span>
        </div>
      </div>

      <div class="footer-decor">
        <div class="footer-line-left"></div>
        <div class="footer-content">
          <span class="footer-text">桥载千秋 · 形映山河</span>
        </div>
        <div class="footer-line-right"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const particleContainer = ref(null)
const fireflyContainer = ref(null)
const petalContainer = ref(null)
const starContainer = ref(null)
const isLeaving = ref(false)

const titleChars = computed(() => '桥载千秋・形映山河'.split(''))

const navigateTo = (path) => {
  isLeaving.value = true
  localStorage.setItem('bridgeMusicPlaying', 'true')
  setTimeout(() => {
    router.push(path)
  }, 250)
}

onMounted(() => {
  createInkParticles()
  createFireflies()
  createPetals()
  createStars()
})

const createInkParticles = () => {
  if (!particleContainer.value) return
  
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div')
    particle.className = 'ink-particle'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.animationDelay = Math.random() * 15 + 's'
    particle.style.animationDuration = (18 + Math.random() * 12) + 's'
    particle.style.width = (1 + Math.random() * 2) + 'px'
    particle.style.height = particle.style.width
    particleContainer.value.appendChild(particle)
  }
}

const createFireflies = () => {
  if (!fireflyContainer.value) return
  
  for (let i = 0; i < 8; i++) {
    const firefly = document.createElement('div')
    firefly.className = 'firefly'
    firefly.style.left = Math.random() * 100 + '%'
    firefly.style.top = Math.random() * 60 + 20 + '%'
    firefly.style.animationDelay = Math.random() * 5 + 's'
    firefly.style.animationDuration = (8 + Math.random() * 6) + 's'
    fireflyContainer.value.appendChild(firefly)
  }
}

const createPetals = () => {
  if (!petalContainer.value) return
  
  for (let i = 0; i < 15; i++) {
    const petal = document.createElement('div')
    petal.className = 'petal'
    petal.style.left = Math.random() * 100 + '%'
    petal.style.animationDelay = Math.random() * 20 + 's'
    petal.style.animationDuration = (15 + Math.random() * 10) + 's'
    petal.style.transform = `rotate(${Math.random() * 360}deg)`
    petalContainer.value.appendChild(petal)
  }
}

const createStars = () => {
  if (!starContainer.value) return
  
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div')
    star.className = 'star'
    star.style.left = Math.random() * 100 + '%'
    star.style.top = Math.random() * 40 + '%'
    star.style.animationDelay = Math.random() * 3 + 's'
    star.style.animationDuration = (2 + Math.random() * 2) + 's'
    star.style.width = (1 + Math.random() * 2) + 'px'
    star.style.height = star.style.width
    starContainer.value.appendChild(star)
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500;600&display=swap");

$ink-blue: #2C3E50;
$ink-green: #3D5A5A;
$bronze-gold: #B8860B;
$jade-green: #5B8C85;
$mist-white: rgba(255, 255, 255, 0.03);
$water-blue: rgba(70, 130, 150, 0.15);
$warm-white: rgba(245, 240, 230, 1);

.welcome-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Noto Sans SC', sans-serif;
  background: linear-gradient(180deg, 
    #080c10 0%, 
    #0f1619 20%, 
    #151d22 40%, 
    #121a1f 70%, 
    #0a0f12 100%
  );
}

.ink-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  
  .bg-noise {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
  
  .ink-wash-texture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.02;
    background: 
      radial-gradient(ellipse 80% 50% at 20% 30%, rgba(60, 80, 90, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 80% 20%, rgba(50, 70, 80, 0.25) 0%, transparent 50%),
      radial-gradient(ellipse 70% 45% at 50% 70%, rgba(55, 75, 85, 0.2) 0%, transparent 50%);
    animation: inkWashFlow 30s ease-in-out infinite;
  }
  
  .mountain-layer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: cover;
    background-repeat: repeat-x;
    
    &.mountain-far {
      height: 38%;
      background: linear-gradient(180deg, 
        transparent 0%,
        rgba(50, 65, 75, 0.2) 25%,
        rgba(40, 55, 65, 0.35) 60%,
        rgba(30, 45, 55, 0.5) 100%
      );
      animation: mountainFloat 80s ease-in-out infinite;
      filter: blur(1px);
    }
    
    &.mountain-mid {
      height: 30%;
      background: linear-gradient(180deg, 
        transparent 0%,
        rgba(45, 60, 70, 0.3) 35%,
        rgba(35, 50, 60, 0.5) 70%,
        rgba(25, 40, 50, 0.65) 100%
      );
      animation: mountainFloat 55s ease-in-out infinite reverse;
    }
    
    &.mountain-near {
      height: 22%;
      background: linear-gradient(180deg, 
        transparent 0%,
        rgba(35, 50, 60, 0.4) 40%,
        rgba(25, 40, 50, 0.6) 70%,
        rgba(15, 30, 40, 0.75) 100%
      );
    }
  }
  
  .bridge-silhouette {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 180px;
    opacity: 0.12;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 5%;
      width: 90%;
      height: 100%;
      background: 
        radial-gradient(ellipse 12% 100% at 15% 100%, $ink-green 0%, transparent 70%),
        radial-gradient(ellipse 12% 100% at 35% 100%, $ink-green 0%, transparent 70%),
        radial-gradient(ellipse 12% 100% at 55% 100%, $ink-green 0%, transparent 70%),
        radial-gradient(ellipse 12% 100% at 75% 100%, $ink-green 0%, transparent 70%),
        radial-gradient(ellipse 12% 100% at 95% 100%, $ink-green 0%, transparent 70%);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 25%;
      left: 0;
      width: 100%;
      height: 50%;
      border-radius: 50% 50% 0 0 / 100% 100% 0 0;
      background: linear-gradient(180deg, 
        transparent 0%, 
        rgba(70, 100, 110, 0.25) 50%,
        rgba(60, 90, 100, 0.35) 100%
      );
      box-shadow: 
        0 -8px 40px rgba(60, 90, 100, 0.15),
        inset 0 15px 40px rgba(70, 100, 110, 0.1);
    }
  }
  
  .water-ripple {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 18%;
    background: linear-gradient(180deg, 
      transparent 0%,
      rgba(60, 100, 120, 0.08) 30%,
      rgba(50, 90, 110, 0.15) 60%,
      rgba(40, 80, 100, 0.2) 100%
    );
    overflow: hidden;
    
    .ripple-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(150, 180, 190, 0.15) 20%,
        rgba(180, 200, 210, 0.25) 50%,
        rgba(150, 180, 190, 0.15) 80%,
        transparent 100%
      );
      animation: rippleWave 4s ease-in-out infinite;
      
      &:nth-child(1) { top: 20%; }
      &:nth-child(2) { top: 40%; }
      &:nth-child(3) { top: 60%; }
      &:nth-child(4) { top: 80%; }
      &:nth-child(5) { top: 95%; }
    }
  }
  
  .mist-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse 100% 60% at 15% 85%, rgba(200, 210, 220, 0.04) 0%, transparent 50%),
      radial-gradient(ellipse 80% 50% at 85% 75%, rgba(190, 200, 210, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 50% 90%, rgba(180, 190, 200, 0.025) 0%, transparent 50%);
    animation: mistFloat 25s ease-in-out infinite;
  }
  
  .cloud-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    
    .cloud {
      position: absolute;
      background: radial-gradient(ellipse, rgba(180, 190, 200, 0.03) 0%, transparent 70%);
      border-radius: 50%;
      animation: cloudFloat 60s ease-in-out infinite;
      
      &.cloud-1 {
        width: 300px;
        height: 100px;
        top: 15%;
        left: -5%;
        animation-delay: 0s;
      }
      
      &.cloud-2 {
        width: 250px;
        height: 80px;
        top: 25%;
        right: -5%;
        animation-delay: -20s;
        animation-direction: reverse;
      }
      
      &.cloud-3 {
        width: 200px;
        height: 60px;
        top: 35%;
        left: 30%;
        animation-delay: -40s;
      }
    }
  }
  
  .ink-particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    
    .ink-particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: radial-gradient(circle, rgba(220, 200, 170, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      animation: particleFloat 25s ease-in-out infinite;
    }
  }
  
  .firefly-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    
    .firefly {
      position: absolute;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(255, 230, 150, 0.9) 0%, rgba(255, 200, 100, 0.4) 40%, transparent 70%);
      border-radius: 50%;
      animation: fireflyFloat 10s ease-in-out infinite;
      box-shadow: 0 0 10px rgba(255, 220, 120, 0.5);
    }
  }
  
  .petal-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    
    .petal {
      position: absolute;
      width: 8px;
      height: 8px;
      background: radial-gradient(ellipse at 30% 30%, rgba(255, 200, 200, 0.6) 0%, rgba(255, 180, 180, 0.3) 50%, transparent 70%);
      border-radius: 50% 0 50% 50%;
      animation: petalFall 20s ease-in-out infinite;
      opacity: 0.4;
    }
  }
  
  .star-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    
    .star {
      position: absolute;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
      border-radius: 50%;
      animation: starTwinkle 3s ease-in-out infinite;
    }
  }
}

@keyframes mountainFloat {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-30px); }
}

@keyframes inkWashFlow {
  0%, 100% { 
    opacity: 0.02;
    transform: scale(1) translate(0, 0);
  }
  50% { 
    opacity: 0.03;
    transform: scale(1.05) translate(10px, -5px);
  }
}

@keyframes cloudFloat {
  0%, 100% { 
    transform: translateX(0);
    opacity: 0.5;
  }
  50% { 
    transform: translateX(100px);
    opacity: 0.8;
  }
}

@keyframes rippleWave {
  0%, 100% { 
    transform: translateX(-5%);
    opacity: 0.3;
  }
  50% { 
    transform: translateX(5%);
    opacity: 0.6;
  }
}

@keyframes mistFloat {
  0%, 100% { 
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
  50% { 
    opacity: 0.6;
    transform: translateX(40px) translateY(-10px);
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: 0.6;
  }
  95% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-50px) translateX(20px) rotate(180deg);
    opacity: 0;
  }
}

@keyframes fireflyFloat {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -20px);
    opacity: 0.8;
  }
  50% {
    transform: translate(-20px, -40px);
    opacity: 0.4;
  }
  75% {
    transform: translate(15px, -10px);
    opacity: 0.9;
  }
}

@keyframes petalFall {
  0% {
    transform: translateY(-10px) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(100vh) translateX(100px) rotate(720deg);
    opacity: 0;
  }
}

@keyframes starTwinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

.welcome-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 50px 20px;
  justify-content: center;
}

.welcome-header {
  text-align: center;
  margin-bottom: 35px;
  margin-top: 0;
  
  .title-row {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
  
  .logo-wrapper {
    position: absolute;
    right: calc(50% + 360px);
    
    .logo-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 240px;
      height: 240px;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
      animation: logoGlow 4s ease-in-out infinite;
    }
    
    .logo-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 280px;
      height: 280px;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(212, 175, 55, 0.15);
      border-radius: 50%;
      animation: logoRingRotate 20s linear infinite;
      
      &::before {
        content: '';
        position: absolute;
        top: -3px;
        left: 50%;
        width: 6px;
        height: 6px;
        background: rgba(212, 175, 55, 0.5);
        border-radius: 50%;
        transform: translateX(-50%);
      }
    }
    
    .logo-img {
      position: relative;
      width: 260px;
      height: 260px;
      object-fit: contain;
      filter: drop-shadow(0 0 30px rgba(184, 134, 11, 0.4));
      animation: logoFloat 6s ease-in-out infinite;
    }
  }
  
  .title-wrapper {
    text-align: center;
    max-width: 620px;
    position: relative;
  }
  
  .title-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 100px;
    transform: translate(-50%, -50%);
    background: radial-gradient(ellipse, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  
  .title-decor-top,
  .title-decor-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 8px;
    
    .decor-line {
      width: 60px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
    }
    
    .decor-dot {
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, transparent 70%);
      border-radius: 50%;
    }
    
    .decor-diamond {
      width: 6px;
      height: 6px;
      background: rgba(212, 175, 55, 0.5);
      transform: rotate(45deg);
    }
    
    .decor-seal {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(180, 80, 70, 0.5);
      border-radius: 3px;
      font-family: 'Noto Serif SC', serif;
      background: rgba(180, 80, 70, 0.08);
      position: relative;
      
      .seal-text {
        font-size: 13px;
        color: rgba(180, 80, 70, 0.8);
      }
      
      &::before,
      &::after {
        content: '';
        position: absolute;
        background: rgba(180, 80, 70, 0.3);
      }
      
      &::before {
        width: 100%;
        height: 1px;
        top: 50%;
        left: 0;
      }
      
      &::after {
        width: 1px;
        height: 100%;
        left: 50%;
        top: 0;
      }
    }
  }
  
  .title-decor-bottom {
    margin-top: 8px;
    margin-bottom: 0;
  }
  
  .main-title {
    font-family: 'Noto Serif SC', serif;
    font-size: 56px;
    font-weight: 700;
    margin: 0;
    letter-spacing: 18px;
    position: relative;
    white-space: nowrap;
    
    .title-char {
      display: inline-block;
      background: linear-gradient(135deg, #E8D5A3 0%, #D4AF37 30%, #F5E6C8 50%, #B8860B 70%, #C9A961 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: charAppear 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(25px);
      position: relative;
      text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:hover::after {
        opacity: 1;
      }
      
      &.space-char {
        width: 28px;
      }
    }
  }
  
  .subtitle {
    font-size: 20px;
    color: rgba(230, 220, 200, 0.85);
    margin: 16px 0 10px 0;
    letter-spacing: 6px;
    font-family: 'Noto Serif SC', serif;
    white-space: nowrap;
    
    .subtitle-decor {
      color: rgba(212, 175, 55, 0.5);
      margin: 0 10px;
    }
  }
  
  .description {
    font-size: 15px;
    color: rgba(200, 190, 170, 0.6);
    margin: 0;
    letter-spacing: 4px;
  }
  
  .title-underline {
    width: 200px;
    height: 1px;
    margin: 15px auto 0;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
    animation: underlineGlow 3s ease-in-out infinite;
  }
}

@keyframes logoGlow {
  0%, 100% { 
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes logoRingRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(0.5deg); }
}

@keyframes underlineGlow {
  0%, 100% { 
    opacity: 0.5;
    width: 200px;
  }
  50% { 
    opacity: 1;
    width: 250px;
  }
}

@keyframes charAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.enter-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 20px;
}

.enter-hint {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(200, 190, 170, 0.5);
  font-size: 14px;
  letter-spacing: 2px;
  font-family: 'Noto Serif SC', serif;
  
  .hint-text {
    opacity: 0.7;
  }
  
  .hint-arrow {
    color: rgba(212, 175, 55, 0.6);
    animation: arrowMove 1.5s ease-in-out infinite;
  }
}

@keyframes arrowMove {
  0%, 100% {
    transform: translateX(0);
    opacity: 0.6;
  }
  50% {
    transform: translateX(5px);
    opacity: 1;
  }
}

.enter-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  
  .btn-text {
    font-size: 18px;
    font-weight: 500;
    color: rgba(230, 210, 170, 0.85);
    letter-spacing: 6px;
    font-family: 'Noto Serif SC', serif;
    white-space: nowrap;
    transition: all 0.4s ease;
  }
  
  .btn-arrow {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 24px;
    height: 50px;
    
    .arrow-line {
      width: 2px;
      height: 18px;
      background: linear-gradient(180deg, rgba(212, 175, 55, 0.6), rgba(212, 175, 55, 0.9));
      border-radius: 1px;
      transition: all 0.4s ease;
      box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
    }
    
    .arrow-head {
      position: absolute;
      bottom: 0;
      width: 14px;
      height: 14px;
      border-right: 2px solid rgba(212, 175, 55, 0.9);
      border-bottom: 2px solid rgba(212, 175, 55, 0.9);
      transform: rotate(45deg);
      transition: all 0.4s ease;
      box-shadow: 2px 2px 8px rgba(212, 175, 55, 0.3);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
    transition: all 0.4s ease;
  }
  
  &:hover {
    .btn-text {
      color: rgba(245, 225, 185, 1);
      text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
    }
    
    .btn-arrow {
      .arrow-line {
        height: 26px;
        background: linear-gradient(180deg, rgba(212, 175, 55, 0.8), rgba(255, 215, 0, 1));
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
      }
      
      .arrow-head {
        border-color: rgba(255, 215, 0, 1);
        box-shadow: 3px 3px 15px rgba(212, 175, 55, 0.5);
      }
    }
    
    &::before {
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.7), transparent);
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.enter-poem {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(180, 170, 150, 0.4);
  font-size: 13px;
  letter-spacing: 3px;
  font-family: 'Noto Serif SC', serif;
  margin-top: 10px;
  
  .poem-dot {
    color: rgba(212, 175, 55, 0.4);
  }
}

.footer-decor {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 15px;
  
  .footer-line-left,
  .footer-line-right {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
  }
  
  .footer-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .footer-seal {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: rgba(180, 80, 70, 0.5);
    border: 1px solid rgba(180, 80, 70, 0.3);
    border-radius: 2px;
    font-family: 'Noto Serif SC', serif;
  }
  
  .footer-text {
    font-size: 11px;
    color: rgba(180, 170, 150, 0.35);
    letter-spacing: 8px;
    font-family: 'Noto Serif SC', serif;
  }
}

@media (max-width: 1400px) {
  .welcome-header {
    .logo-wrapper {
      right: calc(50% + 280px);
      
      .logo-img {
        width: 200px;
        height: 200px;
      }
      
      .logo-glow {
        width: 180px;
        height: 180px;
      }
    }
    
    .main-title {
      font-size: 48px;
      letter-spacing: 14px;
      white-space: nowrap;
    }
  }
  
  .enter-section {
    margin-top: 40px;
  }
}

@media (max-width: 768px) {
  .welcome-content {
    padding: 15px 25px;
  }
  
  .welcome-header {
    .title-row {
      flex-direction: column;
      min-height: auto;
    }
    
    .logo-wrapper {
      position: relative;
      right: auto;
      margin-bottom: 12px;
      
      .logo-img {
        width: 150px;
        height: 150px;
      }
      
      .logo-glow {
        width: 140px;
        height: 140px;
      }
    }
    
    .main-title {
      font-size: 32px;
      letter-spacing: 8px;
      white-space: nowrap;
    }
    
    .subtitle {
      font-size: 14px;
      letter-spacing: 3px;
      white-space: nowrap;
    }
    
    .title-decor-top .decor-line,
    .title-decor-bottom .decor-line {
      width: 40px;
    }
  }
  
  .enter-section {
    margin-top: 30px;
    gap: 15px;
  }
  
  .enter-btn {
    padding: 10px 16px;
    
    .btn-text {
      font-size: 15px;
      letter-spacing: 4px;
    }
    
    .btn-arrow {
      height: 40px;
      
      .arrow-line {
        height: 14px;
      }
      
      .arrow-head {
        width: 12px;
        height: 12px;
      }
    }
  }
  
  .enter-poem {
    font-size: 12px;
  }
  
  .footer-decor {
    display: none;
  }
}

.welcome-container.leaving {
  animation: pageLeave 0.25s ease-in-out forwards;
  
  .welcome-content {
    animation: contentFadeOut 0.2s ease-in-out forwards;
  }
  
  .ink-bg {
    animation: bgZoomOut 0.25s ease-in-out forwards;
  }
}

@keyframes pageLeave {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes contentFadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

@keyframes bgZoomOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.05);
    opacity: 0;
  }
}
</style>
