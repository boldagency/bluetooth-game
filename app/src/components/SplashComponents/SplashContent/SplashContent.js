"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import cx from "classnames";
import styles from "./SplashContent.module.scss";

import { db } from "@/lib/Fire";
import { doc, onSnapshot } from "firebase/firestore";


export default function SplashContent({
    user,
    setIsGameBodyActive
}) {
    const [time, setTime] = useState(null);
    const router = useRouter()
    useGSAP(() => {
        const timline = gsap.timeline({}).delay(1)
            .to(`.${styles.introInfo}`, {
                y: "-100%",
                duration: 1,
                opacity: 0
            })
            .to(`.${styles.background}`, {
                y: "100%",
                duration: 1,
                opacity: 0
            }, "<")

            .to(`.${styles.userInfoWtimer}`, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                onStart: () => {
                    //   setTime(10);
                }
            })
    }, [])


    useEffect(() => {

        let played = false;
        if (played == false) {
            onSnapshot(doc(db, "race", "Vdj9u6L1WiOPA8nwLmxW"), (doc) => {
                const rec = doc.data();
                if (rec.state == 1 && played == false) {
                    played = true
                    setTime(10)
                }
            });
        }
        else {
        }

    }, []);

    useEffect(() => {
        const counter = setTimeout(() => {
            time > 0 && setTime((time) => time - 1);
        }, 1000);

        if (time === 0) {
            // setNavigateToGame(true)
            // router.push("/1");
            gsap.to(`.${styles.section}`, {
                opacity: 0,
                duration: 0.5,
            })
            gsap.to(`.header`, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    setIsGameBodyActive(true)
                }
            })
        }

        return () => {
            clearTimeout(counter)
        }

    }, [time]);

    return (
        <div className={cx(styles.section, "text-center bg-black")}>
            <div className={cx(styles.sectionIntroContainer, "first-section")}>
                <div className={cx(styles.introInfo, "space-horizontal")}>
                    <h2 className={cx(styles.title)}>Ready to take on the challenge?</h2>
                    <div className={cx(styles.description, "body2-size font-weight-regular")}> Step up and prove your skills in our Galaxy Fitness Game</div>
                </div>

                <div className={cx(styles.background)}>
                    {user === 1 ?
                        <img src="/assets/media/site/user1_splash.png" alt="" /> :
                        <img src="/assets/media/site/user2_splash.png" alt="" />
                    }

                </div>
            </div>

            <div className={cx(styles.userInfoWtimer, "bg-black")}>
                <div className={cx(styles.userInfoContainer, "bg-gray")}>
                    <div className={cx(styles.color, user === 1 ? "bg-orange" : "bg-blue")}></div>
                    <div className={cx(styles.info)}>
                        <div className={cx(styles.title, "subTitle3-size font-weight-medium")}>You are all set</div>
                        <div className={cx(styles.name, "subTitle1-size")}>Ahmed Khaled</div>
                    </div>
                </div>
                <div className={cx(styles.sectionTimerContainer)}>
                    <div className={cx(styles.numberContainer, "color-blue")}>
                        <div className={cx(styles.number, "digital1-size")}>{time}</div>
                        <div className={cx(styles.seconds)}>Sec</div>
                    </div>

                    <div className={cx(styles.welcomeText, "subTitle3-siz")}>
                        The race is starting in:
                    </div>

                </div>
            </div>

        </div >
    )
}
