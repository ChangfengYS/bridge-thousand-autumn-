﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="wordcloud-analysis">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-item">
          <label>朝代筛选</label>
          <select v-model="curDynasty" class="select">
            <option value="all">全部朝代</option>
            <option v-for="dynasty in dynastyList" :key="dynasty" :value="dynasty">{{ dynasty }}</option>
          </select>
        </div>
        <div class="toolbar-item">
          <label>分析维度</label>
          <select v-model="curType" class="select">
            <option v-for="type in typeList" :key="type.value" :value="type.value">{{ type.label }}</option>
          </select>
        </div>
      </div>
      <div class="toolbar-right">
        <button class="btn" :class="{ active: showCompare }" @click="toggleCompare">
          词频对比
        </button>
        <button class="btn" :class="{ active: showTimeline }" @click="toggleTimeline">
          动态演变
        </button>
        <button class="btn" :class="{ active: showTrend }" @click="toggleTrend">
          趋势分析
        </button>
        <button class="btn" :class="{ active: showCrossAnalysis }" @click="toggleCrossAnalysis">
          交叉分析
        </button>
        <button class="btn" @click="exportImage">
          导出图片
        </button>
      </div>
    </div>

    <div v-if="showTimeline" class="timeline-control">
      <div class="timeline-header">
        <span class="timeline-title centered">词云演变动画</span>
        <div class="timeline-actions">
          <button class="timeline-btn" @click="playTimeline" :disabled="isPlaying">
            {{ isPlaying ? '暂停' : '播放' }}
          </button>
          <button class="timeline-btn" @click="stopTimeline">停止</button>
          <select v-model="playSpeed" class="speed-select">
            <option value="1000">慢速</option>
            <option value="2000">正常</option>
            <option value="3000">快速</option>
          </select>
        </div>
      </div>
      <div class="timeline-slider">
        <input 
          type="range" 
          v-model="timelineIndex" 
          :min="0" 
          :max="dynastyList.length - 1" 
          step="1"
          @input="onTimelineChange"
        />
        <div class="timeline-labels">
          <span 
            v-for="(dynasty, index) in dynastyList" 
            :key="dynasty"
            class="timeline-label"
            :class="{ active: timelineIndex === index }"
            @click="selectTimelineIndex(index)"
          >
            {{ dynasty }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="showTrend" class="trend-section">
      <div class="trend-header">
        <span class="trend-title centered">词频趋势演变</span>
        <div class="trend-keywords">
          <span class="trend-label">追踪词汇:</span>
          <div class="trend-tags">
            <span 
              v-for="word in trendKeywords" 
              :key="word" 
              class="trend-tag"
              :class="{ active: selectedTrendWords.includes(word) }"
              @click="toggleTrendWord(word)"
            >
              {{ word }}
            </span>
          </div>
        </div>
      </div>
      <div ref="trendChartRef" class="trend-chart"></div>
    </div>

    <div v-if="showCrossAnalysis" class="cross-section">
      <div class="cross-header">
        <span class="cross-title centered">多维度交叉分析</span>
        <div class="cross-controls">
          <div class="cross-row">
            <div class="cross-item">
              <label>维度1</label>
              <select v-model="crossDim1" class="cross-select">
                <option value="dynasty">朝代</option>
                <option value="type">类型</option>
              </select>
            </div>
            <span class="cross-multiply">×</span>
            <div class="cross-item">
              <label>维度2</label>
              <select v-model="crossDim2" class="cross-select">
                <option value="type">类型</option>
                <option value="dynasty">朝代</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div ref="crossChartRef" class="cross-chart"></div>
    </div>

    <div v-if="showCompare" class="compare-section">
      <div class="compare-header">
        <span class="compare-title centered">词频对比分析</span>
        <div class="compare-selects">
          <select v-model="compareDynasty1" class="compare-select">
            <option v-for="dynasty in dynastyList" :key="dynasty" :value="dynasty">{{ dynasty }}</option>
          </select>
          <span class="compare-vs">VS</span>
          <select v-model="compareDynasty2" class="compare-select">
            <option v-for="dynasty in dynastyList" :key="dynasty" :value="dynasty">{{ dynasty }}</option>
          </select>
        </div>
      </div>
      <div ref="compareChartRef" class="compare-chart"></div>
    </div>

    <div class="main-content">
      <div class="chart-panel">
        <div class="panel-card">
          <div class="card-header">
            <div class="header-left">
              <HelpTip title="词云说明" content="展示古桥相关的特色词汇云图，词汇大小代表出现频率。可通过朝代和类型筛选，点击词汇可查看详细信息。" />
            </div>
            <span class="card-title">古桥特色词云</span>
            <div class="header-right">
              <div class="chart-info">
                当前显示: <span class="highlight">{{ currentDynastyLabel }}</span> · 
                <span class="highlight">{{ currentTypeLabel }}</span>
              </div>
            </div>
          </div>
          <div ref="wordCloudRef" class="chart-area"></div>
        </div>
      </div>

      <div class="side-panel">
        <div class="panel-card stats-panel">
          <div class="card-header">
            <div class="header-left"></div>
            <span class="card-title">词频统计 TOP15</span>
            <div class="header-right">
              <HelpTip title="词频统计说明" content="展示当前筛选条件下出现频率最高的15个词汇及其频次。" />
            </div>
          </div>
          <div class="stats-list">
            <div 
              v-for="(item, index) in topKeywords" 
              :key="item.name" 
              class="stats-item"
              :style="{ animationDelay: `${index * 0.05}s` }"
              @click="showWordDetail(item.name)"
            >
              <span class="rank" :class="{ top3: index < 3 }">{{ index + 1 }}</span>
              <span class="keyword">{{ item.name }}</span>
              <div class="bar-wrapper">
                <div class="bar" :style="{ width: `${(item.value / maxKeywordValue) * 100}%` }"></div>
              </div>
              <span class="value">{{ item.value }}</span>
              <button class="favorite-btn" @click.stop="toggleFavorite(item.name)" :class="{ favorited: favorites.includes(item.name) }">
                {{ favorites.includes(item.name) ? '已收藏' : '收藏' }}
              </button>
            </div>
          </div>
        </div>

        <div class="panel-card favorite-panel" v-if="favorites.length > 0">
          <div class="card-header">
            <span class="card-title">我的收藏</span>
            <button class="clear-favorites-btn" @click="clearFavorites">清空</button>
          </div>
          <div class="favorite-list">
            <span 
              v-for="word in favorites" 
              :key="word" 
              class="favorite-tag"
              @click="showWordDetail(word)"
            >
              {{ word }}
              <span class="remove-favorite" @click.stop="toggleFavorite(word)">×</span>
            </span>
          </div>
          <button class="export-favorites-btn" @click="exportFavorites">导出收藏</button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showWordCard" class="word-card-overlay" @click.self="closeWordCard">
        <Transition name="slide-up">
          <div class="word-card" v-if="showWordCard">
            <div class="word-card-header">
              <div class="header-left">
                <h3 class="word-card-title">{{ currentWordDetail.name }}</h3>
                <span class="word-card-category" :style="{ background: getCategoryColor(currentWordDetail.category) }">
                  {{ currentWordDetail.category || '词汇' }}
                </span>
              </div>
              <button class="close-btn" @click="closeWordCard">×</button>
            </div>
            <div class="word-card-body">
              <div class="word-info-section">
                <div class="info-item" v-if="currentWordDetail.definition">
                  <span class="info-label">定义</span>
                  <p class="info-text">{{ currentWordDetail.definition }}</p>
                </div>
                <div class="info-row">
                  <div class="info-item half" v-if="currentWordDetail.origin">
                    <span class="info-label">起源</span>
                    <p class="info-text">{{ currentWordDetail.origin }}</p>
                  </div>
                  <div class="info-item half" v-if="currentWordDetail.timeline">
                    <span class="info-label">时代</span>
                    <p class="info-text">{{ currentWordDetail.timeline }}</p>
                  </div>
                </div>
                <div class="info-item" v-if="currentWordDetail.literature?.length">
                  <span class="info-label">文献记载</span>
                  <div class="literature-list">
                    <span 
                      v-for="lit in currentWordDetail.literature" 
                      :key="lit" 
                      class="literature-tag"
                    >
                      {{ lit }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="word-related-section" v-if="currentWordDetail.relatedBridges?.length">
                <span class="section-title">相关古桥</span>
                <div class="related-bridges">
                  <span 
                    v-for="bridge in currentWordDetail.relatedBridges" 
                    :key="bridge" 
                    class="related-tag bridge-tag"
                    @click="searchBridge(bridge)"
                  >
                    {{ bridge }}
                  </span>
                </div>
              </div>

              <div class="word-related-section" v-if="currentWordDetail.features?.length">
                <span class="section-title">特点</span>
                <div class="related-features">
                  <span 
                    v-for="feature in currentWordDetail.features" 
                    :key="feature" 
                    class="related-tag feature-tag"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>

              <div class="word-trend-section">
                <span class="section-title">词频趋势</span>
                <span class="section-desc">展示该词汇在各朝代的词频权重变化</span>
                <div ref="wordTrendChartRef" class="word-trend-chart"></div>
              </div>

              <div class="word-actions">
                <button class="action-btn favorite" @click="toggleFavorite(currentWordDetail.name)">
                  <span class="btn-icon">{{ favorites.includes(currentWordDetail.name) ? '★' : '☆' }}</span>
                  {{ favorites.includes(currentWordDetail.name) ? '已收藏' : '收藏' }}
                </button>
                <button class="action-btn search" @click="searchKeyword(currentWordDetail.name)">搜索相关</button>
                <button class="action-btn network" @click="showRelationNetwork(currentWordDetail.name)">关联网络</button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showRelationModal" class="relation-overlay" @click.self="closeRelationModal">
        <Transition name="slide-up">
          <div class="relation-modal" v-if="showRelationModal">
            <div class="relation-header">
              <h3 class="relation-title">语义关联网络</h3>
              <span class="relation-center">中心词: {{ relationCenterWord }}</span>
              <button class="close-btn" @click="closeRelationModal">×</button>
            </div>
            <div ref="relationChartRef" class="relation-chart"></div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import wordCloudFullData from '@/assets/data/bridge_word_cloud_data.json'
import wordEncyclopedia from '@/assets/data/word_encyclopedia.json'
import HelpTip from '@/components/business/HelpTip.vue'

const router = useRouter()

const dynastyList = ['隋代', '唐代', '宋代', '辽代', '金代', '元代', '明代', '清代', '近现代']
const typeList = [
  { value: 'type', label: '桥梁类型' },
  { value: 'material', label: '建筑材料' },
  { value: 'culture', label: '文化价值' },
  { value: 'region', label: '地域分布' }
]

const curDynasty = ref('all')
const curType = ref('type')
const colorScheme = ref('random')
const showCompare = ref(false)
const showTimeline = ref(false)
const showTrend = ref(true)
const showCrossAnalysis = ref(false)
const showWordCard = ref(false)
const showRelationModal = ref(false)
const compareDynasty1 = ref('隋代')
const compareDynasty2 = ref('宋代')
const timelineIndex = ref(0)
const isPlaying = ref(false)
const playSpeed = ref('2000')
const crossDim1 = ref('dynasty')
const crossDim2 = ref('type')
const favorites = ref([])
const browseHistory = ref([])
const selectedTrendWords = ref(['拱桥', '梁桥', '廊桥'])

const wordCloudRef = ref(null)
const compareChartRef = ref(null)
const trendChartRef = ref(null)
const crossChartRef = ref(null)
const wordTrendChartRef = ref(null)
const relationChartRef = ref(null)

const wordCloudChart = shallowRef(null)
const compareChart = shallowRef(null)
const trendChart = shallowRef(null)
const crossChart = shallowRef(null)
const wordTrendChart = shallowRef(null)
const relationChart = shallowRef(null)

const currentWordDetail = ref({})
const relationCenterWord = ref('')

let timelineTimer = null

const currentDynastyLabel = computed(() => curDynasty.value === 'all' ? '全部朝代' : curDynasty.value)
const currentTypeLabel = computed(() => typeList.find(t => t.value === curType.value)?.label || '')
const maxKeywordValue = computed(() => Math.max(...topKeywords.value.map(item => item.value), 1))

const trendKeywords = computed(() => {
  const wordFreq = {}
  dynastyList.forEach(dynasty => {
    const dynastyData = wordCloudFullData[curType.value][dynasty] || []
    dynastyData.forEach(item => {
      wordFreq[item.name] = (wordFreq[item.name] || 0) + item.value
    })
  })
  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name]) => name)
})

const getWordCloudData = (dynasty = curDynasty.value, type = curType.value) => {
  let targetData = []
  if (dynasty === 'all') {
    Object.values(wordCloudFullData[type]).forEach(arr => { targetData = targetData.concat(arr) })
  } else {
    targetData = wordCloudFullData[type][dynasty] || []
  }
  const mergedData = {}
  targetData.forEach(item => { mergedData[item.name] = (mergedData[item.name] || 0) + item.value })
  return Object.entries(mergedData).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

const normalizeData = (data) => {
  if (data.length === 0) return data
  const values = data.map(item => item.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = maxValue - minValue || 1
  return data.map(item => ({
    ...item,
    originalValue: item.value,
    normalizedValue: (item.value - minValue) / range
  }))
}

const topKeywords = computed(() => getWordCloudData().slice(0, 15))

const getCategoryColor = (category) => {
  const colors = {
    '技术': '#C9A961',
    '古桥': '#B8423A',
    '人物': '#5B8C85',
    '材料': '#8B7355',
    '地域': '#6B8E23',
    '文化': '#CD853F'
  }
  return colors[category] || '#C9A961'
}

const getWordColor = (word, normalizedValue) => {
  if (colorScheme.value === 'frequency') {
    const colors = [
      '#FFD700', '#D4AF37', '#C9A961', '#A68A3D',
      '#B8423A', '#C94A3A', '#D66B5A', '#E07040'
    ]
    const index = Math.floor(normalizedValue * (colors.length - 1))
    return colors[index]
  } else if (colorScheme.value === 'category') {
    for (const [cat, keywords] of Object.entries(clusterKeywords)) {
      if (keywords.includes(word)) {
        const catColors = {
          tech: '#C9A961',
          material: '#B8423A',
          culture: '#5B8C85',
          region: '#6B8E23'
        }
        return catColors[cat]
      }
    }
    return '#C9A961'
  } else {
    const colors = [
      '#C9A961', '#B8423A', '#5B8C85', '#D66B5A', 
      '#A68A3D', '#6B8E8E', '#8B7355', '#CD853F',
      '#BC8F8F', '#F4A460', '#DAA520', '#708090'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }
}

const initWordCloud = () => {
  if (!wordCloudRef.value) return
  wordCloudChart.value = echarts.init(wordCloudRef.value)
  updateWordCloud()
  wordCloudChart.value.on('click', (params) => {
    if (params.name) {
      showWordDetail(params.name)
      browseHistory.value = [params.name, ...browseHistory.value.filter(w => w !== params.name)].slice(0, 20)
    }
  })
}

const updateWordCloud = () => {
  if (!wordCloudChart.value) return
  const rawData = getWordCloudData()
  const normalizedData = normalizeData(rawData.slice(0, 100))
  const sizeRange = [18, 68]
  const mappedData = normalizedData.map(word => ({
    ...word,
    value: word.normalizedValue * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
    textStyle: {
      color: getWordColor(word.name, word.normalizedValue)
    }
  }))
  
  wordCloudChart.value.clear()
  wordCloudChart.value.setOption({
    tooltip: {
      show: true,
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [12, 16],
      textStyle: { 
        color: '#E8E4D8',
        fontSize: 13,
        fontFamily: 'Noto Sans SC, sans-serif'
      },
      extraCssText: 'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); border-radius: 8px;',
      formatter: (params) => {
        const originalValue = params.data.originalValue || params.value
        const rank = rawData.findIndex(d => d.name === params.name) + 1
        const wordInfo = wordEncyclopedia[params.name]
        let html = `
          <div style="font-weight:600;color:#C9A961;font-size:15px;margin-bottom:8px">${params.name}</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="color:#888">词频权重</span>
            <span style="color:#E8E4D8;font-weight:500">${originalValue}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:#888">排名</span>
            <span style="color:#B8423A;font-weight:500">第 ${rank} 位</span>
          </div>
        `
        if (wordInfo?.definition) {
          html += `<div style="color:#666;font-size:11px;border-top:1px solid rgba(201,169,97,0.3);padding-top:8px;margin-top:4px">${wordInfo.definition.slice(0, 50)}...</div>`
        }
        html += `<div style="color:#666;font-size:11px;border-top:1px solid rgba(201,169,97,0.3);padding-top:8px;margin-top:4px">点击查看详细信息</div>`
        return html
      }
    },
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '95%',
      height: '90%',
      sizeRange: sizeRange,
      rotationRange: [-30, 30],
      rotationStep: 15,
      gridSize: 4,
      drawOutOfBound: false,
      layoutAnimation: true,
      textStyle: {
        fontFamily: 'STKaiti, KaiTi, STXingkai, "Noto Serif SC", serif',
        fontWeight: 'bold',
        color: (params) => params.data?.textStyle?.color || '#C9A961',
        shadowBlur: 8,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          fontWeight: 'bolder',
          shadowBlur: 20,
          shadowColor: 'rgba(201, 169, 97, 0.8)'
        }
      },
      blur: {
        textStyle: {
          opacity: 0.3
        }
      },
      data: mappedData
    }],
    animationDuration: 1500,
    animationDurationUpdate: 5000,
    animationEasing: 'elasticOut',
    animationEasingUpdate: 'elasticOut'
  }, { notMerge: true })
}

const initCompareChart = () => {
  if (!compareChartRef.value) return
  compareChart.value = echarts.init(compareChartRef.value)
  updateCompareChart()
}

const updateCompareChart = () => {
  if (!compareChart.value) return
  const data1 = getWordCloudData(compareDynasty1.value).slice(0, 20)
  const data2 = getWordCloudData(compareDynasty2.value).slice(0, 20)
  
  const data1Map = Object.fromEntries(data1.map(d => [d.name, d.value]))
  const data2Map = Object.fromEntries(data2.map(d => [d.name, d.value]))
  
  const commonKeywords = Object.keys(data1Map).filter(k => data2Map[k])
  const onlyData1Keywords = Object.keys(data1Map).filter(k => !data2Map[k])
  const onlyData2Keywords = Object.keys(data2Map).filter(k => !data1Map[k])
  
  const keywords = [
    ...commonKeywords.slice(0, 8),
    ...onlyData1Keywords.slice(0, 2),
    ...onlyData2Keywords.slice(0, 2)
  ].slice(0, 12)
  
  const series1Data = keywords.map(k => data1Map[k] || 0)
  const series2Data = keywords.map(k => data2Map[k] || 0)
  
  const maxVal = Math.max(...series1Data, ...series2Data)
  
  compareChart.value.setOption({
    title: {
      text: `${compareDynasty1.value} vs ${compareDynasty2.value}`,
      left: 'center',
      top: 5,
      textStyle: {
        color: '#C9A961',
        fontSize: 14,
        fontFamily: 'Noto Serif SC, serif',
        fontWeight: 500
      }
    },
    tooltip: { 
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(201, 169, 97, 0.08)'
        }
      },
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [14, 18],
      textStyle: { 
        color: '#E8E4D8', 
        fontSize: 13,
        fontFamily: 'Noto Sans SC, sans-serif'
      },
      extraCssText: 'box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4); border-radius: 10px;',
      formatter: (params) => {
        if (!params || params.length === 0) return ''
        const keyword = params[0].axisValue
        let html = `<div style="font-weight:600;color:#C9A961;font-size:15px;margin-bottom:10px;border-bottom:1px solid rgba(201,169,97,0.3);padding-bottom:8px">${keyword}</div>`
        params.forEach(p => {
          const percent = maxVal > 0 ? ((p.value / maxVal) * 100).toFixed(1) : 0
          html += `
            <div style="display:flex;align-items:center;gap:8px;margin:6px 0">
              <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${p.color}"></span>
              <span style="color:#888;min-width:50px">${p.seriesName}</span>
              <span style="color:#E8E4D8;font-weight:500">${p.value}</span>
              <span style="color:#666;font-size:11px">(${percent}%)</span>
            </div>
          `
        })
        return html
      }
    },
    legend: { 
      data: [compareDynasty1.value, compareDynasty2.value], 
      textStyle: { 
        color: '#E8E4D8', 
        fontSize: 12,
        fontFamily: 'Noto Sans SC, sans-serif'
      },
      top: 35,
      itemWidth: 18,
      itemHeight: 12,
      itemGap: 25,
      icon: 'roundRect'
    },
    grid: { 
      left: '6%', 
      right: '4%', 
      bottom: '20%', 
      top: '22%',
      containLabel: true
    },
    xAxis: { 
      type: 'category', 
      data: keywords, 
      axisLabel: { 
        color: '#E8E4D8', 
        rotate: 25, 
        fontSize: 11,
        fontFamily: 'Noto Sans SC, sans-serif',
        interval: 0
      }, 
      axisLine: { 
        lineStyle: { 
          color: 'rgba(201, 169, 97, 0.4)',
          width: 1
        } 
      },
      axisTick: {
        show: true,
        lineStyle: { color: 'rgba(201, 169, 97, 0.3)' }
      },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(201, 169, 97, 0.06)', type: 'dashed' }
      }
    },
    yAxis: { 
      type: 'value', 
      axisLabel: { 
        color: 'rgba(232, 228, 216, 0.6)', 
        fontSize: 11 
      }, 
      splitLine: { 
        lineStyle: { 
          color: 'rgba(201, 169, 97, 0.1)',
          type: 'dashed'
        } 
      },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      { 
        name: compareDynasty1.value, 
        type: 'bar', 
        data: series1Data, 
        barWidth: '32%',
        barGap: '12%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FFD700' },
            { offset: 0.3, color: '#F4D03F' },
            { offset: 0.7, color: '#D4AF37' },
            { offset: 1, color: '#A68A3D' }
          ]),
          shadowColor: 'rgba(255, 215, 0, 0.25)',
          shadowBlur: 10,
          shadowOffsetY: 3
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#FFE44D' },
              { offset: 0.5, color: '#FFD700' },
              { offset: 1, color: '#D4AF37' }
            ]),
            shadowColor: 'rgba(255, 215, 0, 0.5)',
            shadowBlur: 20
          }
        },
        label: {
          show: true,
          position: 'top',
          color: '#C9A961',
          fontSize: 10,
          fontWeight: 500,
          formatter: '{c}'
        },
        animationDelay: (idx) => idx * 60
      },
      { 
        name: compareDynasty2.value, 
        type: 'bar', 
        data: series2Data, 
        barWidth: '32%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#E88070' },
            { offset: 0.3, color: '#E07040' },
            { offset: 0.7, color: '#C94A3A' },
            { offset: 1, color: '#A53035' }
          ]),
          shadowColor: 'rgba(224, 112, 64, 0.25)',
          shadowBlur: 10,
          shadowOffsetY: 3
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#F09080' },
              { offset: 0.5, color: '#E07040' },
              { offset: 1, color: '#C94A3A' }
            ]),
            shadowColor: 'rgba(224, 112, 64, 0.5)',
            shadowBlur: 20
          }
        },
        label: {
          show: true,
          position: 'top',
          color: '#B8423A',
          fontSize: 10,
          fontWeight: 500,
          formatter: '{c}'
        },
        animationDelay: (idx) => idx * 60 + 30
      }
    ],
    dataZoom: [{
      type: 'slider',
      show: true,
      xAxisIndex: 0,
      height: 20,
      bottom: 5,
      startValue: 0,
      endValue: 11,
      borderColor: 'rgba(212, 175, 55, 0.5)',
      fillerColor: 'rgba(212, 175, 55, 0.25)',
      backgroundColor: 'rgba(30, 30, 30, 0.8)',
      handleStyle: {
        color: '#C9A961',
        borderColor: '#C9A961',
        borderWidth: 1
      },
      moveHandleStyle: {
        color: '#B8423A'
      },
      selectedDataBackground: {
        lineStyle: { color: '#C9A961' },
        areaStyle: { color: 'rgba(212, 175, 55, 0.2)' }
      },
      textStyle: {
        color: '#E8E4D8',
        fontSize: 10
      },
      brushSelect: false,
      zoomLock: false
    }, {
      type: 'inside',
      xAxisIndex: 0,
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
      preventDefaultMouseMove: true
    }],
    animationEasing: 'elasticOut',
    animationDuration: 1000
  }, { replaceMerge: ['series'] })
}

const searchKeyword = (keyword) => {
  router.push({ path: '/main/dashboard', query: { search: keyword } })
}

const searchBridge = (bridge) => {
  closeWordCard()
  router.push({ path: '/main/dashboard', query: { search: bridge } })
}

const showWordDetail = (word) => {
  const wordInfo = wordEncyclopedia[word] || {
    name: word,
    definition: `"${word}"是古桥相关的重要词汇，在当前筛选条件下具有较高的出现频率。`,
    category: '词汇'
  }
  currentWordDetail.value = { name: word, ...wordInfo }
  showWordCard.value = true
  
  nextTick(() => {
    initWordTrendChart()
  })
}

const closeWordCard = () => {
  showWordCard.value = false
  wordTrendChart.value?.dispose()
}

const initWordTrendChart = () => {
  if (!wordTrendChartRef.value) return
  wordTrendChart.value = echarts.init(wordTrendChartRef.value)
  
  const data = dynastyList.map(dynasty => {
    const dynastyData = wordCloudFullData[curType.value][dynasty] || []
    const found = dynastyData.find(item => item.name === currentWordDetail.value.name)
    return found ? found.value : 0
  })
  
  const maxValue = Math.max(...data)
  const maxIndex = data.indexOf(maxValue)
  const peakDynasty = dynastyList[maxIndex]

  wordTrendChart.value.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      textStyle: { color: '#E8E4D8', fontSize: 12 },
      formatter: (params) => {
        const item = params[0]
        return `<div style="font-weight:600;color:#C9A961;margin-bottom:6px">${item.name}</div>
                <div style="color:#E8E4D8">词频权重: <span style="color:#C9A961;font-weight:600">${item.value}</span></div>`
      }
    },
    grid: { left: '12%', right: '5%', bottom: '22%', top: '15%' },
    xAxis: {
      type: 'category',
      data: dynastyList,
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 9, 
        rotate: 35,
        interval: 0
      },
      axisLine: { lineStyle: { color: 'rgba(201, 169, 97, 0.5)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(232, 228, 216, 0.7)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(201, 169, 97, 0.12)', type: 'dashed' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [{
      type: 'line',
      data: data,
      smooth: 0.4,
      symbol: 'circle',
      symbolSize: (value) => value === maxValue ? 10 : 6,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(201, 169, 97, 0.35)' },
          { offset: 1, color: 'rgba(201, 169, 97, 0.02)' }
        ])
      },
      lineStyle: { 
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#A68A3D' },
          { offset: 0.5, color: '#C9A961' },
          { offset: 1, color: '#D4AF37' }
        ]),
        width: 3,
        shadowColor: 'rgba(201, 169, 97, 0.3)',
        shadowBlur: 8
      },
      itemStyle: { 
        color: (params) => params.value === maxValue ? '#FFD700' : '#C9A961',
        borderColor: '#1A1A1A',
        borderWidth: 2
      },
      emphasis: {
        itemStyle: {
          color: '#FFD700',
          borderColor: '#C9A961',
          shadowColor: 'rgba(201, 169, 97, 0.5)',
          shadowBlur: 15
        }
      }
    }],
    graphic: maxValue > 0 ? [{
      type: 'text',
      right: '8%',
      top: '5%',
      style: {
        text: `峰值: ${peakDynasty}`,
        fill: 'rgba(201, 169, 97, 0.8)',
        fontSize: 11,
        fontWeight: 500
      }
    }] : []
  })
}

const showRelationNetwork = (word) => {
  relationCenterWord.value = word
  showRelationModal.value = true
  nextTick(() => {
    initRelationChart()
  })
}

const closeRelationModal = () => {
  showRelationModal.value = false
  relationChart.value?.dispose()
}

const initRelationChart = () => {
  if (!relationChartRef.value) return
  relationChart.value = echarts.init(relationChartRef.value)
  
  const centerWord = relationCenterWord.value
  const wordInfo = wordEncyclopedia[centerWord]
  
  const nodes = [{ id: centerWord, name: centerWord, category: 0, symbolSize: 60 }]
  const links = []
  
  if (wordInfo?.relatedBridges) {
    wordInfo.relatedBridges.forEach((bridge, i) => {
      nodes.push({ id: bridge, name: bridge, category: 1, symbolSize: 35 })
      links.push({ source: centerWord, target: bridge, value: '相关古桥' })
    })
  }
  
  if (wordInfo?.features) {
    wordInfo.features.forEach((feature, i) => {
      nodes.push({ id: `feature_${i}`, name: feature, category: 2, symbolSize: 25 })
      links.push({ source: centerWord, target: `feature_${i}`, value: '特点' })
    })
  }

  relationChart.value.setOption({
    tooltip: {
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      textStyle: { color: '#E8E4D8' }
    },
    legend: {
      data: ['中心词', '相关古桥', '特点'],
      textStyle: { color: '#E8E4D8' },
      top: 10
    },
    series: [{
      type: 'graph',
      layout: 'force',
      data: nodes,
      links: links,
      categories: [
        { name: '中心词', itemStyle: { color: '#C9A961' } },
        { name: '相关古桥', itemStyle: { color: '#B8423A' } },
        { name: '特点', itemStyle: { color: '#5B8C85' } }
      ],
      roam: true,
      label: { show: true, position: 'right', color: '#E8E4D8', fontSize: 11 },
      force: { repulsion: 200, edgeLength: 100 },
      lineStyle: { color: 'rgba(201, 169, 97, 0.5)', curveness: 0.1 },
      emphasis: {
        focus: 'adjacency',
        lineStyle: { width: 3 }
      }
    }]
  })
}

const initTrendChart = () => {
  if (!trendChartRef.value) return
  trendChart.value = echarts.init(trendChartRef.value)
  updateTrendChart()
}

const updateTrendChart = () => {
  if (!trendChart.value) return
  
  const colors = [
    { line: '#FFD700', area: 'rgba(255, 215, 0, 0.25)', gradient: ['#FFD700', '#D4AF37'] },
    { line: '#E07040', area: 'rgba(224, 112, 64, 0.25)', gradient: ['#E07040', '#C94A3A'] },
    { line: '#5B8C85', area: 'rgba(91, 140, 133, 0.25)', gradient: ['#5B8C85', '#3D6B65'] },
    { line: '#6B8E23', area: 'rgba(107, 142, 35, 0.25)', gradient: ['#6B8E23', '#556B2F'] },
    { line: '#CD853F', area: 'rgba(205, 133, 63, 0.25)', gradient: ['#CD853F', '#A0522D'] }
  ]
  
  const series = selectedTrendWords.value.map((word, index) => {
    const data = dynastyList.map(dynasty => {
      const dynastyData = wordCloudFullData[curType.value][dynasty] || []
      const found = dynastyData.find(item => item.name === word)
      return found ? found.value : 0
    })
    const colorIndex = index % colors.length
    return {
      name: word,
      type: 'line',
      smooth: 0.5,
      data: data,
      symbol: 'circle',
      symbolSize: 8,
      showSymbol: true,
      emphasis: {
        focus: 'series',
        scale: 1.5,
        itemStyle: {
          shadowBlur: 15,
          shadowColor: colors[colorIndex].line,
          borderWidth: 3
        }
      },
      lineStyle: { 
        width: 3,
        shadowBlur: 10,
        shadowColor: colors[colorIndex].line,
        shadowOffsetY: 5
      },
      itemStyle: {
        color: colors[colorIndex].line,
        borderWidth: 2,
        borderColor: '#1A1A1A',
        shadowBlur: 5,
        shadowColor: colors[colorIndex].line
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: colors[colorIndex].area },
            { offset: 0.5, color: colors[colorIndex].area.replace('0.25', '0.1') },
            { offset: 1, color: 'rgba(0, 0, 0, 0)' }
          ]
        }
      },
      animationDuration: 1500 + index * 200,
      animationEasing: 'cubicOut'
    }
  })

  trendChart.value.setOption({
    title: {
      text: '词汇趋势演变分析',
      left: 'center',
      top: 5,
      textStyle: {
        color: '#C9A961',
        fontSize: 14,
        fontFamily: 'Noto Serif SC, serif',
        fontWeight: 500
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [14, 18],
      textStyle: { color: '#E8E4D8', fontSize: 13 },
      extraCssText: 'box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4); border-radius: 10px;',
      axisPointer: {
        type: 'cross',
        lineStyle: {
          color: 'rgba(201, 169, 97, 0.4)',
          type: 'dashed',
          width: 1
        },
        crossStyle: {
          color: 'rgba(201, 169, 97, 0.4)',
          width: 1
        }
      },
      formatter: (params) => {
        if (!params || params.length === 0) return ''
        const dynasty = params[0].axisValue
        let html = `<div style="font-weight:600;color:#C9A961;font-size:15px;margin-bottom:10px;border-bottom:1px solid rgba(201,169,97,0.3);padding-bottom:8px">${dynasty}</div>`
        params.forEach((p) => {
          html += `
            <div style="display:flex;align-items:center;gap:8px;margin:6px 0">
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${p.color}"></span>
              <span style="color:#888;min-width:60px">${p.seriesName}</span>
              <span style="color:#E8E4D8;font-weight:500">${p.value}</span>
            </div>
          `
        })
        return html
      }
    },
    legend: {
      data: selectedTrendWords.value,
      textStyle: { color: '#E8E4D8', fontSize: 12 },
      top: 35,
      type: 'scroll',
      pageTextStyle: { color: '#E8E4D8' },
      pageIconColor: '#C9A961',
      pageIconInactiveColor: 'rgba(201, 169, 97, 0.3)',
      itemWidth: 20,
      itemHeight: 10,
      itemGap: 15
    },
    grid: { left: '6%', right: '4%', bottom: '15%', top: '22%', containLabel: true },
    xAxis: {
      type: 'category',
      data: dynastyList,
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 11, 
        rotate: 25,
        fontFamily: 'Noto Serif SC, serif',
        interval: 0
      },
      axisLine: { 
        lineStyle: { 
          color: 'rgba(201, 169, 97, 0.4)',
          width: 1
        } 
      },
      axisTick: { 
        show: true,
        lineStyle: { color: 'rgba(201, 169, 97, 0.3)' }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(201, 169, 97, 0.06)',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(232, 228, 216, 0.6)', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(201, 169, 97, 0.1)', type: 'dashed' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: series,
    dataZoom: [{
      type: 'slider',
      show: true,
      xAxisIndex: 0,
      height: 20,
      bottom: 5,
      startValue: 0,
      endValue: 8,
      borderColor: 'rgba(212, 175, 55, 0.5)',
      fillerColor: 'rgba(212, 175, 55, 0.25)',
      backgroundColor: 'rgba(30, 30, 30, 0.8)',
      handleStyle: {
        color: '#C9A961',
        borderColor: '#C9A961',
        borderWidth: 1
      },
      moveHandleStyle: {
        color: '#B8423A'
      },
      selectedDataBackground: {
        lineStyle: { color: '#C9A961' },
        areaStyle: { color: 'rgba(212, 175, 55, 0.2)' }
      },
      textStyle: {
        color: '#E8E4D8',
        fontSize: 10
      },
      brushSelect: false,
      zoomLock: false
    }, {
      type: 'inside',
      xAxisIndex: 0,
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
      preventDefaultMouseMove: true
    }],
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  }, { replaceMerge: ['series'] })
}

const getCrossTitle = () => {
  const dim1Label = crossDim1.value === 'dynasty' ? '朝代' : '类型'
  const dim2Label = crossDim2.value === 'dynasty' ? '朝代' : '类型'
  return `${dim1Label} × ${dim2Label} 交叉分析`
}

const getCrossValueLabel = () => {
  if (crossDim1.value === crossDim2.value) {
    return '相似度'
  }
  return '词频总和'
}

const initCrossChart = () => {
  if (!crossChartRef.value) return
  crossChart.value = echarts.init(crossChartRef.value)
  updateCrossChart()
}

const updateCrossChart = () => {
  if (!crossChart.value) return
  
  let dim1Values = []
  let dim2Values = []
  let data = []
  let maxVal = 0
  
  if (crossDim1.value === 'dynasty' && crossDim2.value === 'type') {
    dim1Values = dynastyList
    dim2Values = typeList.map(t => t.label)
    
    dynastyList.forEach((dynasty, i) => {
      typeList.forEach((typeObj, j) => {
        const typeData = wordCloudFullData[typeObj.value][dynasty] || []
        const totalValue = typeData.reduce((sum, item) => sum + item.value, 0)
        if (totalValue > maxVal) maxVal = totalValue
        data.push([i, j, totalValue])
      })
    })
  } else if (crossDim1.value === 'type' && crossDim2.value === 'dynasty') {
    dim1Values = typeList.map(t => t.label)
    dim2Values = dynastyList
    
    typeList.forEach((typeObj, i) => {
      dynastyList.forEach((dynasty, j) => {
        const typeData = wordCloudFullData[typeObj.value][dynasty] || []
        const totalValue = typeData.reduce((sum, item) => sum + item.value, 0)
        if (totalValue > maxVal) maxVal = totalValue
        data.push([i, j, totalValue])
      })
    })
  } else if (crossDim1.value === 'dynasty' && crossDim2.value === 'dynasty') {
    dim1Values = dynastyList
    dim2Values = dynastyList
    
    dynastyList.forEach((d1, i) => {
      dynastyList.forEach((d2, j) => {
        const data1 = wordCloudFullData[curType.value][d1] || []
        const data2 = wordCloudFullData[curType.value][d2] || []
        const words1 = new Set(data1.map(item => item.name))
        const words2 = new Set(data2.map(item => item.name))
        const commonWords = [...words1].filter(w => words2.has(w))
        const similarity = commonWords.length
        if (similarity > maxVal) maxVal = similarity
        data.push([i, j, similarity])
      })
    })
  } else if (crossDim1.value === 'type' && crossDim2.value === 'type') {
    dim1Values = typeList.map(t => t.label)
    dim2Values = typeList.map(t => t.label)
    
    typeList.forEach((t1, i) => {
      typeList.forEach((t2, j) => {
        let totalSim = 0
        dynastyList.forEach(dynasty => {
          const data1 = wordCloudFullData[t1.value][dynasty] || []
          const data2 = wordCloudFullData[t2.value][dynasty] || []
          const words1 = new Set(data1.map(item => item.name))
          const words2 = new Set(data2.map(item => item.name))
          const commonWords = [...words1].filter(w => words2.has(w))
          totalSim += commonWords.length
        })
        if (totalSim > maxVal) maxVal = totalSim
        data.push([i, j, totalSim])
      })
    })
  }

  crossChart.value.setOption({
    title: {
      text: getCrossTitle(),
      left: 'center',
      top: 5,
      textStyle: {
        color: '#C9A961',
        fontSize: 14,
        fontFamily: 'Noto Serif SC, serif',
        fontWeight: 500
      }
    },
    tooltip: {
      position: 'top',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [14, 18],
      textStyle: { color: '#E8E4D8', fontSize: 13 },
      extraCssText: 'box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4); border-radius: 10px;',
      formatter: (params) => {
        const d1 = dim1Values[params.data[0]]
        const d2 = dim2Values[params.data[1]]
        const val = params.data[2]
        const percent = maxVal > 0 ? ((val / maxVal) * 100).toFixed(1) : 0
        const valueLabel = getCrossValueLabel()
        return `
          <div style="font-weight:600;color:#C9A961;font-size:15px;margin-bottom:10px;border-bottom:1px solid rgba(201,169,97,0.3);padding-bottom:8px">${getCrossTitle()}</div>
          <div style="margin:6px 0"><span style="color:#888">${crossDim1.value === 'dynasty' ? '朝代' : '类型'}:</span> <span style="color:#E8E4D8">${d1}</span></div>
          <div style="margin:6px 0"><span style="color:#888">${crossDim2.value === 'dynasty' ? '朝代' : '类型'}:</span> <span style="color:#E8E4D8">${d2}</span></div>
          <div style="margin:6px 0"><span style="color:#888">${valueLabel}:</span> <span style="color:#FFD700;font-weight:600">${val}</span> <span style="color:#666;font-size:11px">(${percent}%)</span></div>
        `
      }
    },
    grid: { left: '15%', right: '12%', bottom: '18%', top: '15%' },
    xAxis: {
      type: 'category',
      data: dim2Values,
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 10, 
        rotate: 35,
        fontFamily: 'Noto Sans SC, sans-serif'
      },
      axisLine: { 
        lineStyle: { color: 'rgba(201, 169, 97, 0.4)' } 
      },
      axisTick: { 
        show: true,
        lineStyle: { color: 'rgba(201, 169, 97, 0.3)' }
      },
      splitArea: { 
        show: true, 
        areaStyle: { 
          color: ['rgba(201, 169, 97, 0.03)', 'rgba(201, 169, 97, 0.08)'] 
        } 
      }
    },
    yAxis: {
      type: 'category',
      data: dim1Values,
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 10,
        fontFamily: 'Noto Sans SC, sans-serif'
      },
      axisLine: { 
        lineStyle: { color: 'rgba(201, 169, 97, 0.4)' } 
      },
      axisTick: { 
        show: true,
        lineStyle: { color: 'rgba(201, 169, 97, 0.3)' }
      },
      splitArea: { 
        show: true, 
        areaStyle: { 
          color: ['rgba(201, 169, 97, 0.03)', 'rgba(201, 169, 97, 0.08)'] 
        } 
      }
    },
    visualMap: {
      min: 0,
      max: maxVal > 0 ? maxVal : 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '2%',
      inRange: {
        color: ['#1A3A3A', '#2D5A5A', '#4A6B6B', '#5B8C85', '#7A9A6B', '#8B7355', '#A68A3D', '#C9A961', '#D4AF37', '#FFD700']
      },
      textStyle: { 
        color: '#E8E4D8',
        fontSize: 11
      },
      itemWidth: 20,
      itemHeight: 140,
      text: ['高', '低'],
      textGap: [10, 0]
    },
    series: [{
      type: 'heatmap',
      data: data,
      label: { 
        show: true,
        color: '#E8E4D8',
        fontSize: 9,
        fontWeight: 500,
        formatter: (params) => params.data[2] > maxVal * 0.5 ? params.data[2] : ''
      },
      emphasis: {
        itemStyle: { 
          shadowBlur: 15, 
          shadowColor: 'rgba(201, 169, 97, 0.6)',
          borderColor: '#FFD700',
          borderWidth: 2
        }
      },
      itemStyle: {
        borderColor: 'rgba(26, 26, 26, 0.5)',
        borderWidth: 1
      }
    }],
    animationDuration: 1500,
    animationEasing: 'elasticOut'
  })
}

const toggleTrendWord = (word) => {
  const index = selectedTrendWords.value.indexOf(word)
  if (index > -1) {
    selectedTrendWords.value.splice(index, 1)
  } else if (selectedTrendWords.value.length < 5) {
    selectedTrendWords.value.push(word)
  }
  if (showTrend.value) updateTrendChart()
}

const toggleFavorite = (word) => {
  const index = favorites.value.indexOf(word)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(word)
  }
  localStorage.setItem('wordFavorites', JSON.stringify(favorites.value))
}

const clearFavorites = () => {
  favorites.value = []
  localStorage.setItem('wordFavorites', JSON.stringify([]))
}

const exportFavorites = () => {
  const content = favorites.value.join('\n')
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = '古桥词汇收藏.txt'
  link.click()
  URL.revokeObjectURL(url)
}

const toggleCompare = () => {
  showCompare.value = !showCompare.value
  if (showCompare.value) {
    showTimeline.value = false
    showTrend.value = false
    showCrossAnalysis.value = false
    nextTick(() => initCompareChart())
  }
}

const toggleTimeline = () => {
  showTimeline.value = !showTimeline.value
  if (showTimeline.value) {
    showCompare.value = false
    showTrend.value = false
    showCrossAnalysis.value = false
    curDynasty.value = dynastyList[timelineIndex.value]
  }
}

const toggleTrend = () => {
  showTrend.value = !showTrend.value
  if (showTrend.value) {
    showCompare.value = false
    showTimeline.value = false
    showCrossAnalysis.value = false
    nextTick(() => initTrendChart())
  }
}

const toggleCrossAnalysis = () => {
  showCrossAnalysis.value = !showCrossAnalysis.value
  if (showCrossAnalysis.value) {
    showCompare.value = false
    showTimeline.value = false
    showTrend.value = false
    nextTick(() => initCrossChart())
  }
}

const selectTimelineIndex = (index) => {
  timelineIndex.value = index
  onTimelineChange()
}

const onTimelineChange = () => {
  curDynasty.value = dynastyList[timelineIndex.value]
  updateWordCloud()
}

const playTimeline = () => {
  if (isPlaying.value) {
    clearInterval(timelineTimer)
    isPlaying.value = false
  } else {
    isPlaying.value = true
    timelineTimer = setInterval(() => {
      timelineIndex.value = (timelineIndex.value + 1) % dynastyList.length
      curDynasty.value = dynastyList[timelineIndex.value]
      updateWordCloud()
      if (timelineIndex.value === 0) {
        clearInterval(timelineTimer)
        isPlaying.value = false
      }
    }, parseInt(playSpeed.value))
  }
}

const stopTimeline = () => {
  clearInterval(timelineTimer)
  isPlaying.value = false
  timelineIndex.value = 0
  curDynasty.value = 'all'
  updateWordCloud()
}

const exportImage = () => {
  if (wordCloudChart.value) {
    const url = wordCloudChart.value.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#1A1A1A' })
    const link = document.createElement('a')
    link.download = `古桥词云_${currentDynastyLabel.value}_${currentTypeLabel.value}.png`
    link.href = url
    link.click()
  }
}

const handleResize = () => {
  wordCloudChart.value?.resize()
  compareChart.value?.resize()
  trendChart.value?.resize()
  crossChart.value?.resize()
  wordTrendChart.value?.resize()
  relationChart.value?.resize()
}

watch([curDynasty, curType], () => {
  if (!showTimeline.value) updateWordCloud()
})

watch([compareDynasty1, compareDynasty2], () => {
  if (showCompare.value) updateCompareChart()
})

watch([crossDim1, crossDim2], () => {
  if (showCrossAnalysis.value) updateCrossChart()
})

onMounted(() => {
  const savedFavorites = localStorage.getItem('wordFavorites')
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
  initWordCloud()
  if (showTrend.value) {
    nextTick(() => initTrendChart())
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  wordCloudChart.value?.dispose()
  compareChart.value?.dispose()
  trendChart.value?.dispose()
  crossChart.value?.dispose()
  wordTrendChart.value?.dispose()
  relationChart.value?.dispose()
  if (timelineTimer) clearInterval(timelineTimer)
})
</script>

<style lang="scss" scoped>
.wordcloud-analysis {
  padding: 0;
  position: relative;
  z-index: 1;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(26, 26, 26, 0.98) 100%);
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  backdrop-filter: blur(12px);
  flex-wrap: wrap;
  gap: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.5), transparent);
  }

  .toolbar-left {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
  }

  .toolbar-right {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .toolbar-item {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-size: 13px;
      color: #C9A961;
      white-space: nowrap;
      font-weight: 500;
    }
  }

  .select {
    padding: 8px 32px 8px 12px;
    background: linear-gradient(135deg, rgba(45, 90, 90, 0.4) 0%, rgba(35, 70, 70, 0.35) 100%);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 8px;
    color: #E8E4D8;
    font-size: 12px;
    min-width: 120px;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    
    &:hover {
      border-color: #C9A961;
      box-shadow: 0 0 15px rgba(201, 169, 97, 0.2);
    }

    &:focus {
      border-color: #C9A961;
      box-shadow: 0 0 0 2px rgba(201, 169, 97, 0.2);
    }
    
    option {
      background: #1a1a1a;
      color: #E8E4D8;
      padding: 8px;
    }
  }

  .btn {
    padding: 8px 16px;
    background: linear-gradient(135deg, rgba(45, 90, 90, 0.5) 0%, rgba(35, 70, 70, 0.4) 100%);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 8px;
    color: #E8E4D8;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(201, 169, 97, 0.15) 100%);
      border-color: #C9A961;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(201, 169, 97, 0.25);

      &::before {
        left: 100%;
      }
    }

    &.active {
      background: linear-gradient(135deg, rgba(201, 169, 97, 0.35) 0%, rgba(212, 175, 55, 0.2) 100%);
      border-color: #C9A961;
      color: #FFD700;
      box-shadow: 0 0 20px rgba(201, 169, 97, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
  }
}

.timeline-control {
  padding: 16px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
  border-radius: 10px;
  border: 1px solid rgba(212, 175, 55, 0.25);

  .timeline-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 12px;
    gap: 12px;

    .timeline-title {
      font-size: 14px;
      color: #C9A961;
      font-weight: 500;
      
      &.centered {
        text-align: center;
      }
    }

    .timeline-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .timeline-btn {
      padding: 6px 12px;
      background: rgba(45, 90, 90, 0.4);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 6px;
      color: #E8E4D8;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover:not(:disabled) {
        background: rgba(212, 175, 55, 0.2);
        border-color: #C9A961;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .speed-select {
      padding: 6px 10px;
      background: rgba(45, 90, 90, 0.35);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 6px;
      color: #E8E4D8;
      font-size: 11px;
      cursor: pointer;
    }
  }

  .timeline-slider {
    input[type="range"] {
      width: 100%;
      height: 6px;
      background: rgba(212, 175, 55, 0.2);
      border-radius: 3px;
      outline: none;
      -webkit-appearance: none;
      margin-bottom: 12px;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        background: linear-gradient(135deg, #C9A961, #D4AF37);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(201, 169, 97, 0.4);
      }
    }

    .timeline-labels {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;

      .timeline-label {
        font-size: 11px;
        color: rgba(232, 228, 216, 0.6);
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.3s;

        &:hover {
          color: #E8E4D8;
          background: rgba(212, 175, 55, 0.1);
        }

        &.active {
          color: #C9A961;
          background: rgba(212, 175, 55, 0.2);
          font-weight: 500;
        }
      }
    }
  }
}

.compare-section,
.trend-section,
.cross-section {
  padding: 20px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(26, 26, 26, 0.98) 100%);
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.5), transparent);
  }

  .compare-header,
  .trend-header,
  .cross-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
    gap: 14px;

    .compare-title,
    .trend-title,
    .cross-title {
      font-size: 15px;
      color: #C9A961;
      font-weight: 600;
      font-family: 'Noto Serif SC', serif;
      letter-spacing: 1px;
      
      &.centered {
        text-align: center;
      }
    }
  }

  .compare-selects,
  .cross-selects {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .compare-vs,
  .cross-multiply {
    color: #FFD700;
    font-weight: 700;
    font-size: 14px;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    align-self: center;
  }

  .compare-select,
  .cross-select {
    padding: 8px 14px;
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 8px;
    color: #E8E4D8;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 100px;

    &:hover {
      border-color: #C9A961;
      box-shadow: 0 0 15px rgba(201, 169, 97, 0.2);
      background: linear-gradient(135deg, rgba(35, 35, 35, 0.95) 0%, rgba(45, 45, 45, 0.9) 100%);
    }

    &:focus {
      border-color: #C9A961;
      box-shadow: 0 0 0 2px rgba(201, 169, 97, 0.2);
      outline: none;
    }

    option {
      background: #1a1a1a;
      color: #E8E4D8;
      padding: 8px;
    }
  }

  .cross-controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 600px;

    .cross-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .cross-item {
      display: flex;
      flex-direction: column;
      gap: 6px;

      label {
        font-size: 11px;
        color: rgba(232, 228, 216, 0.6);
        font-weight: 500;
      }
    }
  }

  .compare-chart,
  .trend-chart,
  .cross-chart {
    height: 300px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 8px;
  }

  .trend-keywords {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;

    .trend-label {
      font-size: 12px;
      color: rgba(232, 228, 216, 0.7);
      font-weight: 500;
    }

    .trend-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .trend-tag {
      padding: 6px 14px;
      background: linear-gradient(135deg, rgba(45, 90, 90, 0.35) 0%, rgba(35, 70, 70, 0.3) 100%);
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 16px;
      font-size: 12px;
      color: #E8E4D8;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-color: rgba(212, 175, 55, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(201, 169, 97, 0.15);
      }

      &.active {
        background: linear-gradient(135deg, rgba(201, 169, 97, 0.3) 0%, rgba(212, 175, 55, 0.15) 100%);
        border-color: #C9A961;
        color: #FFD700;
        box-shadow: 0 0 15px rgba(201, 169, 97, 0.25);
      }
    }
  }
}

.main-content {
  display: flex;
  gap: 16px;
  align-items: flex-start;

  .chart-panel {
    flex: 1;
    min-width: 0;
  }

  .side-panel {
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    .stats-panel {
      display: flex;
      flex-direction: column;
      max-height: 526px;
      
      .stats-list {
        flex: 1;
        overflow-y: auto;
      }
    }
  }
}

.panel-card {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(26, 26, 26, 0.98) 100%);
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.5), transparent);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.15);
    gap: 10px;
    background: linear-gradient(135deg, rgba(201, 169, 97, 0.05) 0%, rgba(212, 175, 55, 0.02) 100%);

    .header-left {
      flex: 1;
      display: flex;
      justify-content: flex-start;
    }

    .header-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

    .card-title {
      font-size: 15px;
      color: #C9A961;
      font-weight: 600;
      font-family: 'Noto Serif SC', serif;
      text-align: center;
      flex: 0 0 auto;
      letter-spacing: 1px;
    }

    .chart-info {
      font-size: 12px;
      color: rgba(232, 228, 216, 0.6);

      .highlight {
        color: #FFD700;
        font-weight: 600;
      }
    }
  }

  .chart-area {
    height: 480px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.stats-panel {
  display: flex;
  flex-direction: column;
  max-height: 526px;
  
  .stats-list {
    padding: 12px;
    flex: 1;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(45, 90, 90, 0.2);
      border-radius: 3px;
      margin: 4px 0;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, rgba(201, 169, 97, 0.5), rgba(212, 175, 55, 0.3));
      border-radius: 3px;
      border: 1px solid rgba(212, 175, 55, 0.2);
      
      &:hover {
        background: linear-gradient(180deg, rgba(201, 169, 97, 0.7), rgba(212, 175, 55, 0.5));
      }
    }
  }

  .stats-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    margin-bottom: 8px;
    background: linear-gradient(135deg, rgba(45, 90, 90, 0.15) 0%, rgba(26, 26, 26, 0.3) 100%);
    border: 1px solid rgba(212, 175, 55, 0.1);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
      transition: left 0.5s ease;
    }

    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(45, 90, 90, 0.2) 100%);
      border-color: rgba(212, 175, 55, 0.3);
      transform: translateX(6px);
      box-shadow: 0 4px 15px rgba(201, 169, 97, 0.15);

      &::before {
        left: 100%;
      }

      .bar-wrapper .bar {
        box-shadow: 0 0 10px rgba(201, 169, 97, 0.5);
      }
    }

    &:nth-child(1) {
      .rank { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); }
      .bar-wrapper .bar { background: linear-gradient(90deg, #FFD700, #FFA500); }
    }
    &:nth-child(2) {
      .rank { background: linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%); }
      .bar-wrapper .bar { background: linear-gradient(90deg, #C0C0C0, #A8A8A8); }
    }
    &:nth-child(3) {
      .rank { background: linear-gradient(135deg, #CD7F32 0%, #B87333 100%); }
      .bar-wrapper .bar { background: linear-gradient(90deg, #CD7F32, #B87333); }
    }

    .rank {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(91, 140, 133, 0.4) 0%, rgba(45, 90, 90, 0.5) 100%);
      border-radius: 6px;
      font-size: 11px;
      color: #E8E4D8;
      font-weight: 600;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

      &.top3 {
        color: #1a1a1a;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
      }
    }

    .keyword {
      flex: 0 0 70px;
      font-size: 13px;
      color: #E8E4D8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
    }

    .bar-wrapper {
      flex: 1;
      height: 8px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      overflow: hidden;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);

      .bar {
        height: 100%;
        background: linear-gradient(90deg, #C9A961, #D4AF37);
        border-radius: 4px;
        transition: width 0.5s ease;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent);
          border-radius: 4px 4px 0 0;
        }
      }
    }

    .value {
      font-size: 12px;
      color: #C9A961;
      flex-shrink: 0;
      font-weight: 600;
      min-width: 28px;
      text-align: right;
    }

    .favorite-btn {
      padding: 4px 8px;
      background: rgba(45, 90, 90, 0.3);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 4px;
      color: #E8E4D8;
      font-size: 10px;
      cursor: pointer;
      transition: all 0.3s;
      flex-shrink: 0;

      &:hover {
        background: rgba(212, 175, 55, 0.2);
        border-color: #C9A961;
      }

      &.favorited {
        background: rgba(212, 175, 55, 0.3);
        border-color: #C9A961;
        color: #C9A961;
      }
    }
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.favorite-panel {
  .card-header {
    .clear-favorites-btn {
      margin-left: auto;
      padding: 4px 10px;
      background: rgba(184, 66, 58, 0.2);
      border: 1px solid rgba(184, 66, 58, 0.3);
      border-radius: 4px;
      color: #B8423A;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: rgba(184, 66, 58, 0.3);
      }
    }
  }

  .favorite-list {
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .favorite-tag {
    padding: 6px 12px;
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 16px;
    font-size: 12px;
    color: #C9A961;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover {
      background: rgba(212, 175, 55, 0.25);
    }

    .remove-favorite {
      font-size: 14px;
      color: rgba(232, 228, 216, 0.5);

      &:hover {
        color: #B8423A;
      }
    }
  }

  .export-favorites-btn {
    width: calc(100% - 24px);
    margin: 0 12px 12px;
    padding: 8px;
    background: rgba(45, 90, 90, 0.3);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 6px;
    color: #E8E4D8;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: rgba(212, 175, 55, 0.2);
      border-color: #C9A961;
      color: #C9A961;
    }
  }
}

.word-card-overlay,
.relation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  padding: 20px;
  overflow-y: auto;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.word-card,
.relation-modal {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.99) 0%, rgba(45, 45, 45, 0.97) 50%, rgba(26, 26, 26, 0.99) 100%);
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 16px;
  max-width: 620px;
  width: 90%;
  max-height: 75vh;
  overflow-y: auto;
  position: relative;
  margin: 20px auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 169, 97, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  animation: slideUp 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #C9A961, #FFD700, #C9A961, transparent);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(201, 169, 97, 0.5), rgba(212, 175, 55, 0.3));
    border-radius: 3px;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.word-card-header,
.relation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 26px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);

  .header-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .word-card-title,
  .relation-title {
    font-size: 22px;
    color: #FFD700;
    font-weight: 600;
    margin: 0;
    font-family: 'STKaiti', 'KaiTi', serif;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  }

  .word-card-category {
    padding: 5px 16px;
    border-radius: 16px;
    font-size: 11px;
    color: #fff;
    font-weight: 500;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .relation-center {
    font-size: 12px;
    color: rgba(232, 228, 216, 0.7);
    margin-left: auto;
  }

  .close-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(184, 66, 58, 0.2) 0%, rgba(184, 66, 58, 0.1) 100%);
    border: 1px solid rgba(184, 66, 58, 0.35);
    border-radius: 50%;
    color: #B8423A;
    font-size: 22px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, rgba(184, 66, 58, 0.35) 0%, rgba(184, 66, 58, 0.2) 100%);
      transform: rotate(90deg) scale(1.1);
      box-shadow: 0 0 15px rgba(184, 66, 58, 0.3);
    }
  }
}

.word-card-body {
  padding: 26px;
}

.word-info-section {
  margin-bottom: 24px;

  .info-row {
    display: flex;
    gap: 16px;
    margin-top: 12px;
  }

  .info-item {
    margin-bottom: 14px;

    &.half {
      flex: 1;
      margin-bottom: 0;
    }

    .info-label {
      font-size: 11px;
      color: rgba(201, 169, 97, 0.9);
      font-weight: 600;
      margin-bottom: 8px;
      display: block;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .info-text {
      font-size: 13px;
      color: #E8E4D8;
      line-height: 1.7;
      margin: 0;
    }
    
    .literature-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 4px;
    }
    
    .literature-tag {
      padding: 5px 12px;
      background: linear-gradient(135deg, rgba(91, 140, 133, 0.2) 0%, rgba(91, 140, 133, 0.1) 100%);
      border: 1px solid rgba(91, 140, 133, 0.35);
      border-radius: 16px;
      font-size: 11px;
      color: #8CBEB5;
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(135deg, rgba(91, 140, 133, 0.3) 0%, rgba(91, 140, 133, 0.15) 100%);
        transform: translateY(-1px);
      }
    }
  }
}

.word-related-section {
  margin-bottom: 20px;
  padding: 18px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%);
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.15);

  .section-title {
    font-size: 13px;
    color: #C9A961;
    font-weight: 600;
    margin-bottom: 14px;
    display: block;
    letter-spacing: 0.5px;
  }

  .related-bridges,
  .related-features {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .related-tag {
    padding: 7px 16px;
    border-radius: 20px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.bridge-tag {
      background: linear-gradient(135deg, rgba(184, 66, 58, 0.25) 0%, rgba(184, 66, 58, 0.12) 100%);
      border: 1px solid rgba(184, 66, 58, 0.4);
      color: #E07040;

      &:hover {
        background: linear-gradient(135deg, rgba(184, 66, 58, 0.35) 0%, rgba(184, 66, 58, 0.2) 100%);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(184, 66, 58, 0.25);
      }
    }

    &.feature-tag {
      background: linear-gradient(135deg, rgba(91, 140, 133, 0.25) 0%, rgba(91, 140, 133, 0.12) 100%);
      border: 1px solid rgba(91, 140, 133, 0.4);
      color: #6B9A8D;

      &:hover {
        background: linear-gradient(135deg, rgba(91, 140, 133, 0.35) 0%, rgba(91, 140, 133, 0.2) 100%);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(91, 140, 133, 0.25);
      }
    }
  }
}

.word-trend-section {
  margin-bottom: 20px;
  padding: 18px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 100%);
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.2);

  .section-title {
    font-size: 13px;
    color: #C9A961;
    font-weight: 600;
    margin-bottom: 6px;
    display: block;
    letter-spacing: 0.5px;
  }
  
  .section-desc {
    font-size: 11px;
    color: rgba(232, 228, 216, 0.5);
    margin-bottom: 14px;
    display: block;
  }

  .word-trend-chart {
    height: 160px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    border: 1px solid rgba(201, 169, 97, 0.1);
  }
}

.word-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  padding-top: 10px;

  .action-btn {
    flex: 1;
    min-width: 110px;
    padding: 14px 20px;
    border-radius: 12px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid;
    font-weight: 500;
    
    .btn-icon {
      font-size: 15px;
    }

    &.favorite {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.12) 100%);
      border-color: rgba(212, 175, 55, 0.45);
      color: #FFD700;

      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.2) 100%);
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(201, 169, 97, 0.3);
      }
    }

    &.search {
      background: linear-gradient(135deg, rgba(91, 140, 133, 0.25) 0%, rgba(91, 140, 133, 0.12) 100%);
      border-color: rgba(91, 140, 133, 0.45);
      color: #6B9A8D;

      &:hover {
        background: linear-gradient(135deg, rgba(91, 140, 133, 0.35) 0%, rgba(91, 140, 133, 0.2) 100%);
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(91, 140, 133, 0.3);
      }
    }

    &.network {
      background: linear-gradient(135deg, rgba(184, 66, 58, 0.25) 0%, rgba(184, 66, 58, 0.12) 100%);
      border-color: rgba(184, 66, 58, 0.45);
      color: #E07040;

      &:hover {
        background: linear-gradient(135deg, rgba(184, 66, 58, 0.35) 0%, rgba(184, 66, 58, 0.2) 100%);
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(184, 66, 58, 0.3);
      }
    }
  }
}

.relation-chart {
  height: 350px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  animation: slideUp 0.4s ease-out;
}

.slide-up-leave-active {
  animation: slideDown 0.3s ease-in;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideDown {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
}

@media (max-width: 1400px) {
  .main-content {
    flex-direction: column;
    
    .side-panel {
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
      
      .panel-card {
        flex: 1;
        min-width: 280px;
      }
    }
  }
  
  .chart-area {
    height: 380px;
  }
}

@media (max-width: 1024px) {
  .toolbar {
    flex-direction: column;
    align-items: flex-start;
    
    .toolbar-left,
    .toolbar-right {
      width: 100%;
      justify-content: flex-start;
    }
    
    .toolbar-item {
      flex: 1;
      min-width: 140px;
    }
    
    .btn {
      flex: 1;
      min-width: 80px;
      text-align: center;
    }
  }
  
  .main-content {
    .side-panel {
      flex-direction: column;
      
      .panel-card {
        min-width: 100%;
      }
    }
  }
  
  .chart-area {
    height: 350px;
  }
  
  .compare-chart,
  .trend-chart,
  .cross-chart {
    height: 220px;
  }
}

@media (max-width: 768px) {
  .toolbar {
    padding: 10px 12px;
    
    .toolbar-item {
      label {
        font-size: 12px;
      }
      
      .select {
        min-width: 100px;
        padding: 6px 28px 6px 10px;
        font-size: 12px;
      }
    }
    
    .btn {
      padding: 6px 10px;
      font-size: 11px;
    }
  }
  
  .timeline-control {
    padding: 12px;
    
    .timeline-header {
      flex-direction: column;
      align-items: center;
    }
    
    .timeline-labels {
      .timeline-label {
        font-size: 10px;
        padding: 2px 4px;
      }
    }
  }
  
  .compare-section,
  .trend-section,
  .cross-section {
    padding: 12px;
    
    .compare-header,
    .trend-header,
    .cross-header {
      flex-direction: column;
      align-items: center;
    }
    
    .compare-selects,
    .cross-selects {
      width: 100%;
    }
    
    .trend-keywords {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  
  .main-content {
    gap: 12px;
  }
  
  .panel-card {
    .card-header {
      padding: 10px 12px;
      
      .card-title {
        font-size: 13px;
      }
      
      .chart-info {
        font-size: 11px;
      }
    }
    
    .chart-area {
      height: 300px;
    }
  }
  
  .stats-panel {
    .stats-list {
      max-height: 350px;
    }
    
    .stats-item {
      padding: 8px 10px;
      gap: 8px;
      
      .rank {
        width: 20px;
        height: 20px;
        font-size: 10px;
      }
      
      .keyword {
        width: 55px;
        font-size: 11px;
      }
      
      .value {
        font-size: 10px;
      }
      
      .favorite-btn {
        display: none;
      }
    }
  }
  
  .word-card,
  .relation-modal {
    width: 95%;
    max-height: 75vh;
    margin: 10px auto;
    
    .word-card-header,
    .relation-header {
      padding: 12px 16px;
      
      .word-card-title,
      .relation-title {
        font-size: 16px;
      }
    }
    
    .word-card-body {
      padding: 16px;
    }
    
    .word-info-section {
      .info-item {
        .info-label {
          font-size: 11px;
        }
        
        .info-text {
          font-size: 12px;
        }
      }
    }
    
    .word-trend-chart {
      height: 120px;
    }
    
    .word-actions {
      flex-direction: column;
      
      .action-btn {
        width: 100%;
      }
    }
  }
  
  .relation-chart {
    height: 280px;
  }
}

@media (max-width: 480px) {
  .toolbar {
    .toolbar-left {
      gap: 8px;
    }
    
    .toolbar-item {
      min-width: 100%;
      
      .select {
        width: 100%;
      }
    }
    
    .btn {
      font-size: 10px;
      padding: 5px 8px;
    }
  }
  
  .chart-area {
    height: 250px;
  }
  
  .panel-card {
    .card-header {
      flex-wrap: wrap;
      gap: 6px;
      
      .chart-info {
        width: 100%;
        margin-left: 0;
        text-align: center;
      }
    }
  }
}
</style>
