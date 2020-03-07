import { Event } from '../types'
import { createUid, once } from '../utils'

class EventBus {
  /**
   * 储存事件的容器
   */
  private events: Event[] = []

  /**
   * on 新增事件监听
   * @param name 事件名
   * @param execute 回调函数
   * @param ctx 上下文 this
   * @returns { string } eventId 事件ID，用户取消该事件监听
   */

  on(name: string, execute: Function, ctx?: any): string {
    return this.addEvent(name, execute, ctx)
  }

  /**
   * one 只允许添加一次事件监听
   * @param name 事件名
   * @param execute 回调函数
   * @param ctx 上下文 this
   * @returns { string } eventId 事件ID，用户取消该事件监听
   */

  once(name: string, execute: Function, ctx?: any): string {
    return this.addEvent(name, once(execute), ctx)
  }

  /**
   * remove 移除事件监听
   * @param name 事件名
   * @param eventId 移除单个事件监听需传入
   * @returns { EventBus } EventBus EventBus 实例
   */

  remove(name: string, eventId: string): EventBus {
    const events = this.events

    const index = events.findIndex(event => event.name === name)

    if (index === -1) {
      return this
    }

    if (!eventId) {
      events.splice(index, 1)

      return this
    }

    const executeIndex = events[index].executes.findIndex(item => item.id === eventId)

    if (executeIndex !== -1) {
      events[index].executes.splice(executeIndex, 1)
    }

    return this
  }

  /**
   * emit 派发事件
   * @param name 事件名
   * @param args 其余参数
   * @returns { EventBus } EventBus EventBus 实例
   */

  emit(name: string, ...args: any[]): EventBus {
    const event = this.find(name)

    if (!event) {
      return this
    }
    const funcs = event.executes

    funcs.forEach(func => {
      if (func.ctx) {
        return func.execute.apply(func.ctx, args)
      }
      func.execute(...args)
    })

    return this
  }

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

  clear(): EventBus {
    this.events.length = 0

    return this
  }

  /**
   * 添加事件的方法
   * @param name
   * @param execute
   */

  private addEvent(name: string, execute: Function, ctx?: any): string {
    const eventId = createUid()

    const events = this.events

    const event = this.find(name)

    if (event !== null) {
      event.executes.push({ id: eventId, execute, ctx })

      return eventId
    }

    events.push({
      name,
      executes: [
        {
          id: eventId,
          execute,
          ctx
        }
      ]
    })

    return eventId
  }
}

export default EventBus
