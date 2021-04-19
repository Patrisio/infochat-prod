interface IMessagesHistory {
    message: string;
    clientId: string;
    username: string;
}
interface IIncomingMessage {
    id: string;
    projectId: string;
    clientId: string;
    messagesHistory: IMessagesHistory[];
    assigned_to: string | null;
}
interface State {
    messages: IMessagesHistory[];
    incomingMessages: IIncomingMessage[];
    selectedClient: IIncomingMessage;
}
export declare const inboxReducer: (state: State, action: any) => any;
export {};
