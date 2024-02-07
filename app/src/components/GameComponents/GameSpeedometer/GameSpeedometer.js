"use client";
import cx from "classnames";
import styles from "./GameSpeedometer.module.scss";

export default function GameSpeedometer() {
    return (
        <div className={cx(styles.speedometer)}>
            <div className={cx(styles.speedometerContainer)}>
                GameSpeedometer
            </div>
        </div>
    )
}
