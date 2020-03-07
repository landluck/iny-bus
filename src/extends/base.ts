import { PlainObject, busEvents, Context, InyEventIdNames } from '../types/index'
import bus from '../bus'

export function verifyEvents(busEvents?: busEvents): boolean {
  if (!busEvents || typeof busEvents !== 'object') {
    return false
  }

  return true
}

export function onLoad(ctx: Context, onLoad: string): void {
  const func = ctx[onLoad]

  ctx[onLoad] = function(options: PlainObject): void {
    const ids = addEvent(ctx.busEvents!, this)

    ctx.__inyEventIds = ids

    func && func.call(this, options)
  }
}

export function onUnload(ctx: Context, onUnload: string): void {
  if (!onUnload) {
    return
  }

  const func = ctx[onUnload]

  ctx[onUnload] = function(): void {
    ctx.__inyEventIds!.forEach(event => bus.remove(event.name, event.id))
    ctx.__inyEventIds = undefined

    func && func.call(this)
  }
}

export function addEvent(events: busEvents, ctx: Context): InyEventIdNames[] {
  return Object.keys(events)
    .map(name => {
      const event = events[name]

      if (typeof event === 'function') {
        return { id: bus.on(name, event, ctx), name }
      }

      if (typeof event.handler !== 'function') {
        return { id: '', name }
      }

      if (event.once) {
        return { id: bus.once(name, event.handler, ctx), name }
      }

      return { id: bus.on(name, event.handler, ctx), name }
    })
    .filter(item => !!item.id)
}