"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const accordion_module_scss_1 = require("./accordion.module.scss");
function Accordion({ title, children }) {
    const [isOpened, toggleOpen] = react_1.useState(true);
    return (<div className={accordion_module_scss_1.default.accordion}>
      <div onClick={() => toggleOpen(prev => !prev)} className={accordion_module_scss_1.default.accordionHeader}>
        <p className={accordion_module_scss_1.default.accordionTitle}>
          {title}
        </p>
      </div>

      {isOpened &&
            <div className={accordion_module_scss_1.default.accordionBody}>
          {children}
        </div>}
    </div>);
}
exports.default = Accordion;
//# sourceMappingURL=Accordion.js.map