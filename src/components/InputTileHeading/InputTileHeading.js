import React from "react";
import PropTypes from "prop-types";
import { isNonEmptyString, isNumber } from "utils";

import styles from "./styles.css";


const InputTileHeading = ({ label, unit, value }) => {
	const hasLabel = isNonEmptyString(label);
	const hasValue = isNonEmptyString(value) || isNumber(value);

	return hasLabel || hasValue
		? (
			<h2 data-component="InputTileHeading" className={styles.inputTileHeading}>
				{hasLabel && <span>{label}</span>}
				{hasValue && <span>{value} {unit}</span>}
			</h2>
		)
		: "";
};

InputTileHeading.propTypes = {
	label: PropTypes.string,
	unit: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])
};

export default InputTileHeading;