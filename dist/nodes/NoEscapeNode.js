"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const AbstractBodyNode_1 = __importDefault(require("./abstract/AbstractBodyNode"));
class NoEscapeNode extends AbstractBodyNode_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.NoEscape, token);
        this.noParams(token);
        this.body = [];
    }
}
exports.default = NoEscapeNode;
//# sourceMappingURL=NoEscapeNode.js.map