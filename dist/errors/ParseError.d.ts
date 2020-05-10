import { SourceLocation } from '../interface/SourceLocation';
import { Location } from '../interface/Tokens';
export default class ParseError implements Location {
    message: string;
    start: number;
    end: number;
    loc?: {
        start: SourceLocation;
        end: SourceLocation;
    };
    constructor(message: string, el: Location);
}
//# sourceMappingURL=ParseError.d.ts.map