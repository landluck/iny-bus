import { Event, EventType } from '../types'
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
   * @returns { string } eventId 事件ID，用户取消该事件监听
   */

  on(name: string, execute: Function): string {
    return this.addEvent(name, execute)
  }

  /**
   * one 只允许添加一次事件监听
   * @param name 事件名
   * @param execute 回调函数
   * @returns { string } eventId 事件ID，用户取消该事件监听
   */

  once(name: string, execute: Function): string {
    return this.addEvent(name, once(execute))
  }

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

        for (let z = 0; z < funcs.length; z++) {
          const item = funcs[z]

          item.execute(...args)
        }

        return this
      }
    }

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

  private addEvent(name: string, execute: Function): string {
    const eventId = createUid()

    const events = this.events

    const event = this.find(name)

    if (event !== null) {
      event.executes.push({ id: eventId, execute })

      return eventId
    }

    events.push({
      name,
      executes: [
        {
          id: eventId,
          execute
        }
      ]
    })

    return eventId
  }
}

export default EventBus
