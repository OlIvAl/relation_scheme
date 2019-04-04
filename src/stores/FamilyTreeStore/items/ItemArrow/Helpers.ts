import {IItemModel, IRoleModel} from '../../interfaces';
import Dimensions from '../../Dimensions';
import {Relations} from '../../../../enums';

export default
class ItemArrowHelpers {
  static getItemY(
    itemElement: IItemModel,
    roleElement: IRoleModel
  ): number {
    return itemElement.centralY - roleElement.relation * itemElement.height / 2;
  }

  static getRoleY(roleItem: IRoleModel): number {
    return roleItem.centralY + roleItem.relation * roleItem.height / 2;
  }

  static getHorizontalIndentFromItemCenter(
    itemElement: IItemModel,
    roleElement: IRoleModel
  ): number {
    const roleIndexInElement: number = itemElement.roles.indexOf(roleElement);
    const rolesLength: number = itemElement.roles.length;

    return (roleIndexInElement - Math.floor(rolesLength / 2))
      * Dimensions.INDENTS_BETWEEN_ELEMENTS / 2
      + ((rolesLength % 2 === 0) ?
        Dimensions.INDENTS_BETWEEN_ELEMENTS / 2 / 2 :
        0);
  }

  static getBottomShiftFromItem(
    itemElement: IItemModel,
    roleElement: IRoleModel
  ): number {
    const roleIndexInElement: number = itemElement.roles.indexOf(roleElement);

    return ItemArrowHelpers.getItemY(itemElement, roleElement)
      - roleElement.relation * (roleIndexInElement + 1)
       * Dimensions.INDENTS_BETWEEN_LEVELS / 2;
  }

  // duplicate
  static getShiftToMiddle(roleItem: IRoleModel): number {
    const rolesLength: number = roleItem.rolesGroup.roles.length;

    return (roleItem.roleIndex * (Dimensions.INDENTS_BETWEEN_ELEMENTS / 2))
      - (Math.floor(rolesLength / 2) * (Dimensions.INDENTS_BETWEEN_ELEMENTS / 2))
      + ((rolesLength % 2) ? 0 : (Dimensions.INDENTS_BETWEEN_ELEMENTS / 2 / 2));
  }

  // duplicate
  static getShiftBottomFromLevel(roleItem: IRoleModel): number {
    const rolesLength: number = roleItem.rolesGroup.roles.length;
    // ToDo: kostyl!!!
    const roleIndex: number = (!(rolesLength % 2) && (roleItem.roleIndex >= (Math.floor(rolesLength / 2))))
      ? (roleItem.roleIndex + 1)
      : roleItem.roleIndex;

    return Math.abs((Math.floor(rolesLength / 2) - roleIndex) * (Dimensions.INDENTS_BETWEEN_LEVELS / 2));
  }

  static getShiftFromItemGroupBottom(itemElement: IItemModel): number {
    return -itemElement.itemsGroup.distanceFromTargetCenter
      + (Math.floor(itemElement.itemsGroup.rolesGroup.roles.length / 2)
        * Dimensions.INDENTS_BETWEEN_LEVELS / 2
        + Dimensions.INDENTS_BETWEEN_LEVELS / 2)
  }

  static getPathD(
    relation: Relations,
    itemX: number,
    itemY: number,
    roleX: number,
    roleY: number,
    horizontalIndentFromItemCenter: number,
    bottomShiftFromItem: number,
    shiftToMiddle: number,
    shiftFromItemGroupBottom: number,
    shiftBottomFromLevel: number,
  ): string {
    if (relation === Relations.PARENT) {
      return `M${itemX + horizontalIndentFromItemCenter} ${itemY}`
        + `V${bottomShiftFromItem}`
        + `H${shiftToMiddle}`
        + `V${shiftFromItemGroupBottom - shiftBottomFromLevel}`
        + `H${roleX}`
        + `V${roleY - 2}`;
    }

    return `M${roleX} ${roleY}`
      + `V${shiftBottomFromLevel - shiftFromItemGroupBottom}`
      + `H${shiftToMiddle}`
      + `V${bottomShiftFromItem}`
      + `H${itemX + horizontalIndentFromItemCenter}`
      + `V${itemY - 2}`;
  }
}