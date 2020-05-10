import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class IncludeNode extends AbstractNode {
    params?: Expression;
    constructor(token: Token);
}
//# sourceMappingURL=IncludeNode.d.ts.map