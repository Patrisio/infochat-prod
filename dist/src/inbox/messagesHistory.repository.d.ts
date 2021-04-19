import { Repository } from 'typeorm';
import { MessagesHistory } from './messagesHistory.entity';
import { MessageDto } from './dto/message.dto';
import { ClientDataDto } from './dto/client-data.dto';
export declare class MessagesHistoryRepository extends Repository<MessagesHistory> {
    addMessage(messageDto: MessageDto): Promise<{
        code: number;
        status: string;
    }>;
    getMessagesHistory(clientDto: any): Promise<MessagesHistory | {
        id: any;
        clientId: string;
        projectId: string;
        messagesHistory: any[];
    }>;
    findDuplicateByClientId(clientId: any): Promise<MessagesHistory>;
    getMessagesHistoryByProjectId(projectId: any): Promise<MessagesHistory[]>;
    getMessagesHistoryByProjectIdAndClientId(projectId: any, clientId: any): Promise<MessagesHistory>;
    updateAssignedUserByClientId(assignedDto: any): Promise<{
        code: number;
        status: string;
    }>;
    getClientInfo(projectId: number, clientId: string): Promise<{
        assignedTo: string;
    }>;
    updateClientData(projectId: number, clientId: string, clientDataDto: ClientDataDto): Promise<{
        code: number;
        status: string;
    }>;
}
