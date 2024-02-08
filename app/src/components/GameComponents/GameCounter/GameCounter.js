"use client";
import cx from "classnames";
import styles from "./GameCounter.module.scss";
import { useEffect, useState } from "react";


export default function GameCounter({
    setShowGameEnd
}) {
    const [time, setTime] = useState(60);

    useEffect(() => {
        const counter = setTimeout(() => {
            time > 0 && setTime((time) => time - 1);
        }, 1000);

        if (time === 0) {
            setShowGameEnd(true)
        }


        return () => {
            clearTimeout(counter)
        }

    }, [time]);

    return (
        <div className={cx(styles.counter)}>
            <div className={cx(styles.counterContainer, "bg-blue")}>
                <div className={cx(styles.label, "body3-size")}>Time</div>
                <h1 className={cx(styles.counterNumber, "digital4-size")}>
                    {`${Math.floor(time / 60)}`.padStart(2, 0)}:{`${time % 60}`.padStart(2, 0)}
                </h1>
            </div>
        </div>
    )
}