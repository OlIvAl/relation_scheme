import * as React from 'react';
import debounce from 'lodash.debounce';

export default
function useRangeInput(onChangeFromProp: (val: number) => void): [number, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [scaleCoeff, setScaleCoeff] = React.useState(1);

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();

    const newScateCoef: number = parseFloat(e.target.value);

    // меняем на виджете
    setScaleCoeff(newScateCoef);

    const debounceOnRangeInputChange = debounce(onChangeFromProp, 100);
    // меняем в store
    debounceOnRangeInputChange(newScateCoef);
  }

  return [scaleCoeff, onChange];
}