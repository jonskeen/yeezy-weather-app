import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";

const PaddedCell = ({ children }) => {

    return (
		<div data-component="PaddedCell" className={styles.paddedCell}>
			{children}
		</div>
    );
};

PaddedCell.propTypes = {
	children: PropTypes.node
};

export default PaddedCell;