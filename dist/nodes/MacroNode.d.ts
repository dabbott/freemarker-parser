import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractBodyNode from './abstract/AbstractBodyNode';
export default class MacroNode extends AbstractBodyNode {
    params?: Expression;
    constructor(token: Token);
}
//# sourceMappingURL=MacroNode.d.ts.map