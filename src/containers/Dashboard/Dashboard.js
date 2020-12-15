import React, { useCallback, useEffect, useState } from "react";
import { useDebouncedState } from "hooks";
import { isNonEmptyString, fetchRainfall } from "utils";
import ChanceOfRainTile from "components/ChanceOfRainTile";
import CommonPadding from "components/CommonPadding";
import PressureTile from "components/PressureTile";
import RainfallAmountTile from "components/RainfallAmountTile";
import TemperatureTile from "components/TemperatureTile";

import styles from "./styles.css";


const Dashboard = () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ rainfallByDay, setRainfallByDay ] = useState([]);
	const [ pressure, setPressure ] = useDebouncedState(null);
	const [ temperature, setTemperature ] = useDebouncedState(null);

	const handlePressureChange = useCallback(({ value }) => {
		setPressure(value);
	}, [ setPressure ]);

	const handleTemperatureChange = useCallback(({ value }) => {
		setTemperature(value);
	}, [ setTemperature ]);

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

	useEffect(() => {
		const doIt = () => {
			getRainfall();
		}

		doIt();
	}, []);

    return (
		<div data-component="Dashboard">
			<CommonPadding>
				<div className={styles.grid}>
					<PressureTile onChange={handlePressureChange}
					              defaultValue={pressure}
					              className={styles.dashboardTile}
					/>

					<ChanceOfRainTile className={styles.dashboardTile}
					                  loading={isLoading}
					                  data={rainfallByDay}
					                  pressure={pressure}
					                  temperature={temperature}
					/>

					<TemperatureTile className={`${styles.dashboardTile} ${styles.temperatureTile}`}
					                 onChange={handleTemperatureChange}
					                 defaultValue={temperature}
					/>

					<RainfallAmountTile loading={isLoading} data={rainfallByDay} className={styles.dashboardTile} />
				</div>
			</CommonPadding>
		</div>
    );
};

export default Dashboard;