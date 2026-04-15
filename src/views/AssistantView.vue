﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="assistant-wrapper">
    <div class="assistant-container">
      <div class="chat-header">
        <div class="header-left">
          <div class="assistant-avatar">
            <img :src="assistantAvatar" alt="桥灵" />
          </div>
          <div class="assistant-info">
            <h2>桥灵</h2>
            <p>中国古桥知识助手</p>
          </div>
        </div>
        <div class="header-right">
        <button class="clear-btn" @click="clearMessages" title="清除对话">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
        <button class="settings-btn" @click="toggleSettings" title="个性化设置">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </button>
        <button class="export-btn" @click="exportChat" title="导出对话">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
        <button class="favorites-btn" @click="toggleFavorites" title="我的收藏">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
        <button class="recommend-btn" @click="toggleRecommend" title="古桥推荐">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </button>
        <button class="memory-btn" @click="toggleMemory" title="对话记忆">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </button>
        <span class="status-dot"></span>
        <span class="status-text">在线</span>
        </div>
      </div>

      <div class="chat-messages" ref="messagesContainer">
      <div class="welcome-section" v-if="messages.length === 0">
        <div class="welcome-message">
          <div class="welcome-icon">
            <img :src="assistantAvatar" alt="桥灵" />
          </div>
          <h3>您好呀~我是桥灵</h3>
          <p>可以为您解答关于中国古桥的各种问题呢！您可以询问我关于古桥类型、结构特点、历史演变、代表作品等方面的问题。</p>
          <p class="tip">(有时回答可能稍微会有延迟，请耐心等待哦)</p>
          <div class="quick-questions">
            <button 
              v-for="question in quickQuestions" 
              :key="question" 
              @click="sendQuickQuestion(question)"
            >
              {{ question }}
            </button>
          </div>
        </div>
      </div>

      <TransitionGroup name="message" tag="div" class="messages-list" v-if="messages.length > 0">
        <div 
          v-for="(message, index) in messages" 
          :key="message.id" 
          :class="['message', message.type, { 'streaming': message.isStreaming }]"
        >
          <div class="message-avatar">
            <div class="avatar-inner">
              <img v-if="message.type === 'assistant'" :src="assistantAvatar" alt="桥灵" />
              <span v-else>👤</span>
            </div>
          </div>
          <div class="message-content">
            <div class="message-text">
              <span v-html="formatMessage(message.content)"></span>
              <span v-if="message.isStreaming" class="cursor">|</span>
            </div>
            
            <div class="knowledge-cards" v-if="message.knowledgeCards && message.knowledgeCards.length > 0">
              <div class="card-item" v-for="card in message.knowledgeCards" :key="card.id">
                <div class="card-image">
                  <img :src="card.image" :alt="card.name" />
                </div>
                <div class="card-info">
                  <h4>{{ card.name }}</h4>
                  <p>{{ card.dynasty }} · {{ card.province }}</p>
                  <p class="card-desc">{{ card.description }}</p>
                  <div class="card-actions">
                    <button class="card-action-btn" @click="goToBridge(card.id)" title="查看详情">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <button class="card-action-btn" @click="startGuide(card.id)" title="虚拟导游">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </button>
                    <button class="card-action-btn" @click="openMapNav(card)" title="地图导航">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                        <line x1="8" y1="2" x2="8" y2="18"/>
                        <line x1="16" y1="6" x2="16" y2="22"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="related-questions" v-if="message.relatedQuestions && message.relatedQuestions.length > 0 && !message.isStreaming">
              <div class="related-title">💡 相关问题</div>
              <button 
                v-for="question in message.relatedQuestions" 
                :key="question" 
                @click="sendQuickQuestion(question)"
                class="related-btn"
              >
                {{ question }}
              </button>
            </div>
            
            <div class="message-time" v-if="!message.isStreaming">{{ message.time }}</div>
            
            <div class="message-actions" v-if="message.type === 'assistant' && !message.isStreaming">
              <button class="action-btn speak-btn" :class="{ speaking: isCurrentSpeaking(message.content) }" @click="speakMessage(message.content)" :title="isCurrentSpeaking(message.content) ? '停止朗读' : '语音播报'">
                <svg v-if="!isCurrentSpeaking(message.content)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 010 7.07"/>
                  <path d="M19.07 4.93a10 10 0 010 14.14"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              </button>
              <button class="action-btn favorite-btn" @click="toggleFavorite(message)" :title="message.isFavorite ? '取消收藏' : '收藏'">
                <svg viewBox="0 0 24 24" :fill="message.isFavorite ? '#C9A961' : 'none'" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <div v-if="isThinking" class="message assistant typing">
        <div class="message-avatar">
          <div class="avatar-inner">
            <img :src="assistantAvatar" alt="桥灵" />
          </div>
        </div>
        <div class="message-content">
          <div class="typing-indicator">
            <span class="thinking-text">思考中</span>
            <span class="dots">
              <span class="dot">.</span>
              <span class="dot">.</span>
              <span class="dot">.</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <div class="input-wrapper" :class="{ 'sending': isSending }">
        <button class="voice-btn" @click="toggleVoiceInput" :class="{ active: isListening }" title="语音输入">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
        <textarea 
          v-model="inputMessage" 
          :placeholder="messages.length === 0 ? '按 Enter 发送消息' : '请输入您的问题...'"
          @keydown.enter.exact.prevent="sendMessage"
          rows="1"
          ref="inputArea"
          :disabled="isTyping"
        ></textarea>
        <button class="send-btn" @click="sendMessage" :disabled="!inputMessage.trim() || isTyping">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
          </svg>
        </button>
      </div>
      </div>
    </div>
    
    <div class="settings-panel" v-if="showSettings">
      <div class="panel-overlay" @click="toggleSettings"></div>
      <div class="panel-content">
      <div class="panel-header">
        <h3>⚙️ 个性化设置</h3>
        <button class="close-btn" @click="toggleSettings">×</button>
      </div>
      
      <div class="setting-item">
        <label>回答风格</label>
        <div class="style-options">
          <button 
            v-for="style in answerStyles" 
            :key="style.value"
            :class="['style-btn', { active: settings.answerStyle === style.value }]"
            @click="settings.answerStyle = style.value"
          >
            {{ style.label }}
          </button>
        </div>
      </div>
      
      <div class="setting-item">
        <label>字体大小</label>
        <div class="font-size-slider">
          <input type="range" v-model="settings.fontSize" min="12" max="20" step="1" />
          <span>{{ settings.fontSize }}px</span>
        </div>
      </div>
      
      <div class="setting-item">
        <label>语音播报速度</label>
        <div class="font-size-slider">
          <input type="range" v-model="settings.speechRate" min="0.5" max="2" step="0.1" />
          <span>{{ settings.speechRate }}x</span>
        </div>
      </div>
      
      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="settings.autoSpeak" />
          自动播报回答
        </label>
      </div>
      
      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="settings.showRelatedQuestions" />
          显示相关问题
        </label>
      </div>
      
      <button class="save-settings-btn" @click="saveSettings">保存设置</button>
      </div>
    </div>
    
    <div class="favorites-panel" v-if="showFavorites">
      <div class="panel-overlay" @click="toggleFavorites"></div>
      <div class="panel-content">
      <div class="panel-header">
        <h3>❤️ 我的收藏</h3>
        <button class="close-btn" @click="toggleFavorites">×</button>
      </div>
      
      <div class="favorites-list" v-if="favorites.length > 0">
        <div class="favorite-item" v-for="(item, index) in favorites" :key="index">
          <div class="favorite-content">{{ item.content }}</div>
          <div class="favorite-footer">
            <div class="favorite-time">{{ item.time }}</div>
            <button class="remove-favorite-btn" @click="removeFavorite(index)">删除</button>
          </div>
        </div>
      </div>
      
      <div class="empty-favorites" v-else>
        <p>暂无收藏内容</p>
      </div>
      </div>
    </div>
    
    <div class="recommend-panel" v-if="showRecommend">
      <div class="panel-overlay" @click="toggleRecommend"></div>
      <div class="panel-content">
      <div class="panel-header">
        <h3>🌉 古桥推荐</h3>
        <button class="close-btn" @click="toggleRecommend">×</button>
      </div>
      
      <div class="recommend-list">
        <div class="recommend-item" v-for="bridge in recommendedBridges" :key="bridge.id" @click="handleRecommendClick(bridge)">
          <div class="recommend-image">
            <img :src="bridge.image" :alt="bridge.name" />
          </div>
          <div class="recommend-info">
            <h4>{{ bridge.name }}</h4>
            <p>{{ bridge.dynasty }} · {{ bridge.province }}</p>
            <p class="recommend-reason">{{ bridge.reason }}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
    
    <div class="guide-panel" v-if="showGuide && guideState.currentBridge">
      <div class="panel-overlay" @click="toggleGuide"></div>
      <div class="panel-content guide-content">
        <div class="panel-header">
          <h3>🗺️ 虚拟导游</h3>
          <button class="close-btn" @click="toggleGuide">×</button>
        </div>
        
        <div class="guide-body">
          <div class="guide-image">
            <img :src="getGuideContent()?.image" :alt="guideState.currentBridge.name" />
          </div>
          
          <div class="guide-step-dots">
            <span 
              v-for="i in 5" 
              :key="i" 
              :class="['step-dot', { active: i - 1 === guideState.currentStep }]"
            ></span>
          </div>
          
          <div class="guide-info" v-if="getGuideContent()">
            <h4 class="guide-title">{{ getGuideContent().title }}</h4>
            <p class="guide-text">{{ getGuideContent().content }}</p>
          </div>
          
          <div class="guide-actions">
            <button class="guide-nav-btn" @click="prevGuideStep" :disabled="guideState.currentStep === 0">
              上一步
            </button>
            <button class="guide-nav-btn primary" @click="nextGuideStep" v-if="guideState.currentStep < 4">
              下一步
            </button>
            <button class="guide-nav-btn primary" @click="goToBridge(guideState.currentBridge.id)" v-else>
              查看详情
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="map-nav-panel" v-if="showMapNav && mapNavState.selectedBridge">
      <div class="panel-overlay" @click="closeMapNav"></div>
      <div class="panel-content map-content">
        <div class="panel-header">
          <h3>📍 地图导航</h3>
          <button class="close-btn" @click="closeMapNav">×</button>
        </div>
        
        <div class="map-body">
          <div class="map-bridge-info">
            <img :src="getBridgeImage(mapNavState.selectedBridge.name)" :alt="mapNavState.selectedBridge.name" />
            <div class="bridge-details">
              <h4>{{ mapNavState.selectedBridge.name }}</h4>
              <p>{{ mapNavState.selectedBridge.province }} · {{ mapNavState.selectedBridge.city }}</p>
              <p class="bridge-address">{{ mapNavState.selectedBridge.county }}</p>
            </div>
          </div>
          
          <div class="map-actions">
            <a :href="getMapUrl(mapNavState.selectedBridge)" target="_blank" class="map-link amap">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              高德地图导航
            </a>
            <a :href="`https://map.baidu.com/dir///@${mapNavState.selectedBridge.location?.[1]},${mapNavState.selectedBridge.location?.[0]}`" target="_blank" class="map-link bmap">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              百度地图导航
            </a>
          </div>
          
          <div class="map-tips">
            <p>💡 点击上方按钮可在地图应用中查看古桥位置并导航前往</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="memory-panel" v-if="showMemory">
      <div class="panel-overlay" @click="toggleMemory"></div>
      <div class="panel-content memory-content">
        <div class="panel-header">
          <h3>💭 对话记忆</h3>
          <button class="close-btn" @click="toggleMemory">×</button>
        </div>
        
        <div class="memory-body">
          <div class="memory-stats">
            <div class="stat-item">
              <span class="stat-value">{{ memoryState.conversations.length }}</span>
              <span class="stat-label">对话记录</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ messages.length }}</span>
              <span class="stat-label">当前对话</span>
            </div>
          </div>
          
          <div class="memory-actions">
            <button class="memory-action-btn" @click="saveCurrentConversation" :disabled="messages.length < 2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              保存当前对话
            </button>
            <button class="memory-action-btn danger" @click="clearAllMemory">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              清除所有记忆
            </button>
          </div>
          
          <div class="memory-list" v-if="memoryState.conversations.length > 0">
            <div class="memory-item" v-for="(conv, index) in memoryState.conversations" :key="conv.id">
              <div class="memory-item-header">
                <span class="memory-date">{{ conv.date }} {{ conv.time }}</span>
                <span class="memory-count">{{ conv.messageCount }}条消息</span>
              </div>
              <p class="memory-summary">{{ conv.summary }}</p>
              <div class="memory-item-actions">
                <button class="memory-item-btn" @click="loadConversation(conv)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  查看
                </button>
                <button class="memory-item-btn delete" @click="deleteConversation(index)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  删除
                </button>
              </div>
            </div>
          </div>
          
          <div class="empty-memory" v-else>
            <div class="empty-icon">💭</div>
            <p>暂无对话记忆</p>
            <p class="empty-tip">开始对话后，系统会自动保存您的对话记录</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'
import bridgeData from '@/assets/data/bridges.json'
import assistantAvatar from '@/assets/image/assistant-avatar.svg'

const router = useRouter()
const STORAGE_KEY = 'taling_chat_history'
const CONTEXT_KEY = 'taling_context'
const SETTINGS_KEY = 'taling_settings'
const FAVORITES_KEY = 'taling_favorites'
const messages = ref([])
const inputMessage = ref('')
const isTyping = ref(false)
const isThinking = ref(false)
const isSending = ref(false)
const messagesContainer = ref(null)
const inputArea = ref(null)
const messageIdCounter = ref(0)
const conversationContext = ref([])
const showSettings = ref(false)
const showFavorites = ref(false)
const showRecommend = ref(false)
const showGuide = ref(false)
const showMapNav = ref(false)
const isListening = ref(false)
const isSpeaking = ref(false)
const currentSpeakingText = ref('')
const recognition = ref(null)
const favorites = ref([])
const recommendedBridges = ref([])

const guideState = ref({
  currentBridge: null,
  currentStep: 0,
  isGuiding: false,
  guideHistory: []
})

const mapNavState = ref({
  selectedBridge: null,
  showMap: false
})

const showMemory = ref(false)
const memoryState = ref({
  conversations: [],
  currentConversation: null,
  summary: ''
})

const settings = ref({
  answerStyle: 'professional',
  fontSize: 14,
  speechRate: 1,
  autoSpeak: false,
  showRelatedQuestions: true
})

const answerStyles = [
  { label: '专业严谨', value: 'professional' },
  { label: '通俗易懂', value: 'simple' },
  { label: '诗意唯美', value: 'poetic' }
]

const loadMessages = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      messages.value = parsed.messages || []
      messageIdCounter.value = parsed.counter || 0
    }
  } catch (e) {
    console.error('加载对话历史失败:', e)
  }
}

const saveMessages = () => {
  try {
    const cleanMessages = messages.value.map(m => ({
      id: m.id,
      type: m.type,
      content: m.content,
      time: m.time
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      messages: cleanMessages,
      counter: messageIdCounter.value
    }))
  } catch (e) {
    console.error('保存对话历史失败:', e)
  }
}

const clearMessages = () => {
  messages.value = []
  messageIdCounter.value = 0
  localStorage.removeItem(STORAGE_KEY)
}

watch(messages, saveMessages, { deep: true })

const generateMessageId = () => {
  messageIdCounter.value += 1
  return `msg_${Date.now()}_${messageIdCounter.value}`
}

const quickQuestions = [
  '中国现存最长的古桥是哪座？',
  '赵州桥为什么能千年不倒？',
  '拱桥和梁桥有什么区别？',
  '中国古桥的主要功能有哪些？'
]

const localAnswers = {
  '最长': '中国现存最长的古桥是**福建省晋江市的安平桥**，建于南宋绍兴八年（1138年），全长2255米，是中国古代最长的石梁桥，有"天下无桥长此桥"的美誉。安平桥采用石梁结构，共有361个桥墩，展现了宋代高超的桥梁建造技术。',
  '赵州桥': '**赵州桥**能够千年不倒，主要有以下原因：\n\n1. **敞肩拱设计**：首创敞肩拱结构，在大拱两肩各设两个小拱，既减轻桥身自重，又增加泄洪能力。\n\n2. **单孔大跨度**：主拱跨度37.02米，是当时世界上最大的单孔石拱桥。\n\n3. **精湛的砌筑工艺**：采用28道独立拱圈并列砌筑，即使一道损坏也不影响整体。\n\n4. **合理的矢跨比**：拱矢高度与跨度比例恰当，受力合理。\n\n5. **优质材料**：选用当地优质青白色石灰岩，质地坚硬。',
  '卢沟桥': '**卢沟桥**位于北京丰台区，始建于金大定二十九年（1189年），是北京现存最古老的石造联拱桥。桥长266.5米，有11个桥孔。桥上石狮形态各异，共有501只，有"卢沟桥的狮子——数不清"之说。1937年7月7日，这里爆发了卢沟桥事变，成为全民族抗战的起点。',
  '洛阳桥': '**洛阳桥**（又名万安桥）位于福建泉州，建于北宋皇祐五年（1053年），是中国第一座跨海梁式石桥。桥长834米，有46个桥墩。首创"筏形基础"和"种蛎固基"技术，在桥基上养殖牡蛎加固桥墩，是世界桥梁史上的创举。',
  '安平桥': '**安平桥**位于福建晋江，建于南宋绍兴八年（1138年），全长2255米，是中国现存最长的古代石梁桥，有"天下无桥长此桥"的美誉。桥有361个桥墩，展现了宋代高超的桥梁建造技术。',
  '泸定桥': '**泸定桥**位于四川甘孜，建于清康熙四十四年（1705年），是中国现存最古老的铁索桥。桥长103米，由13根铁链组成，每根铁链重约2.5吨。1935年红军长征时"飞夺泸定桥"的战役使其闻名天下。',
  '广济桥': '**广济桥**位于广东潮州，建于南宋乾道七年（1171年），是世界上最早的启闭式桥梁。桥长518米，中间部分由18只梭船组成浮桥，可开可合，"十八梭船二十四洲"的独特结构举世无双。',
  '程阳永济桥': '**程阳永济桥**位于广西三江，建于1912年，是侗族风雨桥的杰出代表。桥长77.76米，有5座楼阁，不用一钉一铆，全靠榫卯结构连接，展现了侗族人民的建筑智慧。',
  '拱桥': '**拱桥**和**梁桥**的主要区别：\n\n**拱桥**：\n- 以拱形结构跨越江河\n- 承重能力强，跨度大\n- 造型优美，曲线流畅\n- 代表：赵州桥、卢沟桥\n\n**梁桥**：\n- 以梁板跨越桥墩\n- 结构简单，施工便利\n- 多为多孔连续\n- 代表：安平桥、洛阳桥',
  '梁桥': '**拱桥**和**梁桥**的主要区别：\n\n**拱桥**：\n- 以拱形结构跨越江河\n- 承重能力强，跨度大\n- 造型优美，曲线流畅\n- 代表：赵州桥、卢沟桥\n\n**梁桥**：\n- 以梁板跨越桥墩\n- 结构简单，施工便利\n- 多为多孔连续\n- 代表：安平桥、洛阳桥',
  '功能': '中国古桥的主要功能包括：\n\n1. **交通要道**：连接两岸，促进商贸往来和人员流动。\n\n2. **军事战略**：控制要道，具有重要的军事价值。\n\n3. **景观地标**：成为城市和景区的标志性建筑。\n\n4. **文化载体**：承载着丰富的历史文化和民俗传说。\n\n5. **商贸中心**：桥上常有集市，成为商业活动场所。\n\n6. **避雨歇息**：廊桥可供行人避雨歇息。',
  '廊桥': '**廊桥**（又称风雨桥）的特点：\n\n- 桥上建有廊屋，既保护桥身又供行人避雨歇息\n- 多见于南方地区，尤其是福建、浙江、广西等地\n- 融合了桥梁建筑与亭台楼阁的艺术\n- 代表：程阳永济桥、福建风雨桥',
  '索桥': '**索桥**（又称吊桥）的特点：\n\n- 以绳索或铁链为承重构件\n- 多见于西南山区，跨越深谷急流\n- 建造灵活，适应性强\n- 代表：泸定桥、霁虹桥',
  '材质': '中国古桥的主要材质包括：\n\n1. **石桥**：最为常见，坚固耐久，如赵州桥、卢沟桥\n2. **木桥**：工艺精湛，如风雨桥、廊桥\n3. **铁索桥**：多见于西南山区，如泸定桥\n4. **砖桥**：多见于江南园林，造型精致\n5. **竹木桥**：就地取材，多见于南方山区',
  '历史': '中国古桥的发展历史：\n\n- **汉代**：石拱桥技术开始成熟\n- **隋代**：赵州桥建成，代表石拱桥技术高峰\n- **唐代**：桥梁建设兴盛，技术成熟\n- **宋代**：桥梁建造技术达到高峰，出现安平桥、洛阳桥等名桥\n- **明清**：廊桥发展迅速，铁索桥兴起',
  '代表': '中国著名古桥代表：\n\n**北方**：\n- 赵州桥（河北）- 世界最早敞肩拱桥\n- 卢沟桥（北京）- 石刻艺术宝库\n- 十七孔桥（北京）- 颐和园名桥\n\n**南方**：\n- 安平桥（福建）- 天下第一长桥\n- 洛阳桥（福建）- 海内第一桥\n- 程阳永济桥（广西）- 风雨桥代表',
  '结构': '中国古桥的基本结构：\n\n1. **桥基**：桥梁的基础部分，有桩基、沉井等形式\n2. **桥墩**：支撑桥身的墩柱，形式多样\n3. **桥身**：桥梁的主体部分，有拱、梁等形式\n4. **桥面**：供行人车辆通行的部分\n5. **栏杆**：保护行人的护栏，常有精美雕刻',
  '保护': '中国古桥的保护措施包括：\n\n1. **法律保护**：列入文物保护单位，依法保护\n2. **修缮维护**：定期检查，及时修缮\n3. **环境治理**：整治周边环境，防止污染\n4. **限载限行**：限制车辆通行，减轻荷载\n5. **数字化存档**：建立数字档案，永久保存\n6. **公众教育**：提高公众保护意识',
  '世界遗产': '中国古桥相关的世界文化遗产：\n\n1. **大运河**：包含多座古桥，如拱宸桥等\n2. **丝绸之路**：包含古桥遗迹\n3. **中国木拱桥传统营造技艺**：2009年列入急需保护的非物质文化遗产名录\n\n这些遗产体现了中国古桥的建筑价值和文化意义。',
  '四大古桥': '中国四大古桥通常指：\n\n1. **赵州桥**（河北）- 隋代，世界最早敞肩拱桥\n2. **卢沟桥**（北京）- 金代，石刻艺术宝库\n3. **洛阳桥**（福建）- 宋代，海内第一桥\n4. **广济桥**（广东）- 宋代，启闭式桥梁鼻祖\n\n这四座桥代表了中国古代桥梁建筑的最高水平。',
  '福建': '福建省著名古桥：\n\n1. **安平桥** - 中国现存最长的古桥，全长2255米\n2. **洛阳桥** - 中国第一座跨海梁式石桥\n3. **漳州江东桥** - 福建最大的石梁桥\n\n福建古桥以石梁桥为主，技术精湛，历史悠久。',
  '北京': '北京市著名古桥：\n\n1. **卢沟桥** - 北京最古老的石造联拱桥，有501只石狮\n2. **十七孔桥** - 颐和园标志性建筑，17个桥孔\n3. **金水桥** - 故宫内著名汉白玉桥\n\n北京古桥以皇家园林桥梁为主，工艺精美。',
  '江苏': '江苏省著名古桥：\n\n1. **宝带桥** - 中国现存最长多孔石桥，53孔\n2. **枫桥** - 因《枫桥夜泊》闻名天下\n3. **五亭桥** - 扬州瘦西湖标志性建筑\n\n江苏古桥多分布于江南水乡，造型优雅。',
  '浙江': '浙江省著名古桥：\n\n1. **断桥** - 西湖十景之一，白娘子传说发生地\n2. **西津桥** - 浙江最长廊桥\n3. **通济桥** - 宁波标志性古桥\n\n浙江古桥以廊桥和石拱桥为主，文化底蕴深厚。',
  '四川': '四川省著名古桥：\n\n1. **泸定桥** - 中国最古老铁索桥，红军长征纪念地\n2. **安澜索桥** - 都江堰著名索桥\n3. **霁虹桥** - 世界最早铁索桥之一\n\n四川古桥以索桥为主，适应山区地形。',
  '广西': '广西壮族自治区著名古桥：\n\n1. **程阳永济桥** - 侗族风雨桥代表，不用一钉一铆\n2. **风雨桥** - 侗族特色建筑，遍布广西\n\n广西古桥以侗族风雨桥最具特色，融合民族建筑艺术。',
  '广东': '广东省著名古桥：\n\n1. **广济桥** - 世界最早启闭式桥梁\n2. **湘子桥** - 潮州标志性建筑\n\n广东古桥以广济桥最为著名，独特的启闭结构举世无双。',
  '朝代': '中国古桥的朝代分布：\n\n- **隋唐**：技术成熟，代表作为赵州桥\n- **宋代**：鼎盛时期，名桥辈出\n- **元代**：承前启后\n- **明代**：廊桥兴起\n- **清代**：铁索桥发展\n\n宋代是中国古桥建造的黄金时期。',
  '技术': '中国古桥的建造技术：\n\n1. **敞肩拱技术**：赵州桥首创，减轻自重\n2. **筏形基础**：洛阳桥首创，跨海建桥\n3. **种蛎固基**：利用牡蛎加固桥墩\n4. **榫卯结构**：廊桥不用钉铆\n5. **铁索悬吊**：索桥的核心技术\n\n这些技术体现了中国古代工匠的智慧。',
  '特点': '中国古桥的建筑特点：\n\n1. **因地制宜**：根据地形选择桥型\n2. **材料多样**：石、木、铁、砖并用\n3. **造型优美**：注重美学设计\n4. **装饰精美**：雕刻、彩绘丰富\n5. **功能复合**：交通、商贸、景观结合\n\n中国古桥是实用与艺术的完美结合。',
  '文化': '中国古桥的文化价值：\n\n1. **历史见证**：记录历史变迁\n2. **文学艺术**：诗词歌赋题材\n3. **民俗传说**：承载民间故事\n4. **建筑艺术**：展现工艺水平\n5. **民族精神**：体现民族智慧\n\n古桥是中华文化的重要载体。',
  '旅游': '中国古桥旅游推荐：\n\n**必游古桥**：\n- 赵州桥 - 感受千年古桥魅力\n- 卢沟桥 - 缅怀抗战历史\n- 安平桥 - 体验天下第一长桥\n- 程阳永济桥 - 欣赏侗族建筑艺术\n\n这些古桥各具特色，值得一看。'
}

const extractBridgeNames = (text) => {
  const bridgeNames = []
  const bridges = bridgeData.bridges
  
  bridges.forEach(bridge => {
    if (text.includes(bridge.name) || text.includes(bridge.alias)) {
      bridgeNames.push(bridge.name)
    }
  })
  
  return [...new Set(bridgeNames)]
}

const generateKnowledgeCards = (bridgeNames) => {
  const cards = []
  const bridges = bridgeData.bridges
  
  bridgeNames.forEach(name => {
    const bridge = bridges.find(b => b.name === name || b.alias === name)
    if (bridge) {
      cards.push({
        id: bridge.id,
        name: bridge.name,
        dynasty: bridge.dynasty,
        province: bridge.province,
        description: bridge.description,
        image: getBridgeImage(bridge.name)
      })
    }
  })
  
  return cards.slice(0, 3)
}

const generateRelatedQuestions = (question, answer) => {
  const relatedMap = {
    '最长': ['安平桥的建筑特点是什么？', '福建还有哪些著名古桥？', '中国古代最长的拱桥是哪座？'],
    '赵州桥': ['赵州桥的建造者是谁？', '敞肩拱有什么优点？', '赵州桥如何保护修缮？'],
    '拱桥': ['中国最著名的拱桥有哪些？', '拱桥的承重原理是什么？', '拱桥和梁桥哪个跨度更大？'],
    '梁桥': ['梁桥的优点是什么？', '中国最长的梁桥是哪座？', '梁桥适合建在什么样的河流上？'],
    '功能': ['古桥有哪些文化价值？', '古桥如何适应现代交通？', '古桥的保护措施有哪些？'],
    '廊桥': ['廊桥主要分布在哪里？', '廊桥的建筑特色是什么？', '最著名的廊桥是哪座？'],
    '材质': ['石桥和木桥哪个更耐用？', '铁索桥是如何建造的？', '古桥材料如何选择？'],
    '历史': ['哪个朝代古桥最多？', '古桥建造技术如何演变？', '古代如何建造大型桥梁？'],
    '代表': ['中国四大古桥是哪些？', '南方和北方古桥有什么区别？', '哪些古桥是世界文化遗产？'],
    '结构': ['古桥如何保证稳固性？', '古代桥梁如何防水？', '古桥的装饰艺术有哪些？']
  }
  
  const lowerQuestion = question.toLowerCase()
  const lowerAnswer = answer.toLowerCase()
  
  for (const [key, questions] of Object.entries(relatedMap)) {
    if (lowerQuestion.includes(key) || lowerAnswer.includes(key)) {
      return questions
    }
  }
  
  return [
    '中国最著名的古桥有哪些？',
    '古桥的建筑特点是什么？',
    '如何保护古桥文化遗产？'
  ]
}

const getBridgeImage = (name) => {
  const imageMap = {
    '赵州桥': new URL('../assets/image/zhaozhou-bridge.png', import.meta.url).href,
    '卢沟桥': new URL('../assets/image/lugou-bridge.png', import.meta.url).href,
    '洛阳桥': new URL('../assets/image/luoyang-bridge.png', import.meta.url).href,
    '安平桥': new URL('../assets/image/anping-bridge.png', import.meta.url).href,
    '广济桥': new URL('../assets/image/guangji-bridge.png', import.meta.url).href,
    '泸定桥': new URL('../assets/image/luding-bridge.png', import.meta.url).href,
    '五亭桥': new URL('../assets/image/wuting-bridge.png', import.meta.url).href,
    '十七孔桥': new URL('../assets/image/shiqikong-bridge.png', import.meta.url).href,
    '宝带桥': new URL('../assets/image/baodai-bridge.png', import.meta.url).href,
    '放生桥': new URL('../assets/image/fangsheng-bridge.png', import.meta.url).href,
    '盘江桥': new URL('../assets/image/panjiang-bridge.png', import.meta.url).href,
    '程阳永济桥': new URL('../assets/image/chengyang-bridge.png', import.meta.url).href,
    '霁虹桥': new URL('../assets/image/jihong-bridge.png', import.meta.url).href,
    '风雨桥': new URL('../assets/image/fengyu-bridge.png', import.meta.url).href,
    '鱼沼飞梁': new URL('../assets/image/yuzhao-bridge.png', import.meta.url).href
  }
  return imageMap[name] || new URL('../assets/image/zhaozhou-bridge.png', import.meta.url).href
}

const goToBridge = (bridgeId) => {
  showRecommend.value = false
  showFavorites.value = false
  showSettings.value = false
  router.push(`/main/bridge/${bridgeId}`)
}

const handleRecommendClick = (bridge) => {
  if (bridge && bridge.id) {
    goToBridge(bridge.id)
  }
}

const saveContext = () => {
  try {
    const recentMessages = messages.value.slice(-10).map(m => ({
      role: m.type === 'user' ? 'user' : 'assistant',
      content: m.content
    }))
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(recentMessages))
  } catch (e) {
    console.error('保存上下文失败:', e)
  }
}

const loadContext = () => {
  try {
    const saved = localStorage.getItem(CONTEXT_KEY)
    if (saved) {
      conversationContext.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('加载上下文失败:', e)
  }
}

const loadSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY)
    if (saved) {
      settings.value = { ...settings.value, ...JSON.parse(saved) }
    }
  } catch (e) {
    console.error('加载设置失败:', e)
  }
}

const saveSettings = () => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings.value))
    showSettings.value = false
  } catch (e) {
    console.error('保存设置失败:', e)
  }
}

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (saved) {
      favorites.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('加载收藏失败:', e)
  }
}

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

const toggleFavorites = () => {
  showFavorites.value = !showFavorites.value
}

const toggleRecommend = () => {
  showRecommend.value = !showRecommend.value
  if (showRecommend.value) {
    generateRecommendations()
  }
}

const toggleVoiceInput = () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('您的浏览器不支持语音输入功能')
    return
  }
  
  if (isListening.value) {
    stopVoiceInput()
  } else {
    startVoiceInput()
  }
}

const startVoiceInput = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  recognition.value = new SpeechRecognition()
  recognition.value.continuous = false
  recognition.value.interimResults = true
  recognition.value.lang = 'zh-CN'
  
  recognition.value.onstart = () => {
    isListening.value = true
  }
  
  recognition.value.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    inputMessage.value = transcript
  }
  
  recognition.value.onerror = (event) => {
    console.error('语音识别错误:', event.error)
    isListening.value = false
  }
  
  recognition.value.onend = () => {
    isListening.value = false
  }
  
  recognition.value.start()
}

const stopVoiceInput = () => {
  if (recognition.value) {
    recognition.value.stop()
    isListening.value = false
  }
}

const speakMessage = (text) => {
  if (!('speechSynthesis' in window)) {
    alert('您的浏览器不支持语音播报功能')
    return
  }
  
  const cleanText = text.replace(/\*\*/g, '').replace(/\n/g, ' ')
  
  if (isSpeaking.value && currentSpeakingText.value === cleanText) {
    window.speechSynthesis.cancel()
    isSpeaking.value = false
    currentSpeakingText.value = ''
    return
  }
  
  window.speechSynthesis.cancel()
  
  const utterance = new SpeechSynthesisUtterance(cleanText)
  utterance.lang = 'zh-CN'
  utterance.rate = settings.value.speechRate * 1.1
  utterance.pitch = 1.3
  
  const voices = window.speechSynthesis.getVoices()
  const femaleVoice = voices.find(voice => 
    voice.lang.includes('zh') && (
      voice.name.includes('Female') || 
      voice.name.includes('female') ||
      voice.name.includes('女') ||
      voice.name.includes('Xiaoxiao') ||
      voice.name.includes('Yaoyao') ||
      voice.name.includes('Ting-Ting')
    )
  )
  if (femaleVoice) {
    utterance.voice = femaleVoice
  }
  
  utterance.onend = () => {
    isSpeaking.value = false
    currentSpeakingText.value = ''
  }
  
  utterance.onerror = () => {
    isSpeaking.value = false
    currentSpeakingText.value = ''
  }
  
  isSpeaking.value = true
  currentSpeakingText.value = cleanText
  window.speechSynthesis.speak(utterance)
}

const isCurrentSpeaking = (text) => {
  const cleanText = text.replace(/\*\*/g, '').replace(/\n/g, ' ')
  return isSpeaking.value && currentSpeakingText.value === cleanText
}

const toggleFavorite = (message) => {
  const index = favorites.value.findIndex(f => f.content === message.content)
  
  if (index > -1) {
    favorites.value.splice(index, 1)
    message.isFavorite = false
  } else {
    favorites.value.unshift({
      content: message.content,
      time: message.time
    })
    message.isFavorite = true
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value))
}

const removeFavorite = (index) => {
  const item = favorites.value[index]
  const messageIndex = messages.value.findIndex(m => m.content === item.content)
  if (messageIndex > -1) {
    messages.value[messageIndex].isFavorite = false
  }
  
  favorites.value.splice(index, 1)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value))
}

const exportChat = () => {
  const chatContent = messages.value
    .filter(m => !m.isStreaming)
    .map(m => `${m.type === 'user' ? '👤 用户' : '🤖 桥灵'} (${m.time})\n${m.content}\n`)
    .join('\n' + '='.repeat(50) + '\n\n')
  
  const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `桥灵对话记录_${new Date().toLocaleDateString()}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const generateRecommendations = () => {
  const bridges = bridgeData.bridges
  const recommendations = []
  
  const recentTopics = conversationContext.value
    .slice(-5)
    .filter(m => m.role === 'user')
    .map(m => m.content.toLowerCase())
  
  bridges.forEach(bridge => {
    let score = 0
    let reason = ''
    
    if (bridge.span > 100) {
      score += 3
      reason = '跨度超百米，工程奇迹'
    } else if (bridge.dynasty === '隋' || bridge.dynasty === '唐') {
      score += 2
      reason = '千年古桥，历史见证'
    } else if (bridge.protectionLevel === '全国重点文物保护单位') {
      score += 2
      reason = '国宝级文物，价值非凡'
    }
    
    recentTopics.forEach(topic => {
      if (topic.includes(bridge.province) || topic.includes(bridge.bridgeType)) {
        score += 1
        reason = '符合您的兴趣偏好'
      }
    })
    
    if (score > 0) {
      recommendations.push({
        id: bridge.id,
        name: bridge.name,
        dynasty: bridge.dynasty,
        province: bridge.province,
        image: getBridgeImage(bridge.name),
        reason: reason || '值得探索的古桥',
        score: score
      })
    }
  })
  
  recommendations.sort((a, b) => b.score - a.score)
  recommendedBridges.value = recommendations.slice(0, 6)
}

const startGuide = (bridgeId) => {
  const bridge = bridgeData.bridges.find(b => b.id === bridgeId)
  if (!bridge) return
  
  guideState.value = {
    currentBridge: bridge,
    currentStep: 0,
    isGuiding: true,
    guideHistory: [...guideState.value.guideHistory, bridgeId]
  }
  showGuide.value = true
}

const nextGuideStep = () => {
  if (guideState.value.currentStep < 4) {
    guideState.value.currentStep++
  }
}

const prevGuideStep = () => {
  if (guideState.value.currentStep > 0) {
    guideState.value.currentStep--
  }
}

const getGuideContent = () => {
  const bridge = guideState.value.currentBridge
  if (!bridge) return null
  
  const steps = [
    {
      title: '欢迎来到' + bridge.name,
      content: bridge.description,
      image: getBridgeImage(bridge.name)
    },
    {
      title: '历史渊源',
      content: `${bridge.name}建于${bridge.dynasty}代（约公元${bridge.buildYear}年），距今已有${new Date().getFullYear() - bridge.buildYear}年历史。${bridge.story || ''}`,
      image: getBridgeImage(bridge.name)
    },
    {
      title: '建筑特色',
      content: `${bridge.name}是一座${bridge.bridgeType}，采用${bridge.material}质建造。主跨${bridge.span}米，全长${bridge.length}米，宽${bridge.width}米。主要特点包括：${bridge.features.join('、')}。`,
      image: getBridgeImage(bridge.name)
    },
    {
      title: '文化价值',
      content: `${bridge.name}是${bridge.protectionLevel}，具有极高的${bridge.culturalValue >= 90 ? '历史、艺术和科学' : '历史和文化'}价值。每年吸引约${bridge.visitorCount}万游客前来参观。`,
      image: getBridgeImage(bridge.name)
    },
    {
      title: '参观指南',
      content: `${bridge.name}位于${bridge.province}${bridge.city}${bridge.county}。${bridge.tourismRating >= 4.5 ? '强烈推荐前往参观！' : '值得一游。'}您可以在本站查看更多详细信息。`,
      image: getBridgeImage(bridge.name)
    }
  ]
  
  return steps[guideState.value.currentStep]
}

const toggleGuide = () => {
  showGuide.value = !showGuide.value
}

const toggleMemory = () => {
  showMemory.value = !showMemory.value
  if (showMemory.value) {
    loadConversationMemory()
  }
}

const loadConversationMemory = () => {
  try {
    const saved = localStorage.getItem('taling_conversation_memory')
    if (saved) {
      memoryState.value.conversations = JSON.parse(saved)
    }
  } catch (e) {
    console.error('加载对话记忆失败:', e)
  }
}

const saveConversationMemory = () => {
  try {
    localStorage.setItem('taling_conversation_memory', JSON.stringify(memoryState.value.conversations))
  } catch (e) {
    console.error('保存对话记忆失败:', e)
  }
}

const generateConversationSummary = (messages) => {
  if (!messages || messages.length === 0) return ''
  
  const topics = new Set()
  const bridges = new Set()
  
  messages.forEach(m => {
    const content = m.content.toLowerCase()
    bridgeData.bridges.forEach(bridge => {
      if (content.includes(bridge.name.toLowerCase())) {
        bridges.add(bridge.name)
      }
    })
    
    if (content.includes('历史') || content.includes('年代')) topics.add('历史')
    if (content.includes('建筑') || content.includes('结构')) topics.add('建筑')
    if (content.includes('文化') || content.includes('价值')) topics.add('文化')
    if (content.includes('旅游') || content.includes('参观')) topics.add('旅游')
  })
  
  const bridgeList = Array.from(bridges).slice(0, 3).join('、')
  const topicList = Array.from(topics).join('、')
  
  let summary = `本次对话共${messages.length}条消息`
  if (bridgeList) summary += `，讨论了${bridgeList}等古桥`
  if (topicList) summary += `，涉及${topicList}等话题`
  
  return summary
}

const saveCurrentConversation = () => {
  if (messages.value.length < 2) return
  
  const conversation = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    messages: messages.value.slice(-20).map(m => ({
      role: m.type,
      content: m.content,
      time: m.time
    })),
    summary: generateConversationSummary(messages.value),
    messageCount: messages.value.length
  }
  
  memoryState.value.conversations.unshift(conversation)
  
  if (memoryState.value.conversations.length > 50) {
    memoryState.value.conversations = memoryState.value.conversations.slice(0, 50)
  }
  
  saveConversationMemory()
}

const loadConversation = (conversation) => {
  if (!conversation || !conversation.messages) return
  
  messages.value = conversation.messages.map(m => ({
    id: generateMessageId(),
    type: m.role,
    content: m.content,
    time: m.time || getCurrentTime()
  }))
  
  conversationContext.value = conversation.messages.slice(-10).map(m => ({
    role: m.role,
    content: m.content
  }))
  
  saveMessages()
  saveContext()
  showMemory.value = false
  scrollToBottom()
}

const deleteConversation = (index) => {
  memoryState.value.conversations.splice(index, 1)
  saveConversationMemory()
}

const clearAllMemory = () => {
  if (confirm('确定要清除所有对话记忆吗？此操作不可恢复。')) {
    memoryState.value.conversations = []
    saveConversationMemory()
  }
}

const getRelevantHistory = (currentMessage) => {
  const relevantMessages = []
  const keywords = currentMessage.toLowerCase().split(/\s+/)
  
  memoryState.value.conversations.forEach(conv => {
    conv.messages.forEach(m => {
      const content = m.content.toLowerCase()
      const hasKeyword = keywords.some(kw => content.includes(kw))
      
      if (hasKeyword) {
        relevantMessages.push({
          conversationId: conv.id,
          date: conv.date,
          message: m
        })
      }
    })
  })
  
  return relevantMessages.slice(0, 5)
}

const openMapNav = (bridge) => {
  mapNavState.value = {
    selectedBridge: bridge,
    showMap: true
  }
  showMapNav.value = true
}

const closeMapNav = () => {
  showMapNav.value = false
  mapNavState.value = {
    selectedBridge: null,
    showMap: false
  }
}

const getMapUrl = (bridge) => {
  if (!bridge || !bridge.location) return ''
  const [lng, lat] = bridge.location
  return `https://uri.amap.com/marker?position=${lng},${lat}&name=${encodeURIComponent(bridge.name)}&coordinate=wgs84`
}

const getLocalAnswer = (question) => {
  const lowerQuestion = question.toLowerCase()
  
  for (const [key, answer] of Object.entries(localAnswers)) {
    if (lowerQuestion.includes(key)) {
      return answer
    }
  }
  
  return null
}

const generateAuthUrl = (apiKey, apiSecret) => {
  const host = 'spark-api.xf-yun.com'
  const path = '/v3.5/chat'
  const date = new Date().toUTCString()
  
  const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${path} HTTP/1.1`
  const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
  const signature = CryptoJS.enc.Base64.stringify(signatureSha)
  
  const authorizationOrigin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
  const authorization = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorizationOrigin))
  
  const url = `wss://${host}${path}?authorization=${authorization}&date=${encodeURIComponent(date)}&host=${host}`
  
  return url
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const formatMessage = (content) => {
  return content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const sendQuickQuestion = (question) => {
  inputMessage.value = question
  sendMessage()
}

const typeWriterEffect = async (messageId, text, question, speed = 30) => {
  const messageIndex = messages.value.findIndex(m => m.id === messageId)
  if (messageIndex === -1) return
  
  const chars = text.split('')
  for (let i = 0; i < chars.length; i++) {
    messages.value[messageIndex].content += chars[i]
    if (i % 2 === 0) {
      scrollToBottom()
    }
    await new Promise(resolve => setTimeout(resolve, speed))
  }
  
  messages.value[messageIndex].isStreaming = false
  messages.value[messageIndex].time = getCurrentTime()
  
  const bridgeNames = extractBridgeNames(text)
  if (bridgeNames.length > 0) {
    messages.value[messageIndex].knowledgeCards = generateKnowledgeCards(bridgeNames)
  }
  
  messages.value[messageIndex].relatedQuestions = generateRelatedQuestions(question, text)
  
  saveContext()
  scrollToBottom()
}

const sendMessage = async () => {
  const message = inputMessage.value.trim()
  if (!message || isTyping.value) return

  isSending.value = true
  
  const userMessage = {
    id: generateMessageId(),
    type: 'user',
    content: message,
    time: getCurrentTime()
  }
  
  messages.value.push(userMessage)
  inputMessage.value = ''
  
  await new Promise(resolve => setTimeout(resolve, 300))
  isSending.value = false
  isThinking.value = true
  scrollToBottom()

  try {
    const FALLBACK_APP_ID = 'ab741ad5'
    const FALLBACK_API_KEY = '373b60a8f778e003893db76ca49008f6'
    const FALLBACK_API_SECRET = 'YzU1OWI1Y2VkYTMyMWUyZTc3ZTZhZDNk'
    
    const appId = import.meta.env.VITE_SPARK_APP_ID || FALLBACK_APP_ID
    const apiKey = import.meta.env.VITE_SPARK_API_KEY || FALLBACK_API_KEY
    const apiSecret = import.meta.env.VITE_SPARK_API_SECRET || FALLBACK_API_SECRET
    
    if (!appId || !apiKey || !apiSecret) {
      const localAnswer = getLocalAnswer(message)
      await new Promise(resolve => setTimeout(resolve, 500))
      isThinking.value = false
      
      const assistantMessage = {
        id: generateMessageId(),
        type: 'assistant',
        content: '',
        time: '',
        isStreaming: true
      }
      messages.value.push(assistantMessage)
      scrollToBottom()
      
      if (localAnswer) {
        await typeWriterEffect(assistantMessage.id, localAnswer, message, 25)
      } else {
        await typeWriterEffect(assistantMessage.id, 'API配置不完整，请检查.env文件中的配置。', message, 20)
      }
      isTyping.value = false
      scrollToBottom()
      return
    }
    
    const wsUrl = generateAuthUrl(apiKey, apiSecret)
    const ws = new WebSocket(wsUrl)
    let fullResponse = ''
    let hasError = false
    let connectionTimeout = null
    
    connectionTimeout = setTimeout(() => {
      if (!assistantMessage) {
        console.error('WebSocket连接超时')
        hasError = true
        isThinking.value = false
        ws.close()
        messages.value.push({
          id: generateMessageId(),
          type: 'assistant',
          content: '连接超时，请检查网络或稍后再试。',
          time: getCurrentTime()
        })
        isTyping.value = false
        scrollToBottom()
      }
    }, 10000)
    
    let assistantMessageIndex = -1
    
    ws.onopen = () => {
      if (connectionTimeout) {
        clearTimeout(connectionTimeout)
        connectionTimeout = null
      }
      isThinking.value = false
      
      const newMessage = {
        id: generateMessageId(),
        type: 'assistant',
        content: '',
        time: '',
        isStreaming: true
      }
      messages.value.push(newMessage)
      assistantMessageIndex = messages.value.length - 1
      scrollToBottom()
      
      const contextMessages = conversationContext.value.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }))
      
      const request = {
        header: {
          app_id: appId,
          uid: 'user_' + Date.now()
        },
        parameter: {
          chat: {
            domain: 'generalv3.5',
            temperature: 0.7,
            max_tokens: 1000
          }
        },
        payload: {
          message: {
            text: [
              {
                role: 'system',
                content: '你是桥灵，一个专门介绍中国古桥知识的AI助手。你的名字叫桥灵，专注于中国古桥建筑的历史、形制、结构、文化等方面的知识。请用专业但友好的语气回答问题，回答要简洁明了。'
              },
              ...contextMessages,
              {
                role: 'user',
                content: message
              }
            ]
          }
        }
      }
      ws.send(JSON.stringify(request))
    }
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        
        if (data.header && data.header.code !== 0) {
          hasError = true
          console.error('API Error:', data.header.message, data.header.code)
          if (assistantMessageIndex >= 0) {
            messages.value[assistantMessageIndex].content = `错误: ${data.header.message || '未知错误'} (错误码: ${data.header.code})`
            messages.value[assistantMessageIndex].isStreaming = false
            messages.value[assistantMessageIndex].time = getCurrentTime()
          }
          ws.close()
          return
        }
        
        if (data.payload && data.payload.choices && data.payload.choices.text && data.payload.choices.text.length > 0) {
          const chunk = data.payload.choices.text[0].content
          fullResponse += chunk
          if (assistantMessageIndex >= 0) {
            messages.value[assistantMessageIndex].content = fullResponse
            scrollToBottom()
          }
        }
        
        if (data.header && data.header.status === 2) {
          if (assistantMessageIndex >= 0) {
            messages.value[assistantMessageIndex].isStreaming = false
            messages.value[assistantMessageIndex].time = getCurrentTime()
            
            const bridgeNames = extractBridgeNames(fullResponse)
            if (bridgeNames.length > 0) {
              messages.value[assistantMessageIndex].knowledgeCards = generateKnowledgeCards(bridgeNames)
            }
            
            messages.value[assistantMessageIndex].relatedQuestions = generateRelatedQuestions(message, fullResponse)
            
            conversationContext.value.push(
              { role: 'user', content: message },
              { role: 'assistant', content: fullResponse }
            )
            saveContext()
            saveCurrentConversation()
          }
          ws.close()
        }
      } catch (e) {
        console.error('Parse error:', e)
      }
    }
    
    ws.onerror = (error) => {
      console.error('WebSocket Error:', error)
      if (connectionTimeout) {
        clearTimeout(connectionTimeout)
        connectionTimeout = null
      }
      hasError = true
      isThinking.value = false
      if (assistantMessageIndex >= 0) {
        messages.value[assistantMessageIndex].content = '连接失败，请检查网络或API配置。'
        messages.value[assistantMessageIndex].isStreaming = false
        messages.value[assistantMessageIndex].time = getCurrentTime()
      } else {
        messages.value.push({
          id: generateMessageId(),
          type: 'assistant',
          content: '连接失败，请检查网络或API配置。',
          time: getCurrentTime()
        })
      }
      isTyping.value = false
      scrollToBottom()
    }
    
    ws.onclose = () => {
      if (connectionTimeout) {
        clearTimeout(connectionTimeout)
        connectionTimeout = null
      }
      if (!hasError) {
        if (!fullResponse && assistantMessageIndex >= 0) {
          messages.value[assistantMessageIndex].content = '未收到有效回复，请稍后再试。'
          messages.value[assistantMessageIndex].isStreaming = false
          messages.value[assistantMessageIndex].time = getCurrentTime()
        }
      }
      isTyping.value = false
      scrollToBottom()
    }
    
    setTimeout(() => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close()
        if (!fullResponse && !hasError && assistantMessageIndex >= 0) {
          messages.value[assistantMessageIndex].content = '请求超时，请稍后再试。'
          messages.value[assistantMessageIndex].isStreaming = false
          messages.value[assistantMessageIndex].time = getCurrentTime()
        }
        isTyping.value = false
        scrollToBottom()
      }
    }, 30000)
    
  } catch (error) {
    console.error('API Error:', error)
    isThinking.value = false
    
    const localAnswer = getLocalAnswer(message)
    if (localAnswer) {
      const assistantMessage = {
        id: generateMessageId(),
        type: 'assistant',
        content: '',
        time: '',
        isStreaming: true
      }
      messages.value.push(assistantMessage)
      scrollToBottom()
      await typeWriterEffect(assistantMessage.id, localAnswer, message, 25)
    } else {
      messages.value.push({
        id: generateMessageId(),
        type: 'assistant',
        content: '抱歉，API调用出现问题。请检查您的API配置是否正确，或稍后再试。',
        time: getCurrentTime()
      })
    }
    isTyping.value = false
    scrollToBottom()
  }
}

onMounted(() => {
  loadMessages()
  loadContext()
  loadSettings()
  loadFavorites()
  scrollToBottom()
  
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices()
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices()
    }
  }
})
</script>

<style lang="scss" scoped>
.assistant-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.assistant-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 30%, #1F1F1F 50%, #1A1A1A 70%, #0D0D0D 100%);
  border-radius: 16px;
  overflow: hidden;
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

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(90deg, rgba(197, 61, 67, 0.35) 0%, rgba(212, 175, 55, 0.35) 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  position: relative;
  z-index: 1;
  flex-shrink: 0;

  .header-left {
    display: flex;
    align-items: center;
    gap: 14px;

    .assistant-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #C9A961, #B8423A);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: 0 3px 12px rgba(212, 175, 55, 0.4);
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .assistant-info {
      h2 {
        font-family: 'Noto Serif SC', serif;
        font-size: 20px;
        color: #C9A961;
        margin: 0;
        text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
      }

      p {
        font-size: 13px;
        color: rgba(232, 228, 216, 0.75);
        margin: 5px 0 0 0;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;

    .clear-btn {
      width: 36px;
      height: 36px;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 8px;
      color: #C9A961;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      
      svg {
        width: 18px;
        height: 18px;
      }

      &:hover {
        background: rgba(197, 61, 67, 0.3);
        border-color: rgba(197, 61, 67, 0.5);
        color: #B8423A;
        transform: scale(1.05);
      }
    }

    .status-dot {
      width: 10px;
      height: 10px;
      background: #4CAF50;
      border-radius: 50%;
      animation: pulse 2s infinite;
      box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    }

    .status-text {
      font-size: 13px;
      color: rgba(232, 228, 216, 0.75);
    }
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.chat-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 24px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  
  &:has(.welcome-section) {
    flex: 0 0 auto;
    overflow: visible;
  }
  
  &:has(.messages-list) {
    flex: 1;
  }
  
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

.welcome-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 0 0 auto;
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  padding-top: 20px;
}

.welcome-message {
  text-align: center;
  padding: 20px 30px 10px;
  margin-bottom: 0;

  .welcome-icon {
    width: 70px;
    height: 70px;
    margin: 0 auto 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: float 3s ease-in-out infinite;
    filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.3));
    border-radius: 50%;
    background: linear-gradient(135deg, #C9A961, #B8423A);
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  h3 {
    font-family: 'Noto Serif SC', serif;
    font-size: 24px;
    color: #C9A961;
    margin: 0 0 10px 0;
    letter-spacing: 3px;
    text-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
  }

  p {
    font-size: 14px;
    color: rgba(232, 228, 216, 0.85);
    margin: 0 0 8px 0;
    line-height: 1.7;

    &.tip {
      font-size: 12px;
      color: rgba(232, 228, 216, 0.6);
      margin-top: 6px;
    }
  }

  .quick-questions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 14px;

    button {
      padding: 10px 20px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(197, 61, 67, 0.15));
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 20px;
      color: #E8E4D8;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.4), rgba(197, 61, 67, 0.25));
        border-color: #C9A961;
        transform: translateY(-3px);
        box-shadow: 0 6px 18px rgba(212, 175, 55, 0.3);
      }
    }
  }
}

.message {
  display: flex;
  gap: 14px;
  margin-bottom: 20px;
  animation: messageSlideIn 0.4s ease-out;
  
  @keyframes messageSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .knowledge-cards {
    margin-top: 16px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    
    .card-item {
      flex: 1;
      min-width: 200px;
      max-width: 280px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(197, 61, 67, 0.1));
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
        border-color: #C9A961;
      }
      
      .card-image {
        width: 100%;
        height: 120px;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .card-info {
        padding: 12px;
        
        h4 {
          font-size: 15px;
          color: #C9A961;
          margin: 0 0 6px 0;
          font-weight: 600;
        }
        
        p {
          font-size: 12px;
          color: rgba(232, 228, 216, 0.7);
          margin: 0 0 4px 0;
          
          &.card-desc {
            font-size: 11px;
            color: rgba(232, 228, 216, 0.6);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

.related-questions {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  
  .related-title {
    font-size: 13px;
    color: rgba(232, 228, 216, 0.8);
    margin-bottom: 10px;
    font-weight: 500;
  }
  
  .related-btn {
    display: inline-block;
    padding: 8px 16px;
    margin: 4px 8px 4px 0;
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 16px;
    color: #E8E4D8;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(212, 175, 55, 0.25);
      border-color: #C9A961;
      transform: translateY(-2px);
    }
  }
}
  margin-bottom: 18px;
  animation: messageSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.user {
    flex-direction: row-reverse;

    .message-content {
      align-items: flex-end;

      .message-text {
        background: linear-gradient(135deg, #B8423A, #C9A961);
        border-radius: 18px 6px 18px 18px;
        box-shadow: 0 4px 15px rgba(197, 61, 67, 0.3);
      }
    }
    
    .message-avatar .avatar-inner {
      background: linear-gradient(135deg, #B8423A, #C9A961);
      box-shadow: 0 2px 12px rgba(197, 61, 67, 0.4);
    }
  }

  &.assistant {
    .message-content {
      align-items: flex-start;

      .message-text {
        background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
        border-radius: 6px 18px 18px 18px;
        border: 1px solid rgba(212, 175, 55, 0.2);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }
    }
    
    .message-avatar .avatar-inner {
      background: linear-gradient(135deg, #C9A961, #B8423A);
      box-shadow: 0 2px 12px rgba(212, 175, 55, 0.4);
    }
  }
  
  &.streaming {
    .message-text {
      .cursor {
        animation: blink 0.8s infinite;
        color: #C9A961;
        font-weight: bold;
        margin-left: 1px;
      }
    }
  }

  .message-avatar {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    
    .avatar-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
  
  &:hover .message-avatar .avatar-inner {
    transform: scale(1.1);
  }

  .message-content {
    display: flex;
    flex-direction: column;
    max-width: 70%;

    .message-text {
      padding: 14px 18px;
      color: #E8E4D8;
      font-size: 14px;
      line-height: 1.7;
      transition: all 0.3s ease;
    }

    .message-time {
      font-size: 11px;
      color: rgba(232, 228, 216, 0.5);
      margin-top: 5px;
      opacity: 0;
      animation: fadeIn 0.3s ease forwards;
      animation-delay: 0.3s;
    }
  }
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.messages-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.message-enter-active {
  animation: messageSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.message-leave-active {
  animation: messageSlideOut 0.3s ease forwards;
}

@keyframes messageSlideOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
}

.typing-indicator {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%);
  border-radius: 6px 18px 18px 18px;
  border: 1px solid rgba(212, 175, 55, 0.2);

  .thinking-text {
    color: #E8E4D8;
    font-size: 14px;
    margin-right: 4px;
  }

  .dots {
    display: inline-flex;
    
    .dot {
      color: #C9A961;
      font-size: 14px;
      font-weight: bold;
      animation: dotPulse 1.4s infinite ease-in-out;
      
      &:nth-child(1) { animation-delay: 0s; }
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
}

@keyframes dotPulse {
  0%, 60%, 100% { 
    opacity: 0.3;
    transform: translateY(0);
  }
  30% { 
    opacity: 1;
    transform: translateY(-3px);
  }
}

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
}

@keyframes sendPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(212, 175, 55, 0);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(212, 175, 55, 0);
  }
}

.chat-input {
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.25);
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  position: relative;
  z-index: 1;
  flex-shrink: 0;

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(45, 90, 90, 0.35);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 14px;
    padding: 14px 16px;
    transition: all 0.3s ease;
    
    &.sending {
      animation: sendPulse 0.5s ease;
      border-color: rgba(212, 175, 55, 0.6);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
    }

    textarea {
      flex: 1;
      background: transparent;
      border: none;
      color: #E8E4D8;
      font-size: 15px;
      font-family: inherit;
      resize: none;
      outline: none;
      min-height: 26px;
      max-height: 100px;
      line-height: 1.5;
      transition: all 0.3s ease;

      &::placeholder {
        color: rgba(232, 228, 216, 0.6);
        font-size: 16px;
      }
    }

    .send-btn {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #C9A961, #B8423A);
      border: none;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      flex-shrink: 0;
      position: relative;
      overflow: hidden;

      svg {
        width: 20px;
        height: 20px;
        transition: transform 0.3s ease;
      }
      
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover:not(:disabled) {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
        
        &::before {
          opacity: 1;
        }
        
        svg {
          transform: translateX(2px);
        }
      }
      
      &:active:not(:disabled) {
        transform: scale(0.95);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

.settings-btn,
.export-btn,
.favorites-btn,
.recommend-btn {
  width: 36px;
  height: 36px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 8px;
  color: #C9A961;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    background: rgba(212, 175, 55, 0.25);
    border-color: #C9A961;
    transform: translateY(-2px);
  }
}

.voice-btn {
  width: 44px;
  height: 44px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  color: #C9A961;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: rgba(212, 175, 55, 0.25);
    border-color: #C9A961;
  }
  
  &.active {
    background: linear-gradient(135deg, #C9A961, #B8423A);
    border-color: #C9A961;
    color: #fff;
    animation: pulse 1.5s infinite;
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
  }
}

.message-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(212, 175, 55, 0.15);
  
  .action-btn {
    width: 32px;
    height: 32px;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 6px;
    color: rgba(212, 175, 55, 0.8);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    svg {
      width: 16px;
      height: 16px;
    }
    
    &:hover {
      background: rgba(212, 175, 55, 0.2);
      border-color: #C9A961;
      color: #C9A961;
      transform: translateY(-2px);
    }
    
    &.speaking {
      background: rgba(197, 61, 67, 0.2);
      border-color: #B8423A;
      color: #B8423A;
      animation: pulse 1.5s ease-in-out infinite;
      
      &:hover {
        background: rgba(197, 61, 67, 0.3);
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.settings-panel,
.favorites-panel,
.recommend-panel {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  
  .panel-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1;
  }
  
  .panel-content {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 420px;
    max-width: 90vw;
    background: linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(30, 30, 30, 0.95));
    border: 2px solid rgba(212, 175, 55, 0.5);
    border-right: none;
    border-top: none;
    border-radius: 0 0 0 16px;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    animation: slideIn 0.3s ease;
    z-index: 2;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5), 
                0 0 40px rgba(212, 175, 55, 0.1);
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 20px;
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.08), transparent);
    border-bottom: 2px solid rgba(212, 175, 55, 0.3);
    margin-bottom: 0;
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(10px);
    
    h3 {
      font-size: 22px;
      color: #C9A961;
      margin: 0;
      font-weight: 600;
      letter-spacing: 1px;
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }
    
    .close-btn {
      width: 36px;
      height: 36px;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 8px;
      color: #E8E4D8;
      font-size: 28px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      line-height: 1;
      
      &:hover {
        background: linear-gradient(135deg, rgba(197, 61, 67, 0.3), rgba(197, 61, 67, 0.2));
        border-color: #B8423A;
        transform: rotate(90deg);
      }
    }
  }
}

.settings-panel {
  .panel-content {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: linear-gradient(180deg, rgba(212, 175, 55, 0.15), transparent);
      pointer-events: none;
      border-radius: 0 0 0 0;
    }
  }
  
  .panel-header + .setting-item {
    margin-top: 20px;
  }
  
  .save-settings-btn {
    margin: 48px 28px 32px;
    width: calc(100% - 56px);
  }
}

.favorites-panel {
  .panel-content {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: linear-gradient(180deg, rgba(212, 175, 55, 0.15), transparent);
      pointer-events: none;
      border-radius: 0 0 0 0;
    }
  }
  
  .favorites-list {
    padding: 0 28px;
    padding-top: 20px;
  }
  
  .empty-favorites {
    padding: 20px 28px 60px;
  }
}

.recommend-panel {
  .panel-content {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: linear-gradient(180deg, rgba(212, 175, 55, 0.15), transparent);
      pointer-events: none;
      border-radius: 0 0 0 0;
    }
  }
  
  .recommend-list {
    padding: 0 28px;
    padding-top: 20px;
  }
}

.setting-item {
  padding: 0 28px;
  margin-bottom: 32px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 28px;
    right: 28px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
  }
  
  &:last-of-type {
    &::after {
      display: none;
    }
  }
  
  label {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #E8E4D8;
    margin-bottom: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    
    input[type="checkbox"] {
      margin-right: 12px;
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #C9A961;
    }
  }
  
  .style-options {
    display: flex;
    gap: 12px;
    
    .style-btn {
      flex: 1;
      padding: 14px 20px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.03));
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 12px;
      color: #E8E4D8;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:hover {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.08));
        border-color: rgba(212, 175, 55, 0.5);
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(212, 175, 55, 0.15);
        
        &::before {
          opacity: 1;
        }
      }
      
      &.active {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(197, 61, 67, 0.15));
        border-color: #C9A961;
        color: #C9A961;
        box-shadow: 0 4px 16px rgba(212, 175, 55, 0.25);
        
        &::before {
          opacity: 1;
        }
      }
    }
  }
  
  .font-size-slider {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 0;
    
    input[type="range"] {
      flex: 1;
      height: 6px;
      background: linear-gradient(90deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.3));
      border-radius: 3px;
      outline: none;
      -webkit-appearance: none;
      
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 22px;
        height: 22px;
        background: linear-gradient(135deg, #C9A961, #B8423A);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 3px 10px rgba(212, 175, 55, 0.5);
        transition: all 0.2s ease;
        border: 2px solid rgba(255, 255, 255, 0.2);
        
        &:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.6);
        }
      }
    }
    
    span {
      min-width: 55px;
      text-align: right;
      color: #C9A961;
      font-size: 15px;
      font-weight: 600;
      font-family: 'Courier New', monospace;
    }
  }
}

.save-settings-btn {
  padding: 18px 24px;
  background: linear-gradient(135deg, #C9A961, #B8423A);
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 2px;
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.45);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
  }
}

.favorites-list {
  .favorite-item {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.03));
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 12px;
    padding: 18px;
    margin-bottom: 14px;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(212, 175, 55, 0.05));
      border-color: rgba(212, 175, 55, 0.4);
      transform: translateX(-4px);
      box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.2);
    }
    
    .favorite-content {
      font-size: 14px;
      color: #E8E4D8;
      line-height: 1.7;
      margin-bottom: 14px;
      max-height: 120px;
      overflow-y: auto;
      padding-right: 8px;
      
      &::-webkit-scrollbar {
        width: 4px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: rgba(212, 175, 55, 0.3);
        border-radius: 2px;
        
        &:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      }
    }
    
    .favorite-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .favorite-time {
        font-size: 12px;
        color: rgba(232, 228, 216, 0.5);
        font-weight: 500;
      }
      
      .remove-favorite-btn {
        padding: 8px 16px;
        background: rgba(197, 61, 67, 0.15);
        border: 1px solid rgba(197, 61, 67, 0.3);
        border-radius: 8px;
        color: #B8423A;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(197, 61, 67, 0.25);
          border-color: #B8423A;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(197, 61, 67, 0.2);
        }
      }
    }
  }
}

.empty-favorites {
  text-align: center;
  padding: 80px 24px;
  color: rgba(232, 228, 216, 0.5);
  
  p {
    font-size: 15px;
    letter-spacing: 0.5px;
  }
}

.recommend-list {
  .recommend-item {
    display: flex;
    gap: 14px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.03));
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.08));
      border-color: rgba(212, 175, 55, 0.5);
      transform: translateX(-4px);
      box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.2);
    }
    
    .recommend-image {
      width: 90px;
      height: 90px;
      flex-shrink: 0;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(212, 175, 55, 0.2);
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }
    
    &:hover .recommend-image img {
      transform: scale(1.05);
    }
    
    .recommend-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      h4 {
        font-size: 16px;
        color: #C9A961;
        margin: 0 0 8px 0;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      
      p {
        font-size: 13px;
        color: rgba(232, 228, 216, 0.7);
        margin: 0 0 6px 0;
        
        &.recommend-reason {
          font-size: 12px;
          color: rgba(212, 175, 55, 0.8);
          font-style: italic;
          font-weight: 500;
        }
      }
    }
  }
}

.memory-btn {
  width: 36px;
  height: 36px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 8px;
  color: #C9A961;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    background: rgba(212, 175, 55, 0.25);
    border-color: #C9A961;
    transform: translateY(-2px);
  }
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  
  .card-action-btn {
    width: 32px;
    height: 32px;
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 6px;
    color: #C9A961;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    svg {
      width: 16px;
      height: 16px;
    }
    
    &:hover {
      background: rgba(212, 175, 55, 0.3);
      border-color: #C9A961;
      transform: translateY(-2px);
    }
  }
}

.guide-panel,
.map-nav-panel,
.memory-panel {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  
  .panel-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
  }
  
  .panel-content {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 420px;
    max-width: 90vw;
    background: linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%);
    border-left: 1px solid rgba(212, 175, 55, 0.3);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
    overflow-y: auto;
    animation: slideInRight 0.3s ease;
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 20px;
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.08), transparent);
    border-bottom: 2px solid rgba(212, 175, 55, 0.3);
    margin-bottom: 0;
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(10px);
    
    h3 {
      font-size: 22px;
      color: #C9A961;
      margin: 0;
      font-weight: 600;
      letter-spacing: 1px;
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }
    
    .close-btn {
      width: 36px;
      height: 36px;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 8px;
      color: #E8E4D8;
      font-size: 28px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      line-height: 1;
      
      &:hover {
        background: linear-gradient(135deg, rgba(197, 61, 67, 0.3), rgba(197, 61, 67, 0.2));
        border-color: #B8423A;
        transform: rotate(90deg);
      }
    }
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.guide-content {
  .guide-body {
    padding: 20px;
    
    .guide-image {
      width: 100%;
      height: 200px;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 20px;
      border: 1px solid rgba(212, 175, 55, 0.3);
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .guide-step-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 20px;
      
      .step-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(212, 175, 55, 0.3);
        transition: all 0.3s ease;
        
        &.active {
          background: #C9A961;
          transform: scale(1.2);
        }
      }
    }
    
    .guide-info {
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      
      .guide-title {
        font-size: 18px;
        color: #C9A961;
        margin-bottom: 12px;
      }
      
      .guide-text {
        font-size: 14px;
        color: rgba(232, 228, 216, 0.85);
        line-height: 1.8;
      }
    }
    
    .guide-actions {
      display: flex;
      gap: 12px;
      
      .guide-nav-btn {
        flex: 1;
        padding: 14px;
        background: rgba(212, 175, 55, 0.15);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 10px;
        color: #E8E4D8;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        &:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.25);
          border-color: #C9A961;
        }
        
        &.primary {
          background: linear-gradient(135deg, #C9A961, #B8423A);
          border: none;
          color: #fff;
          font-weight: 600;
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
          }
        }
      }
    }
  }
}

.map-content {
  .map-body {
    padding: 20px;
    
    .map-bridge-info {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 12px;
      padding: 16px;
      
      img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        object-fit: cover;
      }
      
      .bridge-details {
        flex: 1;
        
        h4 {
          font-size: 18px;
          color: #C9A961;
          margin-bottom: 8px;
        }
        
        p {
          font-size: 14px;
          color: rgba(232, 228, 216, 0.7);
          margin-bottom: 4px;
          
          &.bridge-address {
            font-size: 13px;
            color: rgba(232, 228, 216, 0.5);
          }
        }
      }
    }
    
    .map-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
      
      .map-link {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 16px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        
        svg {
          width: 24px;
          height: 24px;
        }
        
        &.amap {
          background: linear-gradient(135deg, #00A870, #0080FF);
          color: #fff;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 168, 112, 0.4);
          }
        }
        
        &.bmap {
          background: linear-gradient(135deg, #2932E1, #4A6CFA);
          color: #fff;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(41, 50, 225, 0.4);
          }
        }
      }
    }
    
    .map-tips {
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 10px;
      padding: 14px;
      
      p {
        font-size: 13px;
        color: rgba(232, 228, 216, 0.7);
        text-align: center;
      }
    }
  }
}

.memory-content {
  .memory-body {
    padding: 20px;
    
    .memory-stats {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      
      .stat-item {
        flex: 1;
        background: rgba(212, 175, 55, 0.08);
        border: 1px solid rgba(212, 175, 55, 0.2);
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        
        .stat-value {
          display: block;
          font-size: 28px;
          font-weight: 700;
          color: #C9A961;
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 13px;
          color: rgba(232, 228, 216, 0.6);
        }
      }
    }
    
    .memory-actions {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
      
      .memory-action-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px;
        background: rgba(212, 175, 55, 0.15);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 10px;
        color: #E8E4D8;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        svg {
          width: 18px;
          height: 18px;
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        &:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.25);
          border-color: #C9A961;
          transform: translateY(-2px);
        }
        
        &.danger {
          background: rgba(197, 61, 67, 0.15);
          border-color: rgba(197, 61, 67, 0.3);
          color: #B8423A;
          
          &:hover:not(:disabled) {
            background: rgba(197, 61, 67, 0.25);
            border-color: #B8423A;
          }
        }
      }
    }
    
    .memory-list {
      .memory-item {
        background: rgba(212, 175, 55, 0.08);
        border: 1px solid rgba(212, 175, 55, 0.2);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 12px;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(212, 175, 55, 0.12);
          border-color: rgba(212, 175, 55, 0.4);
        }
        
        .memory-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          
          .memory-date {
            font-size: 13px;
            color: rgba(232, 228, 216, 0.7);
          }
          
          .memory-count {
            font-size: 12px;
            color: #C9A961;
            background: rgba(212, 175, 55, 0.15);
            padding: 4px 10px;
            border-radius: 12px;
          }
        }
        
        .memory-summary {
          font-size: 14px;
          color: #E8E4D8;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        
        .memory-item-actions {
          display: flex;
          gap: 8px;
          
          .memory-item-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            background: rgba(212, 175, 55, 0.15);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 8px;
            color: #E8E4D8;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s ease;
            
            svg {
              width: 14px;
              height: 14px;
            }
            
            &:hover {
              background: rgba(212, 175, 55, 0.25);
              border-color: #C9A961;
            }
            
            &.delete {
              color: #B8423A;
              border-color: rgba(197, 61, 67, 0.3);
              
              &:hover {
                background: rgba(197, 61, 67, 0.2);
                border-color: #B8423A;
              }
            }
          }
        }
      }
    }
    
    .empty-memory {
      text-align: center;
      padding: 60px 20px;
      
      .empty-icon {
        font-size: 64px;
        margin-bottom: 16px;
      }
      
      p {
        font-size: 15px;
        color: rgba(232, 228, 216, 0.7);
        margin-bottom: 8px;
        
        &.empty-tip {
          font-size: 13px;
          color: rgba(232, 228, 216, 0.5);
        }
      }
    }
  }
}
</style>
