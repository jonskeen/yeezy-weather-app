import React from "react";
import PropTypes from "prop-types";
import { ITEM_TYPES } from "globals/constants";
import { useDrop } from "react-dnd";
import Handle from "components/BarSlider/Handle";

import styles from "./styles.css";

const BarSlider = props => {
	const [ dropProps , dropRef ] = useDrop({
		accept: ITEM_TYPES.HANDLE,
		drop: () => console.log("Drop!"),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
			initial: monitor.getInitialSourceClientOffset(),
			final: monitor.getSourceClientOffset()
		})
	});

	console.log("dropProps %o", dropProps);

	const { x } = dropProps.final || {};
	// const style = {
	// 	left: `${x}px`
	// };

	console.log("x %i", x);

    return (
		<div data-component="BarSlider" ref={dropRef} className={styles.barSlider}>
			{/*<div className={styles.handleWrapper} /*style={style}>*/}
				<Handle />
			{/*</div>*/}    
		</div>
    );
};

BarSlider.propTypes = {};

export default BarSlider;