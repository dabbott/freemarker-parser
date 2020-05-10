import AbstractTokenizer from './AbstractTokenizer';
import { Operators } from './enum/Operators';
import { AllParamTypes, ArrayExpression, Identifier, Literal, MapExpression } from './interface/Params';
export declare class ParamsParser extends AbstractTokenizer {
    constructor(template: string);
    parseExpressions(): AllParamTypes;
    /**
     * The main parsing function. Much of this code is dedicated to ternary expressions
     */
    protected parseExpression(): AllParamTypes | null;
    /**
     * Push `index` up to the next non-space character
     */
    protected parseSpaces(): void;
    /**
     * Search for the operation portion of the string (e.g. `+`, `===`)
     * Start by taking the longest possible binary operations (3 characters: `===`, `!==`, `>>>`)
     * and move down from 3 to 2 to 1 character until a matching binary operation is found
     * then, return that binary operation
     */
    protected parseBinaryOp(): Operators | null;
    /**
     * This function is responsible for gobbling an individual expression,
     * e.g. `1`, `1+2`, `a+(b*2)-Math.sqrt(2)`
     */
    protected parseBinaryExpression(): AllParamTypes | null;
    /**
     * An individual part of a binary expression:
     * e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
     */
    protected parseToken(): AllParamTypes | null;
    /**
     * Parse simple numeric literals: `12`, `3.4`, `.5`. Do this by using a string to
     * keep track of everything in the numeric literal and then calling `parseFloat` on that string
     */
    protected parseNumericLiteral(): Literal;
    /**
     * Parses a string literal, staring with single or double quotes with basic support for escape codes
     * e.g. `"hello world"`, `'this is\nJSEP'`
     */
    protected parseStringLiteral(): Literal;
    /**
     * Gobbles only identifiers
     * e.g.: `foo`, `_value`, `$x1`
     * Also, this function checks if that identifier is a literal:
     * (e.g. `true`, `false`, `null`) or `this`
     */
    protected parseIdentifier(): Identifier | Literal;
    /**
     * Gobbles a list of arguments within the context of a function call
     * or array literal. This function also assumes that the opening character
     * `(` or `[` has already been gobbled, and gobbles expressions and commas
     * until the terminator character `)` or `]` is encountered.
     * e.g. `foo(bar, baz)`, `my_func()`, or `[bar, baz]`
     */
    protected parseArguments(termination: number): AllParamTypes[];
    /**
     * Gobble a non-literal variable name. This variable name may include properties
     * e.g. `foo`, `bar.baz`, `foo['bar'].baz`
     * It also gobbles function calls:
     * e.g. `Math.acos(obj.angle)`
     */
    protected parseVariable(): AllParamTypes | null;
    /**
     * Responsible for parsing a group of things within parentheses `()`
     * This function assumes that it needs to gobble the opening parenthesis
     * and then tries to gobble everything within that parenthesis, assuming
     * that the next thing it should see is the close parenthesis. If not,
     * then the expression probably doesn't have a `)`
     */
    protected parseGroup(): AllParamTypes | null;
    /**
     * Responsible for parsing Array literals `[1, 2, 3]`
     * This function assumes that it needs to gobble the opening bracket
     * and then tries to gobble the expressions as arguments.
     */
    protected parseArray(): ArrayExpression;
    /**
     * Responsible for parsing Map literals `[a: 1, b: 2, c: 3]`
     * This function assumes that it needs to gobble the opening brace
     * and then tries to gobble the expressions as arguments.
     */
    protected parseMap(): MapExpression;
}
//# sourceMappingURL=ParamsParser.d.ts.map