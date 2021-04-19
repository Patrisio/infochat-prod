"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const api_1 = require("../api");
function* fetchTeammates(action) {
    try {
        const user = yield effects_1.call(api_1.getTeammates, action.payload.projectId);
        yield effects_1.put({
            type: 'TEAMMATES_ADD',
            teammate: user
        });
    }
    catch (e) {
        yield effects_1.put({
            type: 'TEAMMATES_ADD_FAILED',
            message: e.message
        });
    }
}
function* addTeammate(action) {
    try {
        const { email, projectId, role, status, username } = action.teammate;
        yield effects_1.call(api_1.teammateAdd, { email, projectId, role, status, username });
        yield effects_1.call(api_1.sendEmail, { email, projectId });
    }
    catch (e) {
        yield effects_1.put({
            type: 'TEAMMATE_ADD_FAILED',
            message: e.message
        });
    }
}
function* deleteTeammate(action) {
    try {
        yield effects_1.call(api_1.removeTeammate, action.teammate);
    }
    catch (e) {
        yield effects_1.put({
            type: 'DELETE_TEAMMATE_FAILED',
            message: e.message
        });
    }
}
function* watchFetchTeammates() {
    yield effects_1.takeEvery('TEAMMATE_FETCH', fetchTeammates);
}
function* watchAddTeammate() {
    yield effects_1.takeEvery('TEAMMATE_ADD', addTeammate);
}
function* watchDeleteTeammate() {
    yield effects_1.takeEvery('TEAMMATE_DELETE', deleteTeammate);
}
exports.default = [
    watchFetchTeammates(),
    watchAddTeammate(),
    watchDeleteTeammate(),
];
//# sourceMappingURL=teammates.js.map