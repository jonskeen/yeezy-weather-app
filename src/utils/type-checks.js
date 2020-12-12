export const isObject = value => typeof value === "object";

export const isNonEmptyString = value => {
	return typeof value === "string" && value.length > 0;
}

