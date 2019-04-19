import * as React from 'react';
import ViewPort from './components/ViewPort';
import SVGRoot from './components/SVGRoot';
import TargetItem from './components/elements/TargetItem';
import Range from './components/Range';
import Dimensions from './stores/FamilyTreeStore/Dimensions';
import {
  IFamilyTreeData,
  II18NextData,
  IRootStore,
  IRangeData,
  ISvgRootData,
  IViewPortData
} from './interfaces';
import ArrowBubble from './components/bubbles/ArrowBubble';
import ItemBubble from './components/bubbles/ItemBubble';
import preloader from './static/preloader.svg';

import {StoreContext} from './index';
import {observer} from 'mobx-react-lite';
import useViewPortFullscreen from './components/ViewPort/hooks';
import RelationGroup from './components/RelationGroup';

/*const DefaultScreen: React.FC<{ref: React.RefObject<HTMLDivElement>}> = ({ref}): JSX.Element => (
  <ViewPort
    viewPortWidth={Dimensions.VIEWPORT_WIDTH}
    viewPortHeight={Dimensions.VIEWPORT_HEIGHT}
    ref={ref}
  >
    <img
      src={preloader}
      alt=""
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto'
      }}
    />
  </ViewPort>
);*/

interface IProps extends IFamilyTreeData, IViewPortData, ISvgRootData, IRangeData, II18NextData{}

const App: React.FC<IProps> = ({
  viewPortWidth,
  viewPortHeight,
  changeViewPortWidth,
  changeViewPortHeight,
  setViewPortOffset,

  svgWidth,
  svgHeight,
  parentHalfHeight,
  childHalfHeight,
  svgPositionTop,
  svgPositionLeft,

  changeSvgPositionTop,
  changeSvgPositionLeft,
  setScaleCoeff,
  scaleCoeff,
  minRangeValue,
  maxRangeValue,

  arrowBubble,
  itemBubble,

  targetItem,
  childRolesGroup,
  parentRolesGroup,
  childItemsGroup,
  parentItemsGroup,
  previousTargetLink,

  t
}): JSX.Element => {
  const viewPortRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

  const fullScreenChangeHandler = (viewPort: HTMLDivElement): void => {
    changeViewPortWidth(viewPort.clientWidth);
    changeViewPortHeight(viewPort.clientHeight);
  };

  const [isFullscreen, switchViewPortFullScreen] = useViewPortFullscreen(
    viewPortRef,
    setViewPortOffset,
    fullScreenChangeHandler
  );

  if(!svgWidth
    || !svgHeight
    || !parentHalfHeight
    || !childHalfHeight
    || !targetItem
    || !childRolesGroup
    || !parentRolesGroup
    || !childItemsGroup
    || !parentItemsGroup) {
    return (
      <ViewPort
        viewPortWidth={Dimensions.VIEWPORT_WIDTH}
        viewPortHeight={Dimensions.VIEWPORT_HEIGHT}
        ref={viewPortRef}
      >
        <img
          src={preloader}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto'
          }}
        />
      </ViewPort>
    )
  }

  return (
    <ViewPort
      viewPortWidth={Dimensions.VIEWPORT_WIDTH}
      viewPortHeight={Dimensions.VIEWPORT_HEIGHT}
      ref={viewPortRef}
    >
      <Range
        minRangeValue={minRangeValue}
        maxRangeValue={maxRangeValue}
        onChange={setScaleCoeff}
      />

      <button
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 1
        }}
        onClick={switchViewPortFullScreen}
      >
        Full screen {isFullscreen ? 'exit' : 'request'}
      </button>

      {previousTargetLink.size ? (
        <button
          style={{
            position: 'absolute',
            top: 20,
            left: 80,
            zIndex: 1
          }}
          onClick={previousTargetLink.initPreviousTarget}
        >
          Back to {previousTargetLink.title}
        </button>
      ) : null}

      {itemBubble
        ? (
          <ItemBubble
            itemBubbleProps={itemBubble}
            t={t}
          />
        )
        : null}

      {arrowBubble
        ? (
          <ArrowBubble
            arrowBubbleProps={arrowBubble}
            t={t}
          />
        )
        : null}

      <SVGRoot
        svgWidth={svgWidth}
        svgHeight={svgHeight}
        viewPortWidth={viewPortWidth}
        viewPortHeight={viewPortHeight}
        parentHalfHeight={parentHalfHeight}
        svgPositionTop={svgPositionTop}
        svgPositionLeft={svgPositionLeft}
        scaleCoeff={scaleCoeff}
        changeSvgPositionTop={changeSvgPositionTop}
        changeSvgPositionLeft={changeSvgPositionLeft}
      >
        <TargetItem
          targetItemProps={targetItem}
        />

        <RelationGroup
          rolesGroup={childRolesGroup}
          itemsGroup={childItemsGroup}
        />
        <RelationGroup
          rolesGroup={parentRolesGroup}
          itemsGroup={parentItemsGroup}
        />
      </SVGRoot>
    </ViewPort>
  );
};

export default observer((): JSX.Element => {
  const {
    familyTreeStore,
    i18nStore
  }: IRootStore = React.useContext<IRootStore>(StoreContext);

  const familyTreeData: IFamilyTreeData = {
    targetItem: familyTreeStore.targetItem,
    previousTargetLink: familyTreeStore.previousTargetLink,
    childRolesGroup: familyTreeStore.childRolesGroup,
    parentRolesGroup: familyTreeStore.parentRolesGroup,
    childItemsGroup: familyTreeStore.childItemsGroup,
    parentItemsGroup: familyTreeStore.parentItemsGroup,
    itemBubble: familyTreeStore.itemBubble,
    arrowBubble: familyTreeStore.arrowBubble,
  };
  const viewPortData: IViewPortData = {
    changeViewPortWidth: familyTreeStore.viewPort.changeViewPortWidth,
    changeViewPortHeight: familyTreeStore.viewPort.changeViewPortHeight,
    setViewPortOffset: familyTreeStore.viewPort.setViewPortOffset,
    viewPortWidth: familyTreeStore.viewPort.viewPortWidth,
    viewPortHeight: familyTreeStore.viewPort.viewPortHeight
  };
  const svgRootData: ISvgRootData = {
    svgWidth: familyTreeStore.svgRoot.svgWidth,
    svgHeight: familyTreeStore.svgRoot.svgHeight,
    parentHalfHeight: familyTreeStore.svgRoot.parentHalfHeight,
    childHalfHeight: familyTreeStore.svgRoot.childHalfHeight,
    svgPositionTop: familyTreeStore.svgRoot.svgPositionTop,
    svgPositionLeft: familyTreeStore.svgRoot.svgPositionLeft,

    changeSvgPositionTop: familyTreeStore.svgRoot.changeSvgPositionTop,
    changeSvgPositionLeft: familyTreeStore.svgRoot.changeSvgPositionLeft,
    setSvgPositionTop: familyTreeStore.svgRoot.setSvgPositionTop,
    setSvgPositionLeft: familyTreeStore.svgRoot.setSvgPositionLeft,

    scaleCoeff: familyTreeStore.svgRoot.scaleCoeff,
  };
  const rangeData: IRangeData = {
    scaleCoeff: familyTreeStore.svgRoot.scaleCoeff,
    minRangeValue: familyTreeStore.svgRoot.minRangeValue,
    maxRangeValue: familyTreeStore.svgRoot.maxRangeValue,
    setScaleCoeff: familyTreeStore.svgRoot.setScaleCoeff,
  };
  const i18NextData: II18NextData = {
    t: i18nStore.t
  };

  return React.createElement<IProps>(App, {
    ...familyTreeData,
    ...viewPortData,
    ...svgRootData,
    ...rangeData,
    ...i18NextData,
  });
});