﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="scroll-notice">
    <h2 class="panel-title">古桥资讯</h2>
    <div class="notice-content" ref="noticeContent">
      <div class="notice-list" ref="noticeListRef">
        <div 
          v-for="(notice, index) in displayNotices" 
          :key="index" 
          class="notice-item"
          @click="handleNoticeClick(notice)"
        >
          <span class="notice-dot"></span>
          <span class="notice-text">{{ notice.text }}</span>
          <span class="notice-date">{{ notice.date }}</span>
          <span class="notice-link-icon">🔗</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  notices: {
    type: Array,
    default: () => []
  },
  speed: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['notice-click'])

const noticeContent = ref(null)
const noticeListRef = ref(null)
let animationTimer = null
let currentIndex = 0
let isTransitioning = false

const defaultNotices = [
  { 
    text: '中国木拱桥传统营造技艺入选人类非物质文化遗产代表作名录', 
    date: '2024-12-05', 
    type: 'heritage',
    url: 'http://www.xinhuanet.com/local/20251206/1930a13b11bc41a381a0546527432ac2/c.html'
  },
  { 
    text: '四川推进廊桥分级保护系统治理，87座古桥得到有效保护', 
    date: '2025-12-31', 
    type: 'protection',
    url: 'http://www.sc.xinhuanet.com/20251231/32ff87f8ce1d43b3a00607da2b364617/c.html'
  },
  { 
    text: '浙江持续推动木拱廊桥非遗保护传承工作', 
    date: '2025-12-06', 
    type: 'heritage',
    url: 'http://www.xinhuanet.com/local/20251206/1930a13b11bc41a381a0546527432ac2/c.html'
  },
  { 
    text: '杭州兴福桥修缮竣工，明代古桥焕发新生', 
    date: '2025-12-03', 
    type: 'protection',
    url: 'https://county.hangzhou.com.cn/content/2025-12/03/content_9136760.html'
  },
  { 
    text: '苏州堰月桥修缮工程完工，古桥"重生"恢复通车', 
    date: '2025-09-17', 
    type: 'protection',
    url: 'https://view.inews.qq.com/a/20250924A06DAL00'
  },
  { 
    text: '四川廊桥保护三年行动圆满完成，古桥重焕生机', 
    date: '2025-03-23', 
    type: 'protection',
    url: 'https://wwj.sc.gov.cn/scwwj/mtgz/2026/3/23/93983ff63576423eaef5a211079bfc7a.shtml'
  }
]

const noticeList = computed(() => {
  return props.notices.length > 0 ? props.notices : defaultNotices
})

const displayNotices = computed(() => {
  const list = noticeList.value
  return [...list, list[0]]
})

const handleNoticeClick = (notice) => {
  emit('notice-click', notice)
  if (notice.url) {
    window.open(notice.url, '_blank')
  }
}

const ITEM_HEIGHT = 40

const scrollToIndex = (index, withTransition = true) => {
  if (!noticeListRef.value) return
  
  noticeListRef.value.style.transition = withTransition ? 'transform 0.5s ease' : 'none'
  noticeListRef.value.style.transform = `translateY(-${index * ITEM_HEIGHT}px)`
}

const startAnimation = () => {
  if (animationTimer) clearInterval(animationTimer)
  
  animationTimer = setInterval(() => {
    if (isTransitioning) return
    
    currentIndex++
    isTransitioning = true
    
    scrollToIndex(currentIndex, true)
    
    if (currentIndex >= noticeList.value.length) {
      setTimeout(() => {
        currentIndex = 0
        scrollToIndex(0, false)
        isTransitioning = false
      }, 500)
    } else {
      setTimeout(() => {
        isTransitioning = false
      }, 500)
    }
  }, props.speed)
}

onMounted(() => {
  nextTick(() => {
    scrollToIndex(0, false)
    startAnimation()
  })
})

onUnmounted(() => {
  if (animationTimer) {
    clearInterval(animationTimer)
  }
})
</script>

<style lang="scss" scoped>
.scroll-notice {
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
  }
  
  .notice-content {
    height: 120px;
    overflow: hidden;
    position: relative;
    
    .notice-list {
      transition: transform 0.5s ease;
      will-change: transform;
      
      .notice-item {
        height: 40px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 6px;
        box-sizing: border-box;
        
        &:hover {
          background: rgba(212, 175, 55, 0.1);
          
          .notice-text {
            color: #FFD700;
          }
        }
        
        .notice-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #C9A961 0%, #B8423A 100%);
          flex-shrink: 0;
        }
        
        .notice-text {
          flex: 1;
          font-size: 13px;
          color: #E8E4D8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.3s ease;
          line-height: 40px;
        }
        
        .notice-date {
          font-size: 11px;
          color: rgba(212, 175, 55, 0.7);
          flex-shrink: 0;
          line-height: 40px;
        }
        
        .notice-link-icon {
          font-size: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
          margin-left: 5px;
          line-height: 40px;
        }
      }
      
      &:hover .notice-link-icon {
        opacity: 1;
      }
    }
  }
}
</style>
