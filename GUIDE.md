#### 背景介绍

    在各种小程序中，我们经常会遇到 这种情况

	  有一个 列表，点击列表中的一项进入详情，详情有个按钮，删除了这一项，这个时候当用户返回到列表页时，发现列表中的这一项依然存在，
	  
	  这种情况，就是一个 `bug`，也就是数据不同步问题，这个时候测试小姐姐肯定会找你，让你解决，这个时候，你也许会很快速的解决，但
    过一会儿，测试小姐姐又来找你说，我打开了四五个页面更改了用户状态，但我一层一层返回到首页，发现有好几个页面数据没有刷新，也是
    一个 bug，这个时候你就犯愁了，怎么解决，常规方法有下面几种
  
  
#### 解决方法
  
	  1. 将所有请求放到 生命周期 `onShow` 中，只要我们页面重新显示，就会重新请求，数据也会刷新
	  2. 通过用 `getCurrentPages` 获取页面栈，然后找到对应的 页面实例，调用实例方法，去刷新数据
	  3. 通过设置一个全局变量，例如 App.globalData.xxx，通过改变这个变量的值，然后在对应 onShow 
	  	 中检查，如果值已改变，刷新数据
	  4. 在打开详情页时，使用 redirectTo 而不是 navigateTo，这样在打开新的页面时，会销毁当前页面，
	     返回时就不会回到这个里面，自然也不会有数据不同步问题
	  
#### 存在的问题

    1. 假如我们将 所有 请求放到 onShow 生命周期中，自然能解决所有数据刷新问题，但是 onShow 这个生命周期，有两个问题
      第一个问题，它其实是在 onLoad 后面执行的，也就是说，假如请求耗时相同，从它发起请求到页面渲染，会比 onLoad 慢
      第二个问题，那就是页面隐藏、调用微信分享、锁频等等都会触发执行，请求放置于 `onShow` 中，就会造成大量不需要的请求，造成服务器
      压力，多余的资源浪费、也会造成用户体验不好的问题

    2. 通过 `getCurrentPages` 获取页面栈，然后找到对应的 页面实例，调用实例方法，去刷新数据，这也不失为一个办法，但是就如微信官方文档所说
  
      > 不要尝试修改页面栈，会导致路由以及页面状态错误。
      > 不要在 App.onLaunch 的时候调用 `getCurrentPages()`，此时 page 还没有生成。

      同时、当需要通信的页面有两个、三个、多个呢，这里去使用 `getCurrentPages` 就会比较困难、繁琐

    3. 通过设置全局变量的方法，当需要使用的地方比较少时，可以接受，当使用的地方多的时候，维护起来就会很困难，代码过于臃肿，也会有很多问题

    4. 使用 redirectTo 而不是 navigateTo，从用来体验来说，很糟糕，并且只存在一个页面，对于 tab 页面，它也无能为力，不推荐使用

#### 最佳实践

    在 Vue 中， 可以通过 new Vue() 来实现一个 event bus作为事件总线，来达到事件通知的功能，在各大框架中，也有自身的事件机制实现，那么我们完全可以通过同样的方法，实现一个事件中心，来管理我们的事件，同时，解决我们的问题。iny-bus 就是这样一个及其轻量的事件库,使用 typescript 编写，100% 测试覆盖率，能运行 js 的环境，就能使用


  传送门
  [源码](https://github.com/landluck/iny-bus)
  [NPM](https://www.npmjs.com/package/iny-bus)
  [文档](https://landluck.github.io/iny-bus/docs/)


#### 简单使用

    iny-bus 使用及其简单，在需要的页面 onLoad 中添加事件监听， 在需要触发事件的地方派发事件，使监听该事件的每个页面执行处理函数，达到通信和刷新数据的目的，在小程序中的使用可以参考以下代码

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
          // 调用页面请求函数，刷新数据
          this.refreshPageData()
        })

        // 添加只需要执行一次的 事件监听

        this.eventIdOnce = bus.once('事件名', () => {
          // do some thing
        })
      }

      // 移除事件监听，该函数有两个参数，第二个事件id不传，会移除整个事件监听，传入ID，会移除该页面的事件监听，避免多余资源浪费, 在添加事件监/// 听后，页面卸载(onUnload)时建议移除

      onUnload () {
        bus.remove('事件名', this.eventId)
      }
    
      // 派发事件，触发事件监听处更新视图
      // 支持多参传递
      onClick () {
        bus.emit('事件名', a, b, c)
      }
    
    ```

  更详细的使用和例子可以参考 [Github iny-bus 小程序代码](https://github.com/landluck/iny-bus/tree/master/examples)



#### iny-bus 具体实现

  1. iny-bus 我们是使用 typescript 编写，同时要发布到 npm 上供大家使用，那我们就需要搭建开发环境，选择编辑打包工具，编写发布脚本，具体的细节这里不讲，只列举以下使用到的工具和库

  * 基本打包工具，这里使用非常优秀的开源库 [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)，具体细节不展开

  * 测试工具 使用 facebook 的 [jest](https://github.com/facebook/jest)

  * build ci 使用 [travis-ci](https://www.travis-ci.org/）

  * 测试覆盖率上传使用 [codecov](https://codecov.io/)

  * 具体的其他细节大家可以看源码中的 [package.json](https://github.com/landluck/iny-bus/blob/master/package.json)，这里就一一展开讲了，我们来看具体实现

  2. 具体实现

  * 首先，我们来设计我们的事件中心，iny-bus 作为事件中心，我们就需要一个容器来储存我们的事件，同时我们不希望，使用者可以直接访我们的容器，所以我们就需要私有化,例如这样

  ```typescript



    class EventBus {

      private events: any[] = []

    }

  ```

  * 然后，我们的事件中心希望拥有那些能力呢，比如说事件监听 on，监听了就需要派发 emit, 也就需要移除 remove,移除就需要查找，我们也需要一次性事件，比如说 once，大概是这样子

  ```typescript

    interface EventBus {

      // 监听，我们需要知道一个事件名字，也需要一个 派发时的执行函数，同时，我们返回一个 id 给使用者，方便使用者移除 事件监听
      on(name: string, execute: Function): string

      // once 和 on在使用创建和使用时，没什么区别，唯一的区别就在 执行一次后移除，所以在创建时 和 on 没有任何区别
      once(name: string, execute: Function): string

      // remove, 前面提到了我们需要删除事件监听，那我们就需要 事件名称，为了多个页面可以监听同一个事件，所以我们不能一次性把该事件监听全部移除
      // 那么我们就用到 创建 事件时的 id 了, 同时，我们返回 我们的事件中心，可以链式调用
      remove(name: string, eventId?: string): EventBus

      // emit 我们需要告诉系统，我们需要派发的事件名和所携带的参数，同时返回 事件实例
      emit(name: string, ...args: any[]): EventBus

      // find 函数返回一个联合类型，有可能存在 该事件，也有可能返回 null
      find(name: string): Event | null
  
    }

  ```

  * 上面我们大概设计好我们的事件中心了，这个时候，我们需要明确，我们的每一个事件所拥有的能力和属性

  ```typescript

    // 每一个东西，都有一个名字，方便记忆和寻找，我们的事件也需要一个 name，同时，我们的每一个事件，都有可能被监听 n 次，那么我们就需要
    // 每个事件来有一个容器，存放每个事件的执行者

    interface Event {

      // 名称
      name: string

      // 执行者容器
      executes: Execute[]
    }

    // 我们也需要确定每个执行者的类型，为了能精确的找到执行者，所以需要一个 id，这也是 用来删除的id， 这里的 eventType 是来标示是否是一次性执行者， execute 则为每个执行者的执行函数
    interface Execute {
      id: string
      eventType: EventType
      execute: Function
    }

  ```

  * 在上面，我们提到了 eventType，这是为了标示是否为 一次性执行者，在 typescript 中，没有比 枚举 更适合这种情况了

  ```javascript

  // 申明事件执行者的类型

  type EventType = 1 | 2


  enum EventTypeEnum {
    // 普通事件
    NORMAL_EVENT = 1,
    // 一次性事件
    ONCE_EVENT = 2
  }

  ```


  * 基本的类型是定义完了，我们来写具体实现的代码，第一步，实现 on once 方法

  ```typescript

    
    class EventBus {

      /**
      * 储存事件的容器
      */
      private events: Event[] = []

      /**
      * on 新增事件监听
      * @param name 事件名
      * @param execute 回调函数
      * @returns { string } eventId 事件ID，用户取消该事件监听
      */


      on(name: string, execute: Function): string {
        
        // 因为 on 和 once 在新建上没什么区别，所以这里我们统一使用 addEvent, 但为了区分 on 和 once，我们传入了 EventType
        return this.addEvent(name, EventTypeEnum.NORMAL_EVENT, execute)
      }

      /**
      * one 只允许添加一次事件监听
      * @param name 事件名
      * @param execute 回调函数
      * @returns { string } eventId 事件ID，用户取消该事件监听
      */

      once(name: string, execute: Function): string {
        // 同理 on
        return this.addEvent(name, EventTypeEnum.ONCE_EVENT, execute)
      }

    }


  ```

  * 实现 addEvent 方法

  ```typescript

    class EventBus {

      /**
       * 添加事件的方法
      * @param name
      * @param execute
      */

      private addEvent(name: string, eventType: EventType, execute: Function): string {
        const eventId = createUid()

        const events = this.events

        const event = this.find(name)

        if (event !== null) {
          event.executes.push({ id: eventId, eventType, execute })

          return eventId
        }

        events.push({
          name,
          executes: [
            {
              id: eventId,
              eventType,
              execute
            }
          ]
        })

        return eventId
      }

    }

  ```

  * 实现 find 方法

  ```typescript
  
    class EventBus {
      /**
       * 查找事件的方法
      * @param name
      */

      find(name: string): Event | null {
        const events = this.events

        for (let i = 0; i < events.length; i++) {
          if (name === events[i].name) {
            return events[i]
          }
        }

        return null
      }
    }

  ```

  * 实现 remove 方法

  ```typescript
  
    class EventBus {
      /**
       * remove 移除事件监听
      * @param name 事件名
      * @param eventId 移除单个事件监听需传入
      * @returns { EventBus } EventBus EventBus 实例
      */

      remove(name: string, eventId: string): EventBus {
        const events = this.events

        for (let i = 0; i < events.length; i++) {
          if (events[i].name === name) {
            // 移除具体的操作函数
            if (eventId && events[i].executes.length > 0) {
              const eventIndex = events[i].executes.findIndex(item => item.id === eventId)

              if (eventIndex !== -1) {
                events[i].executes.splice(eventIndex, 1)
              }
            } else {
              events.splice(i, 1)
            }

            return this
          }
        }

        return this
      }
    }

  ```

   * 实现 emit 方法

  ```typescript
  
    class EventBus {
      /**
       * emit 派发事件
      * @param name 事件名
      * @param args 其余参数
      * @returns { EventBus } EventBus EventBus 实例
      */

      emit(name: string, ...args: any[]): EventBus {
        const events = this.events

        for (let i = 0; i < events.length; i++) {
          if (name === events[i].name) {
            const funcs = events[i].executes

            funcs.forEach((item, i) => {
              item.execute(...args)

              if (item.eventType === EventTypeEnum.ONCE_EVENT) {
                funcs.splice(i, 1)
              }
            })

            return this
          }
        }

        return this
      }
    }

  ```

  * 作为一个事件中心，为了避免使用者错误使用，创建多个实例，我们可以使用 工厂模式，创建一个全局实例供使用者使用，同时提供使用者一个方法，创建新的实例

  ```typescript

    // 不直接 new EventBus， 而是通过 一个工厂函数来创建实例, 参考 axios 源码
    function createInstance (): EventBusInstance {

      const bus = new EventBus()
  
      return bus as EventBusInstance
    }

    const bus = createInstance()

    // 扩展 create 方法，用于 使用者 创建新的 bus 实例
    bus.create = function create () {
      return createInstance()
    }
  ```

#### 总结 

  iny-bus 的核心代码，其实就这么多，总的来说，非常少，但是能解决我们在小程序中遇到的大量 通信 和 数据刷新问题，是采用 各大平台小程序 原生开发时，页面通信的不二之选，同时，100% 的测试覆盖率，确保了 iny-bus 在使用中的稳定性和安全性，当然，每个库都是从简单走向复杂，功能慢慢完善，如果
  大家在使用或者源码中发现了bug或者可以优化的点，欢迎大家提 pr 或者直接联系我

  最后，如果 iny-bus 给你提供了帮助或者让你有任何收获，请给 作者 点个赞，感谢大家 [点赞](https://github.com/landluck/iny-bus) 



