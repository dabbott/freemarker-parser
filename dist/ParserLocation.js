"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CharCodes_1 = __importDefault(require("./enum/CharCodes"));
class ParserLocation {
    constructor() {
        this.offsets = [0];
        this.template = '';
    }
    parse(template) {
        this.template = template || '';
        const offsets = [0];
        for (let offset = 0; offset < template.length;) {
            switch (this.template.charCodeAt(offset)) {
                case CharCodes_1.default.LineFeed:
                    offset += 1;
                    offsets.push(offset);
                    break;
                case CharCodes_1.default.CarriageReturn:
                    offset += 1;
                    if (this.template.charCodeAt(offset) === CharCodes_1.default.LineFeed) {
                        offset += 1;
                    }
                    offsets.push(offset);
                    break;
                default:
                    ++offset;
                    break;
            }
        }
        this.offsets = offsets;
    }
    findLowerIndexInRangeArray(value) {
        if (value >= this.offsets[this.offsets.length - 1]) {
            return this.offsets.length - 1;
        }
        let min = 0;
        let max = this.offsets.length - 2;
        let mid;
        while (min < max) {
            mid = min + ((max - min) >> 1);
            if (value < this.offsets[mid]) {
                max = mid - 1;
            }
            else if (value >= this.offsets[mid + 1]) {
                min = mid + 1;
            }
            else {
                // value >= this.offsets[mid] && value < this.offsets[mid + 1]
                min = mid;
                break;
            }
        }
        return min;
    }
    addLocation(node) {
        node.loc = {
            start: this.locationForIndex(node.start),
            end: this.locationForIndex(node.end),
        };
    }
    locationForIndex(index) {
        if (index < 0 || index >= this.template.length || isNaN(index)) {
            return { line: 0, column: 0 };
        }
        const line = this.findLowerIndexInRangeArray(index);
        const column = index - this.offsets[line];
        return { line: line + 1, column: column + 1 };
    }
}
exports.ParserLocation = ParserLocation;
//# sourceMappingURL=ParserLocation.js.map