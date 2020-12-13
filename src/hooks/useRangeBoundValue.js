import { useCallback, useState } from "react";
import { isNumber } from "utils";

export const useRangeBoundValue = (initialValue, minValue, maxValue) => {
	const isValueTooHigh = useCallback(value => {
		return value > maxValue;
	}, [ maxValue]);

	const isValueTooLow = useCallback(value => {
		return value < minValue;
	}, [ minValue]);

	const getConstrainedValue = useCallback(suggestedValue => {
		if (!isNumber(suggestedValue)) {
			return Math.round((minValue + maxValue) / 2)
		}

		if (isValueTooLow(suggestedValue)) {
			return minValue;
		}

		if (isValueTooHigh(suggestedValue)) {
			return maxValue;
		}

		return suggestedValue;
	}, [ isValueTooHigh, isValueTooLow, maxValue, minValue ]);

	const [ value, _setValue ] = useState(getConstrainedValue(initialValue));

	const setValue = useCallback(value => {
		_setValue(getConstrainedValue(value));
	}, [ getConstrainedValue ]);

	return [ value, setValue ];
}

export default useRangeBoundValue;