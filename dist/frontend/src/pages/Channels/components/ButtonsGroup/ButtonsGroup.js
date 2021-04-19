"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Button_1 = require("../../../../components/Button/Button");
const buttonsGroup_module_scss_1 = require("./buttonsGroup.module.scss");
function ButtonsGroup({ hasChanges, toggleChanges, setActiveTab, resetBlockSettings }) {
    const [isOpenButtonsGroup, toggleState] = react_1.useState(hasChanges);
    react_1.useEffect(() => {
        toggleState(hasChanges);
    }, [hasChanges]);
    return (<div className={buttonsGroup_module_scss_1.default.footer}>
      {isOpenButtonsGroup ?
            <>
          <Button_1.default type='button' fluid stylesList={{
                    padding: '10px',
                }} onClick={() => {
                    toggleChanges(false);
                }}>
            Сохранить
          </Button_1.default>
          <Button_1.default type='button' background='edit' fluid stylesList={{
                    marginLeft: '10px',
                    padding: '10px',
                }} onClick={() => {
                    toggleChanges(false);
                    setActiveTab && setActiveTab(-1);
                    resetBlockSettings();
                }}>
            Отмена
          </Button_1.default>
        </> :
            <Button_1.default type='button' background='edit' stylesList={{
                    padding: '10px 46px',
                }} onClick={() => setActiveTab && setActiveTab(-1)}>
          Закрыть
        </Button_1.default>}
    </div>);
}
exports.default = ButtonsGroup;
//# sourceMappingURL=ButtonsGroup.js.map