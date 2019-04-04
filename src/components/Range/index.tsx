import * as React from 'react';

interface RangeProps {
  minRangeValue: number;
  maxRangeValue: number;
  scaleCoeff: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

const Range: React.FC<RangeProps> = ({
  minRangeValue,
  maxRangeValue,
  scaleCoeff,
  onChange
}): JSX.Element => (
  <input
    type="range"
    min={minRangeValue}
    max={maxRangeValue}
    step={(maxRangeValue - minRangeValue) / 10}
    value={scaleCoeff}
    onChange={onChange}
    style={style}
  />
);

export default Range;