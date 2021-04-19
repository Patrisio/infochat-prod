"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Button_module_scss_1 = require("./Button.module.scss");
function Button({ children, type, fluid, size, background, onClick, stylesList, disabled }) {
    return (<button className={`
        ${Button_module_scss_1.default.button}
        ${background === 'edit' ? Button_module_scss_1.default.edit :
            background === 'delete' ? Button_module_scss_1.default.delete :
                background === 'success' ? Button_module_scss_1.default.success :
                    background === 'transparent' ? Button_module_scss_1.default.transparent : Button_module_scss_1.default.default}
        ${fluid ? Button_module_scss_1.default.fluid : null}
        ${size === 'large' ? Button_module_scss_1.default.large :
            size === 'medium' ? Button_module_scss_1.default.medium :
                size === 'small' ? Button_module_scss_1.default.small : null}
      `} style={stylesList} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>);
}
exports.default = Button;
//# sourceMappingURL=Button.js.map