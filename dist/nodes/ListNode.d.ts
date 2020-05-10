import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class ListNode extends AbstractNode {
    params?: Expression;
    body: AbstractNode[];
    fallback?: AbstractNode[];
    get hasBody(): boolean;
    constructor(token: Token);
    addToNode(child: AbstractNode): void;
}
//# sourceMappingURL=ListNode.d.ts.map