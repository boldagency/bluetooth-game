"use client"
import { useState } from "react";
import GameCounter from "@/components/GameComponents/GameCounter/GameCounter";
import GameEnd from "@/components/GameComponents/GameEnd/GameEnd";
import GameBody from "@/components/GameComponents/GameBody/GameBody";


export default function Home() {
  const [showGameEnd, setShowGameEnd] = useState(false);

  return (
    <main>
      <GameCounter setShowGameEnd={setShowGameEnd} />
      {showGameEnd && <GameEnd showGameEnd={showGameEnd} />}
      <GameBody />
    </main >
  );
}
