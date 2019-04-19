import {action, observable, reaction, computed} from 'mobx';
import {IFamilyTreeStore, ISvgRootModel} from '../interfaces';
import Dimensions from '../Dimensions';

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
   * Высота родительской (верхней) половины
   * @observable
   */
  @observable parentHalfHeight: number = 0;
  /**
   * Высота дочерней (нижней) половины
   * @observable
   */
  @observable childHalfHeight: number = 0;
  /**
   * Длина холста схемы дерева
   * @computed
   */
  @computed get svgHeight(): number {
    return this.parentHalfHeight + this.childHalfHeight;
  }

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
  maxRangeValue: number = 1;

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
      (): number => this.svgWidth,
      (svgWidth): void => {
        const newSvgPositionLeft = (store.viewPort.viewPortWidth - svgWidth) / 2;
        this.setSvgPositionLeft(newSvgPositionLeft);
      },
      {
        name: 'changeSvgWidth reaction'
      }
    );

    reaction(
      (): number => this.svgHeight,
      (svgHeight): void => {
        let newSvgPositionTop: number;

        if(svgHeight < Dimensions.VIEWPORT_HEIGHT) {
          newSvgPositionTop = (store.viewPort.viewPortHeight - svgHeight) / 2;
        } else if((this.parentHalfHeight + Dimensions.TARGET_ELEMENT_HEIGHT / 2 + Dimensions.INDENTS_BETWEEN_LEVELS) < Dimensions.VIEWPORT_HEIGHT / 2) {
          newSvgPositionTop = Dimensions.INDENTS_BETWEEN_LEVELS;
        } else if((this.childHalfHeight + Dimensions.TARGET_ELEMENT_HEIGHT / 2 + Dimensions.INDENTS_BETWEEN_LEVELS) < Dimensions.VIEWPORT_HEIGHT / 2) {
          newSvgPositionTop = Dimensions.VIEWPORT_HEIGHT - (this.parentHalfHeight + this.childHalfHeight + Dimensions.INDENTS_BETWEEN_LEVELS);
        } else {
          // duplicate
          newSvgPositionTop = (store.viewPort.viewPortHeight - svgHeight) / 2;
        }

        this.setSvgPositionTop(newSvgPositionTop);
      },
      {
        name: 'changeSvgHeight reaction'
      }
    );
  }

  /**
   * устанавливает верхнюю позицию холста дерева, относительно видимой области
   * @param newSvgPositionTop - новое значение верхней позиции холста дерева
   * @returns {void}
   * @action
   */
  @action.bound
  setSvgPositionTop(newSvgPositionTop: number): void {
    this.svgPositionTop = newSvgPositionTop;
  }

  /**
   * устанавливает левую позицию холста дерева, относительно видимой области
   * @param newSvgPositionLeft - новое значение левой позиции холста дерева
   * @returns {void}
   * @action
   */
  @action.bound
  setSvgPositionLeft(newSvgPositionLeft: number): void {
    this.svgPositionLeft = newSvgPositionLeft;
  }

  /**
   * меняет верхнюю позицию холста дерева, относительно видимой области на def величину
   * @param defSvgPositionTop - def величина, на которую будет изменена верхняя позиция
   */
  @action.bound
  changeSvgPositionTop(defSvgPositionTop: number): void {
    this.svgPositionTop = this.svgPositionTop - defSvgPositionTop;
  }

  /**
   * меняет левую позицию холста дерева, относительно видимой области на def величину
   * @param defSvgPositionLeft - def величина, на которую будет изменена левая позиция
   */
  @action.bound
  changeSvgPositionLeft(defSvgPositionLeft: number): void {
    this.svgPositionLeft = this.svgPositionLeft - defSvgPositionLeft;
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
   * меняет высоту родительской (верхней) половины
   * @param newParentHalfHeight - новое значение высоты родительской (верхней) половины дерева
   * @returns {void}
   * @action
   */
  @action.bound
  changeParentHalfHeight(newParentHalfHeight: number): void {
    this.parentHalfHeight = newParentHalfHeight;
  }

  /**
   * меняет высоту дочерней (нижней) половины
   * @param newChildHalfHeight - новое значение высоты дочерней (нижней) половины дерева
   * @returns {void}
   * @action
   */
  @action.bound
  changeChildHalfHeight(newChildHalfHeight: number): void {
    this.childHalfHeight = newChildHalfHeight;
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