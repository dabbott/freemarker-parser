import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class AttemptNode extends AbstractNode {
    body: AbstractNode[];
    fallback?: AbstractNode[];
    get hasBody(): boolean;
    constructor(token: Token);
    addToNode(child: AbstractNode): void;
}
//# sourceMappingURL=AttemptNode.d.ts.map