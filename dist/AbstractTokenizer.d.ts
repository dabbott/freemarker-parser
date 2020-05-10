export default abstract class AbstractTokenizer {
    protected template: string;
    protected length: number;
    protected index: number;
    protected charAt(i: number): string;
    protected charCodeAt(i: number): number;
    protected init(template: string): void;
}
//# sourceMappingURL=AbstractTokenizer.d.ts.map