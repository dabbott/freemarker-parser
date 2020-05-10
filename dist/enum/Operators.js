"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Operators;
(function (Operators) {
    Operators["FALSE"] = "false";
    Operators["TRUE"] = "true";
    Operators["RAW_STRING"] = "\"";
    Operators["RAW_STRING2"] = "'";
    Operators["DOT"] = ".";
    Operators["DOT_DOT"] = "..";
    Operators["DOT_DOT_LESS"] = "..<";
    Operators["DOT_DOT_NOT"] = "..!";
    Operators["DOT_DOT_ASTERISK"] = "..*";
    Operators["BUILT_IN"] = "?";
    Operators["EXISTS"] = "??";
    Operators["EQUALS"] = "=";
    Operators["DOUBLE_EQUALS"] = "==";
    Operators["NOT_EQUALS"] = "!=";
    Operators["PLUS_EQUALS"] = "+=";
    Operators["MINUS_EQUALS"] = "-=";
    Operators["TIMES_EQUALS"] = "*=";
    Operators["DIV_EQUALS"] = "/=";
    Operators["MOD_EQUALS"] = "%=";
    Operators["PLUS_PLUS"] = "++";
    Operators["MINUS_MINUS"] = "--";
    Operators["ESCAPED_LT"] = "lt";
    Operators["ESCAPED_LTE"] = "lte";
    Operators["NATURAL_LT"] = "<";
    Operators["NATURAL_LTE"] = "<=";
    Operators["ESCAPED_GT"] = "gt";
    Operators["ESCAPED_GTE"] = "gte";
    Operators["NATURAL_GT"] = ">";
    Operators["NATURAL_GTE"] = ">=";
    Operators["PLUS"] = "+";
    Operators["MINUS"] = "-";
    Operators["TIMES"] = "*";
    Operators["DOUBLE_STAR"] = "**";
    Operators["ELLIPSIS"] = "...";
    Operators["DIVIDE"] = "/";
    Operators["PERCENT"] = "%";
    Operators["AND"] = "&&";
    Operators["OR"] = "||";
    Operators["EXCLAM"] = "!";
    Operators["COMMA"] = ",";
    Operators["SEMICOLON"] = ";";
    Operators["COLON"] = ":";
    Operators["OPEN_BRACKET"] = "[";
    Operators["CLOSE_BRACKET"] = "]";
    Operators["OPEN_PAREN"] = "(";
    Operators["CLOSE_PAREN"] = ")";
    Operators["OPENING_CURLY_BRACKET"] = "{";
    Operators["CLOSING_CURLY_BRACKET"] = "}";
    Operators["IN"] = "in";
    Operators["AS"] = "as";
    Operators["USING"] = "using";
})(Operators = exports.Operators || (exports.Operators = {}));
// Store the values to return for the various literals we may encounter
exports.Literals = {
    [Operators.TRUE]: true,
    [Operators.FALSE]: false,
};
// Use a quickly-accessible map to store all of the unary operators
exports.UnaryOps = {
    [Operators.MINUS]: true,
    [Operators.TIMES]: true,
    [Operators.EXCLAM]: true,
    [Operators.PLUS]: true,
    [Operators.MINUS_MINUS]: true,
    [Operators.PLUS_PLUS]: true,
    [Operators.EXISTS]: true,
};
/**
 * @see http://en.wikipedia.org/wiki/Order_of_operations#Programming_language
 */
exports.BinaryOps = {
    // Assignment operators (right to left)
    [Operators.EQUALS]: 0,
    [Operators.PLUS_EQUALS]: 0,
    [Operators.MINUS_EQUALS]: 0,
    [Operators.TIMES_EQUALS]: 0,
    [Operators.DIV_EQUALS]: 0,
    [Operators.MOD_EQUALS]: 0,
    [Operators.PLUS_PLUS]: 0,
    [Operators.MINUS_MINUS]: 0,
    [Operators.EXISTS]: 0,
    // Logical OR
    [Operators.OR]: 1,
    // Logical AND
    [Operators.AND]: 2,
    // Comparisons: equal and not equal
    [Operators.DOUBLE_EQUALS]: 6,
    [Operators.NOT_EQUALS]: 6,
    // Comparisons: less-than and greater-than
    [Operators.NATURAL_GT]: 7,
    [Operators.NATURAL_LT]: 7,
    [Operators.NATURAL_GTE]: 7,
    [Operators.NATURAL_LTE]: 7,
    [Operators.ESCAPED_GT]: 7,
    [Operators.ESCAPED_LT]: 7,
    [Operators.ESCAPED_GTE]: 7,
    [Operators.ESCAPED_LTE]: 7,
    // unary operators
    [Operators.PLUS]: 9,
    [Operators.MINUS]: 9,
    [Operators.TIMES]: 10,
    [Operators.DIVIDE]: 10,
    [Operators.PERCENT]: 10,
    // Custom
    [Operators.BUILT_IN]: 11,
};
// Get return the longest key length of any object
function getMaxKeyLength(obj) {
    let maxLen = 0;
    let len;
    for (const key of Object.keys(obj)) {
        len = key.length;
        if (len > maxLen) {
            maxLen = len;
        }
    }
    return maxLen;
}
exports.getMaxKeyLength = getMaxKeyLength;
exports.maxBinaryOps = getMaxKeyLength(exports.BinaryOps);
exports.maxUnaryOps = getMaxKeyLength(exports.UnaryOps);
//# sourceMappingURL=Operators.js.map