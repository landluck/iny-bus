export interface EventBus {
  on(name: string, execute: Function): string

  once(name: string, execute: Function): string

  remove(name: string, eventId?: string): EventBus

  emit(name: string, ...args: any[]): EventBus

  find(name: string): Event | null
  
  [propName: string]: any
}

export interface EventBusInstance extends EventBus {
  create (): EventBus
}

export type EventType = 1 | 2


export interface Event {
  name: string
  executes: Execute[]
}

export interface Execute {
  id: string
  eventType: EventType
  execute: Function
}
