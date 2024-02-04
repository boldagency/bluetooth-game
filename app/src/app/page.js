"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { socket } from "@/lib/socket";

export default function Home() {
  const [value, setValue] = useState(0)

  function onPress() {
    setValue((r) => r+=10);
  }
  useEffect(() => {
    socket.on('story', onPress);

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
        <label for="slider" className={styles.label}>{(value / 100).toFixed()}%</label>
        <input id="slider" name="slider" type="range" value={value} max={100} />
      </div>

      <div className={styles.grid}>

      </div>
    </main >
  );
}
