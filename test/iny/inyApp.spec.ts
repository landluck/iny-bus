import { PlainObject } from './../../src/types/index'
import inyApp from '../../src/extends/app'
import bus from '../../src/bus'

describe('inyApp', () => {
  test('app.__inyEventIds', () => {
    const app = inyApp<PlainObject>({})

    expect(app.__inyEventIds).toBe(undefined)

    const app2 = inyApp<PlainObject>({
      inyEvents: {
        refreshApp: () => {},
        refreshAppError: 'xxx'
      }
    })

    app2.onLaunch({})

    expect(app2.__inyEventIds).not.toBe(undefined)
    const event2 = bus.find('refreshAppError')
    expect(event2).toBe(null)
    const event = bus.find('refreshApp')
    if (event) {
      expect(event).not.toBe(null)

      if (app2.__inyEventIds && app2.__inyEventIds[0] !== undefined) {
        expect(app2.__inyEventIds[0]).toEqual({ name: 'refreshApp', id: event.executes[0].id })
      }
    }
  })

  test('app.event.emit', () => {
    const f1 = jest.fn()

    const app = inyApp<PlainObject>({
      inyEvents: {
        refreshApp2: f1
      }
    })

    app.onLaunch()

    bus.emit('refreshApp2')
    expect(f1).toBeCalled()
    bus.emit('refreshApp2', 1, 2)
    expect(f1).toBeCalledWith(1, 2)
  })

  test('app.event.handler.emit', () => {
    const f1 = jest.fn()

    const app = inyApp<PlainObject>({
      inyEvents: {
        refreshApp3: {
          handler: f1
        }
      }
    })

    app.onLaunch()

    bus.emit('refreshApp3')
    expect(f1).toBeCalled()
    bus.emit('refreshApp3', 1, 2)
    expect(f1).toBeCalledWith(1, 2)
  })

  test('app.event.handler.emit and once', () => {
    const f1 = jest.fn()

    const app = inyApp<PlainObject>({
      inyEvents: {
        refreshApp3: {
          handler: f1,
          once: true
        }
      }
    })

    app.onLaunch()

    bus.emit('refreshApp3')
    bus.emit('refreshApp3')
    expect(f1).toBeCalledTimes(1)
  })

  test('app.event.handler.emit and once', () => {
    const f1 = jest.fn()

    const app = inyApp<PlainObject>({
      inyEvents: {
        refreshApp3: () => {}
      },
      onLaunch: f1
    })

    app.onLaunch({})

    expect(f1).toBeCalledWith({})
  })
})
