import * as React from 'react';
import Element from '../Element';
import {IItemModel} from '../../../stores/FamilyTreeStore/interfaces';
import Dimensions from '../../../stores/FamilyTreeStore/Dimensions';
import {observer} from 'mobx-react-lite';

interface IProps {
  itemProps: Pick<IItemModel, 'id' | 'regNo' | 'title' | 'width' | 'height' | 'x' | 'y' | 'type' | 'getNewFT' | 'setItemBubble' | 'unSetItemBubble' | 'hover' | 'setHover' | 'setUnHover' | 'redirectToInfoPage' | 'triggerFavorite'>;
  target?: boolean;
}

const {types}: ITheme = window['theme'];

const Item: React.FC<IProps> = ({
  itemProps,
  target = false,
}): JSX.Element => {
  function onMouseEnter(): void {
    itemProps.setItemBubble();
    itemProps.setHover();
  }

  function onMouseLeave(): void {
    itemProps.unSetItemBubble();
    itemProps.setUnHover();
  }

  return (
    <Element
      width={itemProps.width}
      height={itemProps.height}
      x={itemProps.x}
      y={itemProps.y}
      fillColor={types[itemProps.type]}
      onDoubleClick={itemProps.getNewFT}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        cursor: !target ? 'pointer' : 'default'
      }}
      rectStyle={
        target
          ? {
            strokeWidth: Dimensions.TARGET_ELEMENT_STROKE_WIDTH,
            stroke: 'rgb(248, 184, 76)',
          }
          : {}
      }
    >
      {itemProps.hover ? (
        <foreignObject
          x={itemProps.x + itemProps.width - Dimensions.ACTION_BUTTON_SIZE * 2 - 3 - 30}
          y={itemProps.y - Dimensions.ACTION_BUTTON_SIZE}
          width={Dimensions.ACTION_BUTTON_SIZE * 2 + 3}
          height={Dimensions.ACTION_BUTTON_SIZE}
        >
          <button
            onClick={itemProps.triggerFavorite}
            style={{
              marginRight: 3,
              width: Dimensions.ACTION_BUTTON_SIZE,
              height: Dimensions.ACTION_BUTTON_SIZE
            }}
          >
            FAV
          </button>
          <button
            onClick={itemProps.redirectToInfoPage}
            style={{
              width: Dimensions.ACTION_BUTTON_SIZE,
              height: Dimensions.ACTION_BUTTON_SIZE
            }}
          >
            LINK
          </button>
        </foreignObject>
      ) : null}
      {itemProps.hover ? (
        <rect
          width={itemProps.width - 6}
          height={itemProps.height - 6}
          x={itemProps.x + 3}
          y={itemProps.y + 3}
          stroke='#fff'
          strokeWidth={2}
          fill='none'
        />
      ) : null}
      <text
        x={itemProps.x}
        y={itemProps.y + Dimensions.ELEMENT_FONT_SIZE}
        dx={Dimensions.ELEMENT_BLOCK_PADDING}
        dy={Dimensions.ELEMENT_BLOCK_PADDING}
        strokeWidth={0}
      >
        {itemProps.regNo}
      </text>
      <text
        x={itemProps.x}
        y={itemProps.y + itemProps.height}
        dx={Dimensions.ELEMENT_BLOCK_PADDING}
        dy={-Dimensions.ELEMENT_BLOCK_PADDING - 3}
        fontWeight='bold'
        strokeWidth={0}
      >
        {itemProps.title}
      </text>
    </Element>
  );
};

export default React.memo<IProps>(observer(Item));