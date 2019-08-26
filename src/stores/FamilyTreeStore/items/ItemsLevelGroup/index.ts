import {action} from 'mobx';
import {
  IItemExtraInfo,
  IItemModel,
  IItemsLevelGroup,
  IItemsRoleGroup,
  IResponseItemContent,
  IRoleModel
} from '../../interfaces';
import ItemModel from '../ItemModel';
import ItemsLevelGroupHelpers from './Helpers';
import Dimensions from '../../Dimensions';

export default
class ItemsLevelGroup implements IItemsLevelGroup {
  itemsRoleGroup: IItemsRoleGroup;

  items: IItemModel[] = [];

  get distanceFromNextLevel(): number {
    return ItemsLevelGroupHelpers.getDistanceFromNextLevel(this.items);
  }

  distanceFromRoleGroupBottom: number = 0;

  levelIndexInGroup: number = 0;

  get minXCoord(): number {
    const firstItem: IItemModel = this.items[0];

    return ItemsLevelGroupHelpers.getMinXCoord(firstItem);
  }

  get maxXCoord(): number {
    const lastItem: IItemModel = this.items[this.items.length - 1];

    return ItemsLevelGroupHelpers.getMaxXCoord(lastItem);
  }

  get height(): number {
    return ItemsLevelGroupHelpers.getHeight(this.distanceFromNextLevel);
  }

  constructor(
    itemsRoleGroup: IItemsRoleGroup,
    responseItems: IResponseItemContent[],
    levelIndexInGroup: number,
    isLastLevel: boolean
  ) {
    this.itemsRoleGroup = itemsRoleGroup;

    this.items = responseItems.map(({
      id,
      regNo,
      type,
      url,
      favorites,
      title,
      roles,
      legalForm = '',
      address = '',
      regDate = '',
      capCur = 'EUR',
      capSum = '',
      capFullyPaid = false
    }: IResponseItemContent, index: number
    ): IItemModel => {
      const roleObjects: IRoleModel[] = this.itemsRoleGroup.itemsGroup.rolesGroup.roles
        .filter(({roleId}: IRoleModel): boolean => (
          Object.keys(roles).some((key): boolean =>
            (Number(key) === roleId))
        ));

      const itemBubbleInfo: IItemExtraInfo | null = (legalForm || address || regDate || capSum)
        ? {
          legalForm,
          address,
          regDate,
          capCur,
          capSum,
          capFullyPaid
        }
        : null;

      return new ItemModel(
        this,
        id,
        regNo,
        url,
        favorites,
        type,
        title,
        itemBubbleInfo,
        roleObjects,
        roles,
        index
      )
    });

    const leftShift = (isLastLevel)
      ? (itemsRoleGroup.leftShift + Dimensions.INDENTS_BETWEEN_ELEMENTS / 2)
      : itemsRoleGroup.leftShift;

    const centralXArrForItems: number[] = ItemsLevelGroupHelpers.getCentralXArrForItems(
      this.items,
      itemsRoleGroup.itemsGroup.middleDistanceBetweenElements,
      leftShift
    );

    this.items = this.items.map((
      item: IItemModel,
      index: number
    ): IItemModel => {
      item.setCentralX(centralXArrForItems[index]);

      return item;
    });

    this.levelIndexInGroup = levelIndexInGroup;
  }

  @action.bound
  setDistanceFromRoleGroupBottom(newDistanceFromRoleGroupBottom: number): void {
    this.distanceFromRoleGroupBottom = newDistanceFromRoleGroupBottom;
  }
}