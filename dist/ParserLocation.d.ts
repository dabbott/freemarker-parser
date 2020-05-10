import { SourceLocation } from './interface/SourceLocation';
import { Location } from './interface/Tokens';
export declare abstract class ParserLocation {
    protected offsets: number[];
    protected template: string;
    parse(template: string): void;
    protected findLowerIndexInRangeArray(value: number): number;
    protected addLocation(node: Location): void;
    protected locationForIndex(index: number): SourceLocation;
}
//# sourceMappingURL=ParserLocation.d.ts.map