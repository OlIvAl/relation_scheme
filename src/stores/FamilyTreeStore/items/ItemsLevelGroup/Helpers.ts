import {IItemModel} from '../../interfaces';
import Dimensions from '../../Dimensions';

export default
class ItemsLevelGroupHelpers {
  static getDistanceFromNextLevel(items: IItemModel[]): number {
    return (
      Math.max(
        ...items.map(({roles}: IItemModel): number => roles.length)
      ) + 1
    ) * Dimensions.INDENTS_BETWEEN_LEVELS / 2;
  }

  static getCentralXArrForItems(
    items: IItemModel[],
    middleDistanceBetweenElements: number,
    leftShift: number
  ): number[] {
    // ToDo: duplicate
    function getSideXArr(
      sideItemsArr: IItemModel[],
      shift: number,
      signX: number,
      indentBetweenElements: number
    ): number[] {
      return sideItemsArr.reduce<number[]>(
        (
          accum: number[],
          {width}: IItemModel,
          index: number,
          arr: IItemModel[]
        ): number[] => {
          if (!index) {
            return accum.concat(signX * (shift + width / 2));
          } else {
            return accum.concat(
              accum[index - 1] +
                (arr[index - 1].width / 2 + width / 2 + indentBetweenElements) * signX);
          }
        },
        []
      );
    }

    const leftSideLength: number = Math.ceil(items.length / 2);
    const rightSideLength: number = Math.floor(items.length / 2);

    const leftSideItems: IItemModel[] = items.slice(0, leftSideLength).reverse();
    const rightSideItems: IItemModel[] = items.slice(-rightSideLength);

    const leftSideShift: number = middleDistanceBetweenElements / 2 - leftShift;
    const rightSideShift: number = middleDistanceBetweenElements / 2;

    const leftSideXArr: number[] = getSideXArr(
      leftSideItems,
      leftSideShift,
      -1,
      Dimensions.INDENTS_BETWEEN_ELEMENTS
    ).slice().reverse();
    const rightSideXArr: number[] = getSideXArr(
      rightSideItems,
      rightSideShift,
      1,
      Dimensions.INDENTS_BETWEEN_ELEMENTS
    );

    return [
      ...leftSideXArr,
      ...rightSideXArr
    ];
  }

  static getMinXCoord(firstItem: IItemModel): number {
    return firstItem.centralX - firstItem.width / 2;
  }

  static getMaxXCoord(lastItem: IItemModel): number {
    return lastItem.centralX + lastItem.width / 2;
  }

  static getHeight(distanceFromNextLevel: number): number {
    return Dimensions.ELEMENT_HEIGHT + distanceFromNextLevel;
  }
}