import { ref, onMounted, onUnmounted } from 'vue'

interface WebSocketMessage {
  type: string
  data?: any
  message?: string
}

export function useWebSocket() {
  const ws = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const lastMessage = ref<WebSocketMessage | null>(null)

  const connect = (token: string) => {
    if (ws.value) {
      return
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${protocol}//${window.location.host}/ws?token=${token}`

    try {
      ws.value = new WebSocket(wsUrl)

      ws.value.onopen = () => {
        isConnected.value = true
        console.log('WebSocket connected')
      }

      ws.value.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          lastMessage.value = message
          handleWebSocketMessage(message)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      ws.value.onclose = () => {
        isConnected.value = false
        console.log('WebSocket disconnected')
      }

      ws.value.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error)
    }
  }

  const disconnect = () => {
    if (ws.value) {
      ws.value.close()
      ws.value = null
      isConnected.value = false
    }
  }

  const send = (message: any) => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(JSON.stringify(message))
    }
  }

  const handleWebSocketMessage = (message: WebSocketMessage) => {
    switch (message.type) {
      case 'connected':
        console.log('Connected to WebSocket server')
        break
      case 'pong':
        break
      case 'task:update':
        console.log('Task updated:', message.data)
        break
      case 'task:create':
        console.log('Task created:', message.data)
        break
      case 'task:delete':
        console.log('Task deleted:', message.data)
        break
    }
  }

  onMounted(() => {
    const authStore = useAuthStore()
    if (authStore.token && authStore.isAuthenticated) {
      connect(authStore.token)
    }
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    ws,
    isConnected,
    lastMessage,
    connect,
    disconnect,
    send,
  }
}
