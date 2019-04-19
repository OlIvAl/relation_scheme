import {IFamilyTreeStore, IResponseRoleContent, IRoleModel, IRolesGroup} from '../../interfaces';
import {Relations} from '../../../../enums';
import Dimensions from '../../Dimensions';
import RolesGroupHelpers from './Helpers';
import RoleModel from '../RoleModel';

export default
class RolesGroup implements IRolesGroup {
  readonly store: IFamilyTreeStore;

  roles: IRoleModel[] = [];

  readonly relation: Relations;

  get distanceFromTarget(): number {
    // промежуток со стрелками
    return (Math.floor(this.roles.length / 2) + 1)
      * (Dimensions.INDENTS_BETWEEN_LEVELS / 2);
  }

  get distanceFromTargetCenter(): number {
    // половина высоты целевого элемента
    return Dimensions.TARGET_ELEMENT_HEIGHT / 2 + this.distanceFromTarget;
  }

  get minXCoord(): number {
    if (this.roles.length === 0) {
      return 0;
    }

    const firstRole: IRoleModel = this.roles[0];

    return firstRole.centralX - firstRole.width / 2;
  }

  get maxXCoord(): number {
    if (this.roles.length === 0) {
      return 0;
    }

    const lastRole: IRoleModel = this.roles[this.roles.length - 1];

    return lastRole.centralX + lastRole.width / 2;
  }

  get height(): number {
    if(!this.roles.length) {
      return 0;
    }

    return Dimensions.ROLE_HEIGHT + this.distanceFromTarget;
  }

  constructor(
    store: IFamilyTreeStore,
    responseRoles: IResponseRoleContent[],
    relation: Relations
  ) {
    this.store = store;

    this.relation = relation;
    this.roles = responseRoles
    // мапинг полученного значения на объект модели роли
      .map((
        {title, role}: IResponseRoleContent,
        index: number
      ): IRoleModel => (
        new RoleModel(this, title, role, index, relation)
      ));

    const centralXForRoles: number[] = RolesGroupHelpers.getCentralXArrForRoles(this.roles);

    const centralYArrForRoles: number[] = RolesGroupHelpers.getCentralYArrForRoles(
      this.roles,
      this.distanceFromTargetCenter,
      relation
    );

    this.roles = this.roles.map((
      role: IRoleModel,
      index: number
    ): IRoleModel => {
      role.setCentralX(centralXForRoles[index]);
      role.setCentralY(centralYArrForRoles[index]);

      return role;
    });
  }
}