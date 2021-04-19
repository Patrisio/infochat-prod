"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootReducer = void 0;
const redux_1 = require("redux");
const channels_1 = require("./channels");
const inbox_1 = require("./inbox");
const teammates_1 = require("./teammates");
exports.rootReducer = redux_1.combineReducers({
    inbox: inbox_1.inboxReducer,
    teammates: teammates_1.teammatesReducer,
    channels: channels_1.channelsReducer,
});
//# sourceMappingURL=index.js.map