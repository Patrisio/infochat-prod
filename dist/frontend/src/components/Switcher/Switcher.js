"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const switcher_module_scss_1 = require("./switcher.module.scss");
function Switcher({ onChange, value = false }) {
    const [isActive, toggle] = react_1.useState(value);
    react_1.useEffect(() => toggle(value), [value]);
    return (<label className={switcher_module_scss_1.default.toggleControl}>
      <input type='checkbox' checked={isActive} onChange={() => { }}/>
      <span className={switcher_module_scss_1.default.control} onClick={() => {
            toggle(prev => {
                console.log(!prev);
                onChange(!prev);
                return !prev;
            });
        }}/>
    </label>);
}
exports.default = Switcher;
//# sourceMappingURL=Switcher.js.map