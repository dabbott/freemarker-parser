import { Token } from '../interface/Tokens';
import AbstractNode from '../nodes/abstract/AbstractNode';
export interface NodeSelector {
    [n: string]: (token: Token, parent: AbstractNode) => AbstractNode;
}
declare const Nodes: NodeSelector;
export default Nodes;
//# sourceMappingURL=Nodes.d.ts.map