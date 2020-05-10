export declare enum Operators {
    FALSE = "false",
    TRUE = "true",
    RAW_STRING = "\"",
    RAW_STRING2 = "'",
    DOT = ".",
    DOT_DOT = "..",
    DOT_DOT_LESS = "..<",
    DOT_DOT_NOT = "..!",
    DOT_DOT_ASTERISK = "..*",
    BUILT_IN = "?",
    EXISTS = "??",
    EQUALS = "=",
    DOUBLE_EQUALS = "==",
    NOT_EQUALS = "!=",
    PLUS_EQUALS = "+=",
    MINUS_EQUALS = "-=",
    TIMES_EQUALS = "*=",
    DIV_EQUALS = "/=",
    MOD_EQUALS = "%=",
    PLUS_PLUS = "++",
    MINUS_MINUS = "--",
    ESCAPED_LT = "lt",
    ESCAPED_LTE = "lte",
    NATURAL_LT = "<",
    NATURAL_LTE = "<=",
    ESCAPED_GT = "gt",
    ESCAPED_GTE = "gte",
    NATURAL_GT = ">",
    NATURAL_GTE = ">=",
    PLUS = "+",
    MINUS = "-",
    TIMES = "*",
    DOUBLE_STAR = "**",
    ELLIPSIS = "...",
    DIVIDE = "/",
    PERCENT = "%",
    AND = "&&",
    OR = "||",
    EXCLAM = "!",
    COMMA = ",",
    SEMICOLON = ";",
    COLON = ":",
    OPEN_BRACKET = "[",
    CLOSE_BRACKET = "]",
    OPEN_PAREN = "(",
    CLOSE_PAREN = ")",
    OPENING_CURLY_BRACKET = "{",
    CLOSING_CURLY_BRACKET = "}",
    IN = "in",
    AS = "as",
    USING = "using"
}
export declare const Literals: Record<string, boolean>;
export declare const UnaryOps: Record<string, boolean>;
/**
 * @see http://en.wikipedia.org/wiki/Order_of_operations#Programming_language
 */
export declare const BinaryOps: Record<string, number>;
export declare function getMaxKeyLength(obj: object): number;
export declare const maxBinaryOps: number;
export declare const maxUnaryOps: number;
//# sourceMappingURL=Operators.d.ts.map