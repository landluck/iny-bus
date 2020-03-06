import { PlainObject } from '../../src/types/index'
import inyPage from '../../src/iny/InyPage'
import bus from '../../src/bus'

describe('inyPage', () => {
  test('page.__inyEventIds', () => {
    const page = inyPage<PlainObject>({})

    expect(page.__inyEventIds).toBe(undefined)

    const page2 = inyPage<PlainObject>({
      inyEvents: {
        refreshPage: () => {}
      }
    })

    page2.onLoad()

    expect(page2.__inyEventIds).not.toBe(undefined)
    const event = bus.find('refreshPage')

    if (event) {
      expect(event).not.toBe(null)

      if (page2.__inyEventIds && page2.__inyEventIds[0] !== undefined) {
        expect(page2.__inyEventIds[0]).toEqual({ name: 'refreshPage', id: event.executes[0].id })
      }
    }
  })

  test('page.event.emit', () => {
    const f1 = jest.fn()

    const page = inyPage<PlainObject>({
      inyEvents: {
        refreshPage2: f1
      }
    })

    page.onLoad()

    bus.emit('refreshPage2')
    expect(f1).toBeCalled()
    bus.emit('refreshPage2', 1, 2)
    expect(f1).toBeCalledWith(1, 2)
  })

  test('page.event.handler.emit', () => {
    const f1 = jest.fn()

    const page = inyPage<PlainObject>({
      inyEvents: {
        refreshPage3: {
          handler: f1
        }
      }
    })

    page.onLoad()

    bus.emit('refreshPage3')
    expect(f1).toBeCalled()
    bus.emit('refreshPage3', 1, 2)
    expect(f1).toBeCalledWith(1, 2)
  })

  test('page.event.handler.emit and once', () => {
    const f1 = jest.fn()

    const page = inyPage<PlainObject>({
      inyEvents: {
        refreshPage3: {
          handler: f1,
          once: true
        }
      }
    })

    page.onLoad()

    bus.emit('refreshPage3')
    bus.emit('refreshPage3')
    expect(f1).toBeCalledTimes(1)
  })

  test('page.event.handler.emit and once', () => {
    const f1 = jest.fn()

    const page = inyPage<PlainObject>({
      inyEvents: {
        refreshPage3: () => {}
      },
      onLoad: f1
    })

    page.onLoad({})

    expect(f1).toBeCalledWith({})
  })

  test('page.onUnload', () => {
    const f1 = jest.fn()
    const f2 = jest.fn()

    const page = inyPage<PlainObject>({
      inyEvents: {
        refreshPage4: f1
      },
      onUnload: f2
    })

    page.onLoad()

    bus.emit('refreshPage4')

    expect(f1).toBeCalled()

    page.onUnload()

    expect(f2).toBeCalled()

    expect(page.__inyEventIds).toBe(undefined)

    bus.emit('refreshPage4')

    expect(f1).toBeCalledTimes(1)
  })
})
