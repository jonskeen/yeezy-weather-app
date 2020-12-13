import React, { useMemo } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
	VictoryGroup,
	VictoryChart,
	VictoryAxis,
	VictoryArea,
	VictoryLegend
} from "victory";
import {
	isNonEmptyArray,
	isNonEmptyObject,
	calculateChanceOfRain,
	isNumber,
	isNonEmptyString
} from "utils";
import LoadingIndicator from "components/LoadingIndicator";
import PaddedCell from "components/PaddedCell";

import styles from "./styles.css";

const ChanceOfRainTile = ({
	loading,
	data: rainfallData,
	temperature,
	pressure,
	className
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
		<PaddedCell dataComponent="RainfallAmountTile" className={isNonEmptyString(className) ? className : ""}>
			{loading
				? <LoadingIndicator />
				: hasData
					? (
						<div className={styles.layout}>
							<h2 className={styles.title}>Chance of Rain</h2>
							<VictoryChart
								animate={{ duration: 1000 }}
								domain={{
									x: [ 1, 7 ], y: [ 0, 100 ],
								}}
								padding={{ top: 10, right: 10, bottom: 90, left: 40, }}
								// height={"100%"}
							>
								<VictoryAxis dependentAxis tickFormat={y => `${y}%`} />
								<VictoryAxis tickFormat={x => moment().add(x, "days").format("dd")} />
								<VictoryGroup colorScale={colorScale}>
									<VictoryArea data={chanceOfRainData.upperBound} interpolation={"basis"} />
									<VictoryArea data={chanceOfRainData.mean} interpolation={"basis"} />
									<VictoryArea data={chanceOfRainData.lowerBound} interpolation={"basis"}  />
								</VictoryGroup>

								<VictoryLegend x={100} y={240}
								               orientation="horizontal"
								               colorScale={colorScale}
								               data={[
									               { name: "Upper Bound" }, { name: "Mean" }, { name: "Lower Bound" }
								               ]}
								/>
							</VictoryChart>
						</div>
					)
					: <span>There was a problem pulling data</span>
			}
		</PaddedCell>
	);
};

ChanceOfRainTile.propTypes = {};

export default ChanceOfRainTile;