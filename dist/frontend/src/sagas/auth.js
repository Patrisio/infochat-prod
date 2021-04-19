"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const api_1 = require("../api");
function* authInvite(action) {
    try {
        const { username, password, projectId, inviteId, successCallback } = action.payload;
        const data = yield effects_1.call(api_1.inviteUser, { username, password, projectId, inviteId });
        successCallback(data);
    }
    catch (e) {
        yield effects_1.put({
            type: 'AUTH_INVITE_FAILED',
            message: e.message,
        });
    }
}
function* authSignUp(action) {
    try {
        const { email, password, successCallback } = action.payload;
        const data = yield effects_1.call(api_1.signUp, action.payload);
        if (data.statusCode !== 400) {
            yield effects_1.put({
                type: 'AUTH_SIGNIN',
                payload: { email, password, successCallback }
            });
        }
    }
    catch (e) {
        yield effects_1.put({
            type: 'AUTH_SIGNUP_FAILED',
            message: e.message,
        });
    }
}
function* authSignIn(action) {
    try {
        const { email, password, successCallback } = action.payload;
        const data = yield effects_1.call(api_1.signIn, { email, password });
        if (data.statusCode !== 500) {
            successCallback(data);
        }
    }
    catch (e) {
        yield effects_1.put({
            type: 'AUTH_SIGNIN_FAILED',
            message: e.message,
        });
    }
}
function* watchInvite() {
    yield effects_1.takeEvery('AUTH_INVITE', authInvite);
}
function* watchSignIn() {
    yield effects_1.takeEvery('AUTH_SIGNIN', authSignIn);
}
function* watchSignUp() {
    yield effects_1.takeEvery('AUTH_SIGNUP', authSignUp);
}
exports.default = [
    watchInvite(),
    watchSignIn(),
    watchSignUp(),
];
//# sourceMappingURL=auth.js.map