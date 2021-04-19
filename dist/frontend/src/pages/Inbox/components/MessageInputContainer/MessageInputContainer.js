"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const socket_1 = require("../../../../socket");
const messageInputContainer_module_scss_1 = require("./messageInputContainer.module.scss");
const Button_1 = require("../../../../components/Button/Button");
const actions_1 = require("../../../../actions");
const Context_1 = require("../../../../context/Context");
const cloneDeep_1 = require("lodash/cloneDeep");
function MessageInputContainer() {
    let { projectId, dialogType } = react_router_1.useParams();
    let pressed = new Set();
    const { currentUser, setCurrentUser } = react_1.useContext(Context_1.Context);
    const selectedClient = react_redux_1.useSelector((state) => state.inbox.selectedClient);
    const isAssigned = Boolean(selectedClient.assigned_to);
    const dispatch = react_redux_1.useDispatch();
    const clearInputArea = (inputArea) => {
        setTimeout(() => {
            for (let i = 0; i < inputArea.children.length; i++) {
                inputArea.children[i].remove();
            }
        }, 0);
    };
    const sendMessage = (inputArea) => {
        const message = inputArea.innerHTML;
        const timestamp = Date.now();
        const newMessage = {
            clientId: selectedClient.clientId,
            username: 'operator',
            message,
            timestamp,
            assignedTo: selectedClient.assigned_to
        };
        const successCallback = () => {
            setCurrentUser((prev) => {
                const openedClientIds = prev.openedClientIds;
                const assignedClientIds = prev.assignedClientIds;
                const foundOpenedDialog = openedClientIds.find((dialog) => dialog.clientId === selectedClient.clientId);
                const foundAssignedDialog = assignedClientIds.find((dialog) => dialog.clientId === selectedClient.clientId);
                foundOpenedDialog.messagesHistory.push(newMessage);
                foundAssignedDialog.messagesHistory.push(newMessage);
                const successCallback = () => {
                    dispatch(actions_1.assignTeammate({
                        username: currentUser.username,
                        clientId: selectedClient.clientId
                    }));
                    socket_1.default.emit('updateAssignedToAnybody', {
                        username: currentUser.username,
                        clientId: selectedClient.clientId
                    });
                    socket_1.default.emit('reduceOpenedToAnybody', {
                        openedClientIds: currentUser.openedClientIds.filter((client) => client.clientId !== selectedClient.clientId),
                        openedCount: currentUser.openedCount,
                    });
                };
                dispatch(actions_1.updateAssignedUser({
                    clientId: selectedClient.clientId,
                    username: currentUser.username,
                    email: currentUser.email,
                    projectId,
                    assignedClientIds,
                    assignedCount: prev.assignedCount,
                    unreadClientIds: currentUser.unreadClientIds,
                    unreadCount: currentUser.unreadCount,
                    openedClientIds,
                    openedCount: currentUser.openedCount,
                    closedClientIds: prev.closedClientIds,
                    closedCount: currentUser.closedCount,
                    successCallback,
                }));
                return Object.assign(prev, {
                    openedClientIds,
                    assignedClientIds
                });
            });
            dispatch(actions_1.addIncomingMessage({
                clientId: selectedClient.clientId,
                projectId,
                messagesHistory: [newMessage]
            }));
            dispatch(actions_1.addIncomingMessageForSelectedClient(newMessage));
            inputArea.innerHTML = '';
            clearInputArea(inputArea);
            socket_1.default.emit('operatorMessageFromInfochat', {
                room: selectedClient.clientId,
                message: {
                    clientId: selectedClient.clientId,
                    projectId,
                    message: newMessage,
                    timestamp,
                }
            }, (data) => console.log(data));
        };
        dispatch(actions_1.addToInboxIncomingMessage({
            clientId: selectedClient.clientId,
            projectId,
            message: newMessage,
            timestamp,
            successCallback,
        }));
    };
    const runOnKeys = (event, func) => {
        const inputArea = event.target;
        pressed.add(event.which);
        if (pressed.has(16)) {
            return;
        }
        if (pressed.has(13) && pressed.size === 1 && inputArea.textContent !== '') {
            func(inputArea);
        }
        pressed.clear();
        document.addEventListener('keyup', function (event) {
            pressed.delete(event.which);
        });
    };
    const appointDialog = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        setCurrentUser((prev) => {
            console.log(6);
            const client = {
                clientId: selectedClient.clientId,
                projectId: selectedClient.projectId,
                messagesHistory: selectedClient.messagesHistory,
                avatarName: selectedClient.avatarName,
                avatarColor: selectedClient.avatarColor,
            };
            const getOpenedClientIds = (openedClientIds) => {
                if (openedClientIds.find((client) => client.clientId === selectedClient.clientId)) {
                    return {
                        openedClientIds,
                        openedCount: prev.openedCount,
                    };
                }
                return {
                    openedClientIds: openedClientIds.concat(client),
                    openedCount: prev.openedCount + 1,
                };
            };
            const getUnreadClientIds = (unreadClientIds) => {
                if (unreadClientIds.find((client) => client.clientId === selectedClient.clientId)) {
                    return {
                        unreadClientIds: unreadClientIds.filter((client) => client.clientId !== selectedClient.clientId),
                        unreadCount: prev.unreadCount - 1,
                    };
                }
                return {
                    unreadClientIds: prev.unreadClientIds,
                    unreadCount: prev.unreadCount,
                };
            };
            const successCallback = () => {
                dispatch(actions_1.assignTeammate({
                    username: currentUser.username,
                    clientId: selectedClient.clientId
                }));
                socket_1.default.emit('reduceUnreadCountAnybody', {
                    unreadCount: prev.unreadCount,
                    unreadClientIds: prev.unreadClientIds.filter((client) => client.clientId !== selectedClient.clientId),
                    openedCount: prev.openedCount,
                    openedClientIds: prev.openedClientIds,
                    assignedClientIds: prev.assignedClientIds,
                    assignedCount: prev.assignedCount
                });
                socket_1.default.emit('updateAssignedToAnybody', {
                    assigned_to: prev.username,
                    clientId: client.clientId
                });
            };
            dispatch(actions_1.updateAssignedUser(Object.assign(Object.assign(Object.assign({ clientId: selectedClient.clientId, username: prev.username, email: prev.email, projectId, assignedClientIds: prev.assignedClientIds.concat(client), assignedCount: prev.assignedCount + 1 }, getUnreadClientIds(prev.unreadClientIds)), getOpenedClientIds(prev.openedClientIds)), { closedClientIds: prev.closedClientIds, closedCount: prev.closedCount, successCallback })));
            return cloneDeep_1.default(Object.assign(prev, Object.assign(Object.assign({ assignedClientIds: prev.assignedClientIds.concat(client), assignedCount: prev.assignedCount + 1 }, getUnreadClientIds(prev.unreadClientIds)), getOpenedClientIds(prev.openedClientIds))));
        });
    };
    return (<>
      {isAssigned ?
            <div className={messageInputContainer_module_scss_1.default.inputArea} placeholder='Введите сообщение' contentEditable onKeyDown={(e) => runOnKeys(e, sendMessage)}/> :
            <div className={messageInputContainer_module_scss_1.default.appointedContainer}>
          <div className={messageInputContainer_module_scss_1.default.appointedArea}>
            <Button_1.default type='button' fluid background='success' onClick={appointDialog} stylesList={{
                    padding: '7px 5px',
                }}>
              Взять в работу
            </Button_1.default>

            <p className={messageInputContainer_module_scss_1.default.appointedNotice}>Диалог будет закреплен за вами</p>
          </div>
        </div>}
    </>);
}
exports.default = MessageInputContainer;
//# sourceMappingURL=MessageInputContainer.js.map