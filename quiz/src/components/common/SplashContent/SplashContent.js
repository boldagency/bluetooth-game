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
                        Welcome to the Galaxy AI Challenge
                    </h1>
                    {/* <div className={cx(styles.description, "body1-size font-weight-regular")}>
                        Start the experience to discover the power of AI
                    </div> */}
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
