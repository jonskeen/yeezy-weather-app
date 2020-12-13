import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { isFunction } from "utils";
import { useRangeBoundValue } from "hooks";
import BarSlider from "components/BarSlider";
import PaddedCell from "components/PaddedCell";
import InputTileHeading from "components/InputTileHeading";

import styles from "./styles.css";


const PressureTile = ({
	onChange,
	defaultValue
}) => {
	const minValue = 970;
	const maxValue = 1030;
	const [ pressure, setPressure ] = useRangeBoundValue(defaultValue, minValue, maxValue);

	const handleChange = useCallback(({ value }) => {
		const roundedValue = Math.round(value);

		if (roundedValue !== pressure) {
			setPressure(roundedValue);
		}
	}, [ pressure, setPressure ]);

	useEffect(() => {
		if (isFunction(onChange)) {
			onChange({ value: pressure });
		}
	}, [ onChange, pressure ])

	return (
		<PaddedCell>
			<InputTileHeading label="Pressure" value={pressure} unit="hPa" />
			<BarSlider minValue={minValue} maxValue={maxValue} onChange={handleChange} value={pressure} />
		</PaddedCell>
	);
};

PressureTile.propTypes = {
	onChange: PropTypes.func
};

export default PressureTile;