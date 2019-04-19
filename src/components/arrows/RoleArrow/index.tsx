import * as React from 'react';
import Arrow from '../Arrow';
import {IItemArrow} from '../../../stores/FamilyTreeStore/interfaces';

interface IProps extends Pick<IItemArrow, 'd' | 'roleId'> {

}

const {roles}: ITheme = window['theme'];

const RoleArrow: React.FC<IProps> = ({
  d,
  roleId
}): JSX.Element => (
  <Arrow
    d={d}
    stroke={roles[roleId]}
  />
);

export default React.memo<IProps>(RoleArrow);