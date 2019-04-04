import {IItemsLevelGroup} from '../../interfaces';
import {Relations} from '../../../../enums';
import Dimensions from '../../Dimensions';

export default
class ItemsRoleGroupHelpers {
  static separationItemsByLevels<T>(
    elements: T[],
    levelSize: number
  ): T[][] {
    return elements.reduce((
      accumulator: Array<Array<T>>,
      element: T
    ): Array<Array<T>> => {
      const length: number = accumulator.length;

      if (accumulator[length - 1].length < levelSize) {
        const lastLevel: Array<T> = accumulator[length - 1];

        accumulator[length - 1] = [...lastLevel, element];

        return accumulator;
      } else {
        accumulator[length] = [element];

        return accumulator;
      }
    },                     [[]]);
  }

  // ToDo: duplicate
  static getLevelDistanceArrFromRoleGroupBottom(
    itemsGroupLevels: IItemsLevelGroup[]
  ): number[] {
    return itemsGroupLevels.reduce((
      distanceArr: number[],
      _,
      index: number,
      arr: IItemsLevelGroup[]
    ): number[] => {
      if (index === 0) {
        return distanceArr.concat(0);
      } else {
        return distanceArr
          .concat(distanceArr[distanceArr.length - 1] + arr[index - 1].height);
      }
    }, []);
  }

  static getLeftShift(roleIndex: number): number {
    return Dimensions.INDENTS_BETWEEN_ELEMENTS / 2 * roleIndex;
  }

  static getHeight(itemsGroupLevels: IItemsLevelGroup[]): number {
    return itemsGroupLevels.reduce<number>(
        (sum: number, itemsLevelGroup: IItemsLevelGroup): number =>
          (sum + itemsLevelGroup.height),
        0
      );
  }

  static getMinXCoord(itemsGroupLevels: IItemsLevelGroup[]): number {
    const levelMinXCoordArr: number[] = itemsGroupLevels
      .map(({minXCoord}: IItemsLevelGroup): number => (minXCoord));

    return Math.min(...levelMinXCoordArr);
  }

  static getMaxXCoord(itemsGroupLevels: IItemsLevelGroup[]): number {
    const levelMaxXCoordArr: number[] = itemsGroupLevels
      .map(({maxXCoord}: IItemsLevelGroup): number => (maxXCoord));

    return Math.max(...levelMaxXCoordArr);
  }
}