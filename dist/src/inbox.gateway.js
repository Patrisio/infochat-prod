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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let InboxGateway = class InboxGateway {
    constructor() {
        this.logger = new common_1.Logger('InboxGateway');
    }
    reduceUnreadCountAnybody(client, payload) {
        client.broadcast.emit('reduceUnreadCountAnybody', payload);
    }
    reduceOpenedToAnybody(client, payload) {
        client.broadcast.emit('reduceOpenedToAnybody', payload);
    }
    updateAssignedToAnybody(client, payload) {
        client.broadcast.emit('updateAssignedToAnybody', payload);
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], InboxGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('reduceUnreadCountAnybody'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "reduceUnreadCountAnybody", null);
__decorate([
    websockets_1.SubscribeMessage('reduceOpenedToAnybody'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "reduceOpenedToAnybody", null);
__decorate([
    websockets_1.SubscribeMessage('updateAssignedToAnybody'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], InboxGateway.prototype, "updateAssignedToAnybody", null);
InboxGateway = __decorate([
    websockets_1.WebSocketGateway()
], InboxGateway);
exports.InboxGateway = InboxGateway;
//# sourceMappingURL=inbox.gateway.js.map