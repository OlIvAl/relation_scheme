import * as React from 'react';
import {ISvgRootModel} from '../../stores/FamilyTreeStore/interfaces';

interface IProps extends
  Pick<ISvgRootModel, 'svgWidth' | 'svgHeight' | 'svgPositionTop' | 'svgPositionLeft' | 'changeSvgPositionTop' | 'changeSvgPositionLeft' | 'scaleCoeff'> {

}

interface IState {
  movable: boolean;
  cursorPositionLeft: number;
  cursorPositionTop: number;
}

const style: React.CSSProperties = {
  position: 'absolute'
};

class SVGRoot extends React.PureComponent<IProps, IState> {
  ref: React.RefObject<SVGRectElement | null> = React.createRef<SVGRectElement>();

  state: IState;

  constructor(props: IProps) {
    super(props);

    this.state = {
      movable: false,
      cursorPositionLeft: 0,
      cursorPositionTop: 0,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount(): void {
    const rect: SVGRectElement | null = this.ref.current;

    if(rect) {
      // @ts-ignore
      rect.addEventListener('mousedown', this.onMouseDown, {capture: true, passive: true});
      // @ts-ignore
      rect.addEventListener('mousemove', this.onMouseMove, {capture: true, passive: true});
      rect.addEventListener('mouseup', this.onMouseUp, {capture: true, passive: true});
      rect.addEventListener('mouseleave', this.onMouseUp , {capture: true, passive: true});
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.setState({
      movable: true,
      cursorPositionLeft: event.clientX,
      cursorPositionTop: event.clientY,
    });
  }

  onMouseMove(event: MouseEvent): void {
    if(this.state.movable) {
      this.setState((
        state: IState,
        props: IProps
      ): Pick<IState, 'movable' | 'cursorPositionTop' | 'cursorPositionLeft'> => {
        const {
          clientX,
          clientY
        } = event;

        const {
          cursorPositionTop,
          cursorPositionLeft
        } = state;

        const {
          changeSvgPositionLeft,
          changeSvgPositionTop,
          svgPositionTop,
          svgPositionLeft
        } = props;

        const offsetX: number = cursorPositionLeft - clientX;
        const offsetY: number = cursorPositionTop - clientY;

        changeSvgPositionTop(svgPositionTop - offsetY);
        changeSvgPositionLeft(svgPositionLeft - offsetX);

        return {
          movable: true,
          cursorPositionLeft: clientX,
          cursorPositionTop: clientY,
        }
      });
    }
  }

  onMouseUp(): void {
    this.setState({
      movable: false,
      cursorPositionTop: 0,
      cursorPositionLeft: 0
    });
  }

  componentWillUnmount(): void {
    const rect: SVGRectElement | null = this.ref.current;

    if(rect) {
      // @ts-ignore
      rect.removeEventListener('onMouseDown', this.onMouseDown, {capture: true});
      // @ts-ignore
      rect.removeEventListener('onMouseMove', this.onMouseMove, {capture: true});
      rect.removeEventListener('onMouseUp', this.onMouseUp, {capture: true});
      rect.removeEventListener('onMouseLeave', this.onMouseUp , {capture: true});
    }
  }

  render(): React.ReactNode {
    const {
      svgWidth,
      svgHeight,
      svgPositionTop,
      svgPositionLeft,
      scaleCoeff,
      children
    } = this.props;

    const {
      movable
    } = this.state;

    const cursor: string = movable ? 'grabbing' : 'grab';

    return (
      <div
        style={{
          ...style,
          ...{
            width: svgWidth,
            height: svgHeight,
            top: svgPositionTop,
            left: svgPositionLeft
          }
        }}
        className={movable ? 'movable' : ''}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={svgWidth}
          height={svgHeight}
          viewBox={`-${svgWidth / 2 / scaleCoeff}`
            + ` -${svgHeight / 2 / scaleCoeff}`
            + ` ${svgWidth / scaleCoeff}`
            + ` ${svgHeight / scaleCoeff}`}
          preserveAspectRatio='none'
          fontFamily='Arial'
        >
          <rect
            // @ts-ignore
            ref={this.ref}
            x={-svgWidth / 2 / scaleCoeff}
            y={-svgHeight / 2 / scaleCoeff}
            width={svgWidth}
            height={svgHeight}
            fill={'#fff'}
            style={{
              cursor
            }}
          />
          {children}
        </svg>
      </div>
    );
  }
}

export default SVGRoot;