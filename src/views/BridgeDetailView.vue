﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="bridge-detail-container">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20,11H7.83L13.42,5.41L12,4L4,12L12,20L13.41,18.59L7.83,13H20V11Z"/>
        </svg>
        返回
      </button>
      <div class="header-title">
        <h1>{{ bridge?.name }}</h1>
        <p class="alias" v-if="bridge?.alias">{{ bridge.alias }}</p>
      </div>
    </div>

    <div class="detail-content" v-if="bridge">
      <div class="main-layout">
        <div class="image-section">
          <img 
            :src="getBridgeImage(bridge.name)" 
            :alt="bridge.name"
            class="bridge-image"
            @error="handleImageError"
          />
          <div class="image-overlay" v-if="imageError">
            <div class="bridge-icon-fallback"><component :is="getIcon('bridge')" /></div>
          </div>
          <div class="corner-decoration top-left"></div>
          <div class="corner-decoration top-right"></div>
          <div class="corner-decoration bottom-left"></div>
          <div class="corner-decoration bottom-right"></div>
          <div class="protection-badge" :class="bridge.protectionLevel">
            {{ bridge.protectionLevel }}
          </div>
          <a 
            :href="getBaiduBaikeUrl(bridge.name)" 
            target="_blank" 
            rel="noopener noreferrer"
            class="baike-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="link-icon">
              <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
            </svg>
            百度百科
          </a>
        </div>
        
        <div class="right-content-wrapper">
          <div class="right-info-section">
            <div class="basic-info-card">
              <div class="info-row">
                <div class="info-item">
                  <span class="info-icon"><component :is="getIcon('location')" /></span>
                  <div class="info-content">
                    <span class="info-label">所在地</span>
                    <span class="info-value">{{ bridge.province }} {{ bridge.city }} {{ bridge.county }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-icon"><component :is="getIcon('calendar')" /></span>
                  <div class="info-content">
                    <span class="info-label">建造年代</span>
                    <span class="info-value">{{ bridge.dynasty }}代 ({{ bridge.buildYear }}年)</span>
                  </div>
                </div>
              </div>
              <div class="info-row">
                <div class="info-item">
                  <span class="info-icon"><component :is="getIcon('build')" /></span>
                  <div class="info-content">
                    <span class="info-label">桥型</span>
                    <span class="info-value">{{ bridge.bridgeType }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-icon"><component :is="getIcon('material')" /></span>
                  <div class="info-content">
                    <span class="info-label">材质</span>
                    <span class="info-value">{{ bridge.material }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="stats-row">
              <div class="stat-card">
                <div class="stat-icon"><component :is="getIcon('ruler')" /></div>
                <div class="stat-value">{{ bridge.span }}</div>
                <div class="stat-label">跨度(米)</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon"><component :is="getIcon('floor')" /></div>
                <div class="stat-value">{{ bridge.archCount }}</div>
                <div class="stat-label">孔数</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon"><component :is="getIcon('target')" /></div>
                <div class="stat-value">{{ bridge.function }}</div>
                <div class="stat-label">功能</div>
              </div>
              <div class="stat-card" v-if="bridge.worldHeritage">
                <div class="stat-icon"><component :is="getIcon('star2')" /></div>
                <div class="stat-value">是</div>
                <div class="stat-label">世界遗产</div>
              </div>
            </div>
            
            <div class="description-card">
              <h3>建筑简介</h3>
              <p>{{ bridge.description }}</p>
            </div>
          </div>

          <div class="story-features-row">
            <div class="story-card" v-if="bridge.story">
              <h3><component :is="getIcon('book2')" /> 历史故事</h3>
              <div class="story-content">
                <p>{{ bridge.story }}</p>
              </div>
            </div>

            <div class="features-card" v-if="bridge.features?.length">
              <h3>建筑特色</h3>
              <div class="features-list">
                <div class="feature-tag" v-for="feature in bridge.features" :key="feature">
                  {{ feature }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-section">
          <div class="info-card-small">
            <h3><component :is="getIcon('location')" /> 地理位置</h3>
            <div class="location-info">
              <div class="coordinates">
                <span class="label">经度:</span>
                <span class="value">{{ bridge.location[0] }}°E</span>
              </div>
              <div class="coordinates">
                <span class="label">纬度:</span>
                <span class="value">{{ bridge.location[1] }}°N</span>
              </div>
            </div>
          </div>

          <div class="info-card-small" v-if="bridge.heritageYear">
            <h3>🛡️ 保护信息</h3>
            <div class="protection-detail">
              <div class="protection-item">
                <span class="label">保护级别:</span>
                <span class="value">{{ bridge.protectionLevel }}</span>
              </div>
              <div class="protection-item">
                <span class="label">入选年份:</span>
                <span class="value">{{ bridge.heritageYear }}年</span>
              </div>
            </div>
          </div>

          <div class="info-card-small scores-mini" v-if="bridge.tourismRating">
            <h3><component :is="getIcon('chart')" /> 综合评分</h3>
            <div class="mini-scores">
              <div class="mini-score-item">
                <span class="mini-label">旅游热度</span>
                <span class="mini-value">{{ bridge.tourismRating }}/5.0</span>
              </div>
              <div class="mini-score-item">
                <span class="mini-label">文化价值</span>
                <span class="mini-value">{{ bridge.culturalValue }}/100</span>
              </div>
              <div class="mini-score-item">
                <span class="mini-label">建筑艺术</span>
                <span class="mini-value">{{ bridge.architectureScore }}/100</span>
              </div>
              <div class="mini-score-item">
                <span class="mini-label">年游客量</span>
                <span class="mini-value">{{ bridge.visitorCount }}万</span>
              </div>
            </div>
          </div>
        </div>

        <div class="renovation-card full-width" v-if="bridge.renovationHistory?.length">
          <h3><component :is="getIcon('wrench')" /> 修缮历史</h3>
          <div class="renovation-timeline">
            <div class="timeline-item" v-for="(item, index) in bridge.renovationHistory" :key="index">
              <div class="timeline-dot"></div>
              <div class="timeline-content">{{ item }}</div>
            </div>
          </div>
        </div>
    </div>

    <div class="loading-state" v-else>
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BridgesData from '@/assets/data/bridges.json'

const IconBridge = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M2 20h20', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      h('path', { d: 'M2 16h20', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
      h('path', { d: 'M4 16v4M8 16v4M12 16v4M16 16v4M20 16v4', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M2 16 Q7 8, 12 16 Q17 8, 22 16', stroke: 'currentColor', 'stroke-width': 2, fill: 'none' }),
      h('path', { d: 'M12 8v8', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.5 }),
      h('circle', { cx: 12, cy: 7, r: 1.5, fill: 'currentColor' })
    ])
  }
}

const IconLocation = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('circle', { cx: 12, cy: 10, r: 3, stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.3 })
    ])
  }
}

const IconCalendar = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M16 2v4M8 2v4M3 10h18', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('rect', { x: 7, y: 14, width: 3, height: 3, fill: 'currentColor', opacity: 0.4 })
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

const IconMaterial = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('rect', { x: 4, y: 4, width: 16, height: 16, rx: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M4 10h16M10 4v16', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.5 }),
      h('rect', { x: 6, y: 6, width: 4, height: 4, fill: 'currentColor', opacity: 0.4 }),
      h('rect', { x: 14, y: 14, width: 4, height: 4, fill: 'currentColor', opacity: 0.4 })
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

const IconFloor = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('rect', { x: 4, y: 2, width: 16, height: 20, rx: 1, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M4 7h16M4 12h16M4 17h16', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.5 }),
      h('rect', { x: 8, y: 4, width: 3, height: 3, fill: 'currentColor', opacity: 0.3 }),
      h('rect', { x: 13, y: 9, width: 3, height: 3, fill: 'currentColor', opacity: 0.3 })
    ])
  }
}

const IconChart = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M3 9h18M9 21V9', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.5 })
    ])
  }
}

const IconStar = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('polygon', { points: '12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.3 })
    ])
  }
}

const IconTarget = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('circle', { cx: 12, cy: 12, r: 10, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('circle', { cx: 12, cy: 12, r: 6, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('circle', { cx: 12, cy: 12, r: 2, fill: 'currentColor' })
    ])
  }
}

const IconStar2 = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('polygon', { points: '12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.5 }),
      h('path', { d: 'M12 6l1.5 4.5L18 12l-4.5 1.5L12 18l-1.5-4.5L6 12l4.5-1.5L12 6z', fill: '#fff', opacity: 0.3 })
    ])
  }
}

const IconBook2 = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M8 7h8M8 11h6M8 15h4', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', opacity: 0.6 })
    ])
  }
}

const IconWrench = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z', stroke: 'currentColor', 'stroke-width': 1.5 })
    ])
  }
}

const IconArt = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('circle', { cx: 13.5, cy: 6.5, r: 2.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M17 17l-5-5-7 7', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M3 14l4-4 5 5', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.5 })
    ])
  }
}

const iconMap = {
  bridge: IconBridge,
  location: IconLocation,
  calendar: IconCalendar,
  build: IconBuild,
  material: IconMaterial,
  ruler: IconRuler,
  floor: IconFloor,
  chart: IconChart,
  star: IconStar,
  target: IconTarget,
  star2: IconStar2,
  book2: IconBook2,
  wrench: IconWrench,
  art: IconArt
}

const getIcon = (name) => iconMap[name] || IconBridge

const route = useRoute()
const router = useRouter()
const bridge = ref(null)
const imageError = ref(false)

const bridgeImages = import.meta.glob('../assets/image/*.png', { eager: true, import: 'default' })

const bridgeImageMap = {
  '赵州桥': bridgeImages['../assets/image/zhaozhou-bridge.png'],
  '卢沟桥': bridgeImages['../assets/image/lugou-bridge.png'],
  '洛阳桥': bridgeImages['../assets/image/luoyang-bridge.png'],
  '广济桥': bridgeImages['../assets/image/guangji-bridge.png'],
  '安平桥': bridgeImages['../assets/image/anping-bridge.png'],
  '五亭桥': bridgeImages['../assets/image/wuting-bridge.png'],
  '十七孔桥': bridgeImages['../assets/image/shiqikong-bridge.png'],
  '宝带桥': bridgeImages['../assets/image/baodai-bridge.png'],
  '放生桥': bridgeImages['../assets/image/fangsheng-bridge.png'],
  '泸定桥': bridgeImages['../assets/image/luding-bridge.png'],
  '盘江桥': bridgeImages['../assets/image/panjiang-bridge.png'],
  '程阳永济桥': bridgeImages['../assets/image/chengyang-bridge.png'],
  '霁虹桥': bridgeImages['../assets/image/jihong-bridge.png'],
  '风雨桥': bridgeImages['../assets/image/fengyu-bridge.png'],
  '鱼沼飞梁': bridgeImages['../assets/image/yuzhao-bridge.png'],
}

const defaultImage = bridgeImages['../assets/image/zhaozhou-bridge.png']

const goBack = () => {
  router.back()
}

const getBridgeImage = (name) => {
  return bridgeImageMap[name] || defaultImage
}

const handleImageError = () => {
  imageError.value = true
}

const getBaiduBaikeUrl = (name) => {
  const baikeMap = {
    '赵州桥': '赵州桥',
    '卢沟桥': '卢沟桥',
    '洛阳桥': '洛阳桥',
    '广济桥': '广济桥',
    '安平桥': '安平桥',
  }
  const baikeName = baikeMap[name] || name
  return `https://baike.baidu.com/item/${encodeURIComponent(baikeName)}`
}

onMounted(() => {
  const bridgeId = route.params.id
  const found = BridgesData.bridges.find(b => b.id === bridgeId)
  if (found) {
    bridge.value = found
  }
})
</script>

<style lang="scss" scoped>
.bridge-detail-container {
  padding: 20px;
  min-height: calc(100vh - 40px);
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 30%, #1F1F1F 50%, #1A1A1A 70%, #0D0D0D 100%);
  border-radius: 12px;
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

.detail-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.25);
  position: relative;
  z-index: 1;

  .back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(197, 61, 67, 0.1));
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 12px;
    color: #E8E4D8;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(197, 61, 67, 0.2));
      border-color: #C9A961;
      transform: translateY(-2px);
    }
  }

  .header-title {
    h1 {
      font-size: 28px;
      font-weight: 600;
      color: #E8E4D8;
      margin: 0;
      letter-spacing: 2px;
    }

    .alias {
      font-size: 14px;
      color: rgba(212, 175, 55, 0.8);
      margin: 4px 0 0;
    }
  }
}

.detail-content {
  position: relative;
  z-index: 1;
}

.main-layout {
  display: grid;
  grid-template-columns: 958px 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.image-section {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9));
  border: 1px solid rgba(212, 175, 55, 0.2);

  .bridge-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  &::before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.95));

    .bridge-icon-fallback {
      width: 80px;
      height: 80px;
      color: rgba(212, 175, 55, 0.5);
    }
  }

  .corner-decoration {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 2px solid rgba(212, 175, 55, 0.4);

    &.top-left {
      top: 10px;
      left: 10px;
      border-right: none;
      border-bottom: none;
    }

    &.top-right {
      top: 10px;
      right: 10px;
      border-left: none;
      border-bottom: none;
    }

    &.bottom-left {
      bottom: 10px;
      left: 10px;
      border-right: none;
      border-top: none;
    }

    &.bottom-right {
      bottom: 10px;
      right: 10px;
      border-left: none;
      border-top: none;
    }
  }

  .protection-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    backdrop-filter: blur(5px);

    &.国保 {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(197, 61, 67, 0.2));
      border: 1px solid rgba(212, 175, 55, 0.5);
      color: #C9A961;
    }

    &.省保 {
      background: linear-gradient(135deg, rgba(91, 140, 133, 0.3), rgba(91, 140, 133, 0.2));
      border: 1px solid rgba(91, 140, 133, 0.5);
      color: #5B8C85;
    }
  }

  .baike-link {
    position: absolute;
    bottom: 15px;
    left: 15px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    color: #E8E4D8;
    font-size: 12px;
    text-decoration: none;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;

    .link-icon {
      width: 14px;
      height: 14px;
    }

    &:hover {
      background: rgba(212, 175, 55, 0.3);
    }
  }
}

.right-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.basic-info-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(212, 175, 55, 0.15);

  .info-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 12px;

    .info-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(197, 61, 67, 0.1));
      border-radius: 8px;
      color: #C9A961;
    }

    .info-content {
      display: flex;
      flex-direction: column;

      .info-label {
        font-size: 12px;
        color: rgba(232, 228, 216, 0.6);
        margin-bottom: 2px;
      }

      .info-value {
        font-size: 14px;
        color: #E8E4D8;
        font-weight: 500;
      }
    }
  }
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  .stat-card {
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    border: 1px solid rgba(212, 175, 55, 0.15);
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(212, 175, 55, 0.4);
      transform: translateY(-2px);
    }

    .stat-icon {
      width: 28px;
      height: 28px;
      margin: 0 auto 8px;
      color: #C9A961;
    }

    .stat-value {
      font-size: 20px;
      font-weight: 600;
      color: #E8E4D8;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      color: rgba(232, 228, 216, 0.6);
    }
  }
}

.description-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(212, 175, 55, 0.15);

  h3 {
    font-size: 16px;
    color: #C9A961;
    margin: 0 0 12px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: rgba(232, 228, 216, 0.85);
    line-height: 1.8;
    margin: 0;
  }
}

.story-features-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.story-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(212, 175, 55, 0.15);

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: #C9A961;
    margin: 0 0 12px;
    font-weight: 600;

    .svg-icon {
      width: 20px;
      height: 20px;
    }
  }

  .story-content {
    p {
      font-size: 14px;
      color: rgba(232, 228, 216, 0.85);
      line-height: 1.8;
      margin: 0;
    }
  }
}

.features-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(212, 175, 55, 0.15);

  h3 {
    font-size: 16px;
    color: #C9A961;
    margin: 0 0 12px;
    font-weight: 600;
  }

  .features-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .feature-tag {
      padding: 6px 12px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(197, 61, 67, 0.1));
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 20px;
      font-size: 12px;
      color: #E8E4D8;
    }
  }
}

.bottom-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.info-card-small {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(212, 175, 55, 0.15);

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #C9A961;
    margin: 0 0 12px;
    font-weight: 600;

    .svg-icon {
      width: 18px;
      height: 18px;
    }
  }

  .location-info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .coordinates {
      display: flex;
      justify-content: space-between;

      .label {
        font-size: 13px;
        color: rgba(232, 228, 216, 0.6);
      }

      .value {
        font-size: 13px;
        color: #E8E4D8;
        font-weight: 500;
      }
    }
  }

  .protection-detail {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .protection-item {
      display: flex;
      justify-content: space-between;

      .label {
        font-size: 13px;
        color: rgba(232, 228, 216, 0.6);
      }

      .value {
        font-size: 13px;
        color: #E8E4D8;
        font-weight: 500;
      }
    }
  }

  &.scores-mini {
    .mini-scores {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;

      .mini-score-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .mini-label {
          font-size: 12px;
          color: rgba(232, 228, 216, 0.6);
        }

        .mini-value {
          font-size: 14px;
          color: #E8E4D8;
          font-weight: 500;
        }
      }
    }
  }
}

.renovation-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(212, 175, 55, 0.15);

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: #C9A961;
    margin: 0 0 16px;
    font-weight: 600;

    .svg-icon {
      width: 20px;
      height: 20px;
    }
  }

  .renovation-timeline {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .timeline-item {
      display: flex;
      align-items: center;
      gap: 10px;

      .timeline-dot {
        width: 8px;
        height: 8px;
        background: #C9A961;
        border-radius: 50%;
      }

      .timeline-content {
        font-size: 13px;
        color: rgba(232, 228, 216, 0.85);
        padding: 6px 12px;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 6px;
      }
    }
  }
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: rgba(232, 228, 216, 0.6);

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(212, 175, 55, 0.2);
    border-top-color: #C9A961;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.svg-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 1200px) {
  .main-layout {
    grid-template-columns: 1fr;
  }

  .bottom-section {
    grid-template-columns: 1fr;
  }

  .story-features-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .bridge-detail-container {
    padding: 12px;
  }

  .detail-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    .header-title h1 {
      font-size: 22px;
    }
  }

  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .basic-info-card .info-row {
    grid-template-columns: 1fr;
  }
}
</style>
