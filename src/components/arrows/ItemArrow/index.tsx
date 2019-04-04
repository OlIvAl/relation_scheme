import * as React from 'react';
import Arrow from '../Arrow';
import {IItemArrow, IItemsGroup, IRoleModel} from '../../../stores/FamilyTreeStore/interfaces';
import Color from 'color';

interface IProps extends Pick<IItemArrow, 'd' | 'roleId' | 'itemX' | 'itemY' | 'relationInfo' | 'setArrowBubble' | 'unSetArrowBubble' | 'strong' | 'notHover'>,
  Pick<IItemsGroup, 'unSetHoverArrow'>, Pick<IRoleModel, 'relation'> {
  setHoverArrow: () => void;
}

const theme: any = window['theme'];

const ItemArrow: React.FC<IProps> = ({
  d,
  roleId,
  relationInfo,
  strong,
  notHover,
  itemX,
  itemY,
  relation,
  setArrowBubble,
  unSetArrowBubble,
  setHoverArrow,
  unSetHoverArrow
}) => {
  function onMouseEnter(e: React.MouseEvent) {
    setArrowBubble(e);
    setHoverArrow();
  }

  function onMouseLeave() {
    unSetArrowBubble();
    unSetHoverArrow();
  }

  return (
    <>
      {(relationInfo && relationInfo.percent) ? (
        <text
          x={itemX - 35}
          y={itemY}
          dx={-10}
          dy={(relation > 0) ? -4 : 13}
          fontSize={12}
          fontFamily='Arial'
          strokeWidth={0}
          // @ts-ignore
          fill={window.theme.roles[roleId]}
        >
          {relationInfo.percent}%
        </text>
      ) : null}
      <Arrow
        d={d}
        strokeWidth={strong ? 4 : 2}
        stroke={!notHover
          ? (theme.roles![roleId] || '#000')
          : getColorWithOpacity(theme.roles![roleId] || '#000', 0.5)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </>
  )
};

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

export default React.memo<IProps>(ItemArrow);