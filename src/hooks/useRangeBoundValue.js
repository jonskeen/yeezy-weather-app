import { useCallback, useMemo, useState } from "react";
import { isNumber } from "utils";
import { useSafeRangeBounds } from "hooks/useSafeRangeBounds";

export const useRangeBoundValue = (initialValue, incomingMinValue, incomingMaxValue) => {
	const intValue = useMemo(() => parseInt(initialValue, 10), [ initialValue]);
	const [ minValue, maxValue ] = useSafeRangeBounds(incomingMinValue, incomingMaxValue);

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

	const [ value, _setValue ] = useState(getConstrainedValue(intValue));

	const setValue = useCallback(value => {
		_setValue(getConstrainedValue(value));
	}, [ getConstrainedValue ]);

	return [ value, setValue ];
}

export default useRangeBoundValue;