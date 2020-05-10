"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const ParamNames_1 = __importDefault(require("../enum/ParamNames"));
const AbstractAssign_1 = __importDefault(require("./abstract/AbstractAssign"));
class LocalNode extends AbstractAssign_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.Local, token);
        this.params = this.checkParams(token);
        if (this.params.length === 1 &&
            this.params[0].type === ParamNames_1.default.Identifier) {
            this.body = [];
        }
    }
    isAssignmentExpressionSingle(param, token) {
        if (param.type === ParamNames_1.default.Identifier) {
            return param;
        }
        return super.isAssignmentExpressionSingle(param, token);
    }
    isAssignmentExpression(param, token) {
        if (param.type === ParamNames_1.default.UpdateExpression && !param.prefix) {
            return param;
        }
        return super.isAssignmentExpression(param, token);
    }
}
exports.default = LocalNode;
//# sourceMappingURL=LocalNode.js.map