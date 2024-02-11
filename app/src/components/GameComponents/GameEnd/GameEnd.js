"use client";
import cx from "classnames";
import styles from "./GameEnd.module.scss";
import Header from "@/components/common/Header/Header";

export default function GameEnd({ user, winner = 1 }) {
    return (
        <>
            <Header />
            <div className={cx(styles.section, "text-center bg-black color-white space-horizontal")}>
                <div className={cx(styles.sectionContainer)}>
                    {
                        (user === 1 && winner === 1) || (user === 2 && winner === 2) ?
                            <div className={cx(styles.info)}>
                                <h2 className={cx(styles.title)}>Congratulations!</h2>
                                <div className={cx(styles.description, "subTitle3-size font-weight-regular")}>You won the game!</div>
                            </div>
                            : <div className={cx(styles.info)}>
                                <h2 className={cx(styles.title)}>Hard Luck!</h2>
                                <div className={cx(styles.description, "subTitle3-size font-weight-regular")}>You lost the game!</div>
                            </div>
                    }

                    {/* <div className={cx(styles.stats)}>
                        <div className={cx(styles.statsItem, "bg-blue")}>
                            <div className={cx(styles.itemLabel, "body2-size")}>Average Speed</div>
                            <div className={cx(styles.itemValue)}>
                                <span className={cx(styles.number, "digital2-size")}>150</span>
                                <span className={cx(styles.unit, "body3-size")}>km/h</span>
                            </div>
                        </div>
                        <div className={cx(styles.statsItem, "bg-blue")}>
                            <div className={cx(styles.itemLabel, "body2-size")}>Total Time</div>
                            <div className={cx(styles.itemValue)}>
                                <span className={cx(styles.number, "digital2-size")}>01:50</span>                            </div>
                        </div>
                    </div> */}
                </div>
            </div >
        </>

    )
}
