"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { doc, onSnapshot } from "firebase/firestore";
import { resetRace } from "@/lib/Fire";

export default function Home() {
  const [value, setValue] = useState(0);
  const [won, setWon] = useState(false);
  const [cheers, setCheers] = useState("Let's GO!!!!!");

  const longAhead = [
    "Pedal faster! You're breezing through the course!",
    "Keep spinning those wheels! Victory is just around the bend!",
    "You're cycling with finesse! Keep those pedals turning!",
    "Feel the wind in your hair, feel the speed! You're on fire!"
  ];

  const approaching = [
    "You're almost there! One more pedal to victory!",
    "The finish line is in sight! Cycle your way to triumph!",
    "You're riding like a champion! Can you taste the sweet victory?",
    "Unleash your inner cycling hero! Victory is just a turn away!"
  ];

  const winner = [
    "Congratulations! You're the Cycling Pro! 🏆",
    "You did it! Victory lap time! 🚴‍♂️💨",
    "You're the ultimate cyclist! Victory is yours! 🎉",
    "And the winner is... YOU! Pedal for joy! 🥳"
  ]


  function onPedal(progress) {
    if (!won) {
      setValue(progress);
      const randomIndex = Math.floor(Math.random() * longAhead.length);

      if (progress < 50) {
        setCheers(longAhead[randomIndex])
      } else if (progress >= 50 && progress < 100) {
        setCheers(approaching[randomIndex])
      } else if (progress >= 100) {
        setWon(true);
        setCheers(winner[randomIndex]);
      }
    }

  }
  useEffect(() => {
    // socket.on('story', onPedal);
    resetRace();
    onSnapshot(doc(db, "race", "35yhqB8r6hVWolLMCu4P"), (doc) => {
      const rec = doc.data();
      const reci = parseInt(rec.p1);
      if (reci > 0) {
        onPedal(reci)
      }
    });

    return () => {
      // socket.off('story', clean);
    };
  })
  return (
    <main className={styles.main}>
      <div className={styles.description}>

        <div>

        </div>
      </div>

      <div className={styles.center}>
        <label for="slider" className={styles.label}><h3>{cheers}</h3></label>
        <input id="slider" name="slider" type="range" value={value} max={100} step={0.05} />
      </div>

      <div className={styles.grid}>

      </div>
    </main >
  );
}
