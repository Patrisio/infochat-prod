"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const panel_module_scss_1 = require("./panel.module.scss");
const arrow_right_svg_1 = require("../../../../assets/arrow-right.svg");
function Panel({ imageSrc, label, content, activeTab, index, activateTab }) {
    const [height, setHeight] = react_1.useState(0);
    const panelContentRef = react_1.useRef(null);
    react_1.useEffect(() => {
        window.setTimeout(() => {
            let height;
            const element = panelContentRef.current;
            if (element) {
                height = element.scrollHeight;
                setHeight(height);
            }
        }, 333);
    }, []);
    const isActive = activeTab === index;
    const innerStyle = {
        height: `${isActive ? height : 0}px`
    };
    return (<div className={panel_module_scss_1.default.panel} role='tabpanel' aria-expanded={isActive}>
      <button className={panel_module_scss_1.default.panel__label} role='tab' onClick={activateTab}>
        <div className={panel_module_scss_1.default.panelLabelBlock}>
          <div className={panel_module_scss_1.default.icon}>
            <img src={imageSrc} alt='icon'/>
          </div>

          <span>{label}</span>
        </div>

        <div className={panel_module_scss_1.default.arrow}>
          <img src={arrow_right_svg_1.default} alt='arrow-right'/>
        </div>
      </button>

      <div ref={panelContentRef} className={panel_module_scss_1.default.panel__inner} style={innerStyle} aria-hidden={!isActive}>
        <div className={panel_module_scss_1.default.panel__content}>
          {content}
        </div>
      </div>
    </div>);
}
exports.default = Panel;
//# sourceMappingURL=Panel.js.map