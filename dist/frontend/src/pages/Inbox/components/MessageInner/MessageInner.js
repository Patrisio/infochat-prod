"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Animal_1 = require("../../../../components/Animal/Animal");
const Avatar_1 = require("../../../../components/Avatar/Avatar");
const messageInner_module_scss_1 = require("./messageInner.module.scss");
const react_redux_1 = require("react-redux");
const moment_1 = require("moment");
require("moment/locale/ru");
function MessageInput({ message }) {
    const selectedClient = react_redux_1.useSelector((state) => state.inbox.selectedClient);
    const getMessageCreationTime = (timestamp) => {
        if (timestamp) {
            const date = moment_1.default(timestamp);
            date.locale('ru');
            return date.format('HH:mm');
        }
        return null;
    };
    return (<div className={`
      ${messageInner_module_scss_1.default.messageInnerContainer}
      ${message.username === 'client' ? messageInner_module_scss_1.default.messageInnerContainerLeft : messageInner_module_scss_1.default.messageInnerContainerRight}
    `}>
      <div className={messageInner_module_scss_1.default.messageBody}>
        {message.username === 'client' &&
            <Animal_1.default name={selectedClient.avatarName} color={selectedClient.avatarColor} size='26px'/>}
        <div className={`${message.username === 'client' ? messageInner_module_scss_1.default.clientMessage : messageInner_module_scss_1.default.teammateMessage} ${messageInner_module_scss_1.default.messageWrapper}`} dangerouslySetInnerHTML={{ __html: message.message }}/>
        {message.username === 'operator' &&
            <Avatar_1.default name={message.assignedTo} stylesList={{ marginBottom: '5px' }}/>}
      </div>
      <div className={`
          ${messageInner_module_scss_1.default.creationTime}
          ${message.username === 'client' ? messageInner_module_scss_1.default.creationTimeClient : messageInner_module_scss_1.default.creationTimeTeammate}
        `}>
          {getMessageCreationTime(message.timestamp)}
        </div>
    </div>);
}
exports.default = MessageInput;
//# sourceMappingURL=MessageInner.js.map