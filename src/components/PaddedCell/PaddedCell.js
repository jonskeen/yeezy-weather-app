import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";
import { isNonEmptyString, reduceClassNames } from "utils";

const PaddedCell = ({ children, dataComponent, className: incomingClassName }) => {
	const dataComponentName = isNonEmptyString(dataComponent) ? dataComponent : "PaddedCell";
	const className = reduceClassNames({
		[styles.paddedCell]: true,
		[incomingClassName]: isNonEmptyString(incomingClassName)
	})

    return (
		<div data-component={dataComponentName} className={className}>
			{children}
		</div>
    );
};

PaddedCell.propTypes = {
	children: PropTypes.node
};

export default PaddedCell;