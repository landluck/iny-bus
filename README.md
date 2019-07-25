
<h3 align="center" style="margin: 30px 0 35px;">iny bus 事件中心</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/iny-bus.svg?style=flat-square" alt="npm version" />
    <img src="https://img.shields.io/codecov/c/github/landluck/iny-bus/dev.svg?style=flat-square" alt="Coverage Status" />
    <img src="https://travis-ci.org/landluck/iny-bus.svg?branch=master" alt="Build Status" />
    <img src="https://img.shields.io/npm/dt/iny-bus.svg?style=flat-square" alt="downloads" />
    <img src="https://img.shields.io/npm/dm/iny-bus.svg?style=flat-square" alt="downloads" />
    <!-- <img src="https://img.badgesize.io/https://unpkg.com/iny-bus/lib/iny-bus.es5.js?compression=gzip&style=flat-square&label=JS%20gzip%20size" alt="JS Gzip Size" /> -->
</p>

## Features

* 100% Unit test coverage
* Extensive documentation and demos
* Support TS

## Install

```bash
# Using npm
npm i iny-bus -S

# Using yarn
yarn add iny-bus
```

## Quickstart


```javascript
  import bus from 'iny-bus'

  // 添加事件监听
  // 提供的函数必须为箭头函数，如果不为箭头函数，会出现this丢失问题
  // 最好 在 onLoad 中注册 
  this.eventId = bus.on('事件名', (a, b, c, d) => {
    // 支持多参数
    console.log(a, b, c, d)
  })

  // 移除事件监听，该函数有两个参数，第二个事件id不传，会移除整个事件监听，传入ID，会移除该页面的事件监听，避免内存泄漏, 在添加事件监听后，页面卸载(onUnload)时必须移除
  bus.remove('事件名', this.eventId)

  // 派发事件，触发事件监听处更新视图
  // 支持多参数
  bus.emit('事件名', a, b, c)

```

See more in [Quickstart](https://youzan.github.io/iny-bus/quickstart).

## Contribution

Please make sure to read the [Contributing Guide](./.github/CONTRIBUTING.md) before making a pull request.

## Browser Support

Modern browsers and Android 4.0+, iOS 6+.


<!-- ## Preview

You can scan the following QR code to access the demo：

<img src="https://img.yzcdn.cn/iny-bus/preview_qrcode_20180528.png" width="220" height="220" > -->

<!-- ## Wechat Group

Scan the qrcode to join our wechat discussion group, please note that you want to join iny-bus discussion group.

<img src="https://img.yzcdn.cn/iny-bus/wechat_20180606.png" width="220" height="292" > -->

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
