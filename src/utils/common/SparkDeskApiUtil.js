import CryptoJS from 'crypto-js'
import { useUserStore } from "@/store/modules/useUserStore.js";

let httpUrl = new URL("https://spark-api.xf-yun.com/v3.5/chat");
let modelDomain;

const APPID = 'ab741ad5'
const API_SECRET = 'YzU1OWI1Y2VkYTMyMWUyZTc3ZTZhZDNk'
const API_KEY = '373b60a8f778e003893db76ca49008f6'

const systemPrompt = `你是一个专业的中国古代建筑知识助手，名为"筑小灵"。你的任务是回答用户关于中国古代建筑的问题。

请遵循以下规则：
1. 专注于中国古代建筑（1911年以前）相关的话题
2. 提供准确、专业、有深度的回答
3. 如果用户问的问题与中国古代建筑无关，请礼貌地引导话题
4. 回答要简洁明了，避免过于冗长
5. 语气要亲切可爱，可以适当使用"呢~"、"呀~"等语气词

你可以回答的问题类型包括：
- 建筑类型：民居、官府、皇宫、桥梁等
- 结构形式：抬梁式、穿斗式、榫卯结构、斗拱等
- 建筑特点：屋顶形式、装饰艺术、色彩运用等
- 代表建筑：故宫、徽派建筑、江南园林、土楼等
- 建筑智慧：抗震设计、通风采光、排水系统等`

function getWebsocketUrl() {
    switch (httpUrl.pathname) {
        case "/v1.1/chat":
            modelDomain = "general";
            break;
        case "/v2.1/chat":
            modelDomain = "generalv2";
            break;
        case "/v3.1/chat":
            modelDomain = "generalv3";
            break;
        case "/v3.5/chat":
            modelDomain = "generalv3.5";
            break;
    }

    return new Promise((resolve, reject) => {
        let apiKey = API_KEY
        let apiSecret = API_SECRET

        let url = 'wss://' + httpUrl.host + httpUrl.pathname
        let host = location.host
        let date = new Date().toUTCString()
        let algorithm = 'hmac-sha256'
        let headers = 'host date request-line'
        let signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrl.pathname} HTTP/1.1`
        let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
        let signature = CryptoJS.enc.Base64.stringify(signatureSha)
        let authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
        let authorization = btoa(authorizationOrigin)
        url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
        resolve(url)
    })
}

function getMessageList() {
    const userStore = useUserStore()
    return userStore.chatMessage
}

export default class TTSRecorder {
    constructor({ appId = APPID } = {}) {
        this.appId = appId
        this.status = 'init'
        this.total_res = ''
    }

    setStatus(status) {
        this.onWillStatusChange && this.onWillStatusChange(this.status, status)
        this.status = status
    }

    connectWebSocket() {
        this.setStatus('ttsing')
        const userStore = useUserStore()
        userStore.setTyping(true)
        return getWebsocketUrl().then(url => {
            let ttsWS
            if ('WebSocket' in window) {
                ttsWS = new WebSocket(url)
            } else if ('MozWebSocket' in window) {
                ttsWS = new MozWebSocket(url)
            } else {
                alert('浏览器不支持WebSocket')
                return
            }
            this.ttsWS = ttsWS
            ttsWS.onopen = e => {
                this.webSocketSend()
            }
            ttsWS.onmessage = e => {
                this.result(e.data)
            }
            ttsWS.onerror = e => {
                clearTimeout(this.playTimeout)
                this.setStatus('error')
            }
            ttsWS.onclose = e => {
            }
        })
    }

    webSocketSend() {
        const messageList = getMessageList()

        const messagesForAPI = [
            {
                role: 'system',
                content: systemPrompt
            },
            ...messageList.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ]

        let params = {
            "header": {
                "app_id": this.appId
            }, "parameter": {
                "chat": {
                    "domain": "generalv3.5",
                    "temperature": 0.7,
                    "max_tokens": 2048
                }
            }, "payload": {
                "message": {
                    "text": messagesForAPI
                }
            }
        }
        messageList.push({
            role: 'assistant',
            content: ''
        })
        this.ttsWS.send(JSON.stringify(params))
    }

    start() {
        this.total_res = ""
        const messageList = getMessageList()

        if (!API_KEY || !API_SECRET || !APPID) {
            const lastUserMessage = messageList[messageList.length - 1]
            if (lastUserMessage && lastUserMessage.role === 'user') {
                messageList.push({
                    role: 'assistant',
                    content: '抱歉，AI服务暂时不可用。请稍后再试。'
                })
                this.status = "init"
            }
            return
        }

        this.connectWebSocket()
    }

    result(resultData) {
        const messageList = getMessageList()
        const userStore = useUserStore()
        let jsonData = JSON.parse(resultData)
        this.total_res = this.total_res + jsonData['payload']['choices']['text'][0]['content']
        messageList[messageList.length - 1].content = this.total_res

        if (jsonData.header.code !== 0) {
            userStore.setTyping(false)
            alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
            console.error(`${jsonData.header.code}:${jsonData.header.message}`)
            return
        }
        if (jsonData.header.code === 0 && jsonData.header.status === 2) {
            this.ttsWS.close()
            this.status = "init"
            userStore.setTyping(false)
        }
    }
}
