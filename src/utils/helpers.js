import { isNonEmptyString, isObject } from "utils/type-checks";

/*
 * Expects a hash of { className => bool }
 */
export const reduceClassNames = classHash => {
	const matchingKeys = [];
	const keys = isObject(classHash)
		? Object.keys(classHash)
		: [];

	keys.forEach(key => {
		const isValidClassName = isNonEmptyString(key) && classHash.hasOwnProperty(key);

		if (isValidClassName && classHash[key] === true) {
			matchingKeys.push(key);
		}
	});

	return matchingKeys.join(" ");
};