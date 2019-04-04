import {Relations, Roles, Types} from '../../enums';
import {IRootStore} from '../../interfaces';

type Currency = 'EUR';

export interface Theme {
  roles: {
    [Role: string]: string;
  };
  types: {
    [Type: string]: string;
  };
}

export interface ITooltipInfo {
  readonly legalForm: string;
  readonly address: string;
  readonly regDate: string;
  readonly capCur: Currency;
  readonly capSum: string;
  readonly capFullyPaid: boolean;
}

export interface ElemInfo {
  readonly id: number;
  readonly regNo: string;
  readonly title: string;

  readonly favorites: StringBoolean;
  readonly url_s: string;
  readonly type: Types;
}

export interface IRoleInfo {
  readonly startDate: string;
  readonly holding: StringBoolean;
  readonly partCur?: Currency;
  readonly partSum?: string;
  readonly percent?: string;
  readonly position?: string;
}

export interface IElemContent extends ITooltipInfo, ElemInfo {}

export interface ITargetElemContent extends IElemContent {}

export interface IResponseRoleContent {
  readonly role: number;
  readonly title: string;
}

export interface IResponseItemContent extends IElemContent {
  readonly tooltipInfo: Partial<TooltipInfo>;
  readonly roles: {
    [key: number]: IRoleInfo
  };
}

export interface IResponseResult {
  readonly lang: string;
  readonly scheme: {
    target: ITargetElemContent;
    parents: IResponseItemContent[];
    children: IResponseItemContent[];
  };
  readonly roles: IResponseRoleContent[];
}

export interface IFamilyTreeStore {
  rootStore: IRootStore;

  viewPort: IViewPortModel;
  svgRoot: ISvgRootModel;

  itemBubble: IItemBubble | null;
  arrowBubble: IArrowBubble | null;

  targetItem: ITargetItemModel | null;

  childRolesGroup: IRolesGroup | null;
  childItemsGroup: IItemsGroup | null;

  parentRolesGroup: IRolesGroup | null;
  parentItemsGroup: IItemsGroup | null;

  previousTargetLink: IPreviousTargetLink;

  init: (id: number, type: number) => void;
}

export interface IViewPortModel {
  readonly store: IFamilyTreeStore;

  viewPortWidth: number;
  viewPortHeight: number;

  topOffset: number;
  leftOffset: number;

  changeViewPortWidth: (newViewPortWidth: number) => void;
  changeViewPortHeight: (newViewPortHeight: number) => void;

  setViewPortOffset: (top: number, left: number) => void;
}

export interface ISvgRootModel {
  readonly store: IFamilyTreeStore;

  svgWidth: number;
  svgHeight: number;
  svgPositionTop: number;
  svgPositionLeft: number;

  changeSvgPositionTop: (newSvgPositionTop: number) => void;
  changeSvgPositionLeft: (newSvgPositionLeft: number) => void;
  changeSvgWidth: (newSvgWidth: number) => void;
  changeSvgHeight: (newSvgHeight: number) => void;

  maxRangeValue: number;
  minRangeValue: number;
  scaleCoeff: number;
  setScaleCoeff: (newScaleCoeff: number) => void;
}

export interface IElementModel {
  readonly title: string;

  width: number;
  height: number;

  // Arrow In
  // Arrow Out

  centralX: number;
  centralY: number;
  x: number;
  y: number;

  setCentralX: (newCentralX: number) => void;
  setCentralY: (newCentralY: number) => void;
}

export interface IRoleModel extends IElementModel {
  readonly rolesGroup: IRolesGroup;

  arrow: IRoleArrow;

  readonly roleId: number;
  readonly roleIndex: number;

  readonly relation: Relations;
}

export interface ITargetItemModel extends IElementModel {
  store: IFamilyTreeStore;

  id: number;
  regNo: string;

  type: Types;

  hover: boolean;

  itemBubbleInfo: IItemExtraInfo | null;

  minXCoord: number;
  maxXCoord: number;

  minYCoord: number;
  maxYCoord: number;

  setItemBubble: () => void;
  unSetItemBubble: () => void;

  setHover: () => void;
  setUnHover: () => void;
}

export interface IItemModel extends ITargetItemModel {
  readonly itemsLevelGroup: IItemsLevelGroup;
  readonly itemsRoleGroup: IItemsRoleGroup;
  readonly itemsGroup: IItemsGroup;

  readonly roles: IRoleModel[];

  arrows: IItemArrow[];

  indexInLevel: number;

  getNewFT: () => void;
}

export interface IItemsLevelGroup {
  readonly  itemsRoleGroup: IItemsRoleGroup;

  items: IItemModel[];

  distanceFromNextLevel: number; // отступ
  distanceFromRoleGroupBottom: number; // отступ
  levelIndexInGroup: number;

  // width: number;
  minXCoord: number;
  maxXCoord: number;

  height: number; // елементы с отступом

  setDistanceFromRoleGroupBottom: (newDistanceFromRoleGroupBottom: number) => void;
}

export interface IItemsRoleGroup {
  readonly itemsGroup: IItemsGroup;

  itemsGroupLevels: IItemsLevelGroup[];

  distanceFromItemsGroupBottom: number; // 0

  roleItem: IRoleModel;

  leftShift: number;

  // width: number;
  minXCoord: number;
  maxXCoord: number;

  height: number; // уровни с отступом

  setDistanceFromItemsGroupBottom: (newDistanceFromItemsGroupBottom: number) => void;
}

export interface IRolesGroup {
  readonly store: IFamilyTreeStore;

  roles: IRoleModel[];

  distanceFromTarget: number;
  distanceFromTargetCenter: number;

  minXCoord: number;
  maxXCoord: number;
  height: number; // елементы с отступом

  readonly relation: Relations;
}

export interface IItemsGroup {
  readonly store: IFamilyTreeStore;

  items: IItemModel[];
  arrowsByRoles: IItemArrow[][];

  readonly relation: Relations;

  itemsRoleGroups: IItemsRoleGroup[];

  readonly rolesGroup: IRolesGroup;

  hoverArrow: IItemArrow | null;

  setHoverArrow: (newHoverArrow: IItemArrow) => void;
  unSetHoverArrow: () => void;

  distanceFromRolesGroup: number;
  distanceFromTargetCenter: number;
  
  middleDistanceBetweenElements: number; // промежуток, где стрелки ролей

  minXCoord: number;
  maxXCoord: number;

  height: number; // сумма высот уровней
}

export interface IArrow {
  d: string;
  readonly roleId: number;
  // tooltipInfo
}

export interface IRoleArrow extends IArrow {
  readonly roleItem: IRoleModel;

  roleX: number;
  roleY : number;

  shiftBottomFromRole: number;

  shiftToMiddle: number;

  // shiftBottomToTarget: number;

  targetX: number;
  targetY: number
}

export interface IItemArrow extends IArrow {
  readonly item: IItemModel;
  readonly roleItem: IRoleModel;

  relationInfo: IRelationInfo | null;

  itemX: number;
  itemY : number;

  horizontalIndentFromItemCenter: number;
  bottomShiftFromItem: number;
  shiftToMiddle: number;
  shiftBottomFromLevel: number;
  shiftFromItemGroupBottom: number;

  roleX: number;
  roleY : number;

  strong: boolean;
  notHover: boolean;

  setArrowBubble: (e: React.MouseEvent) => void;
  unSetArrowBubble: () => void;
}

export interface IItemExtraInfo {
  legalForm: string;
  address: string;
  regDate: string;

  capCur: string;
  capSum: string;
  capFullyPaid: boolean;
}

export interface IRelationInfo {
  partSum: number;
  partCur: Currency;
  percent: number;
  startDate: string;
  quitDate: string;

  position: string; // не для участника
}

export interface IBubble {
  width: number;
  height: number;
  positionTop: number;
  positionLeft: number;
  horizontalTailPosition: 'left' | 'right';
  verticalTailPosition: 'top' | 'bottom';
}

export interface IItemBubble extends IBubble, IItemExtraInfo {
  item: IItemModel | ITargetItemModel;
}

export interface IArrowBubble extends  IBubble, IRelationInfo {
  arrow: IItemArrow;

  hoverX: number;
  hoverY: number;
}

export interface IPreviousTargetLink {
  store: IFamilyTreeStore;

  title: string;
  size: number;

  previousTargetStack: IStack<ITargetItemModel>,
  setPreviousTargetItem: (newPreviousTargetItem: ITargetItemModel) => void;
  initPreviousTarget: () => void;
}

export interface IStack<T> {
  push: (item: T) => T[];
  pop: () => T;

  size: () => number;
  peek: () => T;
  isEmpty: () => boolean;
  clear: () => void;
  toArray: () => T[];
}