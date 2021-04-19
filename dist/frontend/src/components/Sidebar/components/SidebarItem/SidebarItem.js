"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const sidebarItem_module_scss_1 = require("./sidebarItem.module.scss");
function SidebarList({ name, count, icon, onClick, stylesList, mode = 'dark' }) {
    const setActiveSidebarItem = (e) => {
        const target = e.currentTarget;
        const sidebarItems = document.getElementsByClassName(sidebarItem_module_scss_1.default.listItem);
        for (let i = 0; i < sidebarItems.length; i++) {
            const sidebarItem = sidebarItems[i];
            sidebarItem.className = `${sidebarItem_module_scss_1.default.listItem} ${mode === 'dark' ? sidebarItem_module_scss_1.default.dark : sidebarItem_module_scss_1.default.light}`;
        }
        target.className += ` ${sidebarItem_module_scss_1.default.active}`;
    };
    const displayMesssagesCount = Boolean(count && count > 0) && <span className={sidebarItem_module_scss_1.default.count}>{count}</span>;
    return (<div className={`
        ${sidebarItem_module_scss_1.default.listItem}
        ${mode === 'light' ? sidebarItem_module_scss_1.default.light : sidebarItem_module_scss_1.default.dark}
      `} onClick={(e) => {
            setActiveSidebarItem(e);
            onClick();
        }}>
      <div className={sidebarItem_module_scss_1.default.iconAndName}>
        {icon}
        <span style={stylesList}>{name}</span>
      </div>
      {displayMesssagesCount}
    </div>);
}
exports.default = SidebarList;
//# sourceMappingURL=SidebarItem.js.map