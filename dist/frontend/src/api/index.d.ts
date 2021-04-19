export declare function inviteUser(payload: any): Promise<any>;
export declare function signIn(payload: any): Promise<any>;
export declare function signUp(payload: any): Promise<any>;
export declare function getTeammates(projectId: string): Promise<any>;
export declare function incomingMessagesFetch(payload: {
    projectId: string;
    clientId: string;
    successCallback: (data: any) => void;
}): Promise<any>;
export declare function selectedClientInfoGet(payload: {
    projectId: string;
    clientId: string;
    successCallback: (data: any) => void;
}): Promise<any>;
export declare function messageToInboxAdd(payload: any): Promise<any>;
export declare function assignedUserUpdate(payload: {
    clientId: string;
    username: string;
    email: string;
    projectId: string;
    assignedClientIds: string[];
    assignedCount: number;
    unreadClientIds: string[];
    unreadCount: number;
    openedClientIds: string[];
    openedCount: number;
    closedClientIds: string[];
    closedCount: number;
    successCallback?: () => void;
}): Promise<any>;
export declare function selectedClientUpdate(payload: any): Promise<any>;
export declare function teammateAdd(payload: {
    email: string;
    projectId?: string;
    role: string;
    status: string;
    username: string;
}): Promise<void>;
export declare function removeTeammate(payload: {
    email: string;
    projectId: string;
}): Promise<any>;
export declare function sendEmail(payload: {
    email: string;
    projectId: string;
}): Promise<void>;
export declare function getChannels(projectId: string): Promise<any>;
export declare function channelAdd(payload: {
    projectId: string;
    name: string;
}): Promise<any>;
