"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const AbstractAssign_1 = __importDefault(require("./abstract/AbstractAssign"));
class FtlNode extends AbstractAssign_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.Assign, token);
        this.params = this.checkParams(token);
    }
}
exports.default = FtlNode;
//# sourceMappingURL=FtlNode.js.map