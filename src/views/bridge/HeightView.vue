﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="height-container">
    <div class="top-section">
      <div class="champion-card" @click="goToDetailById(lengthRanking[0]?.id)">
        <div class="champion-image">
          <img :src="getBridgeImage(lengthRanking[0]?.name)" :alt="lengthRanking[0]?.name" />
          <div class="image-overlay"></div>
        </div>
        <div class="champion-info-bar">
          <div class="info-left">
            <span class="rank-badge"><component :is="getIcon('trophy')" /> No.1</span>
            <div class="bridge-name">
              <h3>{{ lengthRanking[0]?.name }}</h3>
              <p class="bridge-location">{{ lengthRanking[0]?.province }} · {{ lengthRanking[0]?.city }}</p>
            </div>
          </div>
          <div class="info-right">
            <div class="height-display">
              <span class="height-value">{{ lengthRanking[0]?.length }}</span>
              <span class="height-unit">米</span>
            </div>
            <div class="meta-tags">
              <span>{{ lengthRanking[0]?.dynasty }}</span>
              <span>{{ lengthRanking[0]?.bridgeType }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="runner-ups">
        <div class="runner-up-image-card" v-for="(bridge, index) in lengthRanking.slice(1, 3)" :key="bridge.rank" @click="goToDetailById(bridge.id)">
          <div class="runner-up-image">
            <img :src="getBridgeImage(bridge.name)" :alt="bridge.name" />
            <div class="image-overlay"></div>
          </div>
          <div class="runner-up-info-bar">
            <div class="info-left">
              <span class="rank-badge">{{ getRankIcon(index + 2) }}</span>
              <div class="bridge-name">
                <h4>{{ bridge.name }}</h4>
                <p class="bridge-location">{{ bridge.province }} · {{ bridge.city }}</p>
              </div>
            </div>
            <div class="info-right">
              <div class="height-display">
                <span class="height-value">{{ bridge.length }}</span>
                <span class="height-unit">米</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-content">
            <span class="stat-value">{{ averageLength }}<span class="stat-unit">米</span></span>
            <span class="stat-label">平均长度</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-content">
            <span class="stat-value">{{ lengthRange }}<span class="stat-unit">米</span></span>
            <span class="stat-label">长度差距</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-content">
            <span class="stat-value">{{ lengthRanking.length }}<span class="stat-unit">座</span></span>
            <span class="stat-label">收录古桥</span>
          </div>
        </div>
      </div>
    </div>

    <div class="charts-section">
      <div class="left-charts">
        <div class="panel-card">
          <div class="card-footer"></div>
          <div class="card-header">
            <span class="card-title">长度TOP20排行</span>
            <HelpTip title="长度排行说明" content="展示中国现存古桥长度排名前二十的建筑。长度数据来源于官方测量记录，点击桥名可查看详细信息。" />
          </div>
          <div id="heightRankingChart" class="chart-area-large"></div>
        </div>
      </div>

      <div class="center-charts">
        <div class="panel-card">
          <div class="card-footer"></div>
          <div class="card-header">
            <span class="card-title">跨度分布区间</span>
            <HelpTip title="跨度分布说明" content="展示古桥跨度的分布情况，按不同跨度区间统计古桥数量，反映中国古桥跨度的整体分布特征。" />
          </div>
          <div id="heightDistributionChart" class="chart-area"></div>
        </div>

        <div class="panel-card">
          <div class="card-footer"></div>
          <div class="card-header">
            <span class="card-title">省份跨度TOP10</span>
            <HelpTip title="省份跨度TOP10说明" content="展示各省份最大跨度古桥的排名情况，反映不同地区古桥建筑规模的地域特征。" />
          </div>
          <div id="provinceSpanChart" class="chart-area"></div>
        </div>
      </div>

      <div class="right-charts">
        <div class="panel-card">
          <div class="card-footer"></div>
          <div class="card-header">
            <span class="card-title">朝代跨度对比</span>
            <HelpTip title="朝代跨度对比说明" content="对比不同朝代建造的古桥平均跨度，反映各历史时期古桥建筑规模的变化趋势。" />
          </div>
          <div id="dynastyHeightChart" class="chart-area"></div>
        </div>

        <div class="panel-card">
          <div class="card-footer"></div>
          <div class="card-header">
            <span class="card-title">材质跨度对比</span>
            <HelpTip title="材质跨度对比说明" content="对比不同建筑材料（石、木、砖等）的古桥平均跨度，展示材料选择对建筑规模的影响。" />
          </div>
          <div id="materialHeightChart" class="chart-area"></div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="panel-card">
        <div class="card-footer"></div>
        <div class="card-header">
          <span class="card-title">跨度排行榜</span>
          <div class="filter-group">
            <select v-model="filterDynasty">
              <option value="">全部朝代</option>
              <option v-for="d in dynasties" :key="d" :value="d">{{ d }}</option>
            </select>
            <select v-model="filterType">
              <option value="">全部桥型</option>
              <option v-for="t in bridgeTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>
        <div class="ranking-table">
          <div class="table-header">
            <span class="col-rank">排名</span>
            <span class="col-name">古桥名称</span>
            <span class="col-location">所在地</span>
            <span class="col-dynasty">朝代</span>
            <span class="col-type">桥型</span>
            <span class="col-height">跨度</span>
          </div>
          <div class="table-body">
            <div 
              v-for="bridge in filteredRanking" 
              :key="bridge.rank" 
              class="table-row"
              @click="goToDetail(bridge.rank)"
            >
              <span class="col-rank">
                <span class="rank-badge" :class="getRankClass(bridge.rank)">
                  {{ bridge.rank }}
                </span>
              </span>
              <span class="col-name">{{ bridge.name }}</span>
              <span class="col-location">{{ bridge.province }} {{ bridge.city }}</span>
              <span class="col-dynasty">{{ bridge.dynasty }}</span>
              <span class="col-type">{{ bridge.bridgeType }}</span>
              <span class="col-height">{{ bridge.span }}m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, shallowRef, h } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'

const IconTrophy = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M12 15a5 5 0 0 0 5-5V3H7v7a5 5 0 0 0 5 5z', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.2 }),
      h('path', { d: 'M7 5H5a2 2 0 0 0 0 4h2', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M17 5h2a2 2 0 0 1 0 4h-2', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M12 15v3', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M8 21h8', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
      h('path', { d: 'M9 18h6l1 3H8l1-3z', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.15 }),
      h('path', { d: 'M12 6v4M10 8h4', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
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

const IconTrend = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M3 17l6-6 4 4 8-8', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('path', { d: 'M17 7h4v4', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
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

const IconRuler = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M4 4h16v16H4z', stroke: 'currentColor', 'stroke-width': 1.5, rx: 2 }),
      h('path', { d: 'M4 9h4M4 14h4M16 9h4M16 14h4M9 4v4M14 4v4M9 16v4M14 16v4', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', opacity: 0.5 })
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

const IconMedal = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('circle', { cx: 12, cy: 8, r: 5, stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.2 }),
      h('path', { d: 'M8 21l4-4 4 4M12 13v4', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
    ])
  }
}

const iconMap = {
  trophy: IconTrophy,
  chart: IconChart,
  trend: IconTrend,
  bridge: IconBridge,
  ruler: IconRuler,
  build: IconBuild,
  material: IconMaterial,
  medal: IconMedal
}

const getIcon = (name) => iconMap[name] || IconChart
import spanRanking from '@/assets/data/spanRanking.json'
import bridgeData from '@/assets/data/bridges.json'
import HelpTip from '@/components/business/HelpTip.vue'

const router = useRouter()

const lengthRanking = computed(() => {
  return bridgeData.bridges
    .filter(b => b.length && b.length > 0)
    .map(b => ({
      rank: 0,
      name: b.name,
      length: b.length,
      span: b.span,
      province: b.province,
      city: b.city,
      dynasty: b.dynasty,
      bridgeType: b.bridgeType,
      archCount: b.archCount || 0,
      id: b.id
    }))
    .sort((a, b) => b.length - a.length)
    .map((b, index) => ({ ...b, rank: index + 1 }))
})

const topBridges = spanRanking.ranking
const filterDynasty = ref('')
const filterType = ref('')

const dynasties = ['唐', '宋', '元', '明', '清', '民国']
const bridgeTypes = ['拱桥', '梁桥', '廊桥', '索桥', '浮桥', '其他']

const filteredRanking = computed(() => {
  let data = spanRanking.ranking
  if (filterDynasty.value) {
    data = data.filter(b => b.dynasty === filterDynasty.value)
  }
  if (filterType.value) {
    data = data.filter(b => b.bridgeType === filterType.value)
  }
  return data
})

const heightRankingChart = shallowRef()
const heightDistributionChart = shallowRef()
const provinceSpanChart = shallowRef()
const dynastyHeightChart = shallowRef()
const materialHeightChart = shallowRef()

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  heightRankingChart.value?.dispose()
  heightDistributionChart.value?.dispose()
  provinceSpanChart.value?.dispose()
  dynastyHeightChart.value?.dispose()
  materialHeightChart.value?.dispose()
})

const handleResize = () => {
  heightRankingChart.value?.resize()
  heightDistributionChart.value?.resize()
  provinceSpanChart.value?.resize()
  dynastyHeightChart.value?.resize()
  materialHeightChart.value?.resize()
}

const averageLength = computed(() => {
  const lengths = lengthRanking.value.map(b => b.length)
  return (lengths.reduce((a, b) => a + b, 0) / lengths.length).toFixed(1)
})

const lengthRange = computed(() => {
  const lengths = lengthRanking.value.map(b => b.length)
  return (Math.max(...lengths) - Math.min(...lengths)).toFixed(1)
})

const getRankIcon = (rank) => {
  const icons = { 1: '🥇', 2: '🥈', 3: '🥉' }
  return icons[rank] || `${rank + 1}`
}

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

const getBridgeImage = (name) => {
  return bridgeImageMap[name] || defaultImage
}

const getRankClass = (rank) => {
  if (rank === 1) return 'gold'
  if (rank === 2) return 'silver'
  if (rank === 3) return 'bronze'
  return ''
}

const goToDetail = (rank) => {
  const bridge = spanRanking.ranking.find(b => b.rank === rank)
  if (bridge) {
    const originalBridge = bridgeData.bridges.find(b => b.name === bridge.name)
    if (originalBridge) {
      router.push(`/main/bridge/${originalBridge.id}`)
    }
  }
}

const goToDetailById = (id) => {
  if (id) {
    router.push(`/main/bridge/${id}`)
  }
}

const initCharts = () => {
  initHeightRankingChart()
  initHeightDistributionChart()
  initProvinceSpanChart()
  initDynastyHeightChart()
  initMaterialHeightChart()
}

const initHeightRankingChart = () => {
  heightRankingChart.value = echarts.init(document.getElementById('heightRankingChart'))
  
  const top20 = lengthRanking.value.slice(0, 20).reverse()
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [10, 14],
      extraCssText: 'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); border-radius: 6px;',
      textStyle: { color: '#E8E4D8', fontSize: 12 },
      formatter: function(params) {
        const data = params[0]
        const bridge = top20[data.dataIndex]
        return `
          <div style="min-width: 160px;">
            <div style="font-weight:700;color:#C9A961;font-size:14px;margin-bottom:8px">${data.name}</div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">长度</span>
              <span style="color:#FFD700;font-weight:600">${data.value}米</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">排名</span>
              <span style="color:#B8423A">第 ${bridge.rank} 位</span>
            </div>
          </div>
        `
      }
    },
    grid: {
      left: '3%',
      right: '15%',
      top: '3%',
      bottom: '10%',
      containLabel: true
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        yAxisIndex: 0,
        width: 20,
        right: 10,
        startValue: 0,
        endValue: 19,
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
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
        preventDefaultMouseMove: true
      }
    ],
    xAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(232, 228, 216, 0.7)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.15)' } },
      axisLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.3)' } }
    },
    yAxis: {
      type: 'category',
      data: top20.map(b => b.name),
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 10,
        rich: {
          rank1: { color: '#FFD700', fontWeight: 'bold' },
          rank2: { color: '#E8E8E8', fontWeight: 'bold' },
          rank3: { color: '#CD7F32', fontWeight: 'bold' }
        }
      },
      axisLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.3)' } }
    },
    series: [{
      type: 'bar',
      data: top20.map((b, i) => ({
        value: b.length,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: getSpanColor(19 - i, 'start') },
            { offset: 0.5, color: getSpanColor(19 - i, 'mid') || getSpanColor(19 - i, 'end') },
            { offset: 1, color: getSpanColor(19 - i, 'end') }
          ]),
          borderRadius: [0, 8, 8, 0],
          shadowColor: getSpanColor(19 - i, 'glow'),
          shadowBlur: 12,
          shadowOffsetX: 3
        }
      })),
      barWidth: '55%',
      label: {
        show: true,
        position: 'right',
        color: '#FFD700',
        fontSize: 11,
        fontWeight: 'bold',
        formatter: '{c}m',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowBlur: 3
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 25,
          shadowColor: 'rgba(255, 215, 0, 0.6)'
        }
      },
      animationDelay: (idx) => idx * 50
    }],
    animationDuration: 1500,
    animationEasing: 'elasticOut'
  }
  
  heightRankingChart.value.setOption(option)
  
  heightRankingChart.value.on('click', function(params) {
    if (params.componentType === 'series') {
      const top20 = lengthRanking.value.slice(0, 20).reverse()
      const clickedBridge = top20[params.dataIndex]
      if (clickedBridge && clickedBridge.id) {
        router.push(`/main/bridge/${clickedBridge.id}`)
      }
    }
  })
}

const getSpanColor = (rank, type) => {
  const colorSchemes = [
    { start: '#FFD700', mid: '#FFA500', end: '#FF8C00', glow: 'rgba(255, 215, 0, 0.5)' },
    { start: '#E8E8E8', mid: '#C0C0C0', end: '#A8A8A8', glow: 'rgba(200, 200, 200, 0.4)' },
    { start: '#CD7F32', mid: '#B87333', end: '#8B5A2B', glow: 'rgba(205, 127, 50, 0.4)' },
    { start: '#FFD700', mid: '#C9A961', end: '#A68A3D', glow: 'rgba(212, 175, 55, 0.4)' },
    { start: '#C9A961', mid: '#B8993D', end: '#996515', glow: 'rgba(212, 175, 55, 0.3)' },
    { start: '#C9A961', mid: '#A87D14', end: '#8B6914', glow: 'rgba(212, 175, 55, 0.3)' },
    { start: '#FF6B6B', mid: '#E05050', end: '#B8423A', glow: 'rgba(197, 61, 67, 0.4)' },
    { start: '#FF6B6B', mid: '#D04040', end: '#B8353A', glow: 'rgba(197, 61, 67, 0.3)' },
    { start: '#E07040', mid: '#C04030', end: '#A53035', glow: 'rgba(197, 61, 67, 0.3)' },
    { start: '#7FBFBF', mid: '#6BA8A8', end: '#5B8C85', glow: 'rgba(91, 140, 133, 0.4)' },
    { start: '#6BA8A8', mid: '#5A9090', end: '#4A7A74', glow: 'rgba(91, 140, 133, 0.3)' },
    { start: '#5B9EA8', mid: '#4A8888', end: '#3D6863', glow: 'rgba(91, 140, 133, 0.3)' },
    { start: '#5B9B9B', mid: '#4A8080', end: '#4A6B6B', glow: 'rgba(45, 90, 90, 0.3)' },
    { start: '#4A8B8B', mid: '#3A7070', end: '#264D4D', glow: 'rgba(45, 90, 90, 0.3)' },
    { start: '#4A8B8B', mid: '#3A6060', end: '#1F4040', glow: 'rgba(45, 90, 90, 0.3)' },
    { start: '#C4956A', mid: '#A57040', end: '#8B4513', glow: 'rgba(139, 69, 19, 0.4)' },
    { start: '#A0522D', mid: '#8A4520', end: '#753A10', glow: 'rgba(139, 69, 19, 0.3)' },
    { start: '#A0522D', mid: '#7A3818', end: '#5F300D', glow: 'rgba(139, 69, 19, 0.3)' },
    { start: '#8FA4B8', mid: '#8090A0', end: '#708090', glow: 'rgba(112, 128, 144, 0.4)' },
    { start: '#7A8B99', mid: '#6A7A88', end: '#5A6A7A', glow: 'rgba(112, 128, 144, 0.3)' }
  ]
  const scheme = colorSchemes[rank] || colorSchemes[3]
  return type === 'start' ? scheme.start : type === 'mid' ? scheme.mid : type === 'end' ? scheme.end : scheme.glow
}

const initHeightDistributionChart = () => {
  heightDistributionChart.value = echarts.init(document.getElementById('heightDistributionChart'))
  
  const typeSpans = {}
  bridgeData.bridges.forEach(bridge => {
    if (!typeSpans[bridge.bridgeType]) {
      typeSpans[bridge.bridgeType] = []
    }
    typeSpans[bridge.bridgeType].push(bridge.span)
  })
  
  const boxplotData = []
  const categories = []
  
  Object.entries(typeSpans).forEach(([type, spans]) => {
    if (spans.length >= 3) {
      const sorted = spans.slice().sort((a, b) => a - b)
      const min = sorted[0]
      const max = sorted[sorted.length - 1]
      const q1 = sorted[Math.floor(sorted.length * 0.25)]
      const median = sorted[Math.floor(sorted.length * 0.5)]
      const q3 = sorted[Math.floor(sorted.length * 0.75)]
      
      boxplotData.push([min, q1, median, q3, max])
      categories.push(type)
    }
  })
  
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [10, 14],
      extraCssText: 'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); border-radius: 6px;',
      textStyle: { color: '#E8E4D8', fontSize: 12 },
      formatter: function(params) {
        if (params.seriesType === 'boxplot') {
          const data = params.data
          return `
            <div style="min-width: 140px;">
              <div style="font-weight:700;color:#C9A961;font-size:14px;margin-bottom:8px">${params.name}</div>
              <div style="display:flex;justify-content:space-between;margin:4px 0">
                <span style="color:#888">最小值</span>
                <span style="color:#FFD700">${data[1]}m</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin:4px 0">
                <span style="color:#888">Q1</span>
                <span style="color:#E8E4D8">${data[2]}m</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin:4px 0">
                <span style="color:#888">中位数</span>
                <span style="color:#FFD700;font-weight:600">${data[3]}m</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin:4px 0">
                <span style="color:#888">Q3</span>
                <span style="color:#E8E4D8">${data[4]}m</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin:4px 0">
                <span style="color:#888">最大值</span>
                <span style="color:#FFD700">${data[5]}m</span>
              </div>
            </div>
          `
        }
        return ''
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 10,
        rotate: 30
      },
      axisLine: { lineStyle: { color: '#C9A961' } },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '跨度(m)',
      nameTextStyle: { color: '#E8E4D8', fontSize: 10 },
      axisLabel: { color: '#E8E4D8', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.15)' } },
      axisLine: { lineStyle: { color: '#C9A961' } }
    },
    series: [{
      name: '跨度分布',
      type: 'boxplot',
      data: boxplotData,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255, 215, 0, 0.7)' },
          { offset: 0.5, color: 'rgba(212, 175, 55, 0.6)' },
          { offset: 1, color: 'rgba(197, 61, 67, 0.5)' }
        ]),
        borderColor: '#FFD700',
        borderWidth: 2,
        shadowBlur: 8,
        shadowColor: 'rgba(212, 175, 55, 0.3)'
      },
      emphasis: {
        itemStyle: {
          borderWidth: 3,
          borderColor: '#FFD700',
          shadowBlur: 15,
          shadowColor: 'rgba(255, 215, 0, 0.5)'
        }
      }
    }],
    animationDuration: 1500,
    animationEasing: 'elasticOut'
  }
  
  heightDistributionChart.value.setOption(option)
}

const initProvinceSpanChart = () => {
  provinceSpanChart.value = echarts.init(document.getElementById('provinceSpanChart'))
  
  const provinceSpans = {}
  bridgeData.bridges.forEach(bridge => {
    if (!provinceSpans[bridge.province]) {
      provinceSpans[bridge.province] = { max: 0, bridge: '' }
    }
    if (bridge.span > provinceSpans[bridge.province].max) {
      provinceSpans[bridge.province] = { max: bridge.span, bridge: bridge.name }
    }
  })
  
  const data = Object.entries(provinceSpans)
    .map(([province, info]) => ({
      province,
      max: info.max,
      bridge: info.bridge
    }))
    .sort((a, b) => b.max - a.max)
    .slice(0, 10)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [10, 14],
      extraCssText: 'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); border-radius: 6px;',
      textStyle: { color: '#E8E4D8', fontSize: 12 },
      formatter: function(params) {
        const item = data[params[0].dataIndex]
        return `
          <div style="min-width: 160px;">
            <div style="font-weight:700;color:#C9A961;font-size:14px;margin-bottom:8px">${item.province}</div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">最大跨度</span>
              <span style="color:#FFD700;font-weight:600">${item.max}米</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">代表古桥</span>
              <span style="color:#B8423A">${item.bridge}</span>
            </div>
          </div>
        `
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(212, 175, 55, 0.1)'
        }
      }
    },
    grid: {
      left: '3%',
      right: '20%',
      top: '10%',
      bottom: '15%',
      containLabel: true
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        yAxisIndex: 0,
        width: 20,
        right: 10,
        startValue: 0,
        endValue: 9,
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
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
        preventDefaultMouseMove: true
      }
    ],
    xAxis: {
      type: 'value',
      axisLabel: { color: '#E8E4D8', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.15)' } }
    },
    yAxis: {
      type: 'category',
      data: data.map(d => d.province).reverse(),
      axisLabel: { color: '#E8E4D8', fontSize: 10 },
      axisLine: { lineStyle: { color: '#C9A961' } }
    },
    series: [{
      type: 'bar',
      data: data.map((d, i) => ({
        value: d.max,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: i < 3 ? '#FFD700' : '#C9A961' },
            { offset: 0.5, color: i < 3 ? '#FFA500' : '#B8993D' },
            { offset: 1, color: i < 3 ? '#FF8C00' : '#B8423A' }
          ]),
          borderRadius: [0, 8, 8, 0],
          shadowBlur: 10,
          shadowColor: i < 3 ? 'rgba(255, 215, 0, 0.4)' : 'rgba(212, 175, 55, 0.3)',
          shadowOffsetX: 2
        }
      })).reverse(),
      barWidth: '60%',
      label: {
        show: true,
        position: 'right',
        color: '#FFD700',
        fontSize: 11,
        fontWeight: 'bold',
        formatter: '{c}m'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(255, 215, 0, 0.6)'
        }
      },
      animationDelay: (idx) => idx * 100
    }],
    animationDuration: 1500,
    animationEasing: 'elasticOut'
  }
  
  provinceSpanChart.value.setOption(option)
}

const initDynastyHeightChart = () => {
  dynastyHeightChart.value = echarts.init(document.getElementById('dynastyHeightChart'))
  
  const dynastySpans = {}
  bridgeData.bridges.forEach(bridge => {
    if (!dynastySpans[bridge.dynasty]) {
      dynastySpans[bridge.dynasty] = []
    }
    dynastySpans[bridge.dynasty].push(bridge.span)
  })
  
  const data = Object.entries(dynastySpans)
    .map(([dynasty, spans]) => ({
      dynasty,
      avg: (spans.reduce((a, b) => a + b, 0) / spans.length).toFixed(1),
      count: spans.length
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 8)
  
  const dynastyColors = {
    '唐': '#C9A961',
    '宋': '#B8423A',
    '元': '#5B8C85',
    '明': '#8B7355',
    '清': '#6B8E23',
    '隋': '#CD853F',
    '汉': '#BC8F8F',
    '晋': '#708090'
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [10, 14],
      extraCssText: 'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); border-radius: 6px;',
      textStyle: { color: '#E8E4D8', fontSize: 12 },
      formatter: function(params) {
        const item = data[params[0].dataIndex]
        return `
          <div style="min-width: 140px;">
            <div style="font-weight:700;color:#C9A961;font-size:14px;margin-bottom:8px">${item.dynasty}</div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">平均跨度</span>
              <span style="color:#FFD700;font-weight:600">${item.avg}m</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">古桥数量</span>
              <span style="color:#B8423A">${item.count}座</span>
            </div>
          </div>
        `
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(212, 175, 55, 0.1)'
        }
      }
    },
    grid: {
      left: '10%',
      right: '5%',
      top: '10%',
      bottom: '28%'
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: 0,
        height: 20,
        bottom: 5,
        startValue: 0,
        endValue: data.length - 1,
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
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
        preventDefaultMouseMove: true
      }
    ],
    xAxis: {
      type: 'category',
      data: data.map(d => d.dynasty),
      axisLabel: { color: '#E8E4D8', fontSize: 10 },
      axisLine: { lineStyle: { color: '#C9A961' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#E8E4D8', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.2)' } }
    },
    series: [{
      type: 'bar',
      data: data.map((d, i) => ({
        value: d.avg,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: dynastyColors[d.dynasty] || '#C9A961' },
            { offset: 0.5, color: dynastyColors[d.dynasty] ? dynastyColors[d.dynasty] + 'CC' : '#B8993D' },
            { offset: 1, color: dynastyColors[d.dynasty] ? dynastyColors[d.dynasty] + '99' : '#B8423A' }
          ]),
          borderRadius: [8, 8, 0, 0],
          shadowColor: dynastyColors[d.dynasty] || 'rgba(212, 175, 55, 0.3)',
          shadowBlur: 12
        }
      })),
      barWidth: '50%',
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(255, 215, 0, 0.6)'
        }
      },
      label: {
        show: true,
        position: 'top',
        color: '#FFD700',
        fontSize: 10,
        fontWeight: 'bold',
        formatter: '{c}m'
      },
      animationDelay: (idx) => idx * 100
    }],
    animationDuration: 1500,
    animationEasing: 'elasticOut'
  }
  
  dynastyHeightChart.value.setOption(option)
}

const initMaterialHeightChart = () => {
  materialHeightChart.value = echarts.init(document.getElementById('materialHeightChart'))
  
  const materialSpans = {}
  bridgeData.bridges.forEach(bridge => {
    if (!materialSpans[bridge.material]) {
      materialSpans[bridge.material] = []
    }
    materialSpans[bridge.material].push(bridge.span)
  })
  
  const data = Object.entries(materialSpans).map(([material, spans]) => ({
    material,
    max: Math.max(...spans),
    avg: (spans.reduce((a, b) => a + b, 0) / spans.length).toFixed(1),
    count: spans.length
  }))
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [10, 14],
      extraCssText: 'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); border-radius: 6px;',
      textStyle: { color: '#E8E4D8', fontSize: 12 },
      formatter: function(params) {
        const item = data[params[0].dataIndex]
        return `
          <div style="min-width: 160px;">
            <div style="font-weight:700;color:#C9A961;font-size:14px;margin-bottom:8px">${item.material}</div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">最大跨度</span>
              <span style="color:#FF6B6B;font-weight:600">${item.max}m</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">平均跨度</span>
              <span style="color:#FFD700;font-weight:600">${item.avg}m</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">古桥数量</span>
              <span style="color:#B8423A">${item.count}座</span>
            </div>
          </div>
        `
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(212, 175, 55, 0.1)'
        }
      }
    },
    legend: {
      data: [
        { name: '最大', itemStyle: { color: '#FF6B6B' } },
        { name: '平均', itemStyle: { color: '#FFD700' } }
      ],
      textStyle: { color: '#E8E4D8', fontSize: 11 },
      top: 5,
      itemGap: 20,
      itemWidth: 12,
      itemHeight: 12
    },
    grid: {
      left: '10%',
      right: '5%',
      top: '22%',
      bottom: '25%'
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: 0,
        height: 20,
        bottom: 5,
        startValue: 0,
        endValue: data.length - 1,
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
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
        preventDefaultMouseMove: true
      }
    ],
    xAxis: {
      type: 'category',
      data: data.map(d => d.material),
      axisLabel: { color: '#E8E4D8', fontSize: 10 },
      axisLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.3)' } },
      axisTick: { lineStyle: { color: 'rgba(212, 175, 55, 0.3)' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(232, 228, 216, 0.7)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.15)' } },
      axisLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.3)' } }
    },
    series: [
      {
        name: '最大',
        type: 'bar',
        data: data.map(d => ({
          value: d.max,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#FF6B6B' },
              { offset: 0.5, color: '#E05050' },
              { offset: 1, color: '#B8423A' }
            ]),
            borderRadius: [6, 6, 0, 0],
            shadowColor: 'rgba(255, 107, 107, 0.4)',
            shadowBlur: 10
          }
        })),
        barWidth: '35%',
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(255, 107, 107, 0.6)'
          }
        },
        animationDelay: (idx) => idx * 100
      },
      {
        name: '平均',
        type: 'bar',
        data: data.map(d => ({
          value: d.avg,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#FFD700' },
              { offset: 0.5, color: '#C9A961' },
              { offset: 1, color: '#A68A3D' }
            ]),
            borderRadius: [6, 6, 0, 0],
            shadowColor: 'rgba(255, 215, 0, 0.4)',
            shadowBlur: 10
          }
        })),
        barWidth: '35%',
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(255, 215, 0, 0.6)'
          }
        },
        animationDelay: (idx) => idx * 100 + 50
      }
    ],
    animationDuration: 1500,
    animationEasing: 'elasticOut'
  }
  
  materialHeightChart.value.setOption(option)
}
</script>

<style lang="scss" scoped>
.height-container {
  padding: 20px;
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 30%, #1F1F1F 50%, #1A1A1A 70%, #0D0D0D 100%);
  min-height: 100vh;
  color: #E8E4D8;
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
  gap: 24px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
  align-items: stretch;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.champion-card {
  flex: 0 0 auto;
  width: 640px;
  height: 360px;
  display: flex;
  position: relative;
  border-radius: 20px;
  border: 2px solid rgba(212, 175, 55, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 
      0 15px 50px rgba(0, 0, 0, 0.5),
      0 0 40px rgba(212, 175, 55, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    border-color: rgba(212, 175, 55, 0.7);
    
    .champion-image img {
      transform: scale(1.05);
    }
    
    .champion-info-bar {
      background: linear-gradient(180deg, 
        rgba(26, 26, 26, 0) 0%,
        rgba(26, 26, 26, 0.9) 30%,
        rgba(26, 26, 26, 0.98) 100%
      );
    }
    
    .height-value {
      text-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
    }
  }
  
  .champion-image {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.6s ease;
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, 
        transparent 0%, 
        transparent 40%,
        rgba(26, 26, 26, 0.3) 70%,
        rgba(26, 26, 26, 0.7) 100%
      );
    }
  }
  
  .champion-info-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px 24px;
    background: linear-gradient(180deg, 
      rgba(26, 26, 26, 0) 0%,
      rgba(26, 26, 26, 0.85) 30%,
      rgba(26, 26, 26, 0.95) 100%
    );
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    
    .info-left {
      display: flex;
      align-items: center;
      gap: 16px;
      
      .rank-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 20px;
        font-weight: 700;
        color: #C9A961;
        filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.7));
        
        .svg-icon {
          width: 32px;
          height: 32px;
          color: #C9A961;
        }
      }
      
      .bridge-name {
        h3 {
          font-family: 'Noto Serif SC', serif;
          font-size: 22px;
          color: #C9A961;
          margin: 0 0 4px 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        
        .bridge-location {
          font-size: 13px;
          color: rgba(232, 228, 216, 0.8);
          margin: 0;
        }
      }
    }
    
    .info-right {
      display: flex;
      align-items: flex-end;
      gap: 16px;
      
      .height-display {
        text-align: right;
        
        .height-value {
          font-size: 36px;
          font-weight: 700;
          color: #C9A961;
          text-shadow: 0 2px 12px rgba(212, 175, 55, 0.5);
        }
        
        .height-unit {
          font-size: 14px;
          color: rgba(232, 228, 216, 0.8);
          margin-left: 4px;
        }
      }
      
      .meta-tags {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: flex-end;
        
        span {
          font-size: 11px;
          padding: 3px 10px;
          background: rgba(197, 61, 67, 0.4);
          border-radius: 4px;
          color: #E8E4D8;
          backdrop-filter: blur(4px);
        }
      }
    }
  }
}

.runner-ups {
  width: 800px;
  display: flex;
  flex-direction: row;
  gap: 14px;
  
  @media (max-width: 900px) {
    width: 100%;
    flex-direction: column;
  }
  
  .runner-up-image-card {
    flex: 1;
    position: relative;
    border-radius: 16px;
    border: 2px solid rgba(212, 175, 55, 0.4);
    backdrop-filter: blur(10px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transition: all 0.4s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(212, 175, 55, 0.15);
      border-color: rgba(212, 175, 55, 0.6);
      
      .runner-up-image img {
        transform: scale(1.05);
      }
      
      .runner-up-info-bar {
        background: linear-gradient(180deg, 
          rgba(26, 26, 26, 0) 0%,
          rgba(26, 26, 26, 0.9) 30%,
          rgba(26, 26, 26, 0.98) 100%
        );
      }
    }
    
    .runner-up-image {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.6s ease;
      }
      
      .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, 
          transparent 0%, 
          transparent 40%,
          rgba(26, 26, 26, 0.3) 70%,
          rgba(26, 26, 26, 0.7) 100%
        );
      }
    }
    
    .runner-up-info-bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 14px 18px;
      background: linear-gradient(180deg, 
        rgba(26, 26, 26, 0) 0%,
        rgba(26, 26, 26, 0.85) 30%,
        rgba(26, 26, 26, 0.95) 100%
      );
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      
      .info-left {
        display: flex;
        align-items: center;
        gap: 12px;
        
        .rank-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 22px;
          font-weight: 600;
          color: #C9A961;
          filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.5));
        }
        
        .bridge-name {
          h4 {
            font-family: 'Noto Serif SC', serif;
            font-size: 18px;
            color: #C9A961;
            margin: 0 0 3px 0;
            text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
          }
          
          .bridge-location {
            font-size: 12px;
            color: rgba(232, 228, 216, 0.75);
            margin: 0;
          }
        }
      }
      
      .info-right {
        .height-display {
          text-align: right;
          
          .height-value {
            font-size: 28px;
            font-weight: 700;
            color: #C9A961;
            text-shadow: 0 2px 10px rgba(212, 175, 55, 0.4);
          }
          
          .height-unit {
            font-size: 12px;
            color: rgba(232, 228, 216, 0.75);
            margin-left: 3px;
          }
        }
      }
    }
  }
}

.stats-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 140px;
  
  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .stat-card {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
    border-radius: 14px;
    border: 1px solid rgba(212, 175, 55, 0.25);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-3px);
      border-color: rgba(212, 175, 55, 0.5);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.1);
    }
    
    .stat-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      
      .stat-value {
        font-size: 20px;
        font-weight: 700;
        color: #C9A961;
        text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        
        .stat-unit {
          font-size: 12px;
          font-weight: 400;
          color: rgba(201, 169, 97, 0.7);
          margin-left: 2px;
        }
      }
      
      .stat-label {
        font-size: 11px;
        color: rgba(232, 228, 216, 0.7);
      }
    }
  }
}

.stats-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 140px;
  
  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .stat-card {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
    border-radius: 14px;
    border: 1px solid rgba(212, 175, 55, 0.25);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-3px);
      border-color: rgba(212, 175, 55, 0.5);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.1);
    }
    
    .stat-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      
      .stat-value {
        font-size: 20px;
        font-weight: 700;
        color: #C9A961;
        text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        
        .stat-unit {
          font-size: 12px;
          font-weight: 400;
          color: rgba(201, 169, 97, 0.7);
          margin-left: 2px;
        }
      }
      
      .stat-label {
        font-size: 11px;
        color: rgba(232, 228, 216, 0.7);
      }
    }
  }
}

.charts-section {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 1200px) {
    flex-direction: column;
  }
}

.left-charts {
  width: 420px;
  
  @media (max-width: 1200px) {
    width: 100%;
  }
  
  .chart-area-large {
    height: 540px;
  }
}

.center-charts, .right-charts {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  .chart-area {
    height: 230px;
  }
}

.panel-card {
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
  border-radius: 10px;
  border: 1px solid rgba(212, 175, 55, 0.25);
  padding: 10px;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #C9A961, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.03) 0%, transparent 70%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 10px 40px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(212, 175, 55, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    border-color: rgba(212, 175, 55, 0.5);
    z-index: 10;
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 1;
    }
  }
  
  .card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 14px;
      height: 14px;
      border-bottom: 2px solid #C9A961;
      border-left: 2px solid #C9A961;
      border-radius: 0 0 0 4px;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 14px;
      height: 14px;
      border-bottom: 2px solid #C9A961;
      border-right: 2px solid #C9A961;
      border-radius: 0 0 4px 0;
    }
  }
  
  .card-header {
    height: 26px;
    line-height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 10px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
    }
    
    :deep(.tip-container) {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .card-icon {
      width: 18px;
      height: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.5));
      
      .svg-icon {
        width: 100%;
        height: 100%;
        color: #C9A961;
      }
    }
    
    .card-title {
      font-size: 13px;
      font-weight: 600;
      font-family: 'Noto Serif SC', serif;
      color: #C9A961;
      text-align: center;
    }
    
    .filter-group {
      position: absolute;
      right: 0;
      display: flex;
      gap: 10px;
      
      select {
        padding: 6px 28px 6px 10px;
        background: linear-gradient(135deg, rgba(45, 90, 90, 0.4) 0%, rgba(35, 70, 70, 0.35) 100%);
        border: 1px solid rgba(212, 175, 55, 0.35);
        border-radius: 6px;
        color: #E8E4D8;
        font-size: 12px;
        min-width: 100px;
        cursor: pointer;
        transition: all 0.3s ease;
        outline: none;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
        
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
          padding: 6px;
        }
      }
    }
  }
}

.ranking-table {
  .table-header {
    display: flex;
    padding: 14px 18px;
    background: rgba(212, 175, 55, 0.12);
    border-radius: 10px 10px 0 0;
    font-size: 13px;
    font-weight: 600;
    color: #C9A961;
  }
  
  .table-body {
    max-height: 420px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(212, 175, 55, 0.1);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #C9A961, #B8423A);
      border-radius: 3px;
    }
  }
  
  .table-row {
    display: flex;
    padding: 14px 18px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(212, 175, 55, 0.1);
      transform: translateX(3px);
    }
  }
  
  .col-rank { width: 60px; }
  .col-name { flex: 1; }
  .col-location { width: 130px; }
  .col-dynasty { width: 90px; }
  .col-type { width: 110px; }
  .col-height { width: 90px; text-align: right; }
  
  .rank-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 13px;
    font-weight: 600;
    background: rgba(212, 175, 55, 0.25);
    color: #C9A961;
    
    &.gold {
      background: linear-gradient(135deg, #FFD700, #FFA500);
      color: #1A1A1A;
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
    }
    
    &.silver {
      background: linear-gradient(135deg, #C0C0C0, #A0A0A0);
      color: #1A1A1A;
      box-shadow: 0 0 15px rgba(192, 192, 192, 0.4);
    }
    
    &.bronze {
      background: linear-gradient(135deg, #CD7F32, #8B4513);
      color: #fff;
      box-shadow: 0 0 15px rgba(205, 127, 50, 0.4);
    }
  }
}

@media (max-width: 768px) {
  .height-container {
    padding: 12px;
  }
  
  .page-header {
    padding: 12px 16px;
    margin-bottom: 16px;
    
    .header-content h1 {
      font-size: 20px;
    }
    
    .header-content p {
      font-size: 12px;
    }
  }
  
  .charts-section {
    flex-direction: column;
    gap: 16px;
  }
  
  .left-charts {
    width: 100%;
    
    .chart-area-large {
      height: 350px;
    }
  }
  
  .center-charts, .right-charts {
    .chart-area {
      height: 200px;
    }
  }
  
  .panel-card {
    padding: 12px;
    
    .card-header {
      padding: 10px 12px;
      
      .card-title {
        font-size: 12px;
      }
      
      .filter-group {
        position: relative;
        margin-top: 10px;
        width: 100%;
        justify-content: flex-start;
        
        select {
          padding: 6px 10px;
          font-size: 11px;
        }
      }
    }
  }
  
  .ranking-table {
    .table-header {
      padding: 10px 12px;
      font-size: 11px;
    }
    
    .table-body {
      max-height: 300px;
    }
    
    .table-row {
      padding: 10px 12px;
      font-size: 12px;
    }
    
    .col-rank { width: 40px; }
    .col-name { flex: 1; min-width: 80px; }
    .col-location { width: 80px; }
    .col-dynasty { width: 60px; }
    .col-type { width: 70px; }
    .col-height { width: 60px; }
    
    .rank-badge {
      width: 24px;
      height: 24px;
      font-size: 11px;
    }
  }
  
  .bridge-info-panel {
    .panel-content {
      padding: 12px;
    }
    
    .bridge-header {
      flex-direction: column;
      gap: 12px;
      
      .bridge-image {
        width: 100%;
        height: 150px;
      }
      
      .bridge-basic {
        h3 {
          font-size: 16px;
        }
        
        .bridge-meta {
          font-size: 12px;
        }
      }
    }
    
    .bridge-details {
      .detail-section {
        h4 {
          font-size: 13px;
        }
        
        .detail-content {
          font-size: 12px;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .height-container {
    padding: 8px;
  }
  
  .page-header {
    padding: 10px 12px;
    margin-bottom: 12px;
    
    .header-content h1 {
      font-size: 18px;
    }
    
    .header-content p {
      font-size: 11px;
    }
  }
  
  .charts-section {
    gap: 12px;
  }
  
  .left-charts .chart-area-large {
    height: 280px;
  }
  
  .center-charts, .right-charts {
    gap: 12px;
    
    .chart-area {
      height: 180px;
    }
  }
  
  .panel-card {
    padding: 10px;
    
    .card-header {
      padding: 8px 10px;
      
      .card-title {
        font-size: 11px;
      }
      
      .filter-group select {
        padding: 5px 8px;
        font-size: 10px;
      }
    }
  }
  
  .ranking-table {
    .table-header {
      padding: 8px 10px;
      font-size: 10px;
    }
    
    .table-body {
      max-height: 250px;
    }
    
    .table-row {
      padding: 8px 10px;
      font-size: 11px;
    }
    
    .col-rank { width: 30px; }
    .col-location { width: 60px; display: none; }
    .col-dynasty { width: 50px; }
    .col-type { display: none; }
    .col-height { width: 50px; }
    
    .rank-badge {
      width: 20px;
      height: 20px;
      font-size: 10px;
    }
  }
  
  .bridge-info-panel {
    .panel-content {
      padding: 10px;
    }
    
    .bridge-header {
      .bridge-image {
        height: 120px;
      }
      
      .bridge-basic {
        h3 {
          font-size: 14px;
        }
        
        .bridge-meta {
          font-size: 11px;
        }
      }
    }
    
    .bridge-details {
      .detail-section {
        h4 {
          font-size: 12px;
        }
        
        .detail-content {
          font-size: 11px;
        }
      }
    }
  }
}
</style>


