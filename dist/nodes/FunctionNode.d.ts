import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractBodyNode from './abstract/AbstractBodyNode';
export default class FunctionNode extends AbstractBodyNode {
    params?: Expression;
    constructor(token: Token);
}
//# sourceMappingURL=FunctionNode.d.ts.map