import * as React from 'react';
import Arrow from '../Arrow';
import {IItemArrow} from '../../../stores/FamilyTreeStore/interfaces';

interface IProps extends Pick<IItemArrow, 'd' | 'roleId'> {

}

const theme: any = window['theme'];

const RoleArrow: React.FC<IProps> = ({
  d,
  roleId
}) => (
  <Arrow
    d={d}
    stroke={theme.roles![roleId]}
  />
);

export default React.memo<IProps>(RoleArrow);