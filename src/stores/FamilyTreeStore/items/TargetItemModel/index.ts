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
  readonly url: string;
  readonly type: Types;

  favorites: boolean = false;

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

  private _bubbleTimeout: number = 0;
  private _hoverTimeout: number = 0;

  constructor(
    store: IFamilyTreeStore,
    id: number,
    regNo: string = '',
    url: string,
    favorites: boolean = false,
    type: Types,
    title: string,
    bubbleInfo: IItemExtraInfo | null
  ) {
    super(title);

    this.store = store;

    this.id = id;
    this.regNo = regNo;
    this.type = type;

    this.url = url;
    this.favorites = favorites;

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
    this._bubbleTimeout = window.setTimeout((): void => {
      runInAction(
        (): void => {
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
    }, Dimensions.TIMER);
  }

  @action.bound
  unSetItemBubble(): void {
    if(this._bubbleTimeout) {
      clearTimeout(this._bubbleTimeout);

      this._bubbleTimeout = 0;
    }

    this.store.itemBubble = null;
  }

  @action.bound
  setHover(): void {
    this._hoverTimeout = window.setTimeout((): void => {
      runInAction(
        (): void => {
          this.hover = true;
        }
      );
    }, Dimensions.TIMER);
  }

  @action.bound
  setUnHover(): void {
    if(this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);

      this._hoverTimeout = 0;
    }

    this.hover = false;
  }

  @action.bound
  redirectToInfoPage(): void {
    window.location.href = window.location.origin + this.url;
  }

  @action.bound
  triggerFavorite(): void {
    this.favorites = !this.favorites;
  }
}