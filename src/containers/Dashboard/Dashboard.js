import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CommonPadding from "components/CommonPadding";
import PaddedCell from "components/PaddedCell";

import styles from "./styles.css";

const Dashboard = () => {
	const pressureCell = useMemo(() => <PaddedCell>Pressure</PaddedCell>, []);
	const chanceOfRainCell = useMemo(() => <PaddedCell>Chance of Rain</PaddedCell>, []);
	const temperatureCell = useMemo(() => <PaddedCell>Temperature</PaddedCell>, []);
	const amountOfRainCell = useMemo(() => <PaddedCell>Amount of Rain</PaddedCell>, []);

	const renderDesktopLayout = () => {
		return (
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
	};

	const renderMobileLayout = () => {
		return (
			<div className={`${styles.layout} ${styles.mobile}`}>
				{pressureCell}
				{temperatureCell}
				{chanceOfRainCell}
				{amountOfRainCell}
			</div>
		)
	};

    return (
		<div data-component="Dashboard" className={styles.dashboard}>
			<CommonPadding>
				{renderMobileLayout()}
				{renderDesktopLayout()}
			</CommonPadding>
		</div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;