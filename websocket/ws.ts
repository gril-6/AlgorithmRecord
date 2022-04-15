/*
 * @Descripttion:
 * @version:
 * @Author: hanjing
 * @Date: 2022-03-31 15:50:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-31 17:06:22
 */
// 导入WebSocket模块
import WebSocket from 'ws'
// 引入Server类
const WebSocketServer = WebSocket.Server
// 实例化 在3000端口上打开了一个WebSocket Server,
const wss = new WebSocketServer({ port: 3000 })

// 当有WebSocket接入时，wss可以响应connection事件处理
wss.on('connection', function (ws) {
  console.log(`[SERVER] connection()`)
  ws.on('message', function (message) {
    console.log(`[SERVER] Received: ${message}`)
    ws.send(`ECHO:${message}`, (err) => {
      if (err) {
        console.log(`[SERVER] error: ${err}`)
      }
    })
  })
})
