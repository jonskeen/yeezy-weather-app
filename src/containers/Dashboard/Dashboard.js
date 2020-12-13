import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDebouncedState } from "hooks";
import { isNonEmptyString, fetchRainfall } from "utils";
import ChanceOfRainTile from "components/ChanceOfRainTile";
import CommonPadding from "components/CommonPadding";
import PressureTile from "components/PressureTile";
import TemperatureTile from "components/TemperatureTile";
import RainfallAmountTile from "components/RainfallAmountTile";

import styles from "./styles.css";


const Dashboard = () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ rainfallByDay, setRainfallByDay ] = useState([]);
	const [ pressure, setPressure ] = useDebouncedState(null, 300);
	const [ temperature, setTemperature ] = useDebouncedState(null, 300);

	const handlePressureChange = useCallback(({ value }) => {
		setPressure(value);
	}, [ setPressure ]);

	const handleTemperatureChange = useCallback(({ value }) => {
		setTemperature(value);
	}, [ setTemperature ]);

	const pressureTile = useMemo(() => {
		return (
			<PressureTile onChange={handlePressureChange}
		                     defaultValue={pressure}
		                     className={styles.dashboardTile}
			/>
		);
	}, [ handlePressureChange, pressure ]);

	const temperatureTile = useMemo(() => {
		return (
			<TemperatureTile onChange={handleTemperatureChange}
			                 defaultValue={temperature}
			                 className={styles.dashboardTile}
			/>
		);
	}, [ handleTemperatureChange, temperature ]);

	const amountOfRainCell = useMemo(() => {
		return <RainfallAmountTile loading={isLoading} data={rainfallByDay} className={styles.dashboardTile} />;
	}, [ isLoading, rainfallByDay ]);

	const chanceOfRainTile = useMemo(() => {
		return (
			<ChanceOfRainTile className={styles.dashboardTile}
			                  loading={isLoading}
			                  data={rainfallByDay}
			                  pressure={pressure}
			                  temperature={temperature}
			/>
		);
	}, [ isLoading, rainfallByDay, pressure, temperature ]);


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
				{chanceOfRainTile}
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
			{chanceOfRainTile}
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
		<div data-component="Dashboard">
			<CommonPadding>
				{renderMobileLayout} {/* separate layouts allow cell reordering without breaking screen-reader flows */}
				{renderDesktopLayout}
			</CommonPadding>
		</div>
    );
};

export default Dashboard;