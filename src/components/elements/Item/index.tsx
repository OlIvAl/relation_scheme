import * as React from 'react';
import Element from '../Element';
import {IItemModel} from '../../../stores/FamilyTreeStore/interfaces';
import Dimensions from '../../../stores/FamilyTreeStore/Dimensions';

interface IProps extends Pick<IItemModel, 'id' | 'regNo' | 'title' | 'width' | 'height' | 'x' | 'y' | 'type' | 'getNewFT' | 'setItemBubble' | 'unSetItemBubble' | 'hover' | 'setHover' | 'setUnHover'> {
  target?: boolean;
}

const theme: any = window['theme'];

const Item: React.FC<IProps> = ({
  id,
  regNo,
  title,
  width,
  height,
  x,
  y,
  type,
  getNewFT,
  setItemBubble,
  unSetItemBubble,
  setHover,
  setUnHover,
  hover = false,
  target = false,
}) => {
  function onMouseEnter() {
    setItemBubble();
    setHover();
  }

  function onMouseLeave() {
    unSetItemBubble();
    setUnHover();
  }

  return (
    <Element
      width={width}
      height={height}
      x={x}
      y={y}
      fillColor={theme.types[type]}
      onDoubleClick={getNewFT}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        cursor: !target ? 'pointer' : 'default'
      }}
      rectStyle={
        target
          ? {
            strokeWidth: 5,
            stroke: 'rgb(248, 184, 76)',
          }
          : {

          }
      }
    >
      {hover ? (
        <rect
          width={width - 6}
          height={height - 6}
          x={x + 3}
          y={y + 3}
          stroke='#fff'
          strokeWidth={2}
          fill='none'
        />
      ) : null}
      <text
        x={x}
        y={y + Dimensions.ELEMENT_FONT_SIZE}
        dx={Dimensions.ELEMENT_BLOCK_PADDING}
        dy={Dimensions.ELEMENT_BLOCK_PADDING}
        strokeWidth={0}
      >
        {regNo}
      </text>
      <text
        x={x}
        y={y + height}
        dx={Dimensions.ELEMENT_BLOCK_PADDING}
        dy={-Dimensions.ELEMENT_BLOCK_PADDING - 3}
        fontWeight='bold'
        strokeWidth={0}
      >
        {title}
      </text>
    </Element>
  );
};

export default React.memo<IProps>(Item);