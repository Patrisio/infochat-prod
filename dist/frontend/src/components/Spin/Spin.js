"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const spin_module_scss_1 = require("./spin.module.scss");
function Spin() {
    return (<div className={spin_module_scss_1.default.loadingioSpinnerRolling}>
      <div className={spin_module_scss_1.default.loading}>
        <div />
      </div>
    </div>);
}
exports.default = Spin;
//# sourceMappingURL=Spin.js.map