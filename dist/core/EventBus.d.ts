import { Event } from '../types';
declare class EventBus {
    /**
     * 储存事件的容器
     */
    private events;
    /**
     * on 新增事件监听
     * @param name 事件名
     * @param execute 回调函数
     * @param ctx 上下文 this
     * @returns { string } eventId 事件ID，用户取消该事件监听
     */
    on(name: string, execute: Function, ctx?: any): string;
    /**
     * one 只允许添加一次事件监听
     * @param name 事件名
     * @param execute 回调函数
     * @param ctx 上下文 this
     * @returns { string } eventId 事件ID，用户取消该事件监听
     */
    once(name: string, execute: Function, ctx?: any): string;
    /**
     * remove 移除事件监听
     * @param name 事件名
     * @param eventId 移除单个事件监听需传入
     * @returns { EventBus } EventBus EventBus 实例
     */
    remove(name: string, eventId: string): EventBus;
    /**
     * emit 派发事件
     * @param name 事件名
     * @param args 其余参数
     * @returns { EventBus } EventBus EventBus 实例
     */
    emit(name: string, ...args: any[]): EventBus;
    /**
     * 查找事件的方法
     * @param name
     */
    find(name: string): Event | null;
    clear(): EventBus;
    /**
     * 添加事件的方法
     * @param name
     * @param execute
     */
    private addEvent;
}
export default EventBus;
