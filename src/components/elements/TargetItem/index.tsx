import * as React from 'react';
import {ITargetItemModel} from '../../../stores/FamilyTreeStore/interfaces';
import Item from '../Item';
import {observer} from 'mobx-react-lite';

function defaultHandler(): void {
  return undefined;
}

interface IProps {
  targetItemProps: Pick<ITargetItemModel, 'id' | 'regNo' | 'title' | 'itemBubbleInfo' | 'width' | 'height' | 'type' | 'setItemBubble' | 'unSetItemBubble' | 'hover' | 'setHover' | 'setUnHover' | 'redirectToInfoPage' | 'triggerFavorite'>;
}

const TargetItem: React.FC<IProps> = ({
  targetItemProps
}): JSX.Element => {
  return (
    <Item
      itemProps={{
        ...targetItemProps,
        setItemBubble: targetItemProps.setItemBubble,
        unSetItemBubble: targetItemProps.unSetItemBubble,
        setHover: targetItemProps.setHover,
        setUnHover: targetItemProps.setUnHover,
        x: -targetItemProps.width/2,
        y: -targetItemProps.height/2,
        getNewFT: defaultHandler
      }}
      target={true}
    />
  );
};

export default React.memo<IProps>(observer(TargetItem));