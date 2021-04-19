"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const appealsContainerSelector_module_scss_1 = require("./appealsContainerSelector.module.scss");
const actions_1 = require("../../../../actions");
const cloneDeep_1 = require("lodash/cloneDeep");
const Animal_1 = require("../../../../components/Animal/Animal");
const clientData_1 = require("../../../../utils/clientData");
const actions_2 = require("../../../../actions");
const moment_1 = require("moment");
require("moment/locale/ru");
function AppealsContainerSelector({ messages }) {
    const incomingMessages = react_redux_1.useSelector((state) => state.inbox.incomingMessages);
    const selectedClientId = react_redux_1.useSelector((state) => state.inbox.selectedClient.clientId);
    const dispatch = react_redux_1.useDispatch();
    let { projectId } = react_router_1.useParams();
    const showClientMessages = (clientId) => {
        if (clientId !== selectedClientId) {
            const successCallback = (clientInfo) => {
                dispatch(actions_2.updateIncomingMessage({
                    clientId,
                    assigned_to: clientInfo.assignedTo
                }));
                const selectedClient = incomingMessages.find(message => message.clientId === clientId);
                dispatch(actions_1.selectClient(cloneDeep_1.default(selectedClient)));
            };
            dispatch(actions_2.getClientInfo({
                projectId,
                clientId,
                successCallback,
            }));
        }
    };
    const getLastUnreadMessagesCount = (incomingMessage) => {
        let count = 0;
        for (let i = incomingMessage.messagesHistory.length - 1; i >= 0; i--) {
            const message = incomingMessage.messagesHistory[i];
            if (message.username === 'client') {
                count++;
            }
            else {
                break;
            }
        }
        return count;
    };
    const getLastMessage = (messagesHistory, clientName) => {
        const lastMessage = messagesHistory[messagesHistory.length - 1];
        const pureLastMessage = lastMessage.message.replace(/<[^>]*>?/gm, '');
        const username = lastMessage.username;
        return username === 'client' ? `<span class=${appealsContainerSelector_module_scss_1.default.greeting}>${clientName}:</span> ${pureLastMessage}` : `<span class=${appealsContainerSelector_module_scss_1.default.greeting}>Вы:</span> ${pureLastMessage}`;
    };
    const getLastMessageCreationDate = (messagesHistory) => {
        const lastMessage = messagesHistory[messagesHistory.length - 1];
        const timestamp = lastMessage.timestamp;
        if (timestamp) {
            const date = moment_1.default(timestamp);
            date.locale('ru');
            return date.format('DD MMM');
        }
        return null;
    };
    if (messages && messages.length > 0) {
        return (<div className={appealsContainerSelector_module_scss_1.default.appealsContainerSeletor}>
        {messages.map((incomingMessage, idx) => {
                const clientName = clientData_1.getClientName(incomingMessage.avatarColor, incomingMessage.avatarName);
                const unreadMessagesCount = getLastUnreadMessagesCount(incomingMessage);
                return (<div key={idx} className={`
                  ${appealsContainerSelector_module_scss_1.default.incomingMessage}
                  ${incomingMessage.clientId === selectedClientId ? appealsContainerSelector_module_scss_1.default.selected : appealsContainerSelector_module_scss_1.default.message}
                `} onClick={() => showClientMessages(incomingMessage.clientId)}>
                <Animal_1.default name={incomingMessage.avatarName} color={incomingMessage.avatarColor} size='26px'/>

                <div className={appealsContainerSelector_module_scss_1.default.clientAndLastMessage}>
                  <div className={appealsContainerSelector_module_scss_1.default.clientName}>{clientName}</div>
                  <div className={`
                      ${appealsContainerSelector_module_scss_1.default.lastMessage}
                      ${incomingMessage.clientId === selectedClientId && appealsContainerSelector_module_scss_1.default.lastMessageSelected}`} dangerouslySetInnerHTML={{ __html: getLastMessage(incomingMessage.messagesHistory, clientName) }}/>
                </div>

                <div className={appealsContainerSelector_module_scss_1.default.countAndCreationDate}>
                  <span className={`
                      ${appealsContainerSelector_module_scss_1.default.time}
                      ${incomingMessage.clientId === selectedClientId && appealsContainerSelector_module_scss_1.default.timeSelected}
                    `}>
                    {getLastMessageCreationDate(incomingMessage.messagesHistory)}
                  </span>
                  {!(incomingMessage.clientId === selectedClientId) && unreadMessagesCount > 0 &&
                        <div className={appealsContainerSelector_module_scss_1.default.count}>{unreadMessagesCount}</div>}
                </div>
              </div>);
            })}
      </div>);
    }
    return null;
}
exports.default = AppealsContainerSelector;
;
//# sourceMappingURL=AppealsContainerSelector.js.map