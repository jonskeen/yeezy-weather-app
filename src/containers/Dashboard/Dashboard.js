import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";

const Dashboard = props => {

    return (
		<div data-component="Dashboard" className={styles.dashboard}>
			<ol>
				<li>hi</li>
			</ol>

			<ul>
				<li>there</li>
			</ul>
		</div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;