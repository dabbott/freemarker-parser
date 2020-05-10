import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractBodyNode from './abstract/AbstractBodyNode';
import AbstractNode from './abstract/AbstractNode';
export default class MacroCallNode extends AbstractBodyNode {
    params?: Expression;
    name: string;
    body?: AbstractNode[];
    constructor(token: Token);
}
//# sourceMappingURL=MacroCallNode.d.ts.map