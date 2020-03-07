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
  onInput(e) {
    this.setData({
      value: e.detail.value
    })
  },
  submit() {
    bus.emit('postMessage', '我是日志页面:' + this.data.value)
  }
})
