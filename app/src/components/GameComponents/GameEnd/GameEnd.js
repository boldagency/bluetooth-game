"use client";
import cx from "classnames";
import styles from "./GameEnd.module.scss";


export default function GameEnd() {
    return (
        <div className={cx(styles.section)}>
            <div className={cx(styles.container)}>
                <div className={cx(styles.textWrapper)}>
                    <h2 className={cx(styles.text)}>
                        Congratulations User1
                    </h2>
                    <h2 className={cx(styles.text)}>
                        Hard Luck User2
                    </h2>
                </div>
            </div>
        </div>
    )
}
