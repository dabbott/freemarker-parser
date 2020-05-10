import { NodeTypes } from '../../enum/NodeTypes';
import { Location, Token } from '../../interface/Tokens';
export default abstract class AbstractNode implements Location {
    type: NodeTypes;
    start: number;
    end: number;
    get hasBody(): boolean;
    protected constructor(type: NodeTypes, token: Location);
    addToNode(child: AbstractNode): void;
    protected noParams(token: Token): void;
}
//# sourceMappingURL=AbstractNode.d.ts.map