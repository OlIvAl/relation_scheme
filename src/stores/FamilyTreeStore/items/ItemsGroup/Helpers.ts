import {IItemsRoleGroup, IResponseItemContent, IRoleModel} from '../../interfaces';

export default
class ItemsGroupHelpers {
  // ToDo: make generic
  static separateItemsByRoles(
    responseItems: IResponseItemContent[],
    uniqueRoles: IRoleModel[]
  ): IResponseItemContent[][] {
    return uniqueRoles.map(({roleId}: IRoleModel): IResponseItemContent[] => (
        responseItems.filter(({roles}: IResponseItemContent): boolean => (
            Number(roleId) === Math.min(...Object.keys(roles).map((key) => Number(key)))
          ))
      ))
      .filter((arr): boolean => !!arr.length);
  }

  static getRoleGroupDistanceArrFromItemsGroupBottom(
    itemsRoleGroups: IItemsRoleGroup[]
  ): number[] {
    return itemsRoleGroups.reduce((
      distanceArr: number[],
      _,
      index: number,
      arr: IItemsRoleGroup[]
    ): number[] => {
      if (index === 0) {
        return distanceArr.concat(0);
      } else {
        return distanceArr
          .concat(distanceArr[distanceArr.length - 1] + arr[index - 1].height);
      }
    }, []);
  }

  /*static getDistanceFromRolesGroup():  {

  }
  static getDistanceFromTargetCenter():  {

  }
  static getMiddleDistanceBetweenElements():  {

  }
  static getMinXCoord():  {

  }
  static getMaxXCoord():  {

  }
  static getHeight():  {

  }
  static getItems():  {

  }
  static getArrowsByRoles():  {

  }*/
}