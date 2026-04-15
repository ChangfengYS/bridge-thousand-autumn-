import { defineStore } from "pinia"
import { parse, stringify } from "JSON";

const CHAT_VERSION = '1.2'

const getDefaultMessages = () => [{
    role: "user",
    content: "你好，我想了解中国古代建筑！"
}, {
    role: "assistant",
    content: "您好呀~我是筑小灵，可以为您解答关于中国传统建筑的各种问题呢！您可以询问我关于建筑类型、结构特点、历史演变、代表作品等方面的问题。下面提供了一些咨询示例~(有时回答可能稍微会有延迟，请耐心等待哦)"
}]

export const useUserStore = defineStore('user', {
    state: () => ({
        chatMessage: getDefaultMessages(),
        version: CHAT_VERSION,
        isTyping: false
    }),
    getters: {},
    actions: {
        resetChat() {
            this.chatMessage = getDefaultMessages()
            this.version = CHAT_VERSION
        },
        setTyping(status) {
            this.isTyping = status
        }
    },
    persist: {
        enabled: true,
        storage: sessionStorage,
        serializer: {
            deserialize: parse,
            serialize: stringify
        },
        afterRestore: (ctx) => {
            if (ctx.store.version !== CHAT_VERSION) {
                ctx.store.resetChat()
            }
        }
    }
})
