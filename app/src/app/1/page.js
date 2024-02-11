"use client"
import { useState } from "react";
import GameCounter from "@/components/GameComponents/GameCounter/GameCounter";
import GameEnd from "@/components/GameComponents/GameEnd/GameEnd";
import GameBodyNew from "@/components/GameComponents/GameBodyNew/GameBodyNew";
import Header from "@/components/common/Header/Header";
import SplashContent from "@/components/SplashComponents/SplashContent/SplashContent";

import styles from "../../../styles/12.module.scss";

export default function Home() {
  const [showGameEnd, setShowGameEnd] = useState(false);
  const [winner, setWinner] = useState(-1);
  const [isGameBodyActive, setIsGameBodyActive] = useState(false);



  return (
    <div className={styles.main} >
      <Header />

      <SplashContent
        user={1}
        setIsGameBodyActive={setIsGameBodyActive}
      />

      {
        isGameBodyActive &&
        <GameCounter
          showGameEnd={showGameEnd}
          setShowGameEnd={setShowGameEnd}
          setWinner={setWinner}
        />
      }

      {
        isGameBodyActive && <GameBodyNew
          user={1}
        />
      }


      {
        showGameEnd && <GameEnd
          user={1}
          winner={winner}
        />
      }

    </div >
  );
}
