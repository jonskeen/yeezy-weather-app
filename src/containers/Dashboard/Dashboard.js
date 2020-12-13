import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { isNonEmptyString, fetchRainfall } from "utils";
import CommonPadding from "components/CommonPadding";
import PaddedCell from "components/PaddedCell";
import PressureTile from "components/PressureTile";
import TemperatureTile from "components/TemperatureTile";
import LoadingIndicator from "components/LoadingIndicator";
import RainfallAmountTile from "components/RainfallAmountTile";

import styles from "./styles.css";

const Dashboard = () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ rainfallByDay, setRainfallByDay ] = useState([]);
	const pressureTile = useMemo(() => <PressureTile />, []);
	const temperatureTile = useMemo(() => <TemperatureTile />, []);

	const amountOfRainCell = useMemo(() => {
		return (
			<RainfallAmountTile loading={isLoading} data={rainfallByDay} />
		);
	}, [ isLoading, rainfallByDay ]);

	const chanceOfRainCell = useMemo(() => {
		return (
			<PaddedCell>
				<h2>Amount of Rain</h2>
				{isLoading
					? (
						<LoadingIndicator/>
					)
					: ""
				}
			</PaddedCell>
		);
	}, [ isLoading ]);


	const getRainfall = () => {
		setIsLoading(true);

		fetchRainfall()
			.then(data => {
				setRainfallByDay(data);
			})
			.catch(error => {
				const message = isNonEmptyString(error)
					? error
					: error?.message;

				console.error(message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const renderDesktopLayout = (
		<div className={`${styles.layout} ${styles.desktop}`}>
			<div className={styles.row}>
				{pressureTile}
				{chanceOfRainCell}
			</div>

			<div className={styles.row}>
				{temperatureTile}
				{amountOfRainCell}
			</div>
		</div>
	);

	const renderMobileLayout = (
		<div className={`${styles.layout} ${styles.mobile}`}>
			{pressureTile}
			{temperatureTile}
			{chanceOfRainCell}
			{amountOfRainCell}
		</div>
	);

	useEffect(() => {
		const doIt = () => {
			getRainfall();
		}

		doIt();
	}, []);

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