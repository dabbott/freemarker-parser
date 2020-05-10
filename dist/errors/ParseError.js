"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseError {
    constructor(message, el) {
        this.message = message;
        this.start = el.start;
        this.end = el.end;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ParseError.prototype);
    }
}
exports.default = ParseError;
//# sourceMappingURL=ParseError.js.map