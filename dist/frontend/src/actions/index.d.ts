declare const authInvite: (payload: any) => {
    type: string;
    payload: any;
};
declare const authSignIn: (payload: any) => {
    type: string;
    payload: any;
};
declare const authSignUp: (payload: any) => {
    type: string;
    payload: any;
};
declare const addMessage: (message: any) => {
    type: any;
    message: any;
};
declare const getClientInfo: (payload: any) => {
    type: any;
    payload: any;
};
declare const addToInboxIncomingMessage: (payload: any) => {
    type: any;
    payload: any;
};
declare const fetchIncomingMessages: (incomingMessage: any) => {
    type: any;
    incomingMessage: any;
};
declare const updateAssignedUser: (incomingMessage: any) => {
    type: any;
    incomingMessage: any;
};
declare const updateClientData: (payload: any) => {
    type: any;
    payload: any;
};
declare const addIncomingMessage: (incomingMessage: any) => {
    type: any;
    incomingMessage: any;
};
declare const selectClient: (client: any) => {
    type: any;
    client: any;
};
declare const addTeammate: (teammate: any) => {
    type: any;
    teammate: any;
};
declare const deleteTeammate: (teammate: any) => {
    type: any;
    teammate: any;
};
declare const assignTeammate: (payload: any) => {
    type: any;
    payload: any;
};
declare const addIncomingMessageForSelectedClient: (incomingMessage: any) => {
    type: any;
    incomingMessage: any;
};
declare const updateIncomingMessage: (payload: any) => {
    type: any;
    payload: any;
};
declare const updateSelectedClient: (payload: any) => {
    type: any;
    payload: any;
};
declare const fetchChannels: (payload: any) => {
    type: any;
    payload: any;
};
declare const addChannels: (payload: any) => {
    type: any;
    payload: any;
};
declare const addChannel: (payload: any) => {
    type: any;
    payload: any;
};
declare const updateChannelSettings: (payload: any) => {
    type: any;
    payload: any;
};
declare const fetchTeammates: (payload: any) => {
    type: any;
    payload: any;
};
export { authInvite, authSignIn, authSignUp, addMessage, addIncomingMessage, selectClient, addIncomingMessageForSelectedClient, updateIncomingMessage, updateSelectedClient, fetchIncomingMessages, updateAssignedUser, updateClientData, addToInboxIncomingMessage, getClientInfo, fetchChannels, addChannel, addChannels, updateChannelSettings, fetchTeammates, addTeammate, deleteTeammate, assignTeammate, };
