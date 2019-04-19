import {IBubble} from '../../interfaces';

export default
abstract class Bubble implements IBubble {
  abstract width: number;
  abstract height: number;

  abstract get positionTop(): number;
  abstract get positionLeft(): number;

  abstract get horizontalTailPosition(): 'left' | 'right';
  abstract get verticalTailPosition(): 'top' | 'bottom';
}