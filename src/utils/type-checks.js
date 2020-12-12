export const isFunction = value => typeof value === "function";

export const isObject = value => typeof value === "object";

export const isNonEmptyString = value => {
	return typeof value === "string" && value.length > 0;
}

export const isNumber = value => typeof value === "number" && isFinite(value);