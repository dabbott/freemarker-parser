import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';
import SwitchCaseNode from './SwitchCaseNode';
import SwitchDefaultNode from './SwitchDefaultNode';
export declare type NodeSwitchGroup = SwitchCaseNode | SwitchDefaultNode;
export default class SwitchNode extends AbstractNode {
    params?: Expression;
    cases: NodeSwitchGroup[];
    get hasBody(): boolean;
    constructor(token: Token);
    addToNode(child: AbstractNode): void;
}
//# sourceMappingURL=SwitchNode.d.ts.map