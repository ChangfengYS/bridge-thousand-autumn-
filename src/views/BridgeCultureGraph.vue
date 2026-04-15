<template>
  <div class="culture-graph-container">
    <div class="particle-bg" ref="particleBg"></div>

    <div class="main-content">
      <div class="left-panel">
        <div class="panel-card search-panel">
          <div class="panel-footer"></div>
          <div class="card-header">
            <span class="card-title">节点搜索</span>
            <HelpTip title="节点搜索说明" content="输入节点名称可快速搜索并定位到对应节点，支持模糊匹配。" />
          </div>
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchKeyword" 
              placeholder="输入节点名称搜索..."
              class="search-input"
              @input="handleSearch"
            />
            <button class="search-btn" @click="clearSearch" v-if="searchKeyword">清除</button>
          </div>
          <div class="search-results" v-if="searchResults.length > 0">
            <div 
              v-for="node in searchResults" 
              :key="node.id"
              class="search-result-item"
              @click="focusNode(node)"
            >
              <span class="result-dot" :style="{ background: nodeFilters[node.category]?.color }"></span>
              <span class="result-name centered">{{ node.name }}</span>
            </div>
          </div>
        </div>

        <div class="panel-card filter-panel">
          <div class="panel-footer"></div>
          <div class="card-header">
            <span class="card-title">节点筛选</span>
            <HelpTip title="节点筛选说明" content="点击切换不同类型节点的显示与隐藏，可同时显示多种类型。" />
          </div>
          <div class="filter-options">
            <div 
              v-for="(filter, key) in nodeFilters" 
              :key="key"
              class="filter-item"
              :class="{ active: activeFilters.includes(key) }"
              @click="toggleFilter(key)"
            >
              <div class="filter-icon" :style="{ background: filter.color }">
                <span class="icon-inner"></span>
              </div>
              <span class="filter-name">{{ filter.name }}</span>
              <span class="filter-count">{{ filter.count }}</span>
            </div>
          </div>
        </div>

        <div class="panel-card timeline-panel">
          <div class="panel-footer"></div>
          <div class="card-header">
            <span class="card-title">历史演变</span>
            <HelpTip title="历史演变说明" content="点击不同时代可筛选对应时期的古桥及相关节点，展示古桥文化的历史发展脉络。" />
          </div>
          <div class="timeline-container" ref="timelineContainer">
            <div class="timeline-track">
              <div 
                v-for="(era, index) in eraData" 
                :key="index"
                class="timeline-era"
                :class="{ active: activeEra === index }"
                :style="{ left: `${(era.start - 500) / 15}%`, width: `${(era.end - era.start) / 15}%` }"
                @click="selectEra(index)"
              >
                <span class="era-name">{{ era.name }}</span>
              </div>
            </div>
            <div class="timeline-events">
              <div 
                v-for="(event, index) in currentEvents" 
                :key="index"
                class="event-item"
                @click="focusEvent(event)"
              >
                <span class="event-year">{{ event.year }}年</span>
                <span class="event-title">{{ event.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="center-panel">
        <div class="graph-wrapper">
          <div class="panel-footer"></div>
          <HelpTip class="graph-helptip" title="图谱说明" content="展示古桥、工匠、文献、事件、地域之间的关系网络。节点大小表示重要程度，连线表示关联关系。点击节点查看详情，拖拽可移动节点。" />
          <h2 class="graph-title">古桥文化图谱</h2>
          <div class="graph-glow"></div>
          <div id="culture-graph" ref="graphContainer"></div>
          <div class="graph-controls">
            <button class="control-btn" @click="resetGraph" title="重置视图">重置</button>
            <button class="control-btn" @click="toggleLayout" :class="{ active: isForceLayout }" title="切换布局">布局</button>
          </div>
        </div>

        <div class="legend-bar">
          <div class="legend-item" v-for="(item, key) in nodeFilters" :key="key">
            <span class="legend-dot" :style="{ background: item.color }"></span>
            <span class="legend-text">{{ item.name }}</span>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="panel-card path-panel">
          <div class="panel-footer"></div>
          <div class="card-header">
            <span class="card-title">路径探索</span>
            <HelpTip title="路径探索说明" content="选择起点和终点节点，系统将计算并展示两个节点之间的最短关联路径。" />
          </div>
          <div class="path-content">
            <div class="path-select">
              <div class="path-node-select">
                <span class="select-label">起点</span>
                <select v-model="pathStart" class="path-select-box">
                  <option value="">选择起点</option>
                  <option v-for="node in allNodes" :key="node.id" :value="node.id">{{ node.name }}</option>
                </select>
              </div>
              <div class="path-arrow">→</div>
              <div class="path-node-select">
                <span class="select-label">终点</span>
                <select v-model="pathEnd" class="path-select-box">
                  <option value="">选择终点</option>
                  <option v-for="node in allNodes" :key="node.id" :value="node.id">{{ node.name }}</option>
                </select>
              </div>
            </div>
            <button class="path-btn" @click="findPath" :disabled="!pathStart || !pathEnd">探索路径</button>
            <button class="path-btn clear-btn" @click="clearPath" v-if="pathResult.length > 0">清除路径</button>
            <div class="path-result" v-if="pathResult.length > 0">
              <div class="path-result-title">最短路径</div>
              <div class="path-nodes">
                <span v-for="(node, index) in pathResult" :key="index" class="path-node" @click="focusNodeById(node)">
                  {{ node }}
                  <span v-if="index < pathResult.length - 1" class="path-arrow-inline">→</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-card detail-panel" v-if="selectedNode">
          <div class="panel-footer"></div>
          <div class="card-header">
            <span class="card-title centered">{{ selectedNode.name }}</span>
          </div>
          <div class="detail-content">
            <div class="detail-info">
              <div class="info-item" v-if="selectedNode.year">
                <span class="info-label">年代</span>
                <span class="info-value">{{ selectedNode.year }}</span>
              </div>
              <div class="info-item" v-if="selectedNode.location">
                <span class="info-label">位置</span>
                <span class="info-value">{{ selectedNode.location }}</span>
              </div>
              <div class="info-item" v-if="selectedNode.description">
                <span class="info-label">简介</span>
                <p class="info-desc">{{ selectedNode.description }}</p>
              </div>
            </div>
            <div class="related-nodes" v-if="relatedNodes.length > 0">
              <h4 class="centered">相关节点</h4>
              <div class="related-list">
                <div 
                  v-for="node in relatedNodes" 
                  :key="node.id"
                  class="related-item"
                  @click="selectNode(node)"
                >
                  <span class="related-name centered">{{ node.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-card stats-panel" v-else>
          <div class="panel-footer"></div>
          <div class="card-header">
            <span class="card-title">图谱统计</span>
          </div>
          <div class="stats-chart-section">
            <div class="chart-title">节点类型分布</div>
            <div class="stats-chart" ref="statsChart"></div>
          </div>
        </div>

        <div class="panel-card knowledge-panel">
          <div class="card-header">
            <span class="card-title">古桥知识</span>
          </div>
          <div class="knowledge-content">
            <div class="knowledge-item" v-for="(item, index) in knowledgeItems" :key="index">
              <span class="knowledge-num">{{ index + 1 }}</span>
              <p>{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, shallowRef, watch } from 'vue'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
import { GraphChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import HelpTip from '@/components/HelpTip.vue'

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphChart,
  CanvasRenderer,
  LabelLayout,
  ToolboxComponent
])

const particleBg = ref(null)
const graphContainer = ref(null)
const timelineContainer = ref(null)
const statsChart = ref(null)

const graph = shallowRef(null)
const statsChartInstance = shallowRef(null)

const isForceLayout = ref(true)
const activeFilters = ref(['bridge', 'craftsman', 'literature', 'event', 'region'])
const activeEra = ref(-1)
const selectedNode = ref(null)

const searchKeyword = ref('')
const searchResults = ref([])
const pathStart = ref('')
const pathEnd = ref('')
const pathResult = ref([])

const nodeFilters = ref({
  bridge: { name: '古桥', color: '#C9A961', count: 12 },
  craftsman: { name: '建造工匠', color: '#B8423A', count: 8 },
  literature: { name: '文献记载', color: '#5B8C85', count: 15 },
  event: { name: '历史事件', color: '#8B7355', count: 10 },
  region: { name: '地域流派', color: '#6B8E23', count: 6 }
})

const eraData = ref([
  { name: '隋唐', start: 581, end: 907, color: '#d87c7c' },
  { name: '宋元', start: 960, end: 1368, color: '#919e8b' },
  { name: '明清', start: 1368, end: 1912, color: '#d7ab82' }
])

const knowledgeItems = ref([
  '赵州桥由隋朝工匠李春设计建造，首创敞肩拱结构，比欧洲同类技术早800年。',
  '洛阳桥首创"筏型基础"和"种蛎固基"技术，解决了跨海建桥的世界性难题。',
  '卢沟桥上的501只石狮子各具神态，是中国石雕艺术的瑰宝。',
  '广济桥是世界上最早的启闭式桥梁，体现了古代工匠的智慧。',
  '风雨桥集桥、廊、亭于一体，是侗族建筑艺术的杰出代表。'
])

const graphData = ref({
  nodes: [
    { id: 'zhaozhou', name: '赵州桥', category: 'bridge', symbolSize: 65, year: '605年', location: '河北赵县', description: '又名安济桥，世界上现存最古老的石拱桥。由隋朝工匠李春设计建造，首创敞肩拱结构，比欧洲同类技术早800年，被誉为"天下第一桥"。' },
    { id: 'lugou', name: '卢沟桥', category: 'bridge', symbolSize: 60, year: '1189年', location: '北京丰台', description: '北京现存最古老的石造联拱桥，因"卢沟桥事变"闻名于世。桥上501只石狮子各具神态，是中国石雕艺术的瑰宝。' },
    { id: 'luoyang', name: '洛阳桥', category: 'bridge', symbolSize: 60, year: '1053年', location: '福建泉州', description: '中国第一座跨海梁式石桥，由蔡襄主持建造。首创"筏型基础"和"种蛎固基"技术，是中国古代桥梁工程的杰作。' },
    { id: 'fengqiao', name: '枫桥', category: 'bridge', symbolSize: 55, year: '唐代', location: '江苏苏州', description: '江南名桥，因张继《枫桥夜泊》而名扬天下。是苏州运河上重要的交通枢纽，见证了千年水乡文化。' },
    { id: 'guangji', name: '广济桥', category: 'bridge', symbolSize: 55, year: '1171年', location: '广东潮州', description: '中国四大古桥之一，世界上最早的启闭式桥梁。集梁桥、拱桥、浮桥于一体，体现了古代工匠的非凡智慧。' },
    { id: 'anping', name: '安平桥', category: 'bridge', symbolSize: 50, year: '1138年', location: '福建晋江', description: '中国古代最长的石梁桥，全长约5里，有"天下无桥长此桥"之称。是宋代桥梁建筑的杰出代表。' },
    { id: 'dujiangyan', name: '安澜桥', category: 'bridge', symbolSize: 48, year: '宋代', location: '四川都江堰', description: '横跨岷江的索桥，是古代索桥技术的代表。与都江堰水利工程相得益彰，体现了古人的治水智慧。' },
    { id: 'duanqiao', name: '断桥', category: 'bridge', symbolSize: 50, year: '唐代', location: '浙江杭州', description: '西湖十景之一"断桥残雪"所在地。因《白蛇传》传说而闻名，是中国最具浪漫色彩的古桥。' },
    { id: 'shiqiao', name: '十七孔桥', category: 'bridge', symbolSize: 48, year: '1736年', location: '北京颐和园', description: '颐和园标志性建筑，中国最大的园林桥梁。桥上544只石狮子栩栩如生，展现了清代石雕艺术的高超水平。' },
    { id: 'fengyu', name: '程阳风雨桥', category: 'bridge', symbolSize: 50, year: '1912年', location: '广西三江', description: '侗族建筑的杰出代表，集桥、廊、亭于一体。不用一钉一铆，全靠榫卯结构，被誉为"世界十大最不可思议桥梁之一"。' },
    { id: 'baodai', name: '宝带桥', category: 'bridge', symbolSize: 45, year: '816年', location: '江苏苏州', description: '中国现存最长、保存最完整的多孔石拱桥。因形似宝带而得名，是古代运河桥梁的典范。' },
    { id: 'wuding', name: '五亭桥', category: 'bridge', symbolSize: 45, year: '1757年', location: '江苏扬州', description: '瘦西湖标志性建筑，中国最具艺术价值的桥梁之一。五座亭子建于桥上，造型独特，被誉为"中国最美的桥"。' },
    
    { id: 'lichun', name: '李春', category: 'craftsman', symbolSize: 45, year: '隋朝', location: '河北', description: '隋朝杰出工匠，赵州桥的设计者和建造者。首创敞肩拱结构，开创了世界桥梁建筑史上的新纪元。' },
    { id: 'caixiang', name: '蔡襄', category: 'craftsman', symbolSize: 42, year: '1012-1067', location: '福建仙游', description: '北宋名臣、书法家，主持建造洛阳桥。首创"筏型基础"和"种蛎固基"技术，解决了跨海建桥难题。' },
    { id: 'liujie', name: '刘杰', category: 'craftsman', symbolSize: 38, year: '宋代', location: '福建', description: '宋代桥梁工匠，安平桥的主要建造者。其精湛的石梁桥技术，使安平桥成为"天下第一长桥"。' },
    { id: 'zhangji', name: '张继', category: 'craftsman', symbolSize: 35, year: '约715-约779', location: '湖北襄阳', description: '唐代文人，《枫桥夜泊》作者。虽非桥梁工匠，但其诗作使枫桥名扬天下，成为古桥文化的重要传播者。' },
    { id: 'yangyu', name: '杨瑀', category: 'craftsman', symbolSize: 35, year: '元代', location: '北京', description: '元代工匠，参与卢沟桥的修缮和石狮雕刻工作。其雕刻技艺精湛，为卢沟桥增添了艺术魅力。' },
    { id: 'dongzu', name: '侗族工匠', category: 'craftsman', symbolSize: 35, year: '清代', location: '广西', description: '侗族传统建筑工匠群体，擅长建造风雨桥。不用一钉一铆，全靠榫卯结构，技艺代代相传。' },
    { id: 'qinggong', name: '清代宫廷工匠', category: 'craftsman', symbolSize: 38, year: '清代', location: '北京', description: '清代宫廷工匠群体，建造了十七孔桥、五亭桥等皇家园林桥梁。技艺精湛，代表了清代桥梁艺术的最高水平。' },
    { id: 'jiangnan', name: '江南工匠', category: 'craftsman', symbolSize: 35, year: '唐宋', location: '江南', description: '江南地区传统桥梁工匠群体，擅长建造石拱桥和园林桥梁。宝带桥、断桥等均出自其手。' },
    
    { id: 'lit1', name: '《水经注》', category: 'literature', symbolSize: 32, year: '北魏', description: '郦道元所著地理名著，详细记载了赵州桥的建造工艺和结构特点，是研究古桥的重要文献。' },
    { id: 'lit2', name: '《枫桥夜泊》', category: 'literature', symbolSize: 35, year: '约756年', description: '张继所作千古名篇："月落乌啼霜满天，江枫渔火对愁眠。姑苏城外寒山寺，夜半钟声到客船。"使枫桥名扬天下。' },
    { id: 'lit3', name: '《洛阳桥记》', category: 'literature', symbolSize: 30, year: '宋代', description: '蔡襄自撰碑文，详细记载了洛阳桥的建造过程和技术创新，是研究古代桥梁工程的重要文献。' },
    { id: 'lit4', name: '《扬州慢》', category: 'literature', symbolSize: 30, year: '1176年', description: '姜夔所作："二十四桥仍在，波心荡，冷月无声。"描绘了扬州古桥的意境，成为千古绝唱。' },
    { id: 'lit5', name: '《赵州桥》民歌', category: 'literature', symbolSize: 28, year: '民间', description: '"赵州桥来什么人修？玉石栏杆什么人留？"这首民歌流传千年，歌颂了李春的工匠精神。' },
    { id: 'lit6', name: '《白蛇传》', category: 'literature', symbolSize: 32, year: '明代', description: '中国四大民间传说之一，断桥相会的情节使杭州断桥成为浪漫爱情的象征。' },
    { id: 'lit7', name: '《马可·波罗游记》', category: 'literature', symbolSize: 30, year: '元代', description: '马可·波罗在游记中盛赞卢沟桥"世界上独一无二"，向西方介绍了中国古桥的辉煌。' },
    { id: 'lit8', name: '《送人游吴》', category: 'literature', symbolSize: 26, year: '唐代', description: '杜荀鹤所作："君到姑苏见，人家尽枕河。古宫闲地少，水港小桥多。"描绘了江南水乡的桥梁文化。' },
    { id: 'lit9', name: '《断桥残雪》', category: 'literature', symbolSize: 28, year: '宋代', description: '西湖十景之一，历代文人墨客留下无数诗篇，使断桥成为中国最具诗意的古桥。' },
    { id: 'lit10', name: '《安平桥记》', category: 'literature', symbolSize: 26, year: '宋代', description: '记载了安平桥的建造历史，"天下无桥长此桥"的美誉由此而来。' },
    { id: 'lit11', name: '《广济桥记》', category: 'literature', symbolSize: 26, year: '宋代', description: '记载了广济桥独特的启闭式设计，体现了古代工匠的创新精神。' },
    { id: 'lit12', name: '《风雨桥传说》', category: 'literature', symbolSize: 25, year: '民间', description: '侗族民间传说，讲述了风雨桥的起源和建造故事，是侗族文化的重要组成部分。' },
    { id: 'lit13', name: '《宝带桥志》', category: 'literature', symbolSize: 25, year: '唐代', description: '记载了宝带桥的建造缘由和工艺特点，是研究唐代桥梁的重要资料。' },
    { id: 'lit14', name: '《五亭桥记》', category: 'literature', symbolSize: 25, year: '清代', description: '记载了五亭桥的设计理念和建造过程，展现了清代皇家园林桥梁的艺术特色。' },
    { id: 'lit15', name: '《十七孔桥碑记》', category: 'literature', symbolSize: 25, year: '清代', description: '记载了十七孔桥的建造历史，是颐和园的重要文献资料。' },
    
    { id: 'event1', name: '卢沟桥事变', category: 'event', symbolSize: 40, year: '1937年', description: '1937年7月7日，日军在此发动全面侵华战争，中国抗日战争全面爆发。卢沟桥成为中华民族抗战的历史见证。' },
    { id: 'event2', name: '赵州桥建造', category: 'event', symbolSize: 38, year: '605年', description: '隋朝工匠李春设计建造赵州桥，开创敞肩拱桥先河，是中国桥梁史上的里程碑事件。' },
    { id: 'event3', name: '洛阳桥建造', category: 'event', symbolSize: 38, year: '1053年', description: '蔡襄主持建造洛阳桥，历时6年完成。首创筏型基础技术，解决了跨海建桥的世界性难题。' },
    { id: 'event4', name: '丝绸之路贸易', category: 'event', symbolSize: 35, year: '汉代', description: '古桥作为丝绸之路的重要节点，促进了东西方文化交流和贸易往来。' },
    { id: 'event5', name: '大运河开通', category: 'event', symbolSize: 35, year: '605年', description: '隋炀帝开凿大运河，沿岸桥梁成为重要交通枢纽，推动了桥梁技术的发展。' },
    { id: 'event6', name: '枫桥夜泊创作', category: 'event', symbolSize: 32, year: '约756年', description: '张继途经枫桥，创作《枫桥夜泊》，使枫桥成为中国文化史上的标志性地点。' },
    { id: 'event7', name: '广济桥建造', category: 'event', symbolSize: 32, year: '1171年', description: '广济桥建成，首创启闭式桥梁设计，成为世界桥梁史上的创举。' },
    { id: 'event8', name: '安平桥建造', category: 'event', symbolSize: 32, year: '1138年', description: '安平桥建成，成为中国最长的石梁桥，"天下无桥长此桥"的美誉流传至今。' },
    { id: 'event9', name: '白蛇传流传', category: 'event', symbolSize: 30, year: '明代', description: '《白蛇传》故事广泛流传，断桥相会成为经典情节，使断桥成为浪漫爱情的象征。' },
    { id: 'event10', name: '颐和园修建', category: 'event', symbolSize: 30, year: '1750年', description: '清乾隆年间修建颐和园，十七孔桥等皇家园林桥梁相继建成，代表了中国园林桥梁艺术的巅峰。' },
    
    { id: 'north', name: '北方桥梁', category: 'region', symbolSize: 40, year: '历代', location: '黄河流域', description: '北方桥梁以石拱桥为主，气势恢宏，如赵州桥、卢沟桥等，体现了北方建筑的雄浑风格。' },
    { id: 'jiangnanR', name: '江南桥梁', category: 'region', symbolSize: 40, year: '历代', location: '长江三角洲', description: '江南桥梁以石拱桥和园林桥梁为主，精巧雅致，如宝带桥、断桥等，展现了江南水乡的婉约之美。' },
    { id: 'fujian', name: '福建桥梁', category: 'region', symbolSize: 38, year: '宋元', location: '福建沿海', description: '福建桥梁以石梁桥著称，如洛阳桥、安平桥等，首创多项桥梁技术，是中国桥梁史上的重要流派。' },
    { id: 'lingnan', name: '岭南桥梁', category: 'region', symbolSize: 36, year: '明清', location: '广东广西', description: '岭南桥梁风格独特，如广济桥、风雨桥等，融合了中原技术与地方特色，形成了独特的桥梁文化。' },
    { id: 'southwest', name: '西南桥梁', category: 'region', symbolSize: 35, year: '历代', location: '云贵川', description: '西南桥梁以索桥和廊桥为主，如安澜桥等，适应了山区地形，体现了因地制宜的智慧。' },
    { id: 'royal', name: '皇家园林桥梁', category: 'region', symbolSize: 38, year: '明清', location: '北京', description: '皇家园林桥梁集中国桥梁艺术之大成，如十七孔桥、五亭桥等，代表了中国园林桥梁的最高水平。' }
  ],
  links: [
    { source: 'zhaozhou', target: 'lichun', relation: '建造者' },
    { source: 'zhaozhou', target: 'lit1', relation: '文献记载' },
    { source: 'zhaozhou', target: 'lit5', relation: '民间传说' },
    { source: 'zhaozhou', target: 'event2', relation: '建造事件' },
    { source: 'zhaozhou', target: 'north', relation: '地域流派' },
    { source: 'lugou', target: 'event1', relation: '历史事件' },
    { source: 'lugou', target: 'yangyu', relation: '修缮者' },
    { source: 'lugou', target: 'lit7', relation: '文献记载' },
    { source: 'lugou', target: 'north', relation: '地域流派' },
    { source: 'luoyang', target: 'caixiang', relation: '建造者' },
    { source: 'luoyang', target: 'lit3', relation: '文献记载' },
    { source: 'luoyang', target: 'event3', relation: '建造事件' },
    { source: 'luoyang', target: 'fujian', relation: '地域流派' },
    { source: 'fengqiao', target: 'zhangji', relation: '文化关联' },
    { source: 'fengqiao', target: 'lit2', relation: '诗词记载' },
    { source: 'fengqiao', target: 'event6', relation: '创作事件' },
    { source: 'fengqiao', target: 'jiangnanR', relation: '地域流派' },
    { source: 'guangji', target: 'event7', relation: '建造事件' },
    { source: 'guangji', target: 'lit11', relation: '文献记载' },
    { source: 'guangji', target: 'lingnan', relation: '地域流派' },
    { source: 'anping', target: 'liujie', relation: '建造者' },
    { source: 'anping', target: 'lit10', relation: '文献记载' },
    { source: 'anping', target: 'event8', relation: '建造事件' },
    { source: 'anping', target: 'fujian', relation: '地域流派' },
    { source: 'duanqiao', target: 'lit6', relation: '传说记载' },
    { source: 'duanqiao', target: 'lit9', relation: '诗词记载' },
    { source: 'duanqiao', target: 'event9', relation: '传说流传' },
    { source: 'duanqiao', target: 'jiangnanR', relation: '地域流派' },
    { source: 'shiqiao', target: 'qinggong', relation: '建造者' },
    { source: 'shiqiao', target: 'lit15', relation: '文献记载' },
    { source: 'shiqiao', target: 'event10', relation: '建造事件' },
    { source: 'shiqiao', target: 'royal', relation: '地域流派' },
    { source: 'fengyu', target: 'dongzu', relation: '建造者' },
    { source: 'fengyu', target: 'lit12', relation: '传说记载' },
    { source: 'fengyu', target: 'lingnan', relation: '地域流派' },
    { source: 'baodai', target: 'jiangnan', relation: '建造者' },
    { source: 'baodai', target: 'lit13', relation: '文献记载' },
    { source: 'baodai', target: 'jiangnanR', relation: '地域流派' },
    { source: 'wuding', target: 'qinggong', relation: '建造者' },
    { source: 'wuding', target: 'lit14', relation: '文献记载' },
    { source: 'wuding', target: 'jiangnanR', relation: '地域流派' },
    { source: 'dujiangyan', target: 'southwest', relation: '地域流派' },
    { source: 'lichun', target: 'north', relation: '活动地域' },
    { source: 'caixiang', target: 'fujian', relation: '活动地域' },
    { source: 'zhangji', target: 'lit2', relation: '作者' },
    { source: 'event4', target: 'north', relation: '涉及地域' },
    { source: 'event5', target: 'jiangnanR', relation: '涉及地域' },
    { source: 'lit4', target: 'jiangnanR', relation: '描写地域' },
    { source: 'lit8', target: 'jiangnanR', relation: '描写地域' }
  ]
})

const currentEvents = computed(() => {
  const events = graphData.value.nodes
    .filter(n => n.category === 'event')
    .map(n => ({
      id: n.id,
      year: n.year?.replace('年', '').replace('约', '') || '不详',
      title: n.name
    }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year))
  
  if (activeEra.value === -1) return events.slice(0, 8)
  
  const era = eraData.value[activeEra.value]
  return events.filter(e => {
    const year = parseInt(e.year)
    return year >= era.start && year <= era.end
  })
})

const relatedNodes = computed(() => {
  if (!selectedNode.value) return []
  
  const relatedIds = graphData.value.links
    .filter(l => l.source === selectedNode.value.id || l.target === selectedNode.value.id)
    .map(l => {
      const targetId = l.source === selectedNode.value.id ? l.target : l.source
      const node = graphData.value.nodes.find(n => n.id === targetId)
      return node ? { ...node, relation: l.relation } : null
    })
    .filter(Boolean)
  
  return relatedIds.slice(0, 6)
})

const allNodes = computed(() => graphData.value.nodes)

const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    searchResults.value = []
    return
  }
  const keyword = searchKeyword.value.toLowerCase()
  searchResults.value = graphData.value.nodes
    .filter(n => n.name.toLowerCase().includes(keyword))
    .slice(0, 10)
}

const clearSearch = () => {
  searchKeyword.value = ''
  searchResults.value = []
}

const focusNode = (node) => {
  selectedNode.value = node
  highlightNode(node.id)
  searchKeyword.value = ''
  searchResults.value = []
}

const focusNodeById = (nodeId) => {
  const node = graphData.value.nodes.find(n => n.id === nodeId || n.name === nodeId)
  if (node) {
    focusNode(node)
  }
}

const findPath = () => {
  if (!pathStart.value || !pathEnd.value) return
  
  const adjacencyList = {}
  graphData.value.nodes.forEach(n => {
    adjacencyList[n.id] = []
  })
  graphData.value.links.forEach(l => {
    adjacencyList[l.source].push(l.target)
    adjacencyList[l.target].push(l.source)
  })
  
  const visited = new Set()
  const queue = [[pathStart.value, [pathStart.value]]]
  visited.add(pathStart.value)
  
  while (queue.length > 0) {
    const [current, path] = queue.shift()
    
    if (current === pathEnd.value) {
      const resultNodes = path.map(id => {
        const node = graphData.value.nodes.find(n => n.id === id)
        return node ? node.name : id
      })
      pathResult.value = resultNodes
      highlightPath(path)
      return
    }
    
    for (const neighbor of adjacencyList[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push([neighbor, [...path, neighbor]])
      }
    }
  }
  
  pathResult.value = ['未找到路径']
}

const highlightPath = (nodeIds) => {
  if (!graph.value) return
  
  const allNodes = graphData.value.nodes.map((n, i) => ({
    ...n,
    category: Object.keys(nodeFilters.value).indexOf(n.category),
    itemStyle: {
      color: nodeFilters.value[n.category]?.color || '#999',
      borderWidth: nodeIds.includes(n.id) ? 4 : 2,
      borderColor: nodeIds.includes(n.id) ? '#FFD700' : 'rgba(255, 255, 255, 0.8)',
      opacity: nodeIds.includes(n.id) ? 1 : 0.3
    },
    label: {
      show: true,
      position: 'bottom',
      formatter: n.name,
      fontFamily: 'Noto Serif SC, serif',
      fontSize: nodeIds.includes(n.id) ? 16 : 12,
      fontWeight: nodeIds.includes(n.id) ? 'bold' : 'normal',
      color: nodeIds.includes(n.id) ? '#FFD700' : '#C9A961'
    }
  }))
  
  const allLinks = graphData.value.links.map(l => ({
    source: l.source,
    target: l.target,
    value: l.relation,
    lineStyle: {
      width: nodeIds.includes(l.source) && nodeIds.includes(l.target) ? 3 : 1,
      curveness: 0.2,
      opacity: nodeIds.includes(l.source) && nodeIds.includes(l.target) ? 1 : 0.2,
      color: nodeIds.includes(l.source) && nodeIds.includes(l.target) ? '#FFD700' : '#666'
    }
  }))
  
  graph.value.setOption({
    series: [{
      data: allNodes,
      links: allLinks
    }]
  })
}

const clearPath = () => {
  pathStart.value = ''
  pathEnd.value = ''
  pathResult.value = []
  updateGraph()
}

const toggleFilter = (key) => {
  const index = activeFilters.value.indexOf(key)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(key)
  }
  updateGraph()
}

const selectEra = (index) => {
  activeEra.value = activeEra.value === index ? -1 : index
  updateGraph()
}

const selectNode = (node) => {
  selectedNode.value = node
  highlightNode(node.id)
}

const focusEvent = (event) => {
  const node = graphData.value.nodes.find(n => n.id === event.id)
  if (node) {
    selectNode(node)
  }
}

const toggleLayout = () => {
  isForceLayout.value = !isForceLayout.value
  initGraph()
}

const resetGraph = () => {
  selectedNode.value = null
  activeFilters.value = ['bridge', 'craftsman', 'literature', 'event', 'region']
  activeEra.value = -1
  pathStart.value = ''
  pathEnd.value = ''
  pathResult.value = []
  searchKeyword.value = ''
  searchResults.value = []
  initGraph()
}

const highlightNode = (nodeId) => {
  if (!graph.value) return
  graph.value.dispatchAction({
    type: 'focusNodeAdjacency',
    seriesIndex: 0,
    dataIndex: graphData.value.nodes.findIndex(n => n.id === nodeId)
  })
}

const getFilteredData = () => {
  const filteredNodes = graphData.value.nodes.filter(n => activeFilters.value.includes(n.category))
  const nodeIds = filteredNodes.map(n => n.id)
  const filteredLinks = graphData.value.links.filter(l => 
    nodeIds.includes(l.source) && nodeIds.includes(l.target)
  )
  return { nodes: filteredNodes, links: filteredLinks }
}

const initGraph = () => {
  if (graph.value) {
    graph.value.dispose()
  }
  
  if (!graphContainer.value) return
  
  graphContainer.value.style.width = '100%'
  graphContainer.value.style.height = '100%'
  
  graph.value = echarts.init(graphContainer.value)
  
  const { nodes, links } = getFilteredData()
  
  const categories = Object.keys(nodeFilters.value).map(key => ({
    name: nodeFilters.value[key].name,
    itemStyle: { color: nodeFilters.value[key].color }
  }))
  
  const processedNodes = nodes.map(node => {
    const baseColor = nodeFilters.value[node.category]?.color || '#999'
    const isBridge = node.category === 'bridge'
    return {
      ...node,
      category: Object.keys(nodeFilters.value).indexOf(node.category),
      symbolSize: isBridge ? 55 : (node.category === 'craftsman' ? 40 : 35),
      itemStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [
            { offset: 0, color: baseColor },
            { offset: 0.7, color: baseColor },
            { offset: 1, color: baseColor + '80' }
          ]
        },
        borderWidth: isBridge ? 3 : 2,
        borderColor: isBridge ? '#FFD700' : 'rgba(255, 255, 255, 0.6)',
        shadowColor: baseColor,
        shadowBlur: isBridge ? 20 : 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0
      },
      label: {
        show: true,
        position: 'bottom',
        formatter: node.name,
        fontFamily: 'STKaiti, KaiTi, "Noto Serif SC", serif',
        fontSize: isBridge ? 15 : 13,
        fontWeight: isBridge ? 'bold' : 'normal',
        color: isBridge ? '#FFD700' : '#E8E4D8',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowBlur: 4,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1
      }
    }
  })
  
  const processedLinks = links.map(link => {
    const sourceNode = nodes.find(n => n.id === link.source)
    const targetNode = nodes.find(n => n.id === link.target)
    const sourceColor = nodeFilters.value[sourceNode?.category]?.color || '#999'
    const targetColor = nodeFilters.value[targetNode?.category]?.color || '#999'
    
    return {
      source: link.source,
      target: link.target,
      value: link.relation,
      lineStyle: {
        width: 1.8,
        curveness: 0.3,
        opacity: 0.5,
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: sourceColor + 'AA' },
            { offset: 0.5, color: '#C9A96180' },
            { offset: 1, color: targetColor + 'AA' }
          ]
        }
      },
      label: {
        show: false,
        formatter: link.relation,
        fontSize: 10
      }
    }
  })
  
  const option = {
    tooltip: {
      trigger: 'item',
      confine: true,
      appendToBody: true,
      formatter: (params) => {
        if (params.dataType === 'node') {
          const node = params.data
          const desc = node.description ? (node.description.length > 150 ? node.description.substring(0, 150) + '...' : node.description) : ''
          const name = node.name.length > 25 ? node.name.substring(0, 25) + '...' : node.name
          return `<div style="width: 360px; max-width: 360px; overflow: hidden; box-sizing: border-box;">
            <div style="font-size: 18px; color: #FFD700; font-weight: bold; margin-bottom: 10px; overflow: hidden; text-overflow: ellipsis; word-break: break-all;">${name}</div>
            <div style="color: #C9A961; font-size: 14px; margin-bottom: 10px;">${nodeFilters.value[Object.keys(nodeFilters.value)[node.category]]?.name || ''}</div>
            ${node.year ? `<div style="color: #B8A88A; font-size: 14px; margin-bottom: 5px;">年代：${node.year}</div>` : ''}
            ${node.location ? `<div style="color: #B8A88A; font-size: 14px; margin-bottom: 5px; overflow: hidden; text-overflow: ellipsis;">位置：${node.location}</div>` : ''}
            ${desc ? `<div style="color: #E8D5A3; font-size: 14px; line-height: 1.7; margin-top: 10px; word-break: break-all; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;">${desc}</div>` : ''}
          </div>`
        } else if (params.dataType === 'edge') {
          return `<span style="color: #C9A961;">${params.data.value}</span>`
        }
        return ''
      },
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      borderColor: 'rgba(201, 169, 97, 0.4)',
      borderWidth: 1,
      padding: [14, 16],
      extraCssText: 'max-width: 400px !important; min-width: 360px !important; word-wrap: break-word !important; word-break: break-all !important; white-space: normal !important; box-sizing: border-box !important;',
      textStyle: {
        color: '#E8D5A3',
        fontFamily: 'Noto Serif SC, serif',
        fontSize: 14
      }
    },
    series: [{
      type: 'graph',
      layout: isForceLayout.value ? 'force' : 'circular',
      data: processedNodes,
      links: processedLinks,
      categories: categories,
      roam: true,
      draggable: true,
      zoom: 0.6,
      focusNodeAdjacency: true,
      force: isForceLayout.value ? {
        repulsion: 200,
        edgeLength: [100, 200],
        gravity: 0.1,
        friction: 0.6
      } : undefined,
      circular: !isForceLayout.value ? {
        rotateLabel: true
      } : undefined,
      emphasis: {
        focus: 'adjacency',
        lineStyle: {
          width: 3,
          opacity: 0.8
        }
      },
      lineStyle: {
        curveness: 0.2
      },
      labelLayout: {
        hideOverlap: true
      },
      scaleLimit: {
        min: 0.3,
        max: 3
      }
    }],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut'
  }
  
  graph.value.setOption(option)
  
  graph.value.on('click', (params) => {
    if (params.dataType === 'node') {
      const node = graphData.value.nodes.find(n => n.id === params.data.id)
      if (node) {
        selectedNode.value = node
      }
    }
  })
}

const updateGraph = () => {
  if (!graph.value) return
  
  const { nodes, links } = getFilteredData()
  
  const processedNodes = nodes.map(node => {
    const baseColor = nodeFilters.value[node.category]?.color || '#999'
    const isBridge = node.category === 'bridge'
    return {
      ...node,
      category: Object.keys(nodeFilters.value).indexOf(node.category),
      symbolSize: isBridge ? 55 : (node.category === 'craftsman' ? 40 : 35),
      itemStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [
            { offset: 0, color: baseColor },
            { offset: 0.7, color: baseColor },
            { offset: 1, color: baseColor + '80' }
          ]
        },
        borderWidth: isBridge ? 3 : 2,
        borderColor: isBridge ? '#FFD700' : 'rgba(255, 255, 255, 0.6)',
        shadowColor: baseColor,
        shadowBlur: isBridge ? 20 : 10
      },
      label: {
        show: true,
        position: 'bottom',
        formatter: node.name,
        fontFamily: 'STKaiti, KaiTi, "Noto Serif SC", serif',
        fontSize: isBridge ? 15 : 13,
        fontWeight: isBridge ? 'bold' : 'normal',
        color: isBridge ? '#FFD700' : '#E8E4D8',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowBlur: 4,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1
      }
    }
  })
  
  const processedLinks = links.map(link => {
    const sourceNode = nodes.find(n => n.id === link.source)
    const targetNode = nodes.find(n => n.id === link.target)
    const sourceColor = nodeFilters.value[sourceNode?.category]?.color || '#999'
    const targetColor = nodeFilters.value[targetNode?.category]?.color || '#999'
    
    return {
      source: link.source,
      target: link.target,
      value: link.relation,
      lineStyle: {
        width: 1.8,
        curveness: 0.3,
        opacity: 0.5,
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: sourceColor + 'AA' },
            { offset: 0.5, color: '#C9A96180' },
            { offset: 1, color: targetColor + 'AA' }
          ]
        }
      }
    }
  })
  
  graph.value.setOption({
    series: [{
      data: processedNodes,
      links: processedLinks
    }]
  })
}

const initStatsChart = () => {
  if (!statsChart.value) return
  
  statsChartInstance.value = echarts.init(statsChart.value)
  
  const categoryStats = Object.keys(nodeFilters.value).map(key => ({
    name: nodeFilters.value[key].name,
    value: graphData.value.nodes.filter(n => n.category === key).length
  }))
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: 'rgba(20, 20, 20, 0.9)',
      borderColor: 'rgba(201, 169, 97, 0.3)',
      textStyle: { color: '#E8D5A3' }
    },
    series: [{
      type: 'pie',
      radius: ['45%', '75%'],
      center: ['50%', '50%'],
      data: categoryStats,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#1a1a1a',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter: '{b}\n{c}',
        fontSize: 11,
        fontFamily: 'Noto Serif SC, serif',
        color: '#B8A88A'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 13,
          fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(201, 169, 97, 0.3)'
        }
      }
    }],
    color: Object.values(nodeFilters.value).map(f => f.color)
  }
  
  statsChartInstance.value.setOption(option)
}

const initParticles = () => {
  if (!particleBg.value) return
  
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;'
  particleBg.value.appendChild(canvas)
  
  const ctx = canvas.getContext('2d')
  let particles = []
  
  const resize = () => {
    canvas.width = particleBg.value.offsetWidth
    canvas.height = particleBg.value.offsetHeight
  }
  
  resize()
  window.addEventListener('resize', resize)
  
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    })
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(201, 169, 97, ${p.alpha})`
      ctx.fill()
    })
    
    requestAnimationFrame(animate)
  }
  
  animate()
}

const handleResize = () => {
  graph.value?.resize()
  statsChartInstance.value?.resize()
}

onMounted(() => {
  initParticles()
  initGraph()
  initStatsChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  graph.value?.dispose()
  statsChartInstance.value?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss">
div[id^="ec_tooltip"] {
  max-width: 400px !important;
  min-width: 360px !important;
  box-sizing: border-box !important;
  
  * {
    word-wrap: break-word !important;
    word-break: break-all !important;
    white-space: normal !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
}

.culture-graph-tooltip,
.echarts-tooltip {
  max-width: 400px !important;
  min-width: 360px !important;
  box-sizing: border-box !important;
  
  .tooltip-content {
    width: 100% !important;
    box-sizing: border-box !important;
    
    * {
      word-wrap: break-word !important;
      word-break: break-all !important;
      white-space: normal !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.culture-graph-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Noto Serif SC', serif;
}

.particle-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.main-content {
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  gap: 20px;
  height: calc(100vh - 40px);
  padding: 20px;
  position: relative;
  z-index: 1;
}

.panel-card {
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
  border-radius: 10px;
  border: 1px solid rgba(212, 175, 55, 0.25);
  padding: 12px;
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
    border-radius: 10px 10px 0 0;
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
    border-radius: 10px;
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
    
    .card-title {
      font-size: 15px;
      font-weight: 600;
      font-family: 'Noto Serif SC', serif;
      color: #C9A961;
      letter-spacing: 2px;
      
      &.centered {
        text-align: center;
        flex: 1;
      }
    }
    
    .tip-container {
      position: absolute;
      right: 0;
    }
  }
}

.search-panel {
  .search-box {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    
    .search-input {
      flex: 1;
      padding: 10px 14px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 6px;
      color: #E8E4D8;
      font-size: 13px;
      font-family: 'Noto Serif SC', serif;
      outline: none;
      transition: all 0.3s ease;
      
      &::placeholder {
        color: rgba(232, 228, 216, 0.4);
      }
      
      &:focus {
        border-color: #C9A961;
        background: rgba(212, 175, 55, 0.08);
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.15);
      }
    }
    
    .search-btn {
      padding: 10px 16px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 6px;
      color: #C9A961;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.15));
        border-color: #C9A961;
      }
    }
  }
  
  .search-results {
    max-height: 200px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(212, 175, 55, 0.3);
      border-radius: 2px;
    }
    
    .search-result-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      margin-bottom: 6px;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      
      &:hover {
        background: rgba(212, 175, 55, 0.1);
        border-color: rgba(212, 175, 55, 0.3);
        transform: translateX(4px);
      }
      
      .result-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      
      .result-name {
        flex: 1;
        font-size: 13px;
        color: #E8E4D8;
        text-align: center;
      }
    }
  }
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(212, 175, 55, 0.3);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.filter-panel {
  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .filter-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background: var(--filter-color, transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.03));
      transform: translateX(4px);
      border-color: rgba(212, 175, 55, 0.15);
      
      &::before {
        opacity: 1;
      }
    }
    
    &.active {
      border-color: rgba(212, 175, 55, 0.4);
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(212, 175, 55, 0.05));
      
      &::before {
        opacity: 1;
      }
      
      .filter-icon {
        transform: scale(1.15);
        box-shadow: 0 0 15px var(--filter-color, transparent);
      }
    }
    
    .filter-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      position: relative;
      
      .icon-inner {
        width: 12px;
        height: 12px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 50%;
          background: inherit;
          opacity: 0.3;
          filter: blur(2px);
        }
      }
    }
    
    .filter-name {
      flex: 1;
      font-size: 13px;
      color: #E8E4D8;
      font-weight: 500;
    }
    
    .filter-count {
      font-size: 11px;
      color: rgba(232, 228, 216, 0.7);
      background: rgba(212, 175, 55, 0.15);
      padding: 3px 10px;
      border-radius: 12px;
      border: 1px solid rgba(212, 175, 55, 0.2);
    }
  }
}

.timeline-panel {
  flex: 1;
  
  .timeline-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .timeline-track {
    height: 48px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
    border-radius: 8px;
    position: relative;
    margin-bottom: 16px;
    overflow: hidden;
    border: 1px solid rgba(212, 175, 55, 0.1);
  }
  
  .timeline-era {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 6px;
    
    &:nth-child(1) { 
      background: linear-gradient(135deg, rgba(216, 124, 124, 0.35), rgba(216, 124, 124, 0.2)); 
    }
    &:nth-child(2) { 
      background: linear-gradient(135deg, rgba(145, 158, 139, 0.35), rgba(145, 158, 139, 0.2)); 
    }
    &:nth-child(3) { 
      background: linear-gradient(135deg, rgba(215, 171, 130, 0.35), rgba(215, 171, 130, 0.2)); 
    }
    
    &:hover, &.active {
      filter: brightness(1.4);
      transform: scaleY(1.15);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
    }
    
    .era-name {
      font-size: 12px;
      color: #fff;
      font-weight: 600;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      letter-spacing: 1px;
    }
  }
  
  .timeline-events {
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(212, 175, 55, 0.3);
      border-radius: 2px;
    }
  }
  
  .event-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
    border-radius: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 0;
      background: linear-gradient(180deg, #FFD700, #C9A961);
      border-radius: 2px;
      transition: height 0.3s ease;
    }
    
    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
      border-color: rgba(212, 175, 55, 0.2);
      transform: translateX(4px);
      
      &::before {
        height: 60%;
      }
    }
    
    .event-year {
      font-size: 11px;
      color: #FFD700;
      font-weight: 600;
      min-width: 55px;
      padding: 3px 8px;
      background: rgba(255, 215, 0, 0.1);
      border-radius: 4px;
    }
    
    .event-title {
      font-size: 12px;
      color: #E8E4D8;
    }
  }
}

.center-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.graph-wrapper {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 10px;
  padding: 12px;
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
    border-radius: 10px 10px 0 0;
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
    border-radius: 10px;
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
  
  .graph-helptip {
    position: absolute;
    top: 16px;
    left: 20px;
    z-index: 10;
  }
  
  .graph-title {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 600;
    color: #C9A961;
    letter-spacing: 3px;
    z-index: 10;
    font-family: 'Noto Serif SC', serif;
  }
  
  .graph-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background: radial-gradient(ellipse, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: glow-pulse 4s ease-in-out infinite;
  }
  
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
  }
  
  #culture-graph {
    width: 100%;
    height: 100%;
  }
  
  .graph-controls {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    gap: 10px;
    
    .control-btn {
      padding: 8px 16px;
      background: linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(15, 15, 15, 0.8));
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 6px;
      color: #C9A961;
      font-size: 12px;
      font-family: 'Noto Serif SC', serif;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(255, 215, 0, 0.2), transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.15));
        border-color: rgba(212, 175, 55, 0.6);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        
        &::before {
          opacity: 1;
        }
      }
      
      &.active {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(212, 175, 55, 0.2));
        border-color: #C9A961;
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        color: #FFD700;
      }
    }
  }
}

.legend-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 14px 20px;
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.7), rgba(15, 15, 15, 0.5));
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 20px;
    transition: all 0.3s ease;
    cursor: default;
    
    &:hover {
      background: rgba(212, 175, 55, 0.1);
      transform: translateY(-2px);
    }
    
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 50%;
        background: inherit;
        opacity: 0.4;
        filter: blur(2px);
      }
    }
    
    .legend-text {
      font-size: 12px;
      color: #E8E4D8;
      font-weight: 500;
    }
  }
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(212, 175, 55, 0.3);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.path-panel {
  .path-content {
    .path-select {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      
      .path-node-select {
        flex: 1;
        
        .select-label {
          display: block;
          font-size: 11px;
          color: rgba(232, 228, 216, 0.6);
          margin-bottom: 6px;
        }
        
        .path-select-box {
          width: 100%;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 6px;
          color: #E8E4D8;
          font-size: 12px;
          font-family: 'Noto Serif SC', serif;
          outline: none;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:focus {
            border-color: #C9A961;
            background: rgba(212, 175, 55, 0.08);
          }
          
          option {
            background: #1a1a1a;
            color: #E8E4D8;
          }
        }
      }
      
      .path-arrow {
        color: #C9A961;
        font-size: 16px;
        margin-top: 18px;
      }
    }
    
    .path-btn {
      width: 100%;
      padding: 10px 16px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 6px;
      color: #C9A961;
      font-size: 13px;
      font-family: 'Noto Serif SC', serif;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 8px;
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.15));
        border-color: #C9A961;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &.clear-btn {
        width: calc(100% - 8px);
        margin-left: 4px;
        background: linear-gradient(135deg, rgba(184, 66, 58, 0.2), rgba(184, 66, 58, 0.1));
        border-color: rgba(184, 66, 58, 0.4);
        color: #E8A8A8;
        
        &:hover {
          background: linear-gradient(135deg, rgba(184, 66, 58, 0.3), rgba(184, 66, 58, 0.15));
          border-color: #B8423A;
          box-shadow: 0 4px 15px rgba(184, 66, 58, 0.3);
        }
      }
    }
    
    .path-result {
      margin-top: 16px;
      padding: 12px;
      background: rgba(255, 215, 0, 0.05);
      border: 1px solid rgba(255, 215, 0, 0.2);
      border-radius: 6px;
      
      .path-result-title {
        font-size: 12px;
        color: #FFD700;
        margin-bottom: 10px;
        font-weight: 500;
      }
      
      .path-nodes {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        
        .path-node {
          font-size: 12px;
          color: #E8E4D8;
          padding: 4px 10px;
          background: rgba(212, 175, 55, 0.15);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover {
            background: rgba(212, 175, 55, 0.25);
            color: #FFD700;
          }
          
          .path-arrow-inline {
            color: #C9A961;
            margin-left: 6px;
          }
        }
      }
    }
  }
}

.detail-panel {
  .detail-content {
    .detail-info {
      .info-item {
        margin-bottom: 14px;
        padding: 10px 12px;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 6px;
        border-left: 3px solid rgba(212, 175, 55, 0.3);
        
        .info-label {
          font-size: 11px;
          color: rgba(232, 228, 216, 0.6);
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
        }
        
        .info-value {
          font-size: 13px;
          color: #E8E4D8;
          font-weight: 500;
        }
        
        .info-desc {
          font-size: 12px;
          color: #E8E4D8;
          line-height: 1.8;
          margin: 0;
        }
      }
    }
    
    .related-nodes {
      margin-top: 16px;
      padding-top: 14px;
      border-top: 1px solid rgba(212, 175, 55, 0.15);
      
      h4 {
        font-size: 15px;
        font-weight: 600;
        font-family: 'Noto Serif SC', serif;
        color: #C9A961;
        letter-spacing: 2px;
        margin: 0 0 12px 0;
        text-align: center;
        
        &.centered {
          text-align: center;
        }
      }
      
      .related-list {
        max-height: 150px;
        overflow-y: auto;
        
        &::-webkit-scrollbar {
          width: 3px;
        }
        
        &::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 2px;
        }
      }
      
      .related-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 8px 12px;
        margin: 0 -8px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 6px;
        border: 1px solid transparent;
        
        &:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.15);
          transform: translateX(4px);
        }
        
        .related-name {
          flex: 1;
          font-size: 13px;
          font-family: 'Noto Serif SC', serif;
          color: #E8E4D8;
          text-align: center;
        }
      }
    }
  }
}

.stats-panel {
  .stats-chart-section {
    .chart-title {
      font-size: 12px;
      color: rgba(232, 228, 216, 0.7);
      margin-bottom: 12px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      
      &::before,
      &::after {
        content: '';
        width: 20px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3));
      }
      
      &::after {
        background: linear-gradient(90deg, rgba(212, 175, 55, 0.3), transparent);
      }
    }
  }
  
  .stats-chart {
    height: 150px;
  }
}

.knowledge-panel {
  .knowledge-content {
    .knowledge-item {
      display: flex;
      gap: 14px;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.1);
      transition: all 0.3s ease;
      
      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      
      &:hover {
        .knowledge-num {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
        }
      }
      
      .knowledge-num {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.25), rgba(212, 175, 55, 0.15));
        border: 1px solid rgba(255, 215, 0, 0.4);
        border-radius: 50%;
        font-size: 12px;
        font-weight: 700;
        color: #FFD700;
        flex-shrink: 0;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
      }
      
      p {
        font-size: 12px;
        color: #E8E4D8;
        line-height: 1.8;
        margin: 0;
      }
    }
  }
}

@media (max-width: 1400px) {
  .main-content {
    grid-template-columns: 260px 1fr 280px;
  }
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .left-panel, .right-panel {
    flex-direction: row;
    flex-wrap: wrap;
    
    .panel-card {
      flex: 1;
      min-width: 280px;
    }
  }
}
</style>
