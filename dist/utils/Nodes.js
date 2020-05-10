"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypes_1 = require("../enum/NodeTypes");
const ParseError_1 = __importDefault(require("../errors/ParseError"));
const AssignNode_1 = __importDefault(require("../nodes/AssignNode"));
const AttemptNode_1 = __importDefault(require("../nodes/AttemptNode"));
const AutoEscNode_1 = __importDefault(require("../nodes/AutoEscNode"));
const BreakNode_1 = __importDefault(require("../nodes/BreakNode"));
const CommentNode_1 = __importDefault(require("../nodes/CommentNode"));
const CompressNode_1 = __importDefault(require("../nodes/CompressNode"));
const ConditionNode_1 = __importDefault(require("../nodes/ConditionNode"));
const EscapeNode_1 = __importDefault(require("../nodes/EscapeNode"));
const FlushNode_1 = __importDefault(require("../nodes/FlushNode"));
const FtlNode_1 = __importDefault(require("../nodes/FtlNode"));
const FunctionNode_1 = __importDefault(require("../nodes/FunctionNode"));
const GlobalNode_1 = __importDefault(require("../nodes/GlobalNode"));
const ImportNode_1 = __importDefault(require("../nodes/ImportNode"));
const IncludeNode_1 = __importDefault(require("../nodes/IncludeNode"));
const InterpolationNode_1 = __importDefault(require("../nodes/InterpolationNode"));
const ListNode_1 = __importDefault(require("../nodes/ListNode"));
const LocalNode_1 = __importDefault(require("../nodes/LocalNode"));
const LtNode_1 = __importDefault(require("../nodes/LtNode"));
const MacroCallNode_1 = __importDefault(require("../nodes/MacroCallNode"));
const MacroNode_1 = __importDefault(require("../nodes/MacroNode"));
const NoAutoEscNode_1 = __importDefault(require("../nodes/NoAutoEscNode"));
const NoEscapeNode_1 = __importDefault(require("../nodes/NoEscapeNode"));
const NtNode_1 = __importDefault(require("../nodes/NtNode"));
const OutputFormatNode_1 = __importDefault(require("../nodes/OutputFormatNode"));
const ReturnNode_1 = __importDefault(require("../nodes/ReturnNode"));
const RtNode_1 = __importDefault(require("../nodes/RtNode"));
const SepNode_1 = __importDefault(require("../nodes/SepNode"));
const SettingNode_1 = __importDefault(require("../nodes/SettingNode"));
const StopNode_1 = __importDefault(require("../nodes/StopNode"));
const SwitchCaseNode_1 = __importDefault(require("../nodes/SwitchCaseNode"));
const SwitchDefaultNode_1 = __importDefault(require("../nodes/SwitchDefaultNode"));
const SwitchNode_1 = __importDefault(require("../nodes/SwitchNode"));
const TextNode_1 = __importDefault(require("../nodes/TextNode"));
const TNode_1 = __importDefault(require("../nodes/TNode"));
const Items_1 = __importDefault(require("../nodes/Items"));
const Nodes = {
    [NodeTypes_1.NodeTypes.Else](token, parent) {
        if (parent instanceof ConditionNode_1.default && !parent.alternate) {
            parent.alternate = [];
            return parent;
        }
        else if (parent instanceof ListNode_1.default && !parent.fallback) {
            parent.fallback = [];
            return parent;
        }
        throw new ParseError_1.default(`Error while creating node '${NodeTypes_1.NodeTypes.Else}' inside '${parent.type}'`, token);
    },
    [NodeTypes_1.NodeTypes.Condition](token) {
        return new ConditionNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.ConditionElse](token, parent) {
        if (parent instanceof ConditionNode_1.default && !parent.alternate) {
            parent.alternate = [];
            return new ConditionNode_1.default(token);
        }
        throw new ParseError_1.default(`Error while creating node '${NodeTypes_1.NodeTypes.ConditionElse}' inside '${parent.type}'`, token);
    },
    [NodeTypes_1.NodeTypes.Recover](token, parent) {
        if (parent instanceof AttemptNode_1.default) {
            if (!parent.fallback) {
                parent.fallback = [];
                return parent;
            }
        }
        throw new ParseError_1.default(`Error while creating node '${NodeTypes_1.NodeTypes.Recover}' inside '${parent.type}'`, token);
    },
    [NodeTypes_1.NodeTypes.SwitchCase](token, parent) {
        if (parent instanceof SwitchNode_1.default) {
            parent.cases.push(new SwitchCaseNode_1.default(token));
            return parent;
        }
        throw new ParseError_1.default(`Error while creating node '${NodeTypes_1.NodeTypes.SwitchCase}' inside '${parent.type}'`, token);
    },
    [NodeTypes_1.NodeTypes.SwitchDefault](token, parent) {
        if (parent instanceof SwitchNode_1.default) {
            parent.cases.push(new SwitchDefaultNode_1.default(token));
            return parent;
        }
        throw new ParseError_1.default(`Error while creating node '${NodeTypes_1.NodeTypes.SwitchDefault}' inside '${parent.type}'`, token);
    },
    [NodeTypes_1.NodeTypes.Global](token) {
        return new GlobalNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Local](token) {
        return new LocalNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Assign](token) {
        return new AssignNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Function](token) {
        return new FunctionNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Return](token) {
        return new ReturnNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Attempt](token) {
        return new AttemptNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.List](token) {
        return new ListNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Macro](token) {
        return new MacroNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Include](token) {
        return new IncludeNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Interpolation](token) {
        return new InterpolationNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Items](token) {
        return new Items_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Text](token) {
        return new TextNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.MacroCall](token) {
        return new MacroCallNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Comment](token) {
        return new CommentNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Switch](token) {
        return new SwitchNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Sep](token) {
        return new SepNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Break](token) {
        return new BreakNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Compress](token) {
        return new CompressNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Import](token) {
        return new ImportNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Stop](token) {
        return new StopNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Setting](token) {
        return new SettingNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Rt](token) {
        return new RtNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Lt](token) {
        return new LtNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Nt](token) {
        return new NtNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.T](token) {
        return new TNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Flush](token) {
        return new FlushNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.Escape](token) {
        return new EscapeNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.NoEscape](token, parent) {
        if (parent instanceof EscapeNode_1.default || parent instanceof NoEscapeNode_1.default) {
            return new NoEscapeNode_1.default(token);
        }
        throw new ParseError_1.default(`Error while creating node '${NodeTypes_1.NodeTypes.NoEscape}' inside '${parent.type}'`, token);
    },
    [NodeTypes_1.NodeTypes.Ftl](token) {
        return new FtlNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.AutoEsc](token) {
        return new AutoEscNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.NoAutoEsc](token) {
        return new NoAutoEscNode_1.default(token);
    },
    [NodeTypes_1.NodeTypes.OutputFormat](token) {
        return new OutputFormatNode_1.default(token);
    },
};
exports.default = Nodes;
//# sourceMappingURL=Nodes.js.map