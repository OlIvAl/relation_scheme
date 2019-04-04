import Bubble from '../Bubble';
import {Currency, IArrowBubble, IItemArrow, ISvgRootModel} from '../../interfaces';
import Dimensions from '../../Dimensions';
import ElementHelpers from '../../ElementModel/Helpers';

export default
class ArrowBubble extends Bubble implements IArrowBubble {
  arrow: IItemArrow;

  partSum: number;
  partCur: Currency;
  percent: number;
  startDate: string;
  quitDate: string;
  position: string;

  hoverX: number;
  hoverY: number;

  width: number;
  height: number;

  get positionTop(): number {
    const {
      topOffset
    } = this.arrow.item.store.viewPort;

    const defaultPositionTop: number = this.hoverY - this.height - topOffset - Dimensions.ARROW_BUBBLE_Y_INDENT;

    if(defaultPositionTop < 0) {
      return this.hoverY - topOffset + Dimensions.ARROW_BUBBLE_Y_INDENT;
    }

    return defaultPositionTop;
  }

  get positionLeft(): number {
    const {
      leftOffset
    } = this.arrow.item.store.viewPort;

    const defaultPositionLeft: number = this.hoverX - leftOffset + Dimensions.ARROW_BUBBLE_X_INDENT;

    if(defaultPositionLeft + this.width > this.arrow.item.store.viewPort.viewPortWidth) {
      return  this.hoverX - this.width - leftOffset - Dimensions.ARROW_BUBBLE_X_INDENT;
    }

    return defaultPositionLeft;
  }

  get horizontalTailPosition(): 'left' | 'right' {
    const {
      leftOffset
    } = this.arrow.item.store.viewPort;

    const defaultPositionLeft: number = this.hoverX - leftOffset + Dimensions.ARROW_BUBBLE_X_INDENT;

    if(defaultPositionLeft + this.width > this.arrow.item.store.viewPort.viewPortWidth) {
      return 'right';
    }

    return 'left';
  }

  get verticalTailPosition(): 'top' | 'bottom' {
    const {
      topOffset
    } = this.arrow.item.store.viewPort;

    const defaultPositionTop: number = this.hoverY - this.height - topOffset + Dimensions.ARROW_BUBBLE_Y_INDENT;

    if(defaultPositionTop < 0) {
      return 'top';
    }

    return 'bottom';
  }

  constructor(
    arrow: IItemArrow,

    hoverX: number = 0,
    hoverY: number = 0,

    partSum: number = 0,
    partCur: Currency = 'EUR',
    percent: number = 0,
    startDate: string = '',
    quitDate: string = '',
    position: string = ''
  ) {
    super();

    this.arrow = arrow;

    this.hoverX = hoverX;
    this.hoverY = hoverY;

    this.partSum = partSum;
    this.partCur = partCur;
    this.percent = percent;
    this.startDate = startDate;
    this.quitDate = quitDate;
    this.position = position;

    const t = arrow.item.store.rootStore.i18nStore.t;

    let string: string;

    if(arrow.roleId === 1) {
      string = `${partCur ? `${partCur} ` : ''}`
        + `${partSum ? `${partSum.toFixed(2)} ` : ''}`
        + `${percent ? `(${percent.toFixed(2)}) ` : ''}`
        + `${startDate ? `c ${new Date(startDate).toLocaleDateString('ru')} ` : ''}`
        + `${quitDate ? `по ${new Date(quitDate).toLocaleDateString('ru')}` : ''}`;
    } else {
      string = `${position ? `${position} ` : ''}`
        + `${startDate ? `${t('bubble:from')} ${new Date(startDate).toLocaleDateString('ru')} ` : ''}`
        + `${quitDate ? `${t('bubble:until')} ${new Date(quitDate).toLocaleDateString('ru')}` : ''}`;
    }

    // 20 - 2*10 padding
    this.width = Dimensions.BUBBLE_RIGHT_LEFT_PADDING + 20 + ElementHelpers.getTextWidth(string, `12px Arial`);

    // 18 - подсмотренная высота строки
    // 20 - 2*10 padding
    this.height = Dimensions.BUBBLE_TOP_BOTTOM_PADDING + 20 + 18;
  }
}