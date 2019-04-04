import {Relations} from '../../../../enums';

export default
class ItemModelHelpers {
  static getCentralCoordY (
    itemHeight: number,
    distanceItemFromNextLevel: number,
    distanceLevelFromRoleGroupBottom: number,
    distanceRoleFromItemsGroupBottom: number,
    distanceItemsGroupFromTargetCenter: number,
    relation: Relations
  ): number {
    return relation * (
      itemHeight / 2 +
      distanceItemFromNextLevel +
      distanceLevelFromRoleGroupBottom +
      distanceRoleFromItemsGroupBottom +
      distanceItemsGroupFromTargetCenter
    );
  }
}