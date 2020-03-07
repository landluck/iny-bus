export interface PlainObject {
    [prop: string]: any;
}
export interface EventBus {
    on(name: string, execute: Function, ctx?: any): string;
    once(name: string, execute: Function, ctx?: any): string;
    remove(name: string, eventId?: string): EventBus;
    emit(name: string, ...args: any[]): EventBus;
    find(name: string): Event | null;
    clear(): EventBus;
    app<T extends Context>(ctx: T): InyApp<T>;
    page<T extends Context>(ctx: T): InyPage<T>;
    component<T extends Context>(ctx: T): InyComponent<T>;
    [propName: string]: any;
}
export interface EventBusInstance extends EventBus {
    create(): EventBus;
}
export interface Event {
    name: string;
    executes: Execute[];
}
export interface Execute {
    id: string;
    execute: Function;
    ctx?: any;
}
export interface InyEvent {
    handler: (...args: any[]) => any;
    once: boolean;
}
export interface BusEvents {
    [prop: string]: ((...args: any[]) => any) | InyEvent;
}
export interface InyEventIdNames {
    id: string;
    name: string;
}
export interface Context {
    busEvents?: BusEvents;
    __inyEventIds?: InyEventIdNames[];
    [prop: string]: any;
}
export declare type InyApp<T> = Partial<T> & Context;
export declare type InyPage<T> = Partial<T> & Context;
export declare type InyComponent<T> = Partial<T> & Context;
