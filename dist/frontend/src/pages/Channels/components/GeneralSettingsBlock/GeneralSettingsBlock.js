"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const Input_1 = require("../../../../components/Input/Input");
const Textarea_1 = require("../../../../components/Textarea/Textarea");
const Switcher_1 = require("../../../../components/Switcher/Switcher");
const ButtonsGroup_1 = require("../ButtonsGroup/ButtonsGroup");
const actions_1 = require("../../../../actions");
const generalSettingsBlock_module_scss_1 = require("./generalSettingsBlock.module.scss");
const theme1_png_1 = require("../../../../assets/theme1.png");
const theme2_png_1 = require("../../../../assets/theme2.png");
const theme3_png_1 = require("../../../../assets/theme3.png");
const lodash_1 = require("lodash");
let defaultSettings;
function GeneralSettingsBlock({ setActiveTab }) {
    var _a, _b;
    const settings = react_redux_1.useSelector((state) => state.channels.settings);
    let dispatch = react_redux_1.useDispatch();
    if (!defaultSettings)
        defaultSettings = lodash_1.cloneDeep(settings);
    const generalSettingsBlockRef = react_1.useRef(null);
    const [isEnabledCustomCss, setIsEnabledCustomCss] = react_1.useState(Boolean(settings.customCss));
    const [hasChanges, toggleChanges] = react_1.useState(false);
    const chatBackgrounds = [
        {
            id: 1,
            imageSrc: theme1_png_1.default,
        },
        {
            id: 2,
            imageSrc: theme2_png_1.default,
        },
        {
            id: 3,
            imageSrc: theme3_png_1.default,
        },
        {
            id: 4,
            imageSrc: '',
        },
    ];
    const buttonLocation = [
        {
            id: 'left',
            value: 'Внизу слева',
        },
        {
            id: 'right',
            value: 'Внизу справа',
        },
    ];
    const buttonScale = [
        {
            id: '1',
            value: '100%',
        },
        {
            id: '0.9',
            value: '90%',
        },
        {
            id: '0.8',
            value: '80%',
        },
        {
            id: '0.7',
            value: '70%',
        },
    ];
    const updateBlockSettings = (settings) => dispatch(actions_1.updateChannelSettings(settings));
    const setActiveThemeCard = (e, elementIndex) => {
        const themesCards = document.getElementsByClassName(generalSettingsBlock_module_scss_1.default.themeCard);
        const resetActiveStyles = () => {
            for (let i = 0; i < themesCards.length; i++) {
                const sidebarItem = themesCards[i];
                sidebarItem.className = generalSettingsBlock_module_scss_1.default.themeCard;
            }
        };
        if (typeof elementIndex === 'number') {
            resetActiveStyles();
            themesCards[elementIndex].className += ` ${generalSettingsBlock_module_scss_1.default.active}`;
        }
        else {
            const target = e.currentTarget;
            resetActiveStyles();
            target.className += ` ${generalSettingsBlock_module_scss_1.default.active}`;
        }
    };
    react_1.useEffect(() => {
        setActiveThemeCard(null, settings.backgroundImage - 1);
    }, [settings.backgroundImage]);
    return (<div ref={generalSettingsBlockRef}>
      <div>
        <p>Название чата</p>
        <Input_1.default type='text' fluid maxLength={30} value={settings.chatName} onChange={(e) => {
            updateBlockSettings({ chatName: e.target.value });
            toggleChanges(true);
        }}/>
      </div>

      <div>
        <p>Приветствие</p>
        <Textarea_1.default value={settings.greeting} className={generalSettingsBlock_module_scss_1.default.textarea} maxLength={80} onChange={(e) => {
            updateBlockSettings({ greeting: e.target.value });
            toggleChanges(true);
        }}/>
      </div>

      <div>
        <p>Фон чата</p>
        <div className={generalSettingsBlock_module_scss_1.default.themesContainer}>
          {chatBackgrounds.map((bg) => {
            return (<div key={bg.id} className={generalSettingsBlock_module_scss_1.default.themeCard} onClick={(e) => {
                    if (bg.id === settings.backgroundImage)
                        return;
                    setActiveThemeCard(e);
                    updateBlockSettings({ backgroundImage: bg.id });
                    toggleChanges(true);
                }}>
                  {bg.id !== 4 &&
                    <img src={bg.imageSrc} alt='chat-background' className={generalSettingsBlock_module_scss_1.default.themeImage}/>}
                </div>);
        })}
        </div>
      </div>

      <div className={generalSettingsBlock_module_scss_1.default.buttonsSettingsContaoner}>
        <div>
          <p>Расположение кнопки</p>
          <Input_1.default type='text' onSelect={(id) => {
            updateBlockSettings({ buttonLocation: id });
            toggleChanges(true);
        }} value={(_a = buttonLocation.find((location) => location.id === settings.buttonLocation)) === null || _a === void 0 ? void 0 : _a.value} fixedSelect readOnly classNames={generalSettingsBlock_module_scss_1.default.input} data={buttonLocation} width='170px'/>
        </div>

        <div>
          <p>Масштаб кнопки</p>
          <Input_1.default type='text' onSelect={(id) => {
            updateBlockSettings({ buttonScale: id });
            toggleChanges(true);
        }} value={(_b = buttonScale.find((scale) => scale.id === settings.buttonScale)) === null || _b === void 0 ? void 0 : _b.value} fixedSelect readOnly classNames={generalSettingsBlock_module_scss_1.default.input} data={buttonScale} width='130px'/>
        </div>
      </div>

      <div>
        <div className={generalSettingsBlock_module_scss_1.default.buttonNoticeTitle}>
          <p>Надпись на кнопке</p>
          <span className={generalSettingsBlock_module_scss_1.default.lettersLimit}>16 символов</span>
        </div>

        <Input_1.default value={settings.buttonText} placeholder='Напишите нам!' type='text' fluid maxLength={16} onChange={(e) => {
            updateBlockSettings({ buttonText: e.target.value });
            toggleChanges(true);
        }}/>
      </div>

      <div>
        <div className={generalSettingsBlock_module_scss_1.default.switcherContainer}>
          <Switcher_1.default value={Boolean(settings.infochatLinkEnabled)} onChange={(enable) => {
            const infochatLinkEnabled = enable ? 1 : 0;
            updateBlockSettings({ infochatLinkEnabled });
            toggleChanges(true);
        }}/>
          <span className={generalSettingsBlock_module_scss_1.default.swictherLabel}>Ссылка на InfoChat</span>
        </div>

        <div className={generalSettingsBlock_module_scss_1.default.adviceNote}>
          <p className={generalSettingsBlock_module_scss_1.default.description}>Мы рекомендуем <span>не отключать ссылку</span>, так как вы будете получать отчисления со всех платежей тех клиентов, которые перешли и зарегистрировались по ссылке из вашего чата.</p>
          <p className={generalSettingsBlock_module_scss_1.default.price}>Отключение ссылки — 300 ₽/месяц.</p>
        </div>
      </div>

      <div>
        <div className={generalSettingsBlock_module_scss_1.default.switcherContainer}>
          <Switcher_1.default value={isEnabledCustomCss} onChange={(enable) => {
            setIsEnabledCustomCss(enable);
            toggleChanges(true);
        }}/>
          <span className={generalSettingsBlock_module_scss_1.default.swictherLabel}>Собственный CSS</span>
        </div>
          
        <Textarea_1.default value={settings.customCss} className={generalSettingsBlock_module_scss_1.default.textarea} disabled={!isEnabledCustomCss} onChange={lodash_1.debounce((e) => {
            updateBlockSettings({ customCss: e.target.value });
            toggleChanges(true);
        }, 800)}/>
      </div>

      <ButtonsGroup_1.default hasChanges={hasChanges} toggleChanges={toggleChanges} setActiveTab={setActiveTab} resetBlockSettings={() => {
            setIsEnabledCustomCss(Boolean(defaultSettings === null || defaultSettings === void 0 ? void 0 : defaultSettings.customCss));
            updateBlockSettings(defaultSettings);
        }}/>
    </div>);
}
exports.default = GeneralSettingsBlock;
//# sourceMappingURL=GeneralSettingsBlock.js.map