import ParseError from '../errors/ParseError';
import AbstractBodyNode from './abstract/AbstractBodyNode';
import AbstractNode from './abstract/AbstractNode';
export default class ProgramNode extends AbstractBodyNode {
    errors?: ParseError[];
    body: AbstractNode[];
    constructor(start: number, end: number);
    addError(error: unknown): void;
}
//# sourceMappingURL=ProgramNode.d.ts.map