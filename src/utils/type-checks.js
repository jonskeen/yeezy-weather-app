export const isFunction = value => typeof value === "function";

export const isObject = value => typeof value === "object";

export const isNonEmptyArray = value => Array.isArray(value) && value.length > 0;

export const isNonEmptyString = value => {
	return typeof value === "string" && value.length > 0;
}

export const isNumber = value => typeof value === "number" && isFinite(value);

export const isNonEmptyObject = value => typeof value === "object" && Object.keys(value).length > 0;