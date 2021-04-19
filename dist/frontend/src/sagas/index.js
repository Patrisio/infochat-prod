"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const auth_1 = require("./auth");
const teammates_1 = require("./teammates");
const channels_1 = require("./channels");
const inbox_1 = require("./inbox");
function* rootSaga() {
    yield effects_1.all([
        ...auth_1.default,
        ...teammates_1.default,
        ...channels_1.default,
        ...inbox_1.default,
    ]);
}
exports.default = rootSaga;
//# sourceMappingURL=index.js.map