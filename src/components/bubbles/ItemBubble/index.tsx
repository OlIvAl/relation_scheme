import * as React from 'react';
import {IItemBubble} from '../../../stores/FamilyTreeStore/interfaces';
import Bubble from '../Bubble';
import {II18nStore} from '../../../stores/I18nStore/interfaces';

interface IProps extends
  Pick<IItemBubble, 'legalForm' | 'address' | 'regDate' | 'capCur' | 'capSum' | 'capFullyPaid' | 'width' | 'height' | 'positionTop' | 'positionLeft' | 'verticalTailPosition' | 'horizontalTailPosition'>,
  Pick<II18nStore, 't'> {

}

const ItemBubble: React.FC<IProps> = ({
                                        legalForm,
                                        address,
                                        regDate,
                                        capCur,
                                        capSum,
                                        capFullyPaid,
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
    {legalForm ? <div>{t('bubble:legalForm')}: {legalForm}</div> : null}
    {address ? <div>{t('bubble:address')}: {address}</div> : null}
    {regDate ? <div>{t('bubble:regDate')}: {regDate}</div> : null}
    {(capSum && capCur && capFullyPaid)
      ? <div>{t('bubble:shareCapital')}: {capCur}{capSum}, {capFullyPaid ? t('bubble:fullyPaid') : null}</div>
      : null}
  </Bubble>
);

export default ItemBubble;