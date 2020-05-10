"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const Params_1 = require("../utils/Params");
const AbstractNode_1 = __importDefault(require("./abstract/AbstractNode"));
const SwitchCaseNode_1 = __importDefault(require("./SwitchCaseNode"));
const SwitchDefaultNode_1 = __importDefault(require("./SwitchDefaultNode"));
class SwitchNode extends AbstractNode_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.Switch, token);
        this.params = Params_1.paramParser(token);
        this.cases = [];
    }
    get hasBody() {
        return true;
    }
    addToNode(child) {
        if (child instanceof SwitchCaseNode_1.default || child instanceof SwitchDefaultNode_1.default) {
            this.cases.push(child);
        }
        else if (this.cases.length === 0) {
            if (child.type === NodeTypes_1.NodeTypes.Text) {
                // TODO: accept only whitespaces
                return;
            }
        }
        else {
            this.cases[this.cases.length - 1].consequent.push(child);
            return;
        }
        super.addToNode(child);
    }
}
exports.default = SwitchNode;
//# sourceMappingURL=SwitchNode.js.map