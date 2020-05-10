import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class ItemsNode extends AbstractNode {
    params?: Expression;
    body: AbstractNode[];
    get hasBody(): boolean;
    constructor(token: Token);
    addToNode(child: AbstractNode): void;
}
//# sourceMappingURL=Items.d.ts.map