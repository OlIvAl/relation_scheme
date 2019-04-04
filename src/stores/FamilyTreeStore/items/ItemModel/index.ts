import {action, observable} from 'mobx';

import {
  IItemExtraInfo,
  IItemArrow,
  IItemModel,
  IItemsGroup,
  IItemsLevelGroup,
  IItemsRoleGroup,
  IRoleModel
} from '../../interfaces';
import Dimensions from '../../Dimensions';
import TargetItemModel from '../TargetItemModel';
import {Types} from '../../../../enums';
import ItemArrow from '../ItemArrow';
import ItemModelHelpers from './Helpers';

export default
class ItemModel extends TargetItemModel implements IItemModel {
  readonly itemsLevelGroup: IItemsLevelGroup;
  readonly itemsRoleGroup: IItemsRoleGroup;
  readonly itemsGroup: IItemsGroup;

  arrows: IItemArrow[];

  roles: IRoleModel[];

  height: number = Dimensions.ELEMENT_HEIGHT;

  indexInLevel: number;

  get centralY(): number {
    return ItemModelHelpers.getCentralCoordY(
      this.height,
      this.itemsLevelGroup.distanceFromNextLevel,
      this.itemsLevelGroup.distanceFromRoleGroupBottom,
      this.itemsRoleGroup.distanceFromItemsGroupBottom,
      this.itemsGroup.distanceFromTargetCenter,
      this.itemsGroup.relation
    )
  }

  set centralY(newValue: number) {}

  constructor(
    itemsLevelGroup: IItemsLevelGroup,
    id: number,
    regNo: string,
    type: Types,
    title: string,
    bubbleInfo: IItemExtraInfo | null,
    roles: IRoleModel[],
    relationInfoObj: any,
    indexInLevel: number
  ) {
    super(itemsLevelGroup.itemsRoleGroup.itemsGroup.store, id, regNo, type, title, bubbleInfo);

    this.itemsLevelGroup = itemsLevelGroup;
    this.itemsRoleGroup = this.itemsLevelGroup.itemsRoleGroup;
    this.itemsGroup = this.itemsLevelGroup.itemsRoleGroup.itemsGroup;

    this.indexInLevel = indexInLevel;

    this.roles = roles;

    this.arrows = this.roles.map((role: IRoleModel): IItemArrow => (
      new ItemArrow(this, role, relationInfoObj[role.roleId])
    ));

    this.width = Math.max(
      this.width,
      (this.arrows.length + 1) * Dimensions.INDENTS_BETWEEN_ELEMENTS / 2
    )
  }

  @action.bound getNewFT(): void {
    if(this.store.targetItem) {
      this.store.previousTargetLink.setPreviousTargetItem(this.store.targetItem);
    }

    this.itemsGroup.store.init(this.id, this.type);
  }
}