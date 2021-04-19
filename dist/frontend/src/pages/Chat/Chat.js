"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const socket_1 = require("../../socket");
const chat_module_scss_1 = require("./chat.module.scss");
const actions_1 = require("../../actions");
const Animal_1 = require("../../components/Animal/Animal");
function Chat() {
    const messages = react_redux_1.useSelector((state) => state.inbox.messages);
    const dispatch = react_redux_1.useDispatch();
    let { clientId, projectId } = react_router_1.useParams();
    let pressed = new Set();
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
    react_1.useEffect(() => {
        socket_1.default.emit('joinRoom', clientId);
        getMessagesHistory();
    }, []);
    react_1.useEffect(() => {
        socket_1.default.on('addMessageToClientChat', (message) => {
            dispatch(actions_1.addMessage(message.message));
        });
        return () => {
            socket_1.default.off('addMessageToClientChat');
        };
    }, [socket_1.default]);
    const getMessagesHistory = async () => {
        dispatch(actions_1.fetchIncomingMessages({
            projectId,
            clientId,
            successCallback: (messages) => dispatch(actions_1.addMessage(messages.messagesHistory)),
        }));
    };
    const sendMessage = (inputArea) => {
        const animal = new Animal_1.default({ name: '' });
        const avatarName = animal.validateName().animal;
        const avatarColor = animal.validateColor().color;
        const timestamp = Date.now();
        const message = inputArea.innerHTML;
        const newMessage = {
            clientId,
            username: 'client',
            message,
            avatarName,
            avatarColor,
            timestamp
        };
        const successCallback = () => {
            dispatch(actions_1.addMessage(newMessage));
            inputArea.innerHTML = '';
            clearInputArea(inputArea);
            socket_1.default.emit('chatMessage', {
                clientId,
                projectId,
                message: newMessage,
                avatarName,
                avatarColor,
                timestamp,
            }, (data) => console.log(data));
        };
        dispatch(actions_1.addToInboxIncomingMessage({
            clientId,
            projectId,
            message: newMessage,
            avatarName,
            avatarColor,
            timestamp,
            successCallback,
        }));
    };
    const clearInputArea = (inputArea) => {
        setTimeout(() => {
            for (let i = 0; i < inputArea.children.length; i++) {
                inputArea.children[i].remove();
            }
        }, 0);
    };
    return (<div>
      <div className={chat_module_scss_1.default.chatWrapper}>
        <div>
          {messages && messages.length > 0 &&
            messages.map((message, idx) => (<div className={`${message.username === 'client' ? chat_module_scss_1.default.clientMessage : chat_module_scss_1.default.teammateMessage} ${chat_module_scss_1.default.messageWrapper}`} key={idx} dangerouslySetInnerHTML={{ __html: message.message }}/>))}
        </div>

        <div className={chat_module_scss_1.default.inputArea} placeholder='Введите сообщение' contentEditable onKeyDown={(e) => runOnKeys(e, sendMessage)}/>
      </div>
    </div>);
}
exports.default = Chat;
//# sourceMappingURL=Chat.js.map