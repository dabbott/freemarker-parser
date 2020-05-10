"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CharCodes_1 = __importDefault(require("../enum/CharCodes"));
const Operators_1 = require("../enum/Operators");
function isDecimalDigit(ch) {
    return ch >= CharCodes_1.default._0 && ch <= CharCodes_1.default._9; // 0...9
}
exports.isDecimalDigit = isDecimalDigit;
function isLetter(ch) {
    return ((ch >= CharCodes_1.default.a && ch <= CharCodes_1.default.z) || // a...z
        (ch >= CharCodes_1.default.A && ch <= CharCodes_1.default.Z)); // A...Z
}
exports.isLetter = isLetter;
function isWhitespace(ch) {
    return (ch === CharCodes_1.default.Space ||
        ch === CharCodes_1.default.Tab ||
        ch === CharCodes_1.default.CarriageReturn ||
        ch === CharCodes_1.default.LineFeed);
}
exports.isWhitespace = isWhitespace;
// any non-ASCII that is not an operator
function isIdentifierStart(ch) {
    return ((isLetter(ch) ||
        ch === CharCodes_1.default.$ ||
        ch === CharCodes_1.default.Underscore || // `$` and `_`
        ch >= 128) &&
        !Operators_1.BinaryOps[String.fromCharCode(ch)]);
}
exports.isIdentifierStart = isIdentifierStart;
// any non-ASCII that is not an operator
function isIdentifierPart(ch) {
    return ((isLetter(ch) ||
        isDecimalDigit(ch) ||
        ch === CharCodes_1.default.$ ||
        ch === CharCodes_1.default.Underscore || // `$` and `_`
        ch >= 128) &&
        !Operators_1.BinaryOps[String.fromCharCode(ch)]);
}
exports.isIdentifierPart = isIdentifierPart;
//# sourceMappingURL=Chars.js.map