"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const store_1 = require("./store");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const SignInPage_1 = require("./pages/SignInPage/SignInPage");
const SignUpPage_1 = require("./pages/SignUpPage/SignUpPage");
const Inbox_1 = require("./pages/Inbox/Inbox");
const Chat_1 = require("./pages/Chat/Chat");
const InviteForm_1 = require("./pages/InviteForm/InviteForm");
const ChatSettings_1 = require("./pages/ChatSettings/ChatSettings");
const Settings_1 = require("./pages/Settings/Settings");
const socket_1 = require("./socket");
const Context_1 = require("./context/Context");
require("normalize.css");
require("./App.css");
const store = store_1.configureStore();
function App() {
    react_1.useEffect(() => {
        socket_1.default.on('msgToClient', (message) => {
            console.log(message);
        });
    }, []);
    const initialCurrentUser = {
        avatar: '',
        email: '',
        role: '',
        status: '',
        username: '',
        allClientIds: [],
        unreadCount: 0,
        unreadClientIds: [],
        assignedCount: 0,
        assignedClientIds: [],
        openedCount: 0,
        openedClientIds: [],
        closedCount: 0,
        closedClientIds: []
    };
    const [currentUser, setCurrentUser] = react_1.useState(initialCurrentUser);
    const location = react_router_dom_1.useLocation();
    let locationState = location.state;
    return (<react_redux_1.Provider store={store}>
      <Context_1.Context.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <react_router_dom_1.Switch location={Object.assign(Object.assign({}, location), { state: locationState }) || location}>
            <react_router_dom_1.Route exact path="/" component={SignInPage_1.default}/>
            <react_router_dom_1.Route path="/signin/" component={SignInPage_1.default}/>
            <react_router_dom_1.Route path="/signup/" component={SignUpPage_1.default}/>
            <react_router_dom_1.Route path="/project/:projectId/inbox/:dialogType">
              <Inbox_1.default clientIds={currentUser.openedClientIds} messagesCount={currentUser.openedCount}/>
            </react_router_dom_1.Route>
            <react_router_dom_1.Route path="/project/:projectId/iframe/:clientId" component={Chat_1.default}/>
            <react_router_dom_1.Route path="/project/:projectId/chat-settings" component={ChatSettings_1.default}/>
            {<react_router_dom_1.Route path={`/project/:projectId/settings/:pageId`} exact>
                <Settings_1.default />
              </react_router_dom_1.Route>}
            
            <react_router_dom_1.Route path="/project/:projectId/teammate/invite/:inviteId" component={InviteForm_1.default}/>
          </react_router_dom_1.Switch>
        </div>
      </Context_1.Context.Provider>
    </react_redux_1.Provider>);
}
exports.default = App;
//# sourceMappingURL=App.js.map