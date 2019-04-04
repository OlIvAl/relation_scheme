import {action, observable, reaction, runInAction} from 'mobx';
import {
  IFamilyTreeStore,
  ISvgRootModel,
  ITargetItemModel,
  IViewPortModel,
  IResponseResult,
  IRolesGroup,
  IItemsGroup,
  IResponseRoleContent,
  IItemExtraInfo,
  IItemBubble,
  IArrowBubble,
  IPreviousTargetLink
} from './interfaces';
import ViewPortModel from './ViewPortModel';
import SvgRootModel from './SvgRootModel';
import TargetItemModel from './items/TargetItemModel';
import RolesGroup from './roles/RolesGroup';
import FamilyTreeHelpers from './Helpers';
import {Relations} from '../../enums';
import ItemsGroup from './items/ItemsGroup';
import {IRootStore} from '../../interfaces';
import PreviousTargetLink from './PreviousTargetLink';

export default
class FamilyTreeStore implements IFamilyTreeStore {
  rootStore: IRootStore;

  @observable viewPort: IViewPortModel;
  @observable svgRoot: ISvgRootModel;

  @observable itemBubble: IItemBubble | null = null;
  @observable arrowBubble: IArrowBubble | null = null;

  @observable targetItem: ITargetItemModel | null = null;

  @observable previousTargetLink: IPreviousTargetLink;

  childRolesGroup: IRolesGroup | null = null;
  childItemsGroup: IItemsGroup | null = null;

  parentRolesGroup: IRolesGroup | null = null;
  parentItemsGroup: IItemsGroup | null = null;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;

    this.viewPort = new ViewPortModel(this);
    this.svgRoot = new SvgRootModel(this);

    this.previousTargetLink = new PreviousTargetLink(this);

    reaction(
      () => this.targetItem,
      () => {
        this.svgRoot.setScaleCoeff(1);
        this.itemBubble = null;
      }
    );

    reaction(
      () => this.viewPort.viewPortWidth,
      (viewPortWidth) => {
        const newSvgPositionLeft = (viewPortWidth - this.svgRoot.svgWidth) / 2;
        this.svgRoot.changeSvgPositionLeft(newSvgPositionLeft);
      },
      {
        name: 'changeViewPortWidth reaction'
      }
    );

    reaction(
      () => this.viewPort.viewPortHeight,
      (viewPortHeight) => {
        const newSvgPositionTop = (viewPortHeight - this.svgRoot.svgHeight) / 2;
        this.svgRoot.changeSvgPositionTop(newSvgPositionTop);
      },
      {
        name: 'changeViewPortHeight reaction'
      }
    );
  }

  @action.bound
  async init(id: number, type: number) {
    let url: string;

    url = `${window.FT_JSON_URL}/?id=${id}&type=${type}`;

    const response: Response = await fetch(url);
    const {
      scheme: {
        target,
        parents = [],
        children = []
      },
      roles = []
    }: IResponseResult = await response.json();

    runInAction(
      () => {
        const bubbleInfo: IItemExtraInfo | null = (
          target.legalForm ||
          target.address ||
          target.regDate ||
          target.capSum
        )
          ? {
            legalForm: target.legalForm,
            address: target.address,
            regDate: target.regDate,
            capCur: target.capCur,
            capSum: target.capSum,
            capFullyPaid: target.capFullyPaid
          }
          : null;

        const childUniqueRolesFromElements: IResponseRoleContent[] = FamilyTreeHelpers.getUniqueRolesFromElements(children, roles);
        const parentUniqueRolesFromElements: IResponseRoleContent[] = FamilyTreeHelpers.getUniqueRolesFromElements(parents, roles);

        this.childRolesGroup = new RolesGroup(
          this,
          childUniqueRolesFromElements,
          Relations.CHILD
        );

        this.parentRolesGroup = new RolesGroup(
          this,
          parentUniqueRolesFromElements,
          Relations.PARENT
        );

        this.targetItem = new TargetItemModel(
          this,
          target.id,
          target.regNo,
          target.type,
          target.title,
          bubbleInfo
        );

        this.childItemsGroup = new ItemsGroup(
          this,
          children,
          this.childRolesGroup,
          Relations.CHILD
        );

        this.parentItemsGroup = new ItemsGroup(
          this,
          parents,
          this.parentRolesGroup,
          Relations.PARENT
        );

        this.svgRoot.changeSvgWidth(
          FamilyTreeHelpers.getSvgWidth(
            this.targetItem,
            this.childRolesGroup,
            this.childItemsGroup,
            this.parentRolesGroup,
            this.parentItemsGroup
          )
        );
        this.svgRoot.changeSvgHeight(
          FamilyTreeHelpers.getSvgHeight(
            this.targetItem,
            this.childRolesGroup,
            this.childItemsGroup,
            this.parentRolesGroup,
            this.parentItemsGroup
          )
        );
      }
    );
  }
}