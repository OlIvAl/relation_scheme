import * as React from 'react';
import {observer} from 'mobx-react-lite';
import {IItemArrow, IItemModel, IItemsGroup, IRoleModel, IRolesGroup} from '../../stores/FamilyTreeStore/interfaces';
import Track from '../arrows/Track';
import OrdinaryItemArrow from '../arrows/OrdinaryItemArrow';
import HoverItemArrow from '../arrows/HoverItemArrow';
import Item from '../elements/Item';
import RoleArrow from '../arrows/RoleArrow';
import Role from '../elements/Role';

interface IProps {
  rolesGroup: IRolesGroup;
  itemsGroup: IItemsGroup;
}

const RelationGroup: React.FC<IProps> = ({
  rolesGroup,
  itemsGroup,
}): JSX.Element => {
  return (
    <>
      <g className='rolesArrows'>
        {rolesGroup.roles.map(({arrow}: IRoleModel): JSX.Element => (
          <RoleArrow
            d={arrow.d}
            roleId={arrow.roleId}
            key={arrow.roleId}
          />
        ))}
      </g>
      <g className='roles'>
        {rolesGroup.roles.map((role: IRoleModel): JSX.Element => (
          <Role
            roleProps={role}
            key={role.roleId}
          />
        ))}
      </g>
      <g className='itemsArrows'>
        {itemsGroup.arrowsByRoles.slice().reverse().map((arrowsByRole: IItemArrow[]): JSX.Element[] => (
          [
            ...arrowsByRole.map((arrow: IItemArrow): JSX.Element => (
              <Track
                d={arrow.d}
                key={`t ${arrow.item.id}${arrow.roleId}`}
              />
            )),
            ...arrowsByRole.map((arrow: IItemArrow): JSX.Element => (
              <OrdinaryItemArrow
                itemArrowProps={arrow}
                relation={arrow.roleItem.relation}
                key={`${arrow.item.id}${arrow.roleId}`}
              />
            )),
          ]
        ))}
        {itemsGroup.hoverArrow ? (
          <HoverItemArrow
            itemArrowProps={itemsGroup.hoverArrow}
            key={`${itemsGroup.hoverArrow.item.id}${itemsGroup.hoverArrow.roleId}`}
          />
        ) : null}
      </g>
      <g className='items'>
        {itemsGroup.items.map((item: IItemModel): JSX.Element => (
          <Item
            itemProps={item}
            key={item.id}
          />
        ))}
      </g>
    </>
  )
};

export default React.memo<IProps>(observer(RelationGroup));