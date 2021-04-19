import { BaseEntity } from 'typeorm';
interface IMessagesHistory {
    clientId: string;
    username: string;
    message: string;
}
export declare class MessagesHistory extends BaseEntity {
    id: string;
    projectId: number;
    clientId: string;
    messagesHistory: IMessagesHistory[];
    assigned_to: string;
    avatarName: string;
    avatarColor: string;
    phone: string;
    email: string;
}
export {};
