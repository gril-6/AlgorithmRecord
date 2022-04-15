# `Websocket`

1. 将浏览器和服务端建立一个双向通信

2. 因为`http`协议必须要浏览器发出请求，服务端响应，将数据返回给浏览器，服务端不能主动发数据

## `websocket`协议

- 利用`http`协议建立连接
- 必须由浏览器发起
- 请求如下:point_down:

![image-20220331152222535](C:\Users\15924\AppData\Roaming\Typora\typora-user-images\image-20220331152222535.png)

- 响应如下:point_down:

![image-20220331152146159](C:\Users\15924\AppData\Roaming\Typora\typora-user-images\image-20220331152146159.png)

- **响应含义**
  1. `101`表示本次连接`http`协议将被更改，更改为`websocket`
  2. 版本号规定双方数据格式和是否支持压缩
  3. 建立成功，可以随时主动发消息
  4. **消息**：文本，二进制



 

