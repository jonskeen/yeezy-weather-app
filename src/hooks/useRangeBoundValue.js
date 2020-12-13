import { useCallback, useState } from "react";
import { isNumber } from "utils";

export const useRangeBoundValue = (initialValue, minValue, maxValue) => {
	const avgValue = Math.round((minValue + maxValue) / 2)

	const isValueValid = useCallback(value => {
		return isNumber(value) && value >= minValue && value <= maxValue;
	}, [ maxValue, minValue ]);

	const [ value, _setValue ] = useState(isValueValid(initialValue) ? initialValue : avgValue);

	const setValue = useCallback(value => {
		if (isValueValid(value)) {
			_setValue(value);
		} else {
			console.warn(`Invalid value ${value} provided, use a value between ${minValue} and ${maxValue} inclusive.`)
		}
	}, [ isValueValid, minValue, maxValue ]);


	return [ value, setValue ];
}

export default useRangeBoundValue;