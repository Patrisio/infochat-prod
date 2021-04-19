"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Row_1 = require("./components/Row");
const table_module_scss_1 = require("./table.module.scss");
function Table({ columns, data }) {
    const hasVisibleHeaderCells = () => columns.filter((column) => column.visible).length > 0;
    return (<div className={table_module_scss_1.default.gridContainer}>
      {hasVisibleHeaderCells() &&
            <div className={table_module_scss_1.default.header}>
          {columns.map((column, idx) => {
                    return (<div key={idx}>
                  {column.headerComponent && column.headerComponent()}
                </div>);
                })}
        </div>}

      {data.map((row, idx) => {
            return (<Row_1.default key={idx} row={row} columns={columns}/>);
        })}
    </div>);
}
exports.default = Table;
//# sourceMappingURL=Table.js.map