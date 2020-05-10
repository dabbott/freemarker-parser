import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractBodyNode from './abstract/AbstractBodyNode';
export default class EscapeNode extends AbstractBodyNode {
    params?: Expression;
    constructor(token: Token);
}
//# sourceMappingURL=EscapeNode.d.ts.map