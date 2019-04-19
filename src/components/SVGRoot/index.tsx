import * as React from 'react';
import {ISvgRootData, IViewPortData} from '../../interfaces';
import useSvgRoot from './hooks';

interface IProps extends Pick<ISvgRootData, 'svgWidth' | 'svgHeight' | 'parentHalfHeight' | 'svgPositionTop' | 'svgPositionLeft' | 'changeSvgPositionTop' | 'changeSvgPositionLeft' | 'scaleCoeff'>,
  Pick<IViewPortData, 'viewPortWidth' | 'viewPortHeight'> {
  children: React.ReactNode;
}

const SVGRoot: React.FC<IProps> = ({
  svgWidth,
  svgHeight,
  viewPortWidth,
  viewPortHeight,
  parentHalfHeight,
  svgPositionTop,
  svgPositionLeft,
  scaleCoeff,
  changeSvgPositionTop,
  changeSvgPositionLeft,
  children
}): JSX.Element => {
  const ref: React.RefObject<SVGRectElement> | null = React.useRef<SVGRectElement>(null);

  const movable: boolean = useSvgRoot(
    ref,
    changeSvgPositionTop,
    changeSvgPositionLeft
  );

  const cursor: string = movable ? 'grabbing' : 'grab';

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={svgWidth}
      height={svgHeight}
      viewBox={`${-svgWidth / 2} ${-parentHalfHeight} ${svgWidth} ${svgHeight}`}
      preserveAspectRatio='none'
      className={movable ? 'movable' : ''}
      style={{
        fontFamily: 'Arial',
        transformOrigin: `${-svgPositionLeft + viewPortWidth / 2}px ${-svgPositionTop + viewPortHeight / 2}px`,
        transform: `translate(${svgPositionLeft}px, ${svgPositionTop}px) scale(${scaleCoeff})`,
        willChange: 'transform'
      }}
    >
      <rect
        ref={ref}
        x={-svgWidth / 2}
        y={-parentHalfHeight}
        width={svgWidth}
        height={svgHeight}
        fill={'#fff'}
        style={{
          cursor
        }}
      />
      {children}
    </svg>
  );
};

export default React.memo<IProps>(SVGRoot);