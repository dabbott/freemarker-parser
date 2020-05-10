"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTokenizer_1 = __importDefault(require("./AbstractTokenizer"));
const CharCodes_1 = __importDefault(require("./enum/CharCodes"));
const Operators_1 = require("./enum/Operators");
const ParamNames_1 = __importDefault(require("./enum/ParamNames"));
const ParseError_1 = __importDefault(require("./errors/ParseError"));
const Chars_1 = require("./utils/Chars");
function isIBiopInfo(object) {
    return !!object && 'prec' in object;
}
function isAllParamTypes(object) {
    return !!object && 'type' in object;
}
/**
 * Returns the precedence of a binary operator or `0` if it isn't a binary operator
 * @param opVal
 */
function binaryPrecedence(opVal) {
    return Operators_1.BinaryOps[opVal] || 0;
}
function createAssignmentExpression(operator, left, right) {
    return { type: ParamNames_1.default.AssignmentExpression, operator, left, right };
}
function createBuiltInExpression(operator, left, right) {
    return { type: ParamNames_1.default.BuiltInExpression, operator, left, right };
}
function createUpdateExpression(operator, argument, prefix = true) {
    return { type: ParamNames_1.default.UpdateExpression, operator, argument, prefix };
}
/**
 * Utility function (gets called from multiple places)
 * Also note that `a && b` and `a || b` are *logical* expressions, not binary expressions
 */
function createBinaryExpression(operator, left, right) {
    switch (operator) {
        case Operators_1.Operators.EQUALS:
        case Operators_1.Operators.PLUS_EQUALS:
        case Operators_1.Operators.MINUS_EQUALS:
        case Operators_1.Operators.TIMES_EQUALS:
        case Operators_1.Operators.DIV_EQUALS:
        case Operators_1.Operators.MOD_EQUALS:
            return createAssignmentExpression(operator, left, right);
        case Operators_1.Operators.BUILT_IN:
            return createBuiltInExpression(operator, left, right);
        case Operators_1.Operators.OR:
        case Operators_1.Operators.AND:
            return { type: ParamNames_1.default.LogicalExpression, operator, left, right };
        default:
            return { type: ParamNames_1.default.BinaryExpression, operator, left, right };
    }
}
function createUnaryExpression(operator, argument, prefix = true) {
    if (!argument) {
        throw new ParseError_1.default(`Missing argument in ${prefix ? 'before' : 'after'} '${operator}'`, { start: 0, end: 0 });
    }
    switch (operator) {
        case Operators_1.Operators.PLUS_PLUS:
        case Operators_1.Operators.MINUS_MINUS:
            return createUpdateExpression(operator, argument, prefix);
        default:
            return { type: ParamNames_1.default.UnaryExpression, operator, argument, prefix };
    }
}
class ParamsParser extends AbstractTokenizer_1.default {
    constructor(template) {
        super();
        super.init(template);
    }
    parseExpressions() {
        let node;
        const nodes = [];
        while (this.index < this.length) {
            // Try to gobble each expression individually
            node = this.parseExpression();
            if (node) {
                // If we weren't able to find a binary expression and are out of room, then
                // the expression passed in probably has too much
                nodes.push(node);
                if (this.charCodeAt(this.index) === CharCodes_1.default.Comma) {
                    ++this.index;
                }
            }
            else if (this.index < this.length) {
                throw new ParseError_1.default(`Unexpected "${this.charAt(this.index)}"`, {
                    start: this.index,
                    end: this.index,
                });
            }
        }
        // If there's only one expression just try returning the expression
        if (nodes.length === 1) {
            return nodes[0];
        }
        else {
            return {
                type: ParamNames_1.default.Compound,
                body: nodes,
            };
        }
    }
    /**
     * The main parsing function. Much of this code is dedicated to ternary expressions
     */
    parseExpression() {
        const test = this.parseBinaryExpression();
        this.parseSpaces();
        return test;
    }
    /**
     * Push `index` up to the next non-space character
     */
    parseSpaces() {
        let ch = this.charCodeAt(this.index);
        // space or tab
        while (Chars_1.isWhitespace(ch)) {
            ch = this.charCodeAt(++this.index);
        }
    }
    /**
     * Search for the operation portion of the string (e.g. `+`, `===`)
     * Start by taking the longest possible binary operations (3 characters: `===`, `!==`, `>>>`)
     * and move down from 3 to 2 to 1 character until a matching binary operation is found
     * then, return that binary operation
     */
    parseBinaryOp() {
        this.parseSpaces();
        let toCheck = this.template.substr(this.index, Operators_1.maxBinaryOps);
        let tcLen = toCheck.length;
        while (tcLen > 0) {
            if (toCheck in Operators_1.BinaryOps) {
                this.index += tcLen;
                return toCheck;
            }
            toCheck = toCheck.substr(0, --tcLen);
        }
        return null;
    }
    /**
     * This function is responsible for gobbling an individual expression,
     * e.g. `1`, `1+2`, `a+(b*2)-Math.sqrt(2)`
     */
    parseBinaryExpression() {
        let node;
        let biop;
        let prec;
        let biopInfo;
        let fbiop;
        let left;
        let right;
        let i;
        // First, try to get the leftmost thing
        // Then, get the operator following the leftmost thing
        left = this.parseToken();
        biop = this.parseBinaryOp();
        // If the operator is a unary operator, create a unary expression with the leftmost thing
        if (biop === Operators_1.Operators.PLUS_PLUS ||
            biop === Operators_1.Operators.MINUS_MINUS ||
            biop === Operators_1.Operators.EXISTS) {
            left = createUnaryExpression(biop, left, false);
            biop = this.parseBinaryOp();
        }
        // If there wasn't a binary operator, just return the leftmost node
        if (!biop) {
            return left;
        }
        // Otherwise, we need to start a stack to properly place the binary operations in their
        // precedence structure
        biopInfo = {
            value: biop,
            prec: binaryPrecedence(biop),
        };
        right = this.parseToken();
        if (!right || !left) {
            throw new ParseError_1.default(`Expected expression after ${biop}`, {
                start: this.index,
                end: this.index,
            });
        }
        const stack = [left, biopInfo, right];
        /**
         * Properly deal with precedence using
         * @see http://www.engr.mun.ca/~theo/Misc/exp_parsing.htm
         */
        // eslint-disable-next-line no-constant-condition
        while (true) {
            biop = this.parseBinaryOp();
            if (!biop) {
                break;
            }
            prec = binaryPrecedence(biop);
            if (prec === 0) {
                break;
            }
            biopInfo = { value: biop, prec };
            // Reduce: make a binary expression from the three topmost entries.
            while (stack.length > 2) {
                fbiop = stack[stack.length - 2];
                if (!isIBiopInfo(fbiop) || prec > fbiop.prec) {
                    break;
                }
                right = stack.pop();
                stack.pop();
                left = stack.pop();
                if (!isAllParamTypes(right) || !isAllParamTypes(left)) {
                    break;
                }
                node = createBinaryExpression(fbiop.value, left, right);
                stack.push(node);
            }
            node = this.parseToken();
            if (!node) {
                throw new ParseError_1.default(`Expected expression after ${biop}`, {
                    start: this.index,
                    end: this.index,
                });
            }
            stack.push(biopInfo, node);
        }
        i = stack.length - 1;
        node = stack[i];
        while (i > 1) {
            fbiop = stack[i - 1];
            left = stack[i - 2];
            if (!isIBiopInfo(fbiop) ||
                !isAllParamTypes(left) ||
                !isAllParamTypes(node)) {
                throw new ParseError_1.default(`Expected expression`, {
                    start: this.index,
                    end: this.index,
                });
            }
            node = createBinaryExpression(fbiop.value, left, node);
            i -= 2;
        }
        if (!isAllParamTypes(node)) {
            throw new ParseError_1.default(`Expected expression`, {
                start: this.index,
                end: this.index,
            });
        }
        return node;
    }
    /**
     * An individual part of a binary expression:
     * e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
     */
    parseToken() {
        this.parseSpaces();
        const ch = this.charCodeAt(this.index);
        if (Chars_1.isDecimalDigit(ch) || ch === CharCodes_1.default.Period) {
            // Char code 46 is a dot `.` which can start off a numeric literal
            return this.parseNumericLiteral();
        }
        else if (ch === CharCodes_1.default.SingleQuote || ch === CharCodes_1.default.DoubleQuote) {
            // Single or double quotes
            return this.parseStringLiteral();
        }
        else if (Chars_1.isIdentifierStart(ch) || ch === CharCodes_1.default.OpenParenthesis) {
            // open parenthesis
            // `foo`, `bar.baz`
            return this.parseVariable();
        }
        else if (ch === CharCodes_1.default.OpenBracket) {
            return this.parseArray();
        }
        else if (ch === CharCodes_1.default.OpenBrace) {
            return this.parseMap();
        }
        else {
            let toCheck = this.template.substr(this.index, Operators_1.maxUnaryOps);
            let tcLen = toCheck.length;
            while (tcLen > 0) {
                if (toCheck in Operators_1.UnaryOps) {
                    this.index += tcLen;
                    return createUnaryExpression(toCheck, this.parseToken(), true);
                }
                toCheck = toCheck.substr(0, --tcLen);
            }
        }
        return null;
    }
    /**
     * Parse simple numeric literals: `12`, `3.4`, `.5`. Do this by using a string to
     * keep track of everything in the numeric literal and then calling `parseFloat` on that string
     */
    parseNumericLiteral() {
        let rawName = '';
        while (Chars_1.isDecimalDigit(this.charCodeAt(this.index))) {
            rawName += this.charAt(this.index++);
        }
        if (this.charCodeAt(this.index) === CharCodes_1.default.Period) {
            // can start with a decimal marker
            rawName += this.charAt(this.index++);
            while (Chars_1.isDecimalDigit(this.charCodeAt(this.index))) {
                rawName += this.charAt(this.index++);
            }
        }
        const chCode = this.charCodeAt(this.index);
        // Check to make sure this isn't a variable name that start with a number (123abc)
        if (Chars_1.isIdentifierStart(chCode)) {
            throw new ParseError_1.default(`Variable names cannot start with a number (${rawName}${this.charAt(this.index)})`, { start: this.index, end: this.index });
        }
        else if (chCode === CharCodes_1.default.Period) {
            throw new ParseError_1.default('Unexpected period', {
                start: this.index,
                end: this.index,
            });
        }
        return {
            type: ParamNames_1.default.Literal,
            value: parseFloat(rawName),
            raw: rawName,
        };
    }
    /**
     * Parses a string literal, staring with single or double quotes with basic support for escape codes
     * e.g. `"hello world"`, `'this is\nJSEP'`
     */
    parseStringLiteral() {
        let str = '';
        const quote = this.charAt(this.index++);
        let closed = false;
        let ch;
        while (this.index < this.length) {
            ch = this.charAt(this.index++);
            if (ch === quote) {
                closed = true;
                break;
            }
            else if (ch === '\\') {
                // Check for all of the common escape codes
                ch = this.charAt(this.index++);
                str += `\\${ch}`;
            }
            else {
                str += ch;
            }
        }
        if (!closed) {
            throw new ParseError_1.default(`Unclosed quote after "${str}"`, {
                start: this.index,
                end: this.index,
            });
        }
        return {
            type: ParamNames_1.default.Literal,
            value: str,
            raw: quote + str + quote,
        };
    }
    /**
     * Gobbles only identifiers
     * e.g.: `foo`, `_value`, `$x1`
     * Also, this function checks if that identifier is a literal:
     * (e.g. `true`, `false`, `null`) or `this`
     */
    parseIdentifier() {
        let ch = this.charCodeAt(this.index);
        const start = this.index;
        if (Chars_1.isIdentifierStart(ch)) {
            this.index++;
        }
        else {
            throw new ParseError_1.default(`Unexpected ${this.charAt(this.index)}`, {
                start: this.index,
                end: this.index,
            });
        }
        while (this.index < this.length) {
            ch = this.charCodeAt(this.index);
            if (Chars_1.isIdentifierPart(ch)) {
                this.index++;
            }
            else {
                break;
            }
        }
        const identifier = this.template.slice(start, this.index);
        if (identifier in Operators_1.Literals) {
            return {
                type: ParamNames_1.default.Literal,
                value: Operators_1.Literals[identifier],
                raw: identifier,
            };
        }
        else {
            return {
                type: ParamNames_1.default.Identifier,
                name: identifier,
            };
        }
    }
    /**
     * Gobbles a list of arguments within the context of a function call
     * or array literal. This function also assumes that the opening character
     * `(` or `[` has already been gobbled, and gobbles expressions and commas
     * until the terminator character `)` or `]` is encountered.
     * e.g. `foo(bar, baz)`, `my_func()`, or `[bar, baz]`
     */
    parseArguments(termination) {
        let chI;
        const args = [];
        let node;
        let closed = false;
        while (this.index < this.length) {
            this.parseSpaces();
            chI = this.charCodeAt(this.index);
            if (chI === termination) {
                // done parsing
                closed = true;
                this.index++;
                break;
            }
            else if (chI === CharCodes_1.default.Comma) {
                // between expressions
                this.index++;
            }
            else {
                node = this.parseExpression();
                if (!node || node.type === ParamNames_1.default.Compound) {
                    throw new ParseError_1.default('Expected comma', {
                        start: this.index,
                        end: this.index,
                    });
                }
                args.push(node);
            }
        }
        if (!closed) {
            throw new ParseError_1.default(`Expected ${String.fromCharCode(termination)}`, {
                start: this.index,
                end: this.index,
            });
        }
        return args;
    }
    /**
     * Gobble a non-literal variable name. This variable name may include properties
     * e.g. `foo`, `bar.baz`, `foo['bar'].baz`
     * It also gobbles function calls:
     * e.g. `Math.acos(obj.angle)`
     */
    parseVariable() {
        let chI;
        chI = this.charCodeAt(this.index);
        let node = chI === CharCodes_1.default.OpenParenthesis
            ? this.parseGroup()
            : this.parseIdentifier();
        this.parseSpaces();
        chI = this.charCodeAt(this.index);
        while (chI === CharCodes_1.default.Period ||
            chI === CharCodes_1.default.OpenBracket ||
            chI === CharCodes_1.default.OpenParenthesis) {
            this.index++;
            if (chI === CharCodes_1.default.Period) {
                this.parseSpaces();
                node = {
                    type: ParamNames_1.default.MemberExpression,
                    computed: false,
                    object: node,
                    property: this.parseIdentifier(),
                };
            }
            else if (chI === CharCodes_1.default.OpenBracket) {
                node = {
                    type: ParamNames_1.default.MemberExpression,
                    computed: true,
                    object: node,
                    property: this.parseExpression(),
                };
                this.parseSpaces();
                chI = this.charCodeAt(this.index);
                if (chI !== CharCodes_1.default.CloseBracket) {
                    throw new ParseError_1.default('Unclosed [', {
                        start: this.index,
                        end: this.index,
                    });
                }
                this.index++;
            }
            else if (chI === CharCodes_1.default.OpenParenthesis) {
                // A function call is being made; gobble all the arguments
                node = {
                    type: ParamNames_1.default.CallExpression,
                    arguments: this.parseArguments(CharCodes_1.default.CloseParenthesis),
                    callee: node,
                };
            }
            this.parseSpaces();
            chI = this.charCodeAt(this.index);
        }
        return node;
    }
    /**
     * Responsible for parsing a group of things within parentheses `()`
     * This function assumes that it needs to gobble the opening parenthesis
     * and then tries to gobble everything within that parenthesis, assuming
     * that the next thing it should see is the close parenthesis. If not,
     * then the expression probably doesn't have a `)`
     */
    parseGroup() {
        this.index++;
        const node = this.parseExpression();
        this.parseSpaces();
        if (this.charCodeAt(this.index) === CharCodes_1.default.CloseParenthesis) {
            this.index++;
            return node;
        }
        else {
            throw new ParseError_1.default('Unclosed (', {
                start: this.index,
                end: this.index,
            });
        }
    }
    /**
     * Responsible for parsing Array literals `[1, 2, 3]`
     * This function assumes that it needs to gobble the opening bracket
     * and then tries to gobble the expressions as arguments.
     */
    parseArray() {
        this.index++;
        return {
            type: ParamNames_1.default.ArrayExpression,
            elements: this.parseArguments(CharCodes_1.default.CloseBracket),
        };
    }
    /**
     * Responsible for parsing Map literals `[a: 1, b: 2, c: 3]`
     * This function assumes that it needs to gobble the opening brace
     * and then tries to gobble the expressions as arguments.
     */
    parseMap() {
        let ch;
        let closed = false;
        const elements = [];
        ++this.index;
        while (this.index < this.length) {
            this.parseSpaces();
            ch = this.charCodeAt(this.index);
            if (ch === CharCodes_1.default.CloseBrace) {
                ++this.index;
                closed = true;
                break;
            }
            if (ch !== CharCodes_1.default.SingleQuote && ch !== CharCodes_1.default.DoubleQuote) {
                throw new ParseError_1.default(`Invalid character ${String.fromCharCode(ch)}`, {
                    start: this.index,
                    end: this.index,
                });
            }
            const key = this.parseStringLiteral();
            this.parseSpaces();
            ch = this.charCodeAt(this.index);
            if (ch !== CharCodes_1.default.Colon) {
                throw new ParseError_1.default(`Invalid character ${String.fromCharCode(ch)}`, {
                    start: this.index,
                    end: this.index,
                });
            }
            ++this.index;
            this.parseSpaces();
            const value = this.parseExpression();
            if (!value) {
                throw new ParseError_1.default(`Invalid character ${String.fromCharCode(ch)}`, {
                    start: this.index,
                    end: this.index,
                });
            }
            ch = this.charCodeAt(this.index);
            if (ch === CharCodes_1.default.Comma) {
                ++this.index;
            }
            elements.push({
                key,
                value,
            });
        }
        if (!closed) {
            ch = this.charCodeAt(this.index);
            throw new ParseError_1.default('Unclosed {', {
                start: this.index,
                end: this.index,
            });
        }
        return {
            type: ParamNames_1.default.MapExpression,
            elements,
        };
    }
}
exports.ParamsParser = ParamsParser;
//# sourceMappingURL=ParamsParser.js.map