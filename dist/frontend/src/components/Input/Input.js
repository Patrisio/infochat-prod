"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const input_module_scss_1 = require("./input.module.scss");
const react_outside_click_handler_1 = require("react-outside-click-handler");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
;
function Input({ placeholder, value = '', type = 'text', name, fluid, width, classNames, onChange, onClick, onSelect, onBlur, onFocus, data = [], fixedSelect, allowClear, readOnly, disabled, addonAfter, maxLength, }) {
    const [isOpen, setOpen] = react_1.useState(false);
    const [fieldValue, setFieldValue] = react_1.useState('');
    const inputRef = react_1.useRef(null);
    react_1.useEffect(() => setFieldValue(value), [value]);
    react_1.useEffect(() => {
        const clickHandler = (e) => {
            const target = e.target;
            if (!(inputRef.current && inputRef.current.contains(target))) {
                setOpen(false);
            }
        };
        if (data.length > 0) {
            document.addEventListener('click', clickHandler);
        }
        return document.removeEventListener('click', clickHandler);
    }, [isOpen]);
    return (<div className={input_module_scss_1.default.inputContainer}>
      <input readOnly={readOnly} ref={inputRef} placeholder={placeholder} value={fieldValue || value} type={type} name={name} className={`
          ${input_module_scss_1.default.input}
          ${fluid ? input_module_scss_1.default.fluid : null}
          ${classNames}
        `} style={fluid ? { width: '100%' } : { width }} onChange={(e) => {
            onChange && onChange(e);
            setFieldValue(e.target.value);
        }} onFocus={() => {
            setOpen(true);
            onFocus && onFocus();
        }} onBlur={onBlur} disabled={disabled} maxLength={maxLength}/>

      {addonAfter}

      {allowClear && fieldValue &&
            <div className={input_module_scss_1.default.clearSearchFieldIcon} onClick={() => {
                    setFieldValue('');
                }}>
          <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faTimesCircle} color='#aaa' size='lg'/>
        </div>}

      {isOpen && data.length > 0 &&
            <react_outside_click_handler_1.default onOutsideClick={(e) => {
                    const target = e.target;
                    const inputNode = inputRef.current;
                    if (inputNode && !inputNode.contains(target)) {
                        setOpen(false);
                    }
                }}>
          <div className={input_module_scss_1.default.popup}>
            {data.map((item, idx) => {
                    return (<div key={idx} onClick={() => {
                            if (fixedSelect) {
                                if (item.value !== fieldValue) {
                                    setFieldValue(item.value);
                                    if (onSelect && item.id)
                                        onSelect(item.id);
                                    setOpen(false);
                                }
                                return;
                            }
                            setOpen(false);
                            onClick(item);
                        }}>
                    {item.icon && <img src={item.icon}/>}
                    <p className={input_module_scss_1.default.popupValue}>{item.value}</p>
                  </div>);
                })}
          </div>
        </react_outside_click_handler_1.default>}
    </div>);
}
exports.default = Input;
//# sourceMappingURL=Input.js.map