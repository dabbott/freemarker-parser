import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class ImportNode extends AbstractNode {
    params?: Expression;
    constructor(token: Token);
}
//# sourceMappingURL=ImportNode.d.ts.map