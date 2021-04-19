"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesHistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const messagesHistory_entity_1 = require("./messagesHistory.entity");
let MessagesHistoryRepository = class MessagesHistoryRepository extends typeorm_1.Repository {
    async addMessage(messageDto) {
        const { clientId, projectId, message, avatarName, avatarColor } = messageDto;
        const historyMessage = await this.findDuplicateByClientId(clientId);
        if (historyMessage) {
            try {
                await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(messagesHistory_entity_1.MessagesHistory)
                    .set({ messagesHistory: [...historyMessage.messagesHistory, message] })
                    .where("clientId = :clientId", { clientId })
                    .execute();
                return {
                    code: 200,
                    status: 'success'
                };
            }
            catch (error) {
                throw new common_1.InternalServerErrorException();
            }
        }
        else {
            const messagesHistoryInstance = new messagesHistory_entity_1.MessagesHistory();
            messagesHistoryInstance.clientId = clientId;
            messagesHistoryInstance.projectId = parseInt(projectId);
            messagesHistoryInstance.messagesHistory = [message];
            messagesHistoryInstance.avatarName = avatarName;
            messagesHistoryInstance.avatarColor = avatarColor;
            try {
                await messagesHistoryInstance.save();
                return {
                    code: 200,
                    status: 'success'
                };
            }
            catch (error) {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async getMessagesHistory(clientDto) {
        const messagesHistory = await this.findOne(clientDto);
        if (messagesHistory) {
            return messagesHistory;
        }
        return {
            id: null,
            clientId: '',
            projectId: '',
            messagesHistory: []
        };
    }
    async findDuplicateByClientId(clientId) {
        return await this.findOne({ clientId });
    }
    async getMessagesHistoryByProjectId(projectId) {
        return await this.find({ projectId });
    }
    async getMessagesHistoryByProjectIdAndClientId(projectId, clientId) {
        return await this.findOne({ projectId, clientId });
    }
    async updateAssignedUserByClientId(assignedDto) {
        const { clientId, username } = assignedDto;
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(messagesHistory_entity_1.MessagesHistory)
                .set({ assigned_to: username })
                .where("clientId = :clientId", { clientId })
                .execute();
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getClientInfo(projectId, clientId) {
        const client = await this.findOne({ projectId, clientId });
        return {
            assignedTo: client.assigned_to,
        };
    }
    async updateClientData(projectId, clientId, clientDataDto) {
        const historyMessage = await this.getMessagesHistoryByProjectIdAndClientId(projectId, clientId);
        const { assigned_to, avatarName, email, phone } = clientDataDto;
        historyMessage.assigned_to = assigned_to;
        historyMessage.avatarName = avatarName;
        historyMessage.email = email;
        historyMessage.phone = phone;
        try {
            await historyMessage.save();
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
MessagesHistoryRepository = __decorate([
    typeorm_1.EntityRepository(messagesHistory_entity_1.MessagesHistory)
], MessagesHistoryRepository);
exports.MessagesHistoryRepository = MessagesHistoryRepository;
//# sourceMappingURL=messagesHistory.repository.js.map