import {IItemModel, IRoleModel} from '../../interfaces';
import Dimensions from '../../Dimensions';

export default
class RolesGroupHelpers {
  static getCentralYArrForRoles(
    roles: IRoleModel[],
    distanceFromTargetCenter: number,
    signY: number
  ): number[] {
    return roles.map(({height}: IRoleModel): number => (
      signY * (distanceFromTargetCenter + height / 2)
    ));
  }

  static getCentralXArrForRoles(roles: IRoleModel[]): number[] {
    function getShift(
      rolesArr: IRoleModel[],
      sideRolesArr: IRoleModel[],
      arrSideLength: number,
      indentBetweenElements: number
    ): number {
      if (rolesArr.length === 0) {
        return 0;
      }

      return (rolesArr.length % 2)
        ? (rolesArr[arrSideLength].width / 2 +
          indentBetweenElements +
          sideRolesArr[0].width / 2)
        : (indentBetweenElements / 2 +
          sideRolesArr[0].width / 2);
    }

    // ToDo: duplicate
    function getSideXArr(
      sideRolesArr: IRoleModel[],
      shift: number,
      signX: number,
      indentBetweenElements: number
    ): number[] {
      return sideRolesArr.reduce<number[]>(
        (
          accum: number[],
          {width}: IRoleModel,
          index: number,
          arr: IRoleModel[]
        ): number[] => {
          if (!index) {
            return accum.concat(signX * shift);
          } else {
            return accum.concat(
              accum[index - 1] +
              (arr[index - 1].width / 2 + width / 2 + indentBetweenElements) * signX);
          }
        },
        []
      );
    }

    if (roles.length === 1) {
      return [0];
    }

    const sideLength: number = Math.floor(roles.length / 2);

    const leftSideRoles: IRoleModel[] = roles.slice(0, sideLength).reverse();
    const rightSideRoles: IRoleModel[] = roles.slice(-sideLength);

    const leftSideShift: number = getShift(
      roles,
      leftSideRoles,
      sideLength,
      Dimensions.INDENTS_BETWEEN_ELEMENTS
    );

    const rightSideShift: number = getShift(
      roles,
      rightSideRoles,
      sideLength,
      Dimensions.INDENTS_BETWEEN_ELEMENTS
    );

    const leftSideXArr: number[] = getSideXArr(
      leftSideRoles,
      leftSideShift,
      -1,
      Dimensions.INDENTS_BETWEEN_ELEMENTS
    ).slice().reverse();
    const rightSideXArr: number[] = getSideXArr(
      rightSideRoles,
      rightSideShift,
      1,
      Dimensions.INDENTS_BETWEEN_ELEMENTS
    );

    return (roles.length % 2)
      ? [
        ...leftSideXArr,
        0,
        ...rightSideXArr
      ]
      : [
        ...leftSideXArr,
        ...rightSideXArr
      ];
  }
}