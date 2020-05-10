import { Options } from './interface/Options';
import { Token } from './interface/Tokens';
import { NodeTypes } from './enum/NodeTypes';
import AbstractNode from './nodes/abstract/AbstractNode';
import ProgramNode from './nodes/ProgramNode';
import { ParserLocation } from './ParserLocation';
export interface ParserReturn {
    ast: ProgramNode;
    tokens: Token[];
}
export declare class Parser extends ParserLocation {
    protected options: Options;
    parse(template: string, options?: Options): ParserReturn;
    protected addLocationToProgram(parent: ProgramNode): void;
    protected addNodeChild(parent: AbstractNode, token: Token): AbstractNode;
    protected isPartial(type: NodeTypes, parentType: NodeTypes): boolean;
    protected tokenToNodeType(token: Token): NodeTypes;
}
//# sourceMappingURL=Parser.d.ts.map