import { WebSocketServer, WebSocket } from 'ws'
import type { IncomingMessage } from 'http'
import type { H3Event } from 'h3'

interface Client extends WebSocket {
  userId?: string
  isAlive: boolean
}

let wss: WebSocketServer | null = null
const clients = new Map<string, Client[]>()

export function initWebSocketServer() {
  if (wss) return wss

  wss = new WebSocketServer({ 
    noServer: true,
    path: '/ws',
  })

  wss.on('connection', (ws: Client, request: IncomingMessage) => {
    const url = new URL(request.url || '', 'http://localhost')
    const token = url.searchParams.get('token')

    if (!token) {
      ws.close(4001, 'Unauthorized')
      return
    }

    // In a real app, verify the token here
    const userId = token // Simplified for demo
    ws.userId = userId
    ws.isAlive = true

    // Add client to map
    if (!clients.has(userId)) {
      clients.set(userId, [])
    }
    clients.get(userId)?.push(ws)

    console.log(`Client connected: ${userId}`)

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString())
        handleWebSocketMessage(ws, message)
      } catch (error) {
        console.error('WebSocket message error:', error)
      }
    })

    ws.on('pong', () => {
      ws.isAlive = true
    })

    ws.on('close', () => {
      const userClients = clients.get(userId) || []
      const index = userClients.indexOf(ws)
      if (index > -1) {
        userClients.splice(index, 1)
      }
      if (userClients.length === 0) {
        clients.delete(userId)
      }
      console.log(`Client disconnected: ${userId}`)
    })

    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
    })

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connected',
      message: 'Connected to WebSocket server',
    }))
  })

  // Heartbeat to detect dead connections
  const interval = setInterval(() => {
    wss?.clients.forEach((ws: Client) => {
      if (!ws.isAlive) {
        return ws.terminate()
      }
      ws.isAlive = false
      ws.ping()
    })
  }, 30000)

  wss.on('close', () => {
    clearInterval(interval)
  })

  return wss
}

function handleWebSocketMessage(ws: Client, message: any) {
  console.log('Received message:', message)

  // Handle different message types
  switch (message.type) {
    case 'ping':
      ws.send(JSON.stringify({ type: 'pong' }))
      break
    case 'subscribe':
      // Subscribe to specific channels
      break
    case 'task:update':
      // Broadcast task update to other clients
      broadcastToUser(ws.userId!, {
        type: 'task:update',
        data: message.data,
      }, ws)
      break
  }
}

export function broadcastToUser(userId: string, message: any, excludeWs?: WebSocket) {
  const userClients = clients.get(userId) || []
  const data = JSON.stringify(message)

  userClients.forEach((client) => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

export function broadcastToAll(message: any) {
  const data = JSON.stringify(message)

  clients.forEach((userClients) => {
    userClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })
}

export function getWebSocketServer() {
  return wss
}
