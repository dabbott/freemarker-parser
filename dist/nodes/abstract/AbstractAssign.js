"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParamNames_1 = __importDefault(require("../../enum/ParamNames"));
const ParseError_1 = __importDefault(require("../../errors/ParseError"));
const Params_1 = require("../../utils/Params");
const AbstractBodyNode_1 = __importDefault(require("./AbstractBodyNode"));
class AbstractAssign extends AbstractBodyNode_1.default {
    checkParams(token) {
        const params = Params_1.paramParser(token);
        if (params) {
            const result = [];
            if (params.type === ParamNames_1.default.Compound) {
                for (const param of params.body) {
                    result.push(this.isAssignmentExpression(param, token));
                }
            }
            else {
                result.push(this.isAssignmentExpressionSingle(params, token));
            }
            return result;
        }
        throw new ParseError_1.default(`${this.type} require params`, token);
    }
    isAssignmentExpressionSingle(param, token) {
        return this.isAssignmentExpression(param, token);
    }
    isAssignmentExpression(param, token) {
        if (param.type === ParamNames_1.default.AssignmentExpression) {
            return param;
        }
        throw new ParseError_1.default(`Invalid parameters in ${this.type}`, token);
    }
}
exports.default = AbstractAssign;
//# sourceMappingURL=AbstractAssign.js.map