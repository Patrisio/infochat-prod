"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const row_module_scss_1 = require("./row.module.scss");
function Row({ row, columns }) {
    return (<div className={row_module_scss_1.default.gridRow}>
      {columns.map((column, idx) => {
            return (<div key={idx} className={row_module_scss_1.default.gridCell}>
              {column.cellComponent ? column.cellComponent(row) : row[column.key]}
            </div>);
        })}
    </div>);
}
exports.default = Row;
;
//# sourceMappingURL=Row.js.map