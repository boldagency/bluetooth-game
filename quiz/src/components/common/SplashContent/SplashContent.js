"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import cx from "classnames";
import styles from "./SplashContent.module.scss";

export default function SplashContent() {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push("/quiz")
        }, 3000)
    }, [])
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
                </div>
                <div className={cx(styles.bg)}>
                    <img src="/assets/media/quiz_splash_img.png" alt="" />
                </div>
            </div>
        </div >
    )
}
