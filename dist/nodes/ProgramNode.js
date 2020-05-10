"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const ParseError_1 = __importDefault(require("../errors/ParseError"));
const AbstractBodyNode_1 = __importDefault(require("./abstract/AbstractBodyNode"));
class ProgramNode extends AbstractBodyNode_1.default {
    constructor(start, end) {
        super(NodeTypes_1.NodeTypes.Program, { start, end });
        this.body = [];
    }
    addError(error) {
        if (error instanceof ParseError_1.default) {
            if (!this.errors) {
                this.errors = [];
            }
            this.errors.push(error);
        }
    }
}
exports.default = ProgramNode;
//# sourceMappingURL=ProgramNode.js.map