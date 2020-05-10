"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const Params_1 = require("../utils/Params");
const AbstractNode_1 = __importDefault(require("./abstract/AbstractNode"));
class ItemsNode extends AbstractNode_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.Items, token);
        this.params = Params_1.paramParser(token);
        this.body = [];
    }
    get hasBody() {
        return true;
    }
    addToNode(child) {
        this.body.push(child);
    }
}
exports.default = ItemsNode;
//# sourceMappingURL=Items.js.map