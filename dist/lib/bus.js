"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventBus_1 = require("./EventBus");
function createInstance() {
    var bus = new EventBus_1.default();
    // @ts-ignore
    return bus;
}
var bus = createInstance();
bus.create = function create() {
    return createInstance();
};
exports.default = bus;
//# sourceMappingURL=bus.js.map