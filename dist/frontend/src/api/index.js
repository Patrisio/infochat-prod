"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelAdd = exports.getChannels = exports.sendEmail = exports.removeTeammate = exports.teammateAdd = exports.selectedClientUpdate = exports.assignedUserUpdate = exports.messageToInboxAdd = exports.selectedClientInfoGet = exports.incomingMessagesFetch = exports.getTeammates = exports.signUp = exports.signIn = exports.inviteUser = void 0;
async function inviteUser(payload) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
    };
    const response = await fetch(`/auth/invite/${payload.inviteId}`, options);
    const data = await response.json();
    return data;
}
exports.inviteUser = inviteUser;
async function signIn(payload) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
    };
    const response = await fetch(`/auth/signin`, options);
    const data = await response.json();
    return data;
}
exports.signIn = signIn;
async function signUp(payload) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
    };
    const response = await fetch(`/auth/signup`, options);
    const data = await response.json();
    return data;
}
exports.signUp = signUp;
async function getTeammates(projectId) {
    const response = await fetch(`/teammates/project/${projectId}/settings/teammates`);
    const data = await response.json();
    return data;
}
exports.getTeammates = getTeammates;
async function incomingMessagesFetch(payload) {
    let response;
    const { clientId, projectId, successCallback } = payload;
    if (clientId) {
        response = await fetch(`/inbox/project/${projectId}/chat/${clientId}/getMessagesHistory`);
    }
    else {
        response = await fetch(`/inbox/project/${projectId}/getMessagesHistoryByProject`);
    }
    const data = await (response === null || response === void 0 ? void 0 : response.json());
    return data;
}
exports.incomingMessagesFetch = incomingMessagesFetch;
async function selectedClientInfoGet(payload) {
    const { projectId, clientId } = payload;
    const response = await fetch(`/inbox/project/${projectId}/client/${clientId}/getClientInfo`);
    const data = await response.json();
    return data;
}
exports.selectedClientInfoGet = selectedClientInfoGet;
async function messageToInboxAdd(payload) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
    };
    const response = await fetch(`/inbox/addMessage`, options);
    const data = await response.json();
    return data;
}
exports.messageToInboxAdd = messageToInboxAdd;
async function assignedUserUpdate(payload) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: myHeaders
    };
    const response = await fetch(`/inbox/project/${payload.projectId}/updateAssignedUser`, options);
    const data = await response.json();
    return data;
}
exports.assignedUserUpdate = assignedUserUpdate;
async function selectedClientUpdate(payload) {
    const { avatarName, email, phone, assigned_to, projectId, clientId } = payload;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var options = {
        method: 'POST',
        body: JSON.stringify({ avatarName, email, phone, assigned_to }),
        headers: myHeaders
    };
    const response = await fetch(`/inbox/project/${projectId}/client/${clientId}/update`, options);
    const data = await response.json();
    return data;
}
exports.selectedClientUpdate = selectedClientUpdate;
async function teammateAdd(payload) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: myHeaders,
    };
    await fetch(`/teammates/project/${payload.projectId}/settings/teammates/addTeammate`, options);
}
exports.teammateAdd = teammateAdd;
async function removeTeammate(payload) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var urlencoded = new URLSearchParams();
    urlencoded.append('email', payload.email);
    var options = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded,
    };
    const response = await fetch(`/teammates/project/${payload.projectId}/settings/teammates/deleteTeammate`, options);
    const data = await response.json();
    return data.channels;
}
exports.removeTeammate = removeTeammate;
async function sendEmail(payload) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: myHeaders
    };
    await fetch(`/auth/project/${payload.projectId}/sendEmail`, options);
}
exports.sendEmail = sendEmail;
async function getChannels(projectId) {
    const response = await fetch(`/inbox/project/${projectId}/getChannels`);
    const data = await response.json();
    return data.channels;
}
exports.getChannels = getChannels;
async function channelAdd(payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append('name', payload.name);
    var options = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    const response = await fetch(`/inbox/project/${payload.projectId}/addChannel`, options);
    const data = await response.json();
    return data;
}
exports.channelAdd = channelAdd;
//# sourceMappingURL=index.js.map