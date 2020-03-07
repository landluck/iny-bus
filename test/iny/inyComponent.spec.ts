import { PlainObject } from '../../src/types/index'
import inyComponent from '../../src/extends/component'
import bus from '../../src/bus'

describe('inyComponent', () => {
  test('component.__inyEventIds', () => {
    const component = inyComponent<PlainObject>({})

    expect(component.__inyEventIds).toBe(undefined)

    const component2 = inyComponent<PlainObject>({
      busEvents: {
        refreshComponent: () => {}
      }
    })

    component2.created()

    expect(component2.__inyEventIds).not.toBe(undefined)
    const event = bus.find('refreshComponent')

    if (event) {
      expect(event).not.toBe(null)

      if (component2.__inyEventIds && component2.__inyEventIds[0] !== undefined) {
        expect(component2.__inyEventIds[0]).toEqual({
          name: 'refreshComponent',
          id: event.executes[0].id
        })
      }
    }
  })

  test('component.event.emit', () => {
    const f1 = jest.fn()

    const component = inyComponent<PlainObject>({
      busEvents: {
        refreshComponent2: f1
      }
    })

    component.created()

    bus.emit('refreshComponent2')
    expect(f1).toBeCalled()
    bus.emit('refreshComponent2', 1, 2)
    expect(f1).toBeCalledWith(1, 2)
  })

  test('component.event.handler.emit', () => {
    const f1 = jest.fn()

    const component = inyComponent<PlainObject>({
      busEvents: {
        refreshComponent3: {
          handler: f1
        }
      }
    })

    component.created()

    bus.emit('refreshComponent3')
    expect(f1).toBeCalled()
    bus.emit('refreshComponent3', 1, 2)
    expect(f1).toBeCalledWith(1, 2)
  })

  test('component.event.handler.emit and once', () => {
    const f1 = jest.fn()

    const component = inyComponent<PlainObject>({
      busEvents: {
        refreshComponent3: {
          handler: f1,
          once: true
        }
      }
    })

    component.created()

    bus.emit('refreshComponent3')
    bus.emit('refreshComponent3')
    expect(f1).toBeCalledTimes(1)
  })

  test('component.event.handler.emit and once', () => {
    const f1 = jest.fn()

    const component = inyComponent<PlainObject>({
      busEvents: {
        refreshComponent3: () => {}
      },
      created: f1
    })

    component.created({})

    expect(f1).toBeCalledWith({})
  })

  test('component.detached', () => {
    const f1 = jest.fn()
    const f2 = jest.fn()

    const component = inyComponent<PlainObject>({
      busEvents: {
        refreshComponent4: f1
      },
      detached: f2
    })

    component.created()

    bus.emit('refreshComponent4')

    expect(f1).toBeCalled()

    component.detached()

    expect(f2).toBeCalled()

    expect(component.__inyEventIds).toBe(undefined)

    bus.emit('refreshComponent4')

    expect(f1).toBeCalledTimes(1)
  })

  test('component', () => {
    const f1 = jest.fn()
    const f2 = jest.fn()

    const component = inyComponent<PlainObject>({
      busEvents: {
        refreshComponent4: f1
      },
      detached: f2
    })

    component.created()

    bus.emit('refreshComponent4')

    expect(f1).toBeCalled()

    component.detached()

    expect(f2).toBeCalled()

    expect(component.__inyEventIds).toBe(undefined)

    bus.emit('refreshComponent4')

    expect(f1).toBeCalledTimes(1)
  })
})
