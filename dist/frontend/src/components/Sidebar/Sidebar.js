"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_1 = require("react-router");
const react_redux_1 = require("react-redux");
const actions_1 = require("../../actions");
const sidebar_module_scss_1 = require("./sidebar.module.scss");
const Context_1 = require("../../context/Context");
function Sidebar({ children, mode = 'dark' }) {
    let { projectId } = react_router_1.useParams();
    const selectedClient = react_redux_1.useSelector((state) => state.inbox.selectedClient);
    const { currentUser, setCurrentUser } = react_1.useContext(Context_1.Context);
    const dispatch = react_redux_1.useDispatch();
    react_1.useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        var requestUserOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch('/auth/getCurrentUser', requestUserOptions)
            .then(response => response.json())
            .then(currentUser => {
            setCurrentUser(currentUser);
        })
            .catch(error => console.log('error', error));
        dispatch(actions_1.fetchTeammates({ projectId }));
    }, []);
    return (<div className={`
        ${sidebar_module_scss_1.default.sidebarContainer}
        ${mode === 'light' ? sidebar_module_scss_1.default.lightMode : sidebar_module_scss_1.default.darkMode}
      `}>
      {children}
    </div>);
}
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map