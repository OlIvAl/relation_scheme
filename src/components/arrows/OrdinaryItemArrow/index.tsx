import * as React from 'react';
import ItemArrow from '../ItemArrow';
import {IItemArrow, IRoleModel} from '../../../stores/FamilyTreeStore/interfaces';
import {observer} from 'mobx-react-lite';
import Color from 'color';

function getColorWithOpacity(curColor: string, alpha: number, bgColor: string = 'rgb(255, 255, 255)'): string {
  const curColorObj: Color = Color(curColor);
  const bgColorObj: Color = Color(bgColor);

  const r1: number = curColorObj.red();
  const g1: number = curColorObj.green();
  const b1: number = curColorObj.blue();

  const r2: number = bgColorObj.red();
  const g2: number = bgColorObj.green();
  const b2: number = bgColorObj.blue();

  const r3: number = r2 + (r1 - r2) * alpha;
  const g3: number = g2 + (g1 - g2) * alpha;
  const b3: number = b2 + (b1 - b2) * alpha;

  const opacityColorObj: Color = Color({r: r3, g: g3, b: b3});

  return opacityColorObj.rgb().string();
}

const {roles}: ITheme = window['theme'];

interface IProps extends Pick<IRoleModel, 'relation'> {
  itemArrowProps: IItemArrow;
}

const OrdinaryItemArrow: React.FC<IProps> = ({
  itemArrowProps,
  relation
}): JSX.Element => {
  const arrowColor: string = roles[itemArrowProps.roleId] || '#000';
  const stroke: string = !itemArrowProps.hoverArrowExist
    ? arrowColor
    : getColorWithOpacity(arrowColor, 0.5);

  function onMouseEnter(): void {
    itemArrowProps.setHover();
  }

  function onMouseLeave(): void {
    itemArrowProps.unSetHover();
  }

  return (
    <>
      {(itemArrowProps.relationInfo && itemArrowProps.relationInfo.percent) ? (
        <text
          x={itemArrowProps.itemX - 35}
          y={itemArrowProps.itemY}
          dx={-10}
          dy={(relation > 0) ? -4 : 13}
          fontSize={12}
          fontFamily='Arial'
          strokeWidth={0}
          fill={roles[itemArrowProps.roleId]}
        >
          {itemArrowProps.relationInfo.percent}%
        </text>
      ) : null}
      <ItemArrow
        itemArrowProps={{
          d: itemArrowProps.d,
          strong: itemArrowProps.strong,
        }}
        stroke={stroke}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </>
  );
};

export default React.memo<IProps>(observer(OrdinaryItemArrow));