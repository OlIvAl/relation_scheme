import ElementModel from '../../ElementModel';
import {Types} from '../../../../enums';
import Dimensions from '../../Dimensions';
import {IItemExtraInfo, IFamilyTreeStore, ITargetItemModel} from '../../interfaces';
import ElementHelpers from '../../ElementModel/Helpers';
import {action, observable, runInAction} from 'mobx';
import ItemBubble from '../../bubbles/ItemBubble';

export default
class TargetItemModel extends ElementModel implements ITargetItemModel {
  readonly store: IFamilyTreeStore;

  readonly id: number;
  readonly regNo: string;
  readonly type: Types;

  readonly itemBubbleInfo: IItemExtraInfo | null = null;

  readonly height: number = Dimensions.TARGET_ELEMENT_HEIGHT;

  @observable hover: boolean = false;

  get minXCoord(): number {
    return this.centralX - this.width / 2;
  }

  get maxXCoord(): number {
    return this.centralX + this.width / 2;
  }

  get minYCoord(): number {
    return this.centralY - this.height / 2;
  }

  get maxYCoord(): number {
    return this.centralY + this.height / 2;
  }

  private _timeout: number = 0;

  constructor(
    store: IFamilyTreeStore,
    id: number,
    regNo: string = '',
    type: Types,
    title: string,
    bubbleInfo: IItemExtraInfo | null
  ) {
    super(title);

    this.store = store;

    this.id = id;
    this.regNo = regNo;
    this.type = type;

    this.itemBubbleInfo = bubbleInfo;

    if(store.childRolesGroup && store.parentRolesGroup) {
      this.width = Dimensions.ELEMENT_BLOCK_PADDING * 2 +
        Math.max(
          ElementHelpers.getTextWidth(title, `bold ${Dimensions.ELEMENT_FONT_SIZE}px Arial`),
          ElementHelpers.getTextWidth(regNo.toString(), `${Dimensions.ELEMENT_FONT_SIZE}px Arial`),
          (store.childRolesGroup.roles.length + 1) * (Dimensions.INDENTS_BETWEEN_ELEMENTS / 2),
          (store.parentRolesGroup.roles.length + 1) * (Dimensions.INDENTS_BETWEEN_ELEMENTS / 2),
        );
    }
  }

  @action.bound
  setItemBubble(): void {
    // @ts-ignore
    this._timeout = setTimeout(() => {
      runInAction(
        () => {
          if(this.itemBubbleInfo) {
            this.store.itemBubble = new ItemBubble(
              this,
              this.itemBubbleInfo.legalForm,
              this.itemBubbleInfo.address,
              this.itemBubbleInfo.regDate,

              this.itemBubbleInfo.capCur,
              this.itemBubbleInfo.capSum,
              this.itemBubbleInfo.capFullyPaid,
            )
          }
        }
      );
    }, 300);
  }

  @action.bound
  unSetItemBubble(): void {
    if(this._timeout) {
      clearTimeout(this._timeout);

      this._timeout = 0;
    }

    this.store.itemBubble = null;
  }

  @action.bound setHover(): void {
    this.hover = true;
  }

  @action.bound setUnHover(): void {
    this.hover = false;
  }
}