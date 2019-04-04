import {IItemBubble, IItemModel, ISvgRootModel, ITargetItemModel} from '../../interfaces';
import ElementHelpers from '../../ElementModel/Helpers';
import Dimensions from '../../Dimensions';
import Bubble from '../Bubble';

export default
class ItemBubble extends Bubble implements IItemBubble {
  item: IItemModel | ITargetItemModel;

  legalForm: string;
  address: string;
  regDate: string;

  capCur: string;
  capSum: string;
  capFullyPaid: boolean;

  width: number;
  height: number;

  get positionTop(): number {
    const {
      scaleCoeff,
      svgHeight,
      svgPositionTop
    }: ISvgRootModel = this.item.store.svgRoot;

    const defaultPositionTop: number = svgPositionTop + svgHeight / 2 - this.height + Dimensions.ITEM_BUBBLE_Y_INDENT + this.item.minYCoord * scaleCoeff;

    if(defaultPositionTop < 0) {
      return svgPositionTop + svgHeight / 2 - Dimensions.ITEM_BUBBLE_Y_INDENT + this.item.maxYCoord * scaleCoeff;
    }

    return defaultPositionTop;
  };
  get positionLeft(): number {
    const {
      scaleCoeff,
      svgWidth,
      svgPositionLeft
    }: ISvgRootModel = this.item.store.svgRoot;

    const defaultPositionLeft: number = svgPositionLeft + svgWidth / 2 - Dimensions.ITEM_BUBBLE_X_INDENT + this.item.maxXCoord * scaleCoeff;

    if(defaultPositionLeft + this.width > this.item.store.viewPort.viewPortWidth) {
      return svgPositionLeft + svgWidth / 2 + Dimensions.ITEM_BUBBLE_X_INDENT - this.width + this.item.minXCoord * scaleCoeff;
    }

    return defaultPositionLeft;
  };

  get horizontalTailPosition(): 'left' | 'right' {
    const {
      scaleCoeff,
      svgWidth,
      svgPositionLeft
    }: ISvgRootModel = this.item.store.svgRoot;

    const defaultPositionLeft: number = svgPositionLeft + svgWidth / 2 - Dimensions.ITEM_BUBBLE_X_INDENT + this.item.maxXCoord * scaleCoeff;

    if(defaultPositionLeft + this.width > this.item.store.viewPort.viewPortWidth) {
      return 'right';
    }

    return 'left';
  }
  get verticalTailPosition(): 'top' | 'bottom' {
    const {
      scaleCoeff,
      svgHeight,
      svgPositionTop
    }: ISvgRootModel = this.item.store.svgRoot;

    const defaultPositionTop: number = svgPositionTop + svgHeight / 2 - this.height + Dimensions.ITEM_BUBBLE_Y_INDENT + this.item.minYCoord * scaleCoeff;

    if(defaultPositionTop < 0) {
      return 'top';
    }

    return 'bottom';
  }

  constructor(
    item: IItemModel | ITargetItemModel,

    legalForm: string,
    address: string,
    regDate: string,

    capCur: string,
    capSum: string,
    capFullyPaid: boolean,
  ) {
    super();

    this.item = item;

    this.legalForm = legalForm || '';
    this.address = address || '';
    this.regDate = regDate || '';

    this.capCur = capCur || '';
    this.capSum = capSum || '';
    this.capFullyPaid = capFullyPaid || false;

    const t = item.store.rootStore.i18nStore.t;

    // 20 - 2*10 padding
    this.width = Dimensions.BUBBLE_RIGHT_LEFT_PADDING + 20 + Math.ceil(Math.max(
      legalForm ? ElementHelpers.getTextWidth(`${t('bubble:legalForm')}: ${legalForm}`, `12px Arial`) : 0,
      address ? ElementHelpers.getTextWidth(`${t('bubble:address')}: ${address}`, `12px Arial`) : 0,
      regDate ? ElementHelpers.getTextWidth(`${t('bubble:regDate')}: ${regDate}`, `12px Arial`) : 0,
      (capSum && capCur && capFullyPaid)
        ? ElementHelpers.getTextWidth(
        `${t('bubble:shareCapital')}: ${capCur} ${capSum}, ${capFullyPaid ? t('bubble:fullyPaid') : ''}`,
        `12px Arial`) : 0,
    ));

    // 18 - подсмотренная высота строки
    // 20 - 2*10 padding
    this.height = Dimensions.BUBBLE_TOP_BOTTOM_PADDING + 20 + 18 * [
      legalForm,
      address,
      regDate,
      (capSum && capCur && capFullyPaid)
    ].filter((item) => !!item).length;
  }
}