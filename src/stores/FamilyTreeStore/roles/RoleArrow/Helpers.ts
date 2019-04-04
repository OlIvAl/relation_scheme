import {IRoleModel} from '../../interfaces';
import Dimensions from '../../Dimensions';

export default
class RoleArrowHelpers {
  static getRoleX(roleItem: IRoleModel): number {
    return roleItem.centralX;
  }

  static getRoleY(roleItem: IRoleModel): number {
    return roleItem.centralY
      - roleItem.relation * roleItem.height / 2;
  }

  static getShiftBottomFromRole(roleItem: IRoleModel): number {
    const rolesLength: number = roleItem.rolesGroup.roles.length;
    // ToDo: kostyl!!!
    const roleIndex: number = (!(rolesLength % 2) && (roleItem.roleIndex >= (Math.floor(rolesLength / 2))))
      ? (roleItem.roleIndex + 1)
      : roleItem.roleIndex;

    return Math.abs((Math.floor(rolesLength / 2) - roleIndex) * (Dimensions.INDENTS_BETWEEN_LEVELS / 2));
  }

  static getShiftToMiddle(roleItem: IRoleModel): number {
    const rolesLength: number = roleItem.rolesGroup.roles.length;

    return (roleItem.roleIndex * (Dimensions.INDENTS_BETWEEN_ELEMENTS / 2))
      - (Math.floor(rolesLength / 2) * (Dimensions.INDENTS_BETWEEN_ELEMENTS / 2))
      + ((rolesLength % 2) ? 0 : (Dimensions.INDENTS_BETWEEN_ELEMENTS / 2 / 2));
  }

  static getTargetX(): number {
    return 0;
  }

  static getTargetY(roleItem: IRoleModel): number {
    return roleItem.relation * Dimensions.TARGET_ELEMENT_HEIGHT / 2;
  }
}