import React from "react";
import PropTypes from "prop-types";
import { ITEM_TYPES } from "globals/constants";
import { useDrag } from 'react-dnd'

import styles from "./styles.css";

const Handle = ({ isDragging }) => {
	const [{ opacity }, dragRef] = useDrag({
		item: { type: ITEM_TYPES.HANDLE },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
			isDragging: monitor.isDragging()
		})
	});

    return (
		<div data-component="Handle" ref={dragRef} className={styles.handle} style={{ opacity }}>
			<span>||{isDragging ? "Drag" : "No Drag"}||</span>
		</div>
    );
};

Handle.propTypes = {};

export default Handle;