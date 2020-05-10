"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParseError_1 = __importDefault(require("../errors/ParseError"));
const ParamsParser_1 = require("../ParamsParser");
function paramParser(token) {
    if (token.params) {
        const parser = new ParamsParser_1.ParamsParser(token.params);
        try {
            return parser.parseExpressions();
        }
        catch (e) {
            throw new ParseError_1.default(e.message, {
                start: token.start + e.start,
                end: token.start + e.end,
            });
        }
    }
    else {
        return undefined;
    }
}
exports.paramParser = paramParser;
//# sourceMappingURL=Params.js.map