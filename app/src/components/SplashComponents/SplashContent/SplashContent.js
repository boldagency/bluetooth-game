"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import cx from "classnames";
import styles from "./SplashContent.module.scss";

export default function SplashContent() {
    const [time, setTime] = useState(0);
    const [navigateToGame, setNavigateToGame] = useState(false);

    useGSAP(() => {
        const timline = gsap.timeline({}).delay(1)
            .to(`.${styles.info}`, {
                y: "-100%",
                duration: 1,
                opacity: 0
            })
            .to(`.${styles.background}`, {
                y: "100%",
                duration: 1,
                opacity: 0
            }, "<")

            .to(`.${styles.sectionTimerContainer}`, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                onStart: () => {
                    setTime(10);
                }
            })
    })

    useEffect(() => {
        const counter = setTimeout(() => {
            time > 0 && setTime((time) => time - 1);
        }, 1000);

        if (time === 0) {
            setNavigateToGame(true)
        }

        return () => {
            clearTimeout(counter)
        }

    }, [time]);

    return (
        <div className={cx(styles.section, "text-center")}>
            <div className={cx(styles.sectionIntroContainer, "first-section")}>
                <div className={cx(styles.info, "space-horizontal")}>
                    <h2 className={cx(styles.title)}>Ready to take on the challenge?</h2>
                    <div className={cx(styles.description, "body2-size")}> Step up and prove your skills in our Galaxy Fitness Game</div>
                </div>

                <div className={cx(styles.background)}>
                    <img src="/assets/media/site/splash_bg.svg" alt="" />
                </div>
            </div>

            <div className={cx(styles.sectionTimerContainer)}>
                <div className={cx(styles.numberContainer, "color-blue")}>
                    <div className={cx(styles.number, "digital1-size")}>{time}</div>
                    <div className={cx(styles.seconds)}>Sec</div>
                </div>

                <div className={cx(styles.welcomeText, "subTitle3-siz")}>
                    Welcome to Galaxy Fitness
                </div>

            </div>
        </div >
    )
}
