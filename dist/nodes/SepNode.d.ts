import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
export default class SepNode extends AbstractNode {
    body: AbstractNode[];
    get hasBody(): boolean;
    constructor(token: Token);
    addToNode(child: AbstractNode): void;
}
//# sourceMappingURL=SepNode.d.ts.map