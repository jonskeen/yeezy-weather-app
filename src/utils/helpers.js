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

export const calculateChanceOfRain = (pressure, temperature, amount) => {
	const score = Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);
	const mean = Math.min(Math.max(score, 0), 100);
	const upperBound = Math.min(1.5 * mean, 100);
	const lowerBound = Math.max(0.5 * mean, 0);

	return { lowerBound, mean, upperBound };
}

export const debounce = (callback, wait = 300) => {
	let timeout;

	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(...args), wait);
	};
};

export const keyCodes = {
	leftArrow: 37,
	rightArrow: 39
}