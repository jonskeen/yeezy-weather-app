import React from "react";
import PropTypes from "prop-types";
import { reduceClassNames } from "utils";

import styles from "./styles.css";

const CommonPadding = ({ children, desktop, mobile }) => {
	const classNames = reduceClassNames({
		[styles.desktop]: !desktop.disabled,
		[styles.mobile]: !mobile.disabled,
	});

    return (
		<div data-component="CommonPadding" className={classNames}>
			{children}
		</div>
    );
};

CommonPadding.propTypes = {
	children: PropTypes.node,
	desktop: PropTypes.shape({
		disabled: PropTypes.bool
	}),
	mobile: PropTypes.shape({
		disabled: PropTypes.bool
	})
};

CommonPadding.defaultProps = {
	desktop: { disabled: false },
	mobile: { disabled: false }
}

export default CommonPadding;