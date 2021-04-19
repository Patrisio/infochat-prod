"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teammatesReducer = void 0;
const teammates_1 = require("../constants/teammates");
const initialState = {
    teammates: [],
};
const teammatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case teammates_1.TEAMMATE.ADD:
            return Object.assign(Object.assign({}, state), { teammates: [
                    ...state.teammates,
                    action.teammate
                ] });
        case teammates_1.TEAMMATES.ADD:
            return Object.assign(Object.assign({}, state), { teammates: action.teammate });
        case teammates_1.TEAMMATE.DELETE:
            return Object.assign(Object.assign({}, state), { teammates: [...state.teammates].filter(teammate => teammate.email !== action.teammate.email) });
        default:
            return state;
    }
};
exports.teammatesReducer = teammatesReducer;
//# sourceMappingURL=teammates.js.map