import {action, observable} from 'mobx';
import {
  IFamilyTreeStore, IItemArrow, IItemModel,
  IItemsGroup,
  IItemsLevelGroup,
  IItemsRoleGroup,
  IResponseItemContent, IRoleModel,
  IRolesGroup
} from '../../interfaces';
import ItemsGroupHelpers from './Helpers';
import ItemsRoleGroup from '../ItemsRoleGroup';
import Dimensions from '../../Dimensions';
import {Relations} from '../../../../enums';

export default
class ItemsGroup implements IItemsGroup {
  readonly store: IFamilyTreeStore;

  readonly rolesGroup: IRolesGroup;

  readonly relation: Relations;

  itemsRoleGroups: IItemsRoleGroup[] = [];

  @observable hoverArrow: IItemArrow | null = null;

  // duplicate
  get distanceFromRolesGroup(): number {
    return (Math.floor((this.rolesGroup.roles.length) / 2) + 1) *
      Dimensions.INDENTS_BETWEEN_LEVELS / 2;
  };

  get distanceFromTargetCenter(): number {
    return this.distanceFromRolesGroup +
      Dimensions.ROLE_HEIGHT +
      this.rolesGroup.distanceFromTargetCenter;
  };

  get middleDistanceBetweenElements(): number {
    return (this.rolesGroup.roles.length + 1) *
      (Dimensions.INDENTS_BETWEEN_ELEMENTS / 2);
  };

  get minXCoord(): number {
    const roleMinXCoordArr: number[] = this.itemsRoleGroups
      .map(({minXCoord}: IItemsRoleGroup): number => (minXCoord));

    return Math.min(...roleMinXCoordArr);
  }

  get maxXCoord(): number {
    const roleMaxXCoordArr: number[] = this.itemsRoleGroups
      .map(({maxXCoord}: IItemsRoleGroup): number => (maxXCoord));

    return Math.max(...roleMaxXCoordArr);
  }

  get height(): number {
    return this.itemsRoleGroups
      .reduce<number>(
        (sum: number, itemsRoleGroups: IItemsRoleGroup): number =>
          (sum + itemsRoleGroups.height),
        0
      ) + this.distanceFromRolesGroup;
  }

  get items(): IItemModel[] {
    return this.itemsRoleGroups.reduce((
      accum: IItemsLevelGroup[],
      itemsRoleGroup: IItemsRoleGroup
    ): IItemsLevelGroup[] => (
      accum.concat(itemsRoleGroup.itemsGroupLevels)
    ), [])
      .reduce((
        accum: IItemModel[],
        itemsLevelGroup: IItemsLevelGroup
      ): IItemModel[] => (
        accum.concat(itemsLevelGroup.items)
      ), []);
  }

  get arrowsByRoles(): IItemArrow[][] {
    const arrows: IItemArrow[] = this.itemsRoleGroups
      .reduce((
        accum: IItemsLevelGroup[],
        itemsRoleGroup: IItemsRoleGroup
      ): IItemsLevelGroup[] => (
        accum.concat(itemsRoleGroup.itemsGroupLevels)
      ), [])
      .map(({items}: IItemsLevelGroup): IItemModel[] => ([
          ...items.slice(0, Math.ceil(items.length / 2)),
          ...items.slice(Math.ceil(items.length / 2)).reverse()
      ]))
      .reduce((
        accum: IItemModel[],
        items: IItemModel[]
      ): IItemModel[] => (
        accum.concat(items)
      ), [])
      .reduce((
        accum: IItemArrow[],
        item: IItemModel
      ): IItemArrow[] => (
        accum.concat(item.arrows)
      ), []
    );

    return this.rolesGroup.roles.map(({roleId}: IRoleModel): IItemArrow[] => (
      arrows.filter(({roleItem}: IItemArrow): boolean => (
        roleId === roleItem.roleId
      ))
    ));
  }

  constructor(
    store: IFamilyTreeStore,
    responseItems: IResponseItemContent[],
    rolesGroup: IRolesGroup,
    relation: Relations
  ) {
    this.store = store;

    this.rolesGroup = rolesGroup;

    this.relation = relation;

    this.itemsRoleGroups = ItemsGroupHelpers
      .separateItemsByRoles(responseItems, this.rolesGroup.roles)
      .map((
        responseRoleItems: IResponseItemContent[],
        index: number
      ): IItemsRoleGroup => (
        new ItemsRoleGroup(this, responseRoleItems, this.rolesGroup.roles[index])
      ));

    const roleGroupDistanceArr: number[] = ItemsGroupHelpers
      .getRoleGroupDistanceArrFromItemsGroupBottom(
        this.itemsRoleGroups
      );

    this.itemsRoleGroups = this.itemsRoleGroups
      .map((
        itemsRoleGroup: IItemsRoleGroup,
        index: number
      ): IItemsRoleGroup => {
        itemsRoleGroup.setDistanceFromItemsGroupBottom(roleGroupDistanceArr[index]);

        return itemsRoleGroup;
      });

    // reaction() hoverItem -> notHoverButOtherHover
  }

  @action.bound
  setHoverArrow(newHoverArrow: IItemArrow): void {
    this.hoverArrow = newHoverArrow;
  }

  @action.bound
  unSetHoverArrow(): void {
    this.hoverArrow = null;
  }
}