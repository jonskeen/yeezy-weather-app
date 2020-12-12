import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { isFunction } from "utils";
import BarSlider from "components/BarSlider";
import InputTileHeading from "components/InputTileHeading";
import PaddedCell from "components/PaddedCell";

import styles from "./styles.css";


const TemperatureTile = ({
	onChange
}) => {
	const minValue = 10;
	const maxValue = 35;
	const [ temperature, setTemperature ] = useState(minValue);

	const handleChange = useCallback(({ value }) => {
		const roundedValue = Math.round(value);

		if (roundedValue !== temperature) {
			setTemperature(roundedValue);

			if (isFunction(onChange)) {
				onChange({ value: roundedValue });
			}
		}
	}, [ onChange, temperature ]);

	return (
		<PaddedCell>
			<InputTileHeading label="Temperature" unit="&deg;C" value={temperature} />
			<BarSlider minValue={minValue} maxValue={maxValue} onChange={handleChange} value={temperature} />
		</PaddedCell>
	);
};

TemperatureTile.propTypes = {
	onChange: PropTypes.func
};

export default TemperatureTile;