"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const textarea_module_scss_1 = require("./textarea.module.scss");
function Textarea({ value, className, onChange, maxLength, disabled }) {
    const [textareaValue, setTextareaValue] = react_1.useState(value);
    react_1.useEffect(() => {
        setTextareaValue(value);
    }, [value]);
    return (<textarea className={textarea_module_scss_1.default.textarea} value={textareaValue} onChange={(e) => {
            onChange && onChange(e);
            setTextareaValue(e.target.value);
        }} maxLength={maxLength} disabled={disabled}/>);
}
exports.default = Textarea;
//# sourceMappingURL=Textarea.js.map