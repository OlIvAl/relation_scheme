import * as React from 'react';
import {IRangeData} from '../../interfaces';
import useRangeInput from './hooks';

interface IRangeProps extends Pick<IRangeData, 'minRangeValue' | 'maxRangeValue'> {
  onChange: (val: number) => void;
}

const style: React.CSSProperties = {
  width: 150,
  height: 20,
  transformOrigin: '75px 75px',
  transform: 'rotate(270deg)',
  position: 'absolute',
  top: 20,
  left: 30,
  zIndex: 1
};

const Range: React.FC<IRangeProps> = ({
  minRangeValue,
  maxRangeValue,
  onChange
}): JSX.Element => {
  const [stateScaleCoeff, onRangeInputChange] = useRangeInput(onChange);

  const step: number = (maxRangeValue - minRangeValue) / 10;

  return (
    <input
      type="range"
      min={minRangeValue}
      max={maxRangeValue}
      step={step}
      value={stateScaleCoeff}
      onChange={onRangeInputChange}
      style={style}
    />
  )
};

export default React.memo<IRangeProps>(Range);