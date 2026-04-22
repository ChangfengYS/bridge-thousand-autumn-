<template>
  <Teleport to="body">
    <Transition name="panel-fade">
      <div v-if="visible" class="province-panel-overlay" @click="close">
        <div class="province-panel" @click.stop>
          <div class="panel-decoration">
            <div class="deco-corner deco-corner-tl"></div>
            <div class="deco-corner deco-corner-tr"></div>
            <div class="deco-corner deco-corner-bl"></div>
            <div class="deco-corner deco-corner-br"></div>
          </div>
          
          <div class="panel-header">
            <div class="header-ornament"></div>
            <div class="header-content">
              <div class="province-title">
                <span class="title-main">{{ provinceData?.title || provinceName }}</span>
                <span class="title-sub">{{ provinceData?.subtitle || '' }}</span>
              </div>
              <button class="close-btn" @click="close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="panel-body">
            <div class="section overview-section">
              <h3 class="section-title">
                <span class="title-deco"></span>
                历史背景
              </h3>
              <p class="section-content">{{ provinceData?.history || '暂无数据' }}</p>
            </div>
            
            <div class="section features-section">
              <h3 class="section-title">
                <span class="title-deco"></span>
                建造特色
              </h3>
              <div class="feature-list">
                <div 
                  v-for="(feature, index) in provinceData?.features" 
                  :key="index" 
                  class="feature-item"
                  :style="{ animationDelay: index * 0.05 + 's' }"
                >
                  <span class="feature-text">{{ feature }}</span>
                </div>
              </div>
            </div>
            
            <div class="section representatives-section">
              <h3 class="section-title">
                <span class="title-deco"></span>
                代表桥梁
              </h3>
              <div class="representative-list">
                <div 
                  v-for="(bridge, index) in provinceData?.representatives" 
                  :key="index" 
                  class="representative-card"
                >
                  <div class="card-glow"></div>
                  <div class="card-header">
                    <span class="bridge-name">{{ bridge.name }}</span>
                    <span class="bridge-dynasty">{{ bridge.dynasty }}</span>
                  </div>
                  <div class="card-info">
                    <span class="info-item">跨度: {{ bridge.span }}</span>
                  </div>
                  <p class="card-desc">{{ bridge.description }}</p>
                </div>
              </div>
            </div>
            
            <div class="section stories-section" v-if="provinceData?.stories?.length">
              <h3 class="section-title">
                <span class="title-deco story-deco"></span>
                历史典故
              </h3>
              <div class="story-list">
                <div 
                  v-for="(story, index) in provinceData?.stories" 
                  :key="index" 
                  class="story-item"
                >
                  <div class="story-quote">"</div>
                  <h4 class="story-title">{{ story.title }}</h4>
                  <p class="story-content">{{ story.content }}</p>
                </div>
              </div>
            </div>
            
            <div class="section culture-section">
              <h3 class="section-title">文化价值</h3>
              <p class="section-content">{{ provinceData?.culture || '暂无数据' }}</p>
            </div>
            
            <div class="info-bar">
              <div class="info-item">
                <span class="info-label">古桥数量</span>
                <span class="info-value">{{ provinceData?.count || 0 }}<small>座</small></span>
              </div>
              <div class="info-item">
                <span class="info-label">主要朝代</span>
                <span class="info-value">{{ provinceData?.mainDynasty || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">主要桥型</span>
                <span class="info-value">{{ provinceData?.mainType || '-' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import provinceCultureData from '@/assets/data/province_culture.json'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  provinceName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'update:visible'])
const router = useRouter()

const provinceData = computed(() => {
  return provinceCultureData.provinces[props.provinceName] || null
})

const close = () => {
  emit('close')
  emit('update:visible', false)
}

// const goToBridge = (bridgeName) => {
//   close()
//   router.push({
//     path: '/province',
//     query: { bridge: bridgeName }
//   })
// }

watch(() => props.visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style lang="scss" scoped>
.province-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10004;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.province-panel {
  position: relative;
  width: 100%;
  max-width: 720px;
  max-height: 88vh;
  background: linear-gradient(160deg, rgba(22, 22, 22, 0.99) 0%, rgba(28, 28, 28, 0.98) 50%, rgba(32, 28, 24, 0.99) 100%);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(212, 175, 55, 0.1) inset,
    0 0 60px rgba(212, 175, 55, 0.08);
  will-change: transform, opacity;
  transform: translateZ(0);
}

.panel-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  
  .deco-corner {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(212, 175, 55, 0.2);
    
    &.deco-corner-tl {
      top: 12px;
      left: 12px;
      border-right: none;
      border-bottom: none;
      border-radius: 8px 0 0 0;
    }
    
    &.deco-corner-tr {
      top: 12px;
      right: 12px;
      border-left: none;
      border-bottom: none;
      border-radius: 0 8px 0 0;
    }
    
    &.deco-corner-bl {
      bottom: 12px;
      left: 12px;
      border-right: none;
      border-top: none;
      border-radius: 0 0 0 8px;
    }
    
    &.deco-corner-br {
      bottom: 12px;
      right: 12px;
      border-left: none;
      border-top: none;
      border-radius: 0 0 8px 0;
    }
  }
}

.panel-header {
  position: relative;
  padding: 28px 28px 20px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.12);
  
  .header-ornament {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent);
    border-radius: 0 0 2px 2px;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.province-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  .title-main {
    font-size: 26px;
    font-weight: 700;
    color: #C9A961;
    font-family: 'Noto Serif SC', serif;
    letter-spacing: 3px;
    text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
  }
  
  .title-sub {
    font-size: 13px;
    color: rgba(232, 228, 216, 0.5);
    letter-spacing: 2px;
    font-weight: 300;
  }
}

.close-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  
  svg {
    width: 18px;
    height: 18px;
    color: rgba(212, 175, 55, 0.7);
    transition: all 0.25s ease;
  }
  
  &:hover {
    background: rgba(184, 66, 58, 0.15);
    border-color: rgba(184, 66, 58, 0.3);
    transform: rotate(90deg);
    
    svg {
      color: #B8423A;
    }
  }
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(212, 175, 55, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.3), rgba(184, 66, 58, 0.2));
    border-radius: 3px;
    
    &:hover {
      background: linear-gradient(180deg, rgba(212, 175, 55, 0.5), rgba(184, 66, 58, 0.3));
    }
  }
}

.section {
  margin-bottom: 28px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #C9A961;
  margin: 0 0 14px;
  font-family: 'Noto Serif SC', serif;
  letter-spacing: 1px;
  
  .title-deco {
    width: 4px;
    height: 18px;
    background: linear-gradient(180deg, #C9A961, rgba(184, 66, 58, 0.6));
    border-radius: 2px;
    
    &.story-deco {
      background: linear-gradient(180deg, #5B8C85, rgba(91, 140, 133, 0.4));
    }
  }
}

.section-content {
  font-size: 14px;
  color: rgba(232, 228, 216, 0.8);
  line-height: 1.9;
  margin: 0;
  text-align: justify;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.06) 0%, rgba(212, 175, 55, 0.02) 100%);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.04) 100%);
    border-color: rgba(212, 175, 55, 0.25);
    transform: translateY(-2px);
  }
  
  .feature-text {
    font-size: 13px;
    color: rgba(232, 228, 216, 0.85);
    line-height: 1.5;
  }
}

.representative-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.representative-card {
  position: relative;
  padding: 16px 18px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.06) 0%, rgba(184, 66, 58, 0.03) 100%);
  border: 1px solid rgba(212, 175, 55, 0.12);
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  
  .card-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.35);
    box-shadow: 0 6px 25px rgba(212, 175, 55, 0.12);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .bridge-name {
    font-size: 16px;
    font-weight: 600;
    color: #C9A961;
    font-family: 'Noto Serif SC', serif;
    letter-spacing: 1px;
  }
  
  .bridge-dynasty {
    font-size: 11px;
    color: rgba(232, 228, 216, 0.7);
    padding: 3px 10px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.08));
    border-radius: 12px;
    border: 1px solid rgba(212, 175, 55, 0.15);
  }
  
  .card-info {
    margin-bottom: 10px;
    
    .info-item {
      font-size: 12px;
      color: rgba(232, 228, 216, 0.5);
    }
  }
  
  .card-desc {
    font-size: 13px;
    color: rgba(232, 228, 216, 0.7);
    line-height: 1.7;
    margin: 0;
  }
}

.story-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.story-item {
  position: relative;
  padding: 18px 20px;
  background: linear-gradient(135deg, rgba(91, 140, 133, 0.08) 0%, rgba(91, 140, 133, 0.03) 100%);
  border-radius: 12px;
  border-left: 3px solid #5B8C85;
  
  .story-quote {
    position: absolute;
    top: 8px;
    left: 16px;
    font-size: 40px;
    color: rgba(91, 140, 133, 0.15);
    font-family: Georgia, serif;
    line-height: 1;
  }
  
  .story-title {
    font-size: 15px;
    font-weight: 600;
    color: #7FB5AC;
    margin: 0 0 12px;
    font-family: 'Noto Serif SC', serif;
    letter-spacing: 1px;
  }
  
  .story-content {
    font-size: 13px;
    color: rgba(232, 228, 216, 0.75);
    line-height: 1.9;
    margin: 0;
    text-align: justify;
  }
}

.info-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
  
  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 18px 12px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(184, 66, 58, 0.05) 100%);
    border: 1px solid rgba(212, 175, 55, 0.12);
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: rgba(212, 175, 55, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
    
    .info-label {
      font-size: 12px;
      color: rgba(232, 228, 216, 0.5);
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    
    .info-value {
      font-size: 22px;
      font-weight: 700;
      color: #C9A961;
      font-family: 'Noto Serif SC', serif;
      
      small {
        font-size: 13px;
        font-weight: 400;
        margin-left: 2px;
        opacity: 0.7;
      }
    }
  }
}

.panel-fade-enter-active {
  animation: panelIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.panel-fade-leave-active {
  animation: panelOut 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes panelIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes panelOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.panel-fade-enter-active .province-panel {
  animation: panelSlideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.panel-fade-leave-active .province-panel {
  animation: panelSlideOut 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes panelSlideIn {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes panelSlideOut {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
}

@media (max-width: 768px) {
  .province-panel {
    max-width: 95%;
    max-height: 90vh;
    border-radius: 16px;
  }
  
  .panel-header {
    padding: 20px;
  }
  
  .province-title .title-main {
    font-size: 22px;
  }
  
  .panel-body {
    padding: 18px 20px;
  }
  
  .feature-list {
    grid-template-columns: 1fr;
  }
  
  .info-bar {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
