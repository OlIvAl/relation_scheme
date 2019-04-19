import I18nStore from './stores/I18nStore';
import {IFamilyTreeStore, ISvgRootModel, IViewPortModel} from './stores/FamilyTreeStore/interfaces';
import {II18nStore} from './stores/I18nStore/interfaces';

export interface IRootStore {
  i18nStore: I18nStore;
  familyTreeStore: IFamilyTreeStore;
}

export interface IFamilyTreeData extends Pick<IFamilyTreeStore, 'arrowBubble' | 'itemBubble' | 'targetItem' | 'childRolesGroup' | 'parentRolesGroup' | 'childItemsGroup' | 'parentItemsGroup' | 'previousTargetLink'> {}

export interface IViewPortData extends Pick<IViewPortModel, 'changeViewPortWidth' | 'changeViewPortHeight' | 'setViewPortOffset' | 'viewPortWidth' | 'viewPortHeight'> {}

export interface ISvgRootData extends Pick<ISvgRootModel, 'svgWidth' | 'svgHeight' | 'parentHalfHeight' | 'childHalfHeight' | 'svgPositionTop' | 'svgPositionLeft' | 'setSvgPositionTop' | 'setSvgPositionLeft' | 'changeSvgPositionTop' | 'changeSvgPositionLeft' | 'scaleCoeff'> {}

export interface IRangeData extends Pick<ISvgRootModel, 'scaleCoeff' | 'minRangeValue' | 'maxRangeValue' | 'setScaleCoeff'> {}

export interface II18NextData extends Pick<II18nStore, 't'> {}