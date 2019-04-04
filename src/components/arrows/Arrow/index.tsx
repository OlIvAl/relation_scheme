import * as React from 'react';
import {IArrow} from '../../../stores/FamilyTreeStore/interfaces';

export interface IArrowProps extends Pick<IArrow, 'd'>{
  stroke: string;
  strokeWidth?: number;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: () => void;
}

function defaultHandler() {
  return undefined;
}

const Arrow: React.FC<IArrowProps> = ({
  d,
  stroke,
  strokeWidth = 2,
  onMouseEnter = defaultHandler,
  onMouseLeave = defaultHandler,
}): JSX.Element => (
  <path
    stroke={stroke}
    d={`${d} l0 -0.1 l 3 -5l-3 5l-3 -5`}
    fill='none'
    strokeWidth={strokeWidth}
    onMouseEnter={onMouseEnter}
    onMouseOut={onMouseLeave}
  />
);

export default React.memo<IArrowProps>(Arrow);