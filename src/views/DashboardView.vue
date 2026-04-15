﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="dashboard-container">
    <div class="particle-bg" ref="particleBg"></div>
    <div class="gradient-overlay"></div>
    <div class="dashboard-main">
      <div class="column column-left">
        <ScrollNotice @notice-click="handleNoticeClick" />
        
        <div class="panel panel-stats">
          <div class="panel-footer"></div>
          <h2 class="panel-title">
            核心指标
            <HelpTip title="核心指标说明" content="展示古桥数据的核心统计指标：古桥总数为当前数据库收录的古桥数量；国保单位指被列入全国重点文物保护单位的古桥；世界遗产指被列入世界文化遗产名录的古桥；覆盖省份指古桥分布的省级行政区数量。" />
          </h2>
          <div class="stats-content">
            <div class="stat-item">
              <div class="stat-value">{{ animatedStats.totalBridges }}</div>
              <div class="stat-label">古桥总数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ animatedStats.nationalProtect }}</div>
              <div class="stat-label">国保单位</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ animatedStats.worldHeritage }}</div>
              <div class="stat-label">世界遗产</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ animatedStats.provinces }}</div>
              <div class="stat-label">覆盖省份</div>
            </div>
          </div>
        </div>

        <div class="panel panel-type">
          <div class="panel-footer"></div>
          <h2 class="panel-title">
            桥型分布
            <HelpTip title="桥型分布说明" content="展示中国古桥的主要建筑类型分布，包括拱桥、梁桥、廊桥、索桥等。不同桥型反映了不同历史时期和地域的建筑特色。" />
          </h2>
          <div id="sunburstChart" class="chart-container"></div>
        </div>

        <div class="panel panel-material">
          <div class="panel-footer"></div>
          <h2 class="panel-title">
            古桥年龄分布
            <HelpTip title="年龄分布说明" content="按古桥建造年代距今年数进行分组统计，展示不同年龄段古桥的数量分布。年龄越大，历史价值越高。" />
          </h2>
          <div id="ageChart" class="chart-container"></div>
        </div>
      </div>

      <div class="column column-center">
        <div class="panel panel-map" :style="{ '--zoom-level': mapZoomLevel }">
          <div class="map-glow-border"></div>
          <div class="panel-footer"></div>
          <div class="map-wrapper">
            <h2 class="map-title">全国古桥分布</h2>
            <div class="map-controls">
              <button 
                :class="['control-btn', { active: showFlylines }]" 
                @click="toggleFlylines"
                title="技术传播飞线"
              >飞线</button>
              <button 
                :class="['control-btn', { active: showHeatmap }]" 
                @click="toggleHeatmap"
                title="热力图"
              >热力</button>
              <button 
                :class="['control-btn', { active: showRivers }]" 
                @click="toggleRivers"
                title="河流水系"
              >水系</button>
            </div>
            <div class="map-ring ring-1"></div>
            <div class="map-ring ring-2"></div>
            <div class="map-ring ring-3"></div>
            <div id="chinaMapChart" class="chart-container-map"></div>
            
            <div v-if="hoveredProvince" class="province-card" :style="provinceCardStyle">
              <div class="card-header">
                <span class="province-name">{{ hoveredProvince.name }}</span>
                <span class="province-count">{{ hoveredProvince.count }}座古桥</span>
              </div>
              <div class="card-content">
                <div class="card-item">
                  <span class="item-label">代表桥梁</span>
                  <span class="item-value">{{ hoveredProvince.representative }}</span>
                </div>
                <div class="card-item">
                  <span class="item-label">主要朝代</span>
                  <span class="item-value">{{ hoveredProvince.mainDynasty }}</span>
                </div>
                <div class="card-item">
                  <span class="item-label">主要桥型</span>
                  <span class="item-value">{{ hoveredProvince.mainType }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-trend">
          <div class="panel-footer"></div>
          <h2 class="panel-title">
            古桥功能用途分布
            <HelpTip title="功能用途说明" content="展示古桥的主要功能用途分布情况，包括交通要道、景观桥梁、纪念性建筑等。功能用途反映了古桥在历史和现代社会的实际价值。" />
          </h2>
          <div id="functionChart" class="chart-container-trend"></div>
        </div>

        <div class="panel panel-activity">
          <div class="panel-footer"></div>
          <h2 class="panel-title">
            朝代-桥型流向
            <HelpTip title="流向图说明" content="桑基图展示不同朝代建造的桥型分布流向，反映了各历史时期的建筑偏好和技术特点。" />
          </h2>
          <div id="sankeyChart" class="chart-container-trend"></div>
        </div>
      </div>

      <div class="column column-right">
        <div class="panel panel-scatter">
          <div class="panel-footer"></div>
          <h2 class="panel-title">
            年代-跨度分布
            <HelpTip title="年代跨度分布说明" content="散点图展示古桥建造年代与跨度的关系，横轴为建造年代，纵轴为跨度。可以观察不同历史时期古桥建造技术的发展趋势。" />
          </h2>
          <div id="scatterChart" class="chart-container"></div>
        </div>

        <div class="panel panel-province">
          <div class="panel-footer"></div>
          <h2 class="panel-title">
            省份TOP10
            <HelpTip title="省份排名说明" content="展示中国古桥数量排名前十的省份。福建、浙江、江苏等省份因历史悠久、水系发达，古桥数量较多。点击省份名可跳转到地域分析页面。" />
          </h2>
          <div id="provinceBarChart" class="chart-container"></div>
        </div>

        <div class="panel panel-bridgelist">
          <div class="panel-footer"></div>
          <h2 class="panel-title">
            古桥名录
            <HelpTip title="古桥名录说明" content="展示筛选后的古桥列表，点击可查看详细信息。" />
          </h2>
          <div class="bridge-list-wrapper">
            <div 
              v-for="bridge in paginatedBridges" 
              :key="bridge.id" 
              class="bridge-item"
              @click="goToDetail(bridge.id)"
            >
              <div class="bridge-info">
                <h4 class="bridge-name">{{ bridge.name }}</h4>
                <p class="bridge-location">{{ bridge.province }} · {{ bridge.dynasty }}</p>
              </div>
              <div class="bridge-meta">
                <span class="bridge-type">{{ bridge.bridgeType }}</span>
                <span class="bridge-height">{{ bridge.span }}m</span>
              </div>
            </div>
          </div>
          <div class="pagination" v-if="totalPages > 1">
            <button 
              v-for="page in totalPages" 
              :key="page" 
              :class="{ active: currentPage === page }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, shallowRef, computed, nextTick, h } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import bridgeData from '@/assets/data/bridges.json'
import bridgeProvinceData from '@/assets/data/bridge_province_data.json'
import bridgeDynastyData from '@/assets/data/bridge_dynasty_data.json'
import bridgeTypeData from '@/assets/data/bridge_type_data.json'
import bridgeMaterialData from '@/assets/data/bridge_material_data.json'
import bridgeOverview from '@/assets/data/bridge_overview.json'
import HelpTip from '@/components/HelpTip.vue'
import ScrollNotice from '@/components/ScrollNotice.vue'
import { useToast } from '@/composables/useToast'

const IconStats = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('rect', { x: 3, y: 3, width: 7, height: 7, rx: 1.5, fill: 'currentColor', opacity: 0.3 }),
      h('rect', { x: 14, y: 3, width: 7, height: 7, rx: 1.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('rect', { x: 3, y: 14, width: 7, height: 7, rx: 1.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('rect', { x: 14, y: 14, width: 7, height: 7, rx: 1.5, fill: 'currentColor', opacity: 0.5 }),
      h('circle', { cx: 6.5, cy: 6.5, r: 1.5, fill: 'currentColor' }),
      h('circle', { cx: 17.5, cy: 17.5, r: 1.5, fill: 'currentColor' })
    ])
  }
}

const IconBridge = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M2 20h20', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      h('path', { d: 'M2 14h20', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
      h('path', { d: 'M4 14v6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M20 14v6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M8 14v6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M16 14v6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M12 14v6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M2 14c2-4 4-6 6-6s4 2 4 6', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.15 }),
      h('path', { d: 'M22 14c-2-4-4-6-6-6s-4 2-4 6', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.15 }),
      h('path', { d: 'M4 8h2M18 8h2M11 8h2', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.5 }),
      h('path', { d: 'M5 8v-2M19 8v-2M12 8v-2', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.5 })
    ])
  }
}

const IconArchBridge = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M2 20h20', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      h('path', { d: 'M4 20v-8', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M20 20v-8', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M4 12q4-8 8-8t8 8', stroke: 'currentColor', 'stroke-width': 2, fill: 'currentColor', fillOpacity: 0.1 }),
      h('path', { d: 'M7 20v-4q1-3 5-3t5 3v4', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.15 }),
      h('path', { d: 'M4 12h16', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.6 }),
      h('path', { d: 'M8 12v-2M12 12v-3M16 12v-2', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.5 }),
      h('circle', { cx: 12, cy: 6, r: 1.5, fill: 'currentColor', opacity: 0.6 })
    ])
  }
}

const IconCoveredBridge = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M2 20h20', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      h('path', { d: 'M3 20v-6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M21 20v-6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M3 14h18', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M5 14v-4l7-5 7 5v4', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.1 }),
      h('path', { d: 'M5 10h14', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.6 }),
      h('path', { d: 'M8 14v-4M12 14v-5M16 14v-4', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.5 }),
      h('path', { d: 'M7 6h2M15 6h2M10 4h4', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.4 }),
      h('path', { d: 'M12 5l-7 5h14l-7-5z', fill: 'currentColor', fillOpacity: 0.15 })
    ])
  }
}

const IconSuspensionBridge = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M2 20h20', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      h('path', { d: 'M4 20v-10', stroke: 'currentColor', 'stroke-width': 2 }),
      h('path', { d: 'M20 20v-10', stroke: 'currentColor', 'stroke-width': 2 }),
      h('path', { d: 'M4 10q8-8 16 0', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.1 }),
      h('path', { d: 'M4 10h16', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M7 10v6M10 10v6M14 10v6M17 10v6', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.6 }),
      h('path', { d: 'M6 10l6-5 6 5', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.4 }),
      h('circle', { cx: 4, cy: 10, r: 1.5, fill: 'currentColor' }),
      h('circle', { cx: 20, cy: 10, r: 1.5, fill: 'currentColor' })
    ])
  }
}

const IconBeamBridge = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M2 20h20', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      h('path', { d: 'M3 20v-6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M9 20v-6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M15 20v-6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M21 20v-6', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M2 14h20', stroke: 'currentColor', 'stroke-width': 2 }),
      h('path', { d: 'M2 12h20', stroke: 'currentColor', 'stroke-width': 1.5, opacity: 0.6 }),
      h('path', { d: 'M6 14v-3M12 14v-3M18 14v-3', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.5 }),
      h('path', { d: 'M3 14h18', fill: 'currentColor', fillOpacity: 0.1 }),
      h('rect', { x: 2, y: 12, width: 20, height: 2, fill: 'currentColor', fillOpacity: 0.15 })
    ])
  }
}

const IconMap = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('circle', { cx: 12, cy: 10, r: 3, stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.3 }),
      h('path', { d: 'M12 7v-2M12 15v2M7 10H5M19 10h-2', stroke: 'currentColor', 'stroke-width': 1, opacity: 0.5 })
    ])
  }
}

const IconTrend = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M3 17l6-6 4 4 8-8', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('path', { d: 'M17 7h4v4', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('circle', { cx: 9, cy: 11, r: 1.5, fill: 'currentColor' }),
      h('circle', { cx: 13, cy: 15, r: 1.5, fill: 'currentColor' })
    ])
  }
}

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

const IconLocation = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.2 }),
      h('circle', { cx: 12, cy: 9, r: 2.5, stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.3 })
    ])
  }
}

const IconList = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M4 6h16M4 12h16M4 18h12', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      h('circle', { cx: 20, cy: 18, r: 2, fill: 'currentColor', opacity: 0.5 })
    ])
  }
}

const IconTime = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('circle', { cx: 12, cy: 12, r: 9, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M12 6v6l4 2', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      h('circle', { cx: 12, cy: 12, r: 2, fill: 'currentColor', opacity: 0.5 })
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

const IconView = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('circle', { cx: 12, cy: 12, r: 3, stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.3 })
    ])
  }
}

const IconChat = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.1 })
    ])
  }
}

const IconSearch = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('circle', { cx: 11, cy: 11, r: 8, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M21 21l-4.35-4.35', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' })
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

const IconBook = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.1 })
    ])
  }
}

const IconEdit = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.2 })
    ])
  }
}

const IconFunction = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M9 9h6M9 12h6M9 15h4', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
      h('circle', { cx: 17, cy: 15, r: 2, fill: 'currentColor', opacity: 0.3 })
    ])
  }
}

const IconShield = {
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'svg-icon' }, [
      h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', stroke: 'currentColor', 'stroke-width': 1.5, fill: 'currentColor', fillOpacity: 0.1 }),
      h('path', { d: 'M9 12l2 2 4-4', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  }
}

const router = useRouter()
const particleBg = ref(null)
const { success, info } = useToast()

const handleNoticeClick = (notice) => {
  info(`正在打开：${notice.text}`, '古桥资讯')
}

const selectedDynasty = ref('')
const selectedType = ref('')
const selectedMaterial = ref('')
const currentPage = ref(1)
const pageSize = 5

const dynasties = ['汉', '三国', '晋', '南北朝', '隋', '唐', '五代', '宋', '元', '明', '清', '近代']
const bridgeTypes = ['拱桥', '梁桥', '廊桥', '索桥', '浮桥', '其他']
const materials = ['石', '木', '砖石', '铁索', '竹木', '其他']

const filteredBridges = computed(() => {
  return bridgeData.bridges.filter(bridge => {
    if (selectedDynasty.value && bridge.dynasty !== selectedDynasty.value) return false
    if (selectedType.value && bridge.bridgeType !== selectedType.value) return false
    if (selectedMaterial.value && bridge.material !== selectedMaterial.value) return false
    return true
  })
})

const totalPages = computed(() => Math.ceil(filteredBridges.value.length / pageSize))

const paginatedBridges = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredBridges.value.slice(start, start + pageSize)
})

const goToDetail = (id) => {
  const bridge = filteredBridges.value.find(b => b.id === id)
  if (bridge) {
    info(`正在查看：${bridge.name}`, '古桥详情')
  }
  router.push(`/main/bridge/${id}`)
}

const animatedStats = ref({
  totalBridges: 0,
  nationalProtect: 0,
  worldHeritage: 0,
  provinces: 0
})

const targetStats = {
  totalBridges: 356,
  nationalProtect: 89,
  worldHeritage: 3,
  provinces: 21
}

const sunburstChart = shallowRef()
const ageChart = shallowRef()
const chinaMapChart = shallowRef()

const showFlylines = ref(true)
const showHeatmap = ref(true)
const showRivers = ref(true)
const hoveredProvince = ref(null)
const provinceCardStyle = ref({})
const focusedProvince = ref(null)
const mapZoomLevel = ref(1.35)

let heatmapAnimationInProgress = false
let lastShowHeatmapState = false

const functionChart = shallowRef()
const provinceBarChart = shallowRef()
const scatterChart = shallowRef()
const sankeyChart = shallowRef()

let animationFrame = null
let particleAnimationId = null
let particles = []
let particleResizeHandler = null

onMounted(() => {
  animateStats()
  
  nextTick(() => {
    setTimeout(() => {
      initCharts()
      initParticles()
    }, 100)
  })
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (particleAnimationId) cancelAnimationFrame(particleAnimationId)
  if (particleResizeHandler) window.removeEventListener('resize', particleResizeHandler)
  window.removeEventListener('resize', handleResize)
  
  sunburstChart.value?.dispose()
  ageChart.value?.dispose()
  chinaMapChart.value?.dispose()
  functionChart.value?.dispose()
  provinceBarChart.value?.dispose()
  scatterChart.value?.dispose()
  sankeyChart.value?.dispose()
})

const animateStats = () => {
  const duration = 2000
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    
    animatedStats.value = {
      totalBridges: Math.round(targetStats.totalBridges * easeProgress),
      nationalProtect: Math.round(targetStats.nationalProtect * easeProgress),
      worldHeritage: Math.round(targetStats.worldHeritage * easeProgress),
      provinces: Math.round(targetStats.provinces * easeProgress)
    }
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }
  
  animate()
}

const handleResize = () => {
  sunburstChart.value?.resize()
  ageChart.value?.resize()
  chinaMapChart.value?.resize()
  functionChart.value?.resize()
  provinceBarChart.value?.resize()
  scatterChart.value?.resize()
  sankeyChart.value?.resize()
}

const updateCharts = () => {
  currentPage.value = 1
}

const initCharts = async () => {
  try {
    const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
    const chinaJson = await response.json()
    echarts.registerMap('china', chinaJson)
    
    initSunburstChart()
    initAgeChart()
    initChinaMapChart()
    initFunctionChart()
    initProvinceBarChart()
    initScatterChart()
    initSankeyChart()
  } catch (error) {
    console.error('加载地图数据失败:', error)
  }
}

const initSunburstChart = () => {
  const container = document.getElementById('sunburstChart')
  if (!container) return
  
  sunburstChart.value = echarts.init(container)
  
  const sunburstData = [
    {
      name: '拱桥类',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: '#E8D5A3' },
          { offset: 0.5, color: '#C9A961' },
          { offset: 1, color: '#A68A3D' }
        ])
      },
      children: [
        { name: '半圆拱', value: 85, itemStyle: { color: '#E8D5A3' } },
        { name: '圆弧拱', value: 62, itemStyle: { color: '#D4AF37' } },
        { name: '尖拱', value: 28, itemStyle: { color: '#C9A961' } },
        { name: '马蹄拱', value: 15, itemStyle: { color: '#A68A3D' } }
      ]
    },
    {
      name: '梁桥类',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: '#D66B5A' },
          { offset: 0.5, color: '#B8423A' },
          { offset: 1, color: '#8B3A3A' }
        ])
      },
      children: [
        { name: '石梁桥', value: 78, itemStyle: { color: '#D66B5A' } },
        { name: '木梁桥', value: 45, itemStyle: { color: '#B8423A' } },
        { name: '石墩木梁', value: 32, itemStyle: { color: '#8B3A3A' } }
      ]
    },
    {
      name: '廊桥类',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: '#7FBFBF' },
          { offset: 0.5, color: '#5B8C85' },
          { offset: 1, color: '#4A6B6B' }
        ])
      },
      children: [
        { name: '木拱廊桥', value: 42, itemStyle: { color: '#7FBFBF' } },
        { name: '石拱廊桥', value: 35, itemStyle: { color: '#5B8C85' } },
        { name: '风雨桥', value: 28, itemStyle: { color: '#4A6B6B' } }
      ]
    },
    {
      name: '索桥类',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: '#CD853F' },
          { offset: 0.5, color: '#8B7355' },
          { offset: 1, color: '#6B5344' }
        ])
      },
      children: [
        { name: '铁索桥', value: 18, itemStyle: { color: '#CD853F' } },
        { name: '竹索桥', value: 12, itemStyle: { color: '#8B7355' } },
        { name: '藤索桥', value: 8, itemStyle: { color: '#6B5344' } }
      ]
    },
    {
      name: '浮桥类',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: '#9BC4BC' },
          { offset: 0.5, color: '#6B8E8E' },
          { offset: 1, color: '#5A7A7A' }
        ])
      },
      children: [
        { name: '舟桥', value: 15, itemStyle: { color: '#9BC4BC' } },
        { name: '浮梁', value: 10, itemStyle: { color: '#6B8E8E' } }
      ]
    }
  ]
  
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [10, 14],
      extraCssText: 'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); border-radius: 6px;',
      textStyle: { 
        color: '#E8E4D8', 
        fontSize: 12,
        fontFamily: 'Noto Serif SC, serif'
      },
      formatter: function(params) {
        const ancestors = params.treePathInfo.map(i => i.name).filter(n => n)
        const indent = '　'.repeat(ancestors.length - 1)
        return `${indent}<span style="color:#C9A961;font-weight:600">${params.name}</span><br/>${indent}数量: <span style="color:#FFD700">${params.value}</span>座`
      }
    },
    series: [{
      type: 'sunburst',
      data: sunburstData,
      radius: ['15%', '90%'],
      center: ['50%', '50%'],
      sort: undefined,
      emphasis: {
        focus: 'ancestor',
        itemStyle: {
          shadowBlur: 25,
          shadowColor: 'rgba(201, 169, 97, 0.6)'
        }
      },
      itemStyle: {
        borderRadius: 6,
        borderColor: 'rgba(26, 26, 26, 0.8)',
        borderWidth: 2
      },
      label: {
        color: '#E8E4D8',
        fontSize: 10,
        fontWeight: '500',
        fontFamily: 'Noto Serif SC, serif',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowBlur: 3,
        formatter: function(params) {
          if (params.name.length > 4) {
            return params.name.substring(0, 4) + '...'
          }
          return params.name
        }
      },
      levels: [
        {},
        {
          r0: '15%',
          r: '50%',
          itemStyle: {
            shadowBlur: 12,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          },
          label: {
            fontSize: 11,
            fontWeight: '600',
            fontFamily: 'Noto Serif SC, serif',
            color: '#E8E4D8'
          }
        },
        {
          r0: '50%',
          r: '90%',
          itemStyle: {
            shadowBlur: 8,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          },
          label: {
            fontSize: 9,
            fontFamily: 'Noto Serif SC, serif',
            color: '#E8E4D8'
          }
        }
      ],
      animation: true,
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDuration: 1500
    }]
  }
  
  sunburstChart.value.setOption(option)
}

const initAgeChart = () => {
  ageChart.value = echarts.init(document.getElementById('ageChart'))
  
  const ageData = [
    { range: '1500年以上', count: 32, desc: '汉晋时期', year: 1500 },
    { range: '1000-1500年', count: 45, desc: '隋唐时期', year: 1250 },
    { range: '800-1000年', count: 78, desc: '唐五代', year: 900 },
    { range: '500-800年', count: 156, desc: '宋元时期', year: 650 },
    { range: '500年以下', count: 89, desc: '明清时期', year: 300 }
  ]
  
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
        const item = ageData[data.dataIndex]
        return `
          <div style="min-width: 160px;">
            <div style="font-weight:700;color:#C9A961;font-size:14px;margin-bottom:8px">${data.name}</div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">古桥数量</span>
              <span style="color:#FFD700;font-weight:600">${data.value}座</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">历史时期</span>
              <span style="color:#B8423A">${item.desc}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">距今约</span>
              <span style="color:#5B8C85">${item.year}年</span>
            </div>
          </div>
        `
      }
    },
    grid: {
      left: '5%',
      right: '8%',
      top: '15%',
      bottom: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ageData.map(d => d.range),
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 10,
        rotate: 15,
        interval: 0
      },
      axisLine: { 
        lineStyle: { color: 'rgba(212, 175, 55, 0.5)' }
      },
      axisTick: {
        lineStyle: { color: 'rgba(212, 175, 55, 0.3)' }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#E8E4D8', fontSize: 10 },
      splitLine: { 
        lineStyle: { 
          color: 'rgba(212, 175, 55, 0.1)',
          type: 'dashed'
        }
      },
      axisLine: { show: false }
    },
    series: [{
      type: 'line',
      data: ageData.map((d, i) => ({
        value: d.count,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#C9A961' }
          ]),
          borderColor: '#FFD700',
          borderWidth: 2,
          shadowColor: 'rgba(255, 215, 0, 0.5)',
          shadowBlur: 12
        }
      })),
      smooth: 0.4,
      symbol: 'circle',
      symbolSize: 14,
      lineStyle: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#B8423A' },
          { offset: 0.3, color: '#C9A961' },
          { offset: 0.6, color: '#5B8C85' },
          { offset: 1, color: '#FFD700' }
        ]),
        shadowColor: 'rgba(212, 175, 55, 0.6)',
        shadowBlur: 15,
        shadowOffsetY: 8
      },
      emphasis: {
        itemStyle: {
          color: '#FFD700',
          borderColor: '#fff',
          borderWidth: 3,
          shadowBlur: 20
        },
        lineStyle: {
          width: 5
        }
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255, 215, 0, 0.4)' },
          { offset: 0.3, color: 'rgba(212, 175, 55, 0.25)' },
          { offset: 0.6, color: 'rgba(197, 61, 67, 0.15)' },
          { offset: 1, color: 'rgba(91, 140, 133, 0.05)' }
        ]),
        shadowColor: 'rgba(212, 175, 55, 0.3)',
        shadowBlur: 20
      },
      label: {
        show: true,
        position: 'top',
        color: '#FFD700',
        fontSize: 11,
        fontWeight: 'bold',
        formatter: '{c}座'
      },
      animationDelay: (idx) => idx * 150
    }],
    animationDuration: 1800,
    animationEasing: 'elasticOut'
  }
  
  ageChart.value.setOption(option)
}

const toggleFlylines = () => {
  showFlylines.value = !showFlylines.value
  updateMapLayers()
}

const toggleHeatmap = () => {
  showHeatmap.value = !showHeatmap.value
  updateMapLayers()
}

const toggleRivers = () => {
  showRivers.value = !showRivers.value
  updateMapLayers()
}

let flylinesOriginalData = null
let heatmapOriginalData = null
let riversOriginalData = null

const updateMapLayers = () => {
  if (!chinaMapChart.value) return
  
  const option = chinaMapChart.value.getOption()
  
  option.series.forEach((s, i) => {
    if (s.name === '技术传播') {
      if (showFlylines.value) {
        option.series[i].data = flylinesOriginalData || option.series[i].data
        option.series[i].animationDuration = 1500
        option.series[i].animationEasing = 'cubicOut'
        option.series[i].animationDelay = (idx) => idx * 200
        option.series[i].lineStyle = option.series[i].lineStyle || {}
        option.series[i].lineStyle.opacity = 0
        option.series[i].effect = option.series[i].effect || {}
        option.series[i].effect.show = true
      } else {
        if (!flylinesOriginalData && option.series[i].data && option.series[i].data.length > 0) {
          flylinesOriginalData = [...option.series[i].data]
        }
        option.series[i].data = []
      }
    }
    if (s.name === '热力图') {
      if (showHeatmap.value) {
        const allData = heatmapOriginalData || option.series[i].data
        const shouldAnimate = !lastShowHeatmapState && !heatmapAnimationInProgress
        
        if (shouldAnimate) {
          heatmapAnimationInProgress = true
          lastShowHeatmapState = true
          option.series[i].data = []
          option.series[i].animationDuration = 800
          option.series[i].animationEasing = 'cubicOut'
          
          const batchSize = Math.ceil(allData.length / 5)
          let currentBatch = 0
          
          const showNextBatch = () => {
            if (!showHeatmap.value) {
              heatmapAnimationInProgress = false
              return
            }
            
            const start = currentBatch * batchSize
            const end = Math.min(start + batchSize, allData.length)
            const currentData = allData.slice(0, end)
            
            const opt = chinaMapChart.value.getOption()
            opt.series.forEach((series, idx) => {
              if (series.name === '热力图') {
                opt.series[idx].data = currentData
              }
            })
            chinaMapChart.value.setOption(opt, { notMerge: false })
            
            currentBatch++
            if (currentBatch < 5) {
              setTimeout(showNextBatch, 150)
            } else {
              heatmapAnimationInProgress = false
            }
          }
          
          setTimeout(showNextBatch, 100)
        } else {
          option.series[i].data = allData
        }
      } else {
        lastShowHeatmapState = false
        heatmapAnimationInProgress = false
        if (!heatmapOriginalData && option.series[i].data && option.series[i].data.length > 0) {
          heatmapOriginalData = [...option.series[i].data]
        }
        option.series[i].data = []
      }
    }
    if (s.name === '河流水系') {
      if (showRivers.value) {
        option.series[i].data = riversOriginalData || option.series[i].data
        option.series[i].animationDuration = 2000
        option.series[i].animationEasing = 'linear'
        option.series[i].animationDelay = (idx) => idx * 300
        option.series[i].lineStyle = option.series[i].lineStyle || {}
        option.series[i].lineStyle.width = 2.5
        option.series[i].lineStyle.opacity = 0.85
        option.series[i].effect = option.series[i].effect || {}
        option.series[i].effect.show = true
        option.series[i].effect.symbolSize = 5
        option.series[i].effect.color = '#67C23A'
        option.series[i].effect.shadowBlur = 8
        option.series[i].effect.shadowColor = 'rgba(103, 194, 58, 0.6)'
      } else {
        if (!riversOriginalData && option.series[i].data && option.series[i].data.length > 0) {
          riversOriginalData = [...option.series[i].data]
        }
        option.series[i].data = []
      }
    }
  })
  
  chinaMapChart.value.setOption(option, { notMerge: false })
  
  if (showFlylines.value) {
    setTimeout(() => {
      const opt = chinaMapChart.value.getOption()
      opt.series.forEach((s, i) => {
        if (s.name === '技术传播') {
          opt.series[i].lineStyle.opacity = 0.6
        }
      })
      chinaMapChart.value.setOption(opt, { notMerge: false })
    }, 100)
  }
}

const showProvinceCard = (province, event) => {
  const provinceInfo = {
    '河北': { representative: '赵州桥', mainDynasty: '隋代', mainType: '拱桥' },
    '福建': { representative: '洛阳桥、安平桥', mainDynasty: '宋代', mainType: '石梁桥' },
    '浙江': { representative: '断桥、北涧桥', mainDynasty: '宋代', mainType: '拱桥' },
    '江苏': { representative: '宝带桥、枫桥', mainDynasty: '唐代', mainType: '拱桥' },
    '广东': { representative: '广济桥', mainDynasty: '宋代', mainType: '梁桥' },
    '四川': { representative: '泸定桥', mainDynasty: '清代', mainType: '索桥' },
    '云南': { representative: '双龙桥、霁虹桥', mainDynasty: '清代', mainType: '廊桥' },
    '北京': { representative: '卢沟桥、十七孔桥', mainDynasty: '金代', mainType: '石拱桥' },
    '贵州': { representative: '盘江桥、葛镜桥', mainDynasty: '明代', mainType: '拱桥' },
    '广西': { representative: '程阳永济桥', mainDynasty: '清代', mainType: '廊桥' },
    '湖南': { representative: '凤凰虹桥', mainDynasty: '清代', mainType: '风雨桥' },
    '山西': { representative: '鱼沼飞梁', mainDynasty: '宋代', mainType: '梁桥' },
    '上海': { representative: '放生桥', mainDynasty: '明代', mainType: '石拱桥' },
    '江西': { representative: '赣州古浮桥', mainDynasty: '宋代', mainType: '浮桥' },
    '陕西': { representative: '灞桥', mainDynasty: '汉代', mainType: '石拱桥' },
    '安徽': { representative: '太平桥', mainDynasty: '明代', mainType: '拱桥' },
    '山东': { representative: '泗水桥', mainDynasty: '明代', mainType: '拱桥' },
    '湖北': { representative: '晴川桥', mainDynasty: '清代', mainType: '拱桥' },
    '河南': { representative: '小商桥', mainDynasty: '隋代', mainType: '拱桥' },
    '辽宁': { representative: '辽东古桥', mainDynasty: '清代', mainType: '拱桥' },
    '甘肃': { representative: '河西古桥', mainDynasty: '明代', mainType: '拱桥' },
    '青海': { representative: '湟源古桥', mainDynasty: '清代', mainType: '拱桥' },
    '西藏': { representative: '拉萨古桥', mainDynasty: '清代', mainType: '索桥' },
    '内蒙古': { representative: '草原古桥', mainDynasty: '清代', mainType: '木桥' },
    '吉林': { representative: '松花江桥', mainDynasty: '清代', mainType: '木桥' },
    '黑龙江': { representative: '黑龙江古桥', mainDynasty: '清代', mainType: '木桥' },
    '天津': { representative: '天津古桥', mainDynasty: '明代', mainType: '拱桥' },
    '海南': { representative: '海南古桥', mainDynasty: '清代', mainType: '石桥' },
    '重庆': { representative: '重庆古桥', mainDynasty: '清代', mainType: '拱桥' },
    '宁夏': { representative: '宁夏古桥', mainDynasty: '明代', mainType: '拱桥' },
    '新疆': { representative: '新疆古桥', mainDynasty: '清代', mainType: '木桥' }
  }
  
  const provinceData = bridgeProvinceData.provinces.find(p => p.name === province.name)
  const count = provinceData ? provinceData.count : 0
  
  const info = provinceInfo[province.name] || { 
    representative: provinceData?.representatives?.join('、') || '待考证', 
    mainDynasty: '多朝代', 
    mainType: '多种类型' 
  }
  
  hoveredProvince.value = {
    name: province.name,
    count: count,
    ...info
  }
  
  const rect = event.event.event.target.getBoundingClientRect()
  const mapRect = document.getElementById('chinaMapChart').getBoundingClientRect()
  
  provinceCardStyle.value = {
    left: (event.event.offsetX + 20) + 'px',
    top: (event.event.offsetY - 60) + 'px'
  }
}

const hideProvinceCard = () => {
  hoveredProvince.value = null
}

const initChinaMapChart = () => {
  chinaMapChart.value = echarts.init(document.getElementById('chinaMapChart'))
  
  const data = bridgeProvinceData.provinces.map(item => ({
    name: item.name,
    value: item.count
  }))
  
  const geoCoordMap = {
    '北京': [116.46, 39.92],
    '天津': [117.2, 39.13],
    '河北': [114.48, 38.03],
    '山西': [112.53, 37.87],
    '内蒙古': [111.65, 40.82],
    '辽宁': [123.38, 41.8],
    '吉林': [125.35, 43.88],
    '黑龙江': [126.63, 45.75],
    '上海': [121.48, 31.22],
    '江苏': [118.78, 32.04],
    '浙江': [120.19, 30.26],
    '安徽': [117.27, 31.86],
    '福建': [119.3, 26.08],
    '江西': [115.89, 28.68],
    '山东': [117, 36.65],
    '河南': [113.65, 34.76],
    '湖北': [114.31, 30.52],
    '湖南': [112.98, 28.21],
    '广东': [113.23, 23.16],
    '广西': [108.33, 22.84],
    '海南': [110.35, 20.02],
    '重庆': [106.54, 29.59],
    '四川': [104.06, 30.67],
    '贵州': [106.71, 26.57],
    '云南': [102.73, 25.04],
    '西藏': [91.11, 29.97],
    '陕西': [108.95, 34.27],
    '甘肃': [103.73, 36.03],
    '青海': [101.74, 36.56],
    '宁夏': [106.27, 38.47],
    '新疆': [87.68, 43.77],
    '台湾': [121.51, 25.05],
    '香港': [114.17, 22.28],
    '澳门': [113.54, 22.19]
  }
  
  const scatterData = data.map(item => ({
    name: item.name,
    value: [...(geoCoordMap[item.name] || [0, 0]), item.value]
  }))
  
  const maxValue = Math.max(...data.map(d => d.value), 100)
  
  const flylinesData = [
    { coords: [[114.48, 38.03], [113.65, 34.76]], name: '赵州桥→洛阳桥技术' },
    { coords: [[113.65, 34.76], [118.78, 32.04]], name: '中原→江南传播' },
    { coords: [[118.78, 32.04], [120.19, 30.26]], name: '江苏→浙江传播' },
    { coords: [[120.19, 30.26], [119.3, 26.08]], name: '浙江→福建传播' },
    { coords: [[119.3, 26.08], [113.23, 23.16]], name: '福建→广东传播' },
    { coords: [[104.06, 30.67], [102.73, 25.04]], name: '四川→云南传播' },
    { coords: [[102.73, 25.04], [106.71, 26.57]], name: '云南→贵州传播' },
    { coords: [[116.46, 39.92], [114.48, 38.03]], name: '北京→河北传播' }
  ]
  
  const heatmapData = []
  data.forEach(item => {
    const coord = geoCoordMap[item.name]
    if (coord) {
      const intensity = item.value > 30 ? 100 : item.value > 15 ? 80 : item.value > 5 ? 60 : 40
      const spread = item.value > 30 ? 1.5 : item.value > 15 ? 2 : 2.5
      const pointCount = Math.min(item.value * 2, 80)
      for (let i = 0; i < pointCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * spread
        heatmapData.push([
          coord[0] + Math.cos(angle) * radius,
          coord[1] + Math.sin(angle) * radius,
          intensity * (1 - radius / spread) + Math.random() * 20
        ])
      }
    }
  })
  
  const riversData = [
    { name: '长江', coords: [[91.11, 29.97], [104.06, 30.67], [106.54, 29.59], [108.95, 34.27], [114.31, 30.52], [115.89, 28.68], [118.78, 32.04], [121.48, 31.22]] },
    { name: '黄河', coords: [[96.0, 35.0], [103.73, 36.03], [106.27, 38.47], [108.95, 34.27], [112.53, 37.87], [113.65, 34.76], [117, 36.65], [118.78, 32.04]] },
    { name: '珠江', coords: [[102.73, 25.04], [106.71, 26.57], [108.33, 22.84], [110.35, 20.02], [113.23, 23.16]] },
    { name: '大运河', coords: [[116.46, 39.92], [117.2, 39.13], [117, 36.65], [118.78, 32.04], [120.19, 30.26]] }
  ]
  
  const option = {
    backgroundColor: 'transparent',
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut',
    animationThreshold: 8,
    toolbox: {
      show: true,
      right: 10,
      top: 5,
      feature: {
        saveAsImage: {
          show: true,
          title: '保存为图片',
          type: 'png',
          pixelRatio: 2,
          name: '古桥地域分布'
        },
        restore: {
          show: true,
          title: '还原'
        }
      },
      iconStyle: {
        borderColor: '#C9A961'
      },
      emphasis: {
        iconStyle: {
          borderColor: '#FFD700'
        }
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderColor: '#C9A961',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: function(params) {
        if (params.seriesType === 'effectScatter') {
          return `<div style="padding: 5px;">
            <div style="font-size: 14px; font-weight: bold; color: #C9A961;">${params.name}</div>
            <div style="margin-top: 5px;">古桥数量: <span style="color: #FFD700;">${params.value[2]}</span> 座</div>
          </div>`
        }
        if (params.seriesType === 'lines' && params.name) {
          return `<div style="padding: 5px; color: #C9A961;">${params.name}</div>`
        }
        return params.name + '<br/>古桥数量: ' + (params.value || 0) + '座'
      }
    },
    visualMap: {
      min: 0,
      max: maxValue,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      textStyle: { color: '#E8E4D8', fontSize: 11 },
      inRange: {
        color: ['#1A3A3A', '#4A6B6B', '#5B8C85', '#8B7355', '#C9A961']
      },
      calculable: true,
      itemWidth: 12,
      itemHeight: 80
    },
    geo: {
      map: 'china',
      roam: true,
      zoom: 1.35,
      center: [105, 36],
      scaleLimit: {
        min: 0.8,
        max: 5
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
          textShadowColor: 'rgba(0, 0, 0, 0.8)',
          textShadowBlur: 4
        },
        itemStyle: {
          areaColor: '#C9A961',
          borderColor: '#FFD700',
          borderWidth: 3,
          shadowBlur: 35,
          shadowColor: 'rgba(255, 215, 0, 0.8)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      select: {
        label: {
          show: true,
          color: '#FFD700',
          fontSize: 14,
          fontWeight: 'bold'
        },
        itemStyle: {
          areaColor: '#B8423A',
          borderColor: '#FFD700',
          borderWidth: 3,
          shadowBlur: 40,
          shadowColor: 'rgba(255, 215, 0, 0.9)'
        }
      },
      itemStyle: {
        areaColor: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#3D5A5A' },
            { offset: 1, color: '#1A3A3A' }
          ]
        },
        borderColor: '#C9A961',
        borderWidth: 1,
        shadowColor: 'rgba(212, 175, 55, 0.4)',
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 5
      },
      regions: data.map(item => ({
        name: item.name,
        itemStyle: {
          areaColor: item.value > 20 ? '#5B8C85' : item.value > 10 ? '#3D6B6B' : '#4A6B6B',
          shadowBlur: item.value > 15 ? 15 : 5,
          shadowColor: 'rgba(212, 175, 55, 0.3)'
        }
      }))
    },
    series: [
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        data: data,
        tooltip: {
          show: false
        }
      },
      {
        name: '古桥分布',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: scatterData,
        symbolSize: function(val) {
          return Math.max(Math.sqrt(val[2]) * 2, 10)
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 6,
          period: 3,
          color: '#FFD700'
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: '#C9A961',
          fontSize: 10,
          fontWeight: '500',
          textShadowColor: 'rgba(0, 0, 0, 0.8)',
          textShadowBlur: 3
        },
        emphasis: {
          scale: 1.8,
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#FFD700'
          },
          itemStyle: {
            shadowBlur: 35,
            shadowColor: 'rgba(255, 215, 0, 0.9)'
          }
        },
        itemStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              { offset: 0, color: '#FFD700' },
              { offset: 0.3, color: '#FFA500' },
              { offset: 0.6, color: '#C9A961' },
              { offset: 1, color: '#B8423A' }
            ]
          },
          shadowBlur: 25,
          shadowColor: 'rgba(255, 215, 0, 0.9)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        },
        zlevel: 2
      },
      {
        name: '涟漪层',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        animation: true,
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        data: scatterData.filter(item => item.value[2] > 15),
        symbolSize: function(val) {
          return Math.max(Math.sqrt(val[2]) * 1.5, 8)
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 8,
          period: 5,
          color: 'rgba(255, 215, 0, 0.3)'
        },
        label: { show: false },
        itemStyle: {
          color: 'transparent',
          borderColor: 'rgba(255, 215, 0, 0.5)',
          borderWidth: 2
        },
        zlevel: 1
      },
      {
        name: '技术传播',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 3,
        animation: true,
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        animationDelay: (idx) => idx * 200,
        progressive: 200,
        progressiveThreshold: 500,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.3,
          symbol: 'arrow',
          symbolSize: 6,
          color: '#FFD700',
          loop: true
        },
        lineStyle: {
          color: '#C9A961',
          width: 1.5,
          curveness: 0.3,
          opacity: 0.6
        },
        data: showFlylines.value ? flylinesData.map(item => ({
          coords: item.coords,
          name: item.name,
          lineStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: '#C9A961' },
                { offset: 1, color: '#B8423A' }
              ]
            }
          }
        })) : []
      },
      {
        name: '热力图',
        type: 'heatmap',
        coordinateSystem: 'geo',
        animation: true,
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        progressive: 500,
        progressiveThreshold: 1000,
        data: showHeatmap.value ? heatmapData : [],
        pointSize: 12,
        blurSize: 10,
        minOpacity: 0.2,
        maxOpacity: 0.9,
        itemStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              { offset: 0, color: 'rgba(255, 215, 0, 0.95)' },
              { offset: 0.3, color: 'rgba(212, 175, 55, 0.7)' },
              { offset: 0.6, color: 'rgba(197, 61, 67, 0.5)' },
              { offset: 1, color: 'rgba(139, 0, 0, 0.1)' }
            ]
          },
          shadowBlur: 15,
          shadowColor: 'rgba(212, 175, 55, 0.5)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 25,
            shadowColor: 'rgba(255, 215, 0, 0.8)'
          }
        }
      },
      {
        name: '河流水系',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 1,
        animation: true,
        animationDuration: 2000,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        animationDelay: (idx) => idx * 300,
        progressive: 100,
        progressiveThreshold: 300,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(103, 194, 58, 0.7)' },
              { offset: 0.3, color: 'rgba(64, 158, 255, 0.8)' },
              { offset: 0.7, color: 'rgba(64, 158, 255, 0.8)' },
              { offset: 1, color: 'rgba(103, 194, 58, 0.7)' }
            ]
          },
          width: 2.5,
          curveness: 0.1,
          opacity: 0.85
        },
        effect: {
          show: true,
          period: 4,
          trailLength: 0.3,
          symbol: 'circle',
          symbolSize: 5,
          color: '#67C23A',
          shadowBlur: 8,
          shadowColor: 'rgba(103, 194, 58, 0.6)',
          loop: true
        },
        data: showRivers.value ? riversData.map(river => ({
          coords: river.coords,
          name: river.name,
          lineStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(103, 194, 58, 0.7)' },
                { offset: 0.3, color: 'rgba(64, 158, 255, 0.8)' },
                { offset: 0.7, color: 'rgba(64, 158, 255, 0.8)' },
                { offset: 1, color: 'rgba(103, 194, 58, 0.7)' }
              ]
            }
          }
        })) : []
      }
    ]
  }
  
  chinaMapChart.value.setOption(option)
  
  flylinesOriginalData = flylinesData.map(item => ({
    coords: item.coords,
    name: item.name,
    lineStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 1, y2: 0,
        colorStops: [
          { offset: 0, color: '#C9A961' },
          { offset: 1, color: '#B8423A' }
        ]
      }
    }
  }))
  heatmapOriginalData = [...heatmapData]
  riversOriginalData = riversData.map(river => ({
    coords: river.coords,
    name: river.name,
    lineStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 1, y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(103, 194, 58, 0.7)' },
          { offset: 0.3, color: 'rgba(64, 158, 255, 0.8)' },
          { offset: 0.7, color: 'rgba(64, 158, 255, 0.8)' },
          { offset: 1, color: 'rgba(103, 194, 58, 0.7)' }
        ]
      }
    }
  }))
  
  chinaMapChart.value.on('mouseover', function(params) {
    if (params.componentType === 'series' && params.seriesType === 'map') {
      const provinceNameMap = {
        '北京市': '北京', '天津市': '天津', '河北省': '河北', '山西省': '山西',
        '内蒙古自治区': '内蒙古', '辽宁省': '辽宁', '吉林省': '吉林', '黑龙江省': '黑龙江',
        '上海市': '上海', '江苏省': '江苏', '浙江省': '浙江', '安徽省': '安徽',
        '福建省': '福建', '江西省': '江西', '山东省': '山东', '河南省': '河南',
        '湖北省': '湖北', '湖南省': '湖南', '广东省': '广东', '广西壮族自治区': '广西',
        '海南省': '海南', '重庆市': '重庆', '四川省': '四川', '贵州省': '贵州',
        '云南省': '云南', '西藏自治区': '西藏', '陕西省': '陕西', '甘肃省': '甘肃',
        '青海省': '青海', '宁夏回族自治区': '宁夏', '新疆维吾尔自治区': '新疆',
        '台湾省': '台湾', '香港特别行政区': '香港', '澳门特别行政区': '澳门'
      }
      const shortName = provinceNameMap[params.name] || params.name
      const provinceDataItem = bridgeProvinceData.provinces.find(p => p.name === shortName)
      showProvinceCard({ 
        name: shortName, 
        value: provinceDataItem ? provinceDataItem.count : 0
      }, params)
    }
  })
  
  chinaMapChart.value.on('mouseout', function(params) {
    if (params.componentType === 'series' && params.seriesType === 'map') {
      hideProvinceCard()
    }
  })
  
  chinaMapChart.value.on('click', function(params) {
    if (params.componentType === 'series' && params.seriesType === 'map') {
      const provinceNameMap = {
        '北京市': '北京', '天津市': '天津', '河北省': '河北', '山西省': '山西',
        '内蒙古自治区': '内蒙古', '辽宁省': '辽宁', '吉林省': '吉林', '黑龙江省': '黑龙江',
        '上海市': '上海', '江苏省': '江苏', '浙江省': '浙江', '安徽省': '安徽',
        '福建省': '福建', '江西省': '江西', '山东省': '山东', '河南省': '河南',
        '湖北省': '湖北', '湖南省': '湖南', '广东省': '广东', '广西壮族自治区': '广西',
        '海南省': '海南', '重庆市': '重庆', '四川省': '四川', '贵州省': '贵州',
        '云南省': '云南', '西藏自治区': '西藏', '陕西省': '陕西', '甘肃省': '甘肃',
        '青海省': '青海', '宁夏回族自治区': '宁夏', '新疆维吾尔自治区': '新疆',
        '台湾省': '台湾', '香港特别行政区': '香港', '澳门特别行政区': '澳门'
      }
      const shortName = provinceNameMap[params.name] || params.name
      focusProvince(shortName)
    }
  })
  
  chinaMapChart.value.getZr().on('dblclick', function() {
    resetMapView()
  })
  
  chinaMapChart.value.getZr().on('mousewheel', function(e) {
    const option = chinaMapChart.value.getOption()
    if (option && option.geo && option.geo[0]) {
      const currentZoom = option.geo[0].zoom || 1.35
      mapZoomLevel.value = currentZoom
    }
  })
}

const provinceCenterMap = {
  '北京': { center: [116.46, 39.92], zoom: 4 },
  '天津': { center: [117.2, 39.13], zoom: 4 },
  '河北': { center: [114.48, 38.03], zoom: 3.5 },
  '山西': { center: [112.53, 37.87], zoom: 3.5 },
  '内蒙古': { center: [111.65, 40.82], zoom: 2.5 },
  '辽宁': { center: [123.38, 41.8], zoom: 3.5 },
  '吉林': { center: [125.35, 43.88], zoom: 3.5 },
  '黑龙江': { center: [126.63, 45.75], zoom: 2.8 },
  '上海': { center: [121.48, 31.22], zoom: 5 },
  '江苏': { center: [118.78, 32.04], zoom: 3.5 },
  '浙江': { center: [120.19, 30.26], zoom: 3.5 },
  '安徽': { center: [117.27, 31.86], zoom: 3.5 },
  '福建': { center: [119.3, 26.08], zoom: 3.5 },
  '江西': { center: [115.89, 28.68], zoom: 3.5 },
  '山东': { center: [117, 36.65], zoom: 3.2 },
  '河南': { center: [113.65, 34.76], zoom: 3.2 },
  '湖北': { center: [114.31, 30.52], zoom: 3.5 },
  '湖南': { center: [112.98, 28.21], zoom: 3.5 },
  '广东': { center: [113.23, 23.16], zoom: 3.2 },
  '广西': { center: [108.33, 22.84], zoom: 3 },
  '海南': { center: [110.35, 20.02], zoom: 4 },
  '重庆': { center: [106.54, 29.59], zoom: 4 },
  '四川': { center: [104.06, 30.67], zoom: 2.8 },
  '贵州': { center: [106.71, 26.57], zoom: 3.5 },
  '云南': { center: [102.73, 25.04], zoom: 2.8 },
  '西藏': { center: [91.11, 29.97], zoom: 2 },
  '陕西': { center: [108.95, 34.27], zoom: 3.2 },
  '甘肃': { center: [103.73, 36.03], zoom: 2.5 },
  '青海': { center: [101.74, 36.56], zoom: 2.5 },
  '宁夏': { center: [106.27, 38.47], zoom: 4 },
  '新疆': { center: [87.68, 43.77], zoom: 2 },
  '台湾': { center: [121.51, 25.05], zoom: 4 },
  '香港': { center: [114.17, 22.28], zoom: 5 },
  '澳门': { center: [113.54, 22.19], zoom: 5 }
}

const focusProvince = (provinceName) => {
  if (!chinaMapChart.value || !provinceCenterMap[provinceName]) return
  
  const { center, zoom } = provinceCenterMap[provinceName]
  focusedProvince.value = provinceName
  mapZoomLevel.value = zoom
  
  chinaMapChart.value.setOption({
    animation: false,
    geo: {
      center: center,
      zoom: zoom
    }
  }, {
    lazyUpdate: false,
    silent: true
  })
  
  requestAnimationFrame(() => {
    chinaMapChart.value.setOption({
      animation: true
    })
    chinaMapChart.value.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      name: provinceName
    })
  })
}

const resetMapView = () => {
  if (!chinaMapChart.value) return
  
  focusedProvince.value = null
  mapZoomLevel.value = 1.35
  
  chinaMapChart.value.setOption({
    animation: false,
    geo: {
      center: [105, 36],
      zoom: 1.35
    }
  }, {
    lazyUpdate: false,
    silent: true
  })
  
  requestAnimationFrame(() => {
    chinaMapChart.value.setOption({
      animation: true
    })
    chinaMapChart.value.dispatchAction({
      type: 'downplay'
    })
  })
}

const initFunctionChart = () => {
  functionChart.value = echarts.init(document.getElementById('functionChart'))
  
  const functionData = [
    { name: '交通要道', value: 245, desc: '连接两岸交通', icon: '🛤️' },
    { name: '景观桥梁', value: 178, desc: '园林景观配套', icon: '🏯' },
    { name: '纪念性建筑', value: 89, desc: '纪念历史事件', icon: '🏛️' },
    { name: '水利设施', value: 67, desc: '调节水流', icon: '💧' },
    { name: '防御工事', value: 34, desc: '军事防御用途', icon: '🏰' }
  ]
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: '#C9A961',
      borderWidth: 1,
      padding: [10, 14],
      extraCssText: 'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); border-radius: 6px;',
      textStyle: { color: '#E8E4D8', fontSize: 12 },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(212, 175, 55, 0.1)'
        }
      },
      formatter: function(params) {
        const data = params[0]
        const item = functionData[data.dataIndex]
        return `
          <div style="min-width: 180px;">
            <div style="font-weight:700;color:#C9A961;font-size:14px;margin-bottom:8px">${data.name}</div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">古桥数量</span>
              <span style="color:#FFD700;font-weight:600">${data.value}座</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">功能说明</span>
              <span style="color:#B8423A">${item.desc}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">占比</span>
              <span style="color:#5B8C85">${(data.value / 613 * 100).toFixed(1)}%</span>
            </div>
          </div>
        `
      }
    },
    grid: {
      left: '10%',
      right: '5%',
      top: '28%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: functionData.map(d => d.name),
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 11,
        rotate: 0,
        interval: 0,
        margin: 12
      },
      axisLine: { 
        lineStyle: { color: 'rgba(212, 175, 55, 0.5)' }
      },
      axisTick: {
        lineStyle: { color: 'rgba(212, 175, 55, 0.3)' }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#E8E4D8', fontSize: 10 },
      splitLine: { 
        lineStyle: { 
          color: 'rgba(212, 175, 55, 0.1)',
          type: 'dashed'
        }
      },
      axisLine: { show: false }
    },
    series: [{
      type: 'line',
      data: functionData.map((d, i) => ({
        value: d.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: ['#5B8C85', '#C9A961', '#B8423A', '#4A90D9', '#FFD700'][i] },
            { offset: 1, color: ['#3D6863', '#A68A3D', '#8B3535', '#3A70A0', '#C9A961'][i] }
          ]),
          borderColor: '#FFD700',
          borderWidth: 2,
          shadowColor: 'rgba(255, 215, 0, 0.5)',
          shadowBlur: 12
        }
      })),
      smooth: 0.4,
      symbol: 'diamond',
      symbolSize: 14,
      lineStyle: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#5B8C85' },
          { offset: 0.3, color: '#C9A961' },
          { offset: 0.6, color: '#B8423A' },
          { offset: 1, color: '#FFD700' }
        ]),
        shadowColor: 'rgba(212, 175, 55, 0.6)',
        shadowBlur: 15,
        shadowOffsetY: 8
      },
      emphasis: {
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 3,
          shadowBlur: 20
        },
        lineStyle: {
          width: 5
        }
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255, 215, 0, 0.5)' },
          { offset: 0.3, color: 'rgba(212, 175, 55, 0.3)' },
          { offset: 0.6, color: 'rgba(197, 61, 67, 0.15)' },
          { offset: 1, color: 'rgba(91, 140, 133, 0.02)' }
        ]),
        shadowColor: 'rgba(212, 175, 55, 0.3)',
        shadowBlur: 20
      },
      label: {
        show: true,
        position: 'top',
        color: '#FFD700',
        fontSize: 11,
        fontWeight: 'bold',
        formatter: '{c}座'
      },
      animationDelay: (idx) => idx * 100
    },
    {
      type: 'line',
      data: functionData.map((d, i) => ({
        value: d.value,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#FFD700',
          shadowBlur: 15,
          shadowColor: 'rgba(255, 215, 0, 0.8)'
        }
      })),
      smooth: 0.4,
      lineStyle: {
        width: 0,
        opacity: 0
      },
      emphasis: {
        disabled: true
      },
      z: 10
    }],
    animationDuration: 1800,
    animationEasing: 'elasticOut'
  }
  
  functionChart.value.setOption(option)

  let flowIndex = 0
  let flowFrame = null
  
  const animateFlow = () => {
    flowIndex = (flowIndex + 0.02) % functionData.length
    
    const currentIndex = Math.floor(flowIndex)
    const nextIndex = (currentIndex + 1) % functionData.length
    const progress = flowIndex - currentIndex
    
    const currentY = functionData[currentIndex].value
    const nextY = functionData[nextIndex].value
    const interpolatedY = currentY + (nextY - currentY) * progress
    
    const flowData = functionData.map((d, i) => ({
      value: i === currentIndex || i === nextIndex ? d.value : null,
      symbol: 'circle',
      symbolSize: i === currentIndex ? 12 + Math.sin(flowIndex * 10) * 3 : 8,
      itemStyle: {
        color: '#FFD700',
        shadowBlur: i === currentIndex ? 25 : 15,
        shadowColor: 'rgba(255, 215, 0, 0.9)',
        borderColor: '#fff',
        borderWidth: i === currentIndex ? 2 : 1
      }
    }))
    
    functionChart.value.setOption({
      series: [{}, {
        data: flowData
      }]
    })
    
    flowFrame = requestAnimationFrame(animateFlow)
  }
  
  setTimeout(() => {
    animateFlow()
  }, 2000)
}

const initProvinceBarChart = () => {
  provinceBarChart.value = echarts.init(document.getElementById('provinceBarChart'))
  
  const top10 = bridgeProvinceData.provinces.slice(0, 10).reverse()
  const baseData = top10.map(item => item.count)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderColor: '#C9A961',
      borderWidth: 1,
      textStyle: { color: '#E8E4D8', fontSize: 12 },
      formatter: function(params) {
        const data = params[0]
        const realValue = baseData[top10.length - 1 - data.dataIndex]
        return `<div style="padding: 6px 10px;">
          <div style="font-weight: bold; color: #C9A961; margin-bottom: 8px; font-size: 14px;">${data.name}</div>
          <div style="display: flex; justify-content: space-between; margin: 4px 0; gap: 20px;">
            <span>古桥数量</span>
            <span style="color: #FFD700; font-weight: bold;">${realValue}座</span>
          </div>
        </div>`
      }
    },
    grid: {
      left: '3%',
      right: '12%',
      top: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { 
        color: 'rgba(232, 228, 216, 0.7)', 
        fontSize: 10 
      },
      splitLine: { 
        lineStyle: { 
          color: 'rgba(212, 175, 55, 0.1)',
          type: 'dashed'
        } 
      },
      axisLine: { show: false }
    },
    yAxis: {
      type: 'category',
      data: top10.map(item => item.name),
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 11,
        fontWeight: 500
      },
      axisLine: { 
        lineStyle: { color: 'rgba(212, 175, 55, 0.3)' } 
      },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: top10.map((item, index) => ({
        value: item.count,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(45, 74, 74, 0.8)' },
            { offset: 0.5, color: 'rgba(91, 140, 133, 0.9)' },
            { offset: 1, color: index === 9 ? '#FFD700' : '#C9A961' }
          ]),
          borderRadius: [0, 6, 6, 0],
          shadowColor: index === 9 ? 'rgba(255, 215, 0, 0.5)' : 'rgba(201, 169, 97, 0.3)',
          shadowBlur: 15,
          shadowOffsetX: 2
        }
      })),
      barWidth: '50%',
      z: 2,
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#5B8C85' },
            { offset: 0.5, color: '#C9A961' },
            { offset: 1, color: '#FFD700' }
          ]),
          shadowBlur: 25,
          shadowColor: 'rgba(255, 215, 0, 0.6)'
        }
      },
      label: {
        show: true,
        position: 'right',
        color: '#FFD700',
        fontSize: 11,
        fontWeight: 'bold',
        formatter: '{c}座',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowBlur: 4
      },
      animationDelay: (idx) => idx * 150,
      animationEasing: 'cubicOut'
    }],
    animationDuration: 1500,
    animationEasing: 'cubicOut'
  }
  
  provinceBarChart.value.setOption(option)
  
  let animTime = 0
  let animFrame = null
  let isHovering = false
  
  const animate = () => {
    animTime += 0.03
    
    const waveData = top10.map((item, index) => {
      const wave = Math.sin(animTime + index * 0.4) * 0.08
      const pulse = Math.sin(animTime * 2 + index * 0.3) * 0.05
      const glowIntensity = 0.5 + Math.sin(animTime + index * 0.5) * 0.3
      
      const gradientOffset1 = 0.3 + Math.sin(animTime * 1.5 + index * 0.3) * 0.1
      const gradientOffset2 = 0.6 + Math.sin(animTime * 1.2 + index * 0.4) * 0.1
      
      return {
        value: item.count,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: `rgba(45, 74, 74, ${0.6 + wave * 0.3})` },
            { offset: gradientOffset1, color: `rgba(74, 107, 107, ${0.7 + pulse * 0.2})` },
            { offset: gradientOffset2, color: `rgba(91, 140, 133, ${0.8 + wave * 0.2})` },
            { offset: 1, color: index === 9 ? '#FFD700' : '#C9A961' }
          ]),
          borderRadius: [0, 6, 6, 0],
          shadowColor: index === 9 
            ? `rgba(255, 215, 0, ${0.4 + glowIntensity * 0.3})` 
            : `rgba(201, 169, 97, ${0.2 + glowIntensity * 0.2})`,
          shadowBlur: 12 + Math.sin(animTime + index) * 8,
          shadowOffsetX: 2
        }
      }
    })
    
    if (!isHovering) {
      provinceBarChart.value.setOption({
        series: [{ data: waveData }]
      }, { lazyUpdate: true })
    }
    
    animFrame = requestAnimationFrame(animate)
  }
  
  setTimeout(() => {
    animate()
  }, 2000)
  
  provinceBarChart.value.on('mouseover', () => { isHovering = true })
  provinceBarChart.value.on('mouseout', () => { isHovering = false })
  
  provinceBarChart.value.on('click', function(params) {
    if (params.componentType === 'series') {
      const province = top10[params.dataIndex]
      const provinceBridges = bridgeData.bridges.filter(b => b.province === province.name)
      if (provinceBridges.length > 0) {
        alert(`${province.name}共有${provinceBridges.length}座古桥`)
      }
    }
  })
}

const initScatterChart = () => {
  const container = document.getElementById('scatterChart')
  if (!container) return
  
  scatterChart.value = echarts.init(container)
  
  const dynastyOrder = ['隋', '唐', '宋', '金', '元', '明', '清', '近现代']
  const dynastyYearMap = {
    '隋': 1420,
    '唐': 1300,
    '宋': 1000,
    '金': 850,
    '元': 700,
    '明': 550,
    '清': 300,
    '近现代': 100
  }
  
  const dynastyColorMap = {
    '隋': '#FFD700',
    '唐': '#C9A961',
    '宋': '#B8423A',
    '金': '#DAA520',
    '元': '#5B8C85',
    '明': '#8B7355',
    '清': '#6B8E23',
    '近现代': '#4682B4'
  }
  
  const scatterData = bridgeData.bridges
    .filter(b => dynastyOrder.includes(b.dynasty))
    .map(b => ({
      name: b.name,
      value: [dynastyYearMap[b.dynasty], b.span],
      dynasty: b.dynasty,
      province: b.province,
      bridgeType: b.bridgeType,
      itemStyle: {
        color: dynastyColorMap[b.dynasty]
      }
    }))
  
  if (scatterData.length === 0) {
    return
  }

  const scatterDataWithAnimation = scatterData.map((item, index) => ({
    ...item,
    symbolOffset: [Math.sin(index * 0.5) * 3, Math.cos(index * 0.3) * 3]
  }))
  
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
        const d = params.data
        return `
          <div style="min-width: 150px;">
            <div style="font-weight:700;color:#C9A961;font-size:14px;margin-bottom:8px">${d.name}</div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">朝代</span>
              <span style="color:#E8E4D8">${d.dynasty}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">跨度</span>
              <span style="color:#FFD700;font-weight:600">${d.value[1]}m</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">类型</span>
              <span style="color:#B8423A">${d.bridgeType}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin:4px 0">
              <span style="color:#888">位置</span>
              <span style="color:#E8E4D8">${d.province}</span>
            </div>
          </div>
        `
      }
    },
    grid: {
      left: '8%',
      right: '8%',
      top: '12%',
      bottom: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '距今(年)',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        color: '#888',
        fontSize: 10
      },
      min: 0,
      max: 1500,
      axisLabel: { 
        color: '#E8E4D8', 
        fontSize: 10,
        formatter: '{value}'
      },
      splitLine: { 
        lineStyle: { 
          color: 'rgba(212, 175, 55, 0.1)',
          type: 'dashed'
        }
      },
      axisLine: { 
        lineStyle: { color: 'rgba(212, 175, 55, 0.5)' }
      }
    },
    yAxis: {
      type: 'value',
      name: '跨度(m)',
      nameLocation: 'middle',
      nameGap: 35,
      nameTextStyle: {
        color: '#888',
        fontSize: 10
      },
      axisLabel: { color: '#E8E4D8', fontSize: 10 },
      splitLine: { 
        lineStyle: { 
          color: 'rgba(212, 175, 55, 0.1)',
          type: 'dashed'
        }
      },
      axisLine: { show: false }
    },
    series: [
      {
        type: 'scatter',
        data: scatterDataWithAnimation,
        symbolSize: function(data) {
          return Math.max(Math.sqrt(data[1]) * 2, 8)
        },
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(255, 215, 0, 0.4)',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 0.9
        },
        emphasis: {
          scale: 2,
          itemStyle: {
            shadowBlur: 30,
            shadowColor: 'rgba(255, 215, 0, 0.8)',
            borderColor: '#FFD700',
            borderWidth: 3
          }
        },
        animationDuration: 2000,
        animationDelay: function(idx) {
          return idx * 30
        },
        animationEasing: 'elasticOut'
      },
      {
        type: 'effectScatter',
        data: scatterData.slice(0, 5).map(item => ({
          ...item,
          symbolSize: Math.max(Math.sqrt(item.value[1]) * 2.5, 12)
        })),
        rippleEffect: {
          brushType: 'stroke',
          scale: 4,
          period: 3
        },
        itemStyle: {
          color: 'rgba(255, 215, 0, 0.3)',
          shadowBlur: 20,
          shadowColor: 'rgba(255, 215, 0, 0.5)'
        },
        zlevel: 1
      }
    ],
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  }
  
  scatterChart.value.setOption(option)

  let animationFrame = null
  let time = 0
  const animateScatter = () => {
    time += 0.02
    const newData = scatterData.map((item, index) => ({
      ...item,
      symbolOffset: [
        Math.sin(time + index * 0.3) * 4,
        Math.cos(time + index * 0.2) * 4
      ],
      symbolSize: Math.max(Math.sqrt(item.value[1]) * 2, 8) + Math.sin(time * 2 + index) * 2
    }))
    
    scatterChart.value.setOption({
      series: [{
        data: newData
      }]
    })
    
    animationFrame = requestAnimationFrame(animateScatter)
  }
  
  setTimeout(() => {
    animateScatter()
  }, 2500)
  
  scatterChart.value.on('click', function(params) {
    if (params.componentType === 'series') {
      const bridge = bridgeData.bridges.find(b => b.name === params.data.name)
      if (bridge) {
        router.push({
          path: '/bridge/' + bridge.id
        })
      }
    }
  })
}

const initSankeyChart = () => {
  const container = document.getElementById('sankeyChart')
  if (!container) return
  
  sankeyChart.value = echarts.init(container)
  
  const dynastyColors = {
    '唐': '#C9A961',
    '宋': '#B8423A',
    '元': '#5B8C85',
    '明': '#8B7355',
    '清': '#6B8E23'
  }
  
  const typeColors = {
    '拱桥': '#FFD700',
    '梁桥': '#FF6B6B',
    '廊桥': '#7FBFBF',
    '索桥': '#A68A5A',
    '浮桥': '#8FBC8F'
  }
  
  const dynasties = ['唐', '宋', '元', '明', '清']
  const bridgeTypes = ['拱桥', '梁桥', '廊桥', '索桥', '浮桥']
  
  const nodes = [
    ...dynasties.map(name => ({ name, depth: 0 })),
    ...bridgeTypes.map(name => ({ name, depth: 1 }))
  ]
  
  const links = [
    { source: '唐', target: '拱桥', value: 15 },
    { source: '唐', target: '梁桥', value: 8 },
    { source: '宋', target: '拱桥', value: 35 },
    { source: '宋', target: '梁桥', value: 25 },
    { source: '宋', target: '廊桥', value: 12 },
    { source: '元', target: '拱桥', value: 10 },
    { source: '元', target: '梁桥', value: 8 },
    { source: '明', target: '拱桥', value: 45 },
    { source: '明', target: '梁桥', value: 30 },
    { source: '明', target: '廊桥', value: 20 },
    { source: '明', target: '索桥', value: 8 },
    { source: '清', target: '拱桥', value: 55 },
    { source: '清', target: '梁桥', value: 40 },
    { source: '清', target: '廊桥', value: 35 },
    { source: '清', target: '索桥', value: 12 },
    { source: '清', target: '浮桥', value: 10 }
  ]
  
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
        if (params.dataType === 'node') {
          const isDynasty = dynasties.includes(params.name)
          const color = isDynasty ? dynastyColors[params.name] : typeColors[params.name]
          return `<div style="min-width: 120px;">
            <div style="font-weight:700;color:${color};font-size:15px;margin-bottom:6px">${params.name}</div>
            <div style="color:#888;font-size:11px">${isDynasty ? '历史朝代' : '桥梁类型'}</div>
          </div>`
        } else {
          const sourceColor = dynastyColors[params.data.source]
          const targetColor = typeColors[params.data.target]
          return `<div style="min-width: 160px;">
            <div style="margin-bottom:8px">
              <span style="color:${sourceColor};font-weight:600">${params.data.source}</span>
              <span style="color:#666;margin:0 6px">→</span>
              <span style="color:${targetColor};font-weight:600">${params.data.target}</span>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span style="color:#888">建造数量</span>
              <span style="color:#FFD700;font-weight:700;font-size:14px">${params.data.value}座</span>
            </div>
          </div>`
        }
      }
    },
    series: [{
      type: 'sankey',
      layout: 'none',
      left: 'center',
      right: 'center',
      top: '5%',
      bottom: '5%',
      width: '80%',
      emphasis: {
        focus: 'adjacency',
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(255, 215, 0, 0.5)'
        },
        lineStyle: {
          opacity: 0.9,
          shadowBlur: 15,
          shadowColor: 'rgba(255, 215, 0, 0.4)'
        }
      },
      blur: {
        lineStyle: {
          opacity: 0.1
        }
      },
      nodeAlign: 'justify',
      nodeGap: 14,
      nodeWidth: 24,
      lineStyle: {
        color: 'gradient',
        curveness: 0.6,
        opacity: 0.55
      },
      label: {
        position: 'right',
        color: '#E8E4D8',
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Noto Serif SC, serif'
      },
      data: nodes.map((node, index) => {
        const baseColor = node.depth === 0 ? dynastyColors[node.name] : typeColors[node.name]
        return {
          name: node.name,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: baseColor },
              { offset: 0.5, color: echarts.color.lift(baseColor, 0.1) },
              { offset: 1, color: echarts.color.lift(baseColor, -0.2) }
            ]),
            borderColor: '#FFD700',
            borderWidth: 2,
            shadowBlur: 15,
            shadowColor: baseColor,
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        }
      }),
      links: links.map((link, index) => ({
        source: link.source,
        target: link.target,
        value: link.value,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: dynastyColors[link.source] },
              { offset: 0.5, color: 'rgba(255, 215, 0, 0.6)' },
              { offset: 1, color: typeColors[link.target] }
            ]
          },
          opacity: 0.5,
          curveness: 0.6,
          shadowBlur: 8,
          shadowColor: 'rgba(255, 215, 0, 0.3)'
        }
      }))
    }],
    animationDuration: 2000,
    animationEasing: 'elasticOut',
    animationDelay: (idx) => idx * 80
  }
  
  sankeyChart.value.setOption(option)
}

const initParticles = () => {
  if (!particleBg.value) {
    return
  }
  
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  particleBg.value.appendChild(canvas)
  
  const resizeCanvas = () => {
    if (!particleBg.value) return
    canvas.width = particleBg.value.offsetWidth
    canvas.height = particleBg.value.offsetHeight
  }
  resizeCanvas()
  
  particleResizeHandler = () => resizeCanvas()
  window.addEventListener('resize', particleResizeHandler)
  
  const particleCount = 40
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 2,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.6 + 0.4,
      color: ['#C9A961', '#FFD700', '#B8423A', '#FF6B6B', '#5B8C85', '#8B7355'][Math.floor(Math.random() * 6)]
    })
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach((p, i) => {
      p.x += p.vx
      p.y += p.vy
      
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.alpha
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.alpha * 0.3
      ctx.fill()
      
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = p.color
          ctx.globalAlpha = (1 - dist / 120) * 0.2
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    })
    
    ctx.globalAlpha = 1
    particleAnimationId = requestAnimationFrame(animate)
  }
  
  animate()
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

.dashboard-container {
  width: 100%;
  min-height: 100vh;
  color: #E8E4D8;
  font-family: 'Microsoft YaHei', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 30%, #1F1F1F 50%, #1A1A1A 70%, #0D0D0D 100%);
  position: relative;
  
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
    
    &:hover {
      background: rgba(212, 175, 55, 0.5);
    }
  }
}

.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.gradient-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(197, 61, 67, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(45, 90, 90, 0.05) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
  animation: gradientPulse 8s ease-in-out infinite;
}

@keyframes gradientPulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.dashboard-main {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr) 300px;
  padding: 16px;
  gap: 16px;
  position: relative;
  z-index: 10;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  &.column-left {
    .panel {
      backdrop-filter: blur(10px);
    }
  }
  
  &.column-center {
    gap: 16px;
  }
  
  &.column-right {
    .panel {
      backdrop-filter: blur(10px);
    }
  }
}

.panel {
  position: relative;
  border: 1px solid rgba(212, 175, 55, 0.25);
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
  padding: 14px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 10px;
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
  
  .panel-corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid #C9A961;
    
    &.corner-tl {
      top: 0;
      left: 0;
      border-right: none;
      border-bottom: none;
      border-radius: 12px 0 0 0;
    }
    
    &.corner-tr {
      top: 0;
      right: 0;
      border-left: none;
      border-bottom: none;
      border-radius: 0 12px 0 0;
    }
    
    &.corner-bl {
      bottom: 0;
      left: 0;
      border-right: none;
      border-top: none;
      border-radius: 0 0 0 12px;
    }
    
    &.corner-br {
      bottom: 0;
      right: 0;
      border-left: none;
      border-top: none;
      border-radius: 0 0 12px 0;
    }
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
  
  .panel-footer {
    display: none;
  }
  
  .panel-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 26px;
  line-height: 26px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  margin-bottom: 6px;
  padding: 0 8px;
}

.panel-title {
  height: 26px;
  line-height: 26px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Noto Serif SC', serif;
  color: #C9A961;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
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
    
    .title-icon {
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
    
    .title-tip {
      font-size: 10px;
      color: rgba(232, 228, 216, 0.6);
      margin-left: 8px;
    }
    
    :deep(.tip-container) {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.panel-stats {
  flex-shrink: 0;
  min-height: 110px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(26, 26, 26, 0.95) 100%);
  
  .stats-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 6px 0;
    height: calc(100% - 32px);
    align-items: center;
    
    .stat-item {
      text-align: center;
      padding: 8px;
      border-radius: 8px;
      background: rgba(212, 175, 55, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.1);
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(212, 175, 55, 0.1);
        border-color: rgba(212, 175, 55, 0.3);
        transform: translateY(-2px);
      }
      
      .stat-value {
        font-family: 'Orbitron', monospace;
        font-size: 24px;
        font-weight: 700;
        color: #C9A961;
        text-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
        animation: glow 2s ease-in-out infinite alternate;
      }
      
      .stat-label {
        font-size: 11px;
        color: #E8E4D8;
        margin-top: 2px;
        font-weight: 500;
      }
    }
  }
  
  @keyframes glow {
    from {
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
    }
    to {
      text-shadow: 0 0 20px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.4);
    }
  }
}

.panel-type {
  flex: 1;
  min-height: 240px;
  
  .chart-container {
    height: calc(100% - 36px);
    min-height: 200px;
  }
}

.panel-material {
  flex-shrink: 0;
  min-height: 200px;
  
  .chart-container {
    height: calc(100% - 36px);
    min-height: 160px;
  }
}

.panel-map {
  position: relative;
  flex: 2.5;
  min-height: 520px;
  max-height: 560px;
  border: 1px solid rgba(212, 175, 55, 0.4);
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(30, 30, 30, 0.95) 100%);
  
  .map-glow-border {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    pointer-events: none;
    z-index: 0;
    border-radius: inherit;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      padding: 2px;
      background: linear-gradient(
        135deg,
        rgba(212, 175, 55, calc(0.3 + var(--zoom-level, 1.35) * 0.15)),
        rgba(197, 61, 67, calc(0.2 + var(--zoom-level, 1.35) * 0.1)),
        rgba(91, 140, 133, calc(0.15 + var(--zoom-level, 1.35) * 0.08)),
        rgba(212, 175, 55, calc(0.3 + var(--zoom-level, 1.35) * 0.15))
      );
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: borderGlow 3s ease-in-out infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border-radius: inherit;
      background: linear-gradient(
        135deg,
        rgba(212, 175, 55, calc(0.1 + var(--zoom-level, 1.35) * 0.08)),
        rgba(197, 61, 67, calc(0.08 + var(--zoom-level, 1.35) * 0.05)),
        rgba(91, 140, 133, calc(0.05 + var(--zoom-level, 1.35) * 0.03)),
        rgba(212, 175, 55, calc(0.1 + var(--zoom-level, 1.35) * 0.08))
      );
      filter: blur(8px);
      opacity: calc(0.5 + var(--zoom-level, 1.35) * 0.2);
      animation: borderPulse 4s ease-in-out infinite;
    }
  }
  
  @keyframes borderGlow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  @keyframes borderPulse {
    0%, 100% { transform: scale(1); opacity: calc(0.5 + var(--zoom-level, 1.35) * 0.2); }
    50% { transform: scale(1.01); opacity: calc(0.7 + var(--zoom-level, 1.35) * 0.2); }
  }
  
  .panel-title {
    font-size: 15px;
    letter-spacing: 3px;
    
    &::after {
      width: 80px;
    }
  }
  
  .map-wrapper {
    position: relative;
    height: 100%;
    
    .map-title {
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 16px;
      font-weight: 600;
      font-family: 'Noto Serif SC', serif;
      color: #C9A961;
      letter-spacing: 3px;
      z-index: 10;
    }
    
    .map-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
    }
    
    .ring-1 {
      width: 720px;
      height: 720px;
      border: 2px solid rgba(212, 175, 55, 0.08);
      animation: rotate 25s linear infinite;
    }
    
    .ring-2 {
      width: 600px;
      height: 600px;
      border: 2px dashed rgba(197, 61, 67, 0.15);
      animation: rotate-reverse 30s linear infinite;
    }
    
    .ring-3 {
      width: 500px;
      height: 500px;
      border: 1px solid rgba(91, 140, 133, 0.12);
      animation: rotate 35s linear infinite;
    }
    
    @keyframes rotate {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    @keyframes rotate-reverse {
      from { transform: translate(-50%, -50%) rotate(360deg); }
      to { transform: translate(-50%, -50%) rotate(0deg); }
    }
    
    .chart-container-map {
      position: relative;
      height: 100%;
      z-index: 1;
    }
    
    .map-controls {
      position: absolute;
      top: calc(50% + 18px);
      left: 12px;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 10;
      
      .control-btn {
        position: relative;
        padding: 10px 20px;
        background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.9) 100%);
        border: 1px solid rgba(212, 175, 55, 0.4);
        border-radius: 8px;
        color: #E8E4D8;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        &:hover {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(40, 40, 40, 0.95) 100%);
          border-color: #C9A961;
          transform: translateX(4px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
          
          &::before {
            left: 100%;
          }
        }
        
        &.active {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(184, 66, 58, 0.15) 100%);
          border-color: #C9A961;
          color: #FFD700;
          box-shadow: 
            0 0 20px rgba(212, 175, 55, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 8px;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background: #FFD700;
            border-radius: 50%;
            box-shadow: 0 0 8px #FFD700;
            animation: pulse 1.5s ease-in-out infinite;
          }
        }
      }
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
    50% { opacity: 0.6; transform: translateY(-50%) scale(1.2); }
  }
  
  .province-card {
    position: absolute;
    padding: 12px 16px;
    background: rgba(26, 26, 26, 0.95);
    border: 1px solid rgba(212, 175, 55, 0.5);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    z-index: 20;
    min-width: 180px;
    transition: all 0.3s ease;
    animation: fadeIn 0.3s ease;
    
    &:hover {
      border-color: #C9A961;
      box-shadow: 0 4px 25px rgba(212, 175, 55, 0.3);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
      
      .province-name {
        font-size: 14px;
        font-weight: bold;
        color: #C9A961;
      }
      
      .province-count {
        font-size: 12px;
        color: #FFD700;
        background: rgba(212, 175, 55, 0.2);
        padding: 2px 8px;
        border-radius: 4px;
      }
    }
    
    .card-content {
      .card-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        
        .item-label {
          color: rgba(232, 228, 216, 0.6);
          font-size: 11px;
        }
        
        .item-value {
          color: #E8E4D8;
          font-size: 11px;
          font-weight: 500;
        }
      }
    }
  }
}

.panel-trend {
  height: 200px;
  
  .chart-container-trend {
    height: calc(100% - 36px);
  }
}

.panel-scatter {
  flex-shrink: 0;
  min-height: 200px;
  
  .chart-container {
    height: calc(100% - 36px);
    min-height: 160px;
  }
}

.panel-province {
  flex: 1;
  min-height: 240px;
  
  .chart-container {
    height: calc(100% - 36px);
    min-height: 200px;
  }
}

.panel-activity {
  height: 280px;
  margin-top: 10px;
  
  .chart-container-trend {
    height: calc(100% - 32px);
  }
}

.panel-bridgelist {
  flex-shrink: 0;
  min-height: 180px;
  
  .bridge-list-wrapper {
    height: calc(100% - 65px);
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(212, 175, 55, 0.3);
      border-radius: 2px;
    }
  }
  
  .bridge-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 6px;
    margin-bottom: 3px;
    
    &:hover {
      background: linear-gradient(90deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%);
      transform: translateX(4px);
    }
    
    .bridge-info {
      flex: 1;
      
      .bridge-name {
        font-size: 13px;
        color: #C9A961;
        margin: 0 0 3px 0;
        font-weight: 600;
      }
      
      .bridge-location {
        font-size: 10px;
        color: rgba(232, 228, 216, 0.6);
        margin: 0;
      }
    }
    
    .bridge-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 3px;
      
      .bridge-type {
        font-size: 9px;
        color: rgba(232, 228, 216, 0.8);
        padding: 2px 6px;
        background: rgba(45, 90, 90, 0.4);
        border-radius: 8px;
        border: 1px solid rgba(212, 175, 55, 0.2);
      }
      
      .bridge-height {
        font-size: 12px;
        color: #B8423A;
        font-weight: 700;
        text-shadow: 0 0 8px rgba(197, 61, 67, 0.4);
      }
    }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    gap: 6px;
    padding: 8px 0;
    border-top: 1px solid rgba(212, 175, 55, 0.1);
    
    button {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(45, 90, 90, 0.3);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 5px;
      color: #E8E4D8;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover, &.active {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(197, 61, 67, 0.2));
        border-color: #C9A961;
        color: #C9A961;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .dashboard-main {
    grid-template-columns: 320px 1fr 280px;
    gap: 10px;
  }
  
  .panel-stats .stats-content .stat-item .stat-value {
    font-size: 22px;
  }
}

@media screen and (max-width: 1400px) {
  .dashboard-main {
    grid-template-columns: 280px 1fr 260px;
    gap: 8px;
  }
  
  .panel-stats .stats-content .stat-item .stat-value {
    font-size: 20px;
  }
  
  .panel-map {
    min-height: 260px;
  }
}

@media screen and (max-width: 1200px) {
  .dashboard-main {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .column {
    width: 100%;
    
    &.column-left,
    &.column-right {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    &.column-center {
      order: -1;
    }
  }
  
  .panel-stats {
    grid-column: span 2;
  }
  
  .panel-map {
    min-height: 400px;
  }
}

@media screen and (max-width: 768px) {
  .dashboard-main {
    padding: 12px;
    gap: 12px;
  }
  
  .column {
    &.column-left,
    &.column-right {
      grid-template-columns: 1fr;
    }
  }
  
  .panel {
    padding: 12px;
    
    .panel-title {
      font-size: 13px;
    }
  }
  
  .panel-stats .stats-content {
    grid-template-columns: repeat(2, 1fr);
    
    .stat-item .stat-value {
      font-size: 22px;
    }
  }
  
  .panel-map {
    min-height: 300px;
  }
}
</style>





