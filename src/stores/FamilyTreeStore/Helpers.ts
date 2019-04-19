import {IItemsGroup, IResponseItemContent, IResponseRoleContent, IRolesGroup, ITargetItemModel} from './interfaces';
import Dimensions from './Dimensions';

export default class FamilyTreeHelpers {
  static getUniqueRolesFromElements(
    responseItemContentArr: IResponseItemContent[],
    responseRoleContentArr: IResponseRoleContent[]
  ): IResponseRoleContent[] {
    return responseItemContentArr
      // извлекаем массивы roleId из каждого элемента
      .map(({roles}: IResponseItemContent): number[] =>
        Object.keys(roles).map((role): number => Number(role))
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
        self: number[]
      ): boolean => (
        self.indexOf(value) === index
      ))
      // уникальные id мапятся на полученные с сервера объекты ролей
      .map((roleId: number): IResponseRoleContent => (
        responseRoleContentArr.find(({role}: IResponseRoleContent): boolean =>
          (Number(role) == Number(roleId))
        ) as IResponseRoleContent
      ))
      .filter((item): boolean => !!item)
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

  static getParentHalfHeight(
    targetItem: ITargetItemModel,
    parentRolesGroup: IRolesGroup,
    parentItemsGroup: IItemsGroup
  ): number {
    return targetItem.height / 2
      + ((parentRolesGroup.height + parentItemsGroup.height)
        || Math.ceil(Dimensions.TARGET_ELEMENT_STROKE_WIDTH / 2));
  }

  static getChildHalfHeight(
    targetItem: ITargetItemModel,
    childRolesGroup: IRolesGroup,
    childItemsGroup: IItemsGroup
  ): number {
    return targetItem.height / 2
      + ((childRolesGroup.height + childItemsGroup.height)
        || Math.ceil(Dimensions.TARGET_ELEMENT_STROKE_WIDTH / 2));
  }
}