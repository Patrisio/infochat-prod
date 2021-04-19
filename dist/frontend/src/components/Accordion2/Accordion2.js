"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Panel_1 = require("./components/Panel/Panel");
const accordion2_module_scss_1 = require("./accordion2.module.scss");
function Accordion({ panels }) {
    const [activeTab, setActiveTab] = react_1.useState(0);
    const activateTab = (index) => {
        setActiveTab(prev => prev === index ? -1 : index);
    };
    return (<div className={accordion2_module_scss_1.default.accordion} role='tablist'>
      {panels.map((panel, index) => {
            const updatedPanel = Object.assign(panel, { content: react_1.cloneElement(panel.content, { setActiveTab }) });
            return (<Panel_1.default key={index} activeTab={activeTab} index={index} {...updatedPanel} activateTab={() => activateTab(index)}/>);
        })}
    </div>);
}
exports.default = Accordion;
//# sourceMappingURL=Accordion2.js.map