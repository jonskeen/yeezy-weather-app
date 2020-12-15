import { useMemo } from "react";

export const useSafeRangeBounds = (incomingMaxValue, incomingMinValue) => {
	return useMemo(() => {
		const intMinValue = parseInt(incomingMinValue, 10);
		const intMaxValue = parseInt(incomingMaxValue, 10);

		return intMinValue <= intMaxValue
			? [ intMinValue, intMaxValue ]
			: [ intMaxValue, intMinValue ]
	}, [ incomingMinValue, incomingMaxValue ]);
}