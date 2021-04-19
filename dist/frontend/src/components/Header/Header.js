"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const CurrentUserInfo_1 = require("../CurrentUserInfo/CurrentUserInfo");
const Context_1 = require("../../context/Context");
const Switcher_1 = require("../Switcher/Switcher");
const Popup_1 = require("../Popup/Popup");
const Avatar_1 = require("../Avatar/Avatar");
const Button_1 = require("../Button/Button");
const Input_1 = require("../Input/Input");
const header_module_scss_1 = require("./header.module.scss");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
function Header() {
    const [isOnline, toggleState] = react_1.useState(true);
    const { currentUser } = react_1.useContext(Context_1.Context);
    const searchBy = [
        {
            id: 'text',
            value: 'Только в тексте',
        },
        {
            id: 'username',
            value: 'Только по имени',
        },
        {
            id: 'email',
            value: 'Только по email',
        },
        {
            id: 'phone',
            value: 'Только по телефону',
        },
    ];
    const switchState = (value) => {
        toggleState(value);
    };
    const PopupBodyUser = () => {
        return (<div className={header_module_scss_1.default.popup}>
        <p className={header_module_scss_1.default.email}>{currentUser.email}</p>

        <div>
          <ul className={header_module_scss_1.default.list}>
            <li>
              <react_router_dom_1.Link className={header_module_scss_1.default.link} to={`/profile`}>
                <div className={header_module_scss_1.default.icon}>
                  <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faUserEdit}/>
                </div>
                <span>Изменить профиль</span>
              </react_router_dom_1.Link>
            </li>
            <li>
              <react_router_dom_1.Link className={header_module_scss_1.default.link} to={`/projects`}>
                <div className={header_module_scss_1.default.icon}>
                  <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faLayerGroup}/>
                </div>
                <span>Мои проекты</span>
              </react_router_dom_1.Link>
            </li>
          </ul>
        </div>

        <react_router_dom_1.Link className={header_module_scss_1.default.link} to={`/projects`}>
          <div className={header_module_scss_1.default.icon}>
            <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faSignOutAlt}/>
          </div>
          <span>Выход</span>
        </react_router_dom_1.Link>
      </div>);
    };
    const selectOption = (id) => {
        console.log(id, '__ID__');
    };
    const PopupBodySearch = () => {
        return (<div>
        <p className={header_module_scss_1.default.title}>Поиск</p>

        <div className={header_module_scss_1.default.popupBodyContainer}>
          <div className={header_module_scss_1.default.selector}>
            <span className={header_module_scss_1.default.label}>Поиск по</span>
            <Input_1.default type='text' onSelect={selectOption} value={searchBy[0].value} fixedSelect readOnly classNames={header_module_scss_1.default.input} data={searchBy}/>
          </div>

          <div className={header_module_scss_1.default.selector}>
            <span className={header_module_scss_1.default.label}>В канале</span>
            <Input_1.default type='text' onSelect={selectOption} value={searchBy[0].value} fixedSelect readOnly classNames={header_module_scss_1.default.input} data={searchBy}/>
          </div>

          <div className={header_module_scss_1.default.selector}>
            <span className={header_module_scss_1.default.label}>Назначено</span>
            <Input_1.default type='text' onSelect={selectOption} value={searchBy[0].value} fixedSelect readOnly classNames={header_module_scss_1.default.input} data={searchBy}/>
          </div>

          <div className={header_module_scss_1.default.searchButton}>
            <Button_1.default type='button' stylesList={{ padding: '8px' }} fluid>
              Поиск
            </Button_1.default>
          </div>
        </div>
      </div>);
    };
    return (<header className={header_module_scss_1.default.headerContainer}>
      <div className={header_module_scss_1.default.searchContainer}>
        <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faSearch} className={header_module_scss_1.default.searchIcon} color='#aaa'/>
        <Popup_1.default body={<PopupBodySearch />} width='337px'>
          <Input_1.default type='text' classNames={header_module_scss_1.default.search} placeholder='Поиск по людям или сообщениям' allowClear/>
        </Popup_1.default>
      </div>

      <div className={header_module_scss_1.default.userBlock}>
        <div className={header_module_scss_1.default.userMenu}>
          <Avatar_1.default name={currentUser.username} size='medium'/>
          <Popup_1.default body={<PopupBodyUser />} width='215px' center>
            <div className={header_module_scss_1.default.currentUserInfo}>
              <CurrentUserInfo_1.default />
            </div>
          </Popup_1.default>
        </div>

        <div className={header_module_scss_1.default.switcherBlock}>
          <span className={header_module_scss_1.default.stateLabel}>{isOnline ? 'в сети' : 'не доступен'}</span>
          <Switcher_1.default onChange={switchState} value={true}/>
        </div>
      </div>
    </header>);
}
exports.default = Header;
//# sourceMappingURL=Header.js.map