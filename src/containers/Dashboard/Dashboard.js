import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CommonPadding from "components/CommonPadding";
import PaddedCell from "components/PaddedCell";
import PressureTile from "components/PressureTile";
import TemperatureTile from "components/TemperatureTile";

import styles from "./styles.css";

const Dashboard = () => {
	const pressureTile = useMemo(() => <PressureTile />, []);
	const chanceOfRainCell = useMemo(() => <PaddedCell>Chance of Rain</PaddedCell>, []);
	const temperatureCell = useMemo(() => <TemperatureTile />, []);
	const amountOfRainCell = useMemo(() => <PaddedCell>Amount of Rain</PaddedCell>, []);

	const renderDesktopLayout = (
		<div className={`${styles.layout} ${styles.desktop}`}>
			<div className={styles.row}>
				{pressureTile}
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
			{pressureTile}
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