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
          <div class="graph-header">
            <HelpTip class="graph-helptip" title="图谱说明" content="展示古桥、工匠、文献、事件、地域之间的关系网络。节点大小表示重要程度，连线表示关联关系。点击节点查看详情，拖拽可移动节点。" />
            <h2 class="graph-title">古桥文化图谱</h2>
            <div class="graph-controls">
              <button class="control-btn" @click="resetGraph" title="重置视图">重置</button>
              <button class="control-btn" @click="toggleLayout" :class="{ active: isForceLayout }" title="切换布局">布局</button>
            </div>
          </div>
          <div class="graph-glow"></div>
          <div id="culture-graph" ref="graphContainer"></div>
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
                <div class="search-select-wrapper">
                  <input 
                    type="text" 
                    v-model="pathStartSearch" 
                    placeholder="搜索起点..."
                    class="path-search-input"
                    @focus="showPathStartDropdown = true"
                    @blur="hidePathStartDropdown"
                    @input="filterPathStartNodes"
                  />
                  <div class="search-select-dropdown" v-if="showPathStartDropdown && filteredPathStartNodes.length > 0">
                    <div 
                      v-for="node in filteredPathStartNodes" 
                      :key="node.id" 
                      class="dropdown-item"
                      @mousedown.prevent="selectPathStart(node)"
                    >
                      <span class="node-dot" :style="{ background: nodeFilters[node.category]?.color }"></span>
                      <span class="node-name">{{ node.name }}</span>
                      <span class="node-category">{{ nodeFilters[node.category]?.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="path-arrow">→</div>
              <div class="path-node-select">
                <span class="select-label">终点</span>
                <div class="search-select-wrapper">
                  <input 
                    type="text" 
                    v-model="pathEndSearch" 
                    placeholder="搜索终点..."
                    class="path-search-input"
                    @focus="showPathEndDropdown = true"
                    @blur="hidePathEndDropdown"
                    @input="filterPathEndNodes"
                  />
                  <div class="search-select-dropdown" v-if="showPathEndDropdown && filteredPathEndNodes.length > 0">
                    <div 
                      v-for="node in filteredPathEndNodes" 
                      :key="node.id" 
                      class="dropdown-item"
                      @mousedown.prevent="selectPathEnd(node)"
                    >
                      <span class="node-dot" :style="{ background: nodeFilters[node.category]?.color }"></span>
                      <span class="node-name">{{ node.name }}</span>
                      <span class="node-category">{{ nodeFilters[node.category]?.name }}</span>
                    </div>
                  </div>
                </div>
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
          <div class="panel-footer"></div>
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
import HelpTip from '@/components/business/HelpTip.vue'

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
const pathStartSearch = ref('')
const pathEndSearch = ref('')
const showPathStartDropdown = ref(false)
const showPathEndDropdown = ref(false)
const filteredPathStartNodes = ref([])
const filteredPathEndNodes = ref([])

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

const filterPathStartNodes = () => {
  const keyword = pathStartSearch.value.toLowerCase()
  if (!keyword) {
    filteredPathStartNodes.value = allNodes.value.slice(0, 10)
  } else {
    filteredPathStartNodes.value = allNodes.value
      .filter(n => n.name.toLowerCase().includes(keyword))
      .slice(0, 10)
  }
}

const filterPathEndNodes = () => {
  const keyword = pathEndSearch.value.toLowerCase()
  if (!keyword) {
    filteredPathEndNodes.value = allNodes.value.slice(0, 10)
  } else {
    filteredPathEndNodes.value = allNodes.value
      .filter(n => n.name.toLowerCase().includes(keyword))
      .slice(0, 10)
  }
}

const selectPathStart = (node) => {
  pathStart.value = node.id
  pathStartSearch.value = node.name
  showPathStartDropdown.value = false
}

const selectPathEnd = (node) => {
  pathEnd.value = node.id
  pathEndSearch.value = node.name
  showPathEndDropdown.value = false
}

const hidePathStartDropdown = () => {
  setTimeout(() => {
    showPathStartDropdown.value = false
  }, 200)
}

const hidePathEndDropdown = () => {
  setTimeout(() => {
    showPathEndDropdown.value = false
  }, 200)
}

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
  pathStartSearch.value = ''
  pathEndSearch.value = ''
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
  
  const categoryStyles = {
    bridge: { 
      symbol: 'circle',
      borderColor: '#FFD700',
      shadowColor: 'rgba(255, 215, 0, 0.6)',
      glowColor: 'rgba(255, 215, 0, 0.3)'
    },
    craftsman: { 
      symbol: 'diamond',
      borderColor: '#FF8C69',
      shadowColor: 'rgba(184, 66, 58, 0.5)',
      glowColor: 'rgba(184, 66, 58, 0.3)'
    },
    literature: { 
      symbol: 'roundRect',
      borderColor: '#7FB5AC',
      shadowColor: 'rgba(91, 140, 133, 0.5)',
      glowColor: 'rgba(91, 140, 133, 0.3)'
    },
    event: { 
      symbol: 'triangle',
      borderColor: '#D4A574',
      shadowColor: 'rgba(139, 115, 85, 0.5)',
      glowColor: 'rgba(139, 115, 85, 0.3)'
    },
    region: { 
      symbol: 'pin',
      borderColor: '#9ACD32',
      shadowColor: 'rgba(107, 142, 35, 0.5)',
      glowColor: 'rgba(107, 142, 35, 0.3)'
    }
  }
  
  const processedNodes = nodes.map(node => {
    const baseColor = nodeFilters.value[node.category]?.color || '#999'
    const style = categoryStyles[node.category] || categoryStyles.bridge
    const isBridge = node.category === 'bridge'
    const size = isBridge ? 60 : (node.category === 'craftsman' ? 45 : 38)
    
    return {
      ...node,
      category: Object.keys(nodeFilters.value).indexOf(node.category),
      symbol: style.symbol,
      symbolSize: size,
      itemStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.6,
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.3, color: baseColor },
            { offset: 0.7, color: baseColor },
            { offset: 1, color: baseColor + '40' }
          ]
        },
        borderWidth: isBridge ? 4 : 3,
        borderColor: style.borderColor,
        shadowColor: style.shadowColor,
        shadowBlur: isBridge ? 25 : 15,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 1
      },
      label: {
        show: true,
        position: 'bottom',
        distance: 8,
        formatter: node.name,
        fontFamily: 'STKaiti, KaiTi, "Noto Serif SC", serif',
        fontSize: isBridge ? 16 : 13,
        fontWeight: isBridge ? 'bold' : 'normal',
        color: isBridge ? '#FFD700' : '#E8E4D8',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowBlur: 6,
        textShadowOffsetX: 1,
        textShadowOffsetY: 2,
        backgroundColor: isBridge ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
        padding: [3, 8],
        borderRadius: 4
      }
    }
  })
  
  const processedLinks = links.map((link, index) => {
    const sourceNode = nodes.find(n => n.id === link.source)
    const targetNode = nodes.find(n => n.id === link.target)
    const sourceColor = nodeFilters.value[sourceNode?.category]?.color || '#999'
    const targetColor = nodeFilters.value[targetNode?.category]?.color || '#999'
    
    const relationColors = {
      '建造': '#FFD700',
      '记载': '#7FB5AC',
      '位于': '#9ACD32',
      '相关': '#C9A961',
      '参与': '#D4A574',
      '传承': '#FF8C69'
    }
    const relationColor = relationColors[link.relation] || '#C9A961'
    
    return {
      source: link.source,
      target: link.target,
      value: link.relation,
      lineStyle: {
        width: 2.5,
        curveness: 0.4,
        opacity: 0.6,
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: sourceColor + 'CC' },
            { offset: 0.3, color: relationColor + 'AA' },
            { offset: 0.7, color: relationColor + 'AA' },
            { offset: 1, color: targetColor + 'CC' }
          ]
        },
        shadowColor: relationColor + '40',
        shadowBlur: 8
      },
      label: {
        show: false,
        formatter: link.relation,
        fontSize: 11,
        color: relationColor,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: [2, 6],
        borderRadius: 3
      },
      emphasis: {
        lineStyle: {
          width: 4,
          opacity: 1,
          shadowBlur: 15
        },
        label: {
          show: true
        }
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
          const categoryName = nodeFilters.value[Object.keys(nodeFilters.value)[node.category]]?.name || ''
          const categoryColors = {
            '古桥': '#FFD700',
            '建造工匠': '#FF8C69',
            '文献记载': '#7FB5AC',
            '历史事件': '#D4A574',
            '地域流派': '#9ACD32'
          }
          const accentColor = categoryColors[categoryName] || '#C9A961'
          return `<div style="width: 360px; max-width: 360px; overflow: hidden; box-sizing: border-box;">
            <div style="font-size: 18px; color: ${accentColor}; font-weight: bold; margin-bottom: 10px; overflow: hidden; text-overflow: ellipsis; word-break: break-all; text-shadow: 0 0 10px ${accentColor}40;">${name}</div>
            <div style="color: ${accentColor}99; font-size: 14px; margin-bottom: 10px; padding: 4px 10px; background: ${accentColor}20; border-radius: 4px; display: inline-block;">${categoryName}</div>
            ${node.year ? `<div style="color: #B8A88A; font-size: 14px; margin-bottom: 5px;"><span style="color: #888;">年代：</span>${node.year}</div>` : ''}
            ${node.location ? `<div style="color: #B8A88A; font-size: 14px; margin-bottom: 5px; overflow: hidden; text-overflow: ellipsis;"><span style="color: #888;">位置：</span>${node.location}</div>` : ''}
            ${desc ? `<div style="color: #E8D5A3; font-size: 14px; line-height: 1.7; margin-top: 10px; word-break: break-all; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; padding-top: 10px; border-top: 1px solid rgba(201, 169, 97, 0.2);">${desc}</div>` : ''}
          </div>`
        } else if (params.dataType === 'edge') {
          const relationColors = {
            '建造': '#FFD700',
            '记载': '#7FB5AC',
            '位于': '#9ACD32',
            '相关': '#C9A961',
            '参与': '#D4A574',
            '传承': '#FF8C69'
          }
          const color = relationColors[params.data.value] || '#C9A961'
          return `<div style="padding: 8px 12px;">
            <span style="color: ${color}; font-weight: 600; font-size: 14px;">${params.data.value}</span>
            <span style="color: #888; font-size: 12px; margin-left: 8px;">关系</span>
          </div>`
        }
        return ''
      },
      backgroundColor: 'rgba(15, 15, 15, 0.98)',
      borderColor: 'rgba(201, 169, 97, 0.5)',
      borderWidth: 1,
      padding: [16, 18],
      extraCssText: 'max-width: 400px !important; min-width: 360px !important; word-wrap: break-word !important; word-break: break-all !important; white-space: normal !important; box-sizing: border-box !important; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(201, 169, 97, 0.15);',
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
        repulsion: 280,
        edgeLength: [120, 220],
        gravity: 0.12,
        friction: 0.65,
        layoutAnimation: true
      } : undefined,
      circular: !isForceLayout.value ? {
        rotateLabel: true
      } : undefined,
      emphasis: {
        focus: 'adjacency',
        blurScope: 'coordinateSystem',
        itemStyle: {
          shadowBlur: 30,
          borderWidth: 5
        },
        lineStyle: {
          width: 4,
          opacity: 1,
          shadowBlur: 20
        },
        label: {
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      blur: {
        itemStyle: {
          opacity: 0.3
        },
        lineStyle: {
          opacity: 0.1
        }
      },
      lineStyle: {
        curveness: 0.4
      },
      labelLayout: {
        hideOverlap: true,
        moveOverlap: 'shiftY'
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
  
  const categoryStyles = {
    bridge: { 
      symbol: 'circle',
      borderColor: '#FFD700',
      shadowColor: 'rgba(255, 215, 0, 0.6)'
    },
    craftsman: { 
      symbol: 'diamond',
      borderColor: '#FF8C69',
      shadowColor: 'rgba(184, 66, 58, 0.5)'
    },
    literature: { 
      symbol: 'roundRect',
      borderColor: '#7FB5AC',
      shadowColor: 'rgba(91, 140, 133, 0.5)'
    },
    event: { 
      symbol: 'triangle',
      borderColor: '#D4A574',
      shadowColor: 'rgba(139, 115, 85, 0.5)'
    },
    region: { 
      symbol: 'pin',
      borderColor: '#9ACD32',
      shadowColor: 'rgba(107, 142, 35, 0.5)'
    }
  }
  
  const processedNodes = nodes.map(node => {
    const baseColor = nodeFilters.value[node.category]?.color || '#999'
    const style = categoryStyles[node.category] || categoryStyles.bridge
    const isBridge = node.category === 'bridge'
    const size = isBridge ? 60 : (node.category === 'craftsman' ? 45 : 38)
    
    return {
      ...node,
      category: Object.keys(nodeFilters.value).indexOf(node.category),
      symbol: style.symbol,
      symbolSize: size,
      itemStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.6,
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.3, color: baseColor },
            { offset: 0.7, color: baseColor },
            { offset: 1, color: baseColor + '40' }
          ]
        },
        borderWidth: isBridge ? 4 : 3,
        borderColor: style.borderColor,
        shadowColor: style.shadowColor,
        shadowBlur: isBridge ? 25 : 15,
        opacity: 1
      },
      label: {
        show: true,
        position: 'bottom',
        distance: 8,
        formatter: node.name,
        fontFamily: 'STKaiti, KaiTi, "Noto Serif SC", serif',
        fontSize: isBridge ? 16 : 13,
        fontWeight: isBridge ? 'bold' : 'normal',
        color: isBridge ? '#FFD700' : '#E8E4D8',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowBlur: 6,
        textShadowOffsetX: 1,
        textShadowOffsetY: 2,
        backgroundColor: isBridge ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
        padding: [3, 8],
        borderRadius: 4
      }
    }
  })
  
  const processedLinks = links.map(link => {
    const sourceNode = nodes.find(n => n.id === link.source)
    const targetNode = nodes.find(n => n.id === link.target)
    const sourceColor = nodeFilters.value[sourceNode?.category]?.color || '#999'
    const targetColor = nodeFilters.value[targetNode?.category]?.color || '#999'
    
    const relationColors = {
      '建造': '#FFD700',
      '记载': '#7FB5AC',
      '位于': '#9ACD32',
      '相关': '#C9A961',
      '参与': '#D4A574',
      '传承': '#FF8C69'
    }
    const relationColor = relationColors[link.relation] || '#C9A961'
    
    return {
      source: link.source,
      target: link.target,
      value: link.relation,
      lineStyle: {
        width: 2.5,
        curveness: 0.4,
        opacity: 0.6,
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: sourceColor + 'CC' },
            { offset: 0.3, color: relationColor + 'AA' },
            { offset: 0.7, color: relationColor + 'AA' },
            { offset: 1, color: targetColor + 'CC' }
          ]
        },
        shadowColor: relationColor + '40',
        shadowBlur: 8
      },
      label: {
        show: false,
        formatter: link.relation,
        fontSize: 11,
        color: relationColor,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: [2, 6],
        borderRadius: 3
      },
      emphasis: {
        lineStyle: {
          width: 4,
          opacity: 1,
          shadowBlur: 15
        },
        label: {
          show: true
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
  height: calc(100vh - 60px);
  padding: 20px 20px 40px 20px;
  position: relative;
  z-index: 1;
}

.panel-card {
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
  border-radius: 10px;
  border: 1px solid rgba(212, 175, 55, 0.25);
  padding: 12px 12px 16px 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: visible;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.6), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.1);
    border-color: rgba(212, 175, 55, 0.5);
    
    &::before {
      opacity: 1;
    }
  }
  
  .panel-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    pointer-events: none;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      border-bottom: 2px solid rgba(201, 169, 97, 0.7);
      border-left: 2px solid rgba(201, 169, 97, 0.7);
      border-radius: 0 0 0 3px;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-bottom: 2px solid rgba(201, 169, 97, 0.7);
      border-right: 2px solid rgba(201, 169, 97, 0.7);
      border-radius: 0 0 3px 0;
    }
  }
  
  .card-header {
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
    }
    
    .card-title {
      font-size: 15px;
      font-weight: 600;
      font-family: 'Noto Serif SC', serif;
      color: #C9A961;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(201, 169, 97, 0.3);
      
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
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 8px;
      color: #E8E4D8;
      font-size: 13px;
      font-family: 'Noto Serif SC', serif;
      outline: none;
      transition: all 0.3s ease;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
      
      &::placeholder {
        color: rgba(232, 228, 216, 0.4);
      }
      
      &:focus {
        border-color: #C9A961;
        background: rgba(212, 175, 55, 0.1);
        box-shadow: 
          inset 0 2px 4px rgba(0, 0, 0, 0.1),
          0 0 20px rgba(212, 175, 55, 0.2);
      }
    }
    
    .search-btn {
      padding: 12px 18px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.12));
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 8px;
      color: #C9A961;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      
      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(212, 175, 55, 0.18));
        border-color: #C9A961;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
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
      gap: 12px;
      padding: 12px 14px;
      margin-bottom: 8px;
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
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--result-color, #C9A961);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(212, 175, 55, 0.05));
        border-color: rgba(212, 175, 55, 0.3);
        transform: translateX(6px);
        
        &::before {
          opacity: 1;
        }
        
        .result-dot {
          transform: scale(1.3);
          box-shadow: 0 0 10px var(--result-color, #C9A961);
        }
      }
      
      .result-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
        transition: all 0.3s ease;
        box-shadow: 0 0 6px var(--result-color, #C9A961);
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
  position: relative;
  
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
  
  .panel-card {
    position: relative;
    
    &:nth-child(1) { z-index: 3; }
    &:nth-child(2) { z-index: 2; }
    &:nth-child(3) { z-index: 1; }
    
    &:hover {
      z-index: 10;
    }
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
    gap: 14px;
    padding: 14px 16px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
    border-radius: 10px;
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
      width: 4px;
      height: 100%;
      background: var(--filter-color, transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, var(--filter-color, transparent));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.04));
      transform: translateX(6px);
      border-color: rgba(212, 175, 55, 0.2);
      
      &::before {
        opacity: 1;
      }
      
      &::after {
        opacity: 0.05;
      }
      
      .filter-icon {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 0 20px var(--filter-color, transparent);
      }
    }
    
    &.active {
      border-color: rgba(212, 175, 55, 0.5);
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.06));
      
      &::before {
        opacity: 1;
      }
      
      &::after {
        opacity: 0.08;
      }
      
      .filter-icon {
        transform: scale(1.15);
        box-shadow: 0 0 20px var(--filter-color, transparent);
      }
      
      .filter-name {
        color: #FFD700;
      }
    }
    
    .filter-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
      
      .icon-inner {
        width: 14px;
        height: 14px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background: inherit;
          opacity: 0.4;
          filter: blur(3px);
        }
      }
    }
    
    .filter-name {
      flex: 1;
      font-size: 14px;
      color: #E8E4D8;
      font-weight: 500;
      transition: color 0.3s ease;
      position: relative;
      z-index: 1;
    }
    
    .filter-count {
      font-size: 12px;
      color: rgba(232, 228, 216, 0.8);
      background: rgba(212, 175, 55, 0.2);
      padding: 4px 12px;
      border-radius: 14px;
      border: 1px solid rgba(212, 175, 55, 0.3);
      position: relative;
      z-index: 1;
      font-weight: 500;
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
    height: 52px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.03));
    border-radius: 10px;
    position: relative;
    margin-bottom: 16px;
    overflow: hidden;
    border: 1px solid rgba(212, 175, 55, 0.15);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
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
    border-radius: 8px;
    
    &:nth-child(1) { 
      background: linear-gradient(135deg, rgba(216, 124, 124, 0.4), rgba(216, 124, 124, 0.25)); 
    }
    &:nth-child(2) { 
      background: linear-gradient(135deg, rgba(145, 158, 139, 0.4), rgba(145, 158, 139, 0.25)); 
    }
    &:nth-child(3) { 
      background: linear-gradient(135deg, rgba(215, 171, 130, 0.4), rgba(215, 171, 130, 0.25)); 
    }
    
    &:hover, &.active {
      filter: brightness(1.5);
      transform: scaleY(1.2);
      box-shadow: 
        0 0 25px rgba(212, 175, 55, 0.4),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
    }
    
    .era-name {
      font-size: 13px;
      color: #fff;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
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
    gap: 14px;
    padding: 14px 16px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
    border-radius: 10px;
    margin-bottom: 10px;
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
      width: 4px;
      height: 0;
      background: linear-gradient(180deg, #FFD700, #C9A961);
      border-radius: 2px;
      transition: height 0.3s ease;
      box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
    }
    
    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(212, 175, 55, 0.05));
      border-color: rgba(212, 175, 55, 0.25);
      transform: translateX(6px);
      
      &::before {
        height: 70%;
      }
      
      .event-year {
        background: rgba(255, 215, 0, 0.2);
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
      }
    }
    
    .event-year {
      font-size: 12px;
      color: #FFD700;
      font-weight: 600;
      min-width: 60px;
      padding: 4px 10px;
      background: rgba(255, 215, 0, 0.12);
      border-radius: 6px;
      border: 1px solid rgba(255, 215, 0, 0.2);
      transition: all 0.3s ease;
    }
    
    .event-title {
      font-size: 13px;
      color: #E8E4D8;
      font-weight: 500;
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
  padding: 12px 12px 16px 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: visible;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.6), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.1);
    border-color: rgba(212, 175, 55, 0.5);
    
    &::before {
      opacity: 1;
    }
  }
  
  .panel-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    pointer-events: none;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      border-bottom: 2px solid rgba(201, 169, 97, 0.7);
      border-left: 2px solid rgba(201, 169, 97, 0.7);
      border-radius: 0 0 0 3px;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-bottom: 2px solid rgba(201, 169, 97, 0.7);
      border-right: 2px solid rgba(201, 169, 97, 0.7);
      border-radius: 0 0 3px 0;
    }
  }
  
  .graph-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0 12px 0;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.15);
    position: relative;
    z-index: 10;
    
    .graph-helptip {
      flex-shrink: 0;
    }
    
    .graph-title {
      font-size: 17px;
      font-weight: 600;
      color: #C9A961;
      letter-spacing: 3px;
      font-family: 'Noto Serif SC', serif;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .graph-controls {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
      
      .control-btn {
        padding: 6px 14px;
        background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(15, 15, 15, 0.9));
        border: 1px solid rgba(212, 175, 55, 0.35);
        border-radius: 6px;
        color: #C9A961;
        font-size: 12px;
        font-family: 'Noto Serif SC', serif;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(4px);
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(255, 215, 0, 0.25), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.18));
          border-color: rgba(255, 215, 0, 0.7);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.35);
          color: #FFD700;
          
          &::before {
            opacity: 1;
          }
        }
        
        &.active {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.35), rgba(212, 175, 55, 0.2));
          border-color: #FFD700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
          color: #FFD700;
        }
      }
    }
  }
  
  .graph-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: 
      radial-gradient(ellipse at 30% 30%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 70%, rgba(91, 140, 133, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at center, rgba(212, 175, 55, 0.05) 0%, transparent 60%);
    pointer-events: none;
    animation: glow-pulse 6s ease-in-out infinite;
  }
  
  @keyframes glow-pulse {
    0%, 100% { 
      opacity: 0.5; 
      transform: translate(-50%, -50%) scale(1); 
    }
    50% { 
      opacity: 0.8; 
      transform: translate(-50%, -50%) scale(1.02); 
    }
  }
  
  #culture-graph {
    width: 100%;
    height: calc(100% - 60px);
  }
}

.legend-bar {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 12px 24px;
  background: 
    linear-gradient(135deg, rgba(20, 20, 20, 0.85), rgba(15, 15, 15, 0.7));
  border-radius: 10px;
  border: 1px solid rgba(212, 175, 55, 0.25);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border-radius: 24px;
    transition: all 0.3s ease;
    cursor: default;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 24px;
      background: radial-gradient(circle at center, var(--legend-color, transparent), transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-2px) scale(1.02);
      background: rgba(212, 175, 55, 0.08);
      
      &::before {
        opacity: 0.15;
      }
      
      .legend-dot {
        transform: scale(1.2);
        box-shadow: 0 0 12px var(--legend-color, #C9A961);
      }
    }
    
    .legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      position: relative;
      transition: all 0.3s ease;
      box-shadow: 0 0 6px var(--legend-color, #C9A961);
      
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
        filter: blur(3px);
      }
    }
    
    .legend-text {
      font-size: 13px;
      color: #E8E4D8;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
  }
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  position: relative;
  
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
  
  .panel-card {
    position: relative;
    
    &:nth-child(1) { z-index: 4; }
    &:nth-child(2) { z-index: 3; }
    &:nth-child(3) { z-index: 2; }
    &:nth-child(4) { z-index: 1; }
    
    &:hover {
      z-index: 10;
    }
  }
}

.path-panel {
  .path-content {
    .path-select {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      
      .path-node-select {
        flex: 1;
        
        .select-label {
          display: block;
          font-size: 12px;
          color: rgba(232, 228, 216, 0.7);
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .search-select-wrapper {
          position: relative;
          
          .path-search-input {
            width: 100%;
            padding: 10px 14px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(212, 175, 55, 0.35);
            border-radius: 8px;
            color: #E8E4D8;
            font-size: 13px;
            font-family: 'Noto Serif SC', serif;
            outline: none;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
            
            &::placeholder {
              color: rgba(232, 228, 216, 0.4);
            }
            
            &:focus {
              border-color: #C9A961;
              background: rgba(212, 175, 55, 0.1);
              box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
            }
          }
          
          .search-select-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            max-height: 200px;
            overflow-y: auto;
            background: rgba(26, 26, 26, 0.98);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 8px;
            margin-top: 4px;
            z-index: 100;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
            
            &::-webkit-scrollbar {
              width: 4px;
            }
            
            &::-webkit-scrollbar-thumb {
              background: rgba(212, 175, 55, 0.3);
              border-radius: 2px;
            }
            
            .dropdown-item {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 10px 14px;
              cursor: pointer;
              transition: all 0.2s ease;
              border-bottom: 1px solid rgba(212, 175, 55, 0.1);
              
              &:last-child {
                border-bottom: none;
              }
              
              &:hover {
                background: rgba(212, 175, 55, 0.15);
              }
              
              .node-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                flex-shrink: 0;
              }
              
              .node-name {
                flex: 1;
                font-size: 13px;
                color: #E8E4D8;
              }
              
              .node-category {
                font-size: 11px;
                color: rgba(232, 228, 216, 0.5);
                padding: 2px 8px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
              }
            }
          }
        }
      }
      
      .path-arrow {
        color: #C9A961;
        font-size: 18px;
        margin-top: 22px;
        text-shadow: 0 0 8px rgba(201, 169, 97, 0.5);
      }
    }
    
    .path-btn {
      width: 100%;
      padding: 12px 18px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.12));
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 8px;
      color: #C9A961;
      font-size: 14px;
      font-family: 'Noto Serif SC', serif;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 10px;
      font-weight: 500;
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(212, 175, 55, 0.18));
        border-color: #C9A961;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        color: #FFD700;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &.clear-btn {
        width: calc(100% - 8px);
        margin-left: 4px;
        background: linear-gradient(135deg, rgba(184, 66, 58, 0.25), rgba(184, 66, 58, 0.12));
        border-color: rgba(184, 66, 58, 0.45);
        color: #E8A8A8;
        
        &:hover {
          background: linear-gradient(135deg, rgba(184, 66, 58, 0.35), rgba(184, 66, 58, 0.18));
          border-color: #B8423A;
          box-shadow: 
            0 6px 20px rgba(184, 66, 58, 0.35),
            0 0 15px rgba(184, 66, 58, 0.2);
        }
      }
    }
    
    .path-result {
      margin-top: 18px;
      padding: 14px 16px;
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 215, 0, 0.03));
      border: 1px solid rgba(255, 215, 0, 0.25);
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.1);
      
      .path-result-title {
        font-size: 13px;
        color: #FFD700;
        margin-bottom: 12px;
        font-weight: 600;
        letter-spacing: 1px;
      }
      
      .path-nodes {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        
        .path-node {
          font-size: 13px;
          color: #E8E4D8;
          padding: 6px 12px;
          background: rgba(212, 175, 55, 0.18);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(212, 175, 55, 0.2);
          
          &:hover {
            background: rgba(212, 175, 55, 0.3);
            color: #FFD700;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
          }
          
          .path-arrow-inline {
            color: #C9A961;
            margin-left: 8px;
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
        margin-bottom: 16px;
        padding: 14px 16px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
        border-radius: 10px;
        border-left: 4px solid rgba(212, 175, 55, 0.4);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        
        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover {
          border-left-color: #C9A961;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.03));
          
          &::after {
            opacity: 1;
          }
        }
        
        .info-label {
          font-size: 12px;
          color: rgba(232, 228, 216, 0.7);
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          letter-spacing: 1px;
        }
        
        .info-value {
          font-size: 14px;
          color: #E8E4D8;
          font-weight: 500;
        }
        
        .info-desc {
          font-size: 13px;
          color: #E8E4D8;
          line-height: 1.9;
          margin: 0;
        }
      }
    }
    
    .related-nodes {
      margin-top: 18px;
      padding-top: 16px;
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      
      h4 {
        font-size: 15px;
        font-weight: 600;
        font-family: 'Noto Serif SC', serif;
        color: #C9A961;
        letter-spacing: 2px;
        margin: 0 0 14px 0;
        text-align: center;
        
        &.centered {
          text-align: center;
        }
      }
      
      .related-list {
        max-height: 150px;
        overflow-y: auto;
        
        &::-webkit-scrollbar {
          width: 4px;
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
        padding: 10px 14px;
        margin: 0 -8px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 8px;
        border: 1px solid transparent;
        
        &:hover {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(212, 175, 55, 0.05));
          border-color: rgba(212, 175, 55, 0.2);
          transform: translateX(6px);
          
          .related-name {
            color: #FFD700;
          }
        }
        
        .related-name {
          flex: 1;
          font-size: 13px;
          font-family: 'Noto Serif SC', serif;
          color: #E8E4D8;
          text-align: center;
          transition: color 0.3s ease;
        }
      }
    }
  }
}

.stats-panel {
  .stats-chart-section {
    .chart-title {
      font-size: 13px;
      color: rgba(232, 228, 216, 0.8);
      margin-bottom: 14px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 500;
      
      &::before,
      &::after {
        content: '';
        width: 25px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4));
      }
      
      &::after {
        background: linear-gradient(90deg, rgba(212, 175, 55, 0.4), transparent);
      }
    }
  }
  
  .stats-chart {
    height: 160px;
  }
}

.knowledge-panel {
  .knowledge-content {
    .knowledge-item {
      display: flex;
      gap: 16px;
      margin-bottom: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.12);
      transition: all 0.3s ease;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 1px;
        background: linear-gradient(90deg, #C9A961, transparent);
        transition: width 0.3s ease;
      }
      
      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      
      &:hover {
        .knowledge-num {
          transform: scale(1.15) rotate(5deg);
          box-shadow: 
            0 0 25px rgba(255, 215, 0, 0.5),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
        }
        
        &::before {
          width: 100%;
        }
      }
      
      .knowledge-num {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(212, 175, 55, 0.18));
        border: 1px solid rgba(255, 215, 0, 0.5);
        border-radius: 50%;
        font-size: 13px;
        font-weight: 700;
        color: #FFD700;
        flex-shrink: 0;
        transition: all 0.3s ease;
        box-shadow: 0 0 18px rgba(255, 215, 0, 0.25);
        text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
      }
      
      p {
        font-size: 13px;
        color: #E8E4D8;
        line-height: 1.9;
        margin: 0;
        flex: 1;
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

@media (max-width: 768px) {
  .graph-container {
    padding: 12px;
  }
  
  .page-header {
    padding: 12px 16px;
    margin-bottom: 12px;
    
    .header-left h1 {
      font-size: 20px;
    }
    
    .header-right {
      gap: 8px;
      
      .control-btn {
        padding: 8px 12px;
        font-size: 12px;
      }
    }
  }
  
  .main-content {
    gap: 12px;
  }
  
  .left-panel, .right-panel {
    flex-direction: column;
    
    .panel-card {
      min-width: 100%;
      padding: 12px;
      
      .panel-title {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }
  
  .graph-wrapper {
    min-height: 350px;
    
    .graph-canvas {
      height: 350px;
    }
  }
  
  .legend-container {
    padding: 10px;
    
    .legend-item {
      padding: 6px 10px;
      font-size: 11px;
    }
  }
  
  .tooltip-content {
    max-width: 250px;
    padding: 12px;
    
    .tooltip-title {
      font-size: 14px;
    }
    
    .tooltip-desc {
      font-size: 12px;
    }
  }
  
  .search-box {
    padding: 10px;
    
    input {
      padding: 8px 12px;
      font-size: 13px;
    }
  }
  
  .filter-section {
    padding: 10px;
    
    .filter-title {
      font-size: 12px;
    }
    
    .filter-options {
      gap: 6px;
      
      .filter-option {
        padding: 6px 10px;
        font-size: 11px;
      }
    }
  }
  
  .stats-card {
    .stat-item {
      padding: 10px;
      
      .stat-value {
        font-size: 20px;
      }
      
      .stat-label {
        font-size: 11px;
      }
    }
  }
  
  .bridge-list {
    max-height: 200px;
    
    .bridge-item {
      padding: 10px;
      
      .bridge-name {
        font-size: 13px;
      }
      
      .bridge-info {
        font-size: 11px;
      }
    }
  }
}

@media (max-width: 480px) {
  .graph-container {
    padding: 8px;
  }
  
  .page-header {
    padding: 10px 12px;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    
    .header-left h1 {
      font-size: 18px;
    }
    
    .header-right {
      width: 100%;
      justify-content: flex-start;
      flex-wrap: wrap;
      
      .control-btn {
        padding: 6px 10px;
        font-size: 11px;
      }
    }
  }
  
  .graph-wrapper {
    min-height: 280px;
    
    .graph-canvas {
      height: 280px;
    }
  }
  
  .panel-card {
    padding: 10px;
    
    .panel-title {
      font-size: 13px;
    }
  }
  
  .legend-container {
    .legend-item {
      padding: 4px 8px;
      font-size: 10px;
    }
  }
  
  .tooltip-content {
    max-width: 200px;
    padding: 10px;
    
    .tooltip-title {
      font-size: 12px;
    }
    
    .tooltip-desc {
      font-size: 11px;
    }
  }
  
  .search-box input {
    padding: 6px 10px;
    font-size: 12px;
  }
  
  .filter-section {
    .filter-options .filter-option {
      padding: 4px 8px;
      font-size: 10px;
    }
  }
  
  .stats-card .stat-item {
    padding: 8px;
    
    .stat-value {
      font-size: 18px;
    }
  }
  
  .bridge-list {
    max-height: 150px;
    
    .bridge-item {
      padding: 8px;
      
      .bridge-name {
        font-size: 12px;
      }
      
      .bridge-info {
        font-size: 10px;
      }
    }
  }
}
</style>
