import * as React from 'react';
import {IBubble} from '../../../stores/FamilyTreeStore/interfaces';

enum Padding {
  RIGHT_LEFT_PADDING = 35,
  TOP_BOTTOM_PADDING = 30
}

function calcD(
  position: string,

  width: number,
  height: number,

  topBottomPadding: number,
  leftRightPadding: number
): string {
  switch (position) {
    case 'bottom right':
      return `M${width} ${height} `
        + `l${-(leftRightPadding + 5)} ${-topBottomPadding}`
        + `h ${-(width - leftRightPadding - 5)}`
        + `v ${-(height - topBottomPadding)}`
        + `h ${width - leftRightPadding}`
        + `v ${height - topBottomPadding - 5}`
        + `z`;
    case 'bottom left':
      return `M0 ${height}`
        + `l${leftRightPadding + 5} ${-topBottomPadding}`
        + `h ${width - leftRightPadding - 5}`
        + `v ${-(height - topBottomPadding)}`
        + `h ${-(width - leftRightPadding)}`
        + `v ${height - topBottomPadding - 5}`
        + `z`;
    case 'top right':
      return `M${width} 0 `
        + `l${-(leftRightPadding + 5)} ${topBottomPadding}`
        + `h ${-(width - leftRightPadding - 5)}`
        + `v ${height - topBottomPadding}`
        + `h ${width - leftRightPadding}`
        + `v ${-(height - topBottomPadding - 5)}`
        + `z`;
    case 'top left':
      return `M0 0 `
        + `l${leftRightPadding + 5} ${topBottomPadding}`
        + `h ${width - leftRightPadding - 5}`
        + `v ${height - topBottomPadding}`
        + `h ${-(width - leftRightPadding)}`
        + `v ${-(height - topBottomPadding - 5)}`
        + `z`;
    default:
      return '';
  }
}

interface IProps extends Pick<IBubble, 'width' | 'height' | 'positionTop' | 'positionLeft' | 'verticalTailPosition' | 'horizontalTailPosition'>{

}

const Bubble: React.FC<IProps> = ({
  width,
  height,
  positionTop,
  positionLeft,
  horizontalTailPosition,
  verticalTailPosition,
  children
}): JSX.Element => {
  // ToDo: memo
  const d: string = calcD(
    `${verticalTailPosition} ${horizontalTailPosition}`,
    width,
    height,
    Padding.TOP_BOTTOM_PADDING,
    Padding.RIGHT_LEFT_PADDING
  );
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,` +
          `<svg xmlns='http://www.w3.org/2000/svg' ` +
          `viewBox='0 0 ${width + 1} ${height + 1}'>` +
          `<path d='${d}' fill='rgb(255, 252, 195)' stroke-width='1' stroke='rgb(108, 108, 108)' />` +
          `</svg>")`,
        backgroundRepeat: 'no-repeat',
        width: width,
        height: height,
        position: 'absolute',
        top: positionTop,
        left: positionLeft,
        zIndex: 2,

        fontFamily: 'Arial',
        fontSize: 12,
        paddingTop: (verticalTailPosition === 'top') ? 10 + Padding.TOP_BOTTOM_PADDING : 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: (horizontalTailPosition === 'left') ? 10 + Padding.RIGHT_LEFT_PADDING : 10,
        boxSizing: 'border-box',
        lineHeight: 1.5
      }}
    >
      {children}
    </div>
  )
};

export default Bubble;