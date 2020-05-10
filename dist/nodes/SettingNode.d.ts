import { AssignmentExpression } from '../interface/Params';
import { Token } from '../interface/Tokens';
import AbstractAssign from './abstract/AbstractAssign';
export default class SettingNode extends AbstractAssign {
    expression: AssignmentExpression;
    constructor(token: Token);
}
//# sourceMappingURL=SettingNode.d.ts.map