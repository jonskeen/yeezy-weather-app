import React, { useMemo } from "react";
import PropTypes from "prop-types";
import BarSlider from "components/BarSlider";
import CommonPadding from "components/CommonPadding";
import PaddedCell from "components/PaddedCell";

import styles from "./styles.css";

const Dashboard = () => {
	const onChange = ({ value }) => console.log("Dashboard got %i", value);

	const pressureCell = useMemo(() => {
		return (
			<PaddedCell>
				<h2>Pressure</h2>
				<BarSlider minValue="970" maxValue="1030" onChange={onChange} />
			</PaddedCell>
		);
	}, []);
	const chanceOfRainCell = useMemo(() => <PaddedCell>Chance of Rain</PaddedCell>, []);
	const temperatureCell = useMemo(() => <PaddedCell>Temperature</PaddedCell>, []);
	const amountOfRainCell = useMemo(() => <PaddedCell>Amount of Rain</PaddedCell>, []);

	const renderDesktopLayout = (
		<div className={`${styles.layout} ${styles.desktop}`}>
			<div className={styles.row}>
				{pressureCell}
				{chanceOfRainCell}
			</div>

			<div className={styles.row}>
				{temperatureCell}
				{amountOfRainCell}
			</div>
		</div>
	);

	const renderMobileLayout = (
		<div className={`${styles.layout} ${styles.mobile}`}>
			{pressureCell}
			{temperatureCell}
			{chanceOfRainCell}
			{amountOfRainCell}
		</div>
	);

    return (
		<div data-component="Dashboard" className={styles.dashboard}>
			<CommonPadding>
				{renderMobileLayout} {/* separate layouts allow cell reordering without breaking screen-reader flows */}
				{renderDesktopLayout}
			</CommonPadding>
		</div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;