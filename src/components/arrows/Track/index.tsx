import * as React from 'react';
import {IArrow} from '../../../stores/FamilyTreeStore/interfaces';

interface IProps extends Pick<IArrow, 'd'> {

}

const Track: React.FC<IProps> = ({
  d
}): JSX.Element => {
  return (
    <path
      stroke='#fff'
      d={d}
      fill='none'
      strokeWidth={6}
    />
  )
};

export default React.memo<IProps>(Track);