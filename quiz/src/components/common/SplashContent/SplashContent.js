"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import cx from "classnames";
import styles from "./SplashContent.module.scss";

export default function SplashContent() {
    const router = useRouter();
    const startQuiz = () => {
        router.push("/quiz")
    }

    return (
        <div className={cx(styles.section)}>
            <div className={cx(styles.sectionContainer)}>
                <div className={cx(styles.info, "space-horizontal")}>
                    <h1 className={cx(styles.title)}>
                        Circle to search
                    </h1>
                    <div className={cx(styles.description, "body1-size font-weight-regular")}>
                        Look up something you can’t describe
                    </div>
                    <button onClick={startQuiz} className={cx(styles.startBtn, "subTitle3-size color-white")}>
                        Start
                    </button>
                </div>
                <div className={cx(styles.bg)}>
                    <img src="/assets/media/quiz_splash_img.png" alt="" />
                </div>
            </div>
        </div >
    )
}
