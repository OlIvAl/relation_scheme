import {action, observable} from 'mobx';
import {IArrowBubble, IFamilyTreeStore, IItemBubble, IViewPortModel} from '../interfaces';
import Dimensions from '../Dimensions';

/**
* Класс, представляющий модель видимой области дерева
*/
export default
class ViewPortModel implements IViewPortModel {
  /**
  * Store instance
  */
  store: IFamilyTreeStore;
  /**
  * Ширина видимой области дерева
  */
  @observable viewPortWidth: number = Dimensions.VIEWPORT_WIDTH;
  /**
  * Высота видимой области дерева
  */
  @observable viewPortHeight: number = Dimensions.VIEWPORT_HEIGHT;

  /**
   * Отступ от верхней границы
   */
  topOffset: number = 0;

  /**
   * Отступ от левой границы
   */
  leftOffset: number = 0;

  /**
   * Ссылка на объект бабла с дополнительной информацией по юр лицу
   */
  @observable itemBubble: IItemBubble | null = null;

  /**
   * Ссылка на объект бабла с дополнительной информацией по юр лицу
   */
  @observable arrowBubble: IArrowBubble | null = null;

  /**
  * Создает объект видимой области дерева
  * @param {IFamilyTreeStore} store - store instance
  */
  constructor(store: IFamilyTreeStore) {
    this.store = store;
  }

  /**
  * меняет ширину видимой области дерева
  * @param newViewPortWidth - новое значение ширины видимой области дерева
  * @returns {void}
  * @action
  */
  @action.bound
  changeViewPortWidth(newViewPortWidth: number): void {
    this.viewPortWidth = newViewPortWidth;
  }
  /**
  * меняет высоту видимой области дерева
  * @param newViewPortHeight - новое значение высоты видимой области дерева
  * @returns {void}
  * @action
  */
  @action.bound
  changeViewPortHeight(newViewPortHeight: number): void {
    this.viewPortHeight = newViewPortHeight;
  }

  /**
   * Выставляет отступы viewport
   * @param top - отступ от верхней границы
   * @param left - отступ от левой границы
   * @returns {void}
   * @action
   */
  @action.bound
  setViewPortOffset(top: number, left: number): void {
    this.topOffset = top;
    this.leftOffset = left;
  }
}