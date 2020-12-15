import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { isFunction, keyCodes } from "utils";
import Hammer from "react-hammerjs";
import Handle from "components/BarSlider/Handle";

import styles from "./styles.css";
import { useSafeRangeBounds } from "hooks";

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
	const [ minValue, maxValue ] = useSafeRangeBounds(incomingMinValue, incomingMaxValue);
	const range = useMemo(() => maxValue - minValue, [ maxValue, minValue ]);
	const sliderWidth = useMemo(() => boundaries.right - boundaries.left, [ boundaries.left, boundaries.right ]);

	const dragHandlePosition = useMemo(() => {
		const slideValue = value - minValue;
		const dragPercent = slideValue / range;

		return sliderWidth * dragPercent;
	}, [ minValue, range, sliderWidth, value ]);

	const notifyParent = useCallback(updatedValue => {
		const didValueChange = updatedValue !== value;
		const isValueValid = updatedValue >= minValue && updatedValue <= maxValue;

		if (didValueChange && isValueValid && isFunction(onChange)) {
			onChange({ value: updatedValue })
		}
	}, [ maxValue, minValue, onChange, value ]);

	const setValueFromPosition = useCallback(currentX => {
		const percentDragged = currentX / sliderWidth;
		const dragValue = range * percentDragged;
		const updatedValue = minValue + dragValue;

		notifyParent(updatedValue);
	}, [ minValue, notifyParent, range, sliderWidth ]);

	const handlePan = a => {
		let updatedX = initialX + a.deltaX;

		if (updatedX <= boundaries.left) {
			updatedX = boundaries.left;
		} else if (updatedX >= boundaries.right) {
			updatedX = boundaries.right;
		}

		const absolutePosition = updatedX - boundaries.left;

		setValueFromPosition(absolutePosition);
	};

	const handlePanStart = () => {
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
		if (barRef.current) {
			const barRefElement = barRef.current;
			let handleWidthAdjustment = 0;
			if (handleRef.current) {
				const { width } = handleRef.current.getClientRects()[0] || {};
				handleWidthAdjustment = width / 2;
			}

			const handleClick = event => {
				const adjustedPosition = event.x - boundaries.left - handleWidthAdjustment;
				setValueFromPosition(adjustedPosition);
			};

			const handleKeydown = ({ keyCode }) => {
				if (keyCode === keyCodes.leftArrow) {
					notifyParent(value - 1);
				} else if (keyCode === keyCodes.rightArrow) {
					notifyParent(value + 1);
				}
			}

			window.addEventListener("keydown", handleKeydown);


			barRefElement.addEventListener("click", handleClick);

			return () => {
				window.removeEventListener("keydown", handleKeydown);
				barRefElement.removeEventListener("click", handleClick);
			}
		}
	}, [ barRef, handleRef, boundaries.left, setValueFromPosition, notifyParent, value ])

	useEffect(() => {
		const handleResize = () => setResizeCount(resizeCount + 1);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [ resizeCount ]);

    return (
		<div data-component="BarSlider" ref={barRef} className={styles.barSlider}>
			<Hammer onPanStart={handlePanStart} onPan={handlePan}>
				<div className={styles.handleWrapper} style={{ left: `${dragHandlePosition}px` }}>
					<Handle ref={handleRef} ariaValue={value} />
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