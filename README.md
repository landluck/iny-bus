
<h3 align="center" style="margin: 30px 0 35px;">iny bus 事件中心</h3>


<p align="center">
    <img src="https://img.shields.io/npm/v/iny-bus.svg?style=flat-square" alt="npm version" />
    <img src="https://codecov.io/gh/landluck/iny-bus/branch/master/graph/badge.svg" alt="Coverage Status" />
    <img src="https://travis-ci.org/landluck/iny-bus.svg?branch=master" alt="Build Status" />
    <img src="https://img.shields.io/npm/dt/iny-bus.svg?style=flat-square" alt="downloads" />
    <img src="https://img.shields.io/npm/dm/iny-bus.svg?style=flat-square" alt="downloads" />
    <img src="https://img.badgesize.io/https://unpkg.com/iny-bus/dist/index.js?compression=gzip&style=flat-square&label=JS%20gzip%20size" alt="JS Gzip Size" />
</p>

<p align='center'>如果对你有帮助或者有任何收获、点个 赞，给个星星，鼓励一下作者😄<p>



## 介绍

  在各种小程序中，我们经常会遇到 这种情况

  有一个 列表，点击列表中的一项进入详情，详情有个按钮，删除了这一项，这个时候当用户返回到列表页时，发现列表中的这一项依然存在，
  这种情况，就是一个 `bug`
  
  
  那我们怎么解决这个问题呢
  
  有的人会将所有请求放到 生命周期 `onShow` 中，只要我们页面显示，就会重新请求，诚然，这也是解决问题的一个办法

  但是，所有请求放置于 `onShow` 中，就会造成服务器压力，多余的请求，用户体验不好的问题

  那么，有别的解决办法吗

  有，有的同学说，我可以用 `getCurrentPages` 获取页面栈，然后找到对应的 页面实例，调用实例方法，去刷新数据

  这也是解决问题的一个办法，然而，当你需要刷新tab页呢，需要刷新两个页面呢，三个页面呢，是不是要处理很多

  `iny-bus` 就是一个非常好的解决方法，请求放置于 `onLoad，数据随时随地刷新，便于控制，代码量极小，经过业务考验`

  只要是能运行 `js` 的地方，`iny-bus` 就支持


## 功能

* 100% 测试用例覆盖
* 兼容各大平台小程序
* 支持 TS
* [文档地址](https://landluck.github.io/iny-bus/docs)

## 安装

### 方式一. 通过 npm 安装

小程序已经支持使用 npm 安装第三方包，详见 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)

```bash
# npm
npm i iny-bus -save

# yarn
yarn add iny-bus --production
```

### 方式二. 下载代码

直接通过 git 下载 iny-bus 源代码，并将`dist`目录 中的 index.js 拷贝到自己的项目中

```bash
git clone https://github.com/landluck/iny-bus.git
```

## 使用

### 使用内置方法

```javascript

  // App、Page、Component 使用方法一致
  import bus from 'iny-bus'

  // bus.app bus.page bus.component
  const page = bus.page({
    busEvents: {
      // 简单使用
      postMessage(msg) {
        this.setData({
          msg
        })
      },
      // 一次性事件
      postMessageOnce: {
        handler (msg) {
          this.setData({
            msg
          })
        },
        once: true
      }
    },
    onLoad() {
      bus.emit('postMessage', 'hello bus')
      bus.emit('postMessageOnce', 'hello bus once')
    }
  })

  Page(page)

```

### 在生命周期中使用

```javascript

  // 小程序
  import bus from 'iny-bus'

  // 添加事件监听
  // 在 onLoad 中注册, 避免在 onShow 中使用
  onLoad () {
    this.eventId = bus.on('事件名', (a, b, c, d) => {
      // 支持多参数
      console.log(a, b, c, d)

      this.setData({
        a,
        b,
        c
      }
    })
  }

  // 移除事件监听，该函数有两个参数，第二个事件id不传，会移除整个事件监听，传入ID，会移除该页面的事件监听，避免多余资源浪费, 在添加事件监听后，页面卸载(onUnload)时建议移除
  onUnload () {
    bus.remove('事件名', this.eventId)
  }
 
  // 派发事件，触发事件监听处更新视图
  // 支持多参传递
  onClick () {
    bus.emit('事件名', a, b, c)
  }
  
  // 清空所有事件监听
  onClear () {
    bus.clear()
  }
 
```

2. 是否可以在 `Vue` 中使用呢

    可以，当 `Vue` 的项目使用 `keep-alive` 后，页面数据会被缓存，生命周期函数不会执行，虽然有 `activited` 生命周期供我们使用，但是它每次都会执行，我们只需要想让它刷新的时候刷新, 是可以使用的，当让，`Vue` 中也有解决方案，比如说，`Vuex`，`event bus` 事件总线，总的来说，用在各大平台的原生小程序更为合适
    
3. 有没有必要在 `taro` 、`uni-app ` 中使用呢
   
    没必要，因为各大跨段框架内部都实现了事件机制，大家可以使用框架内部提供的，我们这里只建议在 原生小程序中使用

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
