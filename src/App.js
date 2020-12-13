import React from "react";
import Dashboard from "containers/Dashboard";

import "globals/css/variables/index.css";
import "globals/css/index.global.css";
import styles from './App.css';


const App = () => {
	return (
		<div>
			<header className={styles.appHeader}>Weather Dashboard</header>

			<div className={styles.mainContent}>
				<Dashboard />
			</div>
		</div>
	);
};

export default App;
