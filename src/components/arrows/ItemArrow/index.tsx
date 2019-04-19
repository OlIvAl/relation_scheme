import * as React from 'react';
import Arrow from '../Arrow';
import {IItemArrow} from '../../../stores/FamilyTreeStore/interfaces';
import {observer} from 'mobx-react-lite';
import Dimensions from '../../../stores/FamilyTreeStore/Dimensions';

interface IProps {
  itemArrowProps: Pick<IItemArrow, 'd' | 'strong'>;
  stroke: string;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

const ItemArrow: React.FC<IProps> = ({
  itemArrowProps: {
    d,
    strong
  },
  stroke,
  onMouseEnter,
  onMouseLeave,
}): JSX.Element => {
  return (
    <>
      <Arrow
        d={d}
        strokeWidth={strong
          ? Dimensions.ARROW_STRONG_STROKE_WIDTH
          : Dimensions.ARROW_STROKE_WIDTH}
        stroke={stroke}
      />
      <path
        stroke='#000'
        strokeOpacity={0}
        d={d}
        fill='none'
        strokeWidth={Dimensions.ARROW_TRACK_STROKE_WIDTH}
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseLeave}
      />
    </>
  )
};

export default React.memo<IProps>(observer(ItemArrow));