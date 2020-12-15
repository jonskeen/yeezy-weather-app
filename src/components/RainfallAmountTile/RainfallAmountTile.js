import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { isNonEmptyString } from "utils";
import LoadingIndicator from "components/LoadingIndicator";
import PaddedCell from "components/PaddedCell";

import styles from "./styles.css";


const RainfallAmountTile = ({ loading, data, className }) => {
	return (
		<PaddedCell dataComponent="RainfallAmountTile" className={isNonEmptyString(className) ? className : ""}>
			{loading
				? <LoadingIndicator/>
				: (
					<div className={styles.layout}>
						<h2 className={styles.title}>Rainfall Amount</h2>
						<VictoryChart domainPadding={20}
						              padding={{ left: 55, top: 10, bottom: 60, right: 10 }}
						              height={235}
						>
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
					</div>
				)
			}
		</PaddedCell>
    );
};

RainfallAmountTile.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			day: PropTypes.number.isRequired,
			amount: PropTypes.number.isRequired
		})
	).isRequired,
	className: PropTypes.string
};

export default RainfallAmountTile;