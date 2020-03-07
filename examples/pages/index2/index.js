//index.js
import bus from '../../plugins/iny-bus/index.js'
//获取应用实例
const app = getApp()
  Page(bus.page({
    data: {
      msg: ['简化用法消息']
    },
    inyEvents: {
      postMessage(msg) {
        this.setData({
          msg: this.data.msg.concat([msg])
        })
      },
      callMe: {
        handler(mobile) {
          wx.showToast({
            icon: 'none',
            title: `有电话来了，去简化页查看`
          })
          this.setData({
            msg: this.data.msg.concat([`${mobile} 给你打电话了`])
          })
        }
      },
      remindMe: {
        handler(mobile) {
          wx.showToast({
            icon: 'none',
            title: `${mobile} 给你打电话了,只提示一次哦`
          })
          this.setData({
            msg: this.data.msg.concat([`${mobile} 给你打电话了,只提示一次哦`])
          })
        },
        once: true
      }
    },
    onLoad() {
      console.log(this)
    }
  }))
