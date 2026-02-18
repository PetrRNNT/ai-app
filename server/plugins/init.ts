import { defineNitroPlugin } from 'nitropack/runtime'

export default defineNitroPlugin(() => {
  console.log('Enterprise TodoList server started')
  // WebSocket will be initialized on first request
})
