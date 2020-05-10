import { AllParamTypes } from '../../interface/Params';
import { Token } from '../../interface/Tokens';
import AbstractBodyNode from './AbstractBodyNode';
export default abstract class AbstractAssign extends AbstractBodyNode {
    protected checkParams(token: Token): AllParamTypes[];
    protected isAssignmentExpressionSingle(param: AllParamTypes, token: Token): AllParamTypes;
    protected isAssignmentExpression(param: AllParamTypes, token: Token): AllParamTypes;
}
//# sourceMappingURL=AbstractAssign.d.ts.map