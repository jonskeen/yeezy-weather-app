import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { VictoryGroup, VictoryChart, VictoryAxis, VictoryArea } from "victory";
import { isNonEmptyArray, calculateChanceOfRain } from "utils";
import LoadingIndicator from "components/LoadingIndicator";
import PaddedCell from "components/PaddedCell";
import moment from "moment";


const ChanceOfRainTile = ({
	loading,
	data: rainfallData,
	temperature,
	pressure
}) => {
	const chanceOfRainData = useMemo(() => {
		const lowerBoundSeries = [];
		const meanSeries = [];
		const upperBoundSeries = [];

		if (isNonEmptyArray(rainfallData)) {
			rainfallData.forEach(({ amount }, index) => {
				const { lowerBound, mean, upperBound } = calculateChanceOfRain(pressure, temperature, amount)
				lowerBoundSeries.push({ x: index + 1, y: lowerBound });
				meanSeries.push({ x: index + 1, y: mean });
				upperBoundSeries.push({ x: index + 1, y: upperBound });
			});
		}

		return {
			lowerBound: lowerBoundSeries,
			mean: meanSeries,
			upperBound: upperBoundSeries
		};
	}, [ pressure, rainfallData, temperature ]);

	return (
		<div data-component="RainfallAmountTile">
			<PaddedCell>
				{loading
					? (
						<LoadingIndicator />
					)
					: (
						<VictoryChart animate={{ duration: 1000 }} domain={{x: [1, 7], y: [0, 100]}} >
							<VictoryAxis dependentAxis tickFormat={y => `${y}%`} />
							<VictoryAxis tickFormat={x => moment().add(x, "days").format("dd")} />
							<VictoryGroup colorScale="blue">
								<VictoryArea data={chanceOfRainData.upperBound} interpolation={"basis"} />
								<VictoryArea data={chanceOfRainData.mean} interpolation={"basis"} />
								<VictoryArea data={chanceOfRainData.lowerBound} interpolation={"basis"}  />
							</VictoryGroup>
						</VictoryChart>
					)
				}
			</PaddedCell>
		</div>
	);
};

ChanceOfRainTile.propTypes = {};

export default ChanceOfRainTile;