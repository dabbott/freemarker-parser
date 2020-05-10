import { NodeTypes } from '../enum/NodeTypes';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';

export default class SepNode extends AbstractNode {
  public body: AbstractNode[];

  get hasBody(): boolean {
    return true;
  }

  constructor(token: Token) {
    super(NodeTypes.Sep, token);
    this.body = [];
  }

  public addToNode(child: AbstractNode): void {
    this.body.push(child);
  }
}
