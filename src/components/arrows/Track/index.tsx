import * as React from 'react';
import {IArrow} from '../../../stores/FamilyTreeStore/interfaces';
import Dimensions from '../../../stores/FamilyTreeStore/Dimensions';

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
      strokeWidth={Dimensions.ARROW_TRACK_STROKE_WIDTH}
    />
  )
};

export default React.memo<IProps>(Track);