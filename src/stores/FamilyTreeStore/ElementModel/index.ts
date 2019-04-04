import {action} from 'mobx';
import {IElementModel} from '../interfaces';

export default
class ElementModel implements IElementModel {
  title: string;

  height: number = 0;
  width: number = 0;

  centralX: number = 0;
  centralY: number = 0;

  get x(): number {
    return this.centralX - this.width / 2;
  }

  get y(): number {
    return this.centralY - this.height / 2;
  }

  constructor(title: string) {
    this.title = title;
  }

  @action.bound setCentralX(newCentralX: number): void {
    this.centralX = newCentralX;
  }
  @action.bound setCentralY(newCentralY: number): void {
    this.centralY = newCentralY;
  }
}