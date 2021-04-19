"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const title_module_scss_1 = require("./title.module.scss");
function Title({ text }) {
    return (<div>
      <h1 className={title_module_scss_1.default.title}>{text}</h1>
    </div>);
}
exports.default = Title;
//# sourceMappingURL=Title.js.map