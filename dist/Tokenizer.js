"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTokenizer_1 = __importDefault(require("./AbstractTokenizer"));
const defaultConfig_1 = __importDefault(require("./defaultConfig"));
const CharCodes_1 = __importDefault(require("./enum/CharCodes"));
const ParseError_1 = __importDefault(require("./errors/ParseError"));
const Symbols_1 = require("./Symbols");
const Chars_1 = require("./utils/Chars");
class Tokenizer extends AbstractTokenizer_1.default {
    constructor(options = {}) {
        super();
        this.tokens = [];
        this.options = Object.assign(Object.assign({}, defaultConfig_1.default), options);
        const openTag = String.fromCharCode(this.openTag);
        const closeTag = String.fromCharCode(this.closeTag);
        this.symbols = [
            {
                startToken: `${openTag}#--`,
                endToken: [`--${closeTag}`],
                type: Symbols_1.NodeType.Comment,
            },
            {
                startToken: `${openTag}/#`,
                endToken: [`${closeTag}`],
                type: Symbols_1.NodeType.CloseDirective,
            },
            {
                startToken: `${openTag}#`,
                endToken: [`${closeTag}`, `/${closeTag}`],
                type: Symbols_1.NodeType.OpenDirective,
            },
            {
                startToken: `${openTag}/@`,
                endToken: [`${closeTag}`],
                type: Symbols_1.NodeType.CloseMacro,
            },
            {
                startToken: `${openTag}@`,
                endToken: [`${closeTag}`, `/${closeTag}`],
                type: Symbols_1.NodeType.OpenMacro,
            },
            // tslint:disable-next-line:no-invalid-template-strings
            { startToken: '${', endToken: ['}'], type: Symbols_1.NodeType.Interpolation },
        ];
    }
    get openTag() {
        return this.options.squareTags ? CharCodes_1.default.OpenBracket : CharCodes_1.default.Less;
    }
    get closeTag() {
        return this.options.squareTags
            ? CharCodes_1.default.CloseBracket
            : CharCodes_1.default.Greater;
    }
    parse(template) {
        super.init(template);
        this.tokens = [];
        while (this.index >= 0 && this.index < this.template.length) {
            this.parseTemplate();
        }
        return this.tokens;
    }
    getNextPos(items) {
        let pos = -1;
        let text = '';
        for (const item of items) {
            const n = this.template.indexOf(item, this.index);
            if (n >= 0 && (pos === -1 || n < pos)) {
                pos = n;
                text = item;
            }
        }
        return { pos, text };
    }
    parseTagName() {
        let text = '';
        let ch = this.charCodeAt(this.index);
        while (this.index < this.template.length) {
            if (Chars_1.isWhitespace(ch)) {
                ++this.index;
                break;
            }
            if (ch === this.closeTag ||
                (ch === CharCodes_1.default.Slash &&
                    this.charCodeAt(this.index + 1) === this.closeTag)) {
                break;
            }
            if (Chars_1.isLetter(ch) ||
                ch === CharCodes_1.default.Period ||
                ch === CharCodes_1.default.Underscore) {
                text += this.charAt(this.index);
                ch = this.charCodeAt(++this.index);
            }
            else {
                throw new ParseError_1.default(`Invalid \`${this.charAt(this.index)}\``, {
                    start: this.index,
                    end: this.index,
                });
            }
        }
        return text;
    }
    getToken() {
        let symbol = null;
        let startPos = 0;
        for (const item of this.symbols) {
            const n = this.template.indexOf(item.startToken, this.index);
            if (n === this.index && (!symbol || n < startPos)) {
                symbol = item;
                startPos = n;
            }
        }
        return symbol || null;
    }
    parseTemplate() {
        let text = '';
        const startPos = this.index;
        let ch;
        while (this.index < this.length) {
            ch = this.charCodeAt(this.index);
            if (ch === this.openTag || ch === CharCodes_1.default.$) {
                const token = this.getToken();
                if (token) {
                    if (text.length > 0) {
                        this.addToken(Symbols_1.NodeType.Text, startPos, this.index, text);
                        text = '';
                    }
                    const start = this.index;
                    this.index += token.startToken.length;
                    switch (token.type) {
                        case Symbols_1.NodeType.Comment:
                            return this.parseComment(token, start);
                        case Symbols_1.NodeType.OpenDirective:
                        case Symbols_1.NodeType.OpenMacro:
                            return this.parseOpenDirectiveOrMacro(token, start);
                        case Symbols_1.NodeType.CloseDirective:
                        case Symbols_1.NodeType.CloseMacro:
                            return this.parseCloseDirectiveOrMacro(token, start);
                        case Symbols_1.NodeType.Interpolation:
                            return this.parseInterpolation(token, start);
                    }
                }
            }
            text += this.charAt(this.index);
            ++this.index;
        }
        return this.addToken(Symbols_1.NodeType.Text, startPos, this.index, text);
    }
    addToken(type, start, end, text, startTag, endTag, params) {
        this.tokens.push({
            type,
            start,
            end,
            startTag,
            endTag,
            text,
            params: params || undefined,
        });
    }
    parseComment(symbol, start) {
        const end = this.getNextPos(symbol.endToken);
        if (end.pos === -1) {
            throw new ReferenceError(`Unclosed comment`);
        }
        const text = this.template.substring(this.index, end.pos);
        this.index = end.pos + end.text.length;
        this.addToken(symbol.type, start, this.index, text, symbol.startToken, end.text);
    }
    parseInterpolation(symbol, start) {
        const params = this.parseParams(symbol.endToken);
        this.addToken(symbol.type, start, this.index, '', symbol.startToken, params.endToken, params.paramText);
    }
    parseOpenDirectiveOrMacro(symbol, start) {
        const typeString = this.parseTagName();
        if (typeString.length === 0) {
            throw new ParseError_1.default(`${symbol.type} name cannot be empty`, {
                start: this.index,
                end: this.index,
            });
        }
        const params = this.parseParams(symbol.endToken);
        this.addToken(symbol.type, start, this.index, typeString, symbol.startToken, params.endToken, params.paramText);
    }
    parseCloseDirectiveOrMacro(symbol, start) {
        const typeString = this.parseTagName();
        if (typeString.length === 0) {
            throw new ParseError_1.default(`${symbol.type} name cannot be empty`, {
                start: this.index,
                end: this.index,
            });
        }
        const params = this.parseParams(symbol.endToken);
        this.addToken(symbol.type, start, this.index, typeString, symbol.startToken, params.endToken, params.paramText);
    }
    // When you want to test if x > 0 or x >= 0, writing <#if x > 0> and <#if x >= 0> is WRONG,
    // as the first > will close the #if tag. To work that around, write <#if x gt 0> or <#if gte 0>.
    // Also note that if the comparison occurs inside parentheses, you will have no such problem,
    // like <#if foo.bar(x > 0)> works as expected.
    parseParams(endTags) {
        let paramText = '';
        const start = this.index;
        const stack = [];
        let closeCode;
        while (this.index <= this.length) {
            const ch = this.charCodeAt(this.index);
            if (closeCode !== CharCodes_1.default.DoubleQuote &&
                closeCode !== CharCodes_1.default.SingleQuote) {
                switch (ch) {
                    case CharCodes_1.default.SingleQuote: // '
                    case CharCodes_1.default.DoubleQuote: // "
                        if (closeCode) {
                            stack.push(closeCode);
                        }
                        closeCode = ch;
                        break;
                    case CharCodes_1.default.OpenParenthesis: // (
                        if (closeCode) {
                            stack.push(closeCode);
                        }
                        closeCode = CharCodes_1.default.CloseParenthesis;
                        break;
                    case CharCodes_1.default.OpenBracket: // [
                        if (closeCode) {
                            stack.push(closeCode);
                        }
                        closeCode = CharCodes_1.default.CloseBracket;
                        break;
                    case CharCodes_1.default.CloseBracket: // ]
                    case CharCodes_1.default.CloseParenthesis: // )
                        if (!closeCode || ch !== closeCode) {
                            throw new ParseError_1.default(`To many close tags ${String.fromCharCode(ch)}`, { start, end: this.index });
                        }
                        closeCode = stack.pop();
                        break;
                }
            }
            else {
                switch (ch) {
                    case CharCodes_1.default.SingleQuote: // '
                    case CharCodes_1.default.DoubleQuote: // "
                        if (closeCode === ch) {
                            closeCode = stack.pop();
                        }
                        break;
                }
            }
            if (!closeCode) {
                const nextPos = this.getNextPos(endTags);
                if (nextPos.pos !== -1 && this.index === nextPos.pos) {
                    this.index += nextPos.text.length;
                    return { paramText, endToken: nextPos.text };
                }
                else {
                    paramText += this.charAt(this.index);
                    ++this.index;
                }
            }
            else {
                paramText += this.charAt(this.index);
                ++this.index;
            }
        }
        if (closeCode) {
            throw new ParseError_1.default(`Missing ${String.fromCharCode(closeCode)} close char`, { start, end: this.index });
        }
        throw new ParseError_1.default(`Unclosed directive or macro`, {
            start,
            end: this.index,
        });
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map