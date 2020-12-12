import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";

const Handle = forwardRef(({ isDragging }, ref) => {
	return (
		<div data-component="Handle" ref={ref} className={styles.handle} />
    );
});

Handle.propTypes = {};

export default Handle;