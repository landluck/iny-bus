import { EventBusInstance } from './types'
import EventBus from './core/EventBus'

function createInstance(): EventBusInstance {
  const bus = new EventBus()
  // @ts-ignore
  return bus as EventBusInstance
}

const bus = createInstance()

bus.create = function create() {
  return createInstance()
}

export default bus
