"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const AbstractNode_1 = __importDefault(require("./abstract/AbstractNode"));
class TNode extends AbstractNode_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.T, token);
        this.noParams(token);
    }
}
exports.default = TNode;
//# sourceMappingURL=TNode.js.map