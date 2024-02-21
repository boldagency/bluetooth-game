"use client";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import cx from "classnames";
import styles from "./SplashContent.module.scss";

export default function SplashContent() {
    const router = useRouter();

    useGSAP(() => {
        const timline = gsap.timeline({}).delay(2)
            .to(`.${styles.info}`, {
                y: "-100%",
                duration: 1,
                opacity: 0
            })
            .to(`.${styles.bg}`, {
                y: "100%",
                duration: 1,
                opacity: 0,
                onComplete: () => {
                    router.push("/quiz")
                }
            }, "<")
    })

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
