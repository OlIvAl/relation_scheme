import Arrow from '../../Arrow';
import {IRelationInfo, IItemArrow, IItemModel, IRoleModel,} from '../../interfaces';
import ItemArrowHelpers from './Helpers';
import {action, computed, runInAction} from 'mobx';
import ArrowBubble from '../../bubbles/ArrowBubble';

export default
class ItemArrow extends Arrow implements IItemArrow {
  readonly item: IItemModel;
  readonly roleItem: IRoleModel;

  relationInfo: IRelationInfo | null = null;

  get itemX(): number {
    return this.item.centralX;
  }
  get itemY(): number {
    return ItemArrowHelpers.getItemY(
      this.item,
      this.roleItem
    );
  }

  get horizontalIndentFromItemCenter(): number {
    return ItemArrowHelpers.getHorizontalIndentFromItemCenter(
      this.item,
      this.roleItem
    );
  }

  get bottomShiftFromItem(): number {
    return ItemArrowHelpers.getBottomShiftFromItem(
      this.item,
      this.roleItem
    );
  }

  get shiftToMiddle(): number {
    return ItemArrowHelpers.getShiftToMiddle(this.roleItem);
  }

  get shiftBottomFromLevel(): number {
    return ItemArrowHelpers.getShiftBottomFromLevel(this.roleItem);
  }

  get shiftFromItemGroupBottom(): number {
    return ItemArrowHelpers.getShiftFromItemGroupBottom(this.item);
  }

  get roleX(): number {
    return this.roleItem.centralX;
  }
  get roleY(): number {
    return ItemArrowHelpers.getRoleY(this.roleItem);
  }

  get d(): string {
    return ItemArrowHelpers.getPathD(
      this.roleItem.relation,
      this.itemX,
      this.itemY,
      this.roleX,
      this.roleY,
      this.horizontalIndentFromItemCenter,
      this.bottomShiftFromItem,
      this.shiftToMiddle,
      this.shiftFromItemGroupBottom,
      this.shiftBottomFromLevel
    )
  }

  strong: boolean = false;

  @computed get notHover(): boolean {
    const hoverArrow: IItemArrow | null = this.item.itemsGroup.hoverArrow;

    return !!(hoverArrow && (hoverArrow.d !== this.d));
  }

  private _timeout: number = 0;

  constructor(
    item: IItemModel,
    roleItem: IRoleModel,
    relationInfo: IRelationInfo | null
  ) {
    super(roleItem.roleId);

    this.item = item;
    this.roleItem = roleItem;
    this.relationInfo = relationInfo;

    this.strong = relationInfo ? relationInfo.percent > 50 : false;
  }

  @action.bound
  setArrowBubble({pageX, pageY}: React.MouseEvent): void {
    // @ts-ignore
    this._timeout = setTimeout(() => {
      runInAction(
        () => {
          if(this.relationInfo) {
            this.item.store.arrowBubble = new ArrowBubble(
              this,
              pageX,
              pageY,
              this.relationInfo.partSum,
              this.relationInfo.partCur,
              this.relationInfo.percent,
              this.relationInfo.startDate,
              this.relationInfo.quitDate,
              this.relationInfo.position
            );
          }
        }
      );
    }, 300);
  }

  @action.bound
  unSetArrowBubble(): void {
    if(this._timeout) {
      clearTimeout(this._timeout);

      this._timeout = 0;
    }

    this.item.store.arrowBubble = null;
  }
}