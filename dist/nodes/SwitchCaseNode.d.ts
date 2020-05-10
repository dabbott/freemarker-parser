import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class SwitchCaseNode extends AbstractNode {
    params?: Expression;
    consequent: AbstractNode[];
    constructor(token: Token);
}
//# sourceMappingURL=SwitchCaseNode.d.ts.map