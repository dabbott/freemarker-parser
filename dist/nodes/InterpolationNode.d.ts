import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class InterpolationNode extends AbstractNode {
    params?: Expression;
    constructor(token: Token);
}
//# sourceMappingURL=InterpolationNode.d.ts.map