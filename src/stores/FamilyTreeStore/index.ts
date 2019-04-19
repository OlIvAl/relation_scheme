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
import Dimensions from './Dimensions';

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
  @observable childItemsGroup: IItemsGroup | null = null;

  parentRolesGroup: IRolesGroup | null = null;
  @observable parentItemsGroup: IItemsGroup | null = null;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;

    this.viewPort = new ViewPortModel(this);
    this.svgRoot = new SvgRootModel(this);

    this.previousTargetLink = new PreviousTargetLink(this);

    reaction(
      (): ITargetItemModel | null => this.targetItem,
      (): void => {
        this.svgRoot.setScaleCoeff(1);
        this.itemBubble = null;
      }
    );

    reaction(
      (): number => this.viewPort.viewPortWidth,
      (viewPortWidth): void => {
        const newSvgPositionLeft = (viewPortWidth - this.svgRoot.svgWidth) / 2;
        this.svgRoot.setSvgPositionLeft(newSvgPositionLeft);
      },
      {
        name: 'changeViewPortWidth reaction'
      }
    );

    reaction(
      (): number => this.viewPort.viewPortHeight,
      (viewPortHeight): void => {
        let newSvgPositionTop: number;

        //duplicate
        if(this.svgRoot.svgHeight < viewPortHeight) {
          newSvgPositionTop = (this.viewPort.viewPortHeight - this.svgRoot.svgHeight) / 2;
        } else if((this.svgRoot.parentHalfHeight + Dimensions.TARGET_ELEMENT_HEIGHT / 2 + Dimensions.INDENTS_BETWEEN_LEVELS) < viewPortHeight / 2) {
          newSvgPositionTop = Dimensions.INDENTS_BETWEEN_LEVELS;
        } else if((this.svgRoot.childHalfHeight + Dimensions.TARGET_ELEMENT_HEIGHT / 2 + Dimensions.INDENTS_BETWEEN_LEVELS) < viewPortHeight / 2) {
          newSvgPositionTop = viewPortHeight - (this.svgRoot.parentHalfHeight + this.svgRoot.childHalfHeight + Dimensions.INDENTS_BETWEEN_LEVELS);
        } else {
          // duplicate
          newSvgPositionTop = (this.viewPort.viewPortHeight - this.svgRoot.svgHeight) / 2;
        }

        this.svgRoot.setSvgPositionTop(newSvgPositionTop);
      },
      {
        name: 'changeViewPortHeight reaction'
      }
    );
  }

  @action.bound
  async init(id: number, type: number): Promise<void> {
    let url: string;

    if (process.env.NODE_ENV !== 'production') {
      // url = `${window.FT_JSON_URL}/?id=${id}&type=${type}`;
      // url = `/mocks/store0.json`;
      url = `/mocks/store-real96721.json`;
      // url = `/mocks/store0.json`;
      // url = `${window.FT_JSON_URL}/?id=96721&type=0`;
      // url = `${window.FT_JSON_URL}/?id=74874&type=0`;
      // url = `${window.FT_JSON_URL}/?id=1074571&type=1`;
      // url = `${window.FT_JSON_URL}/?id=141735&type=0`;
    } else {
      url = `${window.FT_JSON_URL}/?id=${id}&type=${type}`;
    }

    const response: Response = await fetch(url);
    const {
      lang,
      scheme: {
        target,
        parents = [],
        children = []
      },
      roles = []
    }: IResponseResult = await response.json();

    this.rootStore.i18nStore.changeLanguage(lang);

    runInAction(
      (): void => {
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
          target.url,
          target.favorites,
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

        this.svgRoot.changeParentHalfHeight(
          FamilyTreeHelpers.getParentHalfHeight(
            this.targetItem,
            this.parentRolesGroup,
            this.parentItemsGroup
          )
        );
        this.svgRoot.changeChildHalfHeight(
          FamilyTreeHelpers.getChildHalfHeight(
            this.targetItem,
            this.childRolesGroup,
            this.childItemsGroup
          )
        );
      }
    );
  }
}