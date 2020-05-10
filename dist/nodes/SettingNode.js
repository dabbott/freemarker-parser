"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const ParamNames_1 = __importDefault(require("../enum/ParamNames"));
const ParseError_1 = __importDefault(require("../errors/ParseError"));
const AbstractAssign_1 = __importDefault(require("./abstract/AbstractAssign"));
class SettingNode extends AbstractAssign_1.default {
    constructor(token) {
        super(NodeTypes_1.NodeTypes.Setting, token);
        const params = this.checkParams(token);
        if (params.length === 1) {
            const param = params[0];
            if (param.type === ParamNames_1.default.AssignmentExpression) {
                this.expression = param;
                return;
            }
        }
        throw new ParseError_1.default(`Invalid parameters in ${this.type}`, token);
    }
}
exports.default = SettingNode;
//# sourceMappingURL=SettingNode.js.map