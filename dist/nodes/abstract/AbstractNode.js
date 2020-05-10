"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParseError_1 = __importDefault(require("../../errors/ParseError"));
class AbstractNode {
    constructor(type, token) {
        this.type = type;
        this.start = token.start;
        this.end = token.end;
    }
    get hasBody() {
        return false;
    }
    addToNode(child) {
        throw new ParseError_1.default(`Node ${this.type} can't contain ${child.type}`, child);
    }
    noParams(token) {
        if (token.params) {
            throw new ParseError_1.default(`Unexpected parameter in ${this.type}`, token);
        }
    }
}
exports.default = AbstractNode;
//# sourceMappingURL=AbstractNode.js.map