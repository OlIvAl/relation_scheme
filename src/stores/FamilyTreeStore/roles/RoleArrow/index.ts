import Arrow from '../../Arrow';
import {IRoleArrow, IRoleModel} from '../../interfaces';
import {Relations} from '../../../../enums';
import RoleArrowHelpers from './Helpers';

export default
class RoleArrow extends Arrow implements IRoleArrow {
  readonly roleItem: IRoleModel;

  get roleX(): number {
    return RoleArrowHelpers.getRoleX(this.roleItem);
  }
  get roleY(): number {
    return RoleArrowHelpers.getRoleY(this.roleItem);
  }

  get shiftBottomFromRole(): number {
    return RoleArrowHelpers.getShiftBottomFromRole(this.roleItem);
  }

  get shiftToMiddle(): number {
    return RoleArrowHelpers.getShiftToMiddle(this.roleItem);
  }

  /*get shiftBottomToTarget(): number {
    return this.roleItem.rolesGroup.distanceFromTarget - this.shiftBottomFromRole;
  }*/

  get targetX(): number {
    return RoleArrowHelpers.getTargetX();
  }
  get targetY(): number {
    return RoleArrowHelpers.getTargetY(this.roleItem);
  }

  get d(): string {
    if (this.roleItem.relation === Relations.PARENT) {
      return `M${this.roleX} ${this.roleY}`
        + `V ${this.roleY + this.shiftBottomFromRole}`
        + `H ${this.targetX + this.shiftToMiddle}`
        + `V ${this.targetY - 4}`;
    }

    return `M${this.targetX + this.shiftToMiddle} ${this.targetY + 2}`
      + `V ${this.roleY - this.shiftBottomFromRole}`
      + `H ${this.roleX}`
      + `V ${this.roleY - 1.5}`;
  }

  constructor(roleItem: IRoleModel) {
    super(roleItem.roleId);

    this.roleItem = roleItem;
  }
}