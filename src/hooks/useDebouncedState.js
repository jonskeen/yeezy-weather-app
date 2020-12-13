import { useMemo, useState } from "react";
import { debounce } from "utils";

export const useDebouncedState = (initialValue, wait = 300) => {
	const [ value, setValue ] = useState(initialValue)

	const debouncedSetValue = useMemo(() => debounce(setValue, wait), [ wait ]);

	return [ value, debouncedSetValue ];
};

export default useDebouncedState;