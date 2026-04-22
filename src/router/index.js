import { createRouter, createWebHashHistory } from 'vue-router'
import WelcomeView from '@/views/home/WelcomeView.vue'
import HomeView from '@/views/home/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: WelcomeView,
        meta: { title: '首页入口', isWelcome: true }
    },
    {
        path: '/main',
        name: 'Main',
        component: HomeView,
        redirect: '/main/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/DashboardView.vue'),
                meta: { title: '桥影流光', icon: '🌉' }
            },
            {
                path: 'wordcloud-only',
                name: 'wordcloud-only',
                component: () => import('@/views/analysis/WordCloudOnlyView.vue'),
                meta: { title: '词云分析', icon: '☁️' }
            },
            {
                path: 'height',
                name: 'height',
                component: () => import('@/views/bridge/HeightView.vue'),
                meta: { title: '跨度传奇', icon: '📏' }
            },
            {
                path: 'culture',
                name: 'culture',
                component: () => import('@/views/bridge/BridgeCultureGraph.vue'),
                meta: { title: '文化图谱', icon: '🕸️' }
            },

            {
                path: 'bridge/:id',
                name: 'bridge-detail',
                component: () => import('@/views/bridge/BridgeDetailView.vue'),
                meta: { title: '古桥详情', icon: '🌉', hidden: true }
            },
            {
                path: 'assistant',
                name: 'assistant',
                component: () => import('@/views/assistant/AssistantView.vue'),
                meta: { title: '桥灵问答', icon: '🤖' }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/error/NotFoundView.vue')
    }
]

const router = createRouter(
    {
        history: createWebHashHistory(),
        routes: routes,
        linkActiveClass: 'is-active',
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return { top: 0, left: 0 }
            }
        }
    }
)

export default router
