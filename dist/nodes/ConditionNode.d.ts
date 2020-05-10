import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class ConditionNode extends AbstractNode {
    params?: Expression;
    consequent: AbstractNode[];
    alternate?: AbstractNode[];
    get hasBody(): boolean;
    constructor(token: Token);
    addToNode(child: AbstractNode): void;
}
//# sourceMappingURL=ConditionNode.d.ts.map