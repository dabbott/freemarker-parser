"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const Params_1 = require("../utils/Params");
const AbstractBodyNode_1 = __importDefault(require("./abstract/AbstractBodyNode"));
class EscapeNode extends AbstractBodyNode_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.Escape, token);
        this.params = Params_1.paramParser(token);
        this.body = [];
    }
}
exports.default = EscapeNode;
//# sourceMappingURL=EscapeNode.js.map