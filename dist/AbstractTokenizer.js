"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractTokenizer {
    constructor() {
        this.template = '';
        this.length = 0;
        this.index = 0;
    }
    charAt(i) {
        return this.template.charAt(i);
    }
    charCodeAt(i) {
        return this.template.charCodeAt(i);
    }
    init(template) {
        this.template = template;
        this.length = template.length;
        this.index = 0;
    }
}
exports.default = AbstractTokenizer;
//# sourceMappingURL=AbstractTokenizer.js.map