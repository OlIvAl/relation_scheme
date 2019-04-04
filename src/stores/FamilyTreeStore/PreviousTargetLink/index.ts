import {IFamilyTreeStore, IPreviousTargetLink, IStack, ITargetItemModel} from '../interfaces';
import Stack from './Stack';
import {action, observable, computed} from 'mobx';

export default
class PreviousTargetLink implements IPreviousTargetLink {
  store: IFamilyTreeStore;

  @observable previousTargetStack: IStack<ITargetItemModel>;

  @computed get size(): number {
    return this.previousTargetStack.size();
  }

  @computed get title(): string {
    return this.previousTargetStack.peek().title;
  }

  constructor(store: IFamilyTreeStore) {
    this.store = store;

    this.previousTargetStack = new Stack<ITargetItemModel>();
  }

  @action.bound
  setPreviousTargetItem(newPreviousTargetItem: ITargetItemModel): void {
    this.previousTargetStack.push(newPreviousTargetItem);
  }

  @action.bound
  initPreviousTarget(): void {
    if(this.previousTargetStack.size()) {
      const {
        id,
        type
      } = this.previousTargetStack.pop();

      this.store.init(id, type);
    }
  }
}