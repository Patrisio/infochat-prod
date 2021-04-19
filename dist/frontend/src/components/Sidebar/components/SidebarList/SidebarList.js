"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const sidebarList_module_scss_1 = require("./sidebarList.module.scss");
const SidebarItem_1 = require("../SidebarItem/SidebarItem");
function SidebarList({ title, listItems, mode = 'dark' }) {
    return (<div className={sidebarList_module_scss_1.default.sidebarListContainer}>
      {title &&
            <span>{title}</span>}
      
      {listItems.map((item, idx) => {
            return (<SidebarItem_1.default key={idx} mode={mode} onClick={item.onClick} name={item.name} count={item.count} icon={item.icon} stylesList={item.stylesList}/>);
        })}
    </div>);
}
exports.default = SidebarList;
//# sourceMappingURL=SidebarList.js.map