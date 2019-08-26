import * as React from 'react';

interface IState {
  movable: boolean;
  defPositionLeft: number;
  cursorPositionLeft: number;
  defPositionTop: number;
  cursorPositionTop: number;
}

interface IAction  {
  type: string;
  payload?: Partial<IState>;
}

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'initCursorPosition':
      if(!action.payload || !action.payload.cursorPositionLeft || !action.payload.cursorPositionTop) {
        return state;
      }

      return {
        ...state,
        movable: true,
        defPositionLeft: 0,
        cursorPositionLeft: action.payload.cursorPositionLeft,
        defPositionTop: 0,
        cursorPositionTop: action.payload.cursorPositionTop
      };
    case 'setCursorPosition':
      if(!action.payload || !action.payload.cursorPositionLeft || !action.payload.cursorPositionTop || !state.movable) {
        return state;
      }

      return {
        ...state,
        defPositionLeft: state.cursorPositionLeft - action.payload.cursorPositionLeft,
        cursorPositionLeft: action.payload.cursorPositionLeft,
        defPositionTop: state.cursorPositionTop - action.payload.cursorPositionTop,
        cursorPositionTop: action.payload.cursorPositionTop
      };
    case 'resetCursorPosition':
      return {
        ...state,
        movable: false,
        defPositionLeft: 0,
        cursorPositionLeft: 0,
        defPositionTop: 0,
        cursorPositionTop: 0
      };
    default:
      return state;
  }
}

export default
function useSvgRoot(
  ref: React.RefObject<SVGRectElement>,
  changeSvgPositionTop: (defSvgPositionTop: number) => void,
  changeSvgPositionLeft: (defSvgPositionLeft: number) => void
): boolean {
  const initialState: IState = {
    movable: false,
    defPositionLeft: 0,
    cursorPositionLeft: 0,
    defPositionTop: 0,
    cursorPositionTop: 0
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect((): () => void => {
    function onMouseDown({clientX, clientY}: MouseEvent): void {
      dispatch({
        type: 'initCursorPosition',
        payload: {
          cursorPositionLeft: clientX,
          cursorPositionTop: clientY
        }
      });
    }

    function onMouseMove({clientX, clientY}: MouseEvent): void {
      dispatch({
        type: 'setCursorPosition',
        payload: {
          cursorPositionLeft: clientX,
          cursorPositionTop: clientY
        }
      });
    }

    function onMouseUp(): void {
      dispatch({
        type: 'resetCursorPosition'
      });
    }

    const rect: SVGRectElement | null = ref.current;

    if(rect) {
      rect.addEventListener('mousedown', onMouseDown, {capture: true, passive: true});
      rect.addEventListener('mousemove', onMouseMove, {capture: true, passive: true});
      rect.addEventListener('mouseup', onMouseUp, {capture: true, passive: true});
      rect.addEventListener('mouseleave', onMouseUp , {capture: true, passive: true});
    }

    return (): void => {
      if(rect) {
        // @ts-ignore
        rect.removeEventListener('mousedown', onMouseDown, {capture: true});
        // @ts-ignore
        rect.removeEventListener('mousemove', onMouseMove, {capture: true});
        rect.removeEventListener('mouseup', onMouseUp, {capture: true});
        rect.removeEventListener('mouseleave', onMouseUp , {capture: true});
      }
    }
  }, [ref]);

  React.useEffect((): void => {
    changeSvgPositionLeft(state.defPositionLeft);
  }, [changeSvgPositionLeft, state.cursorPositionLeft, state.defPositionLeft]);

  React.useEffect((): void => {
    changeSvgPositionTop(state.defPositionTop);
  }, [changeSvgPositionTop, state.cursorPositionTop, state.defPositionTop]);

  return state.movable;
}