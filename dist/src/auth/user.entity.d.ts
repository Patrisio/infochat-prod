import { BaseEntity } from 'typeorm';
import { Project } from './projects.entity';
declare type IClient = {
    projectId: string;
    clientId: string;
    messagesHistory: IMessagesHistory[];
};
declare type IMessagesHistory = {
    clientId: string;
    username: string;
    message: string;
};
export declare class User extends BaseEntity {
    id: string;
    projects: Project[];
    username: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    project_id: number;
    invite_id: string;
    role: string;
    status: string;
    all_count: number;
    all_client_ids: IClient[];
    unread_count: number;
    unread_client_ids: IClient[];
    opened_count: number;
    opened_client_ids: IClient[];
    assigned_count: number;
    assigned_client_ids: IClient[];
    closed_count: number;
    closed_client_ids: IClient[];
    validatePassword(password: string): Promise<Boolean>;
}
export {};
