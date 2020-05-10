import AbstractNode from './AbstractNode';
export default abstract class AbstractBodyNode extends AbstractNode {
    body?: AbstractNode[];
    get hasBody(): boolean;
    addToNode(child: AbstractNode): void;
}
//# sourceMappingURL=AbstractBodyNode.d.ts.map