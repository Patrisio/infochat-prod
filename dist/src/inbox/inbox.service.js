"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messagesHistory_repository_1 = require("./messagesHistory.repository");
const channel_repository_1 = require("./channel.repository");
const user_repository_1 = require("../auth/user.repository");
let InboxService = class InboxService {
    constructor(messagesHistoryRepository, userRepository, channelRepository) {
        this.messagesHistoryRepository = messagesHistoryRepository;
        this.userRepository = userRepository;
        this.channelRepository = channelRepository;
    }
    async addMessage(messageDto) {
        return this.messagesHistoryRepository.addMessage(messageDto);
    }
    async getMessagesHistory(clientDto) {
        return this.messagesHistoryRepository.getMessagesHistory(clientDto);
    }
    async getMessagesHistoryByProjectId(projectId) {
        return this.messagesHistoryRepository.getMessagesHistoryByProjectId(projectId);
    }
    async updateAssignedUser(assignedDto, projectId) {
        const { unreadClientIds, unreadCount, openedClientIds, openedCount } = assignedDto;
        const messageHistoryResponse = await this.messagesHistoryRepository.updateAssignedUserByClientId(assignedDto);
        const userResponse = await this.userRepository.updateAssignedUserByEmail(assignedDto);
        const unreadResponse = await this.userRepository.updateDialogForAllTeammates(projectId, { unreadClientIds, unreadCount });
        const openedResponse = await this.userRepository.updateOpenedDialogForAllTeammates(projectId, { openedClientIds, openedCount });
        const closedResponse = await this.userRepository.updateClosedUserByEmail(assignedDto);
        if (messageHistoryResponse.code === 200 &&
            userResponse.code === 200 &&
            unreadResponse.code === 200 &&
            openedResponse.code === 200 &&
            closedResponse.code === 200) {
            return {
                code: 200,
                status: 'success'
            };
        }
        throw new common_1.InternalServerErrorException();
    }
    async getClientInfo(projectId, clientId) {
        return this.messagesHistoryRepository.getClientInfo(projectId, clientId);
    }
    async update(projectId, clientId, assigned_to) {
        return this.messagesHistoryRepository.updateClientData(projectId, clientId, assigned_to);
    }
    async addChannel(channel, projectId) {
        return this.channelRepository.add(channel, projectId);
    }
    async getChannels(projectId) {
        return this.channelRepository.getChannels(projectId);
    }
};
InboxService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(messagesHistory_repository_1.MessagesHistoryRepository)),
    __param(1, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __param(2, typeorm_1.InjectRepository(channel_repository_1.ChannelRepository)),
    __metadata("design:paramtypes", [messagesHistory_repository_1.MessagesHistoryRepository,
        user_repository_1.UserRepository,
        channel_repository_1.ChannelRepository])
], InboxService);
exports.InboxService = InboxService;
//# sourceMappingURL=inbox.service.js.map