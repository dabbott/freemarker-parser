import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class StopNode extends AbstractNode {
    params?: Expression;
    constructor(token: Token);
}
//# sourceMappingURL=StopNode.d.ts.map