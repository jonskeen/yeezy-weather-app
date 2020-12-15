import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";

const Handle = forwardRef(({ ariaValue }, ref) => {
	return (
		<div data-component="Handle"
		     ref={ref}
		     className={styles.handle}
		     role="slider"
		     aria-valuenow={ariaValue || ""}
		     tabIndex="1"
		/>
    );
});

Handle.propTypes = {
	ariaValue: PropTypes.string
};

export default Handle;