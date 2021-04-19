"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Context_1 = require("../../context/Context");
function CurrentUserInfo() {
    const { currentUser } = react_1.useContext(Context_1.Context);
    return (<div>
      {currentUser.username}
    </div>);
}
exports.default = CurrentUserInfo;
//# sourceMappingURL=CurrentUserInfo.js.map