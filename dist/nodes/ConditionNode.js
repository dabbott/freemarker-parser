"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const Params_1 = require("../utils/Params");
const AbstractNode_1 = __importDefault(require("./abstract/AbstractNode"));
class ConditionNode extends AbstractNode_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.Condition, token);
        this.params = Params_1.paramParser(token);
        this.consequent = [];
    }
    get hasBody() {
        return true;
    }
    addToNode(child) {
        this.alternate ? this.alternate.push(child) : this.consequent.push(child);
    }
}
exports.default = ConditionNode;
//# sourceMappingURL=ConditionNode.js.map