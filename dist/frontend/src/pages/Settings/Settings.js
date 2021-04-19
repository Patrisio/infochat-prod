"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_router_1 = require("react-router");
const Sidebar_1 = require("../../components/Sidebar/Sidebar");
const Teammates_1 = require("../Teammates/Teammates");
const Start_1 = require("../Start/Start");
const Channels_1 = require("../Channels/Channels");
const SidebarList_1 = require("../../components/Sidebar/components/SidebarList/SidebarList");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const settings_module_scss_1 = require("./settings.module.scss");
function Settings() {
    let { projectId, pageId } = react_router_1.useParams();
    const history = react_router_1.useHistory();
    const settingsTitle = () => (<react_router_dom_1.Link className={settings_module_scss_1.default.title} to={`/project/${projectId}/settings/start`}>
      Настройки
    </react_router_dom_1.Link>);
    const formatSettings = () => {
        const channels = {
            name: 'Каналы',
            stylesList: {
                color: '#363636',
            },
            onClick: () => history.push(`/project/${projectId}/settings/channels`),
        };
        const teammates = {
            name: 'Сотрудники',
            stylesList: {
                color: '#363636',
            },
            onClick: () => {
                history.push({
                    pathname: `/project/${projectId}/settings/teammates`,
                    state: { page: 'teammates' }
                });
            },
        };
        const dialogs = [channels, teammates];
        return dialogs;
    };
    const displayPage = () => {
        switch (pageId) {
            case 'start':
                return <Start_1.default />;
            case 'teammates':
                return <Teammates_1.default />;
            case 'channels':
                return <Channels_1.default />;
        }
    };
    return (<div className={settings_module_scss_1.default.settingsContainer}>
      <Sidebar_1.default mode='light'>
        <react_router_dom_1.Link className={settings_module_scss_1.default.link} to={`/project/${projectId}/inbox/opened`}>
          <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faArrowAltCircleLeft}/>
          <span className={settings_module_scss_1.default.linkText}>Закрыть настройки</span>
        </react_router_dom_1.Link>

        <SidebarList_1.default mode='light' title={settingsTitle()} listItems={formatSettings()}/>
      </Sidebar_1.default>

      {displayPage()}
    </div>);
}
exports.default = Settings;
//# sourceMappingURL=Settings.js.map