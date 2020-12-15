import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { isFunction, isNonEmptyString } from "utils";
import { useRangeBoundValue } from "hooks";
import BarSlider from "components/BarSlider";
import InputTileHeading from "components/InputTileHeading";
import PaddedCell from "components/PaddedCell";


const TemperatureTile = ({
	onChange,
	defaultValue,
	className
}) => {
	const minValue = 10;
	const maxValue = 35;
	const [ temperature, setTemperature ] = useRangeBoundValue(defaultValue, minValue, maxValue);

	const handleChange = useCallback(({ value }) => {
		const roundedValue = Math.round(value);

		if (roundedValue !== temperature) {
			setTemperature(roundedValue);
		}
	}, [ setTemperature, temperature ]);

	useEffect(() => {
		if (isFunction(onChange)) {
			onChange({ value: temperature });
		}
	}, [ onChange, temperature ]);

	return (
		<PaddedCell dataComponent="TemperatureTile" className={isNonEmptyString(className) ? className : ""}>
			<InputTileHeading label="Temperature" unit="&deg;C" value={temperature} />
			<BarSlider minValue={minValue} maxValue={maxValue} onChange={handleChange} value={temperature} />
		</PaddedCell>
	);
};

TemperatureTile.propTypes = {
	onChange: PropTypes.func
};

export default TemperatureTile;