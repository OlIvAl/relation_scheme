import {IStack} from '../interfaces';

export default
class Stack<T> implements IStack<T> {
  private _items: T[] = [];

  constructor(items: T[] = []) {
    if(items.length) {
      this._items = items;
    }
  }

  push(...items: T[]): T[] {
    this._items = [
      ...this._items,
      ...items
    ];

    return this._items;
  }

  pop(): T {
    const returnedItem: T = this._items[this._items.length - 1];
    this._items = this._items.slice(0, -1);

    return returnedItem;
  }

  size(): number {
    return this._items.length;
  }

  peek(): T {
    return this._items[this._items.length - 1];
  }

  isEmpty(): boolean {
    return !this._items.length;
  }

  clear(): void {
    this._items = [];
  }

  toArray(): T[] {
    return this._items;
  }
}