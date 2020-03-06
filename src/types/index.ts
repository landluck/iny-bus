export interface PlainObject {
  [prop: string]: any
}

export interface EventBus {
  on(name: string, execute: Function): string

  once(name: string, execute: Function): string

  remove(name: string, eventId?: string): EventBus

  emit(name: string, ...args: any[]): EventBus

  find(name: string): Event | null

  clear(): EventBus

  [propName: string]: any
}

export interface EventBusInstance extends EventBus {
  create(): EventBus
}

export interface Event {
  name: string
  executes: Execute[]
}

export interface Execute {
  id: string
  execute: Function
}

export interface InyEvent {
  handler: (...args: any[]) => any
  once: boolean
}

export interface InyEvents {
  [prop: string]: ((...args: any[]) => any) | InyEvent
}

export interface InyEventIdNames {
  id: string
  name: string
}

export interface Context {
  inyEvents?: InyEvents
  __inyEventIds?: InyEventIdNames[]
  [prop: string]: any
}

export type InyApp<T> = Partial<T> & Context

export type InyPage<T> = Partial<T> & Context

export type InyComponent<T> = Partial<T> & Context
