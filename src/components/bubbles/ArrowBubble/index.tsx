import * as React from 'react';
import {Currency, IArrowBubble} from '../../../stores/FamilyTreeStore/interfaces';
import Bubble from '../Bubble';
import {II18nStore} from '../../../stores/I18nStore/interfaces';

interface IProps extends
  Pick<IArrowBubble, 'arrow' | 'partCur' | 'partSum' | 'percent' | 'startDate' | 'quitDate' | 'position' |  'width' | 'height' | 'positionTop' | 'positionLeft' | 'verticalTailPosition' | 'horizontalTailPosition'>,
  Pick<II18nStore, 't'> {

}

const ArrowBubble: React.FC<IProps> = ({
                                        arrow,
                                        partCur,
                                        partSum,
                                        percent,
                                        startDate,
                                        quitDate,
                                        position,
                                        width,
                                        height,
                                        positionTop,
                                        positionLeft,
                                        horizontalTailPosition,
                                        verticalTailPosition,
                                        t
                                      }): JSX.Element => (
  <Bubble
    width={width}
    height={height}
    positionTop={positionTop}
    positionLeft={positionLeft}
    horizontalTailPosition={horizontalTailPosition}
    verticalTailPosition={verticalTailPosition}
  >
    {getString(arrow.roleId, partCur, partSum, percent, startDate, quitDate, position, t)}
  </Bubble>
);

function getString(
  roleId: number,
  partCur: Currency,
  partSum: number,
  percent: number,
  startDate: string,
  quitDate: string,
  position: string,
  t: (key: string) => string
): string {
  let string: string;

  if(Number(roleId) === 1) {
    string = `${partCur ? `${partCur} ` : ''}`
      + `${partSum ? `${partSum.toFixed(2)} ` : ''}`
      + `${percent ? `(${percent.toFixed(2)}) ` : ''}`
      + `${startDate ? `c ${new Date(startDate).toLocaleDateString('ru')} ` : ''}`
      + `${quitDate ? `по ${new Date(quitDate).toLocaleDateString('ru')}` : ''}`;
  } else {
    string = `${position ? `${position} ` : ''}`
      + `${startDate ? `${t('bubble:from')} ${new Date(startDate).toLocaleDateString('ru')} ` : ''}`
      + `${quitDate ? `${t('bubble:until')} ${new Date(quitDate).toLocaleDateString('ru')}` : ''}`;
  }

  return string;
}

export default ArrowBubble;