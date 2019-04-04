import ElementModel from '../../ElementModel';
import {IRoleArrow, IRoleModel, IRolesGroup} from '../../interfaces';
import Dimensions from '../../Dimensions';
import {Relations, Types} from '../../../../enums';
import ElementHelpers from '../../ElementModel/Helpers';
import RoleArrow from '../RoleArrow';

export default
class RoleModel extends ElementModel implements IRoleModel {
  readonly rolesGroup: IRolesGroup;

  arrow: IRoleArrow;

  readonly height: number = Dimensions.ROLE_HEIGHT;

  readonly roleId: number;
  readonly roleIndex: number;

  readonly relation: Relations;

  constructor(
    rolesGroup: IRolesGroup,
    title: string,
    roleId: number,
    roleIndex: number,
    relation: Relations
  ) {
    super(title);

    this.rolesGroup = rolesGroup;

    this.roleId = Number(roleId);
    this.roleIndex = roleIndex;

    this.width = Dimensions.ELEMENT_BLOCK_PADDING * 2 +
      ElementHelpers.getTextWidth(title, `bold ${Dimensions.ELEMENT_FONT_SIZE}px Arial`);

    this.relation = relation;

    this.arrow = new RoleArrow(this);
  }
}