import { MessagesHistoryRepository } from './messagesHistory.repository';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../auth/user.repository';
import { MessageDto } from './dto/message.dto';
import { ClientDataDto } from './dto/client-data.dto';
import { ChannelDto } from './dto/channel.dto';
export declare class InboxService {
    private messagesHistoryRepository;
    private userRepository;
    private channelRepository;
    constructor(messagesHistoryRepository: MessagesHistoryRepository, userRepository: UserRepository, channelRepository: ChannelRepository);
    addMessage(messageDto: MessageDto): Promise<{
        code: number;
        status: string;
    }>;
    getMessagesHistory(clientDto: any): Promise<import("./messagesHistory.entity").MessagesHistory | {
        id: any;
        clientId: string;
        projectId: string;
        messagesHistory: any[];
    }>;
    getMessagesHistoryByProjectId(projectId: any): Promise<import("./messagesHistory.entity").MessagesHistory[]>;
    updateAssignedUser(assignedDto: any, projectId: any): Promise<{
        code: number;
        status: string;
    }>;
    getClientInfo(projectId: number, clientId: string): Promise<{
        assignedTo: string;
    }>;
    update(projectId: number, clientId: string, assigned_to: ClientDataDto): Promise<{
        code: number;
        status: string;
    }>;
    addChannel(channel: ChannelDto, projectId: number): Promise<{
        code: number;
        status: string;
    }>;
    getChannels(projectId: number): Promise<{
        code: number;
        channels: any;
    }>;
}
