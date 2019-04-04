import * as React from 'react';
import {IViewPortModel} from '../../stores/FamilyTreeStore/interfaces';

interface IProps extends Pick<IViewPortModel, 'viewPortWidth' | 'viewPortHeight'>{
  children: React.ReactNode
}

const style: React.CSSProperties = {
  border: '1px solid #000',
  position: 'relative',
  overflow: 'hidden',
  margin: 10,
  background: '#fff'
};

const ViewPort = React.forwardRef<HTMLDivElement | null, IProps>(
  (
    {
      children,
      viewPortWidth,
      viewPortHeight
    }: IProps,
    ref: React.Ref<HTMLDivElement | null>
  ): JSX.Element => (
    <div
      // @ts-ignore
      ref={ref}
      style={{
        ...style,
        ...{
          width: viewPortWidth,
          height: viewPortHeight
        }
      }}
    >
      {children}
    </div>
  )
);

export default ViewPort;