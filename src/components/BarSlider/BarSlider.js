import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { isFunction } from "utils";
import Hammer from "react-hammerjs";
import Handle from "components/BarSlider/Handle";

import styles from "./styles.css";

// todo: click-to-set-value
// todo: keyboard nav
const BarSlider = ({
	minValue: incomingMinValue,
	maxValue: incomingMaxValue,
	onChange,
	value
}) => {
	const barRef = useRef(null);
	const handleRef = useRef(null);
	const [ boundaries, setBoundaries ] = useState({ left: 0, right: 0 });
	const [ initialX, setInitialX ] = useState(0);
	const [ resizeCount, setResizeCount ] = useState(0);
	const minValue = parseInt(incomingMinValue, 10);
	const maxValue = parseInt(incomingMaxValue, 10); // todo: ensure max > min
	const range = useMemo(() => maxValue - minValue, [ maxValue, minValue ]);
	const sliderWidth = useMemo(() => boundaries.right - boundaries.left, [ boundaries.left, boundaries.right ]);

	const dragHandlePosition = useMemo(() => {
		const slideValue = value - minValue;
		const dragPercent = slideValue / range;

		return sliderWidth * dragPercent;
	}, [ minValue, range, sliderWidth, value ]);

	const calculateValueFromPosition = currentX => {
		const percentDragged = currentX / sliderWidth;
		const dragValue = range * percentDragged;
		const value = minValue + dragValue;

		if (isFunction(onChange)) {
			onChange({ value })
		}
	};

	const handlePan = a => {
		let updatedX = initialX + a.deltaX;

		if (updatedX <= boundaries.left) {
			updatedX = boundaries.left;
		} else if (updatedX >= boundaries.right) {
			updatedX = boundaries.right;
		}

		const absolutePosition = updatedX - boundaries.left;

		calculateValueFromPosition(absolutePosition);
	};

	const handlePanStart = a => {
		if (handleRef.current) {
			const { left } = handleRef.current.getClientRects()[0] || {};

			setInitialX(left);
		}
	};

	useEffect(() => { /* set boundaries based on element size and positions */
		if (handleRef.current && barRef.current) {
			const { left: barLeft, right: barRight } = barRef.current.getClientRects()[0] || {};
			const { width: handleWidth } = handleRef.current.getClientRects()[0] || {};

			setBoundaries({
				left: barLeft,
				right: barRight - handleWidth
			});
		}
	}, [ handleRef, barRef, resizeCount ]);

	useEffect(() => {
		const handleResize = () => setResizeCount(resizeCount + 1);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [ resizeCount ]);

    return (
		<div data-component="BarSlider" ref={barRef} className={styles.barSlider}>
			<Hammer onPanStart={handlePanStart} onPan={handlePan}>
				<div className={styles.handleWrapper} style={{ left: `${dragHandlePosition}px` }}>
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