import AbstractTokenizer from './AbstractTokenizer';
import ECharCodes from './enum/CharCodes';
import { Options } from './interface/Options';
import { Token } from './interface/Tokens';
import { NodeType, ParseSymbol } from './Symbols';
interface NextPos {
    pos: number;
    text: string;
}
interface Params {
    paramText: string;
    endToken: string;
}
export declare class Tokenizer extends AbstractTokenizer {
    protected tokens: Token[];
    protected options: Options;
    protected symbols: ParseSymbol[];
    protected get openTag(): ECharCodes;
    protected get closeTag(): ECharCodes;
    constructor(options?: Options);
    parse(template: string): Token[];
    protected getNextPos(items: string[]): NextPos;
    protected parseTagName(): string;
    protected getToken(): ParseSymbol | null;
    protected parseTemplate(): void;
    protected addToken(type: NodeType, start: number, end: number, text: string, startTag?: string, endTag?: string, params?: string): void;
    protected parseComment(symbol: ParseSymbol, start: number): void;
    protected parseInterpolation(symbol: ParseSymbol, start: number): void;
    protected parseOpenDirectiveOrMacro(symbol: ParseSymbol, start: number): void;
    protected parseCloseDirectiveOrMacro(symbol: ParseSymbol, start: number): void;
    protected parseParams(endTags: string[]): Params;
}
export {};
//# sourceMappingURL=Tokenizer.d.ts.map