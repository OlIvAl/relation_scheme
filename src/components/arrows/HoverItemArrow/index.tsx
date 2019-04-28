import * as React from 'react';
import ItemArrow from '../ItemArrow';
import {IItemArrow} from '../../../stores/FamilyTreeStore/interfaces';
import {observer} from 'mobx-react-lite';

interface IProps {
  itemArrowProps: IItemArrow;
}

const {roles}: ITheme = window['theme'];

const HoverItemArrow: React.FC<IProps> = ({
  itemArrowProps
}): JSX.Element => {
  const arrowColor: string = roles[itemArrowProps.roleId] || '#000';

  function onMouseEnter(e: React.MouseEvent): void {
    console.log('HoverItemArrow onMouseEnter');
    itemArrowProps.setArrowBubble(e);
  }

  function onMouseLeave(): void {
    console.log('HoverItemArrow onMouseLeave');

    itemArrowProps.unSetArrowBubble();
    itemArrowProps.unSetHover();
  }

  return (
    <ItemArrow
      itemArrowProps={{
        d: itemArrowProps.d,
        strong: itemArrowProps.strong,
      }}
      stroke={arrowColor}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default React.memo<IProps>(observer(HoverItemArrow));