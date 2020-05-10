"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const AbstractNode_1 = __importDefault(require("./abstract/AbstractNode"));
class TextNode extends AbstractNode_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.Text, token);
        this.noParams(token);
        this.text = token.text;
    }
}
exports.default = TextNode;
//# sourceMappingURL=TextNode.js.map