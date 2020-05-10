import { Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractAssign from './abstract/AbstractAssign';
export default class FtlNode extends AbstractAssign {
    params?: Expression[];
    constructor(token: Token);
}
//# sourceMappingURL=FtlNode.d.ts.map