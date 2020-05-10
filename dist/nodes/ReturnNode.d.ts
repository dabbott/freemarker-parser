import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class ReturnNode extends AbstractNode {
    params?: Expression;
    constructor(token: Token);
}
//# sourceMappingURL=ReturnNode.d.ts.map