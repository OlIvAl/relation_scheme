import {
  IItemsGroup,
  IItemsLevelGroup,
  IItemsRoleGroup,
  IResponseItemContent,
  IRoleModel
} from '../../interfaces';
import ItemsRoleGroupHelpers from './Helpers';
import ItemsLevelGroup from '../ItemsLevelGroup';
import Dimensions from '../../Dimensions';
import {action} from 'mobx';

export default
class ItemsRoleGroup implements IItemsRoleGroup {
  itemsGroup: IItemsGroup;

  itemsGroupLevels: IItemsLevelGroup[] = [];

  distanceFromItemsGroupBottom: number = 0;

  roleItem: IRoleModel;

  get leftShift(): number {
    return ItemsRoleGroupHelpers.getLeftShift(this.roleItem.roleIndex);
  }

  get minXCoord(): number {
    return ItemsRoleGroupHelpers.getMinXCoord(this.itemsGroupLevels);
  }

  get maxXCoord(): number {
    return ItemsRoleGroupHelpers.getMaxXCoord(this.itemsGroupLevels);
  }

  get height(): number {
    return ItemsRoleGroupHelpers.getHeight(this.itemsGroupLevels);
  }

  constructor(
    itemsGroup: IItemsGroup,
    responseItems: IResponseItemContent[],
    roleItem: IRoleModel
  ) {
    this.itemsGroup = itemsGroup;
    this.roleItem = roleItem;

    this.itemsGroupLevels = ItemsRoleGroupHelpers.separationItemsByLevels<IResponseItemContent>(
      responseItems,
      Dimensions.ELEMENTS_IN_LEVEL
    )
      .map((
        levelItems: IResponseItemContent[],
        index: number,
        arr: IResponseItemContent[][]
      ): IItemsLevelGroup => (
        new ItemsLevelGroup(this, levelItems, index, (index === arr.length - 1))
      ));

    const levelDistanceArrFromRoleGroupBottom: number[] = ItemsRoleGroupHelpers.getLevelDistanceArrFromRoleGroupBottom(
      this.itemsGroupLevels
    );

    this.itemsGroupLevels = this.itemsGroupLevels.map((
      itemsGroupLevel: IItemsLevelGroup,
      index: number
    ): IItemsLevelGroup => {
      itemsGroupLevel.setDistanceFromRoleGroupBottom(levelDistanceArrFromRoleGroupBottom[index]);

      return itemsGroupLevel;
    });
  }

  @action.bound
  setDistanceFromItemsGroupBottom(newDistanceFromItemsGroupBottom: number): void {
    this.distanceFromItemsGroupBottom = newDistanceFromItemsGroupBottom;
  }
}