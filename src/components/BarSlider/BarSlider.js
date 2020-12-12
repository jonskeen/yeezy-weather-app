import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { isFunction } from "utils";
import Hammer from "react-hammerjs";
import Handle from "components/BarSlider/Handle";

import styles from "./styles.css";

const BarSlider = ({
	minValue: incomingMinValue,
	maxValue: incomingMaxValue,
	onChange
}) => {
	const barRef = useRef(null);
	const handleRef = useRef(null);
	const [ boundaries, setBoundaries ] = useState({ left: 0, right: 0 });
	const [ initialX, setInitialX ] = useState(0);
	const [ currentX, setCurrentX ] = useState(null);
	const minValue = parseInt(incomingMinValue, 10);
	const maxValue = parseInt(incomingMaxValue, 10); // todo: ensure max > min

	const calculateValue = useCallback(() => {
		const totalWidth = boundaries.right - boundaries.left;
		const percentDragged = currentX / totalWidth;
		const valueSpan = maxValue - minValue;
		const dragValue = valueSpan * percentDragged;

		const value = minValue + dragValue;

		if (isFunction(onChange)) {
			onChange({ value })
		}
	}, [ boundaries.left, boundaries.right, currentX, maxValue, minValue, onChange ]);

	const handlePan = a => {
		let updatedX = initialX + a.deltaX;

		if (updatedX <= boundaries.left) {
			updatedX = boundaries.left;
		} else if (updatedX >= boundaries.right) {
			updatedX = boundaries.right;
		}

		const absolutePosition = updatedX - boundaries.left;

		setCurrentX(absolutePosition);
	};

	const handlePanStart = a => {
		if (handleRef.current) {
			const { left } = handleRef.current.getClientRects()[0] || {};

			setInitialX(left);
		}
	};

	useEffect(() => {
		calculateValue();
	}, [ calculateValue, currentX ]);

	useEffect(() => {
		if (barRef.current) {
			const { left, right } = barRef.current.getClientRects()[0] || {};

			setBoundaries({ left, right });
		}
	}, [ barRef ]);

	useEffect(() => {
		if (handleRef.current && barRef.current) {
			const { left: barLeft, right: barRight } = barRef.current.getClientRects()[0] || {};
			const { width: handleWidth } = handleRef.current.getClientRects()[0] || {};

			setBoundaries({
				left: barLeft,
				right: barRight - handleWidth
			});
		}
	}, [ handleRef, barRef ])

    return (
		<div data-component="BarSlider" ref={barRef} className={styles.barSlider}>
			<Hammer onPanStart={handlePanStart} onPan={handlePan}>
				<div className={styles.handleWrapper} style={{ left: currentX }}>
					<Handle ref={handleRef} />
				</div>
			</Hammer>
		</div>
    );
};

BarSlider.propTypes = {
	minValue: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	maxValue: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	])
};

export default BarSlider;