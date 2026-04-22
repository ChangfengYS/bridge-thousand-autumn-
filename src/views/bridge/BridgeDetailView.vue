﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="bridge-detail-container">
    <div class="top-section" v-if="bridge">
      <div class="hero-section">
        <img 
          v-lazy="getBridgeImage(bridge.name)"
          :alt="bridge.name"
          class="hero-image"
          @error="handleImageError"
        />
        <div class="hero-overlay" v-if="imageError">
          <div class="bridge-name-art">{{ bridge.name }}</div>
        </div>
        
        <button class="back-btn" @click="goBack">
          <span class="back-icon">‹</span>
          返回
        </button>
        
        <a 
          :href="getBaiduBaikeUrl(bridge.name)" 
          target="_blank" 
          rel="noopener noreferrer"
          class="baike-link"
        >
          <span class="link-decor">◆</span>
          百度百科
        </a>
      </div>

      <div class="info-panel">
        <div class="panel-header">
          <div class="title-area">
            <h1>{{ bridge.name }}</h1>
            <p class="alias" v-if="bridge?.alias">别名：{{ bridge.alias }}</p>
          </div>
          <div class="hero-seal" v-if="bridge?.protectionLevel">
            <span class="seal-text">{{ bridge.protectionLevel }}</span>
          </div>
        </div>

        <div class="panel-body">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">所在地</span>
              <span class="info-value">{{ bridge.province }} {{ bridge.city }} {{ bridge.county }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">建造年代</span>
              <span class="info-value">{{ bridge.dynasty }}代 ({{ bridge.buildYear }}年)</span>
            </div>
            <div class="info-item">
              <span class="info-label">桥型结构</span>
              <span class="info-value">{{ bridge.bridgeType }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">建筑材质</span>
              <span class="info-value">{{ bridge.material }}</span>
            </div>
            <div class="info-item" v-if="bridge.architect">
              <span class="info-label">设计建造</span>
              <span class="info-value">{{ bridge.architect }}</span>
            </div>
            <div class="info-item" v-if="bridge.heritageYear">
              <span class="info-label">入保年份</span>
              <span class="info-value">{{ bridge.heritageYear }}年</span>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">{{ bridge.span }}</span>
              <span class="stat-label">跨度(米)</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ bridge.length || '-' }}</span>
              <span class="stat-label">全长(米)</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ bridge.archCount }}</span>
              <span class="stat-label">孔数</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ bridge.width || '-' }}</span>
              <span class="stat-label">宽度(米)</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ bridge.function }}</span>
              <span class="stat-label">功能</span>
            </div>
            <div class="stat-item heritage" v-if="bridge.worldHeritage">
              <span class="stat-value">是</span>
              <span class="stat-label">世界遗产</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-content" v-if="bridge">
      <div class="content-grid">
        <div class="content-card description-story-card">
          <div class="card-header">
            <h3>建筑简介</h3>
          </div>
          <div class="card-body">
            <p class="description-text">{{ bridge.description }}</p>
            <div class="story-section" v-if="bridge.story">
              <div class="section-title">
                历史故事
              </div>
              <p class="story-text">{{ bridge.story }}</p>
            </div>
          </div>
        </div>

        <div class="content-card science-culture-card">
          <div class="card-header">
            <h3>科学与文化价值</h3>
          </div>
          <div class="card-body">
            <div class="value-section">
              <div class="section-title">
                科学价值
              </div>
              <div class="value-list">
                <div class="value-item">
                  <span class="value-label">结构特点</span>
                  <span class="value-text">{{ getScienceInfo(bridge).structure }}</span>
                </div>
                <div class="value-item">
                  <span class="value-label">工艺技术</span>
                  <span class="value-text">{{ getScienceInfo(bridge).technique }}</span>
                </div>
                <div class="value-item">
                  <span class="value-label">工程成就</span>
                  <span class="value-text">{{ getScienceInfo(bridge).achievement }}</span>
                </div>
              </div>
            </div>
            <div class="value-section">
              <div class="section-title">
                文化价值
              </div>
              <div class="value-list">
                <div class="value-item">
                  <span class="value-label">历史意义</span>
                  <span class="value-text">{{ getCultureInfo(bridge).history }}</span>
                </div>
                <div class="value-item">
                  <span class="value-label">文化传承</span>
                  <span class="value-text">{{ getCultureInfo(bridge).heritage }}</span>
                </div>
                <div class="value-item">
                  <span class="value-label">艺术价值</span>
                  <span class="value-text">{{ getCultureInfo(bridge).art }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="content-card tourism-features-card">
          <div class="card-header">
            <h3>旅游与特色</h3>
          </div>
          <div class="card-body">
            <div class="tourism-stats">
              <div class="tourism-stat">
                <span class="stat-number">{{ bridge.tourismRating || 4.5 }}</span>
                <span class="stat-unit">/5.0</span>
                <span class="stat-desc">热度</span>
              </div>
              <div class="tourism-stat">
                <span class="stat-number">{{ bridge.visitorCount || 50 }}</span>
                <span class="stat-unit">万</span>
                <span class="stat-desc">年游客</span>
              </div>
              <div class="tourism-stat">
                <span class="stat-number">{{ bridge.culturalValue || 80 }}</span>
                <span class="stat-unit">分</span>
                <span class="stat-desc">文化值</span>
              </div>
              <div class="tourism-stat">
                <span class="stat-number">{{ bridge.architectureScore || 80 }}</span>
                <span class="stat-unit">分</span>
                <span class="stat-desc">艺术值</span>
              </div>
            </div>
            <div class="tourism-info">
              <div class="info-row">
                <span class="info-label-text">地理位置</span>
                <span class="info-text">{{ bridge.location?.[0] || '-' }}°E, {{ bridge.location?.[1] || '-' }}°N</span>
              </div>
              <div class="info-row">
                <span class="info-label-text">交通指南</span>
                <span class="info-text">{{ getTourismInfo(bridge).traffic }}</span>
              </div>
              <div class="info-row">
                <span class="info-label-text">游览时间</span>
                <span class="info-text">{{ getTourismInfo(bridge).duration }}</span>
              </div>
            </div>
            <div class="features-section" v-if="bridge.features?.length">
              <div class="section-title">
                建筑特色
              </div>
              <div class="features-tags">
                <span class="feature-tag" v-for="feature in bridge.features" :key="feature">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="content-card renovation-scores-card">
          <div class="card-header">
            <h3>修缮与评分</h3>
          </div>
          <div class="card-body">
            <div class="renovation-section" v-if="bridge.renovationHistory?.length">
              <div class="section-title">
                修缮历史
              </div>
              <div class="renovation-timeline">
                <div class="timeline-item" v-for="(item, index) in bridge.renovationHistory" :key="index">
                  <span class="timeline-dot"></span>
                  <span class="timeline-text">{{ item }}</span>
                </div>
              </div>
            </div>
            <div class="scores-section">
              <div class="section-title">
                综合评分
              </div>
              <div class="score-bars">
                <div class="score-item">
                  <span class="score-label">文化价值</span>
                  <div class="score-bar">
                    <div class="score-fill" :style="{ width: (bridge.culturalValue || 80) + '%' }"></div>
                  </div>
                  <span class="score-value">{{ bridge.culturalValue || 80 }}</span>
                </div>
                <div class="score-item">
                  <span class="score-label">建筑艺术</span>
                  <div class="score-bar">
                    <div class="score-fill" :style="{ width: (bridge.architectureScore || 80) + '%' }"></div>
                  </div>
                  <span class="score-value">{{ bridge.architectureScore || 80 }}</span>
                </div>
              </div>
              <div class="heritage-badge" v-if="bridge.worldHeritage">
                <span class="badge-icon">✓</span>
                <span class="badge-text">世界遗产</span>
              </div>
            </div>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BridgesData from '@/assets/data/bridges.json'

const route = useRoute()
const router = useRouter()
const bridge = ref(null)
const imageError = ref(false)

const bridgeImages = import.meta.glob('../../assets/images/bridges/*.png', { eager: true, import: 'default' })

const bridgeImageMap = {
  '赵州桥': bridgeImages['../../assets/images/bridges/zhaozhou-bridge.png'],
  '卢沟桥': bridgeImages['../../assets/images/bridges/lugou-bridge.png'],
  '洛阳桥': bridgeImages['../../assets/images/bridges/luoyang-bridge.png'],
  '广济桥': bridgeImages['../../assets/images/bridges/guangji-bridge.png'],
  '安平桥': bridgeImages['../../assets/images/bridges/anping-bridge.png'],
  '五亭桥': bridgeImages['../../assets/images/bridges/wuting-bridge.png'],
  '十七孔桥': bridgeImages['../../assets/images/bridges/shiqikong-bridge.png'],
  '宝带桥': bridgeImages['../../assets/images/bridges/baodai-bridge.png'],
  '放生桥': bridgeImages['../../assets/images/bridges/fangsheng-bridge.png'],
  '泸定桥': bridgeImages['../../assets/images/bridges/luding-bridge.png'],
  '盘江桥': bridgeImages['../../assets/images/bridges/panjiang-bridge.png'],
  '程阳永济桥': bridgeImages['../../assets/images/bridges/chengyang-bridge.png'],
  '霁虹桥': bridgeImages['../../assets/images/bridges/jihong-bridge.png'],
  '风雨桥': bridgeImages['../../assets/images/bridges/fengyu-bridge.png'],
  '鱼沼飞梁': bridgeImages['../../assets/images/bridges/yuzhao-bridge.png'],
}

const defaultImage = bridgeImages['../../assets/images/bridges/zhaozhou-bridge.png']

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

const getScienceInfo = (bridge) => {
  const scienceMap = {
    '赵州桥': {
      structure: '敞肩拱结构，单孔跨度37.02米，拱矢高度7.23米',
      technique: '采用纵向并列砌筑法，28道独立拱圈并列',
      achievement: '世界现存最早敞肩石拱桥，开创桥梁建筑新纪元'
    },
    '卢沟桥': {
      structure: '十一孔联拱结构，全长266.5米',
      technique: '石砌联拱技术，桥墩采用船形设计',
      achievement: '中国北方现存最长的古代石拱桥'
    },
    '洛阳桥': {
      structure: '石梁桥结构，筏形基础技术',
      technique: '种蛎固基法，利用牡蛎繁殖加固桥基',
      achievement: '世界首创生物固基技术，海港桥梁杰作'
    }
  }
  return scienceMap[bridge?.name] || {
    structure: `${bridge?.bridgeType || '拱桥'}结构，跨度${bridge?.span || '未知'}米`,
    technique: '传统石砌工艺，精工细作',
    achievement: '中国古代桥梁建筑的杰出代表'
  }
}

const getCultureInfo = (bridge) => {
  const cultureMap = {
    '赵州桥': {
      history: '隋代建筑瑰宝，见证1400余年历史变迁',
      heritage: '首批全国重点文物保护单位，世界桥梁史里程碑',
      art: '桥身雕刻精美，蟠龙、竹节等图案展现隋代艺术风格'
    },
    '卢沟桥': {
      history: '七七事变发生地，全民族抗战的历史见证',
      heritage: '国家级抗战纪念设施，爱国主义教育基地',
      art: '501只石狮形态各异，堪称石雕艺术博物馆'
    },
    '洛阳桥': {
      history: '海上丝绸之路重要遗迹，千年古桥风采依旧',
      heritage: '全国重点文物保护单位，泉州世遗组成部分',
      art: '桥塔石雕精美，宋代书法碑刻保存完好'
    }
  }
  return cultureMap[bridge?.name] || {
    history: `${bridge?.dynasty || '古代'}建筑遗存，承载深厚历史底蕴`,
    heritage: `${bridge?.protectionLevel || '文物保护单位'}，具有重要历史价值`,
    art: '建筑工艺精湛，体现古代工匠智慧'
  }
}

const getTourismInfo = (bridge) => {
  const tourismMap = {
    '赵州桥': {
      traffic: '石家庄市区乘车约1小时可达',
      duration: '建议游览1-2小时'
    },
    '卢沟桥': {
      traffic: '北京市区地铁公交可达',
      duration: '建议游览2-3小时'
    },
    '洛阳桥': {
      traffic: '泉州市区公交可达',
      duration: '建议游览1-2小时'
    }
  }
  return tourismMap[bridge?.name] || {
    traffic: `${bridge?.province || ''}${bridge?.city || ''}市区可达`,
    duration: '建议游览1-2小时'
  }
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

@keyframes cardGlow {
  0%, 100% {
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
  }
  50% {
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.2);
  }
}

.bridge-detail-container {
  min-height: calc(100vh - 60px);
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

.top-section {
  display: flex;
  gap: 16px;
  padding: 16px;
  position: relative;
  z-index: 1;
}

.hero-section {
  position: relative;
  flex: 0 0 55%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(212, 175, 55, 0.4);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(212, 175, 55, 0.1);

  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease, opacity 0.3s ease;
    opacity: 0;
    
    &.lazy-loaded {
      opacity: 1;
    }
  }

  &:hover .hero-image {
    transform: scale(1.02);
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.95));

    .bridge-name-art {
      font-size: 48px;
      color: rgba(212, 175, 55, 0.6);
      font-weight: 600;
      letter-spacing: 12px;
    }
  }

  .back-btn {
    position: absolute;
    top: 16px;
    left: 16px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(212, 175, 55, 0.4);
    border-radius: 20px;
    color: #E8E4D8;
    font-size: 13px;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    z-index: 10;

    .back-icon {
      font-size: 18px;
      font-weight: 300;
    }

    &:hover {
      background: rgba(212, 175, 55, 0.3);
      border-color: #C9A961;
      color: #C9A961;
    }
  }

  .baike-link {
    position: absolute;
    bottom: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 4px;
    color: #E8E4D8;
    font-size: 12px;
    text-decoration: none;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    z-index: 10;

    .link-decor {
      color: #C9A961;
      font-size: 10px;
    }

    &:hover {
      background: rgba(212, 175, 55, 0.2);
      border-color: #C9A961;
      color: #C9A961;
    }
  }
}

.info-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%);
  border-radius: 12px;
  border: 2px solid rgba(212, 175, 55, 0.4);
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(212, 175, 55, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.15);
  }

  .panel-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px 24px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(197, 61, 67, 0.05) 100%);
    border-bottom: 2px solid rgba(212, 175, 55, 0.3);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.7), transparent);
    }

    .title-area {
      h1 {
        font-size: 32px;
        font-weight: 700;
        margin: 0;
        letter-spacing: 4px;
        background: linear-gradient(135deg, #E8D5A3 0%, #D4AF37 25%, #F5E6C8 50%, #C9A961 75%, #B8860B 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.4));
        font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Microsoft YaHei', 'PingFang SC', serif;
      }

      .alias {
        font-size: 16px;
        color: rgba(201, 169, 97, 0.9);
        margin: 6px 0 0;
        letter-spacing: 2px;
        font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Microsoft YaHei', 'PingFang SC', serif;
      }
    }

    .hero-seal {
      width: 56px;
      height: 56px;
      border: 2px solid #C53D43;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(197, 61, 67, 0.2) 0%, rgba(184, 66, 58, 0.15) 100%);
      flex-shrink: 0;
      box-shadow: 0 0 15px rgba(197, 61, 67, 0.3);
      
      .seal-text {
        font-size: 13px;
        color: #C53D43;
        font-weight: 600;
        writing-mode: vertical-rl;
      }
    }
  }

  .panel-body {
    flex: 1;
    padding: 18px 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 20px;

    .info-item {
      display: flex;
      align-items: center;
      gap: 10px;

      .info-label {
        font-size: 14px;
        color: rgba(201, 169, 97, 0.7);
        white-space: nowrap;

        &::after {
          content: '：';
        }
      }

      .info-value {
        font-size: 15px;
        color: #E8E4D8;
        font-weight: 500;
      }
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    .stat-item {
      text-align: center;
      padding: 14px 8px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(197, 61, 67, 0.05) 100%);
      border-radius: 8px;
      border: 1px solid rgba(212, 175, 55, 0.2);
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(197, 61, 67, 0.1) 100%);
        border-color: rgba(212, 175, 55, 0.4);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .stat-value {
        display: block;
        font-size: 24px;
        font-weight: 600;
        color: #C9A961;
        line-height: 1.2;
      }

      .stat-label {
        display: block;
        font-size: 13px;
        color: rgba(201, 169, 97, 0.7);
        margin-top: 4px;
      }

      &.heritage {
        .stat-value {
          color: #C53D43;
        }
      }
    }
  }
}

.detail-content {
  position: relative;
  z-index: 1;
  padding: 0 16px 16px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.content-card {
  background: linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%);
  border-radius: 12px;
  border: 2px solid rgba(212, 175, 55, 0.4);
  overflow: hidden;
  transition: all 0.3s ease;
  animation: cardGlow 4s ease-in-out infinite;

  &:hover {
    border-color: rgba(212, 175, 55, 0.6);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.2);
    transform: translateY(-3px);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 18px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(197, 61, 67, 0.05) 100%);
    border-bottom: 2px solid rgba(212, 175, 55, 0.3);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.7), transparent);
    }

    h3 {
      font-size: 16px;
      color: #C9A961;
      margin: 0;
      font-weight: 600;
      letter-spacing: 3px;
      font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Microsoft YaHei', 'PingFang SC', serif;
    }
  }

  .card-body {
    padding: 16px 18px;
  }
}

.section-title {
  font-size: 14px;
  color: #C9A961;
  font-weight: 600;
  margin-bottom: 12px;
  letter-spacing: 2px;
  font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Microsoft YaHei', 'PingFang SC', serif;
}

.description-story-card {
  .description-text {
    font-size: 14px;
    color: rgba(232, 228, 216, 0.9);
    line-height: 1.8;
    margin: 0;
    text-indent: 2em;
  }

  .story-section {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px dashed rgba(212, 175, 55, 0.2);

    .story-text {
      font-size: 13px;
      color: rgba(232, 228, 216, 0.85);
      line-height: 1.8;
      margin: 0;
      text-indent: 2em;
    }
  }
}

.science-culture-card {
  .value-section {
    &:not(:last-child) {
      margin-bottom: 16px;
      padding-bottom: 14px;
      border-bottom: 1px dashed rgba(212, 175, 55, 0.2);
    }
  }

  .value-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .value-item {
    display: flex;
    gap: 12px;

    .value-label {
      flex-shrink: 0;
      width: 60px;
      font-size: 12px;
      color: rgba(201, 169, 97, 0.8);
    }

    .value-text {
      font-size: 12px;
      color: rgba(232, 228, 216, 0.85);
      line-height: 1.6;
    }
  }
}

.tourism-features-card {
  .tourism-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 14px;

    .tourism-stat {
      text-align: center;
      padding: 12px 8px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(197, 61, 67, 0.05) 100%);
      border-radius: 8px;
      border: 1px solid rgba(212, 175, 55, 0.2);
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(197, 61, 67, 0.1) 100%);
        border-color: rgba(212, 175, 55, 0.4);
        transform: translateY(-2px);
      }

      .stat-number {
        font-size: 22px;
        font-weight: 600;
        color: #C9A961;
      }

      .stat-unit {
        font-size: 12px;
        color: rgba(201, 169, 97, 0.7);
      }

      .stat-desc {
        display: block;
        font-size: 10px;
        color: rgba(201, 169, 97, 0.6);
        margin-top: 2px;
      }
    }
  }

  .tourism-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 14px;

    .info-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;

      .info-label-text {
        flex-shrink: 0;
        width: 60px;
        font-size: 12px;
        color: rgba(201, 169, 97, 0.8);
      }

      .info-text {
        color: rgba(232, 228, 216, 0.85);
      }
    }
  }

  .features-section {
    padding-top: 12px;
    border-top: 1px dashed rgba(212, 175, 55, 0.2);
  }

  .features-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .feature-tag {
      padding: 5px 12px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(197, 61, 67, 0.1) 100%);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 6px;
      font-size: 11px;
      color: #C9A961;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(197, 61, 67, 0.15) 100%);
        border-color: rgba(212, 175, 55, 0.5);
        transform: translateY(-1px);
      }
    }
  }
}

.renovation-scores-card {
  .renovation-section {
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px dashed rgba(212, 175, 55, 0.2);
  }

  .renovation-timeline {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .timeline-item {
      display: flex;
      align-items: center;
      gap: 6px;

      .timeline-dot {
        width: 6px;
        height: 6px;
        background: #C9A961;
        border-radius: 50%;
        box-shadow: 0 0 6px rgba(201, 169, 97, 0.5);
      }

      .timeline-text {
        font-size: 11px;
        color: rgba(232, 228, 216, 0.85);
        padding: 5px 10px;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(197, 61, 67, 0.05) 100%);
        border-radius: 6px;
        border: 1px solid rgba(212, 175, 55, 0.2);
      }
    }
  }

  .score-bars {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .score-item {
      display: flex;
      align-items: center;
      gap: 12px;

      .score-label {
        width: 60px;
        font-size: 12px;
        color: rgba(201, 169, 97, 0.8);
        flex-shrink: 0;
      }

      .score-bar {
        flex: 1;
        height: 8px;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid rgba(212, 175, 55, 0.2);

        .score-fill {
          height: 100%;
          background: linear-gradient(90deg, #C9A961, #D4AF37);
          border-radius: 4px;
          transition: width 0.5s ease;
        }
      }

      .score-value {
        width: 30px;
        font-size: 13px;
        color: #C9A961;
        font-weight: 600;
        text-align: right;
      }
    }
  }

  .heritage-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 14px;
    padding: 12px;
    background: linear-gradient(135deg, rgba(197, 61, 67, 0.15) 0%, rgba(184, 66, 58, 0.1) 100%);
    border: 1px solid rgba(197, 61, 67, 0.4);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, rgba(197, 61, 67, 0.2) 0%, rgba(184, 66, 58, 0.15) 100%);
      box-shadow: 0 0 20px rgba(197, 61, 67, 0.2);
    }

    .badge-icon {
      color: #C53D43;
      font-size: 14px;
    }

    .badge-text {
      font-size: 13px;
      color: #C53D43;
      font-weight: 600;
    }
  }
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: rgba(201, 169, 97, 0.6);

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(212, 175, 55, 0.2);
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

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .top-section {
    flex-direction: column;
  }

  .hero-section {
    flex: none;
    width: 100%;
  }

  .info-panel {
    .panel-header {
      .title-area h1 {
        font-size: 24px;
      }
    }

    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media (max-width: 768px) {
  .top-section {
    padding: 12px;
  }

  .info-panel {
    .panel-body {
      padding: 14px 18px;
    }

    .info-grid {
      grid-template-columns: 1fr;
      gap: 10px 16px;

      .info-label {
        font-size: 13px;
      }

      .info-value {
        font-size: 14px;
      }
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);

      .stat-item {
        padding: 12px 6px;

        .stat-value {
          font-size: 20px;
        }

        .stat-label {
          font-size: 12px;
        }
      }
    }
  }

  .detail-content {
    padding: 0 12px 12px;
  }

  .tourism-features-card {
    .tourism-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 480px) {
  .hero-section {
    .back-btn {
      padding: 6px 12px;
      font-size: 12px;
    }

    .baike-link {
      padding: 4px 8px;
      font-size: 11px;
    }
  }

  .info-panel {
    .panel-header {
      padding: 14px 18px;

      .title-area h1 {
        font-size: 24px;
        letter-spacing: 2px;
      }

      .hero-seal {
        width: 48px;
        height: 48px;
      }
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .content-card {
    .card-body {
      padding: 12px;
    }
  }
}
</style>
