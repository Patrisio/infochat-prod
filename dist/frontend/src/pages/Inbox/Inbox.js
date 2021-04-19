"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const react_router_1 = require("react-router");
const socket_1 = require("../../socket");
const Context_1 = require("../../context/Context");
const actions_1 = require("../../actions");
const Sidebar_1 = require("../../components/Sidebar/Sidebar");
const Header_1 = require("../../components/Header/Header");
const SidebarList_1 = require("../../components/Sidebar/components/SidebarList/SidebarList");
const Avatar_1 = require("../../components/Avatar/Avatar");
const Spin_1 = require("../../components/Spin/Spin");
const AppealsContainerSelector_1 = require("./components/AppealsContainerSelector/AppealsContainerSelector");
const AppealsContainerMessages_1 = require("./components/AppealsContainerMessages/AppealsContainerMessages");
const PersonInfo_1 = require("./components/PersonInfo/PersonInfo");
const inbox_module_scss_1 = require("./inbox.module.scss");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const string_1 = require("../../utils/string");
const cloneDeep_1 = require("lodash/cloneDeep");
const man_png_1 = require("../../assets/man.png");
function Inbox({ messagesCount, clientIds }) {
    let { projectId, dialogType } = react_router_1.useParams();
    const { currentUser, setCurrentUser } = react_1.useContext(Context_1.Context);
    const selectedClient = react_redux_1.useSelector((state) => state.inbox.selectedClient);
    const teammates = react_redux_1.useSelector((state) => state.teammates.teammates);
    const { channels, fetching } = react_redux_1.useSelector((state) => state.channels);
    const dispatch = react_redux_1.useDispatch();
    let history = react_router_dom_1.useHistory();
    react_1.useEffect(() => {
        socket_1.default.emit('joinRoom', projectId);
        var myHeaders = new Headers();
        const token = localStorage.getItem('token') || '';
        myHeaders.append("Authorization", `Bearer ${token}`);
        dispatch(actions_1.fetchIncomingMessages({ projectId }));
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
        dispatch(actions_1.fetchChannels({ projectId }));
    }, []);
    react_1.useEffect(() => {
        socket_1.default.on('updateAssignedToAnybody', (payload) => {
            dispatch(actions_1.assignTeammate({
                username: payload.assigned_to,
                clientId: payload.clientId
            }));
        });
        socket_1.default.on('addIncomingMessage', (message) => {
            const newClient = {
                id: string_1.generateRandomHash(),
                projectId: message.projectId,
                clientId: message.clientId,
                messagesHistory: [message.message],
                avatarName: message.avatarName,
                avatarColor: message.avatarColor,
            };
            dispatch(actions_1.addIncomingMessageForSelectedClient(message.message));
            dispatch(actions_1.addIncomingMessage(newClient));
        });
        socket_1.default.on('updateUnreadDialog', (payload) => {
            setCurrentUser((prev) => {
                const unreadClients = cloneDeep_1.default(prev.unreadClientIds);
                const assignedClients = cloneDeep_1.default(prev.assignedClientIds);
                const openedClients = cloneDeep_1.default(prev.openedClientIds);
                const client = {
                    clientId: payload.clientId,
                    projectId: payload.projectId,
                    avatarName: payload.avatarName,
                    avatarColor: payload.avatarColor,
                    messagesHistory: [payload.message]
                };
                const foundClientInUnread = unreadClients.find((client) => client.clientId === payload.clientId);
                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                if (foundClientInUnread) {
                    const foundClientIndexInUnread = unreadClients.findIndex((client) => client.clientId === payload.clientId);
                    foundClientInUnread.messagesHistory.push(payload.message);
                    unreadClients.splice(foundClientIndexInUnread, 1, foundClientInUnread);
                }
                const foundClientInAssigned = assignedClients.find((client) => client.clientId === payload.clientId);
                if (foundClientInAssigned) {
                    const foundClientIndexInAssigned = assignedClients.findIndex((client) => client.clientId === payload.clientId);
                    foundClientInAssigned.messagesHistory.push(payload.message);
                    assignedClients.splice(foundClientIndexInAssigned, 1, foundClientInAssigned);
                    const foundClientIndexInOpened = openedClients.findIndex((client) => client.clientId === payload.clientId);
                    const foundClientInOpened = openedClients.find((client) => client.clientId === payload.clientId);
                    foundClientInOpened.messagesHistory.push(payload.message);
                    openedClients.splice(foundClientIndexInOpened, 1, foundClientInOpened);
                }
                if (foundClientInUnread || foundClientInAssigned) {
                    dispatch(actions_1.updateAssignedUser({
                        clientId: prev.clientId,
                        username: prev.username,
                        email: prev.email,
                        projectId,
                        assignedClientIds: assignedClients,
                        assignedCount: prev.assignedCount,
                        unreadClientIds: unreadClients,
                        unreadCount: prev.unreadCount,
                        openedClientIds: openedClients,
                        openedCount: prev.openedCount,
                        closedClientIds: prev.closedClientIds,
                        closedCount: prev.closedCount,
                    }));
                    return cloneDeep_1.default(Object.assign(prev, {
                        unreadClientIds: unreadClients,
                        openedClientIds: openedClients,
                        assignedClientIds: assignedClients
                    }));
                }
                dispatch(actions_1.updateAssignedUser(Object.assign({
                    assignedCount: prev.assignedCount,
                    unreadCount: prev.unreadCount + 1,
                    openedCount: currentUser.openedCount,
                    projectId,
                }, {
                    clientId: selectedClient.clientId,
                    username: currentUser.username,
                    email: currentUser.email,
                    assignedClientIds: assignedClients,
                    assignedCount: prev.assignedCount,
                    unreadClientIds: unreadClients.concat(client),
                    unreadCount: prev.unreadCount + 1,
                    openedClientIds: openedClients,
                    openedCount: currentUser.openedCount,
                    closedClientIds: prev.closedClientIds,
                    closedCount: currentUser.closedCount,
                })));
                return cloneDeep_1.default(Object.assign(prev, {
                    unreadCount: prev.unreadCount + 1,
                    unreadClientIds: unreadClients.concat(client)
                }));
            });
        });
        socket_1.default.on('reduceUnreadCountAnybody', (payload) => {
            setCurrentUser((prev) => {
                return cloneDeep_1.default(Object.assign(prev, {
                    unreadCount: payload.unreadCount,
                    unreadClientIds: payload.unreadClientIds,
                    openedCount: payload.openedCount,
                    openedClientIds: payload.openedClientIds,
                    assignedClientIds: payload.assignedClientIds,
                    assignedCount: payload.assignedCount
                }));
            });
        });
        socket_1.default.on('reduceOpenedToAnybody', (payload) => {
            setCurrentUser((prev) => {
                return cloneDeep_1.default(Object.assign(prev, {
                    openedCount: payload.openedCount,
                    openedClientIds: payload.openedClientIds,
                }));
            });
        });
        return () => {
            socket_1.default.off('updateAssignedToAnybody');
            socket_1.default.off('addIncomingMessage');
            socket_1.default.off('updateUnreadDialog');
            socket_1.default.off('reduceUnreadCountAnybody');
            socket_1.default.off('reduceOpenedToAnybody');
        };
    }, [socket_1.default]);
    const hideOpenedMessagesArea = () => {
        if (selectedClient.clientId !== '') {
            dispatch(actions_1.selectClient(cloneDeep_1.default({
                id: '',
                projectId: '',
                clientId: '',
                messagesHistory: [],
                assigned_to: ''
            })));
        }
    };
    const switchDialog = (dialog) => {
        if (dialogType !== dialog) {
            history.push(`/project/${projectId}/inbox/${dialog}`);
            hideOpenedMessagesArea();
        }
    };
    const formatDialogs = (teammate) => {
        const { allClientIds, unreadCount, unreadClientIds, assignedCount, assignedClientIds, openedCount, openedClientIds } = teammate;
        const all = {
            name: 'Все',
            allClientIds,
            icon: <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faInbox}/>,
            stylesList: {
                marginLeft: '8px',
            },
            onClick: () => switchDialog('all'),
        };
        const unread = {
            name: 'Непрочитанные',
            count: unreadCount,
            icon: <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faEnvelope}/>,
            stylesList: {
                marginLeft: '8px',
            },
            unreadClientIds,
            onClick: () => switchDialog('unread')
        };
        const opened = {
            name: 'Открытые',
            count: openedCount,
            icon: <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faEnvelopeOpen}/>,
            stylesList: {
                marginLeft: '8px',
            },
            openedClientIds,
            onClick: () => switchDialog('opened')
        };
        const assigned = {
            name: 'Назначенные мне',
            count: assignedCount,
            icon: <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faAt}/>,
            stylesList: {
                marginLeft: '8px',
            },
            assignedClientIds,
            onClick: () => switchDialog('assigned')
        };
        const dialogs = [all, unread, opened, assigned];
        return dialogs;
    };
    const formatTeammates = (teammates) => {
        const result = [];
        for (let { username } of teammates) {
            result.push({
                name: username,
                icon: <Avatar_1.default name={username} size='small'/>
            });
        }
        if (currentUser.role === 'owner') {
            result.push({
                name: 'Добавить сотрудника',
                stylesList: {
                    color: '#4eaaff',
                    fontWeight: '500',
                },
                onClick: () => history.push(`/project/${projectId}/settings/teammates`),
            });
        }
        return result;
    };
    const getChannelName = (name) => {
        switch (name) {
            case 'chat':
                return 'Чат на сайте';
        }
    };
    const formatChannels = (channels) => {
        const result = [];
        if (channels.length > 0) {
            for (let { name } of channels) {
                result.push({
                    name: getChannelName(name),
                    icon: <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faComments}/>,
                    stylesList: {
                        marginLeft: '8px',
                    },
                });
            }
            if (currentUser.role === 'owner') {
                result.push({
                    name: 'Добавить канал',
                    stylesList: {
                        color: '#4eaaff',
                        fontWeight: '500',
                    },
                    onClick: () => history.push(`/project/${projectId}/settings/channels`),
                });
            }
        }
        return result;
    };
    const dialogTitle = () => <h3 className={inbox_module_scss_1.default.title}>Диалоги</h3>;
    const teammatesTitle = () => (<react_router_dom_1.Link className={inbox_module_scss_1.default.title} to={`/project/${projectId}/settings/teammates`}>
      Сотрудники
    </react_router_dom_1.Link>);
    const channelsTitle = () => (<react_router_dom_1.Link className={inbox_module_scss_1.default.title} to={`/project/${projectId}/settings/channels`}>
      Каналы
    </react_router_dom_1.Link>);
    return (<div>
      <div className={inbox_module_scss_1.default.conversationsContainer}>
        <Sidebar_1.default>
          <SidebarList_1.default title={dialogTitle()} listItems={formatDialogs(currentUser)}/>

          <SidebarList_1.default title={channelsTitle()} listItems={formatChannels(channels)}/>

          <SidebarList_1.default title={teammatesTitle()} listItems={formatTeammates(teammates)}/>

          <div className={inbox_module_scss_1.default.fixedSidebarSection}>
            <SidebarList_1.default listItems={[{
                name: 'Настройки',
                onClick: () => history.push(`/project/${projectId}/settings/start`),
            }]}/>
          </div>
        </Sidebar_1.default>

        <div className={inbox_module_scss_1.default.conversationsHeaderDialogs}>
          <Header_1.default />
          {fetching ?
            <Spin_1.default /> :
            <div className={inbox_module_scss_1.default.conversationsDialogs}>
              <AppealsContainerSelector_1.default messages={dialogType === 'all' ? [...currentUser.unreadClientIds, ...currentUser.openedClientIds] : currentUser[`${dialogType}ClientIds`]}/>
              {channels.length === 0 ?
                    <div>
                  <img src={man_png_1.default} alt='man'/>
                  <p>У вас ещё нет ни одного канала</p>
                  <react_router_dom_1.Link to={`/project/${projectId}/settings/channels`}>
                    Добавить канал
                  </react_router_dom_1.Link>
                </div> :
                    selectedClient.clientId === '' ?
                        <div className={inbox_module_scss_1.default.notSelectedClientIdContainer}>
                  <p className={inbox_module_scss_1.default.notSelectedClientIdNotice}>Пожалуйста, выберите диалог, чтобы начать общение</p>
                </div> :
                        <>
                  <AppealsContainerMessages_1.default clientIds={clientIds}/>
                  <PersonInfo_1.default selectedClient={selectedClient}/>
                </>}
            </div>}
        </div>
      </div>
    </div>);
}
exports.default = Inbox;
//# sourceMappingURL=Inbox.js.map