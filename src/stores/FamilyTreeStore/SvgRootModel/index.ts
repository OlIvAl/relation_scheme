import {action, observable, reaction} from 'mobx';
import {IFamilyTreeStore, ISvgRootModel} from '../interfaces';

/**
 * Класс, представляющий холст схемы дерева
 */

export default
class SvgRootModel implements ISvgRootModel {
  /**
   * Store instance
   */
  store: IFamilyTreeStore;

  /**
   * Ширина холста схемы дерева
   * @observable
   */
  @observable svgWidth: number = 0;
  /**
   * Длина холста схемы дерева
   * @observable
   */
  @observable svgHeight: number = 0;

  /**
   * Верхняя позиция, относительно видимой области
   * @observable
   */
  @observable svgPositionTop: number = 0;
  /**
   * Левая позиция, относительно видимой области
   * @observable
   */
  @observable svgPositionLeft: number = 0;

  /**
   * Коэффициент масштабирования схемы
   * @observable
   */
  @observable scaleCoeff: number = 1;

  /**
   * Максимальное значение масштабирования
   */
  maxRangeValue: number  = 1;

  /**
   * Минимальное значение масштабирования
   */
  get minRangeValue(): number {
    if(this.svgHeight > this.store.viewPort.viewPortHeight) {
      return Math.min(
        this.store.viewPort.viewPortHeight / this.svgHeight,
        this.store.viewPort.viewPortWidth / this.svgWidth
      );
    } else {
      return 1;
    }
  }

  /**
   * Создает холста схемы дерева
   * @param {IFamilyTreeStore} store - store instance
   */
  constructor(store: IFamilyTreeStore) {
    this.store = store;

    reaction(
      () => this.svgWidth,
      (svgWidth) => {
        const newSvgPositionLeft = (store.viewPort.viewPortWidth - svgWidth) / 2;
        this.changeSvgPositionLeft(newSvgPositionLeft);
      },
      {
        name: 'changeSvgWidth reaction'
      }
    );

    reaction(
      () => this.svgHeight,
      (svgHeight) => {
        const newSvgPositionTop = (store.viewPort.viewPortHeight - svgHeight) / 2;
        this.changeSvgPositionTop(newSvgPositionTop);
      },
      {
        name: 'changeSvgHeight reaction'
      }
    );
  }

  /**
   * меняет верхнюю позицию холста дерева, относительно видимой области
   * @param newSvgPositionTop - новое значение верхней позиции холста дерева
   * @returns {void}
   * @action
   */
  @action.bound
  changeSvgPositionTop(newSvgPositionTop: number): void {
    this.svgPositionTop = newSvgPositionTop;
  }

  /**
   * меняет левую позицию холста дерева, относительно видимой области
   * @param newSvgPositionLeft - новое значение левой позиции холста дерева
   * @returns {void}
   * @action
   */
  @action.bound
  changeSvgPositionLeft(newSvgPositionLeft: number): void {
    this.svgPositionLeft = newSvgPositionLeft;
  }

  /**
   * меняет ширину холста дерева
   * @param newSvgWidth - новое значение ширины холста дерева
   * @returns {void}
   * @action
   */
  @action.bound
  changeSvgWidth(newSvgWidth: number): void {
    this.svgWidth = newSvgWidth;
  }

  /**
   * меняет высоту холста дерева
   * @param newSvgHeight - новое значение высоты холста дерева
   * @returns {void}
   * @action
   */
  @action.bound
  changeSvgHeight(newSvgHeight: number): void {
    this.svgHeight = newSvgHeight;
  }

  /**
   * меняет коэффициент масштабирования
   * @param newScaleCoeff
   * @returns {void}
   * @action
   */
  @action.bound
  setScaleCoeff(newScaleCoeff: number): void {
    this.scaleCoeff = newScaleCoeff;
  }
}