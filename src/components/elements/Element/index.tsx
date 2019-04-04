import * as React from 'react';
import {IElementModel} from '../../../stores/FamilyTreeStore/interfaces';
import Dimensions from '../../../stores/FamilyTreeStore/Dimensions';

interface IProps extends Pick<IElementModel, 'width' | 'height' | 'x' | 'y'> {
  fillColor: string;
  onDoubleClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
  rectStyle?: React.CSSProperties;
  children: React.ReactNode;
}

function defaultHandler() {
  return undefined;
}

const Element: React.FC<IProps> = ({
  children,
  width,
  height,
  x,
  y,
  fillColor,
  onDoubleClick = defaultHandler,
  onMouseEnter = defaultHandler,
  onMouseLeave = defaultHandler,
  style = {},
  rectStyle = {},
}): JSX.Element => (
  <g
    width={width}
    height={height}
    x={x}
    y={y}
    onDoubleClick={onDoubleClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={style}
    fontSize={Dimensions.ELEMENT_FONT_SIZE}
  >
    <rect
      width={width}
      height={height}
      x={x}
      y={y}
      fill={fillColor}
      style={rectStyle}
    />
    {children}
  </g>
);

export default React.memo<IProps>(Element);