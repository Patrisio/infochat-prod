"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTeammate = exports.deleteTeammate = exports.addTeammate = exports.fetchTeammates = exports.updateChannelSettings = exports.addChannels = exports.addChannel = exports.fetchChannels = exports.getClientInfo = exports.addToInboxIncomingMessage = exports.updateClientData = exports.updateAssignedUser = exports.fetchIncomingMessages = exports.updateSelectedClient = exports.updateIncomingMessage = exports.addIncomingMessageForSelectedClient = exports.selectClient = exports.addIncomingMessage = exports.addMessage = exports.authSignUp = exports.authSignIn = exports.authInvite = void 0;
const inbox_1 = require("../constants/inbox");
const teammates_1 = require("../constants/teammates");
const channels_1 = require("../constants/channels");
const auth_1 = require("../constants/auth");
const authInvite = (payload) => ({
    type: auth_1.AUTH.INVITE,
    payload,
});
exports.authInvite = authInvite;
const authSignIn = (payload) => ({
    type: auth_1.AUTH.SIGNIN,
    payload,
});
exports.authSignIn = authSignIn;
const authSignUp = (payload) => ({
    type: auth_1.AUTH.SIGNUP,
    payload,
});
exports.authSignUp = authSignUp;
const addMessage = (message) => ({
    type: inbox_1.MESSAGES.ADD,
    message
});
exports.addMessage = addMessage;
const getClientInfo = (payload) => ({
    type: inbox_1.SELECTED_CLIENT_GET_INFO,
    payload
});
exports.getClientInfo = getClientInfo;
const addToInboxIncomingMessage = (payload) => ({
    type: inbox_1.INCOMING_MESSAGES.ADD_TO_INBOX,
    payload,
});
exports.addToInboxIncomingMessage = addToInboxIncomingMessage;
const fetchIncomingMessages = (incomingMessage) => ({
    type: inbox_1.INCOMING_MESSAGES.FETCH,
    incomingMessage
});
exports.fetchIncomingMessages = fetchIncomingMessages;
const updateAssignedUser = (incomingMessage) => ({
    type: inbox_1.ASSIGNED_USER.UPDATE,
    incomingMessage
});
exports.updateAssignedUser = updateAssignedUser;
const updateClientData = (payload) => ({
    type: inbox_1.CLIENT_DATA.UPDATE,
    payload,
});
exports.updateClientData = updateClientData;
const addIncomingMessage = (incomingMessage) => ({
    type: inbox_1.INCOMING_MESSAGES.ADD,
    incomingMessage
});
exports.addIncomingMessage = addIncomingMessage;
const selectClient = (client) => ({
    type: inbox_1.SELECT_CLIENT,
    client
});
exports.selectClient = selectClient;
const addTeammate = (teammate) => ({
    type: teammates_1.TEAMMATE.ADD,
    teammate
});
exports.addTeammate = addTeammate;
const deleteTeammate = (teammate) => ({
    type: teammates_1.TEAMMATE.DELETE,
    teammate
});
exports.deleteTeammate = deleteTeammate;
const assignTeammate = (payload) => ({
    type: teammates_1.TEAMMATE.ASSIGN,
    payload
});
exports.assignTeammate = assignTeammate;
const addIncomingMessageForSelectedClient = (incomingMessage) => ({
    type: inbox_1.INCOMING_MESSAGES_FOR_SELECTED_CLIENT.ADD,
    incomingMessage
});
exports.addIncomingMessageForSelectedClient = addIncomingMessageForSelectedClient;
const updateIncomingMessage = (payload) => ({
    type: inbox_1.INCOMING_MESSAGES.UPDATE,
    payload
});
exports.updateIncomingMessage = updateIncomingMessage;
const updateSelectedClient = (payload) => ({
    type: inbox_1.SELECTED_CLIENT_UPDATE,
    payload
});
exports.updateSelectedClient = updateSelectedClient;
const fetchChannels = (payload) => ({
    type: channels_1.CHANNELS.FETCH,
    payload
});
exports.fetchChannels = fetchChannels;
const addChannels = (payload) => ({
    type: channels_1.CHANNELS.ADD,
    payload
});
exports.addChannels = addChannels;
const addChannel = (payload) => ({
    type: channels_1.CHANNEL.ADD,
    payload
});
exports.addChannel = addChannel;
const updateChannelSettings = (payload) => ({
    type: channels_1.CHANNELS.UPDATE_SETTINGS,
    payload
});
exports.updateChannelSettings = updateChannelSettings;
const fetchTeammates = (payload) => ({
    type: teammates_1.TEAMMATE.FETCH,
    payload
});
exports.fetchTeammates = fetchTeammates;
//# sourceMappingURL=index.js.map