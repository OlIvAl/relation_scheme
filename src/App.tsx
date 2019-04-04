import * as React from 'react';
import ViewPort from './components/ViewPort';
import SVGRoot from './components/SVGRoot';
import {inject} from 'mobx-react';
import {
  IFamilyTreeStore, IItemArrow,
  IItemModel,
  IRoleModel,
  ISvgRootModel,
  IViewPortModel
} from './stores/FamilyTreeStore/interfaces';
import Item from './components/elements/Item';
import Role from './components/elements/Role';
import TargetItem from './components/elements/TargetItem';
import RoleArrow from './components/arrows/RoleArrow';
import ItemArrow from './components/arrows/ItemArrow';
import Track from './components/arrows/Track';
import Range from './components/Range';
import debounce from 'lodash.debounce';
import Dimensions from './stores/FamilyTreeStore/Dimensions';
import {IRootStore} from './interfaces';
import ArrowBubble from './components/bubbles/ArrowBubble';
import ItemBubble from './components/bubbles/ItemBubble';
import {II18nStore} from './stores/I18nStore/interfaces';
import preloader from './static/preloader.svg';

interface IProps {}

export interface IInjectedProps extends
  Pick<IFamilyTreeStore, 'arrowBubble' | 'itemBubble' | 'targetItem' | 'childRolesGroup' | 'parentRolesGroup' | 'childItemsGroup' | 'parentItemsGroup' | 'previousTargetLink'>,
  Pick<IViewPortModel, 'changeViewPortWidth' | 'changeViewPortHeight' | 'setViewPortOffset'>,
  Pick<ISvgRootModel, 'svgWidth' | 'svgHeight' | 'svgPositionTop' | 'svgPositionLeft' | 'changeSvgPositionTop' | 'changeSvgPositionLeft' | 'scaleCoeff' | 'minRangeValue' | 'maxRangeValue' | 'setScaleCoeff'>,
  Pick<II18nStore, 't'>,
  Partial<IProps> {}

interface IState {
  scaleCoeff: number;
  isFullscreen: boolean
}

class App extends React.Component<IProps, IState> {
  viewPortRef: React.RefObject<HTMLDivElement | null> = React.createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);

    const {
      scaleCoeff
    } = this.injected;

    this.state = {
      scaleCoeff,
      isFullscreen: false
    };

    this.onRangeInputChange = this.onRangeInputChange.bind(this);
    this.switchViewPortFullScreen = this.switchViewPortFullScreen.bind(this);
    this.fullscreenChangeHandler = this.fullscreenChangeHandler.bind(this);
  }

  get injected() {
    return this.props as IInjectedProps;
  }

  componentDidMount(): void {
    document.addEventListener('fullscreenchange', this.fullscreenChangeHandler);

    const viewPort: HTMLDivElement | null = this.viewPortRef.current;

    if(viewPort) {
      const {
        left,
        top
      }: ClientRect = viewPort.getBoundingClientRect();

      this.injected.setViewPortOffset(top, left);
    }
  }

  static getDerivedStateFromProps(nextProps: IProps): Pick<IState, 'scaleCoeff'> {
    // @ts-ignore
    return {scaleCoeff: nextProps.scaleCoeff};
  }

  componentWillUnmount(): void {
    document.removeEventListener('fullscreenchange', this.fullscreenChangeHandler);
  }

  fullscreenChangeHandler(event: any): void {
    const {
      changeViewPortWidth,
      changeViewPortHeight,
    } = this.injected;

    changeViewPortWidth(event.target.clientWidth as number);
    changeViewPortHeight(event.target.clientHeight as number);
  }

  onRangeInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.persist();

    this.setState((): Pick<IState, 'scaleCoeff'> => {
      return {
        scaleCoeff: parseFloat(e.target.value)
      };
    });

    const debounceOnRangeInputChange = debounce(this.injected.setScaleCoeff, 100);

    debounceOnRangeInputChange(parseFloat(e.target.value));
  }

  switchViewPortFullScreen(): void {
    // @ts-ignore
    document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;
    // @ts-ignore
    document.fullscreenElement =  document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    // @ts-ignore
    document.exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;

    const viewPort: HTMLDivElement | null = this.viewPortRef.current;

    if(viewPort && document.fullscreenEnabled) {
      // @ts-ignore
      if(document.fullscreenElement) {
        document.exitFullscreen();

        this.setState({
          isFullscreen: false
        });
      } else {
        viewPort.requestFullscreen();

        this.setState({
          isFullscreen: true
        });
      }
    }
  }

  render(): JSX.Element {
    const {
      svgWidth,
      svgHeight,
      svgPositionTop,
      svgPositionLeft,
      arrowBubble,
      itemBubble,
      changeSvgPositionTop,
      changeSvgPositionLeft,
      scaleCoeff,
      minRangeValue,
      maxRangeValue,
      targetItem,
      childRolesGroup,
      parentRolesGroup,
      childItemsGroup,
      parentItemsGroup,
      previousTargetLink,
      t
    } = this.injected;

    const {
      scaleCoeff: rangeVal,
      isFullscreen
    } = this.state;

    if(!(svgWidth
      || svgHeight)
      || !targetItem
      || !childRolesGroup
      || !parentRolesGroup
      || !childItemsGroup
      || !parentItemsGroup) {
      return (
        <ViewPort
          viewPortWidth={Dimensions.VIEWPORT_WIDTH}
          viewPortHeight={Dimensions.VIEWPORT_HEIGHT}
          ref={this.viewPortRef}
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
        ref={this.viewPortRef}
      >
        <Range
          minRangeValue={minRangeValue}
          maxRangeValue={maxRangeValue}
          scaleCoeff={rangeVal}
          onChange={this.onRangeInputChange}
        />

        <button
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1
          }}
          onClick={this.switchViewPortFullScreen}
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
              legalForm={itemBubble.legalForm}
              address={itemBubble.address}
              regDate={itemBubble.regDate}
              capCur={itemBubble.capCur}
              capSum={itemBubble.capSum}
              capFullyPaid={itemBubble.capFullyPaid}
              width={itemBubble.width}
              height={itemBubble.height}
              positionTop={itemBubble.positionTop}
              positionLeft={itemBubble.positionLeft}
              horizontalTailPosition={itemBubble.horizontalTailPosition}
              verticalTailPosition={itemBubble.verticalTailPosition}
              t={t}
            />
          )
          : null}

        {arrowBubble
          ? (
            <ArrowBubble
              arrow={arrowBubble.arrow}
              partCur={arrowBubble.partCur}
              partSum={arrowBubble.partSum}
              percent={arrowBubble.percent}
              startDate={arrowBubble.startDate}
              quitDate={arrowBubble.quitDate}
              position={arrowBubble.position}
              width={arrowBubble.width}
              height={arrowBubble.height}
              positionTop={arrowBubble.positionTop}
              positionLeft={arrowBubble.positionLeft}
              horizontalTailPosition={arrowBubble.horizontalTailPosition}
              verticalTailPosition={arrowBubble.verticalTailPosition}
              t={t}
            />
          )
          : null}

        <SVGRoot
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          svgPositionTop={svgPositionTop}
          svgPositionLeft={svgPositionLeft}
          scaleCoeff={scaleCoeff}
          changeSvgPositionTop={changeSvgPositionTop}
          changeSvgPositionLeft={changeSvgPositionLeft}
        >
          <TargetItem
            id={targetItem.id}
            regNo={targetItem.regNo}
            title={targetItem.title}
            itemBubbleInfo={targetItem.itemBubbleInfo}
            width={targetItem.width}
            height={targetItem.height}
            type={targetItem.type}
            hover={targetItem.hover}
            setHover={targetItem.setHover}
            setUnHover={targetItem.setUnHover}
            setItemBubble={targetItem.setItemBubble}
            unSetItemBubble={targetItem.unSetItemBubble}
          />

          <g className='childRolesArrows'>
            {childRolesGroup.roles.map(({arrow}: IRoleModel): JSX.Element => (
              <RoleArrow
                d={arrow.d}
                roleId={arrow.roleId}
                key={arrow.roleId}
              />
            ))}
          </g>

          <g className='parentRolesArrows'>
            {parentRolesGroup.roles.map(({arrow}: IRoleModel): JSX.Element => (
              <RoleArrow
                d={arrow.d}
                roleId={arrow.roleId}
                key={arrow.roleId}
              />
            ))}
          </g>

          <g className='childRoles'>
            {childRolesGroup.roles.map((role: IRoleModel): JSX.Element => (
              <Role
                title={role.title}
                roleId={role.roleId}
                width={role.width}
                height={role.height}
                x={role.x}
                y={role.y}
                key={role.roleId}
              />
            ))}
          </g>

          <g className='parentRoles'>
            {parentRolesGroup.roles.map((role: IRoleModel): JSX.Element => (
              <Role
                title={role.title}
                roleId={role.roleId}
                width={role.width}
                height={role.height}
                x={role.x}
                y={role.y}
                key={role.roleId}
              />
            ))}
          </g>

          <g className='childItemsArrows'>
            {childItemsGroup.arrowsByRoles.slice().reverse().map((arrowsByRole: IItemArrow[]): JSX.Element[] => (
              [
                ...arrowsByRole.map((arrow: IItemArrow): JSX.Element => (
                  <Track
                    d={arrow.d}
                    key={`t ${arrow.item.id}${arrow.roleId}`}
                  />
                )),
                ...arrowsByRole.map((arrow: IItemArrow): JSX.Element => (
                  <ItemArrow
                    d={arrow.d}
                    itemX={arrow.itemX}
                    itemY={arrow.itemY}
                    roleId={arrow.roleId}
                    relationInfo={arrow.relationInfo}
                    setHoverArrow={childItemsGroup.setHoverArrow.bind(null, arrow)}
                    unSetHoverArrow={childItemsGroup.unSetHoverArrow}
                    setArrowBubble={arrow.setArrowBubble}
                    unSetArrowBubble={arrow.unSetArrowBubble}
                    strong={arrow.strong}
                    relation={arrow.roleItem.relation}
                    notHover={arrow.notHover}
                    key={`${arrow.item.id}${arrow.roleId}`}
                  />
                )),
              ]
            ))}
          </g>
          <g className='childItems'>
            {childItemsGroup.items.map((item: IItemModel): JSX.Element => (
              <Item
                id={item.id}
                regNo={item.regNo}
                title={item.title}
                width={item.width}
                height={item.height}
                x={item.x}
                y={item.y}
                type={item.type}
                hover={item.hover}
                setHover={item.setHover}
                setUnHover={item.setUnHover}
                getNewFT={item.getNewFT}
                setItemBubble={item.setItemBubble}
                unSetItemBubble={item.unSetItemBubble}
                key={item.id}
              />
            ))}
          </g>

          <g className='parentItemsArrows'>
            {parentItemsGroup.arrowsByRoles.slice().reverse().map((arrowsByRole: IItemArrow[]): JSX.Element[] => (
              [
                ...arrowsByRole.map((arrow: IItemArrow): JSX.Element => (
                  <Track
                    d={arrow.d}
                    key={`t${arrow.item.id}${arrow.roleId}`}
                  />
                )),
                ...arrowsByRole.map((arrow: IItemArrow): JSX.Element => (
                  <ItemArrow
                    d={arrow.d}
                    itemX={arrow.itemX}
                    itemY={arrow.itemY}
                    relationInfo={arrow.relationInfo}
                    setArrowBubble={arrow.setArrowBubble}
                    unSetArrowBubble={arrow.unSetArrowBubble}
                    setHoverArrow={parentItemsGroup.setHoverArrow.bind(null, arrow)}
                    unSetHoverArrow={parentItemsGroup.unSetHoverArrow}
                    notHover={arrow.notHover}
                    roleId={arrow.roleId}
                    strong={arrow.strong}
                    relation={arrow.roleItem.relation}
                    key={`${arrow.item.id}${arrow.roleId}`}
                  />
                )),
              ]
            ))}
          </g>
          <g className='parentItems'>
            {parentItemsGroup.items.map((item: IItemModel): JSX.Element => (
              <Item
                id={item.id}
                regNo={item.regNo}
                title={item.title}
                width={item.width}
                height={item.height}
                x={item.x}
                y={item.y}
                type={item.type}
                hover={item.hover}
                setHover={item.setHover}
                setUnHover={item.setUnHover}
                getNewFT={item.getNewFT}
                setItemBubble={item.setItemBubble}
                unSetItemBubble={item.unSetItemBubble}
                key={item.id}
              />
            ))}
          </g>
        </SVGRoot>
      </ViewPort>
    );
  }
}

export default inject(({
  familyTreeStore: {
    viewPort: {
      changeViewPortWidth,
      changeViewPortHeight,
      setViewPortOffset
    },
    svgRoot: {
      svgWidth,
      svgHeight,
      svgPositionTop,
      svgPositionLeft,
      changeSvgPositionTop,
      changeSvgPositionLeft,

      scaleCoeff,
      minRangeValue,
      maxRangeValue,
      setScaleCoeff
    },
    targetItem,
    previousTargetLink,
    childRolesGroup,
    parentRolesGroup,
    childItemsGroup,
    parentItemsGroup,
    itemBubble,
    arrowBubble
  },
  i18nStore: {
    t
  }
}: IRootStore): IInjectedProps => ({
  changeViewPortWidth,
  changeViewPortHeight,
  svgWidth,
  svgHeight,
  svgPositionTop,
  svgPositionLeft,
  itemBubble,
  arrowBubble,
  changeSvgPositionTop,
  changeSvgPositionLeft,
  setViewPortOffset,
  scaleCoeff,
  minRangeValue,
  maxRangeValue,
  setScaleCoeff,
  targetItem,
  previousTargetLink,
  childRolesGroup,
  parentRolesGroup,
  childItemsGroup,
  parentItemsGroup,
  t
}))(App);