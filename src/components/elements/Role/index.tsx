import * as React from 'react';
import Element from '../Element';
import {IRoleModel} from '../../../stores/FamilyTreeStore/interfaces';
import Dimensions from '../../../stores/FamilyTreeStore/Dimensions';

interface IProps {
  roleProps: Pick<IRoleModel, 'title' | 'roleId' | 'width' | 'height' | 'x' | 'y'>;
}

const {roles}: ITheme = window['theme'];

const Role: React.FC<IProps> = ({
  roleProps: {
    title,
    roleId,
    width,
    height,
    x,
    y
  }
}): JSX.Element => (
  <Element
    width={width}
    height={height}
    x={x}
    y={y}
    fillColor={roles[roleId]}
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