"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const api_1 = require("../api");
function* fetchChannels(action) {
    try {
        yield effects_1.put({
            type: 'TOGGLE_FETCHING_CHANNELS',
        });
        const channels = yield effects_1.call(api_1.getChannels, action.payload.projectId);
        yield effects_1.put({
            type: 'ADD_CHANNELS',
            channels,
        });
        yield effects_1.put({
            type: 'TOGGLE_FETCHING_CHANNELS',
        });
    }
    catch (e) {
        yield effects_1.put({
            type: 'USER_FETCH_FAILED',
            message: e.message,
        });
    }
}
function* addChannel(action) {
    try {
        yield effects_1.call(api_1.channelAdd, action.payload);
    }
    catch (e) {
        yield effects_1.put({
            type: 'USER_FETCH_FAILED',
            message: e.message,
        });
    }
}
function* watchFetchChannels() {
    yield effects_1.takeEvery('FETCH_CHANNELS', fetchChannels);
}
function* watchAddChannel() {
    yield effects_1.takeEvery('ADD_CHANNEL', addChannel);
}
exports.default = [
    watchFetchChannels(),
    watchAddChannel(),
];
//# sourceMappingURL=channels.js.map