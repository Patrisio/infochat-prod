"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const api_1 = require("../api");
function* fetchIncomingMessages(action) {
    try {
        const successCallback = action.incomingMessage.successCallback;
        const incomingMessage = yield effects_1.call(api_1.incomingMessagesFetch, action.incomingMessage);
        if (successCallback) {
            successCallback(incomingMessage);
        }
        yield effects_1.put({
            type: 'ADD_INCOMING_MESSAGES',
            incomingMessage,
        });
    }
    catch (e) {
        yield effects_1.put({
            type: 'INCOMING_MESSAGES_FETCH_FAILED',
            message: e.message,
        });
    }
}
function* updateAssignedUser(action) {
    try {
        const successCallback = action.incomingMessage.successCallback;
        yield effects_1.call(api_1.assignedUserUpdate, action.incomingMessage);
        if (successCallback) {
            yield successCallback();
        }
    }
    catch (e) {
        yield effects_1.put({
            type: 'UPDATE_ASSIGNED_USER_FAILED',
            message: e.message,
        });
    }
}
function* updateSelectedClient(action) {
    try {
        const successCallback = action.payload.successCallback;
        yield effects_1.call(api_1.selectedClientUpdate, action.payload);
        if (successCallback) {
            yield successCallback();
        }
    }
    catch (e) {
        yield effects_1.put({
            type: 'UPDATE_SELECTED_CLIENT_USER_FAILED',
            message: e.message,
        });
    }
}
function* addMessageToInbox(action) {
    try {
        const successCallback = action.payload.successCallback;
        yield effects_1.call(api_1.messageToInboxAdd, action.payload);
        if (successCallback) {
            yield successCallback();
        }
    }
    catch (e) {
        yield effects_1.put({
            type: 'ADD_TO_INBOX_INCOMING_MESSAGES_FAILED',
            message: e.message,
        });
    }
}
function* getSelectedClientInfo(action) {
    try {
        const successCallback = action.payload.successCallback;
        const clientInfo = yield effects_1.call(api_1.selectedClientInfoGet, action.payload);
        if (successCallback) {
            yield successCallback(clientInfo);
        }
    }
    catch (e) {
        yield effects_1.put({
            type: 'GET_SELECTED_CLIENT_INFO_FAILED',
            message: e.message,
        });
    }
}
function* watchFetchMessagesHistoryByProject() {
    yield effects_1.takeEvery('FETCH_INCOMING_MESSAGES', fetchIncomingMessages);
}
function* watchUpdateAssignedUser() {
    yield effects_1.takeEvery('ASSIGNED_USER_UPDATE', updateAssignedUser);
}
function* watchUpdateSelectedClient() {
    yield effects_1.takeEvery('CLIENT_DATA_UPDATE', updateSelectedClient);
}
function* watchAddMessageToInbox() {
    yield effects_1.takeEvery('ADD_TO_INBOX_INCOMING_MESSAGE', addMessageToInbox);
}
function* watchGetInfoForSelectedClient() {
    yield effects_1.takeEvery('SELECTED_CLIENT_GET_INFO', getSelectedClientInfo);
}
exports.default = [
    watchFetchMessagesHistoryByProject(), ,
    watchUpdateAssignedUser(),
    watchUpdateSelectedClient(),
    watchAddMessageToInbox(),
    watchGetInfoForSelectedClient(),
];
//# sourceMappingURL=inbox.js.map