"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParseError_1 = __importDefault(require("./errors/ParseError"));
const Symbols_1 = require("./Symbols");
const Tokenizer_1 = require("./Tokenizer");
const Directives_1 = require("./enum/Directives");
const NodeTypes_1 = require("./enum/NodeTypes");
const ProgramNode_1 = __importDefault(require("./nodes/ProgramNode"));
const ParserLocation_1 = require("./ParserLocation");
const Nodes_1 = __importDefault(require("./utils/Nodes"));
const defaultConfig_1 = __importDefault(require("./defaultConfig"));
class Parser extends ParserLocation_1.ParserLocation {
    constructor() {
        super(...arguments);
        this.options = defaultConfig_1.default;
    }
    parse(template, options = {}) {
        super.parse(template);
        const ast = new ProgramNode_1.default(0, template.length - 1);
        const stack = [];
        let parent = ast;
        let tokens = [];
        this.addLocation(parent);
        this.options = Object.assign(Object.assign({}, defaultConfig_1.default), options);
        try {
            const tokenizer = new Tokenizer_1.Tokenizer(this.options);
            tokens = tokenizer.parse(template);
        }
        catch (error) {
            ast.addError(error);
        }
        if (tokens.length === 0) {
            this.addLocationToProgram(ast);
            return { ast, tokens };
        }
        let token = null;
        for (token of tokens) {
            try {
                const tokenType = this.tokenToNodeType(token);
                if (token.type === Symbols_1.NodeType.CloseDirective ||
                    token.type === Symbols_1.NodeType.CloseMacro) {
                    if (token.params) {
                        ast.addError(new ParseError_1.default(`Close tag '${tokenType}' should have no params`, token));
                        continue;
                    }
                    // Sep nodes are automatically closed if immediately followed by a list close
                    if (parent.type === NodeTypes_1.NodeTypes.Sep && tokenType === NodeTypes_1.NodeTypes.List) {
                        parent = stack.pop();
                    }
                    if (parent.type !== tokenType) {
                        ast.addError(new ParseError_1.default(`Unexpected close tag '${tokenType}'`, token));
                        continue;
                    }
                    parent = stack.pop(); // its always
                }
                else {
                    const node = this.addNodeChild(parent, token);
                    if (node !== parent && node.hasBody) {
                        if (!this.isPartial(tokenType, parent.type)) {
                            stack.push(parent);
                        }
                        parent = node;
                    }
                }
            }
            catch (error) {
                ast.addError(error);
            }
        }
        if (stack.length > 0) {
            ast.addError(new ParseError_1.default(`Unclosed tag '${parent.type}'`, parent));
        }
        this.addLocationToProgram(ast);
        return { ast, tokens };
    }
    addLocationToProgram(parent) {
        if (this.options.parseLocation) {
            if (parent.errors) {
                for (const node of parent.errors) {
                    this.addLocation(node);
                }
            }
        }
    }
    addNodeChild(parent, token) {
        const tokenType = this.tokenToNodeType(token);
        const node = Nodes_1.default[tokenType](token, parent);
        if (node) {
            this.addLocation(node);
        }
        if (parent !== node) {
            parent.addToNode(node);
        }
        return node;
    }
    isPartial(type, parentType) {
        switch (type) {
            case NodeTypes_1.NodeTypes.ConditionElse:
                return NodeTypes_1.NodeTypes.Condition === parentType;
            case NodeTypes_1.NodeTypes.Else:
                return (NodeTypes_1.NodeTypes.Condition === parentType || NodeTypes_1.NodeTypes.List === parentType);
            case NodeTypes_1.NodeTypes.Recover:
                return NodeTypes_1.NodeTypes.Attempt === parentType;
        }
        return false;
    }
    tokenToNodeType(token) {
        switch (token.type) {
            case Symbols_1.NodeType.CloseDirective:
            case Symbols_1.NodeType.OpenDirective:
                if (token.text in Directives_1.Directives) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return Directives_1.Directives[token.text];
                }
                break;
            case Symbols_1.NodeType.Interpolation:
                return NodeTypes_1.NodeTypes.Interpolation;
            case Symbols_1.NodeType.Text:
                return NodeTypes_1.NodeTypes.Text;
            case Symbols_1.NodeType.CloseMacro:
            case Symbols_1.NodeType.OpenMacro:
                return NodeTypes_1.NodeTypes.MacroCall;
            case Symbols_1.NodeType.Comment:
                return NodeTypes_1.NodeTypes.Comment;
        }
        throw new ParseError_1.default(`Unknown token \`${token.type}\` - \`${token.text}\``, token);
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map