import EventBus from '../src/index'
import EventBusStatic from '../src/EventBus'

describe('bus', () => {

  test('should return eventId', () => {

    const eventId = EventBus.on('test', () => {
      // do
    })

    const onceEventId = EventBus.once('test', () => {
      // do
    })

    expect(typeof eventId).toBe('string')
    expect(typeof onceEventId).toBe('string')
  })


  test('should can find by name', () => {

   EventBus.on('testFind', () => {
      // do
    })

    EventBus.once('testFindOnce', () => {
      // do
    })

    const testOne = EventBus.find('testFind')
    const testOnce = EventBus.find('testFindOnce')

    expect(testOne).not.toBeNull()
    expect(testOne && testOne.name).toBe('testFind')

    expect(testOnce).not.toBeNull()
    expect(testOnce && testOnce.name).toBe('testFindOnce')
  })

  test('should can remove by name', () => {

    EventBus.on('testRemove', () => {
       // do
     })
 
    EventBus.once('testRemoveOnce', () => {
      // do
    })

    EventBus.remove('testRemove')

    EventBus.remove('testRemoveOnce')

    const testOne = EventBus.find('testRemove')
    const testOnce = EventBus.find('testRemoveOnce')

    expect(testOne).toBeNull()

    expect(testOnce).toBeNull()
  })

  test('should remove by eventId and return EventBus', () => {

    const eventId = EventBus.on('testRemoveByIdAndReturnEventBus', () => {
      // do
    })


    const bus = EventBus.remove('testRemoveByIdAndReturnEventBus', eventId)

    const bus2 = EventBus.remove('testRemoveByIdAndReturnEventBus2', eventId)

    expect((bus instanceof EventBusStatic)).toBeTruthy()
    expect((bus2 instanceof EventBusStatic)).toBeTruthy()
  })

  test('should can remove by eventId', () => {

    const fn1 = jest.fn()
    const fn2 = jest.fn()

    const eventId = EventBus.on('testRemoveById', fn1)

    const eventId2 = EventBus.on('testRemoveById', fn2)

    EventBus.remove('testRemoveById', eventId)
    EventBus.remove('testRemoveById', '1')


    EventBus.emit('testRemoveById')


    expect(fn1).not.toHaveBeenCalled()
    expect(fn2).toHaveBeenCalled()
  })

  test('should called count of normal', () => {

    const fn1 = jest.fn()

    EventBus.on('testCalledCountOfNormal', fn1)


    EventBus.emit('testCalledCountOfNormal')

    EventBus.emit('testCalledCountOfNormal')

    expect(fn1).toHaveBeenCalled()

    
    expect(fn1).toHaveBeenCalledTimes(2)
  })


  test('should can remove after called of once', () => {

    const fn1 = jest.fn()

    const eventId = EventBus.once('testRemoveAfterCalledOfOnce', fn1)


    EventBus.emit('testRemoveAfterCalledOfOnce')

    EventBus.emit('testRemoveAfterCalledOfOnce')

    expect(fn1).toHaveBeenCalled()

    
    expect(fn1).toHaveBeenCalledTimes(1)
  })

  test('should can called', () => {

    const fn1 = jest.fn()
    const fn2 = jest.fn()

    const eventId = EventBus.on('testCaller', fn1)

    const eventId2 = EventBus.on('testCaller', fn2)

    EventBus.emit('testCaller')


    expect(fn1).toHaveBeenCalled()
    expect(fn2).toHaveBeenCalled()
  })

  test('should emit', () => {

    const fn1 = jest.fn()

    const eventId = EventBus.on('testEmit', fn1)


    EventBus.emit('testEmit')
    EventBus.emit('testEmit')

    expect(fn1).toHaveBeenCalled()

    
    expect(fn1).toHaveBeenCalledTimes(2)
  })

  test('should return EventBus after emit', () => {

    const fn1 = jest.fn()

    const eventId = EventBus.on('testReturnEventBusAfterEmit', fn1)


    const bus1 = EventBus.emit('testReturnEventBusAfterEmit')
    const bus2 = EventBus.emit('testReturnEventBusAfterEmit2')


    expect((bus1 instanceof EventBusStatic)).toBeTruthy()
    expect((bus2 instanceof EventBusStatic)).toBeTruthy()
  })


  test('should can called with params', () => {

    const fn1 = jest.fn()
    const fn2 = jest.fn()

    const eventId = EventBus.on('testCallerWithParams', fn1)

    const eventId2 = EventBus.on('testCallerWithParams', fn2)

    EventBus.emit('testCallerWithParams', 1, 2)


    expect(fn1).toHaveBeenCalledWith(1, 2)
    expect(fn2).toHaveBeenCalledWith(1, 2)
  })

  test('should can create other instance with create', () => {

    const instance = EventBus.create()

    expect((instance instanceof EventBusStatic)).toBeTruthy()

    instance.on('testCanCreateOtherInstance', () => {
      // do
    })

    expect(EventBus.find('testCanCreateOtherInstance')).toBeNull()
    expect(instance.find('testCanCreateOtherInstance')).not.toBeNull()
  })
})
