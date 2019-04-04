import * as React from 'react';
import Element from '../Element';
import {IRoleModel} from '../../../stores/FamilyTreeStore/interfaces';
import Dimensions from '../../../stores/FamilyTreeStore/Dimensions';

interface IProps extends Pick<IRoleModel, 'title' | 'roleId' | 'width' | 'height' | 'x' | 'y'>{

}

const theme: any = window['theme'];

const Role: React.FC<IProps> = ({
  title,
  roleId,
  width,
  height,
  x,
  y
}) => (
  <Element
    width={width}
    height={height}
    x={x}
    y={y}
    fillColor={theme.roles[roleId]}
  >
    <text
      x={x}
      y={y + Dimensions.ELEMENT_FONT_SIZE}
      dx={Dimensions.ELEMENT_BLOCK_PADDING}
      dy={height / 2 - Dimensions.ELEMENT_FONT_SIZE / 2 - 3}
      fontWeight='bold'
      fill='#fff'
    >
      {title}
    </text>
  </Element>
);

export default React.memo<IProps>(Role);