import { AllParamTypes, Expression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractAssign from './abstract/AbstractAssign';
import AbstractNode from './abstract/AbstractNode';
export default class GlobalNode extends AbstractAssign {
    params?: Expression[];
    body?: AbstractNode[];
    constructor(token: Token);
    protected isAssignmentExpressionSingle(param: AllParamTypes, token: Token): AllParamTypes;
    protected isAssignmentExpression(param: AllParamTypes, token: Token): AllParamTypes;
}
//# sourceMappingURL=GlobalNode.d.ts.map