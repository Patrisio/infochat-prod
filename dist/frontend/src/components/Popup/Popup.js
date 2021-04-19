"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const popup_module_scss_1 = require("./popup.module.scss");
const react_outside_click_handler_1 = require("react-outside-click-handler");
function Popup({ children, width = '200px', body, center, onClick }) {
    const [isOpen, toggle] = react_1.useState(false);
    return (<react_outside_click_handler_1.default onOutsideClick={() => {
            toggle(false);
        }}>
      <div className={popup_module_scss_1.default.popupContainer}>
        <div onClick={() => {
            toggle(prev => !prev);
            onClick && onClick();
        }}>
          {children}
        </div>

        {isOpen &&
            <div className={`
              ${popup_module_scss_1.default.popup}
              ${center && popup_module_scss_1.default.center}
            `} style={{
                    width
                }}>
            {body}
          </div>}
      </div>
    </react_outside_click_handler_1.default>);
}
exports.default = Popup;
//# sourceMappingURL=Popup.js.map