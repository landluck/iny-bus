//index.js
import bus from '../../plugins/iny-bus/index.js'
//获取应用实例
const app = getApp()

Page({
  data: {
   msg: [
     '默认消息'
   ]
  },
  onLoad: function () {
    
    this.eventId = bus.on('postMessage', (msg) => {
     
      this.setData({
        msg: this.data.msg.concat([msg])
      })

    })

  },
  onUnload () {
    bus.remove('postMessage', this.eventId)
  }
})
