"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const AbstractNode_1 = __importDefault(require("./abstract/AbstractNode"));
class SepNode extends AbstractNode_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.Sep, token);
        this.body = [];
    }
    get hasBody() {
        return true;
    }
    addToNode(child) {
        this.body.push(child);
    }
}
exports.default = SepNode;
//# sourceMappingURL=SepNode.js.map