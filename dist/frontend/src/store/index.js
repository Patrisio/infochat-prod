"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureStore = void 0;
const redux_1 = require("redux");
const redux_saga_1 = require("redux-saga");
const redux_logger_1 = require("redux-logger");
const reducers_1 = require("../reducers");
const sagas_1 = require("../sagas");
const configureStore = () => {
    const sagaMiddleware = redux_saga_1.default();
    const store = redux_1.createStore(reducers_1.rootReducer, redux_1.applyMiddleware(redux_logger_1.default, sagaMiddleware));
    sagaMiddleware.run(sagas_1.default);
    return store;
};
exports.configureStore = configureStore;
//# sourceMappingURL=index.js.map