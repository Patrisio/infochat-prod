"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const react_1 = require("react");
exports.Context = react_1.createContext({
    currentUser: {
        avatar: '',
        email: '',
        role: '',
        status: '',
        username: '',
        allClientIds: [],
        unreadCount: 0,
        unreadClientIds: [],
        assignedCount: 0,
        assignedClientIds: [],
        openedCount: 0,
        openedClientIds: [],
        closedCount: 0,
        closedClientIds: [],
    },
    setCurrentUser: () => { }
});
//# sourceMappingURL=Context.js.map