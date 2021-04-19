"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const URL = 'http://localhost:3000';
const socket = socket_io_client_1.default(URL);
exports.default = socket;
//# sourceMappingURL=socket.js.map