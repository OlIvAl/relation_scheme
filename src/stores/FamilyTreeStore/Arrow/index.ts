import {IArrow} from '../interfaces';

export default
abstract class Arrow implements IArrow {
  abstract get d(): string;
  readonly roleId: number;

  protected constructor(roleId: number) {
    this.roleId = Number(roleId);
  }
}