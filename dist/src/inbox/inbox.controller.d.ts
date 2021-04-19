import { InboxService } from './inbox.service';
import { MessageDto } from './dto/message.dto';
import { AssignedDto } from './dto/assigned.dto';
import { ClientDataDto } from './dto/client-data.dto';
import { ChannelDto } from './dto/channel.dto';
export declare class InboxController {
    private inboxService;
    constructor(inboxService: InboxService);
    getMessagesHistory(projectId: any, clientId: any): Promise<import("./messagesHistory.entity").MessagesHistory | {
        id: any;
        clientId: string;
        projectId: string;
        messagesHistory: any[];
    }>;
    getWidgetScript(res: any, projectId: any): void;
    getMessagesHistoryByProjectId(projectId: any): Promise<import("./messagesHistory.entity").MessagesHistory[]>;
    addMessage(messageDto: MessageDto): Promise<{
        code: number;
        status: string;
    }>;
    addChannel(channel: ChannelDto, projectId: any): Promise<{
        code: number;
        status: string;
    }>;
    updateAssignedUser(projectId: string, assignedDto: AssignedDto): Promise<{
        code: number;
        status: string;
    }>;
    update(projectId: string, clientId: string, clientData: ClientDataDto): Promise<{
        code: number;
        status: string;
    }>;
    getUserInfo(projectId: string, clientId: string): Promise<{
        assignedTo: string;
    }>;
    getChannels(projectId: string): Promise<{
        code: number;
        channels: any;
    }>;
}
