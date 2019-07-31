/*!
 * iny-bus.js v1.0.0
 * (c) 2019-2019 landluck
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.inyBus = factory());
}(this, (function () { 'use strict';

  var EventTypeEnum;
  (function (EventTypeEnum) {
      // 普通事件
      EventTypeEnum[EventTypeEnum["NORMAL_EVENT"] = 1] = "NORMAL_EVENT";
      // 一次性事件
      EventTypeEnum[EventTypeEnum["ONCE_EVENT"] = 2] = "ONCE_EVENT";
  })(EventTypeEnum || (EventTypeEnum = {}));

  /**
   * 创建唯一id
   */
  function createUid() {
      return (Math.random()).toString().substr(2);
  }

  var EventBus = /** @class */ (function () {
      function EventBus() {
          /**
           * 储存事件的容器
           */
          this.events = [];
      }
      /**
       * on 新增事件监听
       * @param name 事件名
       * @param execute 回调函数
       * @returns { string } eventId 事件ID，用户取消该事件监听
       */
      EventBus.prototype.on = function (name, execute) {
          return this.addEvent(name, EventTypeEnum.NORMAL_EVENT, execute);
      };
      /**
       * one 只允许添加一次事件监听
       * @param name 事件名
       * @param execute 回调函数
       * @returns { string } eventId 事件ID，用户取消该事件监听
       */
      EventBus.prototype.once = function (name, execute) {
          return this.addEvent(name, EventTypeEnum.ONCE_EVENT, execute);
      };
      /**
       * remove 移除事件监听
       * @param name 事件名
       * @param eventId 移除单个事件监听需传入
       * @returns { WxEventCenter } WxEventCenter WxEventCenter 实例
       */
      EventBus.prototype.remove = function (name, eventId) {
          var events = this.events;
          for (var i = 0; i < events.length; i++) {
              if (events[i].name === name) {
                  // 移除具体的操作函数
                  if (eventId && events[i].executes.length > 0) {
                      var eventIndex = events[i].executes.findIndex(function (item) { return item.id === eventId; });
                      if (eventIndex !== -1) {
                          events[i].executes.splice(eventIndex, 1);
                      }
                  }
                  else {
                      events.splice(i, 1);
                  }
                  return this;
              }
          }
          return this;
      };
      /**
       * emit 派发事件
       * @param name 事件名
       * @param args 其余参数
       * @returns { WxEventCenter } WxEventCenter WxEventCenter 实例
       */
      EventBus.prototype.emit = function (name) {
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
          }
          var events = this.events;
          var _loop_1 = function (i) {
              if (name === events[i].name) {
                  var funcs_1 = events[i].executes;
                  funcs_1.forEach(function (item, i) {
                      item.execute.apply(item, args);
                      if (item.eventType === EventTypeEnum.ONCE_EVENT) {
                          funcs_1.splice(i, 1);
                      }
                  });
                  return { value: this_1 };
              }
          };
          var this_1 = this;
          for (var i = 0; i < events.length; i++) {
              var state_1 = _loop_1(i);
              if (typeof state_1 === "object")
                  return state_1.value;
          }
          return this;
      };
      /**
       * 查找事件的方法
       * @param name
       */
      EventBus.prototype.find = function (name) {
          var events = this.events;
          for (var i = 0; i < events.length; i++) {
              if (name === events[i].name) {
                  return events[i];
              }
          }
          return null;
      };
      /**
       * 添加事件的方法
       * @param name
       * @param execute
       */
      EventBus.prototype.addEvent = function (name, eventType, execute) {
          var eventId = createUid();
          var events = this.events;
          var event = this.find(name);
          if (event !== null) {
              event.executes.push({ id: eventId, eventType: eventType, execute: execute });
              return eventId;
          }
          events.push({
              name: name,
              executes: [
                  {
                      id: eventId,
                      eventType: eventType,
                      execute: execute
                  }
              ]
          });
          return eventId;
      };
      return EventBus;
  }());

  function createInstance() {
      var bus = new EventBus();
      // @ts-ignore
      return bus;
  }
  var bus = createInstance();
  bus.create = function create() {
      return createInstance();
  };

  return bus;

})));
//# sourceMappingURL=iny-bus.js.map
