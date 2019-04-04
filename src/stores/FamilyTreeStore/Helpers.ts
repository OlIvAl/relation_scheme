import {IItemsGroup, IResponseItemContent, IResponseRoleContent, IRolesGroup, ITargetItemModel} from './interfaces';

export default class FamilyTreeHelpers {
  static getUniqueRolesFromElements(
    responseItemContentArr: IResponseItemContent[],
    responseRoleContentArr: IResponseRoleContent[]
  ): IResponseRoleContent[] {
    return responseItemContentArr
      // извлекаем массивы roleId из каждого элемента
      .map(({roles}: IResponseItemContent): number[] =>
        // @ts-ignore
        Object.keys(roles).map((role) => Number(role))
      )
      // массивы roleId объединяются в единый массив
      .reduce<number[]>((
          accumulator: number[],
          roles: number[]
        ): number[] => ([
          ...accumulator,
          ...roles
        ]), []
      )
      // фильтруются уникальные id
      .filter((
        value: number,
        index: number,
        self: Array<number>
      ): boolean => (
        self.indexOf(value) === index
      ))
      // уникальные id мапятся на полученные с сервера объекты ролей
      .map((roleId: number): IResponseRoleContent => (
        responseRoleContentArr.find(({role}: IResponseRoleContent): boolean =>
          (Number(role) == Number(roleId))
        ) as IResponseRoleContent
      ))
      .filter((item) => !!item)
      // сортировка по возрастанию
      .sort((
        a: IResponseRoleContent,
        b: IResponseRoleContent
      ): number => (Number(a.role) - Number(b.role)));
  }

  static getSvgWidth(
    targetItem: ITargetItemModel,
    childRolesGroup: IRolesGroup,
    childItemsGroup: IItemsGroup,
    parentRolesGroup: IRolesGroup,
    parentItemsGroup: IItemsGroup,
  ): number {
    return Math.max(
      Math.abs(
        Math.min(
          targetItem.minXCoord,
          childRolesGroup.minXCoord,
          childItemsGroup.minXCoord,
          parentRolesGroup.minXCoord,
          parentItemsGroup.minXCoord
        )
      ),
      Math.max(
        targetItem.maxXCoord,
        childRolesGroup.maxXCoord,
        childItemsGroup.maxXCoord,
        parentRolesGroup.maxXCoord,
        parentItemsGroup.maxXCoord
      )
    ) * 2;
  }

  static getSvgHeight(
    targetItem: ITargetItemModel,
    childRolesGroup: IRolesGroup,
    childItemsGroup: IItemsGroup,
    parentRolesGroup: IRolesGroup,
    parentItemsGroup: IItemsGroup,
  ): number {
    return Math.max(
      targetItem.height / 2 +
        childRolesGroup.height +
        childItemsGroup.height,
      targetItem.height / 2 +
        parentRolesGroup.height +
        parentItemsGroup.height
    ) * 2;
  }
}