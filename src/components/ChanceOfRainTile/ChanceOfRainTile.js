import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
	VictoryGroup,
	VictoryChart,
	VictoryAxis,
	VictoryArea,
	VictoryLegend
} from "victory";
import { isNonEmptyArray, isNonEmptyObject, calculateChanceOfRain, isNumber } from "utils";
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
		const hasRainfallData = isNonEmptyArray(rainfallData);
		const hasTemperature = isNumber(temperature);
		const hasPressure = isNumber(pressure);

		if (!hasRainfallData || !hasTemperature || !hasPressure) {
			return undefined;
		}

		rainfallData.forEach(({ amount }, index) => {
			const { lowerBound, mean, upperBound } = calculateChanceOfRain(pressure, temperature, amount)
			lowerBoundSeries.push({ x: index + 1, y: lowerBound });
			meanSeries.push({ x: index + 1, y: mean });
			upperBoundSeries.push({ x: index + 1, y: upperBound });
		});

		return {
			lowerBound: lowerBoundSeries,
			mean: meanSeries,
			upperBound: upperBoundSeries
		};
	}, [ pressure, rainfallData, temperature ]);

	const hasData = isNonEmptyObject(chanceOfRainData);
	const colorScale = [ "#004c8e", "#016ac8", "#012c60" ]

	return (
		<div data-component="RainfallAmountTile">
			<PaddedCell>
				{loading
					? <LoadingIndicator />
					: hasData
						? (
							<VictoryChart padding={{ top: 10, right: 10, bottom: 80, left: 40 }} animate={{ duration: 1000 }} domain={{x: [1, 7], y: [0, 100]}} >
								<VictoryAxis dependentAxis tickFormat={y => `${y}%`} />
								<VictoryAxis tickFormat={x => moment().add(x, "days").format("dd")} />
								<VictoryGroup colorScale={colorScale}>
									<VictoryArea data={chanceOfRainData.upperBound} interpolation={"basis"} />
									<VictoryArea data={chanceOfRainData.mean} interpolation={"basis"} />
									<VictoryArea data={chanceOfRainData.lowerBound} interpolation={"basis"}  />
								</VictoryGroup>

								<VictoryLegend x={100} y={270}
								               orientation="horizontal"
								               gutter={15}
								               colorScale={colorScale}
								               data={[
									               { name: "Upper Bound" }, { name: "Mean" }, { name: "Lower Bound" }
								               ]}
								/>
							</VictoryChart>
						)
						: <span>There was a problem pulling data</span>
				}
			</PaddedCell>
		</div>
	);
};

ChanceOfRainTile.propTypes = {};

export default ChanceOfRainTile;