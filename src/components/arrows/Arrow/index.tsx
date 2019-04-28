import * as React from 'react';
import {IArrow} from '../../../stores/FamilyTreeStore/interfaces';
import Dimensions from '../../../stores/FamilyTreeStore/Dimensions';

export interface IArrowProps {
  d: string;
  stroke: string;
  strokeWidth?: number;
}

const Arrow: React.FC<IArrowProps> = ({
  d,
  stroke,
  strokeWidth = Dimensions.ARROW_STROKE_WIDTH,
}): JSX.Element => (
  <path
    stroke={stroke}
    d={`${d} l0 -0.1 l 3 -5l-3 5l-3 -5`}
    fill='none'
    strokeWidth={strokeWidth}
  />
);

export default React.memo<IArrowProps>(Arrow);