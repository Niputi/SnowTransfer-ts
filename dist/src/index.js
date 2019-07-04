"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SnowTransfer_1 = require("./SnowTransfer");
function SnowTransfer(token, options = {}) {
    return new SnowTransfer_1.default(token, options);
}
exports.SnowTransfer = SnowTransfer;
exports.default = SnowTransfer;
