import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import LoadingIndicator from "components/LoadingIndicator";
import PaddedCell from "components/PaddedCell";

import styles from "./styles.css";


const RainfallAmountTile = ({ loading, data }) => {
	return (
		<div data-component="RainfallAmountTile">
			<PaddedCell>
				{loading
					? (
						<LoadingIndicator/>
					)
					: (
						<VictoryChart domainPadding={20} padding={{ left: 55, top: 10, bottom: 30, right: 10 }}>
							<VictoryAxis tickFormat={x => moment().add(x, "days").format("dd")} />
							<VictoryAxis dependentAxis label={"l\\m2"} style={{
									axisLabel: { padding: 40 }
								}}
							/>
							<VictoryBar data={data} x="day" y="amount" style={{
					                data: { fill: "#004c8e" }
					            }}
							/>
						</VictoryChart>
					)
				}
			</PaddedCell>
		</div>
    );
};

RainfallAmountTile.propTypes = {};

export default RainfallAmountTile;