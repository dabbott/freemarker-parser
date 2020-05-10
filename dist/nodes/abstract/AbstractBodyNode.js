"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractNode_1 = __importDefault(require("./AbstractNode"));
class AbstractBodyNode extends AbstractNode_1.default {
    get hasBody() {
        return Boolean(this.body);
    }
    addToNode(child) {
        if (this.body) {
            this.body.push(child);
        }
        else {
            super.addToNode(child);
        }
    }
}
exports.default = AbstractBodyNode;
//# sourceMappingURL=AbstractBodyNode.js.map