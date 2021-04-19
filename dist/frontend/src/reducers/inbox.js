"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inboxReducer = void 0;
const inbox_1 = require("../constants/inbox");
const teammates_1 = require("../constants/teammates");
const cloneDeep_1 = require("lodash/cloneDeep");
const initialState = {
    messages: [],
    incomingMessages: [],
    selectedClient: {
        id: '',
        projectId: '',
        clientId: '',
        messagesHistory: [],
        assigned_to: '',
    },
};
const inboxReducer = (state = initialState, action) => {
    switch (action.type) {
        case inbox_1.MESSAGES.ADD:
            const message = action.message;
            let newMessages;
            if (Array.isArray(message)) {
                newMessages = message;
            }
            else {
                newMessages = [message];
            }
            return Object.assign(Object.assign({}, state), { messages: [
                    ...state.messages,
                    ...newMessages
                ] });
        case inbox_1.INCOMING_MESSAGES.ADD:
            if (Array.isArray(action.incomingMessage)) {
                return cloneDeep_1.default(Object.assign(Object.assign({}, state), { incomingMessages: action.incomingMessage }));
            }
            else {
                const client = state.incomingMessages.find(incMsg => (incMsg === null || incMsg === void 0 ? void 0 : incMsg.clientId) === action.incomingMessage.clientId);
                const clientIndex = state.incomingMessages.findIndex(incMsg => incMsg.clientId === action.incomingMessage.clientId);
                const isNewClient = !client;
                if (isNewClient) {
                    return Object.assign(Object.assign({}, state), { incomingMessages: [
                            ...state.incomingMessages,
                            action.incomingMessage
                        ] });
                }
                else {
                    const incomingMessagesCopy = cloneDeep_1.default(state.incomingMessages);
                    client === null || client === void 0 ? void 0 : client.messagesHistory.push(...action.incomingMessage.messagesHistory);
                    incomingMessagesCopy.splice(clientIndex, 1, client);
                    return cloneDeep_1.default(Object.assign(Object.assign({}, state), { incomingMessages: incomingMessagesCopy }));
                }
            }
        case inbox_1.INCOMING_MESSAGES_FOR_SELECTED_CLIENT.ADD:
            if (action.incomingMessage.clientId === state.selectedClient.clientId) {
                const messagesHistory = state.selectedClient.messagesHistory;
                return Object.assign(Object.assign({}, state), { selectedClient: cloneDeep_1.default(Object.assign(state.selectedClient, { messagesHistory: [...messagesHistory, action.incomingMessage] })) });
            }
            return state;
        case inbox_1.SELECT_CLIENT:
            return Object.assign(Object.assign({}, state), { selectedClient: action.client });
        case inbox_1.SELECTED_CLIENT_UPDATE:
            return cloneDeep_1.default(Object.assign(Object.assign({}, state), { selectedClient: Object.assign(state.selectedClient, action.payload) }));
        case inbox_1.INCOMING_MESSAGES.UPDATE:
            const client = state.incomingMessages.find(incMsg => (incMsg === null || incMsg === void 0 ? void 0 : incMsg.clientId) === action.payload.clientId);
            const clientIndex = state.incomingMessages.findIndex(incMsg => (incMsg === null || incMsg === void 0 ? void 0 : incMsg.clientId) === action.payload.clientId);
            const updatedClient = Object.assign(client, action.payload);
            state.incomingMessages.splice(clientIndex, 1, updatedClient);
            return Object.assign(Object.assign({}, state), { incomingMessages: state.incomingMessages });
        case teammates_1.TEAMMATE.ASSIGN:
            const incomingMessageIndex = state.incomingMessages.findIndex(incomingMessage => incomingMessage.clientId === action.payload.clientId);
            state.incomingMessages[incomingMessageIndex].assigned_to = action.payload.username;
            return Object.assign(Object.assign({}, state), { incomingMessages: state.incomingMessages, selectedClient: cloneDeep_1.default(Object.assign(state.selectedClient, { assigned_to: action.payload.username })) });
        default:
            return state;
    }
};
exports.inboxReducer = inboxReducer;
//# sourceMappingURL=inbox.js.map