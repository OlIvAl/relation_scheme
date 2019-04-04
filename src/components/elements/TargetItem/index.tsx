import * as React from 'react';
import {ITargetItemModel} from '../../../stores/FamilyTreeStore/interfaces';
import Item from '../Item';

function defaultHandler() {
  return undefined;
}

interface IProps extends Pick<ITargetItemModel, 'id' | 'regNo' | 'title' | 'itemBubbleInfo' | 'width' | 'height' | 'type' | 'setItemBubble' | 'unSetItemBubble' | 'hover' | 'setHover' | 'setUnHover'> {

}

const TargetItem: React.FC<IProps> = ({
  id,
  regNo,
  title,
  width,
  height,
  type,
  hover,
  setHover,
  setUnHover,
  setItemBubble,
  unSetItemBubble
}): JSX.Element => (
  <Item
    id={id}
    width={width}
    height={height}
    x={-width/2}
    y={-height/2}
    type={type}
    regNo={regNo}
    title={title}
    hover={hover}
    target={true}
    getNewFT={defaultHandler}
    setHover={setHover}
    setUnHover={setUnHover}
    setItemBubble={setItemBubble}
    unSetItemBubble={unSetItemBubble}
  />
);

export default React.memo<IProps>(TargetItem);