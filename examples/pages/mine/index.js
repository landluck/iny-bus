
//logs.js
const util = require('../../utils/util.js')
import bus from '../../plugins/iny-bus/index.js'

Page({
  data: {
    logs: [],
    value: ''
  },
  onLoad: function () {
    
  },
  onInput (e) {
    this.setData({
      value: e.detail.value
    })
  },
  submit () {
    bus.emit('postMessage', '我是我的页面:' + this.data.value)
  },
  call () {
    bus.emit('callMe', '10010')
  },
  remind () {
    bus.emit('remindMe', '10010')
  }
})
