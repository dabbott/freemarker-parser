export declare enum NodeType {
    Program = "Program",
    OpenDirective = "OpenDirective",
    CloseDirective = "CloseDirective",
    OpenMacro = "OpenMacro",
    CloseMacro = "CloseMacro",
    Text = "Text",
    Interpolation = "Interpolation",
    Comment = "Comment"
}
export interface ParseSymbol {
    startToken: string;
    endToken: string[];
    type: NodeType;
}
//# sourceMappingURL=Symbols.d.ts.map